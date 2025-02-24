import React, { useState, memo, useEffect } from 'react'
import Table from '@/components/shared/table/Table';
import { FiAlertOctagon, FiArchive, FiClock, FiEdit3, FiEye, FiMoreHorizontal, FiPrinter, FiTrash2 } from 'react-icons/fi'
import Dropdown from '@/components/shared/Dropdown';
import SelectDropdown from '@/components/shared/SelectDropdown';
import { projectTableData } from '@/utils/fackData/projectTableData';

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


const TableCell = memo(({ options, defaultSelect }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    return (
        <SelectDropdown
            options={options}
            defaultSelect={defaultSelect}
            selectedOption={selectedOption}
            onSelectOption={(option) => setSelectedOption(option)}
        />
    );
});

const ProjectTable = () => {

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
            accessorKey: 'project-name',
            header: () => 'Project-name',
            cell: (info) => {
                const roles = info.getValue();
                return (
                    <div className="hstack gap-4">
                        <div className="avatar-image border-0">
                            <img src={roles?.img} alt="" className="img-fluid" />
                        </div>
                        <div>
                            <a href="projects-view.html" className="text-truncate-1-line">{roles?.title}</a>
                            <p className="fs-12 text-muted mt-2 text-truncate-1-line project-list-desc">{roles?.description}</p>
                            <div className="project-list-action fs-12 d-flex align-items-center gap-3 mt-2">
                                <a href="#">Start</a>
                                <span className="vr text-muted"></span>
                                <a href="#">Edit</a>
                                <span className="vr text-muted"></span>
                                <a href="#" className="text-danger">Delete</a>
                            </div>
                        </div>
                    </div>
                )
            },
            meta: {
                className: 'project-name-td'
            }
        },
        {
            accessorKey: 'customer',
            header: () => 'Customer',
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
            accessorKey: 'start-date',
            header: () => 'Start Date',
        },
        {
            accessorKey: 'end-date',
            header: () => 'End Date',
        },
        {
            accessorKey: 'assigned',
            header: () => 'Assigned',
            cell: (info) => <TableCell options={info.getValue().assigned} defaultSelect={info.getValue().defaultSelect} />
        },
        {
            accessorKey: 'status',
            header: () => 'Status',
            cell: (info) => <TableCell options={info.getValue().status} defaultSelect={info.getValue().defaultSelect} />
        },
        {
            accessorKey: 'actions',
            header: () => "Actions",
            cell: info => (
                <div className="hstack gap-2 justify-content-end">
                    <a href="proposal-view.html" className="avatar-text avatar-md">
                        <FiEye />
                    </a>
                    <Dropdown dropdownItems={actions} triggerClassNaclassName='avatar-md' triggerPosition={"0,21"} triggerIcon={<FiMoreHorizontal />} />
                </div>
            ),
            meta: {
                headerClassName: 'text-end'
            }
        },
    ]

    return (
        <>
            <Table data={projectTableData} columns={columns} />
        </>
    )
}

export default ProjectTable
