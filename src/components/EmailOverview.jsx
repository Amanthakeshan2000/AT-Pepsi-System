import React from 'react'
import { Link } from 'react-router-dom'
import { emailList } from '../utils/fackData/emailList'
import getIcon from '../utils/getIcon'

const EmailOverview = () => {
    const data = emailList.overviews

    return (
        <div className="col-12">
            <div className="card stretch stretch-full">
                <div className="card-body">
                    <div className="hstack justify-content-between mb-4 pb-">
                        <div>
                            <h5 className="mb-1">Email Reports</h5>
                            <span className="fs-12 text-muted">Email Campaign Reports</span>
                        </div>
                        <Link to="#" className="btn btn-light-brand">View Alls</Link>
                    </div>
                    <div className="row">
                        {
                            data?.map(({ id, count, name, color, icon }) => {
                                return (
                                    <div key={id} className="col-xxl-2 col-lg-4 col-md-6 email-overview-card">
                                        <div className="card stretch stretch-full border border-dashed border-gray-5">
                                            <div className="card-body rounded-3 text-center">
                                                <i className={`fs-3 text-${color}`}>{getIcon(icon)}</i>
                                                <div className="fs-4 fw-bolder text-dark mt-3 mb-1">{count}</div>
                                                <p className="fs-12 fw-medium text-muted text-spacing-1 mb-0 text-truncate-1-line">{name}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmailOverview