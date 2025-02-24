import SelectDropdown from '@/components/shared/SelectDropdown';
import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi';

const options = [
    { "label": "Getting Started", "value": "getting-started", "icon": "feather-airplay" },
    { "label": "Integrations", "value": "integrations", "icon": "feather-link-2" },
    { "label": "Directory", "value": "directory", "icon": "feather-archive" },
    { "label": "FAQ'S", "value": "faq's", "icon": "feather-help-circle" },
    { "label": "Administrator", "value": "administrator", "icon": "feather-at-sign" },
    { "label": "End-Users", "value": "end-users", "icon": "feather-users" },
    { "label": "Support", "value": "support", "icon": "feather-life-buoy" }
]
const HelpBanner = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    return (
        <div className="row g-0 align-items-center border-bottom help-center-content-header">
            <div className="col-lg-6 offset-lg-3 text-center">
                <h2 className="fw-bolder mb-2 text-dark">Knowledge Base</h2>
                <p className="text-muted">A premium web applications with integrate knowledge base.</p>
                <form action="#" className="my-4 d-none d-sm-block search-form">
                    <div className="input-group">
                        <SelectDropdown
                            options={options}
                            selectedOption={selectedOption}
                            defaultSelect="getting-started"
                            onSelectOption={(option) => setSelectedOption(option)}
                            className={"select-wd-md"}
                        />
                        <input type="text" className="form-control w-25" placeholder="Enter your keyword or question here..." />
                        <button type="submit" className="btn btn-primary">
                            <FiSearch size={16}/>
                            <span className="ms-2">Search</span>
                        </button>
                    </div>
                </form>
                <div className="mt-2 d-none d-sm-block">
                    <span className="fs-12 text-muted">Popular:</span>
                    <a href="#" className="badge bg-gray-100 shadow-sm text-muted mx-1">Started</a>
                    <a href="#" className="badge bg-gray-100 shadow-sm text-muted mx-1">Integrations</a>
                    <a href="#" className="badge bg-gray-100 shadow-sm text-muted mx-1">Directory</a>
                    <a href="#" className="badge bg-gray-100 shadow-sm text-muted mx-1">Administrator</a>
                    <a href="#" className="badge bg-gray-100 shadow-sm text-muted mx-1">Support</a>
                </div>
            </div>
        </div>

    )
}

export default HelpBanner