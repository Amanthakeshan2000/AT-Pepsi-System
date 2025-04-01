import React, { useState, useEffect } from "react";
import Select from "react-select";
import { db } from "../../utilities/firebaseConfig"; // Firebase Firestore
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";

const ProductCreate = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(""); // Kept for potential future use
  const [categoryId, setCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [optionName, setOptionName] = useState("");
  const [optionDBPrice, setOptionDBPrice] = useState("");
  const [optionRetailPrice, setOptionRetailPrice] = useState("");
  const [optionMargin, setOptionMargin] = useState("");
  const [optionStock, setOptionStock] = useState("");
  const [imageBase64, setImageBase64] = useState(""); // Store image as Base64
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Search filter
  const [loadingProducts, setLoadingProducts] = useState(false);

  const categoriesCollectionRef = collection(db, "categories"); // Firestore Categories
  const productsCollectionRef = collection(db, "Product"); // Firestore Products

  // Fetch categories from Firestore
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(categoriesCollectionRef);
        const categoryOptions = querySnapshot.docs.map((doc) => ({
          value: doc.id,
          label: doc.data().name,
        }));
        setCategories(categoryOptions);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
        setMessage(`Error: ${error.message}`);
      }
    };

    fetchCategories();
  }, []);

  // Fetch all products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);
        const querySnapshot = await getDocs(productsCollectionRef);
        const productList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setMessage(`Error: ${error.message}`);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  // Convert image to Base64
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImageBase64(reader.result); // Save Base64 string
      };
    }
  };

  // Add a new product option
  const addProductOption = () => {
    if (optionName && optionDBPrice && optionRetailPrice && optionStock) {
      setProductOptions([
        ...productOptions, 
        { 
          name: optionName, 
          dbPrice: parseFloat(optionDBPrice),
          retailPrice: parseFloat(optionRetailPrice),
          margin: parseFloat(optionRetailPrice) - parseFloat(optionDBPrice),
          stock: parseFloat(optionStock)
        }
      ]);
      setOptionName("");
      setOptionDBPrice("");
      setOptionRetailPrice("");
      setOptionMargin("");
      setOptionStock("");
    }
  };

  // Remove a product option
  const removeProductOption = (index) => {
    setProductOptions(productOptions.filter((_, i) => i !== index));
  };

  // Add handler for retail price changes
  const handleRetailPriceChange = (value) => {
    setOptionRetailPrice(value);
    if (optionDBPrice && value) {
      setOptionMargin((parseFloat(value) - parseFloat(optionDBPrice)).toFixed(2));
    }
  };

  // Add handler for DB price changes
  const handleDBPriceChange = (value) => {
    setOptionDBPrice(value);
    if (optionRetailPrice && value) {
      setOptionMargin((parseFloat(optionRetailPrice) - parseFloat(value)).toFixed(2));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (!name || !categoryId) {
        throw new Error("Product name and category are required.");
      }

      // Map productOptions to include all fields
      const mappedProductOptions = productOptions.map(option => ({
        name: option.name,
        dbPrice: option.dbPrice,
        retailPrice: option.retailPrice,
        margin: option.margin,
        stock: option.stock,
        price: option.retailPrice // Keep this for compatibility with existing code
      }));

      await addDoc(productsCollectionRef, {
        name,
        description,
        categoryId,
        createdAt: serverTimestamp(),
        productOptions: mappedProductOptions,
        imageBase64,
      });

      setMessage("Product created successfully!");
      setName("");
      setDescription("");
      setCategoryId(null);
      setImageBase64("");
      setProductOptions([]);
    } catch (error) {
      console.error("Error creating product:", error.message);
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="row">
      {/* Left Side: Product Creation */}
      <div className="col-xl-8">
        <div className="card">
          <div className="card-header">
            <h5>Create Product</h5>
          </div>
          <div className="card-body">
            {message && (
              <div className={`alert ${message.startsWith("Error") ? "alert-danger" : "alert-success"}`} role="alert">
                {message}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Product Name</label>
                <input type="text" className="form-control" placeholder="Enter product name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Product Description</label>
                <textarea className="form-control" placeholder="Enter product description (optional)" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>

              <div className="mb-3">
                <label className="form-label">Product Category</label>
                <Select options={categories} placeholder="Select a category" value={categories.find((category) => category.value === categoryId)} onChange={(selected) => setCategoryId(selected ? selected.value : null)} isSearchable required />
              </div>

              <div className="mb-3">
                <label className="form-label">Product Image</label>
                <input type="file" className="form-control" accept="image/*" onChange={handleImageUpload} />
                {imageBase64 && <img src={imageBase64} alt="Preview" style={{ maxWidth: "100px", maxHeight: "100px" }} />}
              </div>

              {/* Product Options */}
              <div className="mb-3">
                <label className="form-label">Product Options</label>
                <div className="row mb-2">
                  <div className="col-md-2">
                    <div className="mb-1">
                      <small className="text-muted">Option Name</small>
                    </div>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Option Name" 
                      value={optionName} 
                      onChange={(e) => setOptionName(e.target.value)} 
                    />
                  </div>
                  <div className="col-md-2">
                    <div className="mb-1">
                      <small className="text-muted">DB Price</small>
                    </div>
                    <input 
                      type="number" 
                      className="form-control" 
                      placeholder="DB Price" 
                      value={optionDBPrice} 
                      onChange={(e) => handleDBPriceChange(e.target.value)} 
                    />
                  </div>
                  <div className="col-md-2">
                    <div className="mb-1">
                      <small className="text-muted">Retail Price</small>
                    </div>
                    <input 
                      type="number" 
                      className="form-control" 
                      placeholder="Retail Price" 
                      value={optionRetailPrice} 
                      onChange={(e) => handleRetailPriceChange(e.target.value)} 
                    />
                  </div>
                  <div className="col-md-2">
                    <div className="mb-1">
                      <small className="text-muted">Margin</small>
                    </div>
                    <input 
                      type="number" 
                      className="form-control" 
                      placeholder="Margin" 
                      value={optionMargin} 
                      disabled 
                    />
                  </div>
                  <div className="col-md-2">
                    <div className="mb-1">
                      <small className="text-muted">Stock</small>
                    </div>
                    <input 
                      type="number" 
                      className="form-control" 
                      placeholder="Stock" 
                      value={optionStock} 
                      onChange={(e) => setOptionStock(e.target.value)} 
                    />
                  </div>
                  <div className="col-md-2 d-flex align-items-end">
                    <button type="button" className="btn btn-primary w-100" onClick={addProductOption}>Add Option</button>
                  </div>
                </div>
                <ul className="list-group mt-2">
                  {productOptions.map((option, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      <div className="d-flex gap-3">
                        <span><strong>Name:</strong> {option.name}</span>
                        <span><strong>DB Price:</strong> Rs.{option.dbPrice.toFixed(2)}</span>
                        <span><strong>Retail Price:</strong> Rs.{option.retailPrice.toFixed(2)}</span>
                        <span><strong>Margin:</strong> Rs.{option.margin.toFixed(2)}</span>
                        <span><strong>Stock:</strong> {option.stock}</span>
                      </div>
                      <button type="button" className="btn btn-sm btn-danger" onClick={() => removeProductOption(index)}>Remove</button>
                    </li>
                  ))}
                </ul>
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? "Creating..." : "Create Product"}</button>
            </form>
          </div>
        </div>
      </div>
      {/* Right Side: Product List with Search */}
      <div className="col-xl-4">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5>All Products</h5>
            <input type="text" className="form-control w-50" placeholder="Search Products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <div className="card-body">
            {loadingProducts ? (
              <p>Loading products...</p>
            ) : (
              <ul className="list-group">
                {filteredProducts.map((product) => (
                  <li key={product.id} className="list-group-item">
                    {/* <strong>{product.name}</strong> - {product.description} */}
                    <strong>{product.name}</strong>

                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;