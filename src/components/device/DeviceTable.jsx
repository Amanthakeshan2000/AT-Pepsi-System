import React, { useState, useEffect } from "react";
import Table from "@/components/shared/table/Table";

const DeviceTable = () => {
  const [deviceTableData, setDeviceTableData] = useState([]);
  const [organizations, setOrganizations] = useState([]); // Organizations
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editedName, setEditedName] = useState(""); // State for editable name
  const [editedStatus, setEditedStatus] = useState(""); // State for editable status
  const [editedOrganizationId, setEditedOrganizationId] = useState("");  // State for editable Organization

  const fetchDeviceData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      console.log("Access Token:", token);
      if (!token) {
        throw new Error("Access token is missing in localStorage!");
      }

      const response = await fetch(
        //"https://localhost:7053/api/Product/get-category?Organization=1e7071f0-dacb-4a98-f264-08dcb066d923",
        "https://localhost:7053/api/Device/get-device-with-organizations",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch data. HTTP Status: ${response.status}, Response: ${errorText}`
        );
      }

      const organizationResponse = await fetch(
        //"https://localhost:7053/api/Product/get-category?Organization=1e7071f0-dacb-4a98-f264-08dcb066d923",
        "https://localhost:7053/api/Organization/GetAll-organizations",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!organizationResponse.ok) {
        const errorText = await organizationResponse.text();
        throw new Error(
          `Failed to fetch data. HTTP Status: ${organizationResponse.status}, Response: ${errorText}`
        );
      }

      const data = await response.json();
      const formattedData = data.map((item) => ({
        id: item.id,
        name: item.name,
        organizationId : item.organizationId,
        organization: item.organization?.name || "Unknown Organization",
        date: item.createDate
          ? new Date(item.createDate).toLocaleDateString()
          : "N/A",
        status: {
          color: item.status === 0 ? "badge-success" : "badge-danger",
          content: item.status === 0 ? "Active" : "Inactive",
        },
      }));

      const organizationData = await organizationResponse.json();
      const orgs = organizationData.reduce((acc, item) => {
        const orgExists = acc.some(org => org.id === item.organizationId);
        if (!orgExists) {
          acc.push({
            id: item.id,
            name: item.name || "Unknown Organization",
          });
        }
        return acc;
      }, []);

      setOrganizations(orgs); 
      setDeviceTableData(formattedData);
    } catch (error) {
      console.error("Error fetching device data:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this device?")) {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("Access token is missing in localStorage!");
        }
  
        const response = await fetch(
          //`https://localhost:7053/api/Product/delete-category?Id=${id}`, // Dynamic endpoint with query parameter
          `https://localhost:7053/api/Device/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
  
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Failed to delete data. HTTP Status: ${response.status}, Response: ${errorText}`
          );
        }
  
        // Remove the deleted item from the table
        setDeviceTableData((prevData) =>
          prevData.filter((item) => item.id !== id)
        );
  
        console.log(`Item with ID ${id} deleted successfully.`);
      } catch (error) {
        console.error("Error deleting device:", error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };
  
  const handleEdit = (rowData) => {
    setEditData(rowData);
    setEditedName(rowData.name); // Set editable name
    setEditedStatus(rowData.status.content); // Set editable status
    setEditedOrganizationId(rowData.organizationId); 
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setEditData(null);
    setEditedName("");
    setEditedStatus("");
    setEditedOrganizationId("");
  };

  const handleSave = async () => {
    if (editData) {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("Access token is missing in localStorage!");
        }

        const updatedStatus = editedStatus === "Active" ? 0 : 1;
        const payload = {
          name: editedName,
          status: updatedStatus,
          organizationId: editedOrganizationId
        };

        const response = await fetch( 
          `https://localhost:7053/api/Device/update-with-org/${editData.id}`,
          {
            method: "PUT", // Corrected method from POST to PUT
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Failed to update data. HTTP Status: ${response.status}, Response: ${errorText}`
          );
        }

        setDeviceTableData((prevData) =>
          prevData.map((item) =>
            item.id === editData.id
              ? {
                  ...item,
                  name: editedName,
                  status: {
                    color: updatedStatus === 0 ? "badge-success" : "badge-danger",
                    content: editedStatus,
                  },
                  organization: organizations.find((org) => org.id === editedOrganizationId)?.name || "Unknown Organization",
                }
              : item
          )
        );

        closePopup();
        console.log(
          `Updated item with ID ${editData.id} to name: ${editedName} to status: ${editedStatus} and organizationId: ${editedOrganizationId}`
        );
      } catch (error) {
        console.error("Error updating device:", error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  const columns = [
//     {
//       accessorKey: "id",
//       header: () => "ID",
//       cell: (info) => (
//         <a href="#" className="fw-bold">
//           {info.getValue()}
//         </a>
//       ),
//     },
    {
      accessorKey: "name",
      header: () => "Name",
      meta: {
        className: "fw-bold text-dark",
      },
    },
    {
      accessorKey: "organization",
      header: () => "Organization",
      meta: {
        className: "fw-bold text-dark",
      },
    },
    {
      accessorKey: "date",
      header: () => "Date",
    },
    {
      accessorKey: "status",
      header: () => "Status",
      cell: (info) => (
        <div className={`badge ${info.getValue().color}`}>
          {info.getValue().content}
        </div>
      ),
    },
    {
      accessorKey: "actions",
      header: () => "Actions",
      cell: (info) => {
        const rowData = info.row.original;
        console.log(rowData);
        return (
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => handleEdit(rowData)}
              className="btn btn-primary btn-sm"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(rowData.id)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    fetchDeviceData();
  }, []);

  return (
    <div>
      <style>
        {`
          .badge {
            display: inline-block;
            padding: 0.4em 0.8em;
            font-size: 0.875rem;
            font-weight: bold;
            border-radius: 0.25rem;
            color: #fff;
            text-align: center;
          }

          .badge-success {
            background-color: rgba(0, 255, 60, 0.82);
          }

          .badge-danger {
            background-color: #dc3545;
          }

          .popup-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 999;
          }

          .popup-content {
            background: white;
            padding: 20px;
            border-radius: 8px;
            max-width: 400px;
            width: 100%;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }

          .popup-actions {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
            margin-top: 15px;
          }
        `}
      </style>
      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : (
        <Table data={deviceTableData} columns={columns} />
      )}

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Edit Device</h3>
            <p>Device Name: {editData?.name}</p>
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
                onChange={(e) => setEditedStatus(e.target.value)}
                className="form-control"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div style={{ marginTop: "15px" }}>
              <label htmlFor="organization">Organization:</label>
              <select
                id="organization"
                value={editedOrganizationId}
                onChange={(e) => setEditedOrganizationId(e.target.value)}
                className="form-control"
              >
                {organizations.map((org) => (
                  <option key={org.id} value={org.id}>
                    {org.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="popup-actions">
              <button
                onClick={handleSave}
                className="btn btn-success"
              >
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

export default DeviceTable;
