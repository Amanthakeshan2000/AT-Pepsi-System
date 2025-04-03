import React, { useState, useEffect } from "react";
import { db } from "../../utilities/firebaseConfig";
import { collection, getDocs, query, orderBy, doc, updateDoc, getDoc, setDoc, addDoc, serverTimestamp, where, deleteDoc } from "firebase/firestore";
import 'bootstrap-icons/font/bootstrap-icons.css';

const PaymentTable = () => {
  const [bills, setBills] = useState([]);
  const [myBills, setMyBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myBillsLoading, setMyBillsLoading] = useState(true);
  const [selectedBill, setSelectedBill] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split("T")[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [printMode, setPrintMode] = useState(false);
  const [printMyBills, setPrintMyBills] = useState(false);
  const [selectedOutlet, setSelectedOutlet] = useState("");
  const [outlets, setOutlets] = useState([]);

  const billsCollectionRef = collection(db, "Bill");
  const paymentsCollectionRef = collection(db, "Payments");
  const myBillsCollectionRef = collection(db, "MyBills");

  useEffect(() => {
    fetchBills();
    fetchMyBills();
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
      
      // Get the list of bills that are already in myBills
      const userEmail = localStorage.getItem("userEmail") || "Unknown";
      const myBillsQuery = query(myBillsCollectionRef, where("userEmail", "==", userEmail));
      const myBillsSnapshot = await getDocs(myBillsQuery);
      
      const myBillIds = new Set();
      myBillsSnapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.billId) {
          myBillIds.add(data.billId);
        }
      });
      
      // Filter out bills that are already in myBills
      billList = billList.filter(bill => !myBillIds.has(bill.id));
      
      setBills(billList);
    } catch (error) {
      console.error("Error fetching bills:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyBills = async () => {
    setMyBillsLoading(true);
    try {
      // Get the logged-in user's email
      const userEmail = localStorage.getItem("userEmail") || "Unknown";
      
      // Fetch myBills collection
      const q = query(myBillsCollectionRef, where("userEmail", "==", userEmail));
      const querySnapshot = await getDocs(q);
      
      const myBillIds = new Set();
      const myBillsList = [];
      
      // First, collect all the bill IDs from MyBills
      querySnapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.billId) {
          myBillIds.add(data.billId);
          myBillsList.push({
            myBillId: doc.id,
            billId: data.billId,
            addedAt: data.addedAt
          });
        }
      });
      
      // Then fetch the actual bill data for each myBill
      const billPromises = myBillsList.map(async (myBill) => {
        const billDoc = await getDoc(doc(db, "Bill", myBill.billId));
        if (billDoc.exists()) {
          const billData = billDoc.data();
          
          // Calculate total amount
          const totalAmount = calculateTotalAmount(billData);
          
          // Fetch payments for this bill
          const paymentQuery = query(paymentsCollectionRef, where("billId", "==", myBill.billId));
          const paymentSnapshot = await getDocs(paymentQuery);
          
          const payments = paymentSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          
          payments.sort((a, b) => new Date(a.paymentDate) - new Date(b.paymentDate));
          
          const paidAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
          const balance = totalAmount - paidAmount;
          
          return {
            id: myBill.billId,
            myBillId: myBill.myBillId,
            addedAt: myBill.addedAt,
            ...billData,
            totalAmount,
            payments,
            paidAmount,
            balance
          };
        }
        return null;
      });
      
      const resolvedBills = (await Promise.all(billPromises)).filter(bill => bill !== null);
      
      // Sort by date added to MyBills (newest first)
      resolvedBills.sort((a, b) => {
        const dateA = a.addedAt?.toDate() || new Date(0);
        const dateB = b.addedAt?.toDate() || new Date(0);
        return dateB - dateA;
      });
      
      setMyBills(resolvedBills);
      
      // Filter out bills that are already in myBills when setting the main bills list
      setBills(prevBills => prevBills.filter(bill => !myBillIds.has(bill.id)));
    } catch (error) {
      console.error("Error fetching my bills:", error.message);
    } finally {
      setMyBillsLoading(false);
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
    setPrintMyBills(false);
    setTimeout(() => {
      window.print();
      setPrintMode(false);
    }, 300);
  };

  const handlePrintMyBills = () => {
    setPrintMode(true);
    setPrintMyBills(true);
    setTimeout(() => {
      window.print();
      setPrintMode(false);
      setPrintMyBills(false);
    }, 300);
  };

  const handleDownloadPDF = (isMyBills = false) => {
    setPrintMode(true);
    setPrintMyBills(isMyBills);
    // Create a custom print style for the computer form size
    const customStyle = document.createElement('style');
    customStyle.id = 'computer-form-style';
    customStyle.textContent = `
      @page {
        size: 9.5in 11in !important;
        margin: 0.5in 0.5in !important;
      }
      .print-content {
        width: 8.5in !important;
        padding: 0.25in !important;
      }
      .print-content table {
        font-size: 12pt !important;
        width: 100% !important;
        table-layout: fixed !important;
      }
      .print-content table th {
        background-color: #e0e0e0 !important;
        color: #000000 !important;
        font-weight: bold !important;
        border: 1px solid #999 !important;
        font-size: 13pt !important;
        padding: 6px !important;
      }
      .print-content h2 {
        font-size: 18pt !important;
        margin-bottom: 4px !important;
        font-weight: bold !important;
      }
      .print-content h3 {
        font-size: 16pt !important;
        margin-bottom: 6px !important;
        color: #333 !important;
      }
      .print-content p {
        font-size: 11pt !important;
        margin: 3px 0 !important;
      }
      .print-content th, .print-content td {
        padding: 6px !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        white-space: nowrap !important;
        font-size: 12pt !important;
      }
      .print-content .text-end {
        font-weight: bold !important;
      }
      /* Form page break setup */
      .form-page {
        page-break-after: always;
        position: relative;
        min-height: 9.5in;
        max-height: 10in;
        overflow: hidden;
        border: 1px dashed transparent;
        padding: 0.5in;
      }
      .form-page:last-child {
        page-break-after: avoid;
      }
      .form-page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.3in;
        border-bottom: 2px solid #333;
        padding-bottom: 0.1in;
      }
      .form-page-logo {
        width: 1.5in;
        height: 0.8in;
        border: 1px solid #999;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        font-size: 14pt;
      }
      .form-page-title {
        text-align: center;
        flex-grow: 1;
      }
      .form-page-title h2 {
        margin: 0;
        font-size: 20pt !important;
      }
      .form-page-title p {
        margin: 3px 0;
        font-size: 10pt !important;
      }
      .form-page-watermark {
        position: absolute;
        top: 0.3in;
        right: 0.5in;
        font-size: 14pt;
        font-weight: bold;
        padding: 5px 10px;
        border: 2px solid;
        transform: rotate(-10deg);
        z-index: 100;
        background-color: rgba(255, 255, 255, 0.8);
      }
      .form-page-footer {
        position: absolute;
        bottom: 0.3in;
        right: 0.5in;
        font-size: 10pt;
        color: #555;
      }
      .form-divider {
        display: block;
        width: 100%;
        font-size: 10pt;
        text-align: center;
        margin: 0.1in 0;
        border-top: 2px dashed #777;
        padding-top: 5px;
        color: #666;
        position: relative;
      }
      /* Pin feed holes indicators */
      .form-page::before, .form-page::after {
        content: "";
        position: absolute;
        width: 0.25in;
        top: 0;
        bottom: 0;
        background-image: repeating-linear-gradient(0deg, transparent, transparent 0.45in, #aaa 0.45in, #aaa 0.5in);
      }
      .form-page::before {
        left: -0.25in;
        border-right: 1px dashed #777;
      }
      .form-page::after {
        right: -0.25in;
        border-left: 1px dashed #777;
      }
      /* Pin feed hole circles */
      .pin-holes-left, .pin-holes-right {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 0.25in;
        z-index: 2;
      }
      .pin-holes-left {
        left: -0.25in;
      }
      .pin-holes-right {
        right: -0.25in;
      }
      .pin-hole {
        position: absolute;
        width: 0.125in;
        height: 0.125in;
        border-radius: 50%;
        border: 1px solid #777;
        background-color: white;
        left: 50%;
        transform: translateX(-50%);
      }
      .form-page-signatures {
        display: flex;
        justify-content: space-between;
        margin-top: 1in;
      }
      .form-page-signature {
        width: 30%;
        text-align: center;
      }
      .form-page-signature-line {
        width: 100%;
        border-top: 1px solid black;
        margin-bottom: 5px;
      }
      .form-page-signature-title {
        font-size: 11pt;
      }
      .table-success {
        background-color: rgba(209, 231, 221, 0.7) !important;
      }
    `;
    document.head.appendChild(customStyle);
    
    const printContent = document.querySelector(isMyBills ? '.my-bills-print-content' : '.print-content');
    const originalHTML = printContent.innerHTML;
    
    // Create a container with three copies (original, duplicate, triplicate)
    const formContent = document.createElement('div');
    formContent.className = 'computer-form-container';
    
    // Create all three copies
    const copyTypes = [
      { type: 'ORIGINAL', color: '#000000' },
      { type: 'DUPLICATE', color: '#1a5fb4' },
      { type: 'TRIPLICATE', color: '#a51d2d' }
    ];
    
    copyTypes.forEach((copy, index) => {
      const copyPage = document.createElement('div');
      copyPage.className = 'form-page';
      
      // Create custom header with logo area
      const header = document.createElement('div');
      header.className = 'form-page-header';
      
      // Logo placeholder
      const logo = document.createElement('div');
      logo.className = 'form-page-logo';
      logo.textContent = 'PEPSI';
      
      // Title and company info
      const title = document.createElement('div');
      title.className = 'form-page-title';
      title.innerHTML = `
        <h2>Advance Trading</h2>
        <p>Reg Office: No: 170/A, Nuwaraeliya Rd, Delpitiya, Gampola</p>
        <p>Tel: 072-7070701</p>
        <h3>${isMyBills ? 'My Bills Report' : 'Payment Tracking Report'}</h3>
        ${selectedOutlet ? `<p><strong>Outlet: ${selectedOutlet}</strong></p>` : ''}
      `;
      
      header.appendChild(logo);
      header.appendChild(title);
      
      // Add the header to the form page
      copyPage.appendChild(header);
      
      // Add the main content (table)
      const content = document.createElement('div');
      content.innerHTML = originalHTML;
      content.querySelector('.d-none.d-print-block').remove(); // Remove the original header
      copyPage.appendChild(content);
      
      // Add signature section
      const signatures = document.createElement('div');
      signatures.className = 'form-page-signatures';
      
      const positions = ['Prepared By', 'Checked By', 'Approved By'];
      positions.forEach(position => {
        const signature = document.createElement('div');
        signature.className = 'form-page-signature';
        signature.innerHTML = `
          <div class="form-page-signature-line"></div>
          <div class="form-page-signature-title">${position}</div>
        `;
        signatures.appendChild(signature);
      });
      
      copyPage.appendChild(signatures);
      
      // Add watermark to each copy
      const watermark = document.createElement('div');
      watermark.className = 'form-page-watermark';
      watermark.textContent = `${copy.type} COPY`;
      watermark.style.color = copy.color;
      watermark.style.borderColor = copy.color;
      copyPage.appendChild(watermark);
      
      // Add footer to each copy
      const footer = document.createElement('div');
      footer.className = 'form-page-footer';
      footer.textContent = `Page ${index + 1} of 3 • ${new Date().toLocaleDateString()}`;
      copyPage.appendChild(footer);
      
      // Add pin feed holes
      const leftHoles = document.createElement('div');
      leftHoles.className = 'pin-holes-left';
      const rightHoles = document.createElement('div');
      rightHoles.className = 'pin-holes-right';
      
      // Add 22 pin holes for an 11-inch form (every 0.5 inch)
      for (let i = 0; i < 22; i++) {
        const leftHole = document.createElement('div');
        leftHole.className = 'pin-hole';
        leftHole.style.top = `${i * 0.5}in`;
        leftHoles.appendChild(leftHole);
        
        const rightHole = document.createElement('div');
        rightHole.className = 'pin-hole';
        rightHole.style.top = `${i * 0.5}in`;
        rightHoles.appendChild(rightHole);
      }
      
      copyPage.appendChild(leftHoles);
      copyPage.appendChild(rightHoles);
      
      // Add divider between copies (except the last one)
      if (index < copyTypes.length - 1) {
        const divider = document.createElement('div');
        divider.className = 'form-divider';
        divider.innerHTML = '✂️ <span style="background-color: white; padding: 0 8px;">TEAR HERE</span> ✂️';
        copyPage.appendChild(divider);
      }
      
      formContent.appendChild(copyPage);
    });
    
    // Replace body content with our custom 3-ply form
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = '';
    document.body.appendChild(formContent);
    
    // Print the document
    window.print();
    
    // Restore original content and remove custom styles
    document.body.innerHTML = originalContents;
    const style = document.getElementById('computer-form-style');
    if (style) style.remove();
    setPrintMode(false);
    setPrintMyBills(false);
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

  const addToMyBills = async (bill) => {
    try {
      const userEmail = localStorage.getItem("userEmail") || "Unknown";
      
      // Add to MyBills collection
      await addDoc(myBillsCollectionRef, {
        billId: bill.id,
        userEmail: userEmail,
        addedAt: serverTimestamp()
      });
      
      // Remove from bills list and add to myBills list
      setBills(prevBills => prevBills.filter(b => b.id !== bill.id));
      
      // Refresh my bills to show the newly added bill
      fetchMyBills();
      
      alert("Bill added to My Bills successfully!");
    } catch (error) {
      console.error("Error adding to My Bills:", error.message);
      alert("Failed to add to My Bills: " + error.message);
    }
  };

  const removeFromMyBills = async (myBillId, billId) => {
    try {
      // Delete from MyBills collection
      await deleteDoc(doc(db, "MyBills", myBillId));
      
      // Remove from myBills list
      setMyBills(prevMyBills => prevMyBills.filter(b => b.myBillId !== myBillId));
      
      // Refresh bills to include the removed bill
      fetchBills();
      
      alert("Bill removed from My Bills successfully!");
    } catch (error) {
      console.error("Error removing from My Bills:", error.message);
      alert("Failed to remove from My Bills: " + error.message);
    }
  };

  return (
    <div className="container">
      <h3>Payment Tracking</h3>

      {/* My Bills Section */}
      <div style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">
            <i className="bi bi-star-fill text-warning me-2"></i>
            My Bills
          </h4>
          <div className="d-flex gap-2">
            <button className="btn btn-success btn-sm" onClick={handlePrintMyBills}>
              <i className="bi bi-printer"></i> Print
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => handleDownloadPDF(true)}>
              <i className="bi bi-file-earmark-pdf"></i> PDF
            </button>
          </div>
        </div>
        
        {myBillsLoading ? (
          <div className="text-center my-3">
            <div className="spinner-border spinner-border-sm text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading your bills...</p>
          </div>
        ) : myBills.length === 0 ? (
          <div className="alert alert-info">
            <i className="bi bi-info-circle me-2"></i>
            No bills added to My Bills yet. Click the <i className="bi bi-plus-circle"></i> icon next to a bill below to add it here.
          </div>
        ) : (
          <div className="my-bills-print-content">
            <div className="d-none d-print-block text-center mb-4">
              <h2 style={{ margin: "0" }}>Advance Trading</h2>
              <p style={{ margin: "3px 0" }}>Reg Office: No: 170/A, Nuwaraeliya Rd, Delpitiya, Gampola</p>
              <p style={{ margin: "2px 0" }}>Tel: 072-7070701</p>
              <h3 style={{ margin: "8px 0" }}>My Bills Report</h3>
              {selectedOutlet && <h4 style={{ margin: "5px 0" }}>Outlet: {selectedOutlet}</h4>}
            </div>

            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-primary">
                  <tr>
                    <th>Date</th>
                    <th>Bill No</th>
                    <th>Outlet Name</th>
                    <th className="text-end">Total (Rs.)</th>
                    <th className="text-end">Balance (Rs.)</th>
                    <th className="d-print-none">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {myBills.map((bill) => (
                    <tr key={bill.id} className={bill.balance <= 0 ? "table-success" : ""}>
                      <td>{formatDate(bill.createDate)}</td>
                      <td>{bill.billNo}</td>
                      <td>{bill.outletName}</td>
                      <td className="text-end">{formatCurrency(bill.totalAmount)}</td>
                      <td className="text-end fw-bold">{formatCurrency(bill.balance)}</td>
                      <td className="d-print-none">
                        <div className="d-flex gap-2">
                          <button 
                            className="btn btn-danger btn-sm" 
                            onClick={() => removeFromMyBills(bill.myBillId, bill.id)}
                            title="Remove from My Bills"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                          <button 
                            className="btn btn-primary btn-sm" 
                            onClick={() => handleSelectBill(bill)}
                            disabled={bill.balance <= 0}
                            title="Record Payment"
                          >
                            <i className="bi bi-cash"></i>
                          </button>
                        </div>
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

      {/* Payment Tracking Table */}
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
            <button className="btn btn-primary" onClick={() => handleDownloadPDF()}>
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
                        <div className="d-flex gap-2">
                          <button 
                            className="btn btn-success btn-sm" 
                            onClick={() => addToMyBills(bill)}
                            title="Add to My Bills"
                          >
                            <i className="bi bi-plus-circle"></i>
                          </button>
                          <button 
                            className="btn btn-primary btn-sm" 
                            onClick={() => handleSelectBill(bill)}
                            disabled={bill.balance <= 0}
                            title="Record Payment"
                          >
                            <i className="bi bi-cash"></i>
                          </button>
                        </div>
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

      {/* 3-ply form template for PDF download - hidden by default */}
      <div className="d-none">
        <div id="computer-form-template">
          {/* This content will be used for generating the 3-ply form */}
        </div>
      </div>

      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            ${printMyBills 
              ? '.my-bills-print-content, .my-bills-print-content *' 
              : '.print-content, .print-content *'} {
              visibility: visible;
            }
            .d-print-none {
              display: none !important;
            }
            ${printMyBills ? '.my-bills-print-content' : '.print-content'} {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              padding: 20px;
            }
            @page {
              size: ${printMode ? '9.5in 11in' : 'A4 landscape'};
              margin: ${printMode ? '0.5in 0.5in' : '15mm 10mm'};
            }
            .table {
              width: 100% !important;
              border-collapse: collapse;
            }
            .table th, .table td {
              padding: ${printMode ? '6px' : '8px'};
              border: 1px solid #ddd;
              font-size: ${printMode ? '12pt' : 'inherit'};
            }
            .table-dark {
              background-color: ${printMode ? '#e0e0e0' : '#343a40'} !important;
              color: ${printMode ? '#000' : 'white'} !important;
            }
            .text-white {
              color: ${printMode ? '#000' : 'white'} !important;
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
            /* Computer form specific styles */
            ${printMode ? `
            ${printMyBills ? '.my-bills-print-content' : '.print-content'} h2 {
              font-size: 18pt;
              font-weight: bold;
            }
            ${printMyBills ? '.my-bills-print-content' : '.print-content'} h3 {
              font-size: 16pt;
              margin-top: 8px;
            }
            ${printMyBills ? '.my-bills-print-content' : '.print-content'} h4 {
              font-size: 14pt;
            }
            ${printMyBills ? '.my-bills-print-content' : '.print-content'} p {
              font-size: 11pt;
              margin: 3px 0;
            }
            ${printMyBills ? '.my-bills-print-content' : '.print-content'} th {
              font-size: 13pt;
              font-weight: bold;
            }
            ${printMyBills ? '.my-bills-print-content' : '.print-content'} td {
              font-size: 12pt;
            }
            /* Form structure elements - only for direct print button */
            ${printMyBills ? '.my-bills-print-content' : '.print-content'}::before {
              content: "";
              position: absolute;
              width: 0.25in;
              top: 0;
              bottom: 0;
              left: -0.25in;
              border-right: 1px dashed #999;
              background-image: repeating-linear-gradient(0deg, transparent, transparent 0.45in, #ccc 0.45in, #ccc 0.5in);
            }
            ${printMyBills ? '.my-bills-print-content' : '.print-content'}::after {
              content: "";
              position: absolute;
              width: 0.25in;
              top: 0;
              bottom: 0;
              right: -0.25in;
              border-left: 1px dashed #999;
              background-image: repeating-linear-gradient(0deg, transparent, transparent 0.45in, #ccc 0.45in, #ccc 0.5in);
            }
            ` : ''}
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

