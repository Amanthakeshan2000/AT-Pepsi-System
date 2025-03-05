import React, { Fragment } from 'react'
import { FiChevronRight, FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import getIcon from '@/utils/getIcon';

const menuData = [
    {
        name: 'applications',
        icon: 'feather-send',
        subMenu: [
            { name: 'Chat', path: '/applications/chat' },
            { name: 'Email', path: '/applications/email' },
            { name: 'Tasks', path: '/applications/tasks' },
            { name: 'Notes', path: '/applications/notes' },
            { name: 'Storage', path: '/applications/storage' },
            { name: 'Calendar', path: '/applications/calendar' },
        ],
    },
    {
        name: 'reports',
        icon: 'feather-cast',
        subMenu: [
            { name: 'Sales Report', path: '/reports/sales' },
            { name: 'Leads Report', path: '/reports/leads' },
            { name: 'Project Report', path: '/reports/project' },
            { name: 'Timesheets Report', path: '/reports/timesheets' },
        ],
    },
    {
        name: 'proposal',
        icon: 'feather-at-sign',
        subMenu: [
            { name: "Proposal", path: "/proposal/list", },
            { name: "Proposal View", path: "/proposal/view", },
            { name: "Proposal Edit", path: "/proposal/edit", },
            { name: "Proposal Create", path: "/proposal/create", },
        ],
    },
    {
        name: 'payment',
        icon: 'feather-dollar-sign',
        subMenu: [
            { name: "Payment", path: "/payment/list" },
            { name: "Invoice View", path: "/payment/view" },
            { name: "Invoice Create", path: "/payment/create" }
        ],
    },
    {
        name: 'customers',
        icon: 'feather-users',
        subMenu: [
            { name: "Customers", path: "/customers/list" },
            { name: "Customers View", path: "/customers/view" },
            { name: "Customers Create", path: "/customers/create" }
        ],
    },
    {
        name: 'leads',
        icon: 'feather-alert-circle',
        subMenu: [
            { name: 'Leads', path: '/leads/list' },
            { name: 'Leads View', path: '/leads/view' },
            { name: 'Leads Create', path: '/leads/create' }
        ]
    },
    {
        name: 'projects',
        icon: 'feather-briefcase',
        subMenu: [
            { name: 'Projects', path: '/projects/list' },
            { name: 'Projects View', path: '/projects/view' },
            { name: 'Projects Create', path: '/projects/create' }
        ]
    },
    {
        name: 'widgets',
        icon: 'feather-layout',
        subMenu: [
            { name: 'Lists', path: '/widgets-lists' },
            { name: 'Tables', path: '/widgets-tables' },
            { name: 'Charts', path: '/widgets-charts' },
            { name: 'Statistics', path: '/widgets-statistics' },
            { name: 'Miscellaneous', path: '/widgets-miscellaneous' }
        ]
    },
    {
        name: 'authentication',
        icon: 'feather-power',
        subMenu: [
            {
                name: 'login',
                subSubMenu: [
                    { name: 'Cover', path: '/authentication/login/cover' },
                    { name: 'Minimal', path: '/authentication/login/minimal' },
                    { name: 'Creative', path: '/authentication/login/creative' },
                ],
            },
            {
                name: 'register',
                subSubMenu: [
                    { name: 'Cover', path: '/authentication/register/cover' },
                    { name: 'Minimal', path: '/authentication/register/minimal' },
                    { name: 'Creative', path: '/authentication/register/creative' },
                ],
            },
            {
                name: 'Error 404',
                subSubMenu: [
                    { name: 'Cover', path: '/authentication/404/cover' },
                    { name: 'Minimal', path: '/authentication/404/minimal' },
                    { name: 'Creative', path: '/authentication/404/creative' },
                ],
            },
            {
                name: 'Reset Pass',
                subSubMenu: [
                    { name: 'Cover', path: '/authentication/reset/cover' },
                    { name: 'Minimal', path: '/authentication/reset/minimal' },
                    { name: 'Creative', path: '/authentication/reset/creative' },
                ],
            },
            {
                name: 'Verify OTP',
                subSubMenu: [
                    { name: 'Cover', path: '/authentication/verify/cover' },
                    { name: 'Minimal', path: '/authentication/verify/minimal' },
                    { name: 'Creative', path: '/authentication/verify/creative' },
                ],
            },
            {
                name: 'Maintenance',
                subSubMenu: [
                    { name: 'Cover', path: '/authentication/maintenance/cover' },
                    { name: 'Minimal', path: '/authentication/maintenance/minimal' },
                    { name: 'Creative', path: '/authentication/maintenance/creative' },
                ],
            },
        ],
    },
];


const HeaderDropDownModal = () => {
    return (
        <div className="dropdown nxl-h-item nxl-lavel-menu">
            <Link to="#" className="avatar-text avatar-md bg-primary text-white" data-bs-toggle="dropdown" data-bs-auto-close="outside">
                <FiPlus size={12} />
            </Link>
            <div className="dropdown-menu nxl-h-dropdown">
                {menuData.map((menu, index) => (
                    <Fragment key={index}>
                        <div className="dropdown nxl-level-menu">
                            <Link to="#" className="dropdown-item text-capitalize">
                                <span className="hstack">
                                    <i>{getIcon(menu.icon)}</i>
                                    <span>{menu.name}</span>
                                </span>
                                <i className="ms-auto me-0"><FiChevronRight /></i>
                            </Link>
                            <div className="dropdown-menu nxl-h-dropdown">
                                {menu.subMenu.map((subItem, subIndex) => (
                                    <div key={subIndex} className="dropdown nxl-level-menu">
                                        <Link to={subItem.path} className="dropdown-item text-capitalize">
                                            <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                                            <span>{subItem.name}</span>
                                            {subItem.subSubMenu && <i className="ms-auto me-0"><FiChevronRight /></i>}
                                        </Link>
                                        {subItem.subSubMenu && (
                                            <div className="dropdown-menu nxl-h-dropdown">
                                                {subItem.subSubMenu.map((subSubItem, subSubIndex) => (
                                                    <Link key={subSubIndex} to={subSubItem.path} className="dropdown-item text-capitalize">
                                                        <span>{subSubItem.name}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        {index === 0 && <div className="dropdown-divider"></div>}
                    </Fragment>
                ))}
                <div className="dropdown-divider"></div>
                <Link to="#" className="dropdown-item">
                    <i><FiPlus /></i>
                    <span>Add New Items</span>
                </Link>
            </div>
        </div>
    )
}

export default HeaderDropDownModal
