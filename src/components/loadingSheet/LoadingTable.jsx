import React, { useState, useEffect } from "react";
import { db } from "../../utilities/firebaseConfig";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, serverTimestamp, query, orderBy } from "firebase/firestore";
import 'bootstrap-icons/font/bootstrap-icons.css';

const BillManagement = () => {
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [newBillItems, setNewBillItems] = useState([]);
  const [processedUnits, setProcessedUnits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const billsCollectionRef = collection(db, "Bill");
  const productsCollectionRef = collection(db, "Product");
  const processedBillsCollectionRef = collection(db, "ProcessedBills");

  useEffect(() => {
    fetchBills();
    fetchProducts();
    fetchProcessedUnits();
  }, []);

  const fetchBills = async () => {
    try {
      const querySnapshot = await getDocs(billsCollectionRef);
      const billList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBills(billList);
    } catch (error) {
      console.error("Error fetching bills:", error.message);
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

  const handleViewBill = (bill) => {
    setSelectedBill(bill);
  };

  const handleClosePopup = () => {
    setSelectedBill(null);
  };

  const handleAddToNewBill = (bill) => {
    const alreadyAdded = newBillItems.some(item => item.billId === bill.id);
    if (alreadyAdded) {
      alert("This bill has already been added!");
      return;
    }
    
    // Add bill to newBillItems
    setNewBillItems(prevItems => [...prevItems, {
      billId: bill.id,
      billNo: bill.billNo,
      outletName: bill.outletName,
      products: bill.productOptions.map(opt => ({
        ...opt,
        bottlesPerCase: null,
        caseCount: 0,
        extraBottles: 0
      })),
      date: selectedDate
    }]);
  };

  const handleBottlesPerCaseChange = (billIndex, productIndex, value) => {
    const newItems = [...newBillItems];
    
    // Get the product details from the first instance
    const firstInstance = newItems[billIndex].products[productIndex];
    const productId = firstInstance.productId;
    const optionId = firstInstance.optionId;
    
    // Update all instances of this product across all bills
    newItems.forEach((item, itemIndex) => {
      item.products.forEach((product, prodIndex) => {
        if (product.productId === productId && product.optionId === optionId) {
          const qty = parseInt(product.qty) || 0;
          newItems[itemIndex].products[prodIndex].bottlesPerCase = value;
          newItems[itemIndex].products[prodIndex].caseCount = Math.floor(qty / value);
          newItems[itemIndex].products[prodIndex].extraBottles = qty % value;
        }
      });
    });
    
    setNewBillItems(newItems);
  };

  const handleDeleteItem = async (billIndex) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const newItems = newBillItems.filter((_, index) => index !== billIndex);
      setNewBillItems(newItems);
    }
  };

  const handleDeleteProcessedUnit = async (id) => {
    if (window.confirm("Are you sure you want to delete this processed unit?")) {
      try {
        await deleteDoc(doc(db, "ProcessedBills", id));
        setProcessedUnits(processedUnits.filter(unit => unit.id !== id));
      } catch (error) {
        console.error("Error deleting processed unit:", error.message);
      }
    }
  };

  const handleEditProcessedUnit = async (unit) => {
    const updatedBills = [...newBillItems, ...unit.bills]; // Combine current new bills with unit bills
    setNewBillItems(updatedBills);
    await handleDeleteProcessedUnit(unit.id); // Remove the old unit
  };

  const handleViewProcessedUnit = (unit) => {
    setSelectedBill(unit);
  };

  const generateUnitId = () => {
    if (processedUnits.length === 0) return "UNIT1";
    const lastUnitId = processedUnits[0].unitId; // Assuming sorted descending
    const lastNumber = parseInt(lastUnitId.replace("UNIT", ""));
    return `UNIT${lastNumber + 1}`;
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (newBillItems.length === 0) {
        alert("No bills to save!");
        return;
      }

      // Group products by their unique identifiers
      const consolidatedProducts = [];
      
      // First, group by optionId
      const optionGroups = {};
      
      newBillItems.forEach(item => {
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
          
          // Calculate total quantity
          const totalQty = productEntries.reduce((sum, entry) => {
            return sum + (parseInt(entry.product.qty) || 0);
          }, 0);
          
          // Create consolidated product entry
          consolidatedProducts.push({
            optionId: optionId,
            productId: productId,
            productName: productName,
            bottlesPerCase: firstProduct.bottlesPerCase,
            totalQty: totalQty,
            caseCount: firstProduct.bottlesPerCase ? Math.floor(totalQty / firstProduct.bottlesPerCase) : 0,
            extraBottles: firstProduct.bottlesPerCase ? totalQty % firstProduct.bottlesPerCase : 0
          });
        });
      });

      const unitId = generateUnitId();
      const unitData = {
        unitId,
        date: selectedDate,
        bills: newBillItems,
        consolidatedProducts: consolidatedProducts,
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(processedBillsCollectionRef, unitData);
      console.log("Unit written with ID: ", docRef.id);

      alert("Unit saved successfully!");
      setNewBillItems([]);
      await fetchProcessedUnits(); // Refresh processed units
    } catch (error) {
      console.error("Error saving unit:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateProductTotal = (options) => {
    return options.reduce((sum, option) => sum + ((parseFloat(option.price) || 0) * (parseFloat(option.qty) || 0)), 0).toFixed(2);
  };

  const calculateTotal = (options) => {
    return options.reduce((sum, option) => sum + (parseFloat(option.total) || 0), 0).toFixed(2);
  };

  const filteredBills = bills.filter(bill => 
    bill.billNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.outletName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.salesRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.refContact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastBill = currentPage * itemsPerPage;
  const indexOfFirstBill = indexOfLastBill - itemsPerPage;
  const currentBills = filteredBills.slice(indexOfFirstBill, indexOfLastBill);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h3>Bill Management</h3>

      {/* Available Bills Section */}
      <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
        <h4>Available Bills</h4>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "15px" }}>
          <div style={{ position: "relative", width: "300px" }}>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search bills..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              style={{ paddingLeft: "40px" }}
            />
            <i
              className="bi bi-search"
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#888"
              }}
            ></i>
          </div>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Bill No</th>
              <th>Outlet Name</th>
              <th>Sales Ref</th>
              <th>Ref Contact</th>
              <th>Create Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBills.map((bill) => (
              <tr key={bill.id}>
                <td>{bill.billNo}</td>
                <td>{bill.outletName}</td>
                <td>{bill.salesRef}</td>
                <td>{bill.refContact}</td>
                <td>{bill.createDate}</td>
                <td>
                  <div className="d-flex gap-2">
                    <button className="btn btn-info btn-sm" onClick={() => handleViewBill(bill)}>View</button>
                    <button className="btn btn-success btn-sm" onClick={() => handleAddToNewBill(bill)}>Add</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-center">
          <nav>
            <ul className="pagination">
              {Array.from({ length: Math.ceil(filteredBills.length / itemsPerPage) }, (_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                  <button className="page-link" onClick={() => paginate(index + 1)}>{index + 1}</button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Process New Bills Section */}
      <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
        <h4>Process New Bills</h4>
        <div className="mb-3">
          <label>Select Date: </label>
          <input 
            type="date" 
            className="form-control w-25 d-inline-block ms-2" 
            value={selectedDate} 
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        {/* Display added bills as cards */}
        <div className="mb-3">
          <h5>Added Bills:</h5>
          <div className="d-flex flex-wrap gap-2">
            {newBillItems.map((item, billIndex) => (
              <div key={billIndex} className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                  <h6 className="card-title">{item.billNo}</h6>
                  <p className="card-text">{item.outletName}</p>
                  <button 
                    className="btn btn-danger btn-sm" 
                    onClick={() => handleDeleteItem(billIndex)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {newBillItems.length > 0 && (
          <div>
            <h5>Process Products</h5>
            <table className="table table-bordered">
              <thead>
                <tr>
                  {/* <th>Option</th> */}
                  <th>Product Name</th>
                  <th>Qty (BT)</th>
                  <th>Bottles per Case</th>
                  <th>Case</th>
                  <th>Extra Bottles</th>
                </tr>
              </thead>
              <tbody>
                {/* Group products by their optionId first */}
                {Object.entries(
                  // Group by optionId
                  newBillItems.flatMap(item => 
                    item.products.map(product => ({
                      productId: product.productId,
                      optionId: product.optionId,
                      product: product,
                      billIndex: newBillItems.indexOf(item),
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
                    // Calculate total quantity for this product option
                    const totalQty = entries.reduce((sum, entry) => {
                      return sum + (parseInt(entry.product.qty) || 0);
                    }, 0);

                    // Get reference for first instance
                    const firstEntry = entries[0];
                    const firstInstance = firstEntry.product;
                    const billIndex = firstEntry.billIndex;
                    const entryProductIndex = firstEntry.productIndex;
                    
                    // Get product name
                    const productName = products.find(p => p.id === productId)?.name || 'Unknown';
                    
                    // Create a unique key for the radio input group
                    const uniqueKey = `${productId}-${optionId}`;

                    return (
                      <tr key={uniqueKey}>
                        <td>{productName} - {optionId}</td>
                        <td>{totalQty}</td>
                        <td>
                          <div className="form-check form-check-inline">
                            <input
                              type="radio"
                              name={`bpc-${uniqueKey}`}
                              value={10}
                              checked={firstInstance.bottlesPerCase === 10}
                              onChange={() => {
                                if (billIndex !== -1 && entryProductIndex !== -1) {
                                  handleBottlesPerCaseChange(billIndex, entryProductIndex, 10);
                                }
                              }}
                            />
                            <label>10</label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              type="radio"
                              name={`bpc-${uniqueKey}`}
                              value={20}
                              checked={firstInstance.bottlesPerCase === 20}
                              onChange={() => {
                                if (billIndex !== -1 && entryProductIndex !== -1) {
                                  handleBottlesPerCaseChange(billIndex, entryProductIndex, 20);
                                }
                              }}
                            />
                            <label>20</label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              type="radio"
                              name={`bpc-${uniqueKey}`}
                              value={30}
                              checked={firstInstance.bottlesPerCase === 30}
                              onChange={() => {
                                if (billIndex !== -1 && entryProductIndex !== -1) {
                                  handleBottlesPerCaseChange(billIndex, entryProductIndex, 30);
                                }
                              }}
                            />
                            <label>30</label>
                          </div>
                        </td>
                        <td>{firstInstance.bottlesPerCase ? Math.floor(totalQty / firstInstance.bottlesPerCase) : '-'}</td>
                        <td>{firstInstance.bottlesPerCase ? totalQty % firstInstance.bottlesPerCase : '-'}</td>
                      </tr>
                    );
                  });

                  // Add a separator row if this is not the last option group
                  if (optionGroupIndex < Object.keys(optionGroups).length - 1) {
                    return [
                      ...optionRows,
                      <tr key={`separator-${optionId}`} style={{ height: "20px", backgroundColor: "#f8f9fa" }}>
                        <td colSpan="5"></td>
                      </tr>
                    ];
                  }
                  
                  return optionRows;
                })}
              </tbody>
            </table>
          </div>
        )}

        {newBillItems.length > 0 && (
          <div className="text-center">
            <button 
              className="btn btn-primary" 
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save All"}
            </button>
          </div>
        )}
      </div>

      {/* Processed Units History */}
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
                      onClick={() => handleViewProcessedUnit(unit)}
                    >
                      View
                    </button>
                    <button 
                      className="btn btn-warning btn-sm" 
                      onClick={() => handleEditProcessedUnit(unit)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn btn-danger btn-sm" 
                      onClick={() => handleDeleteProcessedUnit(unit.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup Modal for View Bill/Unit */}
      {selectedBill && (
        <div className="modal" style={{ display: "block", position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-content" style={{ backgroundColor: "#fff", margin: "5% auto", padding: "20px", width: "80%", maxWidth: "800px", borderRadius: "8px", maxHeight: "80vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #ddd", paddingBottom: "10px" }}>
              <h4>{selectedBill.unitId ? `Unit Details - ${selectedBill.unitId}` : `Bill Details - ${selectedBill.billNo}`}</h4>
              <button className="btn btn-danger" onClick={handleClosePopup}>Close</button>
            </div>
            <div style={{ marginTop: "20px" }}>
              {selectedBill.unitId ? (
                // View for Processed Unit
                <>
                  <p><strong>Date:</strong> {selectedBill.date}</p>
                  
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
                      </tr>
                    </thead>
                    <tbody>
                      {/* Group consolidated products by optionId */}
                      {(selectedBill.consolidatedProducts || [])
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
                            </tr>
                          );
                          
                          // If the next product has a different optionId, add a separator row
                          if (index < array.length - 1 && product.optionId !== array[index + 1].optionId) {
                            result.push(
                              <tr key={`separator-${index}`} style={{ height: "20px", backgroundColor: "#f8f9fa" }}>
                                <td colSpan="6"></td>
                              </tr>
                            );
                          }
                          
                          return result;
                        }, [])
                      }
                    </tbody>
                  </table>
                  
                  <h5>Added Bills</h5>
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {selectedBill.bills.map((bill, idx) => (
                      <div key={idx} className="card" style={{ width: "18rem" }}>
                        <div className="card-body">
                          <h6 className="card-title">{bill.billNo}</h6>
                          <p className="card-text">{bill.outletName}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                // View for Available Bill
                <>
                  <div className="row">
                    <div className="col-md-6">
                      <p><strong>Outlet Name:</strong> {selectedBill.outletName}</p>
                      <p><strong>Address:</strong> {selectedBill.address}</p>
                      <p><strong>Contact:</strong> {selectedBill.contact}</p>
                    </div>
                    <div className="col-md-6">
                      <p><strong>Sales Ref:</strong> {selectedBill.salesRef}</p>
                      <p><strong>Ref Contact:</strong> {selectedBill.refContact}</p>
                      <p><strong>Create Date:</strong> {selectedBill.createDate}</p>
                    </div>
                  </div>

                  <h5>Product Options</h5>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Price (Rs.)</th>
                        <th>Quantity</th>
                        <th>Total Price (Rs.)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedBill.productOptions.map((option, idx) => (
                        <tr key={idx}>
                          <td>{products.find(p => p.id === option.productId)?.name} - {option.optionId}</td>
                          <td>Rs. {option.price}</td>
                          <td>{option.qty}</td>
                          <td>Rs. {((parseFloat(option.price) || 0) * (parseFloat(option.qty) || 0)).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="3" style={{ textAlign: "right", fontWeight: "bold" }}>Total:</td>
                        <td>Rs. {calculateProductTotal(selectedBill.productOptions)}</td>
                      </tr>
                    </tfoot>
                  </table>

                  {selectedBill.discountOptions?.length > 0 && (
                    <>
                      <h5>Discount Options</h5>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Option Name</th>
                            <th>Case</th>
                            <th>Per Case Rate</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedBill.discountOptions.map((option, idx) => (
                            <tr key={idx}>
                              <td>{option.name}</td>
                              <td>{option.case}</td>
                              <td>{option.perCaseRate}</td>
                              <td>{option.total}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan="3" style={{ textAlign: "right", fontWeight: "bold" }}>Total:</td>
                            <td>Rs. {calculateTotal(selectedBill.discountOptions)}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </>
                  )}

                  {selectedBill.freeIssueOptions?.length > 0 && (
                    <>
                      <h5>Free Issue Options</h5>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Option Name</th>
                            <th>Case</th>
                            <th>Per Case Rate</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedBill.freeIssueOptions.map((option, idx) => (
                            <tr key={idx}>
                              <td>{option.name}</td>
                              <td>{option.case}</td>
                              <td>{option.perCaseRate}</td>
                              <td>{option.total}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan="3" style={{ textAlign: "right", fontWeight: "bold" }}>Total:</td>
                            <td>Rs. {calculateTotal(selectedBill.freeIssueOptions)}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </>
                  )}

                  {selectedBill.expireOptions?.length > 0 && (
                    <>
                      <h5>Expire Options</h5>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Option Name</th>
                            <th>Case</th>
                            <th>Per Case Rate</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedBill.expireOptions.map((option, idx) => (
                            <tr key={idx}>
                              <td>{option.name}</td>
                              <td>{option.case}</td>
                              <td>{option.perCaseRate}</td>
                              <td>{option.total}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan="3" style={{ textAlign: "right", fontWeight: "bold" }}>Total:</td>
                            <td>Rs. {calculateTotal(selectedBill.expireOptions)}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillManagement;