import React, { useState, useEffect } from "react";

const OrganizationMenu = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrganizationUser = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        "https://localhost:7053/api/OrganizationUser/get-organization-withits-user",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await response.json();
      setOrganizations(data);

      // Automatically select the first organization if available
      if (data.length > 0) {
        const firstOrg = data[0].organization;
        localStorage.setItem("selectedOrganizationId", firstOrg.id);
        localStorage.setItem("selectedOrganizationName", firstOrg.name);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizationUser();
  }, []);

  const handleOrganizationChange = (e) => {
    const selectedOrgId = e.target.value;

    if (selectedOrgId) {
      // Find the selected organization
      const selectedOrg = organizations.find(
        (org) => org.organization.id === selectedOrgId
      );

      if (selectedOrg) {
        // Save to localStorage
        localStorage.setItem("selectedOrganizationId", selectedOrgId);
        localStorage.setItem(
          "selectedOrganizationName",
          selectedOrg.organization.name
        );
      }
    } else {
      // Clear storage if no organization is selected
      localStorage.removeItem("selectedOrganizationId");
      localStorage.removeItem("selectedOrganizationName");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full max-w-md">
        <div className="relative">
          <select
            id="organizationSelect"
            onChange={handleOrganizationChange}
            className="w-full px-3 py-2 text-gray-900 bg-white dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            required
          >
            {/* Render only the organizations without a placeholder */}
            {organizations.map((org) => (
              <option key={org.organization.id} value={org.organization.id}>
                {org.organization.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default OrganizationMenu;