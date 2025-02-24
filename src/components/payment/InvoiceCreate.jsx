import React, { useState, useEffect } from "react";
import {
  FiDollarSign,
  FiDownload,
  FiEdit,
  FiFacebook,
  FiGithub,
  FiInstagram,
  FiLinkedin,
  FiPrinter,
  FiSend,
  FiTwitter,
  FiPlusCircle,
  FiUser,
  FiTrash,
} from "react-icons/fi";
import Dropdown from "@/components/shared/Dropdown";
import { AutoComplete, DatePicker } from "antd";
import CustomerCreateModal from "../shared/CustomerCreateModal";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export const invoiceTempletOptions = [
  { icon: "", label: "Default" },
  { icon: "", label: "Classic" },
  { icon: "", label: "Simple" },
  { icon: "", label: "Modern" },
  { icon: "", label: "Untimate" },
  { icon: "", label: "Essential" },
  { type: "divider" },
  { icon: "", label: "Create Template" },
  { icon: "", label: "Delete Template" },
];

const InvoiceCreate = () => {
  const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);
  const [rows, setRows] = useState([
    { id: 1, qty: 0, rate: 0, description: "", productId: null },
  ]); // Initial row with a unique ID
  const [products, setProducts] = useState([]);

  const [customers, setCustomers] = useState([]); // State for customers
  const [customerSearchValue, setCustomerSearchValue] = useState(""); // State for customer search input
  const [selectedCustomer, setSelectedCustomer] = useState(null); // Selected customer object
  const [isModalOpen, setIsModalOpen] = useState(false); // Customer create Modal
  const [organizationId, setOrganizationId] = useState(localStorage.getItem("selectedOrganizationId"));

  const [totals, setTotals] = useState({
    subTotalPrice: 0,
    discount: 0,
    discountedPrice: 0,
    taxAmount: 0,
    grandTotal: 0,
  }); // Total values
  const [invoiceNumber, setInvoiceNumber] = useState(""); // State for invoice number
  const [dueDate, setDueDate] = useState(null); // State for payment due date
  const [discountInput, setDiscountInput] = useState(""); // State for discount input field
  const [taxPercentage, setTaxPercentage] = useState(""); // State for tax input field

  const navigate = useNavigate();

  // Add all Invoice data
  const handleSaveInvoice = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const organizationId = localStorage.getItem("selectedOrganizationId");

      if (!token) {
        throw new Error("Access token is missing in localStorage!");
      }

      if (!organizationId) {
        throw new Error("Organization ID is missing in localStorage!");
      }

      // Prepare the invoice data
      const invoiceData = {
        invoiceNumber: invoiceNumber,
        type: 0, // Replace with actual type if needed
        paymentType: 0, // Replace with actual payment type if needed
        status: 0, // Replace with actual status if needed
        dueDate: dueDate,
        noOfItems: rows.length,
        total: totals.grandTotal,
        discount: totals.discount,
        tax: totals.taxAmount,
        subTotal: totals.subTotalPrice,
        serviceCharge: 0, // Replace with actual service charge if needed
        paidAmount: 0, // Replace with actual paid amount if needed
        customerID: selectedCustomer ? selectedCustomer.key : null, // Use selected customer's ID
        organizationId: organizationId,
        details: rows.map((row) => ({
          productId: row.productId,
          qty: row.qty,
          price: row.rate,
          amount: row.qty * row.rate,
          status: 0, // Replace with actual status if needed
        })),
      };

      // Send the data to the backend API
      const response = await fetch(
        "https://localhost:7053/api/Invoice/create-invoice-new",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(invoiceData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to save invoice. HTTP Status: ${response.status}, Response: ${errorText}`
        );
      }

      const data = await response.json();
      console.log("Invoice saved successfully:", data);
      alert("Invoice saved successfully");
    } catch (error) {
      console.error("Error saving invoice:", error.message);
    }
  };

  // Generate Invoice Number
  const generateInvoiceNumber = () => {
    const prefix = "#INV";
    const timestamp = new Date().getTime();
    const numericPart = timestamp % 10000; // Extract last 4 digits for brevity
    return `${prefix}${numericPart}`;
  };

  // Fetch products data
  
  const fetchProductsData = async (orgId) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Access token is missing in localStorage!");
      if (!orgId) throw new Error("Organization ID is missing in localStorage!");

      const response = await fetch(
        `https://localhost:7053/api/Product/get-productlist?Organization=${orgId}`,
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
        throw new Error(`Failed to fetch data. HTTP Status: ${response.status}, Response: ${errorText}`);
      }

      const data = await response.json();
      setProducts(
        data.map((product) => ({
          key: product.id,
          value: product.name,
          description: product.description,
        }))
      );
    } catch (error) {
      console.error("Error fetching products data:", error.message);
    }
  };

  // Fetch when component mounts & when organizationId changes
  useEffect(() => {
    if (organizationId) {
      fetchProductsData(organizationId);
    }
  }, [organizationId]);

  // Listen for localStorage changes (for real-time updates)
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "selectedOrganizationId") {
        setOrganizationId(event.newValue); // Update state to trigger re-fetch
      }
    };

  }, []);


  

  // Fetch customers data
  const fetchCustomersData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      console.log("Access Token:", token);

      if (!token) {
        throw new Error("Access token is missing in localStorage!");
      }

      const response = await fetch(
        "https://localhost:7053/api/Customer/GetAll-customers-in-organization?OrganizationId=1e7071f0-dacb-4a98-f264-08dcb066d923",
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
        throw new Error(
          `Failed to fetch data. HTTP Status: ${response.status}, Response: ${errorText}`
        );
      }

      const data = await response.json();
      const formattedCustomers = data.map((customer) => ({
        key: customer.id,
        value: customer.name, // Required for AutoComplete
        label: customer.name, // Display name
        address: `${customer.addressLine1}, ${customer.addressLine2 || ""}`, // Full address
        city: customer.city,
        country: customer.country,
        mobile: customer.mobile,
      }));
      setCustomers(formattedCustomers);
    } catch (error) {
      console.error("Error fetching customers data:", error.message);
    }
  };

  useEffect(() => {
    fetchProductsData();
    fetchCustomersData();

    const generatedInvoiceNumber = generateInvoiceNumber();
    setInvoiceNumber(generatedInvoiceNumber);
  }, []);

  useEffect(() => {
    const newTotals = calculateTotals(rows, discountInput, taxPercentage);
    setTotals(newTotals);
  }, [rows, discountInput, taxPercentage]);

  // Card click
  const handleCardClick = () => {
    setIsSearchInputVisible(true);
  };

  // Create a new row
  const handleAddRow = () => {
    const newRow = {
      id: rows.length + 1,
      qty: 0,
      rate: 0,
    }; // Create a new row with a unique ID
    setRows([...rows, newRow]); // Add the new row to the state
  };

  const handleDeleteRow = (id) => () => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  // Handle customer selection
  const handleCustomerSelect = (value) => {
    const selected = customers.find((customer) => customer.value === value);
    setCustomerSearchValue(value);
    setSelectedCustomer(selected || null);
    setIsSearchInputVisible(false);
  };

  // Calculate subTotalPrice, discount, discountedPrice, taxAmount and grandTotal
  const calculateTotals = (rows, discountValue, taxRate) => {
    const subTotalPrice = rows.reduce(
      (sum, row) => sum + row.qty * row.rate,
      0
    );
    const discount = parseFloat(discountValue) || 0;
    const discountedPrice = subTotalPrice - discount;
    const taxAmount = Math.max(discountedPrice * (taxRate / 100), 0);
    const grandTotal = Math.max(discountedPrice + taxAmount, 0);

    return {
      subTotalPrice,
      discount,
      discountedPrice,
      taxAmount,
      grandTotal,
    };
  };

  const handleDiscountChange = (e) => {
    const value = e.target.value;
    setDiscountInput(value); // Update the discount input state
  };

  // Handle tax percentage change
  const handleTaxPercentageChange = (e) => {
    const value = parseFloat(e.target.value) || 0; // Ensure valid number
    setTaxPercentage(value); // Update tax percentage state
  };

  return (
    <>
      {/* Customer Create Modal */}
      {/* Modal Backdrop */}
      {isModalOpen && <div className="modal-backdrop show"></div>}

      {/* Modal */}
      {isModalOpen && <CustomerCreateModal setIsModalOpen={setIsModalOpen} />}

      <div className="col-lg-12">
        <div className="card invoice-container">
          <div className="card-header">
            <div>
              <h1
                className="fs-16 fw-700 text-truncate-1-line mb-0 mb-sm-1"
                style={{
                  borderBottom: "3px solid #ff5722",
                  paddingBottom: "5px",
                }}
              >
                New Invoice
              </h1>
            </div>
            <div className="d-flex align-items-center justify-content-center">
              {/* <button
                type="button"
                className="btn btn-primary me-1"
                data-bs-toggle="tooltip"
                data-bs-trigger="hover"
                title="Button 1"
              >
                Preview
              </button> */}
              <button
                type="button"
                className="btn btn-success"
                data-bs-toggle="tooltip"
                data-bs-trigger="hover"
                title="Save and Continue"
                onClick={handleSaveInvoice}
              >
                Save and Continue
              </button>
            </div>
          </div>
          <div className="card-body p-0">
            <div className="px-4 pt-4">
              <div className="row d-flex justify-content-between align-items-center">
                {/* Left Column: Card */}
                <div className="col-md-4">
                  {!isSearchInputVisible && !selectedCustomer ? (
                    <div
                      className="card shadow-sm h-100"
                      onClick={handleCardClick}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="card-body d-flex flex-column justify-content-center">
                        <div className="fs-4 fw-bolder font-montserrat-alt text-uppercase text-center mb-2">
                          Add a customer
                        </div>
                        <div className="text-center mb-3">
                          <FiUser size={48} className="text-muted" />
                        </div>
                      </div>
                    </div>
                  ) : selectedCustomer ? (
                    <div className="card shadow-sm h-100 p-3">
                      <div className="d-flex justify-content-between align-items-start">
                        <div
                          className="text-truncate"
                          style={{ maxWidth: "85%" }}
                        >
                          <p className="mb-2 text-muted">Bill to :</p>
                          <h5 className="fw-bold text-dark mb-1 text-truncate">
                            {selectedCustomer.value}
                          </h5>
                          <p className="fw-bold text-dark mb-1 text-truncate">
                            {selectedCustomer.address || "No address available"}
                          </p>
                          <p className="text-muted mb-0">
                            {selectedCustomer.city}
                          </p>
                          <p className="text-muted mb-1">
                            {selectedCustomer.country}
                          </p>
                          <p className="text-muted">
                            {selectedCustomer.mobile}
                          </p>
                        </div>
                        <button
                          className="btn btn-light border rounded-circle"
                          onClick={() => setSelectedCustomer(null)}
                        >
                          <FiEdit />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="card shadow-sm h-100">
                      <div className="card-body d-flex flex-column justify-content-center">
                        <button
                          className="btn btn-sm btn-primary mb-3"
                          onClick={() => setIsModalOpen(true)}
                        >
                          <FiPlusCircle size={10} className="me-1" /> Add new
                          customer
                        </button>
                        <AutoComplete
                          style={{ width: "100%" }}
                          placeholder="Search customer..."
                          options={customers.filter(
                            (customer) => customer.value
                          )}
                          value={customerSearchValue}
                          onChange={setCustomerSearchValue}
                          onSelect={handleCustomerSelect}
                          filterOption={(inputValue, option) =>
                            option.value
                              .toUpperCase()
                              .includes(inputValue.toUpperCase())
                          }
                          autoFocus
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column: Form Inputs */}
                <div className="col-md-8">
                  <div className="row g-3 w-100 justify-content-end">
                    {" "}
                    {/* Added justify-content-end here */}
                    {/* Invoice Number */}
                    <div className="col-12">
                      <div className="row align-items-center">
                        <div className="col-4 text-end">
                          <label
                            htmlFor="invoiceNumber"
                            className="fw-bold text-dark"
                          >
                            Invoice number:
                          </label>
                        </div>
                        <div className="col-8">
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            id="invoiceNumber"
                            placeholder="Enter Invoice Number"
                            value={invoiceNumber}
                            onChange={(e) => setInvoiceNumber(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    {/* PO SO number */}
                    <div className="col-12">
                      <div className="row align-items-center">
                        <div className="col-4 text-end">
                          <span className="fw-bold text-dark">
                            P.O/S.O. number:
                          </span>
                        </div>
                        <div className="col-8">
                          <input
                            type="text"
                            className="form-control form-control-sm "
                            id="po number"
                            placeholder=""
                          />
                        </div>
                      </div>
                    </div>
                    {/* Invoice Date */}
                    {/* Auto calculate */}
                    {/* <div className="col-12">
                      <div className="row align-items-center">
                        <div className="col-4 text-end">
                          <span className="fw-bold text-dark">
                            Invoice Date:
                          </span>
                        </div>
                        <div className="col-8">
                          <input
                            type="date"
                            className="form-control form-control-sm w-50"
                            id="issuedDate"
                            defaultValue="2023-01-25"
                          />
                        </div>
                      </div>
                    </div> */}
                    {/* Payment Due */}
                    <div className="col-12">
                      <div className="row align-items-center">
                        <div className="col-4 text-end">
                          <span className="fw-bold text-dark">
                            Invoice Due Date:
                          </span>
                        </div>
                        <div className="col-4">
                          <DatePicker
                            className = "form-control"
                            format="YYYY-MM-DD" // Display date in the UI
                            placeholder="Select Invoice Due Date"
                            onChange={(date, dateString) => {
                              if (date) {
                                // Get the current time with microseconds
                                const currentTime =
                                  moment().format("HH:mm:ss.SSSSSSS");

                                // Combine the selected date with the current time
                                const formattedDate = `${date.format(
                                  "YYYY-MM-DD"
                                )} ${currentTime}`;

                                // Save the formatted date to state
                                setDueDate(formattedDate);
                              } else {
                                setDueDate(null); // Clear the date if no value is selected
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-dashed mb-0" />

            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Product/Service</th>
                    <th>Description</th>
                    <th>Rate</th>
                    <th>QTY</th>
                    <th>Amount</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <AutoComplete
                          style={{
                            display: "block",
                            width: "100%",
                            fontSize: "14px",
                            fontWeight: 400,
                            lineHeight: 1.5,
                            color: "#212529",
                            backgroundColor: "#fff",
                            backgroundClip: "padding-box",
                            border: "1px solid #ced4da",
                            borderRadius: "6px",
                            appearance: "none",
                            height: "48px",
                          }}
                          popupClassName="custom-dropdown"
                          placeholder="Select a product"
                          options={[
                            ...products.filter((product) => product.value),
                            {
                              label: (
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    color: "#007bff",
                                    fontWeight: "500",
                                    cursor: "pointer",
                                  }}
                                  onMouseDown={(e) => e.preventDefault()} // Prevents AutoComplete from closing
                                  onClick={() => {
                                    navigate("/Product/create-product");
                                  }}
                                >
                                  <FiPlusCircle />
                                  Create New Product
                                </div>
                              ),
                            },
                          ]}
                          filterOption={(inputValue, option) =>
                            option.value &&
                            option.value
                              .toUpperCase()
                              .includes(inputValue.toUpperCase())
                          }
                          onSelect={(value) => {
                            const selectedProduct = products.find(
                              (product) => product.value === value
                            );
                            if (selectedProduct) {
                              // Update only the selected row's description
                              setRows((prevRows) =>
                                prevRows.map((r) =>
                                  r.id === row.id
                                    ? {
                                        ...r,
                                        productId: selectedProduct.key,
                                        description:
                                          selectedProduct.description,
                                      }
                                    : r
                                )
                              );
                            }
                          }}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          value={row.description || ""}
                          onChange={(e) => {
                            const newValue = e.target.value;
                            setRows((prevRows) =>
                              prevRows.map((r) =>
                                r.id === row.id
                                  ? { ...r, description: newValue }
                                  : r
                              )
                            );
                          }}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          value={row.rate}
                          onChange={(e) => {
                            const newValue = parseFloat(e.target.value) || 0;
                            setRows((prevRows) =>
                              prevRows.map((r) =>
                                r.id === row.id ? { ...r, rate: newValue } : r
                              )
                            );
                          }}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          value={row.qty}
                          onChange={(e) => {
                            const newValue = parseFloat(e.target.value) || 0;
                            setRows((prevRows) =>
                              prevRows.map((r) =>
                                r.id === row.id ? { ...r, qty: newValue } : r
                              )
                            );
                          }}
                        />
                      </td>
                      <td className="text-dark fw-semibold">
                        {(row.rate * row.qty).toFixed(2)}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={handleDeleteRow(row.id)}
                        >
                          <FiTrash size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="6" className="text-center">
                      <div className="d-flex justify-content-between align-items-center">
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={handleAddRow}
                        >
                          Edit columns
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="3"></td>
                    <td className="fw-semibold text-dark bg-gray-100 text-lg-end">
                      Sub Total
                    </td>
                    <td className="fw-bold text-dark bg-gray-100">
                      + ${totals.subTotalPrice.toFixed(2)}
                    </td>
                    <td className="fw-bold text-dark bg-gray-100"></td>
                  </tr>
                  <tr>
                    <td colSpan="3"></td>
                    <td className="fw-semibold text-dark bg-gray-100 text-lg-end">
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="me-3">Discount Price</span>{" "}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <div className="input-group input-group-sm">
                          <input
                            type="text"
                            className="form-control discount-input"
                            placeholder="Enter discount price"
                            aria-label="Discount Price"
                            value={discountInput}
                            onChange={handleDiscountChange}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="fw-bold text-success bg-gray-100">
                      - ${totals.discount.toFixed(2)}
                    </td>
                    <td className="fw-bold text-dark bg-gray-100"></td>
                  </tr>
                  <tr>
                    <td colSpan="3"></td>
                    <td className="fw-semibold text-dark bg-gray-100 text-lg-end">
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="me-3">Estimated Tax (%)</span>
                        <div className="input-group input-group-sm">
                          <input
                            type="text"
                            className="form-control discount-input"
                            placeholder="Enter tax percentage"
                            aria-label="Discount Code"
                            value={taxPercentage}
                            onChange={handleTaxPercentageChange}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="fw-bold text-dark bg-gray-100">
                      + ${totals.taxAmount.toFixed(2)}
                    </td>
                    <td className="fw-bold text-dark bg-gray-100"></td>
                  </tr>
                  <tr>
                    <td colSpan="3"></td>
                    <td className="fw-semibold text-dark bg-gray-100 text-lg-end">
                      Grand Amount
                    </td>
                    <td className="fw-bolder text-dark bg-gray-100">
                      = ${totals.grandTotal.toFixed(2)}
                    </td>
                    <td className="fw-bold text-dark bg-gray-100"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Custom CSS for Customer Modal Hover Effect */}
      <style>
        {`
          .step-btn {
            transition: all 0.3s ease;
          }
          .step-btn:hover {
            background-color: #0d6efd !important; /* Bootstrap primary color */
            color: white !important;
          }
          .step-btn.active {
            background-color: #0d6efd !important;
            color: white !important;
          }
          .modal-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5); 
            z-index: 1000; 
          }
          .modal-content {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            width: 80%;
            max-width: 600px;
            z-index: 1001; 
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow-y: auto; 
            max-height: 90vh; 
          }
          .modal-footer {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
          }
          .modal-footer button {
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }
          .modal-footer button:first-child {
            background-color: #ccc;
            color: black;
          }
          .modal-footer button:last-child {
            background-color: #007bff;
            color: white;
          }
        `}
      </style>
    </>
  );
};

export default InvoiceCreate;
