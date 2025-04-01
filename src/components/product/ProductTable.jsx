import React, { useState, useEffect } from "react";
import { db } from "../../utilities/firebaseConfig"; // Firebase Firestore
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import Table from "@/components/shared/table/Table";

const ProductTable = () => {
  const [productTableData, setProductTableData] = useState([]);
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Search filter

  const [editData, setEditData] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedOptions, setEditedOptions] = useState([]); // Track product options

  const categoriesCollectionRef = collection(db, "categories"); // Firestore Categories
  const productsCollectionRef = collection(db, "Product"); // Firestore Products

  // Fetch categories from Firestore
  const fetchCategories = async () => {
    try {
      const querySnapshot = await getDocs(categoriesCollectionRef);
      const categoryMap = querySnapshot.docs.reduce((acc, doc) => {
        acc[doc.id] = doc.data().name;
        return acc;
      }, {});
      setCategories(categoryMap);
    } catch (error) {
      console.error("Error fetching categories:", error.message);
      setError(error.message);
    }
  };

  // Fetch products from Firestore
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(productsCollectionRef);
      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductTableData(productList);
    } catch (error) {
      console.error("Error fetching products:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  // Handle product deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteDoc(doc(db, "Product", id));
        setProductTableData((prevData) => prevData.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Error deleting product:", error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  // Handle product edit
  const handleEdit = (rowData) => {
    setEditData(rowData);
    setEditedName(rowData.name);
    setEditedDescription(rowData.description);
    setEditedOptions(rowData.productOptions || []);
    setIsPopupOpen(true);
  };

  // Close the edit popup
  const closePopup = () => {
    setIsPopupOpen(false);
    setEditData(null);
    setEditedName("");
    setEditedDescription("");
    setEditedOptions([]);
  };

  // Handle saving an edited product
  const handleSave = async () => {
    if (editData) {
      try {
        // Update stock values before saving
        const updatedOptions = editedOptions.map(option => {
          const newStock = option.newStock === "" ? 0 : parseFloat(option.newStock);
          return {
            ...option,
            stock: (parseFloat(option.stock) || 0) + newStock,
            newStock: "" // Reset to empty string after updating
          };
        });

        const productRef = doc(db, "Product", editData.id);
        await updateDoc(productRef, {
          name: editedName,
          description: editedDescription,
          productOptions: updatedOptions,
        });

        // Update UI
        setProductTableData((prevData) =>
          prevData.map((item) =>
            item.id === editData.id
              ? { ...item, name: editedName, description: editedDescription, productOptions: updatedOptions }
              : item
          )
        );

        closePopup();
      } catch (error) {
        console.error("Error updating product:", error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  // Add a new product option
  const addProductOption = () => {
    setEditedOptions([...editedOptions, { 
      name: "", 
      dbPrice: "", 
      retailPrice: "", 
      margin: "", 
      stock: 0,
      newStock: "" // Set as empty string by default
    }]);
  };

  // Remove a product option
  const removeProductOption = (index) => {
    setEditedOptions(editedOptions.filter((_, i) => i !== index));
  };

  // Handle input change for product options
  const handleOptionChange = (index, field, value) => {
    const newOptions = [...editedOptions];
    newOptions[index][field] = value;
    setEditedOptions(newOptions);
  };

  // Filter products based on search query
  const filteredProducts = productTableData.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      accessorKey: "name",
      header: () => "Product Name",
      meta: {
        className: "fw-bold text-dark",
      },
    },
    {
      accessorKey: "description",
      header: () => "Description",
      cell: (info) => <div className="wrap-text">{info.getValue()}</div>,
    },
    {
      accessorKey: "productOptions",
      header: () => "Options",
      cell: (info) => {
        const options = info.getValue();
    
        if (!options || options.length === 0) {
          return <span style={{ fontStyle: "italic", color: "gray" }}>No options available</span>;
        }
    
        return (
          <div style={{ overflowX: "auto", maxWidth: "100%" }}>
            <table
              style={{
                width: "100%",
                minWidth: "800px", // Minimum width for better mobile display
                borderCollapse: "collapse",
                backgroundColor: "#f9f9f9",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#53a6ff", color: "#ffffff", fontWeight: "bold" }}>
                  <th style={{ padding: "10px", textAlign: "left", color: "#ffffff !important" }}>Name</th>
                  <th style={{ padding: "10px", textAlign: "left", color: "#ffffff !important" }}>DB Price</th>
                  <th style={{ padding: "10px", textAlign: "left", color: "#ffffff !important" }}>Retail Price</th>
                  <th style={{ padding: "10px", textAlign: "left", color: "#ffffff !important" }}>Margin</th>
                  <th style={{ padding: "10px", textAlign: "left", color: "#ffffff !important" }}>Stock</th>
                </tr>
              </thead>
              <tbody>
                {options.map((option, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#ffffff" : "#f1f1f1",
                      transition: "background-color 0.3s",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#e0e0e0")}
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#ffffff" : "#f1f1f1")
                    }
                  >
                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd", color: "red" }}>{option.name}</td>
                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd", fontWeight: "bold", color: "blue" }}>
                      Rs.{option.dbPrice?.toFixed(2) || "0.00"}
                    </td>
                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd", fontWeight: "bold", color: "green" }}>
                      Rs.{option.retailPrice?.toFixed(2) || "0.00"}
                    </td>
                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd", fontWeight: "bold", color: "#ff9800" }}>
                      Rs.{option.margin?.toFixed(2) || "0.00"}
                    </td>
                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd", fontWeight: "bold", color: "#28a745" }}>
                      {option.stock || "0"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      },
    },
    
    
    {
      accessorKey: "actions",
      header: () => "Actions",
      cell: (info) => {
        const rowData = info.row.original;
        return (
          <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
            <button onClick={() => handleEdit(rowData)} className="btn btn-primary btn-sm">
              Edit
            </button>
            <button onClick={() => handleDelete(rowData.id)} className="btn btn-danger btn-sm">
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <style>
        {`
          .fw-bold {
            font-weight: bold;
          }
          .wrap-text {
            white-space: normal;
            word-wrap: break-word;
            word-break: break-word;
          }
          .popup-actions {
            display: flex;
            justify-content: flex-start;
            gap: 10px;
          }
        `}
      </style>

      {/* Search Box */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : (
        <Table data={filteredProducts} columns={columns} />
      )}

      {isPopupOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}>
          <div style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
            width: "800px",
            maxWidth: "90%",
            maxHeight: "90vh",
            overflowY: "auto"
          }}>
            <h3 style={{ textAlign: "center", marginBottom: "15px", color: "#333" }}>
              Edit Product
            </h3>
            
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Name:</label>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
    
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Description:</label>
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              rows={4}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                resize: "none",
              }}
            ></textarea>
    
            <h5 style={{ marginTop: "15px", color: "#333" }}>Product Options</h5>
    
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", minWidth: "700px", borderCollapse: "collapse", marginBottom: "10px" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f8f9fa" }}>
                    <th style={{ padding: "8px", textAlign: "left" }}>Option Name</th>
                    <th style={{ padding: "8px", textAlign: "left" }}>DB Price</th>
                    <th style={{ padding: "8px", textAlign: "left" }}>Retail Price</th>
                    <th style={{ padding: "8px", textAlign: "left" }}>Margin</th>
                    <th style={{ padding: "8px", textAlign: "left" }}>Stock</th>
                    <th style={{ padding: "8px", textAlign: "left" }}>New Stock</th>
                    <th style={{ padding: "8px", textAlign: "left" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {editedOptions.map((option, index) => (
                    <tr key={index}>
                      <td style={{ padding: "8px" }}>
                        <input
                          type="text"
                          value={option.name}
                          onChange={(e) => handleOptionChange(index, "name", e.target.value)}
                          style={{ width: "100%", padding: "4px", borderRadius: "4px", border: "1px solid #ddd" }}
                        />
                      </td>
                      <td style={{ padding: "8px" }}>
                        <input
                          type="number"
                          value={option.dbPrice}
                          onChange={(e) => {
                            const dbPrice = parseFloat(e.target.value) || 0;
                            handleOptionChange(index, "dbPrice", dbPrice);
                            if (option.retailPrice) {
                              handleOptionChange(index, "margin", option.retailPrice - dbPrice);
                            }
                          }}
                          style={{ width: "100%", padding: "4px", borderRadius: "4px", border: "1px solid #ddd" }}
                        />
                      </td>
                      <td style={{ padding: "8px" }}>
                        <input
                          type="number"
                          value={option.retailPrice}
                          onChange={(e) => {
                            const retailPrice = parseFloat(e.target.value) || 0;
                            handleOptionChange(index, "retailPrice", retailPrice);
                            if (option.dbPrice) {
                              handleOptionChange(index, "margin", retailPrice - option.dbPrice);
                            }
                          }}
                          style={{ width: "100%", padding: "4px", borderRadius: "4px", border: "1px solid #ddd" }}
                        />
                      </td>
                      <td style={{ padding: "8px" }}>
                        <input
                          type="number"
                          value={option.margin}
                          disabled
                          style={{ width: "100%", padding: "4px", borderRadius: "4px", border: "1px solid #ddd", backgroundColor: "#f8f9fa" }}
                        />
                      </td>
                      <td style={{ padding: "8px" }}>
                        <input
                          type="number"
                          value={option.stock}
                          disabled
                          style={{ width: "100%", padding: "4px", borderRadius: "4px", border: "1px solid #ddd", backgroundColor: "#f8f9fa" }}
                        />
                      </td>
                      <td style={{ padding: "8px" }}>
                        <input
                          type="number"
                          value={option.newStock === undefined ? "" : option.newStock}
                          onChange={(e) => {
                            const newStock = e.target.value === "" ? "" : parseFloat(e.target.value);
                            handleOptionChange(index, "newStock", newStock);
                          }}
                          style={{ width: "100%", padding: "4px", borderRadius: "4px", border: "1px solid #ddd" }}
                        />
                      </td>
                      <td style={{ padding: "8px" }}>
                        <button
                          onClick={() => removeProductOption(index)}
                          style={{
                            background: "#ff4d4d",
                            color: "#fff",
                            border: "none",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                        >
                          ✖
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
    
            <button
              onClick={addProductOption}
              style={{
                display: "block",
                width: "100%",
                padding: "8px",
                marginTop: "10px",
                background: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              + Add Option
            </button>
    
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
              <button
                onClick={handleSave}
                style={{
                  flex: 1,
                  background: "#007bff",
                  color: "#fff",
                  border: "none",
                  padding: "10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginRight: "5px",
                }}
              >
                Save
              </button>
              <button
                onClick={closePopup}
                style={{
                  flex: 1,
                  background: "#6c757d",
                  color: "#fff",
                  border: "none",
                  padding: "10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
