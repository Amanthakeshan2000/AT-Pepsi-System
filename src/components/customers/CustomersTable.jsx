import React, { useState, useEffect } from "react";
import { db } from "../../utilities/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import 'bootstrap-icons/font/bootstrap-icons.css';

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
          const productId = doc.id;
          if (productData.productOptions) {
            productData.productOptions.forEach((option) => {
              if (!optionsMap.has(option.name)) {
                optionsMap.set(option.name, { name: option.name, products: {} });
              }
              
              const dbPrice = option.dbPrice || 0;
              
              optionsMap.get(option.name).products[productData.name] = {
                productId: productId,
                dbPrice: dbPrice,
                price: option.retailPrice || option.price || 0,
                qty: Number(option.stock || option.qty || 0),
                minStock: Number(option.minStock || 0),
                isLowStock: (Number(option.stock || 0) < Number(option.minStock || 5))
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
    if (bottlesPerCase <= 0) return { cases: 0, bottles: 0 }; // If no assignment or invalid, return zeros

    const cases = Math.floor(totalQty / bottlesPerCase);
    const extraBottles = totalQty % bottlesPerCase;
    return { cases, bottles: extraBottles };
  };

  let grandTotalPrice = 0;
  let grandTotalQty = 0;
  let grandTotalCases = 0;
  let grandTotalBottles = 0;

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
            padding: 10px 15px;
            border: 1px solid #ddd;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease-in-out;
            min-width: 120px;
            text-align: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            background: linear-gradient(to bottom, #ffffff, #f5f5f5);
          }
          .product-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            border-color: #3498db;
          }
          .selected {
            background: linear-gradient(135deg, #3498db, #2980b9);
            color: #fff;
            border-color: #2980b9;
            box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
          }
          .table-container {
            width: 100%;
            height: calc(100vh - 250px);
            overflow: auto;
            margin: 20px 0;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            position: relative;
          }
          .table-wrapper {
            width: 100%;
            position: relative;
          }
          .table {
            width: 100%;
            min-width: 800px;
            border-collapse: separate;
            border-spacing: 0;
            background-color: #fff;
            table-layout: fixed;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            border-radius: 8px;
            overflow: hidden;
          }
          .table-header {
            padding: 14px 12px;
            border-bottom: none;
            background: linear-gradient(135deg, #3498db, #2c3e50);
            text-align: left;
            font-weight: bold;
            color: white;
            position: sticky;
            top: 0;
            z-index: 1;
            white-space: nowrap;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
            box-shadow: 0 3px 5px rgba(0,0,0,0.1);
            border-radius: 4px 4px 0 0;
            transition: all 0.3s ease;
          }
          .table-header:hover {
            background: linear-gradient(135deg, #2980b9, #1c2833);
          }
          .product-option-header {
            width: 200px;
            background: linear-gradient(135deg, #2c3e50, #1a252f);
            border-radius: 4px 0 0 0;
          }
          .total-column-header {
            background: linear-gradient(135deg, #f1c40f, #f39c12);
            color: #333 !important;
            text-shadow: none;
          }
          .cases-column-header {
            background: linear-gradient(135deg, #1abc9c, #16a085);
            border-radius: 0 4px 0 0;
          }
          .table-cell {
            padding: 12px;
            border-bottom: 1px solid #ddd;
            text-align: left;
            min-width: 150px;
            max-width: 200px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .product-option-cell {
            width: 200px;
            background-color: #fff;
          }
          .total-column {
            background-color: rgb(244, 255, 181) !important;
            color: black !important;
            font-weight: bold;
            text-align: left;
            width: 180px;
          }
          .cases-column {
            background-color: rgb(181, 255, 244) !important;
            color: black !important;
            font-weight: bold;
            text-align: left;
            width: 120px;
          }
          .product-column {
            width: 200px;
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
            margin-left: 8px;
          }
          .product-details {
            line-height: 1.6;
            margin: 5px 0;
            white-space: normal;
          }
          .product-details span {
            font-weight: bold;
          }
          .product-selection-container {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            margin-bottom: 20px;
            padding: 15px;
            background-color: #f8f9fa;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            border: 1px solid #e9ecef;
          }
          .show-all-btn {
            background: linear-gradient(135deg, #2c3e50, #1a252f);
            color: white;
            border: none;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
          }
          .show-all-btn:hover {
            background: linear-gradient(135deg, #1a252f, #0d1318);
            transform: translateY(-2px);
            box-shadow: 0 6px 8px rgba(0,0,0,0.15);
          }
          @media (max-width: 768px) {
            .product-card {
              min-width: 100px;
              font-size: 14px;
            }
            .table-cell {
              padding: 8px;
              font-size: 14px;
            }
            .product-details {
              font-size: 13px;
            }
          }
        `}
      </style>

      <h2 style={{ marginBottom: "15px", color: "#2c3e50", textTransform: "uppercase", letterSpacing: "1px", borderBottom: "3px solid #3498db", paddingBottom: "10px", fontSize: "28px" }}>
        <i className="bi bi-clipboard-data" style={{ marginRight: "10px" }}></i>
        Stock Inventory
      </h2>

      {/* Product Selection Cards */}
      <div className="product-selection-container">
        <div style={{ width: '100%', marginBottom: '10px', fontSize: '16px', fontWeight: 'bold', color: '#2c3e50' }}>
          <i className="bi bi-filter-square" style={{ marginRight: '8px' }}></i>
          Select Products to Display
        </div>
        {products.map((product) => (
          <div
            key={product}
            onClick={() => toggleProductColumn(product)}
            className={`product-card ${selectedProducts.includes(product) ? "selected" : ""}`}
          >
            {selectedProducts.includes(product) ? (
              <><i className="bi bi-check-circle-fill" style={{ marginRight: '5px' }}></i> {product}</>
            ) : (
              product
            )}
          </div>
        ))}
        <div
          onClick={showAllProducts}
          className="product-card show-all-btn"
        >
          <i className="bi bi-grid-3x3-gap-fill" style={{ marginRight: '5px' }}></i> Show All
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th className="table-header product-option-header">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <i className="bi bi-box-seam" style={{ marginRight: '8px' }}></i>
                    Product Option
                  </div>
                </th>
                {selectedProducts.map((product) => (
                  <th key={product} className="table-header product-column">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>{product}</span>
                      <span className="remove-btn" onClick={() => toggleProductColumn(product)}>✖</span>
                    </div>
                  </th>
                ))}
                <th className="table-header total-column total-column-header">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <i className="bi bi-calculator" style={{ marginRight: '8px' }}></i>
                    Total
                  </div>
                </th>
                <th className="table-header cases-column cases-column-header">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <i className="bi bi-archive" style={{ marginRight: '8px' }}></i>
                    Cases/Bottles
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {productOptions.map((option) => {
                let totalPrice = 0;
                let totalQty = 0;
                let totalCases = 0;
                let totalBottles = 0;

                selectedProducts.forEach((product) => {
                  if (option.products[product]) {
                    totalPrice += option.products[product].dbPrice * option.products[product].qty;
                    totalQty += Number(option.products[product].qty);
                  }
                });

                const casesAndBottles = calculateCasesAndBottles(totalQty, option.name);
                totalCases = casesAndBottles.cases;
                totalBottles = casesAndBottles.bottles;

                grandTotalPrice += totalPrice;
                grandTotalQty += totalQty;
                grandTotalCases += totalCases;
                grandTotalBottles += totalBottles;

                return (
                  <tr key={option.name}>
                    <td className="table-cell product-option-cell">{option.name}</td>
                    {selectedProducts.map((product) => (
                      <td key={`${option.name}-${product}`} className="table-cell product-column">
                        {option.products[product] ? (
                          <div className="product-details">
                            • <span>Unit Price (DB):</span> <span style={{ color: "#0d6efd", fontWeight: "bold" }}>Rs.{option.products[product].dbPrice.toLocaleString()}</span> <br />
                            • <span style={{ 
                                color: option.products[product].isLowStock ? "#dc3545" : "#198754",
                                fontWeight: "bold" 
                              }}>
                                Current Stock:
                              </span> {option.products[product].qty.toLocaleString()} <br />
                            • <span>Total:</span> Rs.{(option.products[product].dbPrice * option.products[product].qty).toLocaleString()}
                          </div>
                        ) : (
                          <span style={{ fontStyle: "italic", color: "gray" }}>N/A</span>
                        )}
                      </td>
                    ))}
                    <td className="table-cell total-column">
                      • <span>Total Price:</span> Rs.{totalPrice.toLocaleString()} <br />
                      • <span>Total Stock:</span> {totalQty.toLocaleString()}
                    </td>
                    <td className="table-cell cases-column">
                      <div>
                        • <span>Cases:</span> {totalCases.toLocaleString()} <br />
                        • <span>Bottles:</span> {totalBottles.toLocaleString()}
                      </div>
                    </td>
                  </tr>
                );
              })}

              {/* Grand Total Row */}
              <tr>
                <td colSpan={selectedProducts.length + 1} className="final-total">Grand Total</td>
                <td className="final-total">
                  • <span>Total Price:</span> Rs.{grandTotalPrice.toLocaleString()} <br />
                  • <span>Total Stock:</span> {grandTotalQty.toLocaleString()}
                </td>
                <td className="final-total">
                  <div>
                    • <span>Total Cases:</span> {grandTotalCases.toLocaleString()} <br />
                    • <span>Total Bottles:</span> {grandTotalBottles.toLocaleString()}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StockTable;