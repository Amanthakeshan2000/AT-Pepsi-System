import React, { useState, useEffect } from "react";
import Select from "react-select";

const ProductCreate = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [optionName, setOptionName] = useState("");
  const [optionPrice, setOptionPrice] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const organizationId = "1e7071f0-dacb-4a98-f264-08dcb066d923";

  // Utility function to safely parse JSON responses
  const safeJsonParse = async (response) => {
    const text = await response.text();
    try {
      return text ? JSON.parse(text) : [];
    } catch (error) {
      console.error("Failed to parse JSON. Raw response:", text);
      throw new Error("Invalid JSON response received.");
    }
  };

  // Fetch categories from the API
  useEffect(() => {
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
          throw new Error(`Failed to fetch categories. HTTP Status: ${response.status}`);
        }

        const data = await safeJsonParse(response);
        const categoryOptions = data.map((category) => ({
          value: category.id,
          label: category.name,
        }));

        setCategories(categoryOptions);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
        setMessage(`Error: ${error.message}`);
      }
    };

    fetchCategories();
  }, []);

  // Fetch all products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          throw new Error("Access token is missing. Please log in.");
        }

        setLoadingProducts(true);
        const response = await fetch(
          `https://localhost:7053/api/Product/get-productlist?Organization=${organizationId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch products. HTTP Status: ${response.status}`);
        }

        const data = await safeJsonParse(response);
        console.log("Fetched Products:", data); // Debugging products
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setMessage(`Error: ${error.message}`);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  // Map CategoryId to Category Name
  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.value === categoryId);
    return category ? category.label : "Unknown Category";
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Add a new product option
  const addProductOption = () => {
    if (optionName && optionPrice) {
      setProductOptions([...productOptions, { name: optionName, price: parseFloat(optionPrice) }]);
      setOptionName("");
      setOptionPrice("");
    }
  };

  // Remove a product option
  const removeProductOption = (index) => {
    setProductOptions(productOptions.filter((_, i) => i !== index));
  };

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

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description.trim());
    formData.append("price", parseFloat(price)); // Ensure price is sent as a number
    formData.append("categoryId", categoryId);
    formData.append("organizationId", organizationId);

    // Append each product option individually as expected by the backend
    productOptions.forEach((option, index) => {
      formData.append(`productOptions[${index}][name]`, option.name);
      formData.append(`productOptions[${index}][price]`, option.price);
    });

    if (image) {
      formData.append("image", image);
    }

    const response = await fetch("https://localhost:7053/api/Product/create-product", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create product. HTTP Status: ${response.status}. Response: ${errorText}`);
    }

    setMessage("Product created successfully!");
    setName("");
    setDescription("");
    setPrice("");
    setCategoryId(null);
    setImage(null);
    setProductOptions([]);
  } catch (error) {
    console.error("Error creating product:", error.message);
    setMessage(`Error: ${error.message}`);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="row">
      {/* Left Side: Product Creation */}
      <div className="col-xl-8">
        <div className="card">
          <div className="card-header">
            <h5>Product Create</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Product Name */}
              <div className="mb-3">
                <label htmlFor="productName" className="form-label">
                  Product Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="productName"
                  placeholder="Enter product name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Product Description */}
              <div className="mb-3">
                <label htmlFor="productDescription" className="form-label">
                  Product Description
                </label>
                <textarea
                  className="form-control"
                  id="productDescription"
                  placeholder="Enter product description"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              {/* Product Price */}
              <div className="mb-3">
                <label htmlFor="productPrice" className="form-label">
                  Product Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="productPrice"
                  placeholder="Enter product price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              {/* Product Category */}
              <div className="mb-3">
                <label htmlFor="productCategory" className="form-label">
                  Product Category
                </label>
                <Select
                  id="productCategory"
                  options={categories}
                  placeholder="Select a category"
                  value={categories.find((category) => category.value === categoryId)}
                  onChange={(selected) => setCategoryId(selected ? selected.value : null)}
                  isSearchable
                  required
                />
              </div>

              {/* Product Image */}
              <div className="mb-3">
                <label htmlFor="productImage" className="form-label">
                  Product Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="productImage"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {image && (
                  <div className="mt-2">
                    <p>Selected File: {image.name}</p>
                  </div>
                )}
              </div>

              {/* Product Options */}
              <div className="mb-3">
                <label className="form-label">Product Options</label>
                <div className="d-flex gap-2 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Option Name"
                    value={optionName}
                    onChange={(e) => setOptionName(e.target.value)}
                  />
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Option Price"
                    value={optionPrice}
                    onChange={(e) => setOptionPrice(e.target.value)}
                  />
                  <button type="button" className="btn btn-primary" onClick={addProductOption}>
                    Add
                  </button>
                </div>
                <ul className="list-group">
                  {productOptions.map((option, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      {option.name} - ${option.price.toFixed(2)}
                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        onClick={() => removeProductOption(index)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Creating..." : "Create Product"}
              </button>
            </form>

            {/* Success/Error Message */}
            {message && (
              <div className={`alert mt-3 ${message.startsWith("Error") ? "alert-danger" : "alert-success"}`}>
                {message}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Side: Product List */}
      <div className="col-xl-4">
        <div className="card">
          <div className="card-header">
            <h5>All Products</h5>
          </div>
          <div className="card-body">
            {loadingProducts ? (
              <p>Loading products...</p>
            ) : products.length > 0 ? (
              <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                <ul className="list-group">
                  {products.map((product) => (
                    <li key={product.id} className="list-group-item">
                      {product.name} - <small>{getCategoryName(product.categoryId)}</small>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
