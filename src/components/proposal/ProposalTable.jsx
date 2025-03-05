import React, { useEffect } from 'react'
import Table from '@/components/shared/table/Table'
import { FiAlertOctagon, FiArchive, FiClock, FiEdit3, FiEye, FiMoreHorizontal, FiPrinter, FiSend, FiTrash2 } from 'react-icons/fi'
import Dropdown from '@/components/shared/Dropdown';
import { Link } from 'react-router-dom';
import { proposalTableData } from '@/utils/fackData/proposalTableData';


const actions = [
  { label: "Edit", icon: <FiEdit3 /> },
  { label: "Print", icon: <FiPrinter /> },
  { label: "Remind", icon: <FiClock /> },
  { type: "divider" },
  { label: "Archive", icon: <FiArchive /> },
  { label: "Report Spam", icon: <FiAlertOctagon />, },
  { type: "divider" },
  { label: "Delete", icon: <FiTrash2 />, },
];




const ProposalTable = () => {
  const columns = [
    {
      accessorKey: 'id',
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
        headerClassName: 'width-30',
      },
    },


    {
      accessorKey: 'proposal',
      header: () => 'Proposal',
      cell: (info) => <a href='#' className='fw-bold'>{info.getValue()}</a>
    },
    {
      accessorKey: 'client',
      header: () => 'Client',
      cell: (info) => {
        const roles = info.getValue();
        return (
          <a href="#" className="hstack gap-3">
            {
              roles?.img ?
                <div className="avatar-image avatar-md">
                  <img src={roles?.img} alt="" className="img-fluid" />
                </div>
                :
                <div className="text-white avatar-text user-avatar-text avatar-md">{roles?.name.substring(0, 1)}</div>
            }
            <div>
              <span className="text-truncate-1-line">{roles?.name}</span>
              <small className="fs-12 fw-normal text-muted">{roles?.email}</small>
            </div>
          </a>
        )
      }
    },
    {
      accessorKey: 'subject',
      header: () => 'Subject',
    },
    {
      accessorKey: 'amount',
      header: () => 'Amount',
      meta: {
        className: "fw-bold text-dark"
      }
    },
    {
      accessorKey: 'date',
      header: () => 'Date',
    },
    {
      accessorKey: 'status',
      header: () => 'Status',
      cell: (info) => <div className={`badge ${info.getValue().color}`}>{info.getValue().content}</div>
    },
    {
      accessorKey: 'actions',
      header: () => "Actions",
      cell: info => (
        <div className="hstack gap-2 justify-content-end">
          <a href="#" className="avatar-text avatar-md" data-bs-toggle="offcanvas" data-bs-target="#proposalSent">
            <FiSend />
          </a>
          <Link to="/proposal/view" className="avatar-text avatar-md">
            <FiEye />
          </Link>
          <Dropdown dropdownItems={actions} triggerIcon={<FiMoreHorizontal />} triggerClass='avatar-md' triggerPosition={"0,21"} />
        </div>
      ),
      meta: {
        headerClassName: 'text-end'
      }
    },
  ]
  return (
    <>
      <Table data={proposalTableData} columns={columns} />
    </>
  )
}

export default ProposalTable