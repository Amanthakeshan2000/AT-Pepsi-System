import React, { useState, useEffect } from "react";
import { db } from "../../utilities/firebaseConfig";
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";

const CategoryCreate = () => {
  const [name, setName] = useState(""); // State for category name
  const [loading, setLoading] = useState(false); // Loading state for form submission
  const [message, setMessage] = useState(""); // Message for success or error
  const [categories, setCategories] = useState([]); // State for all categories
  const [search, setSearch] = useState(""); // State for search input
  const [loadingCategories, setLoadingCategories] = useState(true); // Loading state for categories

  const categoriesCollectionRef = collection(db, "categories"); // Firestore collection reference

  // Fetch all categories from Firestore
  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const querySnapshot = await getDocs(categoriesCollectionRef);
      const categoryList = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          status: data.status === 1 ? "Inactive" : "Active", // 0 = Active, 1 = Inactive
          createdDate: data.createdAt ? new Date(data.createdAt.seconds * 1000).toLocaleDateString() : "N/A",
        };
      });
      setCategories(categoryList);
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

  // Handle form submission to create a new category
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (!name.trim()) throw new Error("Category name cannot be empty.");

      // Add category to Firestore with created date and status (0 = Active by default)
      await addDoc(categoriesCollectionRef, {
        name,
        status: 0, // Default status is Active (0)
        createdAt: serverTimestamp(), // Firebase Timestamp
      });

      setMessage("Category created successfully!");
      setName(""); // Clear input field after successful submission

      // Refresh the category list
      fetchCategories();
    } catch (error) {
      console.error("Error creating category:", error.message);
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
                        <strong>{category.name}</strong>
                        <br />
                        <small>Created: {category.createdDate}</small>
                        <br />
                        <span className={`badge ${category.status === "Active" ? "badge-success" : "badge-danger"}`}>
                          {category.status}
                        </span>
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
