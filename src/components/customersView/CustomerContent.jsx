import React, { useState, useEffect } from "react";
import Select from "react-select";
import { db } from "../../utilities/firebaseConfig";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import 'bootstrap-icons/font/bootstrap-icons.css';

const BillAdd = () => {
  const [billNo, setBillNo] = useState("");
  const [outletName, setOutletName] = useState(null); // Changed to null for react-select
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [salesRef, setSalesRef] = useState("");
  const [refContact, setRefContact] = useState("");
  const [createDate, setCreateDate] = useState(new Date().toISOString().split("T")[0]); // Default to current date
  const [productOptions, setProductOptions] = useState([]);
  const [products, setProducts] = useState([]);
  const [bills, setBills] = useState([]);
  const [customers, setCustomers] = useState([]); // Added to fetch customer data
  const [loading, setLoading] = useState(false);
  const [editBill, setEditBill] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const billsCollectionRef = collection(db, "Bill");
  const productsCollectionRef = collection(db, "Product");
  const customersCollectionRef = collection(db, "Customers"); // Added for customer data

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
        const billList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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
              status: doc.data().status, // Include status field
            }))
            .filter(customer => customer.status === 1); // Filter for status === 1 (Active)
          setCustomers(customerList);
        } catch (error) {
          console.error("Error fetching customers:", error.message);
        }
      };

    fetchProducts();
    fetchBills();
    fetchCustomers();
    generateBillNo(); // Ensure the Bill No is generated when the component mounts
  }, []);

  const generateBillNo = async () => {
    const querySnapshot = await getDocs(billsCollectionRef);
    const count = querySnapshot.size + 1; // Bill No increments by 1
    setBillNo(`INV${count.toString().padStart(6, "0")}`); // Fixed template literal syntax
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editBill) {
        // Update the existing bill
        await updateDoc(doc(db, "Bill", editBill.id), {
          billNo,
          outletName: outletName ? outletName.label : "",
          address,
          contact,
          salesRef,
          refContact,
          createDate,
          productOptions,
        });
        alert("Bill updated successfully!");
        setEditBill(null);
      } else {
        // Add a new bill
        await addDoc(billsCollectionRef, {
          billNo,
          outletName: outletName ? outletName.label : "",
          address,
          contact,
          salesRef,
          refContact,
          createDate,
          productOptions,
          createdAt: serverTimestamp(),
        });
        alert("Bill added successfully!");
      }

      // Fetch and update the bills state after adding or updating the bill
      const querySnapshot = await getDocs(billsCollectionRef);
      const billList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBills(billList);

      // After saving, refresh the Bill No and reset form
      generateBillNo();
      setEditBill(null);
      setOutletName(null);
      setAddress("");
      setContact("");
      setSalesRef("");
      setRefContact("");
      setCreateDate(new Date().toISOString().split("T")[0]);
      setProductOptions([]);
    } catch (error) {
      console.error("Error saving bill:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Reset form to create a new bill
  const handleCreateNewBill = () => {
    setEditBill(null);
    setOutletName(null);
    setAddress("");
    setContact("");
    setSalesRef("");
    setRefContact("");
    setCreateDate(new Date().toISOString().split("T")[0]);
    setProductOptions([]);
    generateBillNo(); // Refresh Bill No when creating a new bill
  };

  const filteredBills = bills.filter(bill => 
    bill.billNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.outletName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.salesRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.refContact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastBill = currentPage * itemsPerPage;
  const indexOfFirstBill = indexOfLastBill - itemsPerPage;
  const currentBills = filteredBills.slice(indexOfFirstBill, indexOfLastBill);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h3>{editBill ? "Edit Bill" : "Add New Bill"}</h3>

      {/* Create New Bill Button */}
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
            <small style={{ color: "red", maxWidth: "20%", minWidth: "15%" }} >Current Stock: {option.currentQty}</small>
            <button type="button" className="btn btn-danger" onClick={() => removeProductOption(index)}>✖</button>
          </div>
        ))}
        <button type="button" className="btn btn-success" onClick={addProductOption}>+ Add Option</button>
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

      {/* Bill List Table */}
      <h3 className="mt-4">Bills</h3>
      <div className="mt-4" style={{ display: "flex", justifyContent: "flex-end" }}>
        <div style={{ position: "relative", width: "400px" }}>
          <input 
            type="text" 
            className="form-control mb-3" 
            placeholder="Search bills..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            style={{ paddingLeft: "40px", width: "100%" }} // Padding for icon space
          />
          <i
            className="bi bi-search" // Bootstrap search icon
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
            {/* <th>Address</th> */}
            {/* <th>Contact</th> */}
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
              {/* <td>{bill.address}</td> */}
              {/* <td>{bill.contact}</td> */}
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
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditBill(bill)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeleteBill(bill.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
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
  );
};

export default BillAdd;