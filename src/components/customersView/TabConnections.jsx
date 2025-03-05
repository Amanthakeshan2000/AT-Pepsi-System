import React, { useState } from 'react'
import { developementConnectionsData } from '@/utils/fackData/developementConnectionsData';
import { socialConnectionsData } from '@/utils/fackData/socialConnectionsData';


const TabConnections = () => {
    return (
        <div className="tab-pane fade" id="connectionTab" role="tabpanel">
            <div className="development-connections p-4 pb-0">
                <div className="mb-4 d-flex align-items-center justify-content-between">
                    <h5 className="fw-bold">Developement Connections:</h5>
                    <a href="#" className="btn btn-sm btn-light-brand">View Alls</a>
                </div>
                {developementConnectionsData.map((service, index) => (
                    <Card
                        key={index}
                        imgSrc={service.imgSrc}
                        title={service.title}
                        description={service.description}
                        isChecked={service.isChecked}
                    />
                ))}
            </div>
            <hr />
            <div className="social-connections px-4 mb-4">
                <div className="mb-4 d-flex align-items-center justify-content-between">
                    <h5 className="fw-bold">Social Connections:</h5>
                    <a href="#" className="btn btn-sm btn-light-brand">View Alls</a>
                </div>
                {socialConnectionsData.map((service, index) => (
                    <Card
                        key={index}
                        imgSrc={service.imgSrc}
                        title={service.title}
                        description={service.description}
                        isChecked={service.isChecked}
                    />
                ))}
            </div>
        </div>
    )
}

export default TabConnections



const Card = ({ imgSrc, title, description, isChecked }) => {
    return (
        <div className="hstack justify-content-between p-4 mb-3 border border-dashed border-gray-3 rounded-1">
            <div className="hstack me-4">
                <div className="wd-40">
                    <img src={imgSrc} className="img-fluid" alt="" />
                </div>
                <div className="ms-4">
                    <a href="#" className="fw-bold mb-1 text-truncate-1-line">{title}</a>
                    <div className="fs-12 text-muted text-truncate-1-line">{description}</div>
                </div>
            </div>
            <div className="form-check form-switch form-switch-sm">
                <label className="form-check-label fw-500 text-dark c-pointer" htmlFor={`formSwitch${title.replace(/\s+/g, '')}`}></label>
                <input
                    className="form-check-input c-pointer"
                    type="checkbox"
                    id={`formSwitch${title.replace(/\s+/g, '')}`}
                    defaultChecked={isChecked}
                />
            </div>
        </div>
    );
};

