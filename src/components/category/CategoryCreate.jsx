import React, { useState, useEffect } from "react";

const CategoryCreate = () => {
  const [name, setName] = useState(""); // State for the category name
  const [loading, setLoading] = useState(false); // Loading state for form submission
  const [message, setMessage] = useState(""); // Message for success or error
  const [categories, setCategories] = useState([]); // State for all categories
  const [search, setSearch] = useState(""); // State for search input
  const [loadingCategories, setLoadingCategories] = useState(true); // Loading state for categories

  const organizationId = "1e7071f0-dacb-4a98-f264-08dcb066d923"; // Fixed organization ID

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("Access token is missing. Please log in.");
      }

      const response = await fetch(
        `https://localhost:7053/api/Product/get-category?Organization=${organizationId}`,
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
        throw new Error(`Failed to fetch categories. HTTP Status: ${response.status}. Response: ${errorText}`);
      }

      const data = await response.json();
      setCategories(data); // Store fetched categories
    } catch (error) {
      console.error("Error fetching categories:", error.message);
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("Access token is missing. Please log in.");
      }

      const response = await fetch("https://localhost:7053/api/Product/create-category", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          organization: organizationId,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create category. HTTP Status: ${response.status}. Response: ${errorText}`);
      }

      setMessage("Category created successfully!");
      setName(""); // Clear the name field after successful submission

      // Refresh the category list after successful creation
      await fetchCategories();
    } catch (error) {
      console.error("Error:", error.message);
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Filtered categories based on the search input
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="row">
      {/* Left side: Category creation form */}
      <div className="col-xl-8">
        <div className="card">
          <div className="card-header">
            <h5>Create Category</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="categoryName" className="form-label">
                  Category Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="categoryName"
                  placeholder="Enter category name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Creating..." : "Create Category"}
              </button>
            </form>
            {message && (
              <div className={`alert mt-3 ${message.startsWith("Error") ? "alert-danger" : "alert-success"}`}>
                {message}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right side: Category list with search */}
      <div className="col-xl-4">
        <div className="card">
          <div className="card-header">
            <h5>All Categories</h5>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {loadingCategories ? (
              <p>Loading categories...</p>
            ) : (
              <div style={{ maxHeight: "500px", overflowY: "auto" }}>
                    <ul className="list-group">
                        {filteredCategories.length > 0 ? (
                        filteredCategories.map((category) => (
                            <li key={category.id} className="list-group-item">
                            {category.name}
                            </li>
                        ))
                        ) : (
                        <p>No categories found.</p>
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

export default CategoryCreate;
