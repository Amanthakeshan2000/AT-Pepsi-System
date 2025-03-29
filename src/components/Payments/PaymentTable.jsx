import React, { useState, useEffect } from "react";
import { db } from "../../utilities/firebaseConfig";
import { collection, getDocs, query, orderBy, doc, updateDoc, getDoc, setDoc, addDoc, serverTimestamp } from "firebase/firestore";
import 'bootstrap-icons/font/bootstrap-icons.css';

const PaymentTable = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBill, setSelectedBill] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split("T")[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [printMode, setPrintMode] = useState(false);
  const [selectedOutlet, setSelectedOutlet] = useState("");
  const [outlets, setOutlets] = useState([]);

  const billsCollectionRef = collection(db, "Bill");
  const paymentsCollectionRef = collection(db, "Payments");

  useEffect(() => {
    fetchBills();
  }, [selectedOutlet]);

  useEffect(() => {
    fetchOutlets();
  }, []);

  const fetchOutlets = async () => {
    try {
      const billsSnapshot = await getDocs(billsCollectionRef);
      const outletSet = new Set();
      
      billsSnapshot.docs.forEach(doc => {
        const bill = doc.data();
        if (bill.outletName) {
          outletSet.add(bill.outletName);
        }
      });
      
      setOutlets(Array.from(outletSet).sort());
    } catch (error) {
      console.error("Error fetching outlets:", error.message);
    }
  };

  const fetchBills = async () => {
    setLoading(true);
    try {
      // Fetch bills
      const q = query(billsCollectionRef, orderBy("createDate", "desc"));
      const querySnapshot = await getDocs(q);
      
      let billList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        totalAmount: calculateTotalAmount(doc.data()),
        payments: [],
        balance: 0,
      }));

      // Apply outlet filter if selected
      if (selectedOutlet) {
        billList = billList.filter(bill => bill.outletName === selectedOutlet);
      }
      
      // Fetch payment history for each bill
      const paymentSnapshots = await getDocs(paymentsCollectionRef);
      const paymentList = paymentSnapshots.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Organize payments by bill ID
      billList = billList.map(bill => {
        const billPayments = paymentList.filter(payment => payment.billId === bill.id);
        
        billPayments.sort((a, b) => {
          return new Date(a.paymentDate) - new Date(b.paymentDate);
        });
        
        const paidAmount = billPayments.reduce((sum, payment) => sum + payment.amount, 0);
        const balance = bill.totalAmount - paidAmount;
        
        return {
          ...bill,
          payments: billPayments,
          paidAmount,
          balance
        };
      });
      
      setBills(billList);
    } catch (error) {
      console.error("Error fetching bills:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalAmount = (bill) => {
    let total = 0;
    
    // Add product options total
    if (bill.productOptions && bill.productOptions.length > 0) {
      bill.productOptions.forEach(option => {
        total += (parseFloat(option.price) || 0) * (parseFloat(option.qty) || 0);
      });
    }
    
    // Subtract discount options total
    if (bill.discountOptions && bill.discountOptions.length > 0) {
      total -= bill.discountOptions.reduce((sum, option) => sum + (parseFloat(option.total) || 0), 0);
    }
    
    // Subtract expire options total
    if (bill.expireOptions && bill.expireOptions.length > 0) {
      total -= bill.expireOptions.reduce((sum, option) => sum + (parseFloat(option.total) || 0), 0);
    }
    
    return parseFloat(total.toFixed(2));
  };

  const handleSelectBill = (bill) => {
    setSelectedBill(bill);
    setPaymentHistory(bill.payments || []);
    setPaymentAmount(bill.balance.toString());
  };

  const handlePaymentSubmit = async () => {
    if (!selectedBill) return;
    
    const amount = parseFloat(paymentAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid payment amount");
      return;
    }
    
    if (amount > selectedBill.balance) {
      alert("Payment amount cannot exceed the remaining balance");
      return;
    }
    
    try {
      const paymentData = {
        billId: selectedBill.id,
        billNo: selectedBill.billNo,
        outletName: selectedBill.outletName,
        amount: amount,
        paymentDate: paymentDate,
        createdAt: serverTimestamp(),
        paymentNumber: (selectedBill.payments.length + 1)
      };
      
      await addDoc(paymentsCollectionRef, paymentData);
      
      alert("Payment recorded successfully!");
      setSelectedBill(null);
      setPaymentAmount("");
      fetchBills();
    } catch (error) {
      console.error("Error recording payment:", error.message);
      alert("Failed to record payment: " + error.message);
    }
  };

  const handlePrint = () => {
    setPrintMode(true);
    setTimeout(() => {
      window.print();
      setPrintMode(false);
    }, 300);
  };

  const handleDownloadPDF = () => {
    const printContent = document.querySelector('.print-content');
    const originalContents = document.body.innerHTML;
    
    document.body.innerHTML = printContent.innerHTML;
    
    window.print();
    
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  // Filter bills by search term
  const filteredBills = bills.filter(bill => 
    bill.billNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.outletName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Find the maximum number of payments for any bill to determine columns
  const maxPaymentCount = bills.reduce((max, bill) => 
    Math.max(max, bill.payments.length), 0);

  return (
    <div className="container">
      <h3>Payment Tracking</h3>

      <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center gap-3">
            <div className="input-group" style={{ width: "300px" }}>
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Search bills..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
            </div>

            <div className="input-group" style={{ width: "300px" }}>
              <span className="input-group-text">
                <i className="bi bi-shop"></i>
              </span>
              <select 
                className="form-select" 
                value={selectedOutlet}
                onChange={(e) => setSelectedOutlet(e.target.value)}
              >
                <option value="">All Outlets</option>
                {outlets.map((outlet, index) => (
                  <option key={index} value={outlet}>{outlet}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="d-flex gap-2">
            <button className="btn btn-success" onClick={handlePrint}>
              <i className="bi bi-printer"></i> Print
            </button>
            <button className="btn btn-primary" onClick={handleDownloadPDF}>
              <i className="bi bi-file-earmark-pdf"></i> PDF
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading bills...</p>
          </div>
        ) : filteredBills.length === 0 ? (
          <div className="alert alert-info">
            No bills found. Try a different search term or outlet.
          </div>
        ) : (
          <div className="print-content">
            <div className="d-none d-print-block text-center mb-4">
              <h2 style={{ margin: "0" }}>Advance Trading</h2>
              <p style={{ margin: "3px 0" }}>Reg Office: No: 170/A, Nuwaraeliya Rd, Delpitiya, Gampola</p>
              <p style={{ margin: "2px 0" }}>Tel: 072-7070701</p>
              <h3 style={{ margin: "8px 0" }}>Payment Tracking Report</h3>
              {selectedOutlet && <h4 style={{ margin: "5px 0" }}>Outlet: {selectedOutlet}</h4>}
            </div>

            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead className="table-dark">
                  <tr>
                    <th className="text-white">Date</th>
                    <th className="text-white">Bill No</th>
                    <th className="text-white">Outlet Name</th>
                    <th className="text-white text-end">Total (Rs.)</th>
                    {Array.from({ length: maxPaymentCount }).map((_, i) => (
                      <th key={i} className="text-white text-end">Payment {i+1} (Rs.)</th>
                    ))}
                    <th className="text-white text-end">Balance (Rs.)</th>
                    <th className="text-white d-print-none">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBills.map((bill) => (
                    <tr key={bill.id} className={bill.balance <= 0 ? "table-success" : ""}>
                      <td>{formatDate(bill.createDate)}</td>
                      <td>{bill.billNo}</td>
                      <td>{bill.outletName}</td>
                      <td className="text-end">{formatCurrency(bill.totalAmount)}</td>
                      {Array.from({ length: maxPaymentCount }).map((_, i) => (
                        <td key={i} className="text-end">
                          {bill.payments[i] 
                            ? `${formatCurrency(bill.payments[i].amount)} (${formatDate(bill.payments[i].paymentDate)})` 
                            : "-"}
                        </td>
                      ))}
                      <td className="text-end fw-bold">{formatCurrency(bill.balance)}</td>
                      <td className="d-print-none">
                        <button 
                          className="btn btn-primary btn-sm" 
                          onClick={() => handleSelectBill(bill)}
                          disabled={bill.balance <= 0}
                        >
                          <i className="bi bi-cash"></i> Record Payment
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-none d-print-flex mt-5" style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "30%", borderTop: "1px solid #000", textAlign: "center", paddingTop: "10px" }}>
                <p>Prepared By</p>
              </div>
              <div style={{ width: "30%", borderTop: "1px solid #000", textAlign: "center", paddingTop: "10px" }}>
                <p>Checked By</p>
              </div>
              <div style={{ width: "30%", borderTop: "1px solid #000", textAlign: "center", paddingTop: "10px" }}>
                <p>Approved By</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {selectedBill && (
        <div className="modal" style={{ display: "block", position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-content" style={{ backgroundColor: "#fff", margin: "5% auto", padding: "20px", width: "90%", maxWidth: "600px", borderRadius: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #ddd", paddingBottom: "10px", marginBottom: "20px" }}>
              <h4>Record Payment for Bill #{selectedBill.billNo}</h4>
              <button className="btn btn-danger" onClick={() => setSelectedBill(null)}>
                <i className="bi bi-x-circle"></i> Close
              </button>
            </div>
            
            <div className="row mb-3">
              <div className="col-md-6">
                <p><strong>Outlet:</strong> {selectedBill.outletName}</p>
                <p><strong>Bill No:</strong> {selectedBill.billNo}</p>
                <p><strong>Date:</strong> {formatDate(selectedBill.createDate)}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Total Amount:</strong> Rs. {formatCurrency(selectedBill.totalAmount)}</p>
                <p><strong>Paid Amount:</strong> Rs. {formatCurrency(selectedBill.paidAmount)}</p>
                <p><strong>Balance Due:</strong> Rs. {formatCurrency(selectedBill.balance)}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <h5>Payment History</h5>
              {paymentHistory.length === 0 ? (
                <p>No payment history available.</p>
              ) : (
                <table className="table table-sm table-bordered">
                  <thead className="table-secondary">
                    <tr>
                      <th>Payment #</th>
                      <th>Date</th>
                      <th className="text-end">Amount (Rs.)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentHistory.map((payment, index) => (
                      <tr key={index}>
                        <td>{payment.paymentNumber || index + 1}</td>
                        <td>{formatDate(payment.paymentDate)}</td>
                        <td className="text-end">{formatCurrency(payment.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            
            <div>
              <h5>Record New Payment</h5>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Payment Date</label>
                  <input 
                    type="date" 
                    className="form-control"
                    value={paymentDate}
                    onChange={(e) => setPaymentDate(e.target.value)}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Payment Amount (Rs.)</label>
                  <input 
                    type="number" 
                    className="form-control"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    placeholder="Enter amount"
                    step="0.01"
                    min="0.01"
                    max={selectedBill.balance}
                  />
                </div>
              </div>
              <div className="d-grid">
                <button 
                  className="btn btn-success" 
                  onClick={handlePaymentSubmit}
                  disabled={!paymentAmount || parseFloat(paymentAmount) <= 0 || parseFloat(paymentAmount) > selectedBill.balance}
                >
                  <i className="bi bi-save"></i> Save Payment
                </button>
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
            .d-print-none {
              display: none !important;
            }
            .print-content {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              padding: 20px;
            }
            @page {
              size: A4 landscape;
              margin: 15mm 10mm;
            }
            .table {
              width: 100% !important;
              border-collapse: collapse;
            }
            .table th, .table td {
              padding: 8px;
              border: 1px solid #ddd;
            }
            .table-dark {
              background-color: #343a40 !important;
              color: white !important;
            }
            .text-white {
              color: white !important;
            }
            .text-end {
              text-align: right !important;
            }
            .d-print-block {
              display: block !important;
            }
            .d-print-flex {
              display: flex !important;
            }
            .table-success {
              background-color: #d1e7dd !important;
            }
          }
          
          /* Additional styles for non-print view */
          .table-dark th {
            color: white !important;
          }
        `}
      </style>
    </div>
  );
};

export default PaymentTable;
