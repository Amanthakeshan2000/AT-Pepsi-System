import React, { useEffect, useState } from "react";
import axios from "axios";

const CustomerCreateModal = ({setIsModalOpen}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState(null);
  const [organizations, setOrganizations] = useState([]);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    organizationId: "",
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    currency: 0,
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    country: 0,
    province: 0,
    shipToContact: "",
    shipToPhone: "",
    shipCity: "",
    shipPostalCode: "",
    shipCountry: 0,
    shipProvince: 0,
    shipAddressLine1: "",
    shipAddressLine2: "",
    diliveryInstructions: "",
    accountNumber: "",
    fax: "",
    mobile: "",
    webSite: "",
    internalNote: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleBlur = (e) => {
    const { id } = e.target;
    validateField(id);
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Close the modal
    setFormData(initialState);
  };

  const handleSave = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("Access token missing. Please log in.");
    if (!validateContactStep()) {
      setCurrentStep(0);
      return;
    }
    try {
      const apiUrl = "https://localhost:7053/api/Customer/create-customer";
      const response = await axios.post(apiUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status >= 200 && response.status < 300) {
        alert(
          `Customer created successfully!\n${JSON.stringify(
            response.data,
            null,
            2
          )}`
        );
      } else {
        throw new Error("Failed to save customer data.");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleNext = () => {
    if (currentStep === 0 && !validateContactStep()) {
      return;
    }

    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStepChange = (step) => {
    setCurrentStep(step);
  };

  // Add validation handler
  const validateContactStep = () => {
    const newErrors = {};
    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    // Phone validation
    // if (!formData.phone.trim()) {
    //   newErrors.phone = "Phone is required";
    //   isValid = false;
    // } else if (!/^\d{10,}$/.test(formData.phone)) {
    //   newErrors.phone = "Invalid phone number (minimum 10 digits)";
    //   isValid = false;
    // }

    // // First Name validation
    // if (!formData.firstName.trim()) {
    //   newErrors.firstName = "First Name is required";
    //   isValid = false;
    // }

    // // Last Name validation
    // if (!formData.lastName.trim()) {
    //   newErrors.lastName = "Last Name is required";
    //   isValid = false;
    // }

    setErrors(newErrors);
    return isValid;
  };

  const validateField = (fieldName) => {
    let error = "";
    const value = formData[fieldName];

    switch (fieldName) {
      case "name":
        if (!value.trim()) error = "Name is required";
        break;
      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Invalid email format";
        }
        break;
      // case "phone":
      //   if (!value.trim()) {
      //     error = "Phone is required";
      //   } else if (!/^\d{10,}$/.test(value)) {
      //     error = "Invalid phone number (minimum 10 digits)";
      //   }
      //   break;
      // case "firstName":
      //   if (!value.trim()) error = "First Name is required";
      //   break;
      // case "lastName":
      //   if (!value.trim()) error = "Last Name is required";
      //   break;
      // default:
      //   break;
    }

    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  };

  const fetchOrganizationData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      console.log("Access Token:", token);

      if (!token) {
        throw new Error("Access token is missing in localStorage!");
      }

      const organizationResponse = await fetch(
        "https://localhost:7053/api/OrganizationUser/get-organization-withits-user",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!organizationResponse.ok) {
        const errorText = await organizationResponse.text();
        throw new Error(
          `Failed to fetch data. HTTP Status: ${organizationResponse.status}, Response: ${errorText}`
        );
      }

      const organizationData = await organizationResponse.json();
      const orgs = organizationData.reduce((acc, item) => {
        const orgExists = acc.some((org) => org.id === item.organizationId);
        if (!orgExists) {
          acc.push({
            id: item.organization.id,
            name: item.organization.name || "Unknown Organization",
          });
        }
        return acc;
      }, []);

      setOrganizations(orgs);
    } catch (error) {
      console.error("Error fetching organize data:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizationData();
  }, []);

  return (
    <div className="modal fade show" style={{ display: "block" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create Customer</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => setIsModalOpen(false)}
            ></button>
          </div>
          <div className="modal-body">
            <div className="d-flex justify-content-center gap-2 mb-3">
              <button
                type="button"
                className={`step-btn btn ${currentStep === 0 ? "active" : ""}`}
                onClick={() => handleStepChange(0)}
                aria-label="Go to Contact Information"
              >
                Contact
              </button>
              <button
                type="button"
                className={`step-btn btn ${currentStep === 1 ? "active" : ""}`}
                onClick={() => handleStepChange(1)}
                aria-label="Go to Billing Information"
              >
                Billing
              </button>
              <button
                type="button"
                className={`step-btn btn ${currentStep === 2 ? "active" : ""}`}
                onClick={() => handleStepChange(2)}
                aria-label="Go to Shipping Information"
              >
                Shipping
              </button>
              <button
                type="button"
                className={`step-btn btn ${currentStep === 3 ? "active" : ""}`}
                onClick={() => handleStepChange(3)}
                aria-label="Go to More Information"
              >
                More Information
              </button>
            </div>
            <hr />

            {/* Form Content */}
            {currentStep === 0 && (
              <div className="form-step">
                <h6>Contact Information</h6>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    id="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    id="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Organization
                  </label>
                  <select
                    // className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    className="form-control"
                    id="organizationId"
                    value={formData.organizationId}
                    onChange={handleChange}
                  >
                    {organizations.map((org) => (
                      <option key={org.id} value={org.id}>
                        {org.name}
                      </option>
                    ))}
                  </select>
                  {/* <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  /> */}
                  {/* {errors.email && <div className="invalid-feedback">{errors.email}</div>} */}
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className={`form-control ${
                      errors.phone ? "is-invalid" : ""
                    }`}
                    id="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.phone && (
                    <div className="invalid-feedback">{errors.phone}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.firstName ? "is-invalid" : ""
                    }`}
                    id="firstName"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.firstName && (
                    <div className="invalid-feedback">{errors.firstName}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.lastName ? "is-invalid" : ""
                    }`}
                    id="lastName"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.lastName && (
                    <div className="invalid-feedback">{errors.lastName}</div>
                  )}
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="form-step">
                <h6>Billing Information</h6>
                <div className="mb-3">
                  <label htmlFor="addressLine" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="addressLine1"
                    placeholder="Enter your address line 1"
                    value={formData.addressLine1}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="addressLine2"
                    placeholder="Enter your address line 2"
                    value={formData.addressLine2}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    placeholder="Enter your city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="postalCode" className="form-label">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="postalCode"
                    placeholder="Enter your postal code"
                    value={formData.postalCode}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="form-step">
                <h6>Shipping Information</h6>
                <div className="mb-3">
                  <label htmlFor="shipToContact" className="form-label">
                    Ship to contact
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="shipToContact"
                    placeholder="Enter ship to contact"
                    value={formData.shipToContact}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="shipToPhone" className="form-label">
                    Ship to phone
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="shipToPhone"
                    placeholder="Enter ship to phone"
                    value={formData.shipToPhone}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="shipAddressLine1" className="form-label">
                    Ship Address Line 1
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="shipAddressLine1"
                    placeholder="Enter ship address line 1"
                    value={formData.shipAddressLine1}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="shipAddressLine2" className="form-label">
                    Ship Address Line 2
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="shipAddressLine2"
                    placeholder="Enter your ship address line 2"
                    value={formData.shipAddressLine2}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="shipCity" className="form-label">
                    Ship City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="shipCity"
                    placeholder="Enter your ship city"
                    value={formData.shipCity}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="shipPostalCode" className="form-label">
                    Ship Postal Code
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="shipPostalCode"
                    placeholder="Enter your ship postal code"
                    value={formData.shipPostalCode}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="deliveryInstructions" className="form-label">
                    Delivery Instructions
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="deliveryInstructions"
                    placeholder="Enter your Delivery Instructions"
                    value={formData.diliveryInstructions}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="form-step">
                <h6>More Information</h6>
                <div className="mb-3">
                  <label htmlFor="accountNumber" className="form-label">
                    Account number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="accountNumber"
                    placeholder="Enter account number"
                    value={formData.accountNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="fax" className="form-label">
                    Fax
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fax"
                    placeholder="Enter fax"
                    value={formData.fax}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">
                    Mobile
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="mobile"
                    placeholder="Enter mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="website" className="form-label">
                    Website
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="website"
                    placeholder="Enter website"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="internalNote" className="form-label">
                    Internal Note
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="internalNote"
                    placeholder="Enter internal note"
                    value={formData.internalNote}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerCreateModal;
