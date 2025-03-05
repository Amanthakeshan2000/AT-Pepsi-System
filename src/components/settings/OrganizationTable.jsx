import React, { useState, useEffect } from "react";
import Table from "@/components/shared/table/Table";

const OrganizationTable = () => {
  const [organizationData, setOrganizationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [updateError, setUpdateError] = useState(null);

  // Editable fields
  const [editedName, setEditedName] = useState("");
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedAddress, setEditedAddress] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);

  // Fetch organization data
  const fetchOrganizations = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Access token is missing in localStorage!");

      const response = await fetch(
        "https://localhost:7053/api/Organization/GetAll-organizations",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error(`HTTP Status: ${response.status}`);

      const data = await response.json();
      setOrganizationData(data);
    } catch (error) {
      console.error("Error fetching organizations:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  // Open Edit Popup
  const handleEdit = (rowData) => {
    setEditData(rowData);
    setEditedName(rowData.name || "");
    setEditedTitle(rowData.title || "");
    setEditedDescription(rowData.description || "");
    setEditedEmail(rowData.email || "");
    setEditedAddress(rowData.address || "");
    setExistingImage(rowData.image || null); // Store existing image URL
    setSelectedImage(null);
    setUpdateError(null);
    setIsPopupOpen(true);
  };

  // Close Popup
  const closePopup = () => {
    setIsPopupOpen(false);
    setEditData(null);
    setEditedName("");
    setEditedTitle("");
    setEditedDescription("");
    setEditedEmail("");
    setEditedAddress("");
    setSelectedImage(null);
    setExistingImage(null);
    setUpdateError(null);
  };

  // Handle Save (PUT Request)
  const handleSave = async () => {
    if (!editData) return;

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Access token is missing in localStorage!");

      const params = new URLSearchParams({
        Name: editedName,
        Title: editedTitle,
        Description: editedDescription,
        Email: editedEmail,
        Address: editedAddress,
      });

      const updateUrl = `https://localhost:7053/api/Organization/${editData.id}?${params.toString()}`;

      const formData = new FormData();
      if (selectedImage) {
        formData.append("Image", selectedImage);
      }

      const response = await fetch(updateUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(`Failed to update organization: ${JSON.stringify(errorResponse)}`);
      }

      setOrganizationData((prevData) =>
        prevData.map((item) =>
          item.id === editData.id
            ? { ...item, name: editedName, title: editedTitle, description: editedDescription, email: editedEmail, address: editedAddress, image: selectedImage ? URL.createObjectURL(selectedImage) : existingImage }
            : item
        )
      );

      closePopup();
      alert("Organization updated successfully!");
    } catch (error) {
      console.error("Error updating organization:", error.message);
      setUpdateError(error.message);
    }
  };

  // Handle Delete Organization
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this organization? This action cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Access token is missing in localStorage!");

      const response = await fetch(`https://localhost:7053/api/Organization/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete organization. HTTP Status: ${response.status}`);
      }

      setOrganizationData((prevData) => prevData.filter((org) => org.id !== id));
      alert("Organization deleted successfully.");
    } catch (error) {
      console.error("Error deleting organization:", error.message);
      alert("Failed to delete organization. Please try again.");
    }
  };

  // Define table columns
  const columns = [
    {
      accessorKey: "image",
      header: "Image",
      cell: (info) => {
        const imageUrl = info.getValue();
        return imageUrl ? (
          <img src={imageUrl} alt="Organization" style={{ width: "50px", height: "50px", objectFit: "cover" }} />
        ) : (
          "No Image"
        );
      },
    },
    { accessorKey: "name", header: "Organization Name" },
    { accessorKey: "title", header: "Title" },
    {
      accessorKey: "description",
      header: "Description",
      cell: (info) => (
        <div
          style={{
            whiteSpace: "normal",
            wordWrap: "break-word",
            wordBreak: "break-word",
            maxWidth: "200px", // Adjust width as needed
          }}
        >
          {info.getValue()}
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: (info) => (
        <div
          style={{
            whiteSpace: "normal",
            wordWrap: "break-word",
            wordBreak: "break-word",
            maxWidth: "200px", // Adjust width as needed
          }}
        >
          {info.getValue()}
        </div>
      ),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: (info) => {
        const rowData = info.row.original;
        return (
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => handleEdit(rowData)} className="btn btn-primary btn-sm">Edit</button>
            <button onClick={() => handleDelete(rowData.id)} className="btn btn-danger btn-sm">Delete</button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      {loading ? <p>Loading data...</p> : error ? <p style={{ color: "red" }}>Error: {error}</p> : <Table data={organizationData} columns={columns} />}

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Edit Organization</h3>

            {updateError && <p style={{ color: "red" }}>Error: {updateError}</p>}

            <label>Name:</label>
            <input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} className="form-control" />

            <label>Title:</label>
            <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} className="form-control" />

            <label>Description:</label>
            <textarea value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} className="form-control"></textarea>

            <label>Email:</label>
            <input type="email" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} className="form-control" />

            <label>Address:</label>
            <input type="text" value={editedAddress} onChange={(e) => setEditedAddress(e.target.value)} className="form-control" />

            <label>Existing Image:</label>
            {existingImage && <img src={existingImage} alt="Organization" style={{ width: "100px", height: "100px", marginBottom: "10px" }} />}

            <label>New Image:</label>
            <input type="file" onChange={(e) => setSelectedImage(e.target.files[0])} className="form-control" />

            <div className="popup-actions" style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
              <button onClick={handleSave} className="btn btn-success">Save</button>
              <button onClick={closePopup} className="btn btn-secondary">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizationTable;
