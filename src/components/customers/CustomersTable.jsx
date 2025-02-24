import React, { memo, useEffect, useState } from "react";
import Table from "@/components/shared/table/Table";
import {
  FiAlertOctagon,
  FiArchive,
  FiClock,
  FiEdit3,
  FiEye,
  FiMoreHorizontal,
  FiMoreVertical,
  FiPrinter,
  FiSend,
  FiTrash2,
} from "react-icons/fi";
import Dropdown from "@/components/shared/Dropdown";
import SelectDropdown from "@/components/shared/SelectDropdown";
import Select from "react-select";
import { Link } from "react-router-dom"; 
import { set } from "date-fns";

const CustomersTable = () => {
  const [customersTableData, setCustomersTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [organizationId, setOrganizationId] = useState(
    localStorage.getItem("selectedOrganizationId")
  );
  const [editData, setEditData] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState(""); // State for editable customer
  const [editedEmail, setEditedEmail] = useState(""); // State for editable email
  const [editedPhone, setEditedPhone] = useState(""); // State for editable phone
  const [editedAddressLine1, setEditedAddressLine1] = useState(""); // State for editable AddressLine1
  const [editedAddressLine2, setEditedAddressLine2] = useState(""); // State for editable AddressLine2

  // Fetch customers based on the current OrganizationId
  const fetchCustomers = async (orgId) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Access token missing. Please log in.");
      if (!orgId) throw new Error("Organization ID not found in localStorage");

      const response = await fetch(
        `https://localhost:7053/api/Customer/GetAll-customers-in-organization?OrganizationId=${orgId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch customers");
      }

      const data = await response.json();
      setCustomersTableData(data); // Update the state with fetched data
    } catch (err) {
      setError(err.message); // Handle errors
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Listen for changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const newOrgId = localStorage.getItem("selectedOrganizationId");
      if (newOrgId !== organizationId) {
        setOrganizationId(newOrgId); // Update the state with the new OrganizationId
      }
    };

    // Polling for changes in localStorage (within the same tab)
    const interval = setInterval(handleStorageChange, 1000);

    // Listen for storage events (across tabs/windows)
    window.addEventListener("storage", handleStorageChange);

    return () => {
      clearInterval(interval); // Cleanup interval
      window.removeEventListener("storage", handleStorageChange); // Cleanup event listener
    };
  }, [organizationId]);

  // Fetch customers when the component mounts or when the OrganizationId changes
  useEffect(() => {
    if (organizationId) {
      setLoading(true); // Start loading
      fetchCustomers(organizationId); // Fetch customers for the current OrganizationId
    }
  }, [organizationId]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("Access token is missing in localStorage!");
        }

        const response = await fetch(
          `https://localhost:7053/api/Customer/${id}`,
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
            `Failed to delete customer. HTTP Status: ${response.status}, Response: ${errorText}`
          );
        }

        // Remove the deleted item from the table
        setCustomersTableData((prevData) =>
          prevData.filter((item) => item.id !== id)
        );

        console.log(`Item with ID ${id} deleted successfully.`);
      } catch (error) {
        console.error("Error deleting customer:", error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  const handleEdit = (rowData) => {
    setIsPopupOpen(true);
    setEditData(rowData);
    setEditedCustomer(rowData.name);
    setEditedEmail(rowData.email);
    setEditedPhone(rowData.phone);
    setEditedAddressLine1(rowData.addressLine1);
    setEditedAddressLine2(rowData.addressLine2);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setEditData(null);
    setEditedCustomer("");
    setEditedEmail("");
    setEditedPhone("");
    setEditedAddressLine1("");
    setEditedAddressLine2("");
  };

  const handleSave = async () => {
    if (editData) {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("Access token is missing in localStorage!");
        }

        const payload = {
            name: editedCustomer,
            email: editedEmail,
            phone: editedPhone,
            addressLine1: editedAddressLine1,
            addressLine2: editedAddressLine2,
        };

        const response = await fetch(
          `https://localhost:7053/api/Customer/${editData.id}`,
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

        setCustomersTableData((prevData) =>
            prevData.map((item) =>
              item.id === editData.id
                ? {
                    ...item,
                    name: editedCustomer,
                    email: editedEmail,
                    phone: editedPhone,
                    addressLine1: editedAddressLine1,
                    addressLine2: editedAddressLine2,
                  }
                : item
            )
        );

        closePopup();
        console.log(
          `Updated item with ID ${editData.id} to customer: ${editedCustomer} email: ${editedEmail} phone: ${editedPhone} addressLine1: ${editedAddressLine1} addressLine2: ${editedAddressLine2}`
        );
      } catch (error) {
        console.error("Error updating customer:", error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  // Define table columns
  const columns = [
    {
      accessorKey: "id",
      header: ({ table }) => {
        const checkboxRef = React.useRef(null);
        useEffect(() => {
          if (checkboxRef.current) {
            checkboxRef.current.indeterminate = table.getIsSomeRowsSelected();
          }
        }, [table.getIsSomeRowsSelected()]);
        return (
          <input
            type="checkbox"
            className="custom-table-checkbox"
            ref={checkboxRef}
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        );
      },
      cell: ({ row }) => (
        <input
          type="checkbox"
          className="custom-table-checkbox"
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
      meta: {
        headerClassName: "width-30",
      },
    },
    {
      accessorKey: "name",
      header: () => "Customer",
      cell: (info) => {
        const customerName = info.getValue();
        return (
          <a href="#" className="hstack gap-3">
            {/* Display avatar or initials */}
            <div className="text-white avatar-text user-avatar-text avatar-md">
              {customerName?.substring(0, 1)}
            </div>
            <div>
              <span className="text-truncate-1-line">{customerName}</span>
            </div>
          </a>
        );
      },
    },
    {
      accessorKey: "email",
      header: () => "Email",
      cell: (info) => {
        const email = info.getValue();
        return email ? (
          <a href={`mailto:${email}`}>{email}</a>
        ) : (
          <span>N/A</span>
        );
      },
    },
    {
      accessorKey: "phone",
      header: () => "Phone",
      cell: (info) => {
        const phone = info.getValue();
        return phone ? <a href={`tel:${phone}`}>{phone}</a> : <span>N/A</span>;
      },
    },
    {
      accessorKey: "addressLine1",
      header: () => "AddressLine1",
      cell: (info) => {
        const addressLine1 = info.getValue();
        return addressLine1 ? (
          <a href={`addressLine1:${addressLine1}`}>{addressLine1}</a>
        ) : (
          <span>N/A</span>
        );
      },
    },
    {
      accessorKey: "addressLine2",
      header: () => "AddressLine2",

      cell: (info) => {
        const addressLine2 = info.getValue();
        return addressLine2 ? (
          <a href={`addressLine2:${addressLine2}`}>{addressLine2}</a>
        ) : (
          <span>N/A</span>
        );
      },
    },
    {
        accessorKey: "actions",
        header: () => "Actions",
        cell: (info) => {
          const rowData = info.row.original;
          console.log(rowData.id);
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

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or message
  }

  if (error) {
    return <div>Error: {error}</div>; // Show an error message
  }
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
        <Table data={customersTableData} columns={columns} />
      )}

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Edit Customer</h3>
            <p>Customer Name: {editData?.name}</p>
            <div>
              <label htmlFor="customer">Customer Name:</label>
              <input
                id="customer"
                type="text"
                value={editedCustomer}
                onChange={(e) => setEditedCustomer(e.target.value)}
                className="form-control"
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
                className="form-control"
              />
            </div>
            <div>
              <label htmlFor="phone">Phone:</label>
              <input
                id="phone"
                type="text"
                value={editedPhone}
                onChange={(e) => setEditedPhone(e.target.value)}
                className="form-control"
              />
            </div>
            <div>
              <label htmlFor="addressline1">AddressLine1:</label>
              <input
                id="addressline1"
                type="text"
                value={editedAddressLine1}
                onChange={(e) => setEditedAddressLine1(e.target.value)}
                className="form-control"
              />
            </div>
            <div>
              <label htmlFor="addressline2">AddressLine2:</label>
              <input
                id="addressline2"
                type="text"
                value={editedAddressLine2}
                onChange={(e) => setEditedAddressLine2(e.target.value)}
                className="form-control"
              />
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
  )
};

export default CustomersTable;
