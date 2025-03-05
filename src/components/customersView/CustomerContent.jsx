import React, { useState, useEffect } from "react";
import Select from "react-select";
import { db } from "../../utilities/firebaseConfig";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, serverTimestamp, query, where } from "firebase/firestore";
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
  const [products, setProducts] = useState([]);
  const [bills, setBills] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editBill, setEditBill] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedBill, setSelectedBill] = useState(null);

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
        await deleteDoc(doc(db, "Bill", id));
        setBills(bills.filter((bill) => bill.id !== id));
      } catch (error) {
        console.error("Error deleting bill:", error.message);
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

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice - ${bill.billNo}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 5px; 
              font-size: 10px; 
              line-height: 1.2; 
              background-color: #f9f9f9;
            }
            .invoice-container { 
              max-width: 700px; 
              margin: 0 auto; 
              border: 1px solid #333; 
              padding: 5px; 
            }
            .header { 
              text-align: center; 
              padding: 2px; 
            }
            .header .company { 
              display: flex; 
              justify-content: space-between; 
              align-items: center; 
              margin-bottom: 5px; 
            }
            .company-title { 
              font-size: 23px; 
              font-weight: bold; 
              color: rgb(0, 0, 0); 
            }
            .company-pepsi { 
              font-size: 15px; 
              font-weight: bold; 
              color: rgb(112, 112, 112); 
            }
            .company-details { 
              font-size: 8px; 
              color: #333; 
              margin-bottom: 5px; 
              text-align: center;
            }
            .details table { 
              width: 100%; 
              border: none; 
            }
            .details td { 
              padding: 2px; 
              vertical-align: top; 
            }
            .details td:first-child { 
              width: 30%; 
              font-weight: bold; 
            }
            .details td:nth-child(3) { 
              font-weight: bold; 
              text-align: right; 
            }
            .payment-options { 
              width: 50%; 
              margin-left: auto; /* Right-align */
              margin-top: 5px; 
              display: flex; 
              justify-content: space-around; 
              border: 1px solid #ddd; 
              padding: 2px; 
            }
            .payment-option { 
              width: 33%; 
              text-align: center; 
            }
            .discounts { 
              display: flex; 
              justify-content: space-between; 
              margin: 5px 0; 
            }
            .discounts div { 
              width: 32%; 
              border: 1px solid #ddd; 
              padding: 2px; 
            }
            table { 
              width: 100%; 
              border-collapse: collapse; 
              margin-top: 5px; 
            }
            th, td { 
              padding: 2px; 
              text-align: left; 
              font-size: 10px; 
            }
            .total-section table { 
              width: 50%; 
              border-collapse: collapse; 
              margin-top: 5px; 
              margin-left: auto; /* Right-align the table */
              border: none; 
            }
            .total-section td { 
              padding: 2px; 
              text-align: right; 
              font-size: 10px; 
              font-weight: bold; 
            }
            .total-section .total-row td { 
              color: #e74c3c; 
            }
            .products-table { 
              width: 70%; /* Smaller width */
              margin: 0 auto; /* Center-align */
              border: 1px solid #ddd; 
            }
            .products-table thead { 
              border-bottom: 1px solid #ddd; 
            }
            .products-table th { 
              border: none; 
              background-color: #fff; 
            }
            .products-table td { 
              border: none; 
            }
            .signature { 
              border-top: 1px dashed #000; 
              margin-top: 5px; 
              text-align: center; 
              font-size: 8px; 
            }
            .footer { 
              text-align: center; 
              margin-top: 5px; 
              font-size: 8px; 
              color: #777; 
            }
            @media print {
              @page { size: A4; margin: 5mm; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            <div class="header">
              <div class="company">
                <div class="company-title"></div>
                <div class="company-pepsi">pepsi</div>
              </div>
              <div class="company-title">Advance Trading</div>
              <p class="company-details">Reg Office: No: 170/A, Nuwaraeliya Rd, Delpitiya, Gampola<br>Tel: 072-7070701</p>
            </div>
            <div class="details">
              <table>
                <tr><td><strong>Customer Name</strong></td><td>${bill.outletName}</td><td><strong>Invoice No:</strong></td><td><strong>${bill.billNo}</strong></td></tr>
                <tr><td><strong>Customer Contact</strong></td><td>${bill.contact}</td><td><strong>Date:</strong></td><td>${bill.createDate}</td></tr>
                <tr><td><strong>Address</strong></td><td>${bill.address}</td></tr>
                <tr><td><strong>Ref Name</strong></td><td>${bill.salesRef}</td></tr>
                <tr><td><strong>Ref Contact</strong></td><td>${bill.refContact}</td></tr>
              </table>
            </div>
            <div class="payment-options">
              <div class="payment-option"><input type="checkbox" name="payment" value="cash"> cash</div>
              <div class="payment-option"><input type="checkbox" name="payment" value="credit"> credit</div>
              <div class="payment-option"><input type="checkbox" name="payment" value="cheque"> cheque</div>
            </div>
            <div class="discounts">
              <div>
                <p><strong>DISCOUNT</strong></p>
                ${bill.discountOptions.map(option => `
                  <p>${option.name}: ${option.case} * ${option.perCaseRate} = ${option.total}</p>
                `).join('')}
                <p><strong>Total</strong> ${calculateTotal(bill.discountOptions)}</p>
              </div>
              <div>
                <p><strong>FREE ISSUE</strong></p>
                ${bill.freeIssueOptions.map(option => `
                  <p>${option.name}: ${option.case} * ${option.perCaseRate} = ${option.total}</p>
                `).join('')}
                <p><strong>Total</strong> ${calculateTotal(bill.freeIssueOptions)}</p>
              </div>
              <div>
                <p><strong>EXPIRE</strong></p>
                ${bill.expireOptions.map(option => `
                  <p>${option.name}: ${option.case} * ${option.perCaseRate} = ${option.total}</p>
                `).join('')}
                <p><strong>Total</strong> ${calculateTotal(bill.expireOptions)}</p>
              </div>
            </div>

            <table class="products-table">
              <thead>
                <tr>
                  <th>DESCRIPTION</th>
                  <th>QTY</th>
                  <th>*</th>
                  <th>RATE Rs.</th>
                  <th>RATE Rs.</th>
                </tr>
              </thead>
              <tbody>
                ${bill.productOptions.map(option => `
                  <tr>
                    <td>${products.find(p => p.id === option.productId)?.name || 'N/A'} ${option.optionId}</td>
                    <td>${option.qty}</td>
                    <td>*</td>
                    <td>${option.price}</td>
                    <td>${((parseFloat(option.price) || 0) * (parseFloat(option.qty) || 0)).toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>

            <div class="total-section">
              <table>
                <tr>
                  <td><strong>SUBTOTAL</strong></td>
                   <td>=</td>
                  <td>${calculateProductTotal(bill.productOptions)}</td>
                </tr>
                <tr>
                  <td><strong>DISCOUNT</strong></td>
                  <td>=</td>
                  <td>${calculateTotal(bill.discountOptions)}</td>
                </tr>
                <tr>
                  <td><strong>FREE ISSUE</strong></td>
                  <td>=</td>
                  <td>${calculateTotal(bill.freeIssueOptions)}</td>
                </tr>
                <tr>
                  <td><strong>EXPIRE</strong></td>
                  <td>=</td>
                  <td>${calculateTotal(bill.expireOptions)}</td>
                </tr>
                <tr>
                  <td><strong>TOTAL</strong></td>
                  <td>=</td>
                  <td style="color: #e74c3c;">${(
                    parseFloat(calculateProductTotal(bill.productOptions)) -
                    (parseFloat(calculateTotal(bill.discountOptions)) +
                     parseFloat(calculateTotal(bill.freeIssueOptions)) +
                     parseFloat(calculateTotal(bill.expireOptions)))
                  ).toFixed(2)}</td>
                </tr>
              </table>
            </div>

            <div class="signature">customer signature</div>
            <div class="footer">
              <p>Thank you!</p>
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
    newOptions[index] = {
      ...newOptions[index],
      productId: product.id,
      optionId: "",
      price: "",
      currentQty: "",
    };
    setProductOptions(newOptions);
  };

  const handleOptionChange = (index, selectedOption) => {
    const selectedProduct = products.find(p => p.id === productOptions[index].productId);
    const option = selectedProduct.options.find(opt => opt.name === selectedOption.value);
    const newOptions = [...productOptions];
    newOptions[index] = {
      ...newOptions[index],
      optionId: option.name,
      price: option.price,
      currentQty: option.qty,
    };
    setProductOptions(newOptions);
  };

  const handleQtyChange = (index, value) => {
    const newOptions = [...productOptions];
    newOptions[index].qty = value;
    setProductOptions(newOptions);
  };

  const addDiscountOption = () => {
    const distinctOptionIds = [...new Set(productOptions.map(option => option.optionId))];
    const newDiscountOptions = distinctOptionIds
      .filter(optionId => optionId)
      .map(optionId => ({
        name: optionId,
        case: "",
        perCaseRate: "",
        total: "",
      }));
    setDiscountOptions(newDiscountOptions);
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
    const distinctOptionIds = [...new Set(productOptions.map(option => option.optionId))];
    const newFreeIssueOptions = distinctOptionIds
      .filter(optionId => optionId)
      .map(optionId => ({
        name: optionId,
        case: "",
        perCaseRate: "",
        total: "",
      }));
    setFreeIssueOptions(newFreeIssueOptions);
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
    const distinctOptionIds = [...new Set(productOptions.map(option => option.optionId))];
    const newExpireOptions = distinctOptionIds
      .filter(optionId => optionId)
      .map(optionId => ({
        name: optionId,
        case: "",
        perCaseRate: "",
        total: "",
      }));
    setExpireOptions(newExpireOptions);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
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
          printStatus: false, // Default print status to false for new bills
          createdAt: serverTimestamp(),
        });
        alert("Bill added successfully!");
      }

      const querySnapshot = await getDocs(billsCollectionRef);
      const billList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        printStatus: doc.data().printStatus || false,
      }));
      setBills(billList);

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
    } catch (error) {
      console.error("Error saving bill:", error.message);
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
    generateBillNo();
  };

  const filteredBills = bills.filter(bill => 
    bill.billNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.outletName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.salesRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.refContact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastBill = currentPage * itemsPerPage;
  const indexOfFirstBill = indexOfLastBill - itemsPerPage;
  const currentBills = filteredBills.slice(indexOfFirstBill, indexOfLastBill);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

        <h5>Product Options</h5>
        {productOptions.map((option, index) => (
          <div key={index} className="d-flex gap-2 mb-2">
            <Select
              options={products.map((p) => ({ value: p.id, label: p.name }))}
              onChange={(selected) => handleProductChange(index, selected)}
              value={option.productId ? { value: option.productId, label: products.find(p => p.id === option.productId)?.name } : null}
              isSearchable
              styles={{ control: (base) => ({ ...base, minHeight: "50px", minWidth: "320px" }) }}
            />
            <Select
              options={products.find(p => p.id === option.productId)?.options.map(opt => ({ value: opt.name, label: opt.name })) || []}
              onChange={(selected) => handleOptionChange(index, selected)}
              value={option.optionId ? { value: option.optionId, label: option.optionId } : null}
              isSearchable
              styles={{ control: (base) => ({ ...base, minWidth: "320px", minHeight: "50px" }) }}
              isDisabled={!option.productId}
            />
            <input type="text" className="form-control" style={{ maxWidth: "20%" }} value={`Rs: ${option.price}`} disabled />
            <input type="number" className="form-control" style={{ maxWidth: "20%" }} value={option.qty} onChange={(e) => handleQtyChange(index, e.target.value)} required />
            <small style={{ color: "red", maxWidth: "20%", minWidth: "15%" }}>
              Current Stock: {option.currentQty - option.qty}
            </small>
            <button type="button" className="btn btn-danger" onClick={() => removeProductOption(index)}>✖</button>
          </div>
        ))}
        <button type="button" className="btn btn-success mb-3" onClick={addProductOption}>+ Add Option</button>

        <h5>Discount Options</h5>
        <button type="button" className="btn btn-success mb-3" onClick={addDiscountOption}>+ Add Discount</button>

        {discountOptions.length > 0 && (
          <>
            <table
              className="table table-bordered mb-3"
              style={{ backgroundColor: "white", width: "100%" }}
            >
              <thead>
                <tr>
                  <th>Option Name</th>
                  <th>Case</th>
                  <th>Per Case Rate</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {discountOptions.map((option, index) => (
                  <tr key={index}>
                    <td>{option.name}</td>
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
                    <td>{option.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div
              style={{
                textAlign: "right",
                color: "green",
                fontWeight: "bold",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              Total: Rs. {calculateTotal(discountOptions)}
            </div>
          </>
        )}

        <h5>Free Issue Options</h5>
        <button type="button" className="btn btn-success mb-3" onClick={addFreeIssueOption}>+ Add Free Issue</button>

        {freeIssueOptions.length > 0 && (
          <>
            <table className="table table-bordered mb-3" style={{ backgroundColor: "white", width: "100%" }}>
              <thead>
                <tr>
                  <th>Option Name</th>
                  <th>Case</th>
                  <th>Per Case Rate</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {freeIssueOptions.map((option, index) => (
                  <tr key={index}>
                    <td>{option.name}</td>
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
                    <td>{option.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ textAlign: "right", color: "green", fontWeight: "bold" }}>
              Total: Rs. {calculateTotal(freeIssueOptions)}
            </div>
          </>
        )}

        <h5>Expire Options</h5>
        <button type="button" className="btn btn-success mb-3" onClick={addExpireOption}>+ Add Expire</button>

        {expireOptions.length > 0 && (
          <>
            <table className="table table-bordered mb-3" style={{ backgroundColor: "white", width: "100%" }}>
              <thead>
                <tr>
                  <th>Option Name</th>
                  <th>Case</th>
                  <th>Per Case Rate</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {expireOptions.map((option, index) => (
                  <tr key={index}>
                    <td>{option.name}</td>
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
                    <td>{option.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ textAlign: "right", color: "green", fontWeight: "bold" }}>
              Total: Rs. {calculateTotal(expireOptions)}
            </div>
          </>
        )}
        <br /><br />
        <div style={{ textAlign: "right", marginBottom: "20px" }}>
          {discountOptions.length > 0 && (
            <div style={{ color: "red", fontWeight: "bold" }}>
              Discount Total: Rs. {calculateTotal(discountOptions)}
            </div>
          )}
          {freeIssueOptions.length > 0 && (
            <div style={{ color: "red", fontWeight: "bold" }}>
              Free Issue Total: Rs. {calculateTotal(freeIssueOptions)}
            </div>
          )}
          {expireOptions.length > 0 && (
            <div style={{ color: "red", fontWeight: "bold" }}>
              Expire Total: Rs. {calculateTotal(expireOptions)}
            </div>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button 
            type="submit" 
            className="btn btn-primary mt-3" 
            disabled={loading}
          >
            {loading ? "Saving..." : editBill ? "Update Bill" : "Save Bill"}
          </button>
        </div>
      </form>

      <h3 className="mt-4">Bills</h3>
      <div className="mt-4" style={{ display: "flex", justifyContent: "flex-end" }}>
        <div style={{ position: "relative", width: "400px" }}>
          <input 
            type="text" 
            className="form-control mb-3" 
            placeholder="Search bills..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            style={{ paddingLeft: "40px", width: "100%" }}
          />
          <i
            className="bi bi-search"
            style={{
              position: "absolute",
              left: "10px",
              top: "40%",
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
            <th>Product Options</th>
            <th></th>
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
                <table style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                }}>
                  <thead>
                    <tr style={{ backgroundColor: "#53a6ff", color: "#ffffff", fontWeight: "bold" }}>
                      <th style={{ padding: "10px", textAlign: "left" }}>Name</th>
                      <th style={{ padding: "10px", textAlign: "left" }}>Price (Rs.)</th>
                      <th style={{ padding: "10px", textAlign: "left" }}>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bill.productOptions.map((option, idx) => (
                      <tr key={idx} style={{
                        backgroundColor: idx % 2 === 0 ? "#ffffff" : "#f1f1f1",
                      }}>
                        <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                          {
                            products.find((p) => p.id === option.productId)?.name &&
                            option.optionId
                              ? `${products.find((p) => p.id === option.productId)?.name} - ${option.optionId}`
                              : "N/A"
                          }
                        </td>
                        <td style={{ padding: "10px", borderBottom: "1px solid #ddd", fontWeight: "bold", color: "blue" }}>
                          Rs.{option.price}
                        </td>
                        <td style={{
                          padding: "10px",
                          borderBottom: "1px solid #ddd",
                          color: "#28a745",
                          fontWeight: "bold",
                        }}>
                          {option.qty}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
              <td className="text-end">
                <div className="d-flex justify-content-end align-items-center">
                  <button className="btn btn-info btn-sm me-2" onClick={() => handleViewBill(bill)}>View</button>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditBill(bill)}>Edit</button>
                  <button className="btn btn-danger btn-sm me-2" onClick={() => handleDeleteBill(bill.id)}>Delete</button>
                  <button 
                    className="btn btn-success btn-sm" 
                    onClick={() => handlePrintBill(bill)}
                  >
                    {bill.printStatus ? "Re-print" : "Print"}
                  </button>
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

      {/* Popup Modal for View Bill */}
      {selectedBill && (
        <div className="modal" style={{ display: "block", position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-content" style={{ backgroundColor: "#fff", margin: "5% auto", padding: "20px", width: "80%", maxWidth: "800px", borderRadius: "8px", maxHeight: "80vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #ddd", paddingBottom: "10px" }}>
              <h4>Bill Details - {selectedBill.billNo}</h4>
              <button className="btn btn-danger" onClick={handleClosePopup}>Close</button>
            </div>
            <div style={{ marginTop: "20px" }}>
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
                  </table>
                  <div style={{ textAlign: "right", color: "green", fontWeight: "bold" }}>
                    Total: Rs. {calculateTotal(selectedBill.discountOptions)}
                  </div>
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
                  </table>
                  <div style={{ textAlign: "right", color: "green", fontWeight: "bold" }}>
                    Total: Rs. {calculateTotal(selectedBill.freeIssueOptions)}
                  </div>
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
                  </table>
                  <div style={{ textAlign: "right", color: "green", fontWeight: "bold" }}>
                    Total: Rs. {calculateTotal(selectedBill.expireOptions)}
                  </div>
                </>
              )}

              <div style={{ textAlign: "right", marginTop: "20px" }}>
                <div style={{ color: "red", fontWeight: "bold" }}>
                  Product Options Total: Rs. {calculateProductTotal(selectedBill.productOptions)}
                </div>
                {selectedBill.discountOptions?.length > 0 && (
                  <div style={{ color: "red", fontWeight: "bold" }}>
                    Discount : Rs. {calculateTotal(selectedBill.discountOptions)}
                  </div>
                )}
                {selectedBill.freeIssueOptions?.length > 0 && (
                  <div style={{ color: "red", fontWeight: "bold" }}>
                    Free Issue : Rs. {calculateTotal(selectedBill.freeIssueOptions)}
                  </div>
                )}
                {selectedBill.expireOptions?.length > 0 && (
                  <div style={{ color: "red", fontWeight: "bold" }}>
                    Expire : Rs. {calculateTotal(selectedBill.expireOptions)}
                  </div>
                )}
                <div style={{ color: "blue", fontWeight: "bold", marginTop: "10px" }}>
                  Final Total: Rs. {(
                    parseFloat(calculateProductTotal(selectedBill.productOptions)) -
                    ((parseFloat(selectedBill.discountOptions?.length > 0 ? calculateTotal(selectedBill.discountOptions) : 0)) +
                     (parseFloat(selectedBill.freeIssueOptions?.length > 0 ? calculateTotal(selectedBill.freeIssueOptions) : 0)) +
                     (parseFloat(selectedBill.expireOptions?.length > 0 ? calculateTotal(selectedBill.expireOptions) : 0)))
                  ).toFixed(2)}
                </div>
                <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                  <button className="btn btn-danger" onClick={handleClosePopup}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillAdd;