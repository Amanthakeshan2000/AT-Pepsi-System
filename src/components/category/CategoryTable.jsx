import React, { useState, useEffect } from "react";
import Table from "@/components/shared/table/Table";
import { db } from "../../utilities/firebaseConfig";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const CategoryTable = () => {
  const [categoryTableData, setCategoryTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedStatus, setEditedStatus] = useState(0); // Default Active

  const categoriesCollectionRef = collection(db, "categories"); // Firestore collection reference

  // Fetch all categories from Firestore
  const fetchCategoryData = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(categoriesCollectionRef);
      const categoryList = querySnapshot.docs.map((docSnapshot) => {
        const data = docSnapshot.data();

        return {
          id: docSnapshot.id,
          name: data.name,
          status: data.status !== undefined ? (data.status === 1 ? "Inactive" : "Active") : "Active", // 0 = Active, 1 = Inactive
          statusValue: data.status !== undefined ? data.status : 0, // Ensure status exists
          createdDate: data.createdAt && data.createdAt.seconds
            ? new Date(data.createdAt.seconds * 1000).toLocaleDateString()
            : "N/A",
        };
      });

      console.log("Fetched Categories:", categoryList); // Debugging
      setCategoryTableData(categoryList);
    } catch (error) {
      console.error("Error fetching category data:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle category deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteDoc(doc(db, "categories", id));

        // Remove from UI
        setCategoryTableData((prevData) => prevData.filter((item) => item.id !== id));

        console.log(`Category with ID ${id} deleted successfully.`);
      } catch (error) {
        console.error("Error deleting category:", error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  // Handle category edit
  const handleEdit = (rowData) => {
    setEditData(rowData);
    setEditedName(rowData.name);
    setEditedStatus(rowData.statusValue); // Store number status (0 or 1)
    setIsPopupOpen(true);
  };

  // Close the edit popup
  const closePopup = () => {
    setIsPopupOpen(false);
    setEditData(null);
    setEditedName("");
    setEditedStatus(0);
  };

  // Handle saving an edited category
  const handleSave = async () => {
    if (editData) {
      try {
        const categoryRef = doc(db, "categories", editData.id);

        await updateDoc(categoryRef, {
          name: editedName,
          status: editedStatus, // Store as 0 or 1
        });

        // Update UI
        setCategoryTableData((prevData) =>
          prevData.map((item) =>
            item.id === editData.id
              ? {
                  ...item,
                  name: editedName,
                  status: editedStatus === 0 ? "Active" : "Inactive",
                  statusValue: editedStatus,
                }
              : item
          )
        );

        closePopup();
        console.log(`Updated category ${editData.id}: Name=${editedName}, Status=${editedStatus}`);
      } catch (error) {
        console.error("Error updating category:", error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  const columns = [
    {
      accessorKey: "id",
      header: () => "ID",
      cell: (info) => <span className="fw-bold">{info.getValue()}</span>,
    },
    {
      accessorKey: "name",
      header: () => "Category Name",
      meta: {
        className: "fw-bold text-dark",
      },
    },
    {
      accessorKey: "createdDate",
      header: () => "Created Date",
    },
    {
      accessorKey: "status",
      header: () => "Status",
      cell: (info) => (
        <span
          style={{
            backgroundColor: info.getValue() === "Active" ? "#28a745" : "#dc3545", 
            color: "white",
            padding: "3px 12px",
            borderRadius: "50px",
            display: "inline-block",
            fontSize: "12px",
          }}
        >
          {info.getValue()}
        </span>
      ),
    },
    {
      accessorKey: "actions",
      header: () => "Actions",
      cell: (info) => {
        const rowData = info.row.original;
        return (
          <div style={{ display: "flex", gap: "8px" }}>
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

  useEffect(() => {
    fetchCategoryData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : (
        <Table data={categoryTableData} columns={columns} />
      )}

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Edit Category</h3>
            <p>ID: {editData?.id}</p>
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
              <label htmlFor="status">Status:</label>
              <select
                id="status"
                value={editedStatus}
                onChange={(e) => setEditedStatus(Number(e.target.value))} // Convert to number
                className="form-control"
              >
                <option value={0}>Active</option>
                <option value={1}>Inactive</option>
              </select>
            </div>
            <div className="popup-actions" style={{ display: "flex", justifyContent: "flex-start", gap: "10px", marginTop: "15px" }}>
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

export default CategoryTable;
