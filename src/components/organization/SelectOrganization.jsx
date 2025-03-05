import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OrganizationChoose = () => {
  const [selectedOrganization, setSelectedOrganization] = useState({
    id: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [organizations, setOrganizations] = useState([]);
  const [loadingOrganizations, setLoadingOrganizations] = useState(true);
  const [leftSearch, setLeftSearch] = useState(""); // Separate state for input field

  const navigate = useNavigate();

  // Fetch organizations
  const fetchOrganizationByUserId = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Access token missing. Please log in.");

      const response = await fetch(
        "https://localhost:7053/api/Organization/GetOrganizationsByUserId",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch organizations: ${errorText}`);
      }

      const data = await response.json();
      setOrganizations(data);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoadingOrganizations(false);
    }
  };


  useEffect(() => {
    fetchOrganizationByUserId();
  }, []);

  // Handle organization selection
  const handleSelectOrganization = (organization) => {
    setSelectedOrganization({
      id: organization.id,
      name: organization.name,
    });

    setMessage("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (organizations.length > 0 && !selectedOrganization.id) {
        throw new Error("Please select an organization");
      }

      // If no organizations exist, navigate to creation page
      if (organizations.length === 0) {
        navigate("/settings/create-organization");
        return;
      }

      if (selectedOrganization.id) {
        // Add your API call here
        // await yourApiCall(selectedOrganization.id);      // await yourApiCall(selectedOrganization.id);
        
        // After successful API call, navigate to next step
        navigate("/dashboard"); // Change to your desired route
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Filter organizations based on search
  const filteredOrganizations = organizations.filter((org) =>
    org.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="row">
      {/* Left Side - Organization Selection */}
      <div className="col-xl-8">
        <div className="card">
          <div className="card-header">
            <h2>Select Organization</h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Select Organization</label>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedOrganization.name || leftSearch} // Changed to leftSearch
                    onChange={(e) => {
                      setLeftSearch(e.target.value); // Use separate state for input
                      const matchedOrg = organizations.find(
                        (org) =>
                          org.name.toLowerCase() ===
                          e.target.value.toLowerCase()
                      );
                      if (matchedOrg) {
                        handleSelectOrganization(matchedOrg);
                      } else {
                        setSelectedOrganization({ id: "", name: "" });
                      }
                    }}
                    placeholder="Type organization name..."
                    required
                    style={{
                      padding: "0.75rem 1rem",
                      border: "1px solid #ced4da",
                      borderRadius: "4px",
                    }}
                  />

                  {leftSearch &&
                    !selectedOrganization.id && ( // Changed to leftSearch
                      <div
                        style={{
                          position: "absolute",
                          width: "100%",
                          maxHeight: "200px",
                          overflowY: "auto",
                          zIndex: 1000,
                          backgroundColor: "white",
                          border: "1px solid #ced4da",
                          borderRadius: "4px",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                          marginTop: "2px",
                        }}
                      >
                        {organizations
                          .filter(
                            (org) =>
                              org.name
                                .toLowerCase()
                                .includes(leftSearch.toLowerCase()) // Changed to leftSearch
                          )
                          .map((org) => (
                            <div
                              key={org.id}
                              onClick={() => {
                                handleSelectOrganization(org);
                                setLeftSearch(""); // Reset leftSearch instead of search
                              }}
                              style={{
                                padding: "8px 16px",
                                cursor: "pointer",
                                backgroundColor: "#fff",
                                transition: "background-color 0.2s",
                                borderBottom: "1px solid #f8f9fa",
                                ":hover": {
                                  backgroundColor: "#f8f9fa",
                                },
                              }}
                            >
                              {org.name}
                            </div>
                          ))}
                        {organizations.filter((org) =>
                          org.name
                            .toLowerCase()
                            .includes(leftSearch.toLowerCase())
                        ).length === 0 && ( 
                          // Changed to leftSearch
                          <div
                            style={{ padding: "8px 16px", color: "#6c757d" }}
                          >
                            No matching organizations
                          </div>
                        )}
                      </div>
                    )}
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading
                  ? "Processing..."
                  : organizations.length === 0
                  ? "Create Organization"
                  : "Next"}
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

      {/* Right Side - Organization List */}
      <div className="col-xl-4">
        <div className="card">
          <div className="card-header">
            <h5>Your Organizations</h5>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search organizations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {loadingOrganizations ? (
              <p>Loading organizations...</p>
            ) : (
              <div style={{ maxHeight: "500px", overflowY: "auto" }}>
                <ul className="list-group">
                  {filteredOrganizations.map((org) => (
                    <li
                      key={org.id}
                      className={`list-group-item ${
                        selectedOrganization.id === org.id ? "active" : ""
                      }`}
                      onClick={() => handleSelectOrganization(org)}
                      style={{ cursor: "pointer" }}
                    >
                      {org.organization}
                    </li>
                  ))}
                  {filteredOrganizations.length === 0 && (
                    <li className="list-group-item">No organizations found</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationChoose;
