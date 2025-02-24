import React, { useEffect, useState } from "react";
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
} from "react-icons/fi";
import axios from "axios";
import Dropdown from "../shared/Dropdown";

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

const InvoiceView = ({ invoiceId }) => {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(`Hello ${invoiceId}`);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        console.log("Access Token:", token);

        if (!token) {
          throw new Error("Access token is missing in localStorage!");
        }
        const response = await axios.get(
          `https://localhost:7053/api/Invoice/get-invoice-by-id?id=${invoiceId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setInvoice(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [invoiceId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!invoice) return <div>No invoice data available.</div>;

  const subTotalPrice = invoice.subTotal || 0;
  const discount = invoice.discount || 0;
  const discountedPrice = subTotalPrice - discount;
  const taxAmount = invoice.tax || 0;
  const grandTotal = discountedPrice + taxAmount;

  return (
    <div className="col-lg-12">
      <div className="card invoice-container">
        <div className="card-header">
          <div>
            {/* <h2 className="fs-16 fw-700 text-truncate-1-line mb-0 mb-sm-1">Invoice Preview</h2> */}
            {/* <Dropdown
                            dropdownItems={invoiceTempletOptions}
                            dropdownParentStyle={"d-none d-sm-block"}
                            triggerClass='dropdown-toggle d-flex align-items-center fs-11 fw-400 text-muted me-2'
                            triggerPosition={"0, 25"}
                            triggerText={"Invoice Templates"}
                            triggerIcon={" "}
                            isAvatar={false}
                            dropdownPosition='dropdown-menu-start'
            /> */}
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <a
              href="#"
              className="d-flex me-1"
              data-alert-target="invoicSendMessage"
            >
              <div
                className="avatar-text avatar-md"
                data-bs-toggle="tooltip"
                data-bs-trigger="hover"
                title="Send Invoice"
              >
                <FiSend strokeWidth={1.6} size={12} />
              </div>
            </a>
            <a href="#" className="d-flex me-1 printBTN">
              <div
                className="avatar-text avatar-md"
                data-bs-toggle="tooltip"
                data-bs-trigger="hover"
                title="Print Invoice"
              >
                <FiPrinter strokeWidth={1.6} size={12} />
              </div>
            </a>
            <a href="#" className="d-flex me-1">
              <div
                className="avatar-text avatar-md"
                data-bs-toggle="tooltip"
                data-bs-trigger="hover"
                title="Add Payment"
              >
                <FiDollarSign strokeWidth={1.6} size={12} />
              </div>
            </a>
            <a href="#" className="d-flex me-1 file-download">
              <div
                className="avatar-text avatar-md"
                data-bs-toggle="tooltip"
                data-bs-trigger="hover"
                title="Download Invoice"
              >
                <FiDownload size={12} />
              </div>
            </a>
            <a href="invoice-create.html" className="d-flex me-1">
              <div
                className="avatar-text avatar-md"
                data-bs-toggle="tooltip"
                data-bs-trigger="hover"
                title="Edit Invoice"
              >
                <FiEdit strokeWidth={1.6} size={12} />
              </div>
            </a>
          </div>
        </div>
        <div className="card-body p-0">
          <div className="px-4 pt-4">
            <div className="d-sm-flex align-items-center justify-content-between">
              <div>
                {/* <div className="fs-24 fw-bolder font-montserrat-alt text-uppercase">TECHWIRE LANKA</div> */}
                <img
                  src={invoice.organization.image}
                  className="img-fluid wd-150"
                  alt="image"
                />

                <address className="text-muted">
                  {/* LOGO HERE<br /> */}
                  {/* DeLorean New York<br />
                                    VAT No: 2617 348 2752 */}
                </address>
                {/* <div className="d-flex gap-2">
                                    <a href="#" className="avatar-text avatar-sm">
                                        <FiFacebook strokeWidth={1.6} />
                                    </a>
                                    <a href="#" className="avatar-text avatar-sm">
                                        <FiTwitter />
                                    </a>
                                    <a href="#" className="avatar-text avatar-sm">
                                        <FiInstagram />
                                    </a>
                                    <a href="#" className="avatar-text avatar-sm">
                                        <FiLinkedin />
                                    </a>
                                    <a href="#" className="avatar-text avatar-sm">
                                        <FiGithub />
                                    </a>
                                </div> */}
              </div>
              <div className="lh-lg pt-3 pt-sm-0">
                <h1 className="fs-4 fw-bold text-primary">INVOICE</h1>
                <div>
                  <span className="fw-bold text-dark">
                    Techwire Lanka (Pvt) Ltd{" "}
                  </span>
                  {/* <span className="fw-bold text-primary">#NXL369852</span> */}
                </div>
                <div>
                  {/* <span className="fw-bold text-dark">Due Date: </span> */}
                  <span className="text-muted">NO 270/A/2</span>
                </div>
                <div>
                  {/* <span className="fw-bold text-dark">Due Date: </span> */}
                  <span className="text-muted">Hapugoda</span>
                </div>
                <div>
                  {/* <span className="fw-bold text-dark">Due Date: </span> */}
                  <span className="text-muted">Kandana, Western</span>
                </div>
                <div>
                  {/* <span className="fw-bold text-dark">Issued Date: </span> */}
                  <span className="text-muted">Srilanka</span>
                </div>
              </div>
            </div>
          </div>
          <hr className="border-dashed" />
          <div className="px-4 py-sm-5">
            <div className="row">
              {/* Left Side - Bill To Section */}
              <div className="col-md-6">
                <h2 className="fs-16 fw-bold text-dark mb-3">Bill To</h2>
                <address className="text-muted lh-lg">
                  {invoice?.customer.name},<br />
                  {invoice?.customer.shipAddressLine1},<br />
                  {invoice?.customer.shipAddressLine2},<br />
                  {invoice?.customer.shipCity} 20400,
                  <br />
                  {invoice?.customer.shipProvince}
                  <br />
                  {invoice?.customer.mobile}
                </address>
              </div>

              {/* Right Side - Invoice Details Section */}
              <div className="col-md-6">
                <h2 className="fs-16 fw-bold text-dark mb-3">
                  INVOICE DETAILS
                </h2>
                <div className="d-flex flex-column">
                  <div className="d-flex align-items-center mb-2">
                    <span className="text-muted" style={{ width: "200px" }}>
                      Invoice Number:
                    </span>
                    <span className="fw-bold text-dark">
                      {invoice?.tableId || "N/A"}
                    </span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <span className="text-muted" style={{ width: "200px" }}>
                      Invoice Date:
                    </span>
                    <span className="fw-bold text-warning">
                      {invoice?.createUtc
                        ? new Date(invoice.createUtc).toLocaleDateString()
                        : "Invalid Date"}
                    </span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <span className="text-muted" style={{ width: "200px" }}>
                      Payment Due:
                    </span>
                    <span className="fw-bold text-dark">
                      {invoice?.createUtc
                        ? new Date(invoice.createUtc).toLocaleDateString()
                        : "Invalid Date"}
                    </span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <span className="text-muted" style={{ width: "200px" }}>
                      Amount:
                    </span>
                    <span className="fw-bold text-dark">
                      Rs: {invoice?.total || "0.00"}
                    </span>
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
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoice.details &&
                  invoice.details.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <a href="#">
                          {item.product?.name || "No Product Name"}
                        </a>
                      </td>
                      <td>
                        <a href="#">
                          {item.product?.description ||
                            "No Product Description"}
                        </a>
                      </td>
                      <td>{item.qty}</td>
                      <td>Rs: {item.price.toFixed(2)}</td>
                      <td className="text-dark fw-semibold">
                        Rs: {item.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                <tr>
                  <td colSpan="3"></td>
                  <td className="fw-semibold text-dark bg-gray-100 text-lg-end">
                    Sub Total
                  </td>
                  <td className="fw-bold text-dark bg-gray-100">
                    + Rs: {subTotalPrice.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td colSpan="3"></td>
                  <td className="fw-semibold text-dark bg-gray-100 text-lg-end">
                    Discount
                  </td>
                  <td className="fw-bold text-success bg-gray-100">
                    - Rs: {discount.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td colSpan="3"></td>
                  <td className="fw-semibold text-dark bg-gray-100 text-lg-end">
                    Estimated Tax
                  </td>
                  <td className="fw-bold text-dark bg-gray-100">
                    + Rs: {taxAmount.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td colSpan="3"></td>
                  <td className="fw-semibold text-dark bg-gray-100 text-lg-end">
                    Grand Amount
                  </td>
                  <td className="fw-bolder text-dark bg-gray-100">
                    = Rs: {grandTotal.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr className="border-dashed mt-0" />
          <div className="px-4">
            <div
              className="alert alert-dismissible p-4 mt-3 alert-soft-warning-message"
              role="alert"
            >
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
              <p className="mb-0">
                <strong>NOTES:</strong> All accounts are to be paid within 7
                days from receipt of invoice. <br />
                To be paid by cheque or credit card or direct payment online.{" "}
                <br />
                If account is not paid within 7 days the credits details
                supplied as confirmation of work undertaken will be charged the
                agreed quoted fee noted above.
              </p>
            </div>
          </div>
          <div className="px-4 pt-4 d-sm-flex align-items-center justify-content-between">
            <div className="mb-5 mb-sm-0">
              <h6 className="fs-13 fw-bold mb-3">Tarm &amp; Condition :</h6>
              <ul className="list-unstyled lh-lg fs-12">
                <li>
                  # All accounts are to be paid within 7 days from receipt of
                  invoice.
                </li>
                <li>
                  # To be paid by cheque or credit card or direct payment
                  online.
                </li>
              </ul>
            </div>
            <div className="text-center">
              {/* <img src="/images/general/Logo.jpg" className="img-fluid wd-100" alt="image" /> */}
              <p className="fs-15 fw-semibold text-muted">MR. Pahan Rodrigo</p>

              <h6 className="fs-13 fw-bold mt-2">Account Manager</h6>
              <p className="fs-11 fw-semibold text-muted">
                26 MAY 2024, 10:35PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceView;
