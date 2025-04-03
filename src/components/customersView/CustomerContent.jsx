import React, { useState, useEffect } from "react";
import Select from "react-select";
import { db } from "../../utilities/firebaseConfig";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, serverTimestamp, query, where, getDoc } from "firebase/firestore";
import 'bootstrap-icons/font/bootstrap-icons.css';

const BillAdd = () => {
  const [billNo, setBillNo] = useState("");
  const [outletName, setOutletName] = useState(null);
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [salesRef, setSalesRef] = useState("");
  const [refContact, setRefContact] = useState("");
  const [createDate, setCreateDate] = useState(new Date().toISOString().split("T")[0]);
  const [productOptions, setProductOptions] = useState([]);
  const [discountOptions, setDiscountOptions] = useState([]);
  const [freeIssueOptions, setFreeIssueOptions] = useState([]);
  const [expireOptions, setExpireOptions] = useState([]);
  const [percentageDiscount, setPercentageDiscount] = useState("");
  const [products, setProducts] = useState([]);
  const [bills, setBills] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editBill, setEditBill] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedBill, setSelectedBill] = useState(null);
  const [creatorFilter, setCreatorFilter] = useState(""); // Add state for filtering by creator
  const [uniqueCreators, setUniqueCreators] = useState([]); // Store unique email creators

  const billsCollectionRef = collection(db, "Bill");
  const productsCollectionRef = collection(db, "Product");
  const customersCollectionRef = collection(db, "Customers");

  useEffect(() => {
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

    const fetchBills = async () => {
      try {
        const querySnapshot = await getDocs(billsCollectionRef);
        const billList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          printStatus: doc.data().printStatus || false, // Default to false if not set
        }));
        
        // Sort bills by create date in descending order (latest first)
        billList.sort((a, b) => {
          const dateA = new Date(a.createDate || 0);
          const dateB = new Date(b.createDate || 0);
          return dateB - dateA; // Descending order
        });
        
        // Extract unique creators for the filter dropdown
        const creators = new Set(billList.map(bill => bill.createdBy || "Unknown"));
        setUniqueCreators(Array.from(creators));
        
        setBills(billList);
      } catch (error) {
        console.error("Error fetching bills:", error.message);
      }
    };

    const fetchCustomers = async () => {
      try {
        const querySnapshot = await getDocs(customersCollectionRef);
        const customerList = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            outletName: doc.data().outletName,
            address: doc.data().address,
            contactNumber: doc.data().contactNumber,
            salesRefName: doc.data().salesRefName,
            refContactNumber: doc.data().refContactNumber,
            status: doc.data().status,
          }))
          .filter(customer => customer.status === 1);
        setCustomers(customerList);
      } catch (error) {
        console.error("Error fetching customers:", error.message);
      }
    };

    fetchProducts();
    fetchBills();
    fetchCustomers();
    generateBillNo();
  }, []);

  const generateBillNo = async () => {
    const querySnapshot = await getDocs(billsCollectionRef);
    const count = querySnapshot.size + 1;
    setBillNo(`INV${count.toString().padStart(6, "0")}`);
  };

  const handleDeleteBill = async (id) => {
    if (window.confirm("Are you sure you want to delete this bill?")) {
      try {
        // First, get the bill to restore stock quantities
        const billRef = doc(db, "Bill", id);
        const billDoc = await getDoc(billRef);
        
        if (billDoc.exists()) {
          const billData = billDoc.data();
          const stockUpdatePromises = [];
          
          // Process each product in the bill to restore stock
          if (billData.productOptions && billData.productOptions.length > 0) {
            for (const option of billData.productOptions) {
              if (option.productId && option.optionId && option.qty) {
                const productRef = doc(db, "Product", option.productId);
                const productDoc = await getDoc(productRef);
                
                if (productDoc.exists()) {
                  const productData = productDoc.data();
                  const productOptions = productData.productOptions || [];
                  
                  // Find the specific option to update
                  const optionIndex = productOptions.findIndex(opt => opt.name === option.optionId);
                  
                  if (optionIndex !== -1) {
                    // Restore the quantity back to stock
                    const currentStock = parseInt(productOptions[optionIndex].stock) || 0;
                    const qtySold = parseInt(option.qty) || 0;
                    
                    // Add the quantity back to stock
                    productOptions[optionIndex].stock = (currentStock + qtySold).toString();
                    
                    // Add to our update promises
                    stockUpdatePromises.push(
                      updateDoc(productRef, {
                        productOptions: productOptions
                      })
                    );
                  }
                }
              }
            }
            
            // Update all product stocks
            await Promise.all(stockUpdatePromises);
          }
        }
        
        // Now delete the bill
        await deleteDoc(doc(db, "Bill", id));
        
        // Update the bills list in the UI
        setBills(bills.filter((bill) => bill.id !== id));
        
        // Refresh products to get updated stock values
        const productsSnapshot = await getDocs(productsCollectionRef);
        const productList = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          options: doc.data().productOptions || [],
        }));
        setProducts(productList);
        
        alert("Bill deleted successfully!");
      } catch (error) {
        console.error("Error deleting bill:", error.message);
        alert("Error: " + error.message);
      }
    }
  };

  const handleEditBill = (bill) => {
    setEditBill(bill);
    setBillNo(bill.billNo);
    const selectedCustomer = customers.find(c => c.outletName === bill.outletName);
    setOutletName(selectedCustomer ? { value: selectedCustomer.id, label: selectedCustomer.outletName } : null);
    setAddress(bill.address);
    setContact(bill.contact);
    setSalesRef(bill.salesRef);
    setRefContact(bill.refContact);
    setCreateDate(bill.createDate || new Date().toISOString().split("T")[0]);
    setProductOptions(bill.productOptions.map(option => ({
      ...option,
      productId: option.productId || "",
      optionId: option.optionId || "",
      price: option.price || "",
      qty: option.qty || "",
      currentQty: option.currentQty || "",
    })));
    setDiscountOptions(bill.discountOptions || []);
    setFreeIssueOptions(bill.freeIssueOptions || []);
    setExpireOptions(bill.expireOptions || []);
    setPercentageDiscount(bill.percentageDiscount || "");
    
    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleViewBill = (bill) => {
    setSelectedBill(bill);
  };

  const handleClosePopup = () => {
    setSelectedBill(null);
  };

  const handlePrintBill = async (bill) => {
    if (!bill.printStatus) {
      try {
        await updateDoc(doc(db, "Bill", bill.id), {
          printStatus: true,
        });
        setBills(bills.map(b => b.id === bill.id ? { ...b, printStatus: true } : b));
      } catch (error) {
        console.error("Error updating print status:", error.message);
      }
    }

    // Check if sections have data with non-empty case values
    const filteredDiscountOptions = bill.discountOptions?.filter(option => option.case && option.case.trim() !== '') || [];
    const filteredFreeIssueOptions = bill.freeIssueOptions?.filter(option => option.case && option.case.trim() !== '') || [];
    const filteredExpireOptions = bill.expireOptions?.filter(option => option.case && option.case.trim() !== '') || [];
    
    const hasDiscounts = filteredDiscountOptions.length > 0;
    const hasFreeIssues = filteredFreeIssueOptions.length > 0;
    const hasExpires = filteredExpireOptions.length > 0;
    const hasPercentageDiscount = bill.percentageDiscount && parseFloat(bill.percentageDiscount) > 0;

    const productTotal = calculateProductTotal(bill.productOptions);
    const percentageDiscountAmount = hasPercentageDiscount ? 
      calculatePercentageDiscountTotal(productTotal, bill.percentageDiscount) : "0.00";

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice - ${bill.billNo}</title>
          <style>
            body { 
              font-family: 'Courier New', monospace; 
              margin: 0; 
              padding: 0;
              font-size: 14px; 
              line-height: 1.2; 
              background-color: #fff;
              display: flex;
              justify-content: center;
              color: #000;
            }
            .page {
              width: 100%;
              max-width: 210mm;
              padding: 5mm 5mm;
              margin: 0 auto;
              box-sizing: border-box;
              box-shadow: 0 0 10mm rgba(0,0,0,0.2);
              background-color: #fff;
            }
            .invoice-container { 
              width: 100%; 
              margin: 0 auto; 
              border: none; 
              padding: 2mm; 
              box-sizing: border-box;
            }
            .header { 
              text-align: center; 
              padding: 1mm; 
              border-bottom: 0.25px solid #000;
              margin-bottom: 2mm;
            }
            .header .company { 
              display: flex; 
              justify-content: space-between; 
              align-items: center; 
            }
            .company-title { 
              font-size: 28px; 
              font-weight: bold; 
              color: #000;
              margin: 0 auto;
              text-align: center;
              width: 100%;
            }
            .company-pepsi { 
              font-size: 16px; 
              font-weight: bold; 
              color: #000;
              position: absolute;
              right: 10px;
              top: 5px;
            }
            .company-details { 
              font-size: 14px; 
              color: #000; 
              margin-bottom: 1mm; 
              text-align: center;
              line-height: 1.2;
            }
            .details table { 
              width: 100%; 
              border: none; 
              border-bottom: 0.25px solid #000;
              margin-bottom: 1mm;
            }
            .details td { 
              padding: 1mm 1.5mm; 
              vertical-align: top; 
              font-size: 16px;
              font-weight: bold;
              color: #000;
            }
            .details td:first-child { 
              width: 25%; 
              font-weight: bold; 
            }
            .details td:nth-child(3) { 
              font-weight: bold; 
              text-align: right; 
            }
            .payment-options { 
              width: 50%; 
              margin-left: auto;
              margin-bottom: 1mm;
              display: flex; 
              justify-content: space-around; 
              border: 0.25px solid #000; 
              padding: 1mm; 
            }
            .payment-option { 
              width: 33%; 
              text-align: center;
              font-size: 14px;
              font-weight: bold;
              color: #000;
            }
            .discounts { 
              display: flex; 
              justify-content: space-between; 
              margin: 1mm 0; 
              border: 0.25px solid #000;
              padding: 1mm;
            }
            .discounts div { 
              width: 32%; 
              padding: 1mm; 
              border-right: 0.25px solid #000;
              color: #000;
            }
            .discounts div:last-child {
              border-right: none;
            }
            .discounts p {
              margin: 0;
              font-size: 13px;
              color: #000;
            }
            .discounts strong {
              font-size: 14px;
              font-weight: bold;
              color: #000;
            }
            .discounts p:first-child {
              border-bottom: 0.25px solid #000;
              padding-bottom: 1mm;
              margin-bottom: 1mm;
              font-size: 15px;
              font-weight: bold;
              color: #000;
            }
            table { 
              width: 100%; 
              border-collapse: collapse; 
              margin-top: 1mm; 
            }
            th, td { 
              padding: 1mm; 
              text-align: left; 
              font-size: 12px;
              color: #000; 
            }
            .products-table { 
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 1mm;
              color: #000;
            }
            .products-table th, .products-table td {
              border: 0.25px solid #000;
              padding: 1mm;
              text-align: left;
              font-size: 14px;
              color: #000;
            }
            .products-table th {
              font-weight: bold;
              background-color: #fff;
              color: #000;
              font-size: 15px;
            }
            .products-table thead { 
              border-bottom: 0.5px solid #000; 
            }
            .products-table th { 
              border-bottom: 0.5px solid #000;
              background-color: #fff;
              font-size: 13px;
              font-weight: bold;
              padding: 1mm;
              color: #000;
            }
            .products-table td { 
              border-bottom: 0.25px dotted #000;
              font-size: 14px;
              padding: 1.5mm;
              color: #000;
            }
            .products-table tr:last-child td {
              border-bottom: none;
            }
            .total-section table { 
              width: 60%; 
              border-collapse: collapse; 
              margin-top: 1mm; 
              margin-left: auto;
              border: 0.25px solid #000; 
            }
            .total-section td { 
              padding: 1mm; 
              text-align: right; 
              font-size: 16px; 
              font-weight: bold;
              color: #000;
            }
            .total-section tr:last-child td { 
              font-size: 18px;
              border-top: 0.25px solid #000;
              color: #000;
            }
            .signature-area {
              display: flex;
              justify-content: space-between;
              margin-top: 2mm;
              font-size: 15px;
              font-weight: bold;
              border-top: 0.25px dashed #000;
              padding-top: 1mm;
              color: #000;
            }
            .footer {
              text-align: center;
              margin-top: 2mm;
              font-size: 14px;
              border-top: 0.25px solid #000;
              padding-top: 1mm;
              color: #000;
            }
            @media print {
              @page { 
                size: A4 portrait; 
                margin: 0; 
              }
              .no-print { 
                display: none !important; 
              }
              body { 
                background-color: #fff;
                margin: 0;
                padding: 0;
                display: block;
              }
              .page {
                width: 100%;
                max-width: none;
                padding: 10mm;
                margin: 0 auto;
                box-shadow: none;
                min-height: 297mm;
                position: relative;
              }
              .invoice-container {
                border: none;
              }
              .print-buttons {
                display: none !important;
              }
            }
            .print-buttons {
              display: flex;
              justify-content: center;
              margin-top: 4mm;
            }
            .print-button {
              padding: 2mm 4mm;
              margin: 0 2mm;
              background-color: #4CAF50;
              color: white;
              border: none;
              border-radius: 1mm;
              cursor: pointer;
              font-size: 12px;
            }
            .totals {
              width: 60%;
              margin-left: auto;
              border: 0.25px solid #000;
              padding: 1mm;
              color: #000;
            }
            .totals p {
              display: flex;
              justify-content: space-between;
              margin: 0;
              padding: 0.5mm 0;
              border-bottom: 0.25px solid #eee;
              font-size: 15px;
              color: #000;
            }
            .totals p:last-child {
              font-weight: bold;
              font-size: 18px;
              border-top: 0.25px solid #000;
              border-bottom: none;
              padding-top: 1mm;
              margin-top: 1mm;
              color: #000;
            }
            h1, h2, h3, h4, h5, h6 {
              color: #000;
              margin: 2mm 0;
              font-weight: bold;
            }
            h1 {
              font-size: 22px;
              text-align: center;
            }
            .customer-details, .invoice-details {
              font-size: 14px;
              font-weight: bold;
              color: #000;
            }
            .customer-details strong, .invoice-details strong {
              font-weight: bolder;
              color: #000;
            }
            .totals strong {
              font-weight: bold;
              color: #000;
            }
            .totals p:last-child {
              font-weight: bold;
              font-size: 18px;
              border-top: 0.25px solid #000;
              border-bottom: none;
              padding-top: 2mm;
              margin-top: 2mm;
              color: #000;
            }
          </style>
        </head>
        <body>
          <div class="page">
            <div class="invoice-container">
              <div class="header">
                <div class="company" style="position: relative;">
                  <div class="company-pepsi">pepsi</div>
                  <div class="company-title">Advance Trading</div>
                </div>
                <p class="company-details">Reg Office: No: 170/A, Nuwaraeliya Rd, Delpitiya, Gampola<br>Tel: 072-7070701</p>
              </div>
              
              <div class="details">
                <table>
                  <tr>
                    <td>Customer:</td>
                    <td>${bill.outletName}</td>
                    <td>Invoice No:</td>
                    <td>${bill.billNo}</td>
                  </tr>
                  <tr>
                    <td>Contact:</td>
                    <td>${bill.contact}</td>
                    <td>Date:</td>
                    <td>${bill.createDate}</td>
                  </tr>
                  <tr>
                    <td>Address:</td>
                    <td colspan="3">${bill.address}</td>
                  </tr>
                  <tr>
                    <td>Ref Name:</td>
                    <td>${bill.salesRef}</td>
                    <td>Ref Contact:</td>
                    <td>${bill.refContact}</td>
                  </tr>
                </table>
              </div>
              
              <div class="payment-options">
                <div class="payment-option"><input type="checkbox" name="payment" value="cash"> Cash</div>
                <div class="payment-option"><input type="checkbox" name="payment" value="credit"> Credit</div>
                <div class="payment-option"><input type="checkbox" name="payment" value="cheque"> Cheque</div>
              </div>

              <table class="products-table">
                <thead>
                  <tr>
                    <th style="width:40%">DESCRIPTION</th>
                    <th style="width:12%; text-align:center">QTY</th>
                    <th style="width:15%; text-align:right">UNIT PRICE</th>
                    <th style="width:15%; text-align:right">AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  ${bill.productOptions.map(option => `
                    <tr>
                      <td>${products.find(p => p.id === option.productId)?.name || 'N/A'} ${option.optionId}</td>
                      <td style="text-align:center">${option.qty}</td>
                      <td style="text-align:right">${option.price}</td>
                      <td style="text-align:right">${((parseFloat(option.price) || 0) * (parseFloat(option.qty) || 0)).toFixed(2)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>

              <div class="discounts">
                <div>
                  <p>DISCOUNT</p>
                  ${Object.entries(bill.discountOptions
                    .reduce((uniqueMap, option) => {
                      const optionId = option.optionId || '';
                      if (!uniqueMap[optionId]) {
                        uniqueMap[optionId] = {
                          case: parseFloat(option.case) || 0,
                          perCaseRate: parseFloat(option.perCaseRate) || 0,
                          total: parseFloat(option.total) || 0
                        };
                      } else {
                        uniqueMap[optionId].case += parseFloat(option.case) || 0;
                        uniqueMap[optionId].total += parseFloat(option.total) || 0;
                      }
                      return uniqueMap;
                    }, {})
                  )
                    .map(([optionId, entry]) => `
                      <p>${optionId}: ${entry.case} × ${entry.perCaseRate} = ${entry.total.toFixed(2)}</p>
                    `).join('')
                  }
                  <p><strong>Total: ${calculateTotal(bill.discountOptions)}</strong></p>
                </div>
                <div>
                  <p>FREE ISSUE</p>
                  ${Object.entries(bill.freeIssueOptions
                    .reduce((uniqueMap, option) => {
                      const optionId = option.optionId || '';
                      if (!uniqueMap[optionId]) {
                        uniqueMap[optionId] = {
                          case: parseFloat(option.case) || 0,
                          perCaseRate: parseFloat(option.perCaseRate) || 0,
                          total: parseFloat(option.total) || 0
                        };
                      } else {
                        uniqueMap[optionId].case += parseFloat(option.case) || 0;
                        uniqueMap[optionId].total += parseFloat(option.total) || 0;
                      }
                      return uniqueMap;
                    }, {})
                  )
                    .map(([optionId, entry]) => `
                      <p>${optionId}: ${entry.case} × ${entry.perCaseRate} = ${entry.total.toFixed(2)}</p>
                    `).join('')
                  }
                  <p><strong>Total: ${calculateTotal(bill.freeIssueOptions)}</strong></p>
                </div>
                <div>
                  <p>EXPIRE</p>
                  ${Object.entries(bill.expireOptions
                    .reduce((uniqueMap, option) => {
                      const optionId = option.optionId || '';
                      if (!uniqueMap[optionId]) {
                        uniqueMap[optionId] = {
                          case: parseFloat(option.case) || 0,
                          perCaseRate: parseFloat(option.perCaseRate) || 0,
                          total: parseFloat(option.total) || 0
                        };
                      } else {
                        uniqueMap[optionId].case += parseFloat(option.case) || 0;
                        uniqueMap[optionId].total += parseFloat(option.total) || 0;
                      }
                      return uniqueMap;
                    }, {})
                  )
                    // Generate HTML for each unique optionId
                    .map(([optionId, entry]) => `
                      <p>${optionId}: ${entry.case} * ${entry.perCaseRate} = ${entry.total.toFixed(2)}</p>
                    `).join('')
                  }
                  <p><strong>Total: ${calculateTotal(bill.expireOptions)}</strong></p>
                </div>
              </div>

              <div class="total-section">
                <table>
                  <tr>
                    <td><strong>SUBTOTAL</strong></td>
                    <td>Rs. ${calculateProductTotal(bill.productOptions)}</td>
                  </tr>
                  <tr>
                    <td><strong>DISCOUNT</strong></td>
                    <td>Rs. ${calculateTotal(bill.discountOptions)}</td>
                  </tr>
                  <tr>
                    <td><strong>FREE ISSUE</strong></td>
                    <td>Rs. ${calculateTotal(bill.freeIssueOptions)}</td>
                  </tr>
                  <tr>
                    <td><strong>EXPIRE</strong></td>
                    <td>Rs. ${calculateTotal(bill.expireOptions)}</td>
                  </tr>
                  <tr>
                    <td><strong>TOTAL</strong></td>
                    <td>Rs. ${(
                      parseFloat(calculateProductTotal(bill.productOptions)) -
                      (parseFloat(calculateTotal(bill.discountOptions)) +
                       parseFloat(calculateTotal(bill.freeIssueOptions)) +
                       parseFloat(calculateTotal(bill.expireOptions)))
                    ).toFixed(2)}</td>
                  </tr>
                </table>
              </div>

              <div class="signature-area">
                <div>
                  <p>Customer Signature: ___________________</p>
                </div>
                <div>
                  <p>Authorized Signature: ___________________</p>
                </div>
              </div>

              <div class="footer">
                <p>Thank you for your business! For questions contact us at 072-7070701</p>
              </div>

              <div class="print-buttons no-print">
                <button class="print-button" onclick="window.print();">Print Invoice</button>
                <button class="print-button" style="background-color: #f44336;" onclick="window.close();">Close</button>
              </div>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleOutletChange = (selectedOption) => {
    setOutletName(selectedOption);
    if (selectedOption) {
      const selectedCustomer = customers.find(c => c.id === selectedOption.value);
      if (selectedCustomer) {
        setAddress(selectedCustomer.address);
        setContact(selectedCustomer.contactNumber);
        setSalesRef(selectedCustomer.salesRefName);
        setRefContact(selectedCustomer.refContactNumber);
      }
    } else {
      setAddress("");
      setContact("");
      setSalesRef("");
      setRefContact("");
    }
  };

  const addProductOption = () => {
    setProductOptions([...productOptions, { productId: "", optionId: "", price: "", qty: "", currentQty: "" }]);
  };

  const removeProductOption = (index) => {
    setProductOptions(productOptions.filter((_, i) => i !== index));
  };

  const handleProductChange = (index, selectedOption) => {
    const product = products.find((p) => p.id === selectedOption.value);
    const newOptions = [...productOptions];
    
    if (product && newOptions[index].optionId) {
      // Find the matching option in the product
      const productOption = product.options.find(opt => opt.name === newOptions[index].optionId);
      
      if (productOption) {
        // Use database values for price and stock
    newOptions[index] = {
      ...newOptions[index],
      productId: product.id,
          price: productOption.retailPrice || "",
          currentQty: productOption.stock || "0",
        };
      } else {
        newOptions[index] = {
          ...newOptions[index],
          productId: product.id,
      price: "",
          currentQty: "0",
        };
      }
    } else {
      newOptions[index] = {
        ...newOptions[index],
        productId: product.id,
        price: "",
        currentQty: "0",
      };
    }
    
    setProductOptions(newOptions);
  };

  const handleOptionChange = (index, selectedOption) => {
    const newOptions = [...productOptions];
    newOptions[index].optionId = selectedOption.value;
    
    // If product is already selected, update price and stock from DB
    if (newOptions[index].productId) {
      const selectedProduct = products.find(p => p.id === newOptions[index].productId);
      if (selectedProduct) {
        const option = selectedProduct.options.find(opt => opt.name === selectedOption.value);
        if (option) {
          // Use database values
          newOptions[index].price = option.retailPrice || "";
          newOptions[index].currentQty = option.stock || "0";
        }
      }
    }
    
    setProductOptions(newOptions);
  };

  const handleQtyChange = (index, value) => {
    const newOptions = [...productOptions];
    newOptions[index].qty = value;
    
    // Recalculate total - not needed but added for clarity
    const price = parseFloat(newOptions[index].price) || 0;
    const qty = parseFloat(value) || 0;
    // Row total is calculated in the render
    
    setProductOptions(newOptions);
  };

  const addDiscountOption = () => {
    const selectedProducts = productOptions.filter(option => option.productId && option.optionId);
    const newDiscountOptions = selectedProducts.map(option => ({
      productId: option.productId,
      optionId: option.optionId,
      name: `${products.find(p => p.id === option.productId)?.name} - ${option.optionId}`,
        case: "",
        perCaseRate: "",
        total: "",
      }));
    setDiscountOptions([...discountOptions, ...newDiscountOptions]);
  };

  const removeDiscountOption = (index) => {
    setDiscountOptions(discountOptions.filter((_, i) => i !== index));
  };

  const handleDiscountChange = (index, field, value) => {
    const newOptions = [...discountOptions];
    newOptions[index][field] = value;
    const caseVal = parseFloat(newOptions[index].case) || 0;
    const perCaseRateVal = parseFloat(newOptions[index].perCaseRate) || 0;
    if (caseVal && perCaseRateVal) {
      newOptions[index].total = (caseVal * perCaseRateVal).toFixed(2);
    } else {
      newOptions[index].total = "";
    }
    setDiscountOptions(newOptions);
  };

  const addFreeIssueOption = () => {
    const selectedProducts = productOptions.filter(option => option.productId && option.optionId);
    const newFreeIssueOptions = selectedProducts.map(option => ({
      productId: option.productId,
      optionId: option.optionId,
      name: `${products.find(p => p.id === option.productId)?.name} - ${option.optionId}`,
        case: "",
        perCaseRate: "",
        total: "",
      }));
    setFreeIssueOptions([...freeIssueOptions, ...newFreeIssueOptions]);
  };

  const removeFreeIssueOption = (index) => {
    setFreeIssueOptions(freeIssueOptions.filter((_, i) => i !== index));
  };

  const handleFreeIssueChange = (index, field, value) => {
    const newOptions = [...freeIssueOptions];
    newOptions[index][field] = value;
    const caseVal = parseFloat(newOptions[index].case) || 0;
    const perCaseRateVal = parseFloat(newOptions[index].perCaseRate) || 0;
    if (caseVal && perCaseRateVal) {
      newOptions[index].total = (caseVal * perCaseRateVal).toFixed(2);
    } else {
      newOptions[index].total = "";
    }
    setFreeIssueOptions(newOptions);
  };

  const addExpireOption = () => {
    const selectedProducts = productOptions.filter(option => option.productId && option.optionId);
    const newExpireOptions = selectedProducts.map(option => ({
      productId: option.productId,
      optionId: option.optionId,
      name: `${products.find(p => p.id === option.productId)?.name} - ${option.optionId}`,
        case: "",
        perCaseRate: "",
        total: "",
      }));
    setExpireOptions([...expireOptions, ...newExpireOptions]);
  };

  const removeExpireOption = (index) => {
    setExpireOptions(expireOptions.filter((_, i) => i !== index));
  };

  const handleExpireChange = (index, field, value) => {
    const newOptions = [...expireOptions];
    newOptions[index][field] = value;
    const caseVal = parseFloat(newOptions[index].case) || 0;
    const perCaseRateVal = parseFloat(newOptions[index].perCaseRate) || 0;
    if (caseVal && perCaseRateVal) {
      newOptions[index].total = (caseVal * perCaseRateVal).toFixed(2);
    } else {
      newOptions[index].total = "";
    }
    setExpireOptions(newOptions);
  };

  const calculateTotal = (options) => {
    return options.reduce((sum, option) => sum + (parseFloat(option.total) || 0), 0).toFixed(2);
  };

  const calculateProductTotal = (options) => {
    return options.reduce((sum, option) => sum + ((parseFloat(option.price) || 0) * (parseFloat(option.qty) || 0)), 0).toFixed(2);
  };

  const calculatePercentageDiscountTotal = (total, percentage) => {
    if (!percentage || isNaN(percentage)) return "0.00";
    const discountValue = (parseFloat(total) * (parseFloat(percentage) / 100)).toFixed(2);
    return discountValue;
  };

  const handlePercentageDiscountChange = (value) => {
    // Ensure value is between 0 and 100
    const numValue = parseFloat(value) || 0;
    if (numValue < 0) {
      setPercentageDiscount("0");
    } else if (numValue > 100) {
      setPercentageDiscount("100");
    } else {
      setPercentageDiscount(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Get the logged-in user's email
      const userEmail = localStorage.getItem("userEmail") || "Unknown";
      
      // Process each product option to update stock quantities
      const stockUpdatePromises = [];
      
      // Loop through each product option to prepare stock updates
      for (const option of productOptions) {
        if (option.productId && option.optionId && option.qty) {
          const productRef = doc(db, "Product", option.productId);
          const productDoc = await getDoc(productRef);
          
          if (productDoc.exists()) {
            const productData = productDoc.data();
            const productOptions = productData.productOptions || [];
            
            // Find the specific option to update
            const optionIndex = productOptions.findIndex(opt => opt.name === option.optionId);
            
            if (optionIndex !== -1) {
              let currentStock = parseInt(productOptions[optionIndex].stock) || 0;
              let newStock = currentStock;
              
              // If editing an existing bill, restore previous quantities first
              if (editBill) {
                const previousOption = editBill.productOptions.find(
                  opt => opt.productId === option.productId && opt.optionId === option.optionId
                );
                
                if (previousOption && previousOption.qty) {
                  // Add back the previous quantity to the stock
                  newStock = currentStock + parseInt(previousOption.qty);
                }
              }
              
              // Now subtract the new quantity
              newStock = Math.max(0, newStock - parseInt(option.qty));
              
              // Update the stock value
              productOptions[optionIndex].stock = newStock.toString();
              
              // Add to our update promises
              stockUpdatePromises.push(
                updateDoc(productRef, {
                  productOptions: productOptions
                })
              );
            }
          }
        }
      }
      
      // Update all product stocks
      await Promise.all(stockUpdatePromises);
      
      // Save or update the bill
      if (editBill) {
        await updateDoc(doc(db, "Bill", editBill.id), {
          billNo,
          outletName: outletName ? outletName.label : "",
          address,
          contact,
          salesRef,
          refContact,
          createDate,
          productOptions,
          discountOptions,
          freeIssueOptions,
          expireOptions,
          percentageDiscount,
          updatedAt: serverTimestamp(),
          updatedBy: userEmail, // Add the user who updated the bill
        });
        alert("Bill updated successfully!");
        setEditBill(null);
      } else {
        await addDoc(billsCollectionRef, {
          billNo,
          outletName: outletName ? outletName.label : "",
          address,
          contact,
          salesRef,
          refContact,
          createDate,
          productOptions,
          discountOptions,
          freeIssueOptions,
          expireOptions,
          percentageDiscount,
          printStatus: false, // Default to false if not set
          createdAt: serverTimestamp(),
          createdBy: userEmail, // Add the user who created the bill
        });
        alert("Bill added successfully!");
      }

      // Refresh the bills list
      const querySnapshot = await getDocs(billsCollectionRef);
      const billList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        printStatus: doc.data().printStatus || false,
      }));
      
      // Sort bills by create date in descending order (latest first)
      billList.sort((a, b) => {
        const dateA = new Date(a.createDate || 0);
        const dateB = new Date(b.createDate || 0);
        return dateB - dateA; // Descending order
      });
      
      // Extract unique creators for the filter dropdown
      const creators = new Set(billList.map(bill => bill.createdBy || "Unknown"));
      setUniqueCreators(Array.from(creators));
      
      setBills(billList);

      // Refresh products to get updated stock values
      const productsSnapshot = await getDocs(productsCollectionRef);
      const productList = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        options: doc.data().productOptions || [],
      }));
      setProducts(productList);

      // Reset form
      generateBillNo();
      setEditBill(null);
      setOutletName(null);
      setAddress("");
      setContact("");
      setSalesRef("");
      setRefContact("");
      setCreateDate(new Date().toISOString().split("T")[0]);
      setProductOptions([]);
      setDiscountOptions([]);
      setFreeIssueOptions([]);
      setExpireOptions([]);
      setPercentageDiscount("");
    } catch (error) {
      console.error("Error saving bill:", error.message);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNewBill = () => {
    setEditBill(null);
    setOutletName(null);
    setAddress("");
    setContact("");
    setSalesRef("");
    setRefContact("");
    setCreateDate(new Date().toISOString().split("T")[0]);
    setProductOptions([]);
    setDiscountOptions([]);
    setFreeIssueOptions([]);
    setExpireOptions([]);
    setPercentageDiscount("");
    generateBillNo();
  };

  const filteredBills = bills.filter(bill => 
    (bill.billNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.outletName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.salesRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.refContact.toLowerCase().includes(searchTerm.toLowerCase())) &&
    // Filter by creator if a creator filter is selected
    (creatorFilter === "" || bill.createdBy === creatorFilter)
  );

  // Sort the filtered bills by date (newest first)
  const sortedBills = [...filteredBills].sort((a, b) => {
    const dateA = new Date(a.createDate || 0);
    const dateB = new Date(b.createDate || 0);
    return dateB - dateA; // Descending order (newest first)
  });

  const indexOfLastBill = currentPage * itemsPerPage;
  const indexOfFirstBill = indexOfLastBill - itemsPerPage;
  const currentBills = sortedBills.slice(indexOfFirstBill, indexOfLastBill);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to get all unique option names across all products
  const getAllOptionNames = () => {
    const optionNames = new Set();
    products.forEach(product => {
      if (product.options && product.options.length > 0) {
        product.options.forEach(option => {
          if (option.name) {
            optionNames.add(option.name);
          }
        });
      }
    });
    return Array.from(optionNames).map(name => ({ value: name, label: name }));
  };
  
  // Function to get products that have a specific option
  const getProductsWithOption = (optionName) => {
    return products
      .filter(product => 
        product.options && 
        product.options.some(opt => opt.name === optionName)
      )
      .map(product => ({ 
        value: product.id, 
        label: product.name 
      }));
  };

  return (
    <div className="container">
      <h3>{editBill ? "Edit Bill" : "Add New Bill"}</h3>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button className="btn btn-primary" onClick={handleCreateNewBill}>Create New Bill</button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Bill No</label>
            <input type="text" className="form-control" value={billNo} disabled />
          </div>
          <div className="col-md-6">
            <label>Outlet Name</label>
            <Select
              options={customers.map((c) => ({ value: c.id, label: c.outletName }))}
              onChange={handleOutletChange}
              value={outletName}
              isSearchable
              placeholder="Select Outlet Name"
              styles={{ control: (base) => ({ ...base, minHeight: "38px" }) }}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Address</label>
            <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} required />
          </div>
          <div className="col-md-6">
            <label>Contact</label>
            <input type="text" className="form-control" value={contact} onChange={(e) => setContact(e.target.value)} required />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Sales Ref</label>
            <input type="text" className="form-control" value={salesRef} onChange={(e) => setSalesRef(e.target.value)} required />
          </div>
          <div className="col-md-6">
            <label>Ref Contact</label>
            <input type="text" className="form-control" value={refContact} onChange={(e) => setRefContact(e.target.value)} required />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Create Date</label>
            <input type="date" className="form-control" value={createDate} onChange={(e) => setCreateDate(e.target.value)} required />
          </div>
        </div>

        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0 text-white">Product Options</h5>
            <button type="button" className="btn btn-light btn-sm" onClick={addProductOption}>
              <i className="bi bi-plus-circle"></i> Add Option
            </button>
          </div>
          <div className="card-body">
            <div className="table-responsive" style={{ 
              overflowX: "auto",
              overflowY: "hidden",
              maxHeight: "none"
            }}>
              <div className="d-flex gap-3" style={{ 
                width: "100%",
                minWidth: "900px",
                flexWrap: "nowrap"
              }}>
                <div style={{ 
                  width: "20%",
                  minWidth: "150px"
                }}>
                  <div className="form-label text-muted">Option</div>
                </div>
                <div style={{ 
                  width: "25%",
                  minWidth: "200px"
                }}>
                  <div className="form-label text-muted">Name</div>
                </div>
                <div style={{ 
                  width: "15%",
                  minWidth: "150px"
                }}>
                  <div className="form-label text-muted">Unit Price (DB)</div>
                </div>
                <div style={{ 
                  width: "15%",
                  minWidth: "120px"
                }}>
                  <div className="form-label text-muted">Quantity</div>
                </div>
                <div style={{ 
                  width: "15%",
                  minWidth: "120px"
                }}>
                  <div className="form-label text-muted fw-bold" style={{ color: "#0d6efd" }}>Current Stock</div>
                </div>
                <div style={{ 
                  width: "15%",
                  minWidth: "120px"
                }}>
                  <div className="form-label text-muted">Total</div>
                </div>
                <div style={{ 
                  width: "10%",
                  minWidth: "60px"
                }}>
                  <div className="form-label text-muted">Action</div>
                </div>
              </div>
              {productOptions.map((option, index) => {
                // Get the product object 
                const product = products.find(p => p.id === option.productId);
                // Get the actual product option to extract price and stock
                const productOption = product?.options.find(opt => opt.name === option.optionId);
                // Calculate row total
                const rowTotal = ((parseFloat(option.price) || 0) * (parseFloat(option.qty) || 0)).toFixed(2);
                // Determine if stock is low
                const isLowStock = productOption && parseInt(productOption.stock || 0) < parseInt(option.qty || 0);

                return (
                <div key={index} className="d-flex gap-3 mb-3" style={{ 
                  width: "100%",
                  minWidth: "900px"
                }}>
                  <div style={{ 
                    width: "20%",
                    minWidth: "150px"
                  }}>
            <Select
                      options={getAllOptionNames()}
                      onChange={(selected) => handleOptionChange(index, selected)}
                      value={option.optionId ? { value: option.optionId, label: option.optionId } : null}
              isSearchable
                      menuPortalTarget={document.body}
                      placeholder="Select Option First"
                      styles={{ 
                        control: (base) => ({ 
                          ...base, 
                          minHeight: "45px",
                          borderColor: "#ced4da",
                          boxShadow: "none",
                          '&:hover': {
                            borderColor: "#80bdff"
                          }
                        }),
                        option: (base, state) => ({
                          ...base,
                          backgroundColor: state.isSelected ? "#007bff" : state.isFocused ? "#e9ecef" : "white",
                          color: state.isSelected ? "white" : "#212529",
                          '&:hover': {
                            backgroundColor: state.isSelected ? "#0056b3" : "#e9ecef"
                          }
                        }),
                        menu: (base) => ({
                          ...base,
                          zIndex: 9999
                        }),
                        menuList: (base) => ({
                          ...base,
                          maxHeight: "300px",
                          overflowY: "auto"
                        }),
                        menuPortal: base => ({ ...base, zIndex: 9999 })
                      }}
                    />
                  </div>
                  <div style={{ 
                    width: "25%",
                    minWidth: "200px"
                  }}>
            <Select
                      options={option.optionId ? getProductsWithOption(option.optionId) : []}
                      onChange={(selected) => handleProductChange(index, selected)}
                      value={option.productId ? { value: option.productId, label: products.find(p => p.id === option.productId)?.name } : null}
              isSearchable
                      isDisabled={!option.optionId}
                      menuPortalTarget={document.body}
                      placeholder="Select Product Name"
                      styles={{ 
                        control: (base) => ({ 
                          ...base, 
                          minHeight: "45px",
                          borderColor: "#ced4da",
                          boxShadow: "none",
                          '&:hover': {
                            borderColor: "#80bdff"
                          }
                        }),
                        option: (base, state) => ({
                          ...base,
                          backgroundColor: state.isSelected ? "#007bff" : state.isFocused ? "#e9ecef" : "white",
                          color: state.isSelected ? "white" : "#212529",
                          '&:hover': {
                            backgroundColor: state.isSelected ? "#0056b3" : "#e9ecef"
                          }
                        }),
                        menu: (base) => ({
                          ...base,
                          zIndex: 9999
                        }),
                        menuList: (base) => ({
                          ...base,
                          maxHeight: "300px",
                          overflowY: "auto"
                        }),
                        menuPortal: base => ({ ...base, zIndex: 9999 })
                      }}
                    />
                  </div>
                  <div style={{ 
                    width: "15%",
                    minWidth: "150px"
                  }}>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={`Rs: ${option.price}`} 
                      disabled 
                      style={{ backgroundColor: "#f8f9fa" }}
                    />
                  </div>
                  <div style={{ 
                    width: "15%",
                    minWidth: "120px"
                  }}>
                    <input 
                      type="number" 
                      className="form-control" 
                      value={option.qty} 
                      onChange={(e) => handleQtyChange(index, e.target.value)} 
                      required 
                      min="0"
                      style={{ borderColor: "#ced4da" }}
                    />
                  </div>
                  <div style={{ 
                    width: "15%",
                    minWidth: "120px"
                  }}>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={option.currentQty || "0"} 
                      disabled 
                      style={{ 
                        backgroundColor: "#f8f9fa",
                        fontWeight: "bold",
                        color: isLowStock ? "#dc3545" : "#198754"
                      }}
                    />
                  </div>
                  <div style={{ 
                    width: "15%",
                    minWidth: "120px"
                  }}>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={`Rs: ${rowTotal}`} 
                      disabled 
                      style={{ backgroundColor: "#f8f9fa", fontWeight: "bold" }}
                    />
                  </div>
                  <div style={{ 
                    width: "10%",
                    minWidth: "60px"
                  }} className="d-flex align-items-center">
                    <button 
                      type="button" 
                      className="btn btn-danger btn-sm w-50" 
                      onClick={() => removeProductOption(index)}
                      style={{ 
                        padding: "8px",
                        borderRadius: "0"
                      }}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              )})}
            </div>
            {productOptions.length > 0 && (
              <div className="row mt-3">
                <div className="col-12">
                  <div className="alert alert-info d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-calculator me-2" style={{ fontSize: "1.5rem" }}></i>
                      <span className="fw-bold">Summary</span>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                      <div className="d-flex align-items-center">
                        <span className="me-2">Total Amount:</span>
                        <span className="fw-bold" style={{ 
                          fontSize: "1.25rem",
                          color: "#0d6efd",
                          textShadow: "1px 1px 2px rgba(0,0,0,0.1)"
                        }}>
                          Rs. {calculateProductTotal(productOptions)}
                        </span>
                      </div>
                      <small className="text-muted">
                        {productOptions.length} items selected
            </small>
          </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0 text-white">Discount Optionss</h5>
            <button type="button" className="btn btn-light btn-sm" onClick={addDiscountOption}>
              <i className="bi bi-plus-circle"></i> Add Discount
            </button>
          </div>
          <div className="card-body">
        {discountOptions.length > 0 && (
              <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Option Name</th>
                  <th>Case</th>
                  <th>Per Case Rate</th>
                  <th>Total</th>
                    <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {discountOptions.map((option, index) => (
                  <tr key={index}>
                    <td>{option.optionId}</td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        value={option.case}
                        onChange={(e) => handleDiscountChange(index, "case", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        value={option.perCaseRate}
                        onChange={(e) => handleDiscountChange(index, "perCaseRate", e.target.value)}
                      />
                    </td>
                      <td><strong>Rs: {option.total || "0.00"}</strong></td>
                      <td>
                        <button 
                          type="button" 
                          className="btn btn-danger btn-sm" 
                          onClick={() => removeDiscountOption(index)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td> 
                  </tr>
                ))}
              </tbody>
            </table>
            )}
            {discountOptions.length > 0 && (
              <div className="row mt-3">
                <div className="col-12">
                  <div className="alert alert-success d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-tag-fill me-2" style={{ fontSize: "1.5rem" }}></i>
                      <span className="fw-bold">Discount Summary</span>
            </div>
                    <div className="d-flex flex-column align-items-end">
                      <div className="d-flex align-items-center">
                        <span className="me-2">Total Discount:</span>
                        <span className="fw-bold" style={{ 
                          fontSize: "1.25rem",
                          color: "#198754",
                          textShadow: "1px 1px 2px rgba(0,0,0,0.1)"
                        }}>
                          Rs. {calculateTotal(discountOptions)}
                        </span>
                      </div>
                      <small className="text-muted">
                        {discountOptions.length} discount items applied
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="card shadow-sm mb-4">
          <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0 text-white">Free Issue Options</h5>
            <button type="button" className="btn btn-light btn-sm" onClick={addFreeIssueOption}>
              <i className="bi bi-plus-circle"></i> Add Free Issue
            </button>
          </div>
          <div className="card-body">
        {freeIssueOptions.length > 0 && (
              <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Option Name</th>
                  <th>Case</th>
                  <th>Per Case Rate</th>
                  <th>Total</th>
                    <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {freeIssueOptions.map((option, index) => (
                  <tr key={index}>
                    <td>{option.optionId}</td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        value={option.case}
                        onChange={(e) => handleFreeIssueChange(index, "case", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        value={option.perCaseRate}
                        onChange={(e) => handleFreeIssueChange(index, "perCaseRate", e.target.value)}
                      />
                    </td>
                      <td><strong>Rs: {option.total || "0.00"}</strong></td>
                      <td>
                        <button 
                          type="button" 
                          className="btn btn-danger btn-sm" 
                          onClick={() => removeFreeIssueOption(index)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
            )}
            {freeIssueOptions.length > 0 && (
              <div className="row mt-3">
                <div className="col-12">
                  <div className="alert alert-info d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-gift-fill me-2" style={{ fontSize: "1.5rem" }}></i>
                      <span className="fw-bold">Free Issue Summary</span>
            </div>
                    <div className="d-flex flex-column align-items-end">
                      <div className="d-flex align-items-center">
                        <span className="me-2">Total Free Issue:</span>
                        <span className="fw-bold" style={{ 
                          fontSize: "1.25rem",
                          color: "#0dcaf0",
                          textShadow: "1px 1px 2px rgba(0,0,0,0.1)"
                        }}>
                          Rs. {calculateTotal(freeIssueOptions)}
                        </span>
                      </div>
                      <small className="text-muted">
                        {freeIssueOptions.length} free items applied
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="card shadow-sm mb-4">
          <div className="card-header bg-warning text-dark d-flex justify-content-between align-items-center">
            <h5 className="mb-0 text-white">Expire Options</h5>
            <button type="button" className="btn btn-light btn-sm" onClick={addExpireOption}>
              <i className="bi bi-plus-circle"></i> Add Expire
            </button>
          </div>
          <div className="card-body">
        {expireOptions.length > 0 && (
              <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Option Name</th>
                  <th>Case</th>
                  <th>Per Case Rate</th>
                  <th>Total</th>
                    <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {expireOptions.map((option, index) => (
                  <tr key={index}>
                    <td>{option.optionId}</td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        value={option.case}
                        onChange={(e) => handleExpireChange(index, "case", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        value={option.perCaseRate}
                        onChange={(e) => handleExpireChange(index, "perCaseRate", e.target.value)}
                      />
                    </td>
                      <td><strong>Rs: {option.total || "0.00"}</strong></td>
                      <td>
                        <button 
                          type="button" 
                          className="btn btn-danger btn-sm" 
                          onClick={() => removeExpireOption(index)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
            )}
            {expireOptions.length > 0 && (
              <div className="row mt-3">
                <div className="col-12">
                  <div className="alert alert-warning d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-exclamation-triangle-fill me-2" style={{ fontSize: "1.5rem" }}></i>
                      <span className="fw-bold">Expire Summary</span>
            </div>
                    <div className="d-flex flex-column align-items-end">
                      <div className="d-flex align-items-center">
                        <span className="me-2">Total Expire:</span>
                        <span className="fw-bold" style={{ 
                          fontSize: "1.25rem",
                          color: "#664d03",
                          textShadow: "1px 1px 2px rgba(0,0,0,0.1)"
                        }}>
                          Rs. {calculateTotal(expireOptions)}
                        </span>
                      </div>
                      <small className="text-muted">
                        {expireOptions.length} expire items applied
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="card shadow-sm mb-4">
          <div className="card-header bg-secondary text-white">
            <h5 className="mb-0 text-white">Percentage Discount</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter discount percentage"
                    value={percentageDiscount}
                    onChange={(e) => handlePercentageDiscountChange(e.target.value)}
                    min="0"
                    max="100"
                    step="0.01"
                  />
                  <span className="input-group-text">%</span>
                </div>
              </div>
              <div className="col-md-6">
                {percentageDiscount && !isNaN(percentageDiscount) && (
                  <div className="alert alert-info mb-0">
                    Discount Amount: Rs. {calculatePercentageDiscountTotal(calculateProductTotal(productOptions), percentageDiscount)}
                    <br />
                    <small>(Calculated from product total: Rs. {calculateProductTotal(productOptions)})</small>
            </div>
          )}
            </div>
            </div>
          </div>
        </div>

        {/* Bill Summary Section */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-danger text-white">
            <h5 className="mb-0 text-white">Bill Summary</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 offset-md-6">
                <div className="table-responsive">
                  <table className="table table-borderless">
                    <tbody>
                      <tr>
                        <td className="text-end fw-bold fs-5">Product Total:</td>
                        <td className="text-end fw-bold" style={{ width: "150px", color: "#0d6efd",fontSize: "1.25rem" }}>
                          Rs. {calculateProductTotal(productOptions)}
                        </td>
                      </tr>
                      
                      {discountOptions.length > 0 && (
                        <tr>
                          <td className="text-end fw-bold">Discount Total:</td>
                          <td className="text-end fw-bold" style={{ color: "#198754" }}>
                            - Rs. {calculateTotal(discountOptions)}
                          </td>
                        </tr>
                      )}
                      
                      {freeIssueOptions.length > 0 && (
                        <tr>
                          <td className="text-end fw-bold">Free Issue Total:</td>
                          <td className="text-end fw-bold" style={{ color: "#0dcaf0" }}>
                            - Rs. {calculateTotal(freeIssueOptions)}
                          </td>
                        </tr>
                      )}
                      
          {expireOptions.length > 0 && (
                        <tr>
                          <td className="text-end fw-bold">Expire Total:</td>
                          <td className="text-end fw-bold" style={{ color: "#664d03" }}>
                            - Rs. {calculateTotal(expireOptions)}
                          </td>
                        </tr>
                      )}
                      
                      {percentageDiscount && parseFloat(percentageDiscount) > 0 && (
                        <tr>
                          <td className="text-end fw-bold">Percentage Discount ({percentageDiscount}%):</td>
                          <td className="text-end fw-bold" style={{ color: "#6c757d" }}>
                            - Rs. {calculatePercentageDiscountTotal(calculateProductTotal(productOptions), percentageDiscount)}
                          </td>
                        </tr>
                      )}
                      
                      <tr style={{ borderTop: "1px solid #dee2e6" }}>
                        <td className="text-end fw-bold fs-5">Final Total:</td>
                        <td className="text-end fw-bold fs-5" style={{ color: "#dc3545" }}>
                          Rs. {(
                            parseFloat(calculateProductTotal(productOptions)) - 
                            (parseFloat(calculateTotal(discountOptions)) + 
                             parseFloat(calculateTotal(freeIssueOptions)) + 
                             parseFloat(calculateTotal(expireOptions)) + 
                             parseFloat(percentageDiscount ? calculatePercentageDiscountTotal(calculateProductTotal(productOptions), percentageDiscount) : 0)
                            )
                          ).toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={loading}
          >
            {loading ? "Saving..." : editBill ? "Update Bill" : "Save Bill"}
          </button>
        </div>
      </form>

      {/* Bill History Section */}
      <div className="card shadow-sm mb-4 mt-5">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0 text-white">Bill History</h5>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <div className="input-group">
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
            </div>
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-person"></i>
                </span>
                <select
                  className="form-select"
                  value={creatorFilter}
                  onChange={(e) => setCreatorFilter(e.target.value)}
                >
                  <option value="">All Users</option>
                  {uniqueCreators.map((creator, index) => (
                    <option key={index} value={creator}>{creator}</option>
                  ))}
                </select>
              </div>
        </div>
      </div>

          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-primary">
          <tr>
            <th>Bill No</th>
            <th>Outlet Name</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Created By</th>
                  <th>Actions</th>
          </tr>
        </thead>
        <tbody>
                {currentBills.length > 0 ? (
                  currentBills.map((bill) => (
            <tr key={bill.id}>
              <td>{bill.billNo}</td>
              <td>{bill.outletName}</td>
              <td>{bill.createDate}</td>
              <td>
                        <span className={`badge ${bill.printStatus ? 'bg-success' : 'bg-warning'}`}>
                          {bill.printStatus ? 'Printed' : 'Not Printed'}
                        </span>
                        </td>
                      <td>{bill.createdBy || "Unknown"}</td>
                      <td>
                        <div className="d-flex">
                  <button 
                            className="btn btn-primary btn-sm me-1"
                            onClick={() => handleViewBill(bill)}
                            title="View Bill"
                          >
                            <i className="bi bi-eye"></i>
                          </button>
                          <button
                            className="btn btn-info btn-sm me-1"
                    onClick={() => handlePrintBill(bill)}
                            title="Print Bill"
                          >
                            <i className="bi bi-printer"></i>
                          </button>
                          <button
                            className="btn btn-warning btn-sm me-1"
                            onClick={() => handleEditBill(bill)}
                            title="Edit Bill"
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteBill(bill.id)}
                            title="Delete Bill"
                          >
                            <i className="bi bi-trash"></i>
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
          </div>

          {/* Pagination */}
          {filteredBills.length > itemsPerPage && (
        <nav>
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: Math.ceil(filteredBills.length / itemsPerPage) }).map((_, index) => (
                  <li
                    key={index}
                    className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                  >
                    <button className="page-link" onClick={() => paginate(index + 1)}>
                      {index + 1}
                    </button>
              </li>
            ))}
                <li
                  className={`page-item ${
                    currentPage === Math.ceil(filteredBills.length / itemsPerPage) ? 'disabled' : ''
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === Math.ceil(filteredBills.length / itemsPerPage)}
                  >
                    Next
                  </button>
                </li>
          </ul>
        </nav>
          )}
        </div>
      </div>

      {/* Keep existing selected bill popup code */}
      {selectedBill && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg" style={{ maxWidth: "900px" }}>
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title text-white">Bill Details - {selectedBill.billNo}</h5>
                <button type="button" className="btn-close btn-close-white" onClick={handleClosePopup}></button>
            </div>
              <div className="modal-body" style={{ maxHeight: "70vh", overflowY: "auto" }}>
                <div className="row mb-3">
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

                {/* Product Options Section */}
                <h6 className="fw-bold mt-4">Product Options</h6>
                <div className="table-responsive">
              <table className="table table-bordered">
                    <thead className="table-light">
                  <tr>
                        <th>Product</th>
                        <th>Option</th>
                        <th>Unit Price (DB)</th>
                    <th>Quantity</th>
                        <th style={{ backgroundColor: "#e9ecef", color: "#0d6efd", fontWeight: "bold" }}>Current Stock</th>
                        <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                      {selectedBill.productOptions && selectedBill.productOptions.length > 0 ? (
                        selectedBill.productOptions.map((option, index) => {
                          // Find the product from the products array
                          const product = products.find(p => p.id === option.productId);
                          // Find the specific product option to get real-time current stock
                          const productOption = product?.options.find(opt => opt.name === option.optionId);
                          // Calculate the total for this row
                          const rowTotal = ((parseFloat(option.price) || 0) * (parseFloat(option.qty) || 0)).toFixed(2);
                          // Check if stock is low
                          const isLowStock = productOption && parseInt(productOption.stock || 0) < parseInt(option.qty || 0);
                          
                          return (
                            <tr key={index}>
                              <td>{product?.name || 'N/A'}</td>
                              <td>{option.optionId}</td>
                      <td>Rs. {option.price}</td>
                      <td>{option.qty}</td>
                              <td style={{ 
                                backgroundColor: "#f8f9fa", 
                                fontWeight: "bold",
                                color: isLowStock ? "#dc3545" : "#198754"
                              }}>
                                {productOption?.stock || "0"}
                              </td>
                              <td className="fw-bold">Rs. {rowTotal}</td>
                    </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">No product options found</td>
                        </tr>
                      )}
                </tbody>
                <tfoot>
                      <tr className="table-primary">
                        <td colSpan="5" className="text-end fw-bold">Product Total</td>
                        <td className="fw-bold">Rs. {selectedBill.productOptions ? calculateProductTotal(selectedBill.productOptions) : "0.00"}</td>
                  </tr>
                </tfoot>
              </table>
                </div>
                
                {/* Discount Options Section */}
                <h6 className="fw-bold mt-4">Discount Options</h6>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead className="table-light">
                      <tr>
                        <th>Name</th>
                        <th>Case</th>
                        <th>Per Case Rate</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedBill.discountOptions && selectedBill.discountOptions.length > 0 ? (
                        selectedBill.discountOptions.map((option, index) => (
                          <tr key={index}>
                          <td>{option.name}</td>
                          <td>{option.case}</td>
                          <td>{option.perCaseRate}</td>
                            <td>Rs. {option.total || "0.00"}</td>
                        </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center">No discount options applied</td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot>
                      <tr className="table-success">
                        <td colSpan="3" className="text-end fw-bold">Discount Total</td>
                        <td className="fw-bold">Rs. {selectedBill.discountOptions ? calculateTotal(selectedBill.discountOptions) : "0.00"}</td>
                      </tr>
                    </tfoot>
                  </table>
                  </div>
                
                {/* Free Issue Options Section */}
                <h6 className="fw-bold mt-4">Free Issue Options</h6>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead className="table-light">
                      <tr>
                        <th>Name</th>
                        <th>Case</th>
                        <th>Per Case Rate</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedBill.freeIssueOptions && selectedBill.freeIssueOptions.length > 0 ? (
                        selectedBill.freeIssueOptions.map((option, index) => (
                          <tr key={index}>
                          <td>{option.name}</td>
                          <td>{option.case}</td>
                          <td>{option.perCaseRate}</td>
                            <td>Rs. {option.total || "0.00"}</td>
                        </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center">No free issue options applied</td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot>
                      <tr className="table-info">
                        <td colSpan="3" className="text-end fw-bold">Free Issue Total</td>
                        <td className="fw-bold">Rs. {selectedBill.freeIssueOptions ? calculateTotal(selectedBill.freeIssueOptions) : "0.00"}</td>
                      </tr>
                    </tfoot>
                  </table>
                  </div>
                
                {/* Expire Options Section */}
                <h6 className="fw-bold mt-4">Expire Options</h6>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead className="table-light">
                      <tr>
                        <th>Name</th>
                        <th>Case</th>
                        <th>Per Case Rate</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedBill.expireOptions && selectedBill.expireOptions.length > 0 ? (
                        selectedBill.expireOptions.map((option, index) => (
                          <tr key={index}>
                          <td>{option.name}</td>
                          <td>{option.case}</td>
                          <td>{option.perCaseRate}</td>
                            <td>Rs. {option.total || "0.00"}</td>
                        </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center">No expire options applied</td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot>
                      <tr className="table-warning">
                        <td colSpan="3" className="text-end fw-bold">Expire Total</td>
                        <td className="fw-bold">Rs. {selectedBill.expireOptions ? calculateTotal(selectedBill.expireOptions) : "0.00"}</td>
                      </tr>
                    </tfoot>
                  </table>
                  </div>
                
                {/* Percentage Discount Section */}
                <div className="card mt-4">
                  <div className="card-header bg-secondary text-white">
                    <h6 className="mb-0">Percentage Discount</h6>
                </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-6">
                        <p className="mb-0"><strong>Discount Percentage:</strong></p>
                  </div>
                      <div className="col-6 text-end">
                        <p className="mb-0">{selectedBill.percentageDiscount || "0"}%</p>
                      </div>
                    </div>
                    {selectedBill.percentageDiscount && parseFloat(selectedBill.percentageDiscount) > 0 && (
                      <div className="row mt-2">
                        <div className="col-6">
                          <p className="mb-0"><strong>Discount Amount:</strong></p>
                        </div>
                        <div className="col-6 text-end">
                          <p className="mb-0">Rs. {calculatePercentageDiscountTotal(calculateProductTotal(selectedBill.productOptions), selectedBill.percentageDiscount)}</p>
                        </div>
                  </div>
                )}
                  </div>
                </div>
                
                {/* Bill Summary Section */}
                <div className="card mt-4 border-danger">
                  <div className="card-header bg-danger text-white">
                    <h6 className="mb-0">Bill Summary</h6>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-borderless">
                        <tbody>
                          <tr>
                            <td className="text-end fw-bold">Product Total:</td>
                            <td className="text-end fw-bold" style={{ width: "150px", color: "#0d6efd" }}>
                              Rs. {calculateProductTotal(selectedBill.productOptions)}
                            </td>
                          </tr>
                          
                          {selectedBill.discountOptions && selectedBill.discountOptions.length > 0 && (
                            <tr>
                              <td className="text-end fw-bold">Discount Total:</td>
                              <td className="text-end fw-bold" style={{ color: "#198754" }}>
                                - Rs. {calculateTotal(selectedBill.discountOptions)}
                              </td>
                            </tr>
                          )}
                          
                          {selectedBill.freeIssueOptions && selectedBill.freeIssueOptions.length > 0 && (
                            <tr>
                              <td className="text-end fw-bold">Free Issue Total:</td>
                              <td className="text-end fw-bold" style={{ color: "#0dcaf0" }}>
                                - Rs. {calculateTotal(selectedBill.freeIssueOptions)}
                              </td>
                            </tr>
                          )}
                          
                          {selectedBill.expireOptions && selectedBill.expireOptions.length > 0 && (
                            <tr>
                              <td className="text-end fw-bold">Expire Total:</td>
                              <td className="text-end fw-bold" style={{ color: "#664d03" }}>
                                - Rs. {calculateTotal(selectedBill.expireOptions)}
                              </td>
                            </tr>
                          )}
                          
                          {selectedBill.percentageDiscount && parseFloat(selectedBill.percentageDiscount) > 0 && (
                            <tr>
                              <td className="text-end fw-bold">Percentage Discount ({selectedBill.percentageDiscount}%):</td>
                              <td className="text-end fw-bold" style={{ color: "#6c757d" }}>
                                - Rs. {calculatePercentageDiscountTotal(calculateProductTotal(selectedBill.productOptions), selectedBill.percentageDiscount)}
                              </td>
                            </tr>
                          )}
                          
                          <tr style={{ borderTop: "1px solid #dee2e6" }}>
                            <td className="text-end fw-bold fs-5">Final Total:</td>
                            <td className="text-end fw-bold fs-5" style={{ color: "#dc3545" }}>
                              Rs. {(
                    parseFloat(calculateProductTotal(selectedBill.productOptions)) -
                                (parseFloat(selectedBill.discountOptions ? calculateTotal(selectedBill.discountOptions) : 0) + 
                                 parseFloat(selectedBill.freeIssueOptions ? calculateTotal(selectedBill.freeIssueOptions) : 0) + 
                                 parseFloat(selectedBill.expireOptions ? calculateTotal(selectedBill.expireOptions) : 0) + 
                                 parseFloat(selectedBill.percentageDiscount ? calculatePercentageDiscountTotal(calculateProductTotal(selectedBill.productOptions), selectedBill.percentageDiscount) : 0)
                                )
                  ).toFixed(2)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-info" onClick={() => handlePrintBill(selectedBill)}>
                  <i className="bi bi-printer"></i> Print Bill
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleClosePopup}>
                    Close
                  </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillAdd;