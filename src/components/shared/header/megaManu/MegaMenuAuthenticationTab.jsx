import React from 'react'
import { authenticationPageList, authenticationTabSlider } from './itemsList'
import { Link } from 'react-router-dom'
import MegaMenuSlider from './MegaMenuSlider'

const MegaMenuAuthenticationTab = () => {
    return (
        <div className="tab-pane fade" id="v-pills-authentication" role="tabpanel">
            <div className="row g-4 align-items-center nxl-mega-menu-authentication">
                <div className="col-xl-8">
                    <div className="row g-4">
                        {
                            authenticationPageList.map(({ col, title }) => {
                                return (
                                    <div key={title} className="col-lg-4">
                                        <h6 className="dropdown-item-title">{title}</h6>
                                        {
                                            col.map(({ page_name, path }) => {
                                                return (
                                                    <Link key={page_name} to={path} className="dropdown-item">
                                                        <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                                                        <span>{page_name}</span>
                                                    </Link>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
                <div className="col-xl-4">
                    <MegaMenuSlider />
                </div>
            </div>
        </div>
    )
}

export default MegaMenuAuthenticationTab