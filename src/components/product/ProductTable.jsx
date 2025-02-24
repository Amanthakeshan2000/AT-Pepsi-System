import React, { useState, useEffect } from "react";
import Table from "@/components/shared/table/Table";

const ProductTable = () => {
  const [productTableData, setProductTableData] = useState([]);
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editData, setEditData] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  // Helper function to parse JSON safely
  const safeParseJSON = async (response) => {
    try {
      const text = await response.text();
      return text ? JSON.parse(text) : [];
    } catch (error) {
      console.error("Failed to parse JSON:", error);
      return [];
    }
  };

  // Fetch categories with error handling
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Access token is missing in localStorage!");

      const response = await fetch(
        "https://localhost:7053/api/Product/get-category?Organization=1e7071f0-dacb-4a98-f264-08dcb066d923",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error(`HTTP Status: ${response.status}`);

      const data = await safeParseJSON(response);

      if (!Array.isArray(data)) {
        throw new Error("Expected categories data to be an array.");
      }

      const categoryMap = data.reduce((acc, category) => {
        acc[category.id] = category.name;
        return acc;
      }, {});

      setCategories(categoryMap);
      return Object.keys(categoryMap);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError(error.message);
      return [];
    }
  };

  // Fetch products with error handling
  const fetchAllProducts = async (categoryIds) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Access token is missing in localStorage!");

      const allProducts = [];
      for (const categoryId of categoryIds) {
        const response = await fetch(
          `https://localhost:7053/api/Product/get-productlist?Organization=1e7071f0-dacb-4a98-f264-08dcb066d923&CategoryIndex=${categoryId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) continue;

        const data = await safeParseJSON(response);

        if (Array.isArray(data)) {
          const formattedProducts = data.map((item) => ({
            id: item.id,
            categoryId: item.categoryId,
            name: item.name,
            description: item.description || "No description available",
          }));
          allProducts.push(...formattedProducts);
        }
      }

      setProductTableData(allProducts);
    } catch (error) {
      console.error("Error fetching products:", error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const categoryIds = await fetchCategories();
        await fetchAllProducts(categoryIds);
      } catch (error) {
        console.error("Error during data fetching:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (rowData) => {
    setEditData(rowData);
    setEditedName(rowData.name);
    setEditedDescription(rowData.description);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setEditData(null);
    setEditedName("");
    setEditedDescription("");
  };

  const handleSave = async () => {
    if (editData) {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("Access token is missing in localStorage!");

        const payload = {
          id: editData.id,
          name: editedName,
          description: editedDescription,
        };

        console.log("Payload being sent to API:", payload);

        const response = await fetch(
          `https://localhost:7053/api/Product/${editData.id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (!response.ok) {
          const errorResponse = await response.json();
          console.error("API response error:", errorResponse);
          throw new Error(`Failed to update product. HTTP Status: ${response.status}`);
        }

        setProductTableData((prevData) =>
          prevData.map((item) =>
            item.id === editData.id
              ? { ...item, name: editedName, description: editedDescription }
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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("Access token is missing in localStorage!");

        const response = await fetch(
          `https://localhost:7053/api/Product/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) throw new Error(`Failed to delete product. HTTP Status: ${response.status}`);

        setProductTableData((prevData) => prevData.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Error deleting product:", error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

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
      accessorKey: "actions",
      header: () => "Actions",
      cell: (info) => {
        const rowData = info.row.original;
        return (
          
          <div style={{ display: "flex", gap: "8px",marginTop:"8px" }}>
          
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
            justify-content: flex-end;
            gap: 10px;
          }
        `}
      </style>
      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : (
        <Table data={productTableData} columns={columns} />
      )}

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Edit Product</h3>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="form-control"
              />
            </div>
            <div style={{ marginTop: "15px" }}>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="form-control"
                rows={4}
              ></textarea>
            </div>
            <div className="popup-actions">
              <button onClick={handleSave} className="btn btn-success">
                Save
              </button>
              <button onClick={closePopup} className="btn btn-secondary">
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
