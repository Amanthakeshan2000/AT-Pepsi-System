import React, { useState, useEffect } from "react";
import { db } from "../../utilities/firebaseConfig";
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";

const CustomerRegistration = () => {
  const [customers, setCustomers] = useState([]);
  const [outletName, setOutletName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [salesRefName, setSalesRefName] = useState("");
  const [refContactNumber, setRefContactNumber] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(1); // Active by default
  const [loading, setLoading] = useState(false);
  const [editCustomer, setEditCustomer] = useState(null);

  const customersCollectionRef = collection(db, "Customers");

  useEffect(() => {
    const unsubscribe = onSnapshot(customersCollectionRef, (snapshot) => {
      const customerList = snapshot.docs.map((doc, index) => ({ id: index + 1, docId: doc.id, ...doc.data() }));
      setCustomers(customerList);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editCustomer) {
        await updateDoc(doc(db, "Customers", editCustomer.docId), {
          outletName,
          address,
          contactNumber,
          salesRefName,
          refContactNumber,
          description,
          status,
        });
        alert("Customer updated successfully!");
        setEditCustomer(null);
      } else {
        await addDoc(customersCollectionRef, {
          outletName,
          address,
          contactNumber,
          salesRefName,
          refContactNumber,
          description,
          status,
          createdAt: serverTimestamp(),
        });
        alert("Customer added successfully!");
      }
      setOutletName("");
      setAddress("");
      setContactNumber("");
      setSalesRefName("");
      setRefContactNumber("");
      setDescription("");
      setStatus(1);
    } catch (error) {
      console.error("Error saving customer:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (customer) => {
    setEditCustomer(customer);
    setOutletName(customer.outletName);
    setAddress(customer.address);
    setContactNumber(customer.contactNumber);
    setSalesRefName(customer.salesRefName);
    setRefContactNumber(customer.refContactNumber);
    setDescription(customer.description);
    setStatus(customer.status);
    
    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await deleteDoc(doc(db, "Customers", id));
      } catch (error) {
        console.error("Error deleting customer:", error.message);
      }
    }
  };

  return (
    <div className="container">
      <h3>{editCustomer ? "Edit Customer" : "Customer Registration"}</h3>
      <form onSubmit={handleSubmit}>
        <div className="row mb-2">
          <div className="col-md-6">
            <label>Outlet Name:</label>
            <input type="text" className="form-control" value={outletName} onChange={(e) => setOutletName(e.target.value)} required />
          </div>
          <div className="col-md-6">
            <label>Address:</label>
            <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} required />
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-md-6">
            <label>Contact Number:</label>
            <input type="text" className="form-control" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />
          </div>
          <div className="col-md-6">
            <label>Sales Ref Name:</label>
            <input type="text" className="form-control" value={salesRefName} onChange={(e) => setSalesRefName(e.target.value)} required />
          </div>
        </div>
        <label>Ref Contact Number:</label>
        <input type="text" className="form-control mb-2" value={refContactNumber} onChange={(e) => setRefContactNumber(e.target.value)} required />
        <label>Description (Optional):</label>
        <textarea className="form-control mb-2" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        <label>Status:</label>
        <select className="form-control mb-3" value={status} onChange={(e) => setStatus(Number(e.target.value))}>
          <option value={1}>Active</option>
          <option value={0}>Inactive</option>
        </select>
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? "Saving..." : editCustomer ? "Update Customer" : "Register Customer"}</button>
      </form>
      <h3 className="mt-4">Customer List</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Outlet Name</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Sales Ref</th>
            <th>Ref Contact</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={customer.docId}>
              <td>{index + 1}</td>
              <td>{customer.outletName}</td>
              <td>{customer.address}</td>
              <td>{customer.contactNumber}</td>
              <td>{customer.salesRefName}</td>
              <td>{customer.refContactNumber}</td>
              <td>
                <span style={{
                  padding: "4px 13px",
                  borderRadius: "12px",
                  color: "white",
                  fontSize:12,
                  backgroundColor: customer.status ? "green" : "red",
                }}>
                  {customer.status ? "Active" : "Inactive"}
                </span>
              </td>
              <td style={{ display: "flex", gap: "5px" }}>
                <button className="btn btn-warning btn-sm" onClick={() => handleEdit(customer)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(customer.docId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerRegistration;