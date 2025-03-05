import React, { useState, useEffect } from "react";
import { db } from "../../utilities/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const StockTable = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [bottleAssignments, setBottleAssignments] = useState({});

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

    const fetchBottleAssignments = async () => {
      try {
        const assignmentsSnapshot = await getDocs(collection(db, "BottleCaseAssignments"));
        const assignmentsData = {};
        assignmentsSnapshot.docs.forEach((doc) => {
          const data = doc.data();
          assignmentsData[data.optionName] = data.bottlesPerCase;
        });
        setBottleAssignments(assignmentsData);
      } catch (error) {
        console.error("Error fetching bottle assignments:", error);
      }
    };

    fetchProducts();
    fetchProductOptions();
    fetchBottleAssignments();
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

  const calculateCasesAndBottles = (totalQty, optionName) => {
    const bottlesPerCase = bottleAssignments[optionName] || 0;
    if (bottlesPerCase <= 0) return "N/A"; // If no assignment or invalid, return N/A

    const cases = Math.floor(totalQty / bottlesPerCase);
    const extraBottles = totalQty % bottlesPerCase;
    return `${cases}/${extraBottles}`;
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
            background: rgb(26, 137, 255);
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
            background-color: rgb(244, 255, 181) !important;
            color: black !important;
            font-weight: bold;
            text-align: left;
          }
          .cases-column {
            background-color: rgb(181, 255, 244) !important;
            color: black !important;
            font-weight: bold;
            text-align: left;
          }
          .final-total {
            background-color: rgb(98, 255, 98) !important;
            color: black !important;
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
              <th className="table-header cases-column">Cases/Bottles</th>
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

              const casesAndBottles = calculateCasesAndBottles(totalQty, option.name);

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
                  <td className="table-cell cases-column">
                    {casesAndBottles}
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
              <td className="final-total">
                {calculateCasesAndBottles(grandTotalQty, "grandTotal")}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockTable;