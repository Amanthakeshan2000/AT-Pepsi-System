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
    const qtyBT = parseInt(newBills[billIndex].products[productIndex].qty) || 0;
    const unloadingBT = parseInt(value) || 0;
    
    newBills[billIndex].products[productIndex].unloadingBT = value;
    newBills[billIndex].products[productIndex].saleBT = qtyBT - unloadingBT;
    newBills[billIndex].products[productIndex].salesValue = 
      newBills[billIndex].products[productIndex].saleBT * 
      (parseFloat(newBills[billIndex].products[productIndex].price) || 0);
    
    setCurrentUnitBills(newBills);
  };

  const handleEdit = async () => {
    try {
      const q = query(billReviewsCollectionRef, where("unitId", "==", currentUnitId));
      const querySnapshot = await getDocs(q);
      const review = querySnapshot.docs[0]?.data();
      if (review) {
        setCurrentUnitBills(review.bills);
        // Update isSaved to false to enable Save button again
        const reviewDocId = querySnapshot.docs[0].id;
        await updateDoc(doc(db, "BillReviews", reviewDocId), { isSaved: false });
        await fetchSavedReviews(); // Refresh reviews to reflect updated isSaved
        alert("Loaded saved values for editing. Save button re-enabled.");
      } else {
        alert("No saved review found for this unit.");
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

      const existingReview = savedReviews.find(review => review.unitId === currentUnitId);
      const reviewData = {
        unitId: currentUnitId,
        bills: currentUnitBills,
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

          {currentUnitBills.map((item, billIndex) => (
            <div key={billIndex} className="mb-4">
              <h5>Bill: {item.billNo} - {item.outletName}</h5>
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
                  {item.products.map((product, productIndex) => (
                    <tr key={productIndex}>
                      <td>{products.find(p => p.id === product.productId)?.name} - {product.optionId}</td>
                      <td>{product.qty}</td>
                      <td>{product.bottlesPerCase || '-'}</td>
                      <td>{product.bottlesPerCase ? product.caseCount : '-'}</td>
                      <td>{product.bottlesPerCase ? product.extraBottles : '-'}</td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          value={product.unloadingBT}
                          onChange={(e) => handleUnloadingBTChange(billIndex, productIndex, e.target.value)}
                          min="0"
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>{product.saleBT}</td>
                      <td>{product.salesValue.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ textAlign: "right", color: "green", fontWeight: "bold" }}>
                Total Sales Value: Rs. {calculateSalesValueTotal(item.products)}
              </div>
              <hr />
            </div>
          ))}
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
              <h5>Bills</h5>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcessedBillReview;