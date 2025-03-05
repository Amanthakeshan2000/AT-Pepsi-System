import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiAlertOctagon,
  FiArchive,
  FiClock,
  FiEdit3,
  FiEye,
  FiMoreHorizontal,
  FiPrinter,
  FiTrash2,
  FiRefreshCcw,
} from "react-icons/fi";
import Dropdown from "@/components/shared/Dropdown";
import Table from "@/components/shared/table/Table";
import axios from "axios";
import { DatePicker, Select } from "antd";
import dayjs from "dayjs";

const actions = [
  { label: "Edit", icon: <FiEdit3 /> },
  { label: "Print", icon: <FiPrinter /> },
  { label: "Remind", icon: <FiClock /> },
  { type: "divider" },
  { label: "Archive", icon: <FiArchive /> },
  { label: "Report Spam", icon: <FiAlertOctagon /> },
  { type: "divider" },
  { label: "Delete", icon: <FiTrash2 /> },
];

const { Option } = Select; // Destructure the Option component


const PaymentTable = () => {
  const [invoiceData, setInvoiceData] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [createDateFilter, setCreateDateFilter] = useState(null);
  const [dueDateFilter, setDueDateFilter] = useState(null);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      console.log("Access Token:", token);
      if (!token) {
        throw new Error("Access token is missing in localStorage!");
      }
      const response = await axios.get(
        "https://localhost:7053/api/Invoice/get-invoice-list",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const transformedData = response.data.map((item) => ({
        id: item.id,
        invoice: item.invoiceNumber,
        client: {
          name: item.customerName,
          email: item.customerEmail,
        },
        amount: item.total,
        createDate: item.createUtc,
        dueDate: item.dueDate,
        transaction: item.paymentType,
        status: {
          content: item.status === 0 ? "Pending" : "Completed",
          color: item.status === 0 ? "bg-warning" : "bg-success",
        },
      }));
      setInvoiceData(transformedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter data based on customer name and status and date
  const filteredData = invoiceData.filter((row) => {
    const name = row.client?.name || "";
    const matchesName = name.toLowerCase().includes(filterName.toLowerCase());
    const matchesStatus =
      filterStatus === "All" ||
      (filterStatus === "Pending" && row.status.content === "Pending") ||
      (filterStatus === "Completed" && row.status.content === "Completed");

    // Check Create Date filter
    const matchesCreateDate =
      !createDateFilter ||
      dayjs(row.createDate).isSame(createDateFilter, "day");

    // Check Due Date filter
    const matchesDueDate =
      !dueDateFilter || dayjs(row.dueDate).isSame(dueDateFilter, "day");

    return matchesName && matchesStatus && matchesCreateDate && matchesDueDate;
  });

  // Count active filters
  const activeFiltersCount =
    (filterName !== "" ? 1 : 0) +
    (filterStatus !== "All" ? 1 : 0) +
    (createDateFilter ? 1 : 0) +
    (dueDateFilter ? 1 : 0);

  // Clear all filters
  const clearFilters = () => {
    setFilterName("");
    setFilterStatus("All");
    setCreateDateFilter(null);
    setDueDateFilter(null);
  };

  const columns = [
    {
      accessorKey: "id",
      header: ({ table }) => {
        const checkboxRef = React.useRef(null);
        useEffect(() => {
          if (checkboxRef.current) {
            checkboxRef.current.indeterminate = table.getIsSomeRowsSelected();
          }
        }, [table.getIsSomeRowsSelected()]);
        return (
          <input
            type="checkbox"
            className="custom-table-checkbox"
            ref={checkboxRef}
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        );
      },
      cell: ({ row }) => (
        <input
          type="checkbox"
          className="custom-table-checkbox"
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
      meta: {
        headerClassName: "width-30",
      },
    },
    {
      accessorKey: "invoice",
      header: () => "Invoice",
      cell: (info) => (
        <a href="#" className="fw-bold">
          {info.getValue()}
        </a>
      ),
    },
    {
      accessorKey: "client",
      header: () => "Client",
      cell: (info) => {
        const roles = info.getValue();
        const nameInitial = roles?.name ? roles.name.substring(0, 1) : "?";
        return (
          <a href="#" className="hstack gap-3">
            {roles?.img ? (
              <div className="avatar-image avatar-md">
                <img src={roles?.img} alt="" className="img-fluid" />
              </div>
            ) : (
              <div className="text-white avatar-text user-avatar-text avatar-md">
                {nameInitial} {/* Display "?" if roles.name is missing */}
              </div>
            )}
            <div>
              <span className="text-truncate-1-line">
                {roles?.name || "Unknown"}
              </span>
              <small className="fs-12 fw-normal text-muted">
                {roles?.email || "No Email"}
              </small>
            </div>
          </a>
        );
      },
    },
    {
      accessorKey: "amount",
      header: () => "Amount",
      meta: {
        className: "fw-bold text-dark",
      },
    },
    {
      accessorKey: "createDate",
      header: () => "Create Date",
      cell: (info) => {
        const fullDate = info.getValue(); // Get the full datetime string
        const formattedDate = dayjs(fullDate).format("YYYY-MM-DD"); // Format date using Day.js
        return <span>{formattedDate}</span>;
      },
    },
    {
      accessorKey: "dueDate",
      header: () => "Due Date",
      cell: (info) => {
        const fullDate = info.getValue(); // Get the full datetime string
        const formattedDate = dayjs(fullDate).format("YYYY-MM-DD"); // Format date using Day.js
        return <span>{formattedDate}</span>;
      },
    },
    {
      accessorKey: "transaction",
      header: () => "Transaction",
      cell: (info) => <a href="">{info.getValue()}</a>,
    },
    {
      accessorKey: "status",
      header: () => "Status",
      cell: (info) => (
        <div className={`badge ${info.getValue().color}`}>
          {info.getValue().content}
        </div>
      ),
    },
    {
      accessorKey: "actions",
      header: () => "Actions",
      cell: (info) => {
        const id = info.row.original.id;
        return (
          <div className="hstack gap-2 justify-content-end">
            <Link to={`/invoice/view/${id}`} className="avatar-text avatar-md">
              <FiEye />
            </Link>
            <Dropdown
              dropdownItems={actions}
              triggerIcon={<FiMoreHorizontal />}
              triggerClass="avatar-md"
              triggerPosition={"0,21"}
            />
          </div>
        );
      },
      meta: {
        headerClassName: "text-end",
      },
    },
  ];

  return (
    <>
      <div className="mt-4">
        <div className="d-flex align-items-center gap-2 mb-3">
          <h6 className="mb-0">
            <span className="badge bg-success rounded-circle text-white me-1">
              {activeFiltersCount}
            </span>
            active filter(s)
          </h6>
          {activeFiltersCount > 0 && (
            <div className="cursor-pointer pb-2" onClick={clearFilters}>
              <FiRefreshCcw size={16} />
            </div>
          )}
        </div>
        <div className="row g-2">
          <div className="col-md-3 col-12">
            <input
              type="text"
              placeholder="Search by customer name..."
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col-md-3 col-12">
            <Select 
              value={filterStatus}
              onChange={(value) => setFilterStatus(value)} // Handle selection change
              placeholder="Select Status"
              style={{ width: "100%", height: "47px"}}
            >
              <Option value="All">All statuses</Option>
              <Option value="Pending">Pending</Option>
              <Option value="Completed">Completed</Option>
            </Select>
          </div>
          <div className="col-md-3 col-12">
            <DatePicker
              className="form-control"
              placeholder="Select Invoice Create Date"
              value={createDateFilter ? dayjs(createDateFilter) : null}
              onChange={(date) =>
                setCreateDateFilter(date ? date.toDate() : null)
              }
            />
          </div>
          <div className="col-md-3 col-12">
            <DatePicker
              className="form-control"
              placeholder="Select Due Date"
              value={dueDateFilter ? dayjs(dueDateFilter) : null}
              onChange={(date) => {
                setDueDateFilter(date ? date.toDate() : null);
              }}
            />
          </div>
        </div>
      </div>
      <div className="mt-4 mb-3 d-flex justify-content-center gap-2">
        <button className="btn btn-outline-primary">
          Unpaid <span className="badge bg-primary">7</span>
        </button>
        <button className="btn btn-outline-primary">
          Draft <span className="badge bg-primary">1</span>
        </button>
        <button className="btn btn-outline-primary">All invoices</button>
      </div>
      {/* Render Table with Filtered Data */}
      <Table data={filteredData} columns={columns} />
    </>
  );
};

export default PaymentTable;
