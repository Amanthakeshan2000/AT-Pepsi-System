import React from 'react'
import Dropdown from '@/components/shared/Dropdown';
import HorizontalProgress from '@/components/shared/HorizontalProgress';
import { FiClock } from 'react-icons/fi';

const CloudStorageCard = ({id, iconSrc, name, used, total, strogeOptions, lastActivity, progressColor, handleDelete }) => {

    return (
        <div className="card mb-4 stretch stretch-full">
            <div className="card-body">
                <div className="d-flex align-items-center justify-content-between storage-icon-name">
                    <div className="d-flex align-items-center">
                        <div className="p-2 avatar-image bg-gray-200 rounded-3">
                            <img src={iconSrc} className="img-fluid" alt="" />
                        </div>
                        <div className="d-block ms-3">
                            <a
                                href="#"
                                className="fs-13 fw-bold d-block text-truncate-1-line"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#fileFolderDetailsOffcanvas"
                            >
                                {name}
                            </a>
                            <small className="fw-normal text-muted text-truncate-1-line">
                                {used}GB / {total}GB
                            </small>
                        </div>
                    </div>
                    <Dropdown dropdownItems={strogeOptions} dataBsToggle='offcanvas' onClick={handleDelete} id={id} />
                </div>
                <div className="mt-4 storage-status">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                        <h2 className="fs-10 fw-bold text-uppercase tx-spacing-1 mb-0">Storage</h2>
                        <div className="fs-10 text-muted text-uppercase">
                            <span className="text-truncate-1-line">{used}GB used</span>
                        </div>
                    </div>
                    <HorizontalProgress progress={(used / total) * 100} barHeight='ht-5' barColor={progressColor} />
                    <div className="d-flex align-items-center mt-2">
                        <FiClock className='fs-10 text-muted me-1 ' />
                        <div className="fs-11 fw-normal text-muted text-truncate-1-line">
                            Last Activity: {lastActivity}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CloudStorageCard
