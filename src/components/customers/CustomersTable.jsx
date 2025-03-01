import React, { useState, useEffect } from "react";
import { db } from "../../utilities/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const StockTable = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productOptions, setProductOptions] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Product"));
        const productList = querySnapshot.docs.map((doc) => doc.data().name);
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchProductOptions = async () => {
      try {
        const optionsSnapshot = await getDocs(collection(db, "Product"));
        const optionsMap = new Map();

        optionsSnapshot.docs.forEach((doc) => {
          const productData = doc.data();
          if (productData.productOptions) {
            productData.productOptions.forEach((option) => {
              if (!optionsMap.has(option.name)) {
                optionsMap.set(option.name, { name: option.name, products: {} });
              }
              optionsMap.get(option.name).products[productData.name] = {
                price: option.price,
                qty: Number(option.qty), // Convert to number to prevent string concatenation
              };
            });
          }
        });
        setProductOptions(Array.from(optionsMap.values()));
      } catch (error) {
        console.error("Error fetching product options:", error);
      }
    };

    fetchProducts();
    fetchProductOptions();
  }, []);

  const toggleProductColumn = (product) => {
    setSelectedProducts((prev) =>
      prev.includes(product)
        ? prev.filter((p) => p !== product)
        : [...prev, product]
    );
  };

  const showAllProducts = () => {
    setSelectedProducts(products);
  };

  let grandTotalPrice = 0;
  let grandTotalQty = 0;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <style>
        {`
          .fw-bold {
            font-weight: bold;
          }
          .wrap-text {
            white-space: normal;
            word-wrap: break-word;
            word-break: break-word;
          }
          .popup-actions {
            display: flex;
            justify-content: flex-start;
            gap: 10px;
          }
          .product-card {
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s ease-in-out;
          }
          .product-card:hover {
            transform: scale(1.05);
          }
          .selected {
            background: #53a6ff;
            color: #fff;
          }
          .table-header {
            padding: 10px;
            border-bottom: 2px solid #000;
            background-color: #f1f1f1;
            text-align: left;
            font-weight: bold;
            color: black;
          }
          .table-cell {
            padding: 10px;
            border-bottom: 1px solid #ddd;
            text-align: left;
          }
          .total-column {
            background-color:rgb(110, 255, 144) !important;
            color: black !important;
            font-weight: bold;
            text-align: left;
          }
          .final-total {
            background-color:rgb(0, 187, 0) !important;
            color: white !important;
            font-weight: bold;
            text-align: left;
            padding: 12px;
            font-size: 14px;
          }
          .remove-btn {
            cursor: pointer;
            color: red;
            font-weight: bold;
          }
          .product-details {
            line-height: 1.6;
            margin: 5px 0;
          }
          .product-details span {
            font-weight: bold;
          }
        `}
      </style>

      <h2 style={{ marginBottom: "15px" }}>Stock</h2>

      {/* Product Selection Cards */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }}>
        {products.map((product) => (
          <div
            key={product}
            onClick={() => toggleProductColumn(product)}
            className={`product-card ${selectedProducts.includes(product) ? "selected" : ""}`}
          >
            {product} {selectedProducts.includes(product) && <span>✖</span>}
          </div>
        ))}
        <div
          onClick={showAllProducts}
          className="product-card"
          style={{ background: "black", color: "white", border: "1px solid black" }}
        >
          Show All
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#fff" }}>
          <thead>
            <tr>
              <th className="table-header">Product Option</th>
              {selectedProducts.map((product) => (
                <th key={product} className="table-header">
                  {product}{" "}
                  <span className="remove-btn" onClick={() => toggleProductColumn(product)}>✖</span>
                </th>
              ))}
              <th className="table-header total-column">Total</th>
            </tr>
          </thead>
          <tbody>
            {productOptions.map((option) => {
              let totalPrice = 0;
              let totalQty = 0;

              selectedProducts.forEach((product) => {
                if (option.products[product]) {
                  totalPrice += option.products[product].price * option.products[product].qty;
                  totalQty += Number(option.products[product].qty); // Ensure numeric addition
                }
              });

              // Accumulate Grand Totals
              grandTotalPrice += totalPrice;
              grandTotalQty += totalQty;

              return (
                <tr key={option.name}>
                  <td className="table-cell">{option.name}</td>
                  {selectedProducts.map((product) => (
                    <td key={`${option.name}-${product}`} className="table-cell">
                      {option.products[product] ? (
                        <div className="product-details">
                          • <span>Unit Price:</span> Rs.{option.products[product].price} <br />
                          • <span>Qty:</span> {option.products[product].qty.toLocaleString()} <br />
                          • <span>Total:</span> Rs.{(option.products[product].price * option.products[product].qty).toLocaleString()}
                        </div>
                      ) : (
                        <span style={{ fontStyle: "italic", color: "gray" }}>N/A</span>
                      )}
                    </td>
                  ))}
                  <td className="table-cell total-column">
                    • <span>Total Price:</span> Rs.{totalPrice.toLocaleString()} <br />
                    • <span>Total Qty:</span> {totalQty.toLocaleString()}
                  </td>
                </tr>
              );
            })}

            {/* Grand Total Row */}
            <tr>
              <td colSpan={selectedProducts.length + 1} className="final-total">Grand Total</td>
              <td className="final-total">
                • <span>Total Price:</span> Rs.{grandTotalPrice.toLocaleString()} <br />
                • <span>Total Qty:</span> {grandTotalQty.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockTable;
