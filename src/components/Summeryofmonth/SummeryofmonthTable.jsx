import React, { useState, useEffect } from "react";
import { db } from "../../utilities/firebaseConfig";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import 'bootstrap-icons/font/bootstrap-icons.css';

const SummeryofmonthTable = () => {
  const [summaryData, setSummaryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7)); // Default to current month (YYYY-MM)
  const [printMode, setPrintMode] = useState(false);

  const billReviewsCollectionRef = collection(db, "BillReviews");

  useEffect(() => {
    fetchSummaryData();
  }, [selectedMonth]);

  const fetchSummaryData = async () => {
    setLoading(true);
    try {
      // Get the selected month and year
      const [year, month] = selectedMonth.split('-');
      const startDate = new Date(year, parseInt(month) - 1, 1);
      const endDate = new Date(year, parseInt(month), 0); // Last day of the month
      
      // Fetch data from BillReviews
      const q = query(billReviewsCollectionRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      
      // Process data
      const reviewList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      // Filter reviews by date
      const filteredReviews = reviewList.filter(review => {
        if (!review.createdAt) return false;
        
        const reviewDate = review.createdAt.toDate ? review.createdAt.toDate() : new Date(review.createdAt);
        return reviewDate >= startDate && reviewDate <= endDate;
      });
      
      // Group by date and calculate summaries
      const dailySummaries = [];
      const dateMap = new Map();
      
      filteredReviews.forEach(review => {
        const reviewDate = review.createdAt.toDate ? review.createdAt.toDate() : new Date(review.createdAt);
        const dateStr = reviewDate.toISOString().split('T')[0];
        
        if (!dateMap.has(dateStr)) {
          dateMap.set(dateStr, {
            date: dateStr,
            loadingValue: 0,
            discountValue: 0,
            expireValue: 0,
            margin: 0,
            salesValue: 0,
          });
        }
        
        const summary = dateMap.get(dateStr);
        
        // Calculate values from consolidated products
        if (review.consolidatedProducts && review.consolidatedProducts.length > 0) {
          review.consolidatedProducts.forEach(product => {
            // Calculate loading value (unloaded bottles * price)
            const unloadingBT = parseInt(product.unloadingBT) || 0;
            const price = parseFloat(product.salesValue) / (parseInt(product.saleBT) || 1);
            summary.loadingValue += unloadingBT * price;
            
            // Sales value is directly available
            summary.salesValue += parseFloat(product.salesValue) || 0;
          });
        }
        
        // Get discount and expire values from bills
        if (review.bills && review.bills.length > 0) {
          review.bills.forEach(bill => {
            // Calculate discount total
            if (bill.discountOptions && bill.discountOptions.length > 0) {
              bill.discountOptions.forEach(option => {
                summary.discountValue += parseFloat(option.total) || 0;
              });
            }
            
            // Calculate expire total
            if (bill.expireOptions && bill.expireOptions.length > 0) {
              bill.expireOptions.forEach(option => {
                summary.expireValue += parseFloat(option.total) || 0;
              });
            }
          });
        }
      });
      
      // Calculate margin
      dateMap.forEach(summary => {
        summary.margin = summary.salesValue - summary.discountValue - summary.expireValue;
      });
      
      // Convert map to array and sort by date
      const summaryArray = Array.from(dateMap.values());
      summaryArray.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      setSummaryData(summaryArray);
    } catch (error) {
      console.error("Error fetching summary data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotals = () => {
    return summaryData.reduce((totals, item) => {
      return {
        loadingValue: totals.loadingValue + item.loadingValue,
        discountValue: totals.discountValue + item.discountValue,
        expireValue: totals.expireValue + item.expireValue,
        margin: totals.margin + item.margin,
        salesValue: totals.salesValue + item.salesValue,
      };
    }, { loadingValue: 0, discountValue: 0, expireValue: 0, margin: 0, salesValue: 0 });
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
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

  const totals = calculateTotals();

  return (
    <div className="container">
      <h3>Monthly Sales Summary</h3>

      <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            <label htmlFor="month-select" className="me-2">Select Month:</label>
            <input 
              type="month" 
              id="month-select"
              className="form-control" 
              value={selectedMonth} 
              onChange={handleMonthChange}
              style={{ width: "200px" }}
            />
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
            <p className="mt-2">Loading summary data...</p>
          </div>
        ) : summaryData.length === 0 ? (
          <div className="alert alert-info">
            No data available for the selected month.
          </div>
        ) : (
          <div className="print-content">
            <div className="d-none d-print-block text-center mb-4">
              <h2 style={{ margin: "0" }}>Advance Trading</h2>
              <p style={{ margin: "3px 0" }}>Reg Office: No: 170/A, Nuwaraeliya Rd, Delpitiya, Gampola</p>
              <p style={{ margin: "2px 0" }}>Tel: 072-7070701</p>
              <h3 style={{ margin: "8px 0" }}>Monthly Sales Summary - {new Date(selectedMonth + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
            </div>

            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead className="table-dark">
                  <tr>
                    <th className="text-white">Date</th>
                    <th className="text-white">Loading Value (Rs.)</th>
                    <th className="text-white">Sales Value (Rs.)</th>
                    <th className="text-white">Discount Value (Rs.)</th>
                    <th className="text-white">Expire Value (Rs.)</th>
                    <th className="text-white">Margin (Rs.)</th>
                  </tr>
                </thead>
                <tbody>
                  {summaryData.map((item, index) => (
                    <tr key={index}>
                      <td>{new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
                      <td className="text-end">{formatCurrency(item.loadingValue)}</td>
                      <td className="text-end">{formatCurrency(item.salesValue)}</td>
                      <td className="text-end">{formatCurrency(item.discountValue)}</td>
                      <td className="text-end">{formatCurrency(item.expireValue)}</td>
                      <td className="text-end">{formatCurrency(item.margin)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="table-dark">
                  <tr>
                    <th className="text-white">Total</th>
                    <th className="text-white text-end">{formatCurrency(totals.loadingValue)}</th>
                    <th className="text-white text-end">{formatCurrency(totals.salesValue)}</th>
                    <th className="text-white text-end">{formatCurrency(totals.discountValue)}</th>
                    <th className="text-white text-end">{formatCurrency(totals.expireValue)}</th>
                    <th className="text-white text-end">{formatCurrency(totals.margin)}</th>
                  </tr>
                </tfoot>
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

      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            .print-content, .print-content * {
              visibility: visible;
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

export default SummeryofmonthTable;
