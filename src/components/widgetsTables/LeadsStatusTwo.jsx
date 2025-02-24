import React from 'react'
import CardHeader from '@/components/shared/CardHeader'
import { leadsStatusData } from '@/utils/fackData/leadsStatusData'
import { Link } from 'react-router-dom'
import useCardTitleActions from '@/hooks/useCardTitleActions'
import CardLoader from '@/components/shared/CardLoader'

const LeadsStatusTwo = () => {
    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();

    if (isRemoved) {
        return null;
    }
    return (
        <div className="col-xxl-6">
            <div className={`card stretch stretch-full ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
                <CardHeader title={"Leads Status"} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand}/>
                <div className="card-body custom-card-action p-0">
                    <div className="table-responsive">
                        <table className="table table-hover ">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col" className="wd-100">Sale Rep.</th>
                                    <th scope="col">Contacted</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    leadsStatusData.map(({ date, id, img, name, status, value, badgeColor }) => (
                                        <tr key={id} className='leads-status'>
                                            <td className="position-relative">
                                                <div className={`ht-50 position-absolute start-0 top-50 translate-middle rounded border-start border-5 border-${badgeColor}`}></div>
                                                <Link to="#">{name}</Link>
                                            </td>
                                            <td>
                                                <Link to="#" className="avatar-image avatar-md">
                                                    <img src={img} alt="img" className="img-fluid" />
                                                </Link>
                                            </td>
                                            <td>{date}</td>
                                            <td>
                                                <Link to="#" className={`badge bg-soft-${badgeColor} text-${badgeColor}`}>{status}</Link>
                                            </td>
                                            <td><Link href="#">${value}</Link></td>
                                        </tr>
                                    )
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <Link to="#" className="card-footer fs-11 fw-bold text-uppercase text-center">Update: 30 Min Ago</Link>
                <CardLoader refreshKey={refreshKey} />
            </div>
        </div>
    )
}

export default LeadsStatusTwo
