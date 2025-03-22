import React, { useState, useEffect } from "react";
import { db } from "../../utilities/firebaseConfig";
import { collection, getDocs, query, orderBy, addDoc, serverTimestamp, where, doc, updateDoc } from "firebase/firestore";
import 'bootstrap-icons/font/bootstrap-icons.css';

const ProcessedBillReview = () => {
  const [processedUnits, setProcessedUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [products, setProducts] = useState([]);
  const [viewingBills, setViewingBills] = useState(false);
  const [currentUnitBills, setCurrentUnitBills] = useState([]);
  const [currentUnitId, setCurrentUnitId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [savedReviews, setSavedReviews] = useState([]);

  const productsCollectionRef = collection(db, "Product");
  const processedBillsCollectionRef = collection(db, "ProcessedBills");
  const billReviewsCollectionRef = collection(db, "BillReviews");

  useEffect(() => {
    fetchProcessedUnits();
    fetchProducts();
    fetchSavedReviews();
  }, []);

  const fetchProcessedUnits = async () => {
    try {
      const q = query(processedBillsCollectionRef, orderBy("unitId", "desc"));
      const querySnapshot = await getDocs(q);
      const processedList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProcessedUnits(processedList);
    } catch (error) {
      console.error("Error fetching processed units:", error.message);
    }
  };

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(productsCollectionRef);
      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        options: doc.data().productOptions || [],
      }));
      setProducts(productList);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  const fetchSavedReviews = async () => {
    try {
      const querySnapshot = await getDocs(billReviewsCollectionRef);
      const reviewsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSavedReviews(reviewsList);
    } catch (error) {
      console.error("Error fetching saved reviews:", error.message);
    }
  };

  const handleViewUnit = (unit) => {
    setSelectedUnit(unit);
  };

  const handleClosePopup = () => {
    setSelectedUnit(null);
  };

  const handleNext = (unit) => {
    const savedReview = savedReviews.find(review => review.unitId === unit.unitId);
    const initialBills = savedReview ? savedReview.bills : unit.bills.map(bill => ({
      ...bill,
      products: bill.products.map(product => ({
        ...product,
        unloadingBT: "",
        saleBT: 0,
        salesValue: 0,
      })),
    }));
    setCurrentUnitBills(initialBills);
    setCurrentUnitId(unit.unitId);
    setViewingBills(true);
  };

  const handleUnloadingBTChange = (billIndex, productIndex, value) => {
    const newBills = [...currentUnitBills];
    
    // Get the product details from the target product
    const targetProduct = newBills[billIndex].products[productIndex];
    const productId = targetProduct.productId;
    const optionId = targetProduct.optionId;
    
    // Update all instances of this product across all bills
    let totalQty = 0;
    let totalUnloadingBT = 0;
    
    // First pass - update values and calculate totals
    newBills.forEach((bill, bIndex) => {
      bill.products.forEach((product, pIndex) => {
        if (product.productId === productId && product.optionId === optionId) {
          const qty = parseInt(product.qty) || 0;
          totalQty += qty;
          
          if (bIndex === billIndex && pIndex === productIndex) {
            // This is the product being directly edited
            product.unloadingBT = value;
            totalUnloadingBT += parseInt(value) || 0;
          } else {
            // For other instances of the same product
            totalUnloadingBT += parseInt(product.unloadingBT) || 0;
          }
        }
      });
    });
    
    // Calculate proportions for distribution if unloading is less than total qty
    const unloadingBT = parseInt(value) || 0;
    if (totalUnloadingBT > totalQty) {
      // If total unloading exceeds total qty, reset the edited field
      newBills[billIndex].products[productIndex].unloadingBT = "";
      alert("Total unloading bottles cannot exceed total quantity!");
      return;
    }
    
    // Second pass - update sales values
    newBills.forEach((bill) => {
      bill.products.forEach((product) => {
        if (product.productId === productId && product.optionId === optionId) {
          const qty = parseInt(product.qty) || 0;
          const unloadingBT = parseInt(product.unloadingBT) || 0;
          product.saleBT = qty - unloadingBT;
          product.salesValue = product.saleBT * (parseFloat(product.price) || 0);
        }
      });
    });
    
    setCurrentUnitBills(newBills);
  };

  const handleEdit = async () => {
    try {
      const q = query(billReviewsCollectionRef, where("unitId", "==", currentUnitId));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.docs.length > 0) {
        const reviewData = querySnapshot.docs[0].data();
        setCurrentUnitBills(reviewData.bills);
        
        // Update isSaved to false to enable Save button again
        const reviewDocId = querySnapshot.docs[0].id;
        await updateDoc(doc(db, "BillReviews", reviewDocId), { isSaved: false });
        await fetchSavedReviews(); // Refresh reviews to reflect updated isSaved
        alert("Loaded saved values for editing. Save button re-enabled.");
      } else {
        // Check if there's a processed unit available
        const processedUnit = processedUnits.find(unit => unit.unitId === currentUnitId);
        
        if (processedUnit) {
          // Initialize bills with unloading values for new review
          const initialBills = processedUnit.bills.map(bill => ({
            ...bill,
            products: bill.products.map(product => ({
              ...product,
              unloadingBT: "",
              saleBT: 0,
              salesValue: 0,
            })),
          }));
          
          setCurrentUnitBills(initialBills);
          alert("Initialized new review from processed unit.");
        } else {
          alert("No saved review or processed unit found for this unit.");
        }
      }
    } catch (error) {
      console.error("Error loading saved review:", error.message);
      alert("Failed to load saved review: " + error.message);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (currentUnitBills.length === 0) {
        alert("No bills to save!");
        return;
      }

      // Group products by their unique identifiers (optionId first)
      const consolidatedProducts = [];
      
      // First, group by optionId
      const optionGroups = {};
      
      currentUnitBills.forEach(item => {
        item.products.forEach(product => {
          const optionId = product.optionId;
          if (!optionGroups[optionId]) {
            optionGroups[optionId] = [];
          }
          optionGroups[optionId].push({
            billId: item.billId,
            productId: product.productId,
            product: product
          });
        });
      });
      
      // Then process each option group
      Object.entries(optionGroups).forEach(([optionId, entries]) => {
        // Group by product within this option
        const productGroups = {};
        
        entries.forEach(entry => {
          const productId = entry.productId;
          if (!productGroups[productId]) {
            productGroups[productId] = [];
          }
          productGroups[productId].push(entry);
        });
        
        // Process each product group
        Object.entries(productGroups).forEach(([productId, productEntries]) => {
          const productName = products.find(p => p.id === productId)?.name || 'Unknown';
          const firstProduct = productEntries[0].product;
          
          // Calculate totals
          const totalQty = productEntries.reduce((sum, entry) => {
            return sum + (parseInt(entry.product.qty) || 0);
          }, 0);
          
          const totalUnloadingBT = productEntries.reduce((sum, entry) => {
            return sum + (parseInt(entry.product.unloadingBT) || 0);
          }, 0);
          
          const totalSaleBT = productEntries.reduce((sum, entry) => {
            return sum + (parseInt(entry.product.saleBT) || 0);
          }, 0);
          
          const totalSalesValue = productEntries.reduce((sum, entry) => {
            return sum + (parseFloat(entry.product.salesValue) || 0);
          }, 0);
          
          // Create consolidated product entry
          consolidatedProducts.push({
            optionId: optionId,
            productId: productId,
            productName: productName,
            bottlesPerCase: firstProduct.bottlesPerCase,
            totalQty: totalQty,
            unloadingBT: totalUnloadingBT,
            saleBT: totalSaleBT,
            salesValue: totalSalesValue,
            caseCount: firstProduct.bottlesPerCase ? Math.floor(totalQty / firstProduct.bottlesPerCase) : 0,
            extraBottles: firstProduct.bottlesPerCase ? totalQty % firstProduct.bottlesPerCase : 0
          });
        });
      });

      const existingReview = savedReviews.find(review => review.unitId === currentUnitId);
      const reviewData = {
        unitId: currentUnitId,
        bills: currentUnitBills,
        consolidatedProducts: consolidatedProducts,
        isSaved: true, // Set to true on save
        createdAt: serverTimestamp(),
      };

      if (existingReview) {
        // Update existing review
        const q = query(billReviewsCollectionRef, where("unitId", "==", currentUnitId));
        const querySnapshot = await getDocs(q);
        const reviewDocId = querySnapshot.docs[0].id;
        await updateDoc(doc(db, "BillReviews", reviewDocId), reviewData);
        console.log("Review updated with ID: ", reviewDocId);
      } else {
        // Create new review
        const docRef = await addDoc(billReviewsCollectionRef, reviewData);
        console.log("Review saved with ID: ", docRef.id);
      }

      alert("Review saved successfully!");
      setViewingBills(false);
      setCurrentUnitBills([]);
      setCurrentUnitId(null);
      await fetchSavedReviews(); // Refresh saved reviews
    } catch (error) {
      console.error("Error saving review:", error.message);
      alert("Failed to save review: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateSalesValueTotal = (products) => {
    return products.reduce((sum, product) => sum + (parseFloat(product.salesValue) || 0), 0).toFixed(2);
  };

  const isSaveDisabled = (unitId) => {
    const review = savedReviews.find(r => r.unitId === unitId);
    return review ? review.isSaved : false;
  };

  return (
    <div className="container">
      <h3>Processed Bill Review</h3>

      {!viewingBills ? (
        // Processed Units History Section
        <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px" }}>
          <h4>Processed Units History</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Unit ID</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {processedUnits.map((unit) => (
                <tr key={unit.id}>
                  <td>{unit.unitId}</td>
                  <td>{unit.date}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button 
                        className="btn btn-info btn-sm" 
                        onClick={() => handleViewUnit(unit)}
                      >
                        View
                      </button>
                      <button 
                        className="btn btn-primary btn-sm" 
                        onClick={() => handleNext(unit)}
                      >
                        Next
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // Review Bills Section
        <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px" }}>
          <h4>Review Bills for Unit: {currentUnitId}</h4>
          <div className="mb-3 d-flex gap-2">
            <button 
              className="btn btn-secondary" 
              onClick={() => setViewingBills(false)}
            >
              Back to Units
            </button>
            <button 
              className="btn btn-warning" 
              onClick={handleEdit}
            >
              Edit
            </button>
            <button 
              className="btn btn-primary" 
              onClick={handleSave}
              disabled={loading || isSaveDisabled(currentUnitId)}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>

          {/* Display added bills as cards */}
          <div className="mb-3">
            <h5>Added Bills:</h5>
            <div className="d-flex flex-wrap gap-2">
              {currentUnitBills.map((item, billIndex) => (
                <div key={billIndex} className="card" style={{ width: "18rem" }}>
                  <div className="card-body">
                    <h6 className="card-title">{item.billNo}</h6>
                    <p className="card-text">{item.outletName}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Consolidated products table */}
          <div>
            <h5>Review Products</h5>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Qty (BT)</th>
                  <th>Bottles per Case</th>
                  <th>Case</th>
                  <th>Extra Bottles</th>
                  <th>UnLoading BT</th>
                  <th>Sale BT</th>
                  <th>Sales Value (Rs.)</th>
                </tr>
              </thead>
              <tbody>
                {/* Group products by their optionId first */}
                {Object.entries(
                  // Group by optionId
                  currentUnitBills.flatMap(item => 
                    item.products.map(product => ({
                      productId: product.productId,
                      optionId: product.optionId,
                      product: product,
                      billIndex: currentUnitBills.indexOf(item),
                      productIndex: item.products.indexOf(product)
                    }))
                  ).reduce((acc, curr) => {
                    if (!acc[curr.optionId]) {
                      acc[curr.optionId] = [];
                    }
                    acc[curr.optionId].push(curr);
                    return acc;
                  }, {})
                ).flatMap(([optionId, optionEntries], optionGroupIndex, optionGroups) => {
                  // Further group by productId
                  const productGroups = optionEntries.reduce((acc, entry) => {
                    if (!acc[entry.productId]) {
                      acc[entry.productId] = [];
                    }
                    acc[entry.productId].push(entry);
                    return acc;
                  }, {});

                  // Create rows for this option group
                  const optionRows = Object.entries(productGroups).map(([productId, entries], productIndex) => {
                    // Get reference for first instance
                    const firstEntry = entries[0];
                    const firstInstance = firstEntry.product;
                    const billIndex = firstEntry.billIndex;
                    const entryProductIndex = firstEntry.productIndex;
                    
                    // Get product name
                    const productName = products.find(p => p.id === productId)?.name || 'Unknown';
                    
                    // Calculate totals for this product option
                    const totalQty = entries.reduce((sum, entry) => sum + (parseInt(entry.product.qty) || 0), 0);
                    const totalUnloadingBT = entries.reduce((sum, entry) => sum + (parseInt(entry.product.unloadingBT) || 0), 0);
                    const totalSaleBT = entries.reduce((sum, entry) => sum + (parseInt(entry.product.saleBT) || 0), 0);
                    const totalSalesValue = entries.reduce((sum, entry) => sum + (parseFloat(entry.product.salesValue) || 0), 0);

                    // Create a unique key for row
                    const uniqueKey = `${productId}-${optionId}`;

                    return (
                      <tr key={uniqueKey}>
                        <td>{productName} - {optionId}</td>
                        <td>{totalQty}</td>
                        <td>{firstInstance.bottlesPerCase || '-'}</td>
                        <td>{firstInstance.bottlesPerCase ? Math.floor(totalQty / firstInstance.bottlesPerCase) : '-'}</td>
                        <td>{firstInstance.bottlesPerCase ? totalQty % firstInstance.bottlesPerCase : '-'}</td>
                        <td>
                          <input
                            type="number"
                            className="form-control"
                            value={firstInstance.unloadingBT}
                            onChange={(e) => handleUnloadingBTChange(billIndex, entryProductIndex, e.target.value)}
                            min="0"
                            style={{ width: "100px" }}
                          />
                        </td>
                        <td>{totalSaleBT}</td>
                        <td>{totalSalesValue.toFixed(2)}</td>
                      </tr>
                    );
                  });

                  // Add a separator row if this is not the last option group
                  if (optionGroupIndex < Object.keys(optionGroups).length - 1) {
                    return [
                      ...optionRows,
                      <tr key={`separator-${optionId}`} style={{ height: "20px", backgroundColor: "#f8f9fa" }}>
                        <td colSpan="8"></td>
                      </tr>
                    ];
                  }
                  
                  return optionRows;
                })}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-3">
            <button 
              className="btn btn-primary" 
              onClick={handleSave}
              disabled={loading || isSaveDisabled(currentUnitId)}
            >
              {loading ? "Saving..." : "Save All"}
            </button>
          </div>
        </div>
      )}

      {/* Popup Modal for View Unit */}
      {selectedUnit && (
        <div className="modal" style={{ display: "block", position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-content" style={{ backgroundColor: "#fff", margin: "5% auto", padding: "20px", width: "80%", maxWidth: "800px", borderRadius: "8px", maxHeight: "80vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #ddd", paddingBottom: "10px" }}>
              <h4>Unit Details - {selectedUnit.unitId}</h4>
              <button className="btn btn-danger" onClick={handleClosePopup}>Close</button>
            </div>
            <div style={{ marginTop: "20px" }}>
              <p><strong>Date:</strong> {selectedUnit.date}</p>
              
              {selectedUnit.consolidatedProducts ? (
                // Display consolidated products if available
                <>
                  <h5>Consolidated Products</h5>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Option</th>
                        <th>Product Name</th>
                        <th>Qty (BT)</th>
                        <th>Bottles/Case</th>
                        <th>Case</th>
                        <th>Extra Bottles</th>
                        {selectedUnit.consolidatedProducts[0].unloadingBT !== undefined && (
                          <>
                            <th>UnLoading BT</th>
                            <th>Sale BT</th>
                            <th>Sales Value (Rs.)</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {/* Group consolidated products by optionId */}
                      {selectedUnit.consolidatedProducts
                        .sort((a, b) => a.optionId.localeCompare(b.optionId))
                        .reduce((result, product, index, array) => {
                          // Add the current product to the result
                          result.push(
                            <tr key={`product-${index}`}>
                              <td>{product.optionId}</td>
                              <td>{product.productName || products.find(p => p.id === product.productId)?.name}</td>
                              <td>{product.totalQty}</td>
                              <td>{product.bottlesPerCase || '-'}</td>
                              <td>{product.caseCount || '-'}</td>
                              <td>{product.extraBottles || '-'}</td>
                              {product.unloadingBT !== undefined && (
                                <>
                                  <td>{product.unloadingBT}</td>
                                  <td>{product.saleBT}</td>
                                  <td>{product.salesValue.toFixed(2)}</td>
                                </>
                              )}
                            </tr>
                          );
                          
                          // If the next product has a different optionId, add a separator row
                          if (index < array.length - 1 && product.optionId !== array[index + 1].optionId) {
                            const colSpan = product.unloadingBT !== undefined ? 9 : 6;
                            result.push(
                              <tr key={`separator-${index}`} style={{ height: "20px", backgroundColor: "#f8f9fa" }}>
                                <td colSpan={colSpan}></td>
                              </tr>
                            );
                          }
                          
                          return result;
                        }, [])
                      }
                    </tbody>
                  </table>
                </>
              ) : null}
              
              <h5>Added Bills</h5>
              <div className="d-flex flex-wrap gap-2 mb-3">
                {selectedUnit.bills.map((bill, idx) => (
                  <div key={idx} className="card" style={{ width: "18rem" }}>
                    <div className="card-body">
                      <h6 className="card-title">{bill.billNo}</h6>
                      <p className="card-text">{bill.outletName}</p>
                    </div>
                  </div>
                ))}
              </div>

              {(!selectedUnit.consolidatedProducts) && (
                // Only show individual bill products if consolidated view isn't available
                <div>
                  <h5>Bill Details</h5>
                  {selectedUnit.bills.map((bill, idx) => (
                    <div key={idx} className="mb-3">
                      <h6>Bill: {bill.billNo} - {bill.outletName}</h6>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Qty (BT)</th>
                            <th>Bottles/Case</th>
                            <th>Case</th>
                            <th>Extra Bottles</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bill.products.map((product, pIdx) => (
                            <tr key={pIdx}>
                              <td>{products.find(p => p.id === product.productId)?.name} - {product.optionId}</td>
                              <td>{product.qty}</td>
                              <td>{product.bottlesPerCase || '-'}</td>
                              <td>{product.bottlesPerCase ? product.caseCount : '-'}</td>
                              <td>{product.bottlesPerCase ? product.extraBottles : '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcessedBillReview;