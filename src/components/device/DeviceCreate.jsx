import React, { useState, useEffect } from "react";
import { db } from "../../utilities/firebaseConfig";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import 'bootstrap-icons/font/bootstrap-icons.css';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ManualInvoice = () => {
  const [bills, setBills] = useState([]);
  const [selectedBills, setSelectedBills] = useState([]);
  const [manualInvoices, setManualInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedBill, setSelectedBill] = useState(null);
  const [customDate, setCustomDate] = useState(new Date().toISOString().split("T")[0]);
  const [driver, setDriver] = useState("");
  const [route, setRoute] = useState("");
  const [editInvoiceId, setEditInvoiceId] = useState(null);
  const [salesSummary, setSalesSummary] = useState(null);
  const [salesSummaries, setSalesSummaries] = useState([]);
  const [editSalesSummaryId, setEditSalesSummaryId] = useState(null);

  const billsCollectionRef = collection(db, "Bill");
  const manualBillsCollectionRef = collection(db, "ManualBill");
  const salesSummaryCollectionRef = collection(db, "SaleSummaryNew");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const billSnapshot = await getDocs(billsCollectionRef);
        setBills(billSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

        const manualSnapshot = await getDocs(manualBillsCollectionRef);
        setManualInvoices(manualSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

        const salesSnapshot = await getDocs(salesSummaryCollectionRef);
        setSalesSummaries(salesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, []);

  const generateInvoiceId = async () => {
    const querySnapshot = await getDocs(manualBillsCollectionRef);
    const count = querySnapshot.size + 1;
    return `MI${count.toString().padStart(5, "0")}`;
  };

  const handleAddBill = (bill) => {
    if (!selectedBills.some((selected) => selected.id === bill.id)) {
      setSelectedBills([...selectedBills, bill]);
    } else {
      alert("This bill is already added!");
    }
  };

  const handleRemoveBill = (billId) => {
    setSelectedBills(selectedBills.filter((bill) => bill.id !== billId));
  };

  const handleViewBill = (bill) => {
    setSelectedBill(bill);
  };

  const handleClosePopup = () => {
    setSelectedBill(null);
    setSalesSummary(null);
    setEditSalesSummaryId(null);
  };

  const handleSaveManualInvoice = async () => {
    if (selectedBills.length === 0 || !customDate || !driver || !route) {
      alert("Please fill all required fields!");
      return;
    }

    const invoiceData = {
      bills: selectedBills,
      customDate,
      driver,
      route,
      createdAt: new Date().toISOString(),
    };

    try {
      if (editInvoiceId) {
        await updateDoc(doc(db, "ManualBill", editInvoiceId), invoiceData);
        setManualInvoices(manualInvoices.map((inv) => (inv.id === editInvoiceId ? { ...inv, ...invoiceData } : inv)));
        alert("Manual Invoice Updated!");
        setEditInvoiceId(null);
      } else {
        const newInvoiceId = await generateInvoiceId();
        const docRef = await addDoc(manualBillsCollectionRef, { ...invoiceData, invoiceId: newInvoiceId });
        setManualInvoices([...manualInvoices, { id: docRef.id, invoiceId: newInvoiceId, ...invoiceData }]);
        alert("Manual Invoice Saved!");
      }
      setSelectedBills([]);
      setCustomDate(new Date().toISOString().split("T")[0]);
      setDriver("");
      setRoute("");
    } catch (error) {
      console.error("Error saving manual invoice:", error.message);
      alert("Failed to save manual invoice.");
    }
  };

  const handleDeleteManualInvoice = async (invoiceId) => {
    if (window.confirm("Are you sure you want to delete this manual invoice?")) {
      try {
        await deleteDoc(doc(db, "ManualBill", invoiceId));
        setManualInvoices(manualInvoices.filter((invoice) => invoice.id !== invoiceId));
        alert("Manual Invoice Deleted!");
      } catch (error) {
        console.error("Error deleting manual invoice:", error.message);
        alert("Failed to delete manual invoice.");
      }
    }
  };

  const handleEditManualInvoice = (invoice) => {
    setEditInvoiceId(invoice.id);
    setSelectedBills(invoice.bills);
    setCustomDate(invoice.customDate);
    setDriver(invoice.driver);
    setRoute(invoice.route);
  };

  const handleCreateSalesSummary = (invoice) => {
    const allOptions = invoice.bills.flatMap((bill) => bill.productOptions);
    const uniqueOptions = [...new Map(allOptions.map((opt) => [opt.optionId, { optionId: opt.optionId, price: parseFloat(opt.price) || 0 }])).values()];

    const initialSummary = invoice.bills.map((bill) => {
      const productOptions = uniqueOptions.map((opt) => ({
        optionId: opt.optionId,
        price: opt.price,
        qty: "",
      }));
      return {
        invoiceId: invoice.invoiceId || invoice.id,
        billNo: bill.billNo,
        outletName: bill.outletName,
        productOptions,
        discount: "",
        expire: "",
        cash: "",
        cheque: "",
        credit: "",
      };
    });
    setSalesSummary({ invoiceId: invoice.invoiceId || invoice.id, data: initialSummary, uniqueOptions });
    setEditSalesSummaryId(null);
  };

  const handleEditSalesSummary = (invoice) => {
    const existingSummary = salesSummaries.find((summary) => summary.invoiceId === (invoice.invoiceId || invoice.id));
    if (existingSummary) {
      setSalesSummary({
        invoiceId: existingSummary.invoiceId,
        data: existingSummary.data,
        uniqueOptions: [...new Map(existingSummary.data.flatMap((bill) => bill.productOptions).map((opt) => [opt.optionId, { optionId: opt.optionId, price: parseFloat(opt.price) || 0 }])).values()],
      });
      setEditSalesSummaryId(existingSummary.id);
    } else {
      alert("No sales summary exists for this invoice. Create one first.");
    }
  };

  const handleSalesQtyChange = (billIdx, optIdx, value) => {
    const updatedSummary = { ...salesSummary };
    updatedSummary.data[billIdx].productOptions[optIdx].qty = value;
    setSalesSummary(updatedSummary);
  };

  const handleSalesFieldChange = (billIdx, field, value) => {
    const updatedSummary = { ...salesSummary };
    updatedSummary.data[billIdx][field] = value;
    setSalesSummary(updatedSummary);
  };

  const calculateGrossSale = (bill) => {
    return bill.productOptions
      .reduce((sum, opt) => sum + (parseFloat(opt.qty) || 0) * (parseFloat(opt.price) || 0), 0)
      .toFixed(2);
  };

  const calculateNetSale = (bill) => {
    const gross = parseFloat(calculateGrossSale(bill)) || 0;
    const discount = parseFloat(bill.discount) || 0;
    const expire = parseFloat(bill.expire) || 0;
    return (gross - (discount + expire)).toFixed(2);
  };

  const handleSaveSalesSummary = async () => {
    try {
      const summaryData = {
        invoiceId: salesSummary.invoiceId,
        data: salesSummary.data,
        createdAt: new Date().toISOString(),
      };
      if (editSalesSummaryId) {
        await updateDoc(doc(db, "SaleSummaryNew", editSalesSummaryId), summaryData);
        setSalesSummaries(salesSummaries.map((sum) => (sum.id === editSalesSummaryId ? { id: editSalesSummaryId, ...summaryData } : sum)));
        alert("Sales Summary Updated!");
      } else {
        const docRef = await addDoc(salesSummaryCollectionRef, summaryData);
        setSalesSummaries([...salesSummaries, { id: docRef.id, ...summaryData }]);
        alert("Sales Summary Saved!");
      }
      setSalesSummary(null);
      setEditSalesSummaryId(null);
    } catch (error) {
      console.error("Error saving/updating sales summary:", error.message);
      alert("Failed to save/update sales summary.");
    }
  };

  const hasSalesSummary = (invoiceId) => {
    return salesSummaries.some((summary) => summary.invoiceId === invoiceId);
  };

  const calculateSummarySums = () => {
    if (!salesSummary || !salesSummary.data) return {};
    const sums = {
      productOptions: salesSummary.uniqueOptions.map(() => 0),
      grossSale: 0,
      discount: 0,
      expire: 0,
      netSale: 0,
      cash: 0,
      cheque: 0,
      credit: 0,
    };

    salesSummary.data.forEach((bill) => {
      bill.productOptions.forEach((opt, idx) => {
        sums.productOptions[idx] += parseFloat(opt.qty) || 0;
      });
      sums.grossSale += parseFloat(calculateGrossSale(bill)) || 0;
      sums.discount += parseFloat(bill.discount) || 0;
      sums.expire += parseFloat(bill.expire) || 0;
      sums.netSale += parseFloat(calculateNetSale(bill)) || 0;
      sums.cash += parseFloat(bill.cash) || 0;
      sums.cheque += parseFloat(bill.cheque) || 0;
      sums.credit += parseFloat(bill.credit) || 0;
    });

    return sums;
  };

  const filteredBills = bills.filter((bill) =>
    bill.billNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.outletName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.salesRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.refContact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastBill = currentPage * itemsPerPage;
  const indexOfFirstBill = indexOfLastBill - itemsPerPage;
  const currentBills = filteredBills.slice(indexOfFirstBill, indexOfLastBill);
  const totalPages = Math.ceil(filteredBills.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrintSalesSummary = async (invoice) => {
    const existingSummary = salesSummaries.find((summary) => summary.invoiceId === (invoice.invoiceId || invoice.id));
    if (!existingSummary) {
      alert("No sales summary exists for this invoice. Create one first.");
      return;
    }

    const uniqueOptions = [...new Map(existingSummary.data.flatMap((bill) => bill.productOptions).map((opt) => [opt.optionId, { optionId: opt.optionId, price: parseFloat(opt.price) || 0 }])).values()];

    // Create a temporary container for PDF rendering
    const tempDiv = document.createElement("div");
    tempDiv.style.position = "absolute";
    tempDiv.style.left = "-9999px"; // Off-screen
    tempDiv.style.width = "1123px"; // Approx A4 landscape width in pixels (297mm at 96dpi)
    tempDiv.style.padding = "10mm";
    tempDiv.style.backgroundColor = "#fff";
    tempDiv.style.fontFamily = "Arial, sans-serif";
    document.body.appendChild(tempDiv);

    // Populate the temporary div with content
    tempDiv.innerHTML = `
      <div style="margin-bottom: 10mm;">
        <h2 style="font-size: 16px; margin: 0;">Sales Summary for Invoice ${invoice.invoiceId || invoice.id}</h2>
        <p style="font-size: 12px; margin: 2px 0;"><strong>Custom Date:</strong> ${invoice.customDate}</p>
        <p style="font-size: 12px; margin: 2px 0;"><strong>Driver:</strong> ${invoice.driver}</p>
        <p style="font-size: 12px; margin: 2px 0;"><strong>Route:</strong> ${invoice.route}</p>
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
        <thead>
          <tr style="background-color: #f2f2f2;">
            <th style="border: 1px solid #000; padding: 4px; text-align: left;">Invoice ID</th>
            <th style="border: 1px solid #000; padding: 4px; text-align: left;">Bill No</th>
            <th style="border: 1px solid #000; padding: 4px; text-align: left;">Outlet Name</th>
            ${uniqueOptions.map((opt) => `<th style="border: 1px solid #000; padding: 4px; text-align: right;">${opt.optionId} (Rs.${(parseFloat(opt.price) || 0).toFixed(2)})</th>`).join("")}
            <th style="border: 1px solid #000; padding: 4px; text-align: right; background-color: #ffffe0;">Gross Sale</th>
            <th style="border: 1px solid #000; padding: 4px; text-align: right;">Discount</th>
            <th style="border: 1px solid #000; padding: 4px; text-align: right;">Expire</th>
            <th style="border: 1px solid #000; padding: 4px; text-align: right; background-color: #ffffe0;">Net Sale</th>
            <th style="border: 1px solid #000; padding: 4px; text-align: right;">Cash</th>
            <th style="border: 1px solid #000; padding: 4px; text-align: right;">Cheque</th>
            <th style="border: 1px solid #000; padding: 4px; text-align: right;">Credit</th>
          </tr>
        </thead>
        <tbody>
          ${existingSummary.data.map((bill) => `
            <tr>
              <td style="border: 1px solid #000; padding: 4px; text-align: left;">${bill.invoiceId}</td>
              <td style="border: 1px solid #000; padding: 4px; text-align: left;">${bill.billNo}</td>
              <td style="border: 1px solid #000; padding: 4px; text-align: left;">${bill.outletName}</td>
              ${uniqueOptions.map((opt) => {
                const productOption = bill.productOptions.find(po => po.optionId === opt.optionId);
                const qty = productOption ? (productOption.qty || 0) : 0;
                return `<td style="border: 1px solid #000; padding: 4px; text-align: right;">${qty}</td>`;
              }).join("")}
              <td style="border: 1px solid #000; padding: 4px; text-align: right; background-color: #ffffe0;">${calculateGrossSale(bill)}</td>
              <td style="border: 1px solid #000; padding: 4px; text-align: right;">${bill.discount || 0}</td>
              <td style="border: 1px solid #000; padding: 4px; text-align: right;">${bill.expire || 0}</td>
              <td style="border: 1px solid #000; padding: 4px; text-align: right; background-color: #ffffe0;">${calculateNetSale(bill)}</td>
              <td style="border: 1px solid #000; padding: 4px; text-align: right;">${bill.cash || 0}</td>
              <td style="border: 1px solid #000; padding: 4px; text-align: right;">${bill.cheque || 0}</td>
              <td style="border: 1px solid #000; padding: 4px; text-align: right;">${bill.credit || 0}</td>
            </tr>
          `).join("")}
          <tr style="background-color: #ffff99; font-weight: bold;">
            <td style="border: 1px solid #000; padding: 4px; text-align: left;" colspan="3">Total</td>
            ${uniqueOptions.map((_, idx) => `<td style="border: 1px solid #000; padding: 4px; text-align: right;">${calculateSummarySums().productOptions[idx].toFixed(2)}</td>`).join("")}
            <td style="border: 1px solid #000; padding: 4px; text-align: right;">${calculateSummarySums().grossSale.toFixed(2)}</td>
            <td style="border: 1px solid #000; padding: 4px; text-align: right;">${calculateSummarySums().discount.toFixed(2)}</td>
            <td style="border: 1px solid #000; padding: 4px; text-align: right;">${calculateSummarySums().expire.toFixed(2)}</td>
            <td style="border: 1px solid #000; padding: 4px; text-align: right;">${calculateSummarySums().netSale.toFixed(2)}</td>
            <td style="border: 1px solid #000; padding: 4px; text-align: right;">${calculateSummarySums().cash.toFixed(2)}</td>
            <td style="border: 1px solid #000; padding: 4px; text-align: right;">${calculateSummarySums().cheque.toFixed(2)}</td>
            <td style="border: 1px solid #000; padding: 4px; text-align: right;">${calculateSummarySums().credit.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    `;

    try {
      // Ensure the DOM is fully updated before rendering
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Convert to canvas with proper scaling
      const canvas = await html2canvas(tempDiv, {
        scale: 2, // Increased scale for better quality
        useCORS: true, // Handle cross-origin issues if any
        logging: false, // Disable logging for cleaner console
      });
      const imgData = canvas.toDataURL("image/png");

      // Create PDF in landscape A4 format
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = 297; // A4 width in mm (landscape)
      const pageHeight = 210; // A4 height in mm (landscape)
      const margin = 10; // 10mm margin
      const imgWidth = pageWidth - 2 * margin;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, "PNG", margin, margin, imgWidth, imgHeight);
      heightLeft -= (pageHeight - 2 * margin);

      // Add additional pages if content exceeds one page
      while (heightLeft > 0) {
        position -= (pageHeight - 2 * margin);
        pdf.addPage();
        pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
        heightLeft -= (pageHeight - 2 * margin);
      }

      // Save the PDF
      pdf.save(`Sales_Summary_${invoice.invoiceId || invoice.id}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      // Clean up
      document.body.removeChild(tempDiv);
    }
  };

  return (
    <div className="container">
      <h3>Manual Invoice Creation</h3>

      {/* Available Invoices Section */}
      <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
        <h4>Available Invoices</h4>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "15px" }}>
          <div style={{ position: "relative", width: "400px" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search bills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: "40px" }}
            />
            <i className="bi bi-search" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#888" }}></i>
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
            {currentBills.length > 0 ? (
              currentBills.map((bill) => (
                <tr key={bill.id}>
                  <td>{bill.billNo}</td>
                  <td>{bill.outletName}</td>
                  <td>{bill.salesRef}</td>
                  <td>{bill.refContact}</td>
                  <td>{bill.createDate}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button className="btn btn-info btn-sm" onClick={() => handleViewBill(bill)} title="View Details">
                        <i className="bi bi-eye"></i>
                      </button>
                      <button className="btn btn-success btn-sm" onClick={() => handleAddBill(bill)} title="Add to Manual Invoice">
                        <i className="bi bi-plus-circle"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No bills found</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="d-flex justify-content-center">
          <nav>
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                  <button className="page-link" onClick={() => paginate(index + 1)}>{index + 1}</button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Selected Invoices for Manual Invoice Section */}
      <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
        <h4>Selected Invoices for Manual Invoice</h4>
        <div className="row mb-3">
          <div className="col-md-4">
            <label>Custom Date</label>
            <input type="date" className="form-control" value={customDate} onChange={(e) => setCustomDate(e.target.value)} />
          </div>
          <div className="col-md-4">
            <label>Driver</label>
            <input type="text" className="form-control" value={driver} onChange={(e) => setDriver(e.target.value)} />
          </div>
          <div className="col-md-4">
            <label>Route</label>
            <input type="text" className="form-control" value={route} onChange={(e) => setRoute(e.target.value)} />
          </div>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Bill No</th>
              <th>Outlet Name</th>
              <th>Sales Ref</th>
              <th>Ref Contact</th>
              <th>Create Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {selectedBills.length > 0 ? (
              selectedBills.map((bill) => (
                <tr key={bill.id}>
                  <td>{bill.billNo}</td>
                  <td>{bill.outletName}</td>
                  <td>{bill.salesRef}</td>
                  <td>{bill.refContact}</td>
                  <td>{bill.createDate}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => handleRemoveBill(bill.id)} title="Remove from Manual Invoice">
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No bills added yet</td>
              </tr>
            )}
          </tbody>
        </table>
        {selectedBills.length > 0 && (
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" onClick={handleSaveManualInvoice}>
              {editInvoiceId ? "Update Manual Invoice" : "Save Manual Invoice"}
            </button>
          </div>
        )}
      </div>

      {/* Manual Invoice History Section */}
      <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px" }}>
        <h4>Manual Invoice History</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Custom Date</th>
              <th>Driver</th>
              <th>Route</th>
              <th>Bills Included</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {manualInvoices.length > 0 ? (
              manualInvoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>{invoice.invoiceId || invoice.id}</td>
                  <td>{invoice.customDate}</td>
                  <td>{invoice.driver}</td>
                  <td>{invoice.route}</td>
                  <td>{invoice.bills.map((bill) => bill.billNo).join(", ")}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button className="btn btn-info btn-sm" onClick={() => handleViewBill({ ...invoice, isManual: true })} title="View Details">
                        <i className="bi bi-eye"></i>
                      </button>
                      <button className="btn btn-warning btn-sm" onClick={() => handleEditManualInvoice(invoice)} title="Edit Invoice">
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDeleteManualInvoice(invoice.id)} title="Delete">
                        <i className="bi bi-trash"></i>
                      </button>
                      {!hasSalesSummary(invoice.invoiceId || invoice.id) && (
                        <button className="btn btn-primary btn-sm" onClick={() => handleCreateSalesSummary(invoice)} title="Create Sales Summary">
                          <i className="bi bi-file-earmark-text"></i>
                        </button>
                      )}
                      {hasSalesSummary(invoice.invoiceId || invoice.id) && (
                        <>
                          <button className="btn btn-warning btn-sm" onClick={() => handleEditSalesSummary(invoice)} title="Edit Sales Summary">
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button className="btn btn-success btn-sm" onClick={() => handlePrintSalesSummary(invoice)} title="Download PDF">
                            <i className="bi bi-printer"></i>
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No manual invoices created yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Popup Modal for Viewing Bill/Manual Invoice Details */}
      {selectedBill && !salesSummary && (
        <div className="modal" style={{ display: "block", position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-content" style={{ backgroundColor: "#fff", margin: "5% auto", padding: "20px", width: "80%", maxWidth: "800px", borderRadius: "8px", maxHeight: "80vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #ddd", paddingBottom: "10px" }}>
              <h4>{selectedBill.isManual ? `Manual Invoice Details - ${selectedBill.invoiceId || selectedBill.id}` : `Bill Details - ${selectedBill.billNo}`}</h4>
              <button className="btn btn-danger" onClick={handleClosePopup}>Close</button>
            </div>
            <div style={{ marginTop: "20px" }}>
              {selectedBill.isManual ? (
                <>
                  <p><strong>Custom Date:</strong> {selectedBill.customDate}</p>
                  <p><strong>Driver:</strong> {selectedBill.driver}</p>
                  <p><strong>Route:</strong> {selectedBill.route}</p>
                  <h5>Included Bills</h5>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Bill No</th>
                        <th>Outlet Name</th>
                        <th>Sales Ref</th>
                        <th>Ref Contact</th>
                        <th>Create Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedBill.bills.map((bill) => (
                        <tr key={bill.id}>
                          <td>{bill.billNo}</td>
                          <td>{bill.outletName}</td>
                          <td>{bill.salesRef}</td>
                          <td>{bill.refContact}</td>
                          <td>{bill.createDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              ) : (
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
                          <td>{option.productId} - {option.optionId}</td>
                          <td>Rs. {option.price}</td>
                          <td>{option.qty}</td>
                          <td>Rs. {((parseFloat(option.price) || 0) * (parseFloat(option.qty) || 0)).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {selectedBill.discountOptions?.length > 0 && (
                    <>
                      <h5>Discount Options</h5>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Name</th>
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
                      </table>
                    </>
                  )}
                  {selectedBill.freeIssueOptions?.length > 0 && (
                    <>
                      <h5>Free Issue Options</h5>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Name</th>
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
                      </table>
                    </>
                  )}
                  {selectedBill.expireOptions?.length > 0 && (
                    <>
                      <h5>Expire Options</h5>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Name</th>
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
                      </table>
                    </>
                  )}
                </>
              )}
              <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                <button className="btn btn-danger" onClick={handleClosePopup}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sales Summary Popup */}
      {salesSummary && (
        <div className="modal" style={{ display: "block", position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-content" style={{ backgroundColor: "#fff", margin: "20px", padding: "20px", width: "calc(100% - 40px)", height: "calc(100% - 40px)", borderRadius: "8px", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #ddd", paddingBottom: "10px" }}>
              <h4>Sales Summary for Invoice {salesSummary.invoiceId}</h4>
              <button className="btn btn-danger" onClick={handleClosePopup}>Close</button>
            </div>
            <div style={{ marginTop: "20px" }}>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Invoice ID</th>
                    <th>Bill No</th>
                    <th>Outlet Name</th>
                    {salesSummary.uniqueOptions.map((opt) => (
                      <th key={opt.optionId}>{opt.optionId} (Rs.{(parseFloat(opt.price) || 0).toFixed(2)})</th>
                    ))}
                    <th style={{ backgroundColor: "#ffffe0" }}>Gross Sale</th>
                    <th>Discount</th>
                    <th>Expire</th>
                    <th style={{ backgroundColor: "#ffffe0" }}>Net Sale</th>
                    <th>Cash</th>
                    <th>Cheque</th>
                    <th>Credit</th>
                  </tr>
                </thead>
                <tbody>
                  {salesSummary.data.map((bill, billIdx) => (
                    <tr key={bill.billNo}>
                      <td>{bill.invoiceId}</td>
                      <td>{bill.billNo}</td>
                      <td>{bill.outletName}</td>
                      {salesSummary.uniqueOptions.map((opt, optIdx) => (
                        <td key={opt.optionId}>
                          <input
                            type="number"
                            className="form-control"
                            style={{ width: "80px" }}
                            value={bill.productOptions[optIdx].qty}
                            onChange={(e) => handleSalesQtyChange(billIdx, optIdx, e.target.value)}
                          />
                        </td>
                      ))}
                      <td style={{ backgroundColor: "#ffffe0" }}>{calculateGrossSale(bill)}</td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          value={bill.discount}
                          onChange={(e) => handleSalesFieldChange(billIdx, "discount", e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          value={bill.expire}
                          onChange={(e) => handleSalesFieldChange(billIdx, "expire", e.target.value)}
                        />
                      </td>
                      <td style={{ backgroundColor: "#ffffe0" }}>{calculateNetSale(bill)}</td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          value={bill.cash}
                          onChange={(e) => handleSalesFieldChange(billIdx, "cash", e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          value={bill.cheque}
                          onChange={(e) => handleSalesFieldChange(billIdx, "cheque", e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          value={bill.credit}
                          onChange={(e) => handleSalesFieldChange(billIdx, "credit", e.target.value)}
                        />
                      </td>
                    </tr>
                  ))}
                  <tr style={{ backgroundColor: "#ffff99" }}>
                    <td colSpan={3}><strong>Total</strong></td>
                    {salesSummary.uniqueOptions.map((_, idx) => (
                      <td key={idx}>{calculateSummarySums().productOptions[idx].toFixed(2)}</td>
                    ))}
                    <td>{calculateSummarySums().grossSale.toFixed(2)}</td>
                    <td>{calculateSummarySums().discount.toFixed(2)}</td>
                    <td>{calculateSummarySums().expire.toFixed(2)}</td>
                    <td>{calculateSummarySums().netSale.toFixed(2)}</td>
                    <td>{calculateSummarySums().cash.toFixed(2)}</td>
                    <td>{calculateSummarySums().cheque.toFixed(2)}</td>
                    <td>{calculateSummarySums().credit.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
              <div className="d-flex justify-content-end gap-2">
                <button className="btn btn-primary" onClick={handleSaveSalesSummary}>
                  {editSalesSummaryId ? "Update Sales Summary" : "Save Sales Summary"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManualInvoice;