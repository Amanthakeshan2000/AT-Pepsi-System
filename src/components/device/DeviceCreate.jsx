import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/DeviceCreate.css"; // Create this CSS file for custom styles

const DeviceCreate = () => {
  const [name, setName] = useState("");
  const [selectedOrganization, setSelectedOrganization] = useState({
    id: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [devices, setDevices] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [loadingOrganizations, setLoadingOrganizations] = useState(true);
  const [search, setSearch] = useState("");
  const [loadingDevices, setLoadingDevices] = useState(true);
  const [leftSearch, setLeftSearch] = useState("");

  const navigate = useNavigate();

  // Fetch all devices
  const fetchDevices = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Access token missing. Please log in.");

      const response = await fetch("https://localhost:7053/api/Device", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch devices: ${errorText}`);
      }

      setDevices(await response.json());
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoadingDevices(false);
    }
  };

  const fetchOrganizationByUserId = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        "https://localhost:7053/api/OrganizationUser/get-organization-withits-user",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await response.json();
      setOrganizations(data);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoadingOrganizations(false);
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000); // Hides the message after 3 seconds

      return () => clearTimeout(timer); // Cleanup function to prevent memory leaks
    }
  }, [message]);

  useEffect(() => {
    fetchDevices();
    fetchOrganizationByUserId();
  }, []);

  const handleSelectOrganization = (orgUser) => {
    const org = orgUser.organization;
    setSelectedOrganization({
      id: org.id,
      name: org.name,
    });
    setLeftSearch(org.name);
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Access token missing. Please log in.");

      if (organizations.length === 0) {
        throw new Error("No organizations found. Please create an organization first.");
      }

      if (!selectedOrganization.id) {
        throw new Error("Please select an organization.");
      }

      const response = await fetch(
        "https://localhost:7053/api/Device/create-device",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            status: 0,
            organizationId: selectedOrganization.id,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create device: ${errorText}`);
      }

      setMessage("Device created successfully!");
      setName("");
      await fetchDevices();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const filteredDevices = devices.filter((device) =>
    device.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredOrganizations = organizations.filter((org) =>
    org.organization.name.toLowerCase().includes(leftSearch.toLowerCase())
  );

  return (
    <div className="row">
      {/* Left side: Device creation form */}
      <div className="col-xl-8">
        <div className="card">
          <div className="card-header">
            <h5>Create Device</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="deviceName" className="form-label">
                  Device Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="deviceName"
                  placeholder="Enter device name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="organizationSelect" className="form-label">
                  Organization
                </label>
                <select
                  className="form-select"
                  id="organizationSelect"
                  value={selectedOrganization.id}
                  style={{
                    fontSize: '14px', 
                    padding: '12px 15px' 
                  }}
                  onChange={(e) => {
                    const selectedOrgId = e.target.value;
                    const selectedOrg = organizations.find(
                      (orgUser) => orgUser.organization.id === selectedOrgId
                    )?.organization;
                    setSelectedOrganization({
                      id: selectedOrgId,
                      name: selectedOrg?.name || "",
                    });
                  }}
                  required
                  disabled={loadingOrganizations}
                >
                  <option value="">Select an organization</option>
                  {loadingOrganizations ? (
                    <option disabled>Loading organizations...</option>
                  ) : (
                    organizations.map((orgUser) => (
                      <option key={orgUser.organization.id} 
                       value={orgUser.organization.id}
                       style={{ fontSize: '14px' }}
                      >
                        {orgUser.organization.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Creating..." : "Create Device"}
              </button>

            </form>

            {message && (
              <div
                className={`alert mt-3 ${
                  message.startsWith("Error") ? "alert-danger" : "alert-success"
                }`}
              >
                {message}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right side: Device list */}
      <div className="col-xl-4">
        <div className="card">
          <div className="card-header">
            <h5>All Devices</h5>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search devices..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {loadingDevices ? (
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="device-list-container">
                <ul className="list-group">
                  {filteredDevices.map((device) => (
                    <li
                      key={device.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      {device.name}
                      <span className="badge bg-primary rounded-pill">
                        {device.status ? "Inactive" : "Active"}
                      </span>
                    </li>
                  ))}
                </ul>
                {filteredDevices.length === 0 && (
                  <p className="text-muted mt-3">No devices found</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceCreate;
