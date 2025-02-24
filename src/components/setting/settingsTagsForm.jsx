import React from 'react'
import Footer from '@/components/shared/Footer'
import PageHeaderSetting from '@/components/shared/pageHeader/PageHeaderSetting'
import { FiTag, FiX } from 'react-icons/fi'
import PerfectScrollbar from 'react-perfect-scrollbar'

const SettingsTagsForm = () => {
    return (
        <div className="content-area">
            <PerfectScrollbar>
                <PageHeaderSetting />
                <div className="content-area-body">
                    <div className="card mb-0">
                        <div className="card-body">
                            <TagInputDropdown text="VIP" color="success" />
                            <TagInputDropdown text="Bugs" color="danger" />
                            <TagInputDropdown text="Team" color="primary" />
                            <TagInputDropdown text="Primary" color="primary" />
                            <TagInputDropdown text="Updates" color="success" />
                            <TagInputDropdown text="Personal" color="warning" />
                            <TagInputDropdown text="Promotion" color="danger" />
                            <TagInputDropdown text="Custom" color="teal" />
                            <TagInputDropdown text="Wholesale" color="indigo" />
                            <TagInputDropdown text="Low Budgets" color="danger" />
                            <TagInputDropdown text="High Budgets" color="danger" />
                            <TagInputDropdown text="Important" color="dark" />
                            <TagInputDropdown text="Review" color="warning" />
                        </div>
                    </div>
                </div>
                <Footer />
            </PerfectScrollbar>
        </div>

    )
}

export default SettingsTagsForm

const TagInputDropdown = ({ text, color }) => {
    return (
        <div className="input-group filter-dropdown mb-4">
            <span className={`input-group-text text-${color}`}>
                <FiTag size={16} />
            </span>
            <input type="text" className="form-control" aria-label="Text input with segmented dropdown button" defaultValue={text} />
            <button type="button" className="btn btn-light-brand dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" />
            <ul className="dropdown-menu dropdown-menu-end">
                <li><a className="dropdown-item" href="#">Edit</a></li>
                <li><a className="dropdown-item" href="#">Color</a></li>
                <li><a className="dropdown-item" href="#">Order</a></li>
                <li><a className="dropdown-item" href="#">Status</a></li>
                <li><a className="dropdown-item" href="#">Priority</a></li>
                <li>
                    <hr className="dropdown-divider" />
                </li>
                <li><a className="dropdown-item" href="#">Delete</a></li>
            </ul>
            <button type="button" className="btn btn-light-brand">
                <FiX size={16} />
            </button>
        </div>
    );
};