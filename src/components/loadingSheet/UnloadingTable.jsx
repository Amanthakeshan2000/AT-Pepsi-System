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
  const [printMode, setPrintMode] = useState(false);
  const [downloadingUnit, setDownloadingUnit] = useState(null);
  const [hiddenPrintMode, setHiddenPrintMode] = useState(false);
  const printModalRef = React.useRef(null);

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
    // Check if there's a saved review for this unit
    const savedReview = savedReviews.find(review => review.unitId === unit.unitId);
    if (savedReview) {
      // If there's a saved review, use that for the view
      setSelectedUnit(savedReview);
    } else {
      // Otherwise use the unit data
      setSelectedUnit(unit);
    }
    setPrintMode(false);
  };

  const handleClosePopup = () => {
    setSelectedUnit(null);
    setPrintMode(false);
  };

  const handlePrintUnit = () => {
    setPrintMode(true);
  };

  const handleViewPDF = () => {
    // Set print mode to true to use the print layout
    setPrintMode(true);
    
    // Small delay to ensure content is loaded before download
    setTimeout(() => {
      handleDownloadPDF();
    }, 300);
  };

  const triggerPrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    if (printModalRef.current) {
      const printContent = printModalRef.current.querySelector('.print-content');
      if (printContent) {
        const originalContents = document.body.innerHTML;
        
        document.body.innerHTML = printContent.innerHTML;
        
        window.print();
        
        document.body.innerHTML = originalContents;
        if (downloadingUnit) {
          setDownloadingUnit(null);
          setHiddenPrintMode(false);
        } else {
          window.location.reload();
        }
        return;
      }
    }
    
    // Fallback if ref isn't available
    const printContent = document.querySelector('.print-content');
    const originalContents = document.body.innerHTML;
    
    document.body.innerHTML = printContent.innerHTML;
    
    window.print();
    
    document.body.innerHTML = originalContents;
    if (downloadingUnit) {
      setDownloadingUnit(null);
      setHiddenPrintMode(false);
    } else {
      window.location.reload();
    }
  };

  const handleNext = (unit) => {
    const savedReview = savedReviews.find(review => review.unitId === unit.unitId);
    
    // If there's a saved review, use it
    if (savedReview) {
      setCurrentUnitBills(savedReview.bills);
      setCurrentUnitId(unit.unitId);
      setViewingBills(true);
      return;
    }
    
    // Otherwise initialize with current unit data
    const initialBills = unit.bills.map(bill => ({
      ...bill,
      products: bill.products.map(product => ({
        ...product,
        unloadingBT: "",
        saleBT: parseInt(product.qty) || 0, // Initially set to qty
        salesValue: (parseInt(product.qty) || 0) * (parseFloat(product.price) || 0)
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
            const unloadingValue = parseInt(value) || 0;
            product.saleBT = qty - unloadingValue;
            product.salesValue = product.saleBT * (parseFloat(product.price) || 0);
            totalUnloadingBT += unloadingValue;
          } else {
            // For other instances of the same product
            totalUnloadingBT += parseInt(product.unloadingBT) || 0;
          }
        }
      });
    });
    
    // Check if total unloading exceeds total qty
    if (totalUnloadingBT > totalQty) {
      // If total unloading exceeds total qty, reset the edited field
      newBills[billIndex].products[productIndex].unloadingBT = "";
      newBills[billIndex].products[productIndex].saleBT = parseInt(newBills[billIndex].products[productIndex].qty) || 0;
      newBills[billIndex].products[productIndex].salesValue = 
        newBills[billIndex].products[productIndex].saleBT * (parseFloat(newBills[billIndex].products[productIndex].price) || 0);
      alert("Total unloading bottles cannot exceed total quantity!");
      setCurrentUnitBills(newBills);
      return;
    }
    
    // Second pass - update sales values for all products of this type
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

  const handleDirectDownload = (unit) => {
    // Set downloading state for UI feedback
    setDownloadingUnit(unit.unitId);
    
    // Check if there's a saved review for this unit
    const savedReview = savedReviews.find(review => review.unitId === unit.unitId);
    if (savedReview) {
      // If there's a saved review, use that for the download
      setSelectedUnit(savedReview);
    } else {
      // Otherwise use the unit data
      setSelectedUnit(unit);
    }
    
    // Use hidden print mode for direct downloads
    setHiddenPrintMode(true);
    
    // Small delay to ensure content is loaded before download
    setTimeout(() => {
      handleDownloadPDF();
    }, 500);
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
                        <i className="bi bi-eye"></i> View
                      </button>
                      <button 
                        className="btn btn-primary btn-sm" 
                        onClick={() => handleNext(unit)}
                      >
                        <i className="bi bi-arrow-right"></i> Next
                      </button>
                      <button 
                        className="btn btn-success btn-sm" 
                        onClick={() => handleDirectDownload(unit)}
                        disabled={downloadingUnit === unit.unitId}
                      >
                        <i className="bi bi-file-earmark-pdf"></i> {downloadingUnit === unit.unitId ? "Loading..." : "PDF"}
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
            <div style={{ textAlign: "right", marginTop: "10px" }}>
              {/* Group products by optionId and calculate totals */}
              {Object.entries(
                currentUnitBills.flatMap(bill => 
                  bill.products.map(product => ({
                    optionId: product.optionId,
                    saleBT: parseInt(product.saleBT) || 0,
                    salesValue: parseFloat(product.salesValue) || 0
                  }))
                ).reduce((acc, curr) => {
                  if (!acc[curr.optionId]) {
                    acc[curr.optionId] = {
                      saleBT: 0,
                      salesValue: 0
                    };
                  }
                  acc[curr.optionId].saleBT += curr.saleBT;
                  acc[curr.optionId].salesValue += curr.salesValue;
                  return acc;
                }, {})
              ).map(([optionId, totals]) => (
                <div key={optionId} style={{ marginBottom: "5px" }}>
                  <p style={{ margin: "0", fontWeight: "bold", color: "red" }}>
                    {optionId} - Total Sale BT: {totals.saleBT}
                  </p>
                  <p style={{ margin: "2px 0 0 0", fontWeight: "bold", color: "red" }}>
                    {optionId} - Total Sales Value (Rs.): {totals.salesValue.toFixed(2)}
                  </p>
                </div>
              ))}
              
              {/* Grand Total */}
              <div style={{ marginTop: "10px", borderTop: "1px solid #ddd", paddingTop: "5px" }}>
                <p style={{ margin: "0", fontWeight: "bold", color: "red" }}>
                  Grand Total Sale BT: {currentUnitBills.reduce((sum, bill) => 
                    sum + bill.products.reduce((productSum, product) => 
                      productSum + (parseInt(product.saleBT) || 0), 0), 0)}
                </p>
                <p style={{ margin: "5px 0 0 0", fontWeight: "bold", color: "red" }}>
                  Grand Total Sales Value (Rs.): {currentUnitBills.reduce((sum, bill) => 
                    sum + bill.products.reduce((productSum, product) => 
                      productSum + (parseFloat(product.salesValue) || 0), 0), 0).toFixed(2)}
                </p>
              </div>
            </div>
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
      {selectedUnit && !printMode && (
        <div className="modal" style={{ display: "block", position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-content" style={{ backgroundColor: "#fff", margin: "5% auto", padding: "20px", width: "80%", maxWidth: "800px", borderRadius: "8px", maxHeight: "80vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #ddd", paddingBottom: "10px" }}>
              <h4>Unit Details - {selectedUnit.unitId}</h4>
              <div className="d-flex gap-2">
                <button className="btn btn-success" onClick={handlePrintUnit}>
                  <i className="bi bi-printer"></i> Print
                </button>
                <button className="btn btn-primary" onClick={handleViewPDF}>
                  <i className="bi bi-file-earmark-pdf"></i> PDF
                </button>
                <button className="btn btn-danger" onClick={handleClosePopup}>
                  <i className="bi bi-x-circle"></i> Close
                </button>
              </div>
            </div>
            <div style={{ marginTop: "20px" }}>
              <p><strong>Date:</strong> {selectedUnit.date}</p>
              <p><strong>Driver:</strong> {selectedUnit.driverName || 'N/A'}</p>
              <p><strong>Route:</strong> {selectedUnit.route || 'N/A'}</p>
              
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
                        {(selectedUnit.consolidatedProducts[0].unloadingBT !== undefined || 
                           selectedUnit.consolidatedProducts[0].saleBT !== undefined) && (
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
                        .sort((a, b) => {
                          const numA = parseInt(a.optionId.match(/^\d+/) || [0]);
                          const numB = parseInt(b.optionId.match(/^\d+/) || [0]);
                          return numA - numB;
                        })
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
                              {(product.unloadingBT !== undefined || product.saleBT !== undefined) && (
                                <>
                                  <td>{product.unloadingBT || 0}</td>
                                  <td>{product.saleBT || 0}</td>
                                  <td>{(product.salesValue || 0).toFixed(2)}</td>
                                </>
                              )}
                            </tr>
                          );
                          
                          // If the next product has a different optionId or this is the last product,
                          // add a totals row for the current option group
                          if (index === array.length - 1 || product.optionId !== array[index + 1].optionId) {
                            const currentOptionProducts = array.filter(p => p.optionId === product.optionId);
                            const totalSaleBT = currentOptionProducts.reduce((sum, p) => sum + (parseInt(p.saleBT) || 0), 0);
                            const totalSalesValue = currentOptionProducts.reduce((sum, p) => sum + (parseFloat(p.salesValue) || 0), 0);
                            
                            const colSpan = (product.unloadingBT !== undefined || product.saleBT !== undefined) ? 9 : 6;
                            result.push(
                              <tr key={`total-${product.optionId}`} style={{ backgroundColor: "#f8f9fa", fontWeight: "bold" }}>
                                <td colSpan={colSpan - 2} style={{ textAlign: "right" }}>Total for {product.optionId}:</td>
                                <td style={{ color: "red" }}>{totalSaleBT}</td>
                                <td style={{ color: "red" }}>{totalSalesValue.toFixed(2)}</td>
                              </tr>
                            );
                          }
                          
                          // Add separator row if not the last product and next has different optionId
                          if (index < array.length - 1 && product.optionId !== array[index + 1].optionId) {
                            const colSpan = (product.unloadingBT !== undefined || product.saleBT !== undefined) ? 9 : 6;
                            result.push(
                              <tr key={`separator-${index}`} style={{ height: "10px", backgroundColor: "#f8f9fa" }}>
                                <td colSpan={colSpan}></td>
                              </tr>
                            );
                          }
                          
                          return result;
                        }, [])
                      }
                    </tbody>
                  </table>
                  {(selectedUnit.consolidatedProducts[0].unloadingBT !== undefined || 
                    selectedUnit.consolidatedProducts[0].saleBT !== undefined) && (
                    <div style={{ textAlign: "right", marginTop: "10px" }}>
                      {Object.entries(
                        selectedUnit.consolidatedProducts.reduce((acc, product) => {
                          if (!acc[product.optionId]) {
                            acc[product.optionId] = [];
                          }
                          acc[product.optionId].push(product);
                          return acc;
                        }, {})
                      ).map(([optionId, products]) => (
                        <div key={optionId} style={{ marginBottom: "5px" }}>
                          <p style={{ margin: "0", fontWeight: "bold", color: "red" }}>
                            {optionId} - Total Sale BT: {products.reduce((sum, product) => sum + (parseInt(product.saleBT) || 0), 0)}
                          </p>
                          <p style={{ margin: "2px 0 0 0", fontWeight: "bold", color: "red" }}>
                            {optionId} - Total Sales Value (Rs.): {products.reduce((sum, product) => sum + (parseFloat(product.salesValue) || 0), 0).toFixed(2)}
                          </p>
                        </div>
                      ))}
                      
                      {/* Grand Total */}
                      <div style={{ marginTop: "10px", borderTop: "1px solid #ddd", paddingTop: "5px" }}>
                        <p style={{ margin: "0", fontWeight: "bold", color: "red" }}>
                          Grand Total Sale BT: {selectedUnit.consolidatedProducts.reduce((sum, product) => sum + (parseInt(product.saleBT) || 0), 0)}
                        </p>
                        <p style={{ margin: "5px 0 0 0", fontWeight: "bold", color: "red" }}>
                          Grand Total Sales Value (Rs.): {selectedUnit.consolidatedProducts.reduce((sum, product) => sum + (parseFloat(product.salesValue) || 0), 0).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  )}
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

      {/* Print Popup Modal */}
      {selectedUnit && printMode && (
        <div className="modal" style={{ display: "block", position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-content" style={{ backgroundColor: "#fff", margin: "5% auto", padding: "20px", width: "90%", maxWidth: "800px", borderRadius: "8px", maxHeight: "80vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #ddd", paddingBottom: "10px", marginBottom: "20px" }} className="no-print">
              <h4>Print Unit - {selectedUnit.unitId}</h4>
              <div className="d-flex gap-2">
                <button 
                  className="btn btn-primary" 
                  onClick={triggerPrint}
                >
                  <i className="bi bi-printer"></i> Print
                </button>
                <button 
                  className="btn btn-success" 
                  onClick={handleDownloadPDF}
                >
                  <i className="bi bi-file-earmark-pdf"></i> Download PDF
                </button>
                <button className="btn btn-danger" onClick={handleClosePopup}>
                  <i className="bi bi-x-circle"></i> Close
                </button>
              </div>
            </div>
            
            <div className="print-content" style={{ marginTop: "20px" }}>
              <div style={{ textAlign: "center", marginBottom: "10px" }}>
                <h3 style={{ margin: "0", fontWeight: "semibold"}}>Advance Trading</h3>
                {/* <p style={{ margin: "3px 0" }}>Reg Office: No: 170/A, Nuwaraeliya Rd, Delpitiya, Gampola</p>
                <p style={{ margin: "2px 0" }}>Tel: 072-7070701</p> */}
                <h4 style={{ margin: "8px 0" }}>Unloading Report</h4>
              </div>
              
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <div>
                  <p><strong>Unit ID:</strong> {selectedUnit.unitId}</p>
                  <p><strong>Driver:</strong> {selectedUnit.driverName || 'N/A'}</p>
                </div>
                <div>
                  <p><strong>Date:</strong> {selectedUnit.date || new Date().toISOString().split('T')[0]}</p>
                  <p><strong>Route:</strong> {selectedUnit.route || 'N/A'}</p>
                </div>
              </div>
              
              <h5 style={{ borderBottom: "1px solid #000", paddingBottom: "3px", marginBottom: "3px" }}>Consolidated Products</h5>
              
              {selectedUnit.consolidatedProducts && (
                <table className="table table-bordered" style={{ marginBottom: "5px" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#f2f2f2" }}>
                      <th>Option</th>
                      <th>Product</th>
                      <th>Qty</th>
                      <th>BPC</th>
                      <th>Case</th>
                      <th>Extra</th>
                      {(selectedUnit.consolidatedProducts[0].unloadingBT !== undefined || 
                         selectedUnit.consolidatedProducts[0].saleBT !== undefined) && (
                        <>
                          <th>UnLoading</th>
                          <th>Sale</th>
                          <th>Value (Rs.)</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {selectedUnit.consolidatedProducts
                      .sort((a, b) => {
                        const numA = parseInt(a.optionId.match(/^\d+/) || [0]);
                        const numB = parseInt(b.optionId.match(/^\d+/) || [0]);
                        return numA - numB;
                      })
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
                            {(product.unloadingBT !== undefined || product.saleBT !== undefined) && (
                              <>
                                <td>{product.unloadingBT || 0}</td>
                                <td>{product.saleBT || 0}</td>
                                <td>{(product.salesValue || 0).toFixed(2)}</td>
                              </>
                            )}
                          </tr>
                        );
                        
                        // If the next product has a different optionId or this is the last product,
                        // add a totals row for the current option group
                        if (index === array.length - 1 || product.optionId !== array[index + 1].optionId) {
                          const currentOptionProducts = array.filter(p => p.optionId === product.optionId);
                          const totalSaleBT = currentOptionProducts.reduce((sum, p) => sum + (parseInt(p.saleBT) || 0), 0);
                          const totalSalesValue = currentOptionProducts.reduce((sum, p) => sum + (parseFloat(p.salesValue) || 0), 0);
                          
                          const colSpan = (product.unloadingBT !== undefined || product.saleBT !== undefined) ? 9 : 6;
                          result.push(
                            <tr key={`total-${product.optionId}`} style={{ backgroundColor: "#f8f9fa", fontWeight: "bold" }}>
                              <td colSpan={colSpan - 2} style={{ textAlign: "right" }}>Total for {product.optionId}:</td>
                              <td style={{ color: "red" }}>{totalSaleBT}</td>
                              <td style={{ color: "red" }}>{totalSalesValue.toFixed(2)}</td>
                            </tr>
                          );
                        }
                        
                        // Add separator row if not the last product and next has different optionId
                        if (index < array.length - 1 && product.optionId !== array[index + 1].optionId) {
                          const colSpan = (product.unloadingBT !== undefined || product.saleBT !== undefined) ? 9 : 6;
                          result.push(
                            <tr key={`separator-${index}`} style={{ height: "10px", backgroundColor: "#f8f9fa" }}>
                              <td colSpan={colSpan}></td>
                            </tr>
                          );
                        }
                        
                        return result;
                      }, [])
                    }
                  </tbody>
                </table>
              )}
              {(selectedUnit.consolidatedProducts[0].unloadingBT !== undefined || 
                selectedUnit.consolidatedProducts[0].saleBT !== undefined) && (
                <div style={{ textAlign: "right", marginTop: "10px" }}>
                  {Object.entries(
                    selectedUnit.consolidatedProducts.reduce((acc, product) => {
                      if (!acc[product.optionId]) {
                        acc[product.optionId] = [];
                      }
                      acc[product.optionId].push(product);
                      return acc;
                    }, {})
                  ).map(([optionId, products]) => (
                    <div key={optionId} style={{ marginBottom: "5px" }}>
                      <p style={{ margin: "0", fontWeight: "bold", color: "red" }}>
                        {optionId} - Total Sale BT: {products.reduce((sum, product) => sum + (parseInt(product.saleBT) || 0), 0)}
                      </p>
                      <p style={{ margin: "2px 0 0 0", fontWeight: "bold", color: "red" }}>
                        {optionId} - Total Sales Value (Rs.): {products.reduce((sum, product) => sum + (parseFloat(product.salesValue) || 0), 0).toFixed(2)}
                      </p>
                    </div>
                  ))}
                  
                  {/* Grand Total */}
                  <div style={{ marginTop: "10px", borderTop: "1px solid #ddd", paddingTop: "5px" }}>
                    <p style={{ margin: "0", fontWeight: "bold", color: "red" }}>
                      Grand Total Sale BT: {selectedUnit.consolidatedProducts.reduce((sum, product) => sum + (parseInt(product.saleBT) || 0), 0)}
                    </p>
                    <p style={{ margin: "5px 0 0 0", fontWeight: "bold", color: "red" }}>
                      Grand Total Sales Value (Rs.): {selectedUnit.consolidatedProducts.reduce((sum, product) => sum + (parseFloat(product.salesValue) || 0), 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              )}
              <br /> <br /> <br />
              <div style={{ marginTop: "8px", display: "flex", justifyContent: "space-between" }}>
                <div style={{ width: "30%", borderTop: "0.5px solid #000", textAlign: "center", paddingTop: "2px" }}>
                  <p style={{ margin: 0 }}>Prepared By</p>
                </div>
                <div style={{ width: "30%", borderTop: "0.5px solid #000", textAlign: "center", paddingTop: "2px" }}>
                  <p style={{ margin: 0 }}>Checked By</p>
                </div>
                <div style={{ width: "30%", borderTop: "0.5px solid #000", textAlign: "center", paddingTop: "2px" }}>
                  <p style={{ margin: 0 }}>Approved By</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hidden Print Modal for Direct Downloads */}
      {selectedUnit && hiddenPrintMode && (
        <div ref={printModalRef} style={{ display: "none" }}>
          <div className="print-content" style={{ marginTop: "20px" }}>
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
              <h3 style={{ margin: "0", fontWeight: "semibold"}}>Advance Trading</h3>
              {/* <p style={{ margin: "3px 0" }}>Reg Office: No: 170/A, Nuwaraeliya Rd, Delpitiya, Gampola</p>
              <p style={{ margin: "2px 0" }}>Tel: 072-7070701</p> */}
              <h4 style={{ margin: "8px 0", fontWeight: "normal" }}>Unloading Report</h4>
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <div>
                <p><strong>Unit ID:</strong> {selectedUnit.unitId}</p>
                <p><strong>Driver:</strong> {selectedUnit.driverName || 'N/A'}</p>
              </div>
              <div>
                <p><strong>Date:</strong> {selectedUnit.date || new Date().toISOString().split('T')[0]}</p>
                <p><strong>Route:</strong> {selectedUnit.route || 'N/A'}</p>
              </div>
            </div>
            
            <h5 style={{ borderBottom: "1px solid #000", paddingBottom: "3px", marginBottom: "3px" }}>Consolidated Products</h5>
            
            {selectedUnit.consolidatedProducts && (
              <table className="table table-bordered" style={{ marginBottom: "5px" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f2f2f2" }}>
                    <th>Option</th>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>BPC</th>
                    <th>Case</th>
                    <th>Extra</th>
                    {(selectedUnit.consolidatedProducts[0].unloadingBT !== undefined || 
                       selectedUnit.consolidatedProducts[0].saleBT !== undefined) && (
                      <>
                        <th>UnLoading</th>
                        <th>Sale</th>
                        <th>Value (Rs.)</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {selectedUnit.consolidatedProducts
                    .sort((a, b) => {
                      const numA = parseInt(a.optionId.match(/^\d+/) || [0]);
                      const numB = parseInt(b.optionId.match(/^\d+/) || [0]);
                      return numA - numB;
                    })
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
                          {(product.unloadingBT !== undefined || product.saleBT !== undefined) && (
                            <>
                              <td>{product.unloadingBT || 0}</td>
                              <td>{product.saleBT || 0}</td>
                              <td>{(product.salesValue || 0).toFixed(2)}</td>
                            </>
                          )}
                        </tr>
                      );
                      
                      // If the next product has a different optionId or this is the last product,
                      // add a totals row for the current option group
                      if (index === array.length - 1 || product.optionId !== array[index + 1].optionId) {
                        const currentOptionProducts = array.filter(p => p.optionId === product.optionId);
                        const totalSaleBT = currentOptionProducts.reduce((sum, p) => sum + (parseInt(p.saleBT) || 0), 0);
                        const totalSalesValue = currentOptionProducts.reduce((sum, p) => sum + (parseFloat(p.salesValue) || 0), 0);
                        
                        const colSpan = (product.unloadingBT !== undefined || product.saleBT !== undefined) ? 9 : 6;
                        result.push(
                          <tr key={`total-${product.optionId}`} style={{ backgroundColor: "#f8f9fa", fontWeight: "bold" }}>
                            <td colSpan={colSpan - 2} style={{ textAlign: "right" }}>Total for {product.optionId}:</td>
                            <td style={{ color: "red" }}>{totalSaleBT}</td>
                            <td style={{ color: "red" }}>{totalSalesValue.toFixed(2)}</td>
                          </tr>
                        );
                      }
                      
                      // Add separator row if not the last product and next has different optionId
                      if (index < array.length - 1 && product.optionId !== array[index + 1].optionId) {
                        const colSpan = (product.unloadingBT !== undefined || product.saleBT !== undefined) ? 9 : 6;
                        result.push(
                          <tr key={`separator-${index}`} style={{ height: "10px", backgroundColor: "#f8f9fa" }}>
                            <td colSpan={colSpan}></td>
                          </tr>
                        );
                      }
                      
                      return result;
                    }, [])
                  }
                </tbody>
              </table>
            )}
            {(selectedUnit.consolidatedProducts[0].unloadingBT !== undefined || 
              selectedUnit.consolidatedProducts[0].saleBT !== undefined) && (
              <div style={{ textAlign: "right", marginTop: "10px" }}>
                {Object.entries(
                  selectedUnit.consolidatedProducts.reduce((acc, product) => {
                    if (!acc[product.optionId]) {
                      acc[product.optionId] = [];
                    }
                    acc[product.optionId].push(product);
                    return acc;
                  }, {})
                ).map(([optionId, products]) => (
                  <div key={optionId} style={{ marginBottom: "5px" }}>
                    <p style={{ margin: "0", fontWeight: "bold", color: "red" }}>
                      {optionId} - Total Sale BT: {products.reduce((sum, product) => sum + (parseInt(product.saleBT) || 0), 0)}
                    </p>
                    <p style={{ margin: "2px 0 0 0", fontWeight: "bold", color: "red" }}>
                      {optionId} - Total Sales Value (Rs.): {products.reduce((sum, product) => sum + (parseFloat(product.salesValue) || 0), 0).toFixed(2)}
                    </p>
                  </div>
                ))}
                
                {/* Grand Total */}
                <div style={{ marginTop: "10px", borderTop: "1px solid #ddd", paddingTop: "5px" }}>
                  <p style={{ margin: "0", fontWeight: "bold", color: "red" }}>
                    Grand Total Sale BT: {selectedUnit.consolidatedProducts.reduce((sum, product) => sum + (parseInt(product.saleBT) || 0), 0)}
                  </p>
                  <p style={{ margin: "5px 0 0 0", fontWeight: "bold", color: "red" }}>
                    Grand Total Sales Value (Rs.): {selectedUnit.consolidatedProducts.reduce((sum, product) => sum + (parseFloat(product.salesValue) || 0), 0).toFixed(2)}
                  </p>
                </div>
              </div>
            )}
            <br /> <br /> <br />
            <div style={{ marginTop: "8px", display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "30%", borderTop: "0.5px solid #000", textAlign: "center", paddingTop: "2px" }}>
                <p style={{ margin: 0 }}>Prepared By</p>
              </div>
              <div style={{ width: "30%", borderTop: "0.5px solid #000", textAlign: "center", paddingTop: "2px" }}>
                <p style={{ margin: 0 }}>Checked By</p>
              </div>
              <div style={{ width: "30%", borderTop: "0.5px solid #000", textAlign: "center", paddingTop: "2px" }}>
                <p style={{ margin: 0 }}>Approved By</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            .print-content, .print-content * {
              visibility: visible;
            }
            .no-print {
              display: none;
            }
            .print-content {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              padding: 5px;
              font-size: 8px;
            }
            .print-content h2 {
              font-size: 14px;
              margin: 0;
            }
            .print-content h3 {
              font-size: 12px;
              margin: 5px 0;
            }
            .print-content h5 {
              font-size: 10px;
              margin: 5px 0 2px;
              padding-bottom: 3px !important;
            }
            .print-content p {
              margin: 1px 0;
              font-size: 8px;
            }
            @page {
              size: A4;
              margin: 5mm 3mm;
            }
            table {
              border-collapse: collapse;
              width: 100%;
              margin-bottom: 5px;
            }
            table, th, td {
              border: 0.5px solid black;
            }
            th, td {
              padding: 1px 2px;
              text-align: left;
              font-size: 7px;
              white-space: nowrap;
            }
            tr {
              height: auto;
              line-height: 1.1;
            }
            .print-content .table-bordered {
              margin-bottom: 5px;
            }
            .separator-row {
              height: 2px !important;
            }
            .print-content > div:last-child {
              margin-top: 10px !important;
            }
            .print-content > div:last-child > div {
              padding-top: 2px !important;
            }
            .print-content > div:last-child p {
              margin: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ProcessedBillReview;