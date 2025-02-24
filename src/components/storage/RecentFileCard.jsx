import React from 'react'
import Dropdown from '@/components/shared/Dropdown';

const RecentFileCard = ({ imgSrc, title, projectLink, dashboardLink, category, strogeOptions, handleDelete, id }) => {
    return (
        <div className="col-xxl-3 col-sm-6">
            <div className="card mb-4 stretch stretch-full">
                <div className="card-body p-0 ht-250">
                    <a href="#" className="w-100 h-100 d-flex align-items-center justify-content-center" data-bs-toggle="offcanvas" data-bs-target="#fileFolderDetailsOffcanvas">
                        <img src={imgSrc} className="img-fluid wd-80 ht-80" alt={title} />
                    </a>
                </div>
                <div className="card-footer p-4 d-flex align-items-center justify-content-between">
                    <div>
                        <h2 className="fs-13 mb-1 text-truncate-1-line">{title}</h2>
                        <small className="fs-10 text-uppercase">
                            <a href="#">{projectLink}</a> / <a href="#">{dashboardLink}</a> / <span className="text-muted">{category}</span>
                        </small>
                    </div>
                    <Dropdown dropdownItems={strogeOptions} dataBsToggle='offcanvas' id={id} onClick={handleDelete} />
                </div>
            </div>
        </div>
    )
}

export default RecentFileCard
