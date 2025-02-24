import React, { useEffect, useState } from "react";
import { FiLayers, FiUserPlus } from "react-icons/fi";
import CustomerCreateModal from "../shared/CustomerCreateModal";

const CustomersCreateHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleClick = () => {
    console.log("Save as Draft clicked");
  };

  return (
    <>
      <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
        <button className="btn btn-light-brand" onClick={handleClick}>
          <FiLayers size={16} className="me-2" />
          <span>Save as Draft</span>
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          <FiUserPlus size={16} className="me-2" />
          <span>Create Customer</span>
        </button>
      </div>

      {/* Modal Backdrop */}
      {isModalOpen && <div className="modal-backdrop show"></div>}

      {/* Modal */}
      {isModalOpen && (
        <CustomerCreateModal setIsModalOpen={setIsModalOpen} />
      )}

      {/* Custom CSS for Hover Effect */}
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

export default CustomersCreateHeader;
