import React from 'react'
import { Link } from 'react-router-dom'
import { appsList } from './itemsList'


const MegaMenuIntegrationsTab = () => {
    return (
        <div className="tab-pane fade" id="v-pills-integrations" role="tabpanel">
            <div className="row g-lg-4 nxl-mega-menu-integrations">
                <div className="col-lg-12 d-lg-flex align-items-center justify-content-between mb-4 mb-lg-0">
                    <div>
                        <h6 className="fw-bolder text-dark">Integrations</h6>
                        <p className="fs-12 text-muted mb-0">Connect amazing apps on your bucket.</p>
                    </div>
                    <div className="mt-2 mt-lg-0">
                        <a href="#" className="fs-13 text-primary">Add New &rarr;</a>
                    </div>
                </div>
                {
                    appsList.map(({ col }, index) => {
                        return (
                            <div key={index} className="col-lg-4">
                                {
                                    col.map(({app_name, icon}) => {
                                        return (
                                            <Link key={app_name} to="#" className="dropdown-item">
                                                <div className="menu-item-icon">
                                                    <img src={icon} alt="img" className="img-fluid" />
                                                </div>
                                                <div className="menu-item-title">{app_name}</div>
                                                <div className="menu-item-arrow">
                                                    <i className="feather-arrow-right"></i>
                                                </div>
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
            <hr className="border-top-dashed" />
            <p className="fs-13 text-muted mb-0">Need help? Contact our <Link to="#" className="fst-italic">support center</Link></p>
        </div>
    )
}

export default MegaMenuIntegrationsTab