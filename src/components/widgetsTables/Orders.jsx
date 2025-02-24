import React from 'react'
import CardHeader from '@/components/shared/CardHeader'
import CardLoader from '@/components/shared/CardLoader'
import useCardTitleActions from '@/hooks/useCardTitleActions'
import { productsData } from '@/utils/fackData/productsData'
import { FiEdit, FiEye, FiTrash2 } from 'react-icons/fi'
import Pagination from '@/components/shared/Pagination'



const Orders = ({ title }) => {
    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();

    if (isRemoved) {
        return null;
    }

    return (
        <div className="col-xxl-12">
            <div className={`card stretch stretch-full widget-tasks-content ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
                <CardHeader title={title} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} />

                <div className="card-body custom-card-action p-0">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead>
                                <tr>
                                    <th>Order Id</th>
                                    <th>Country</th>
                                    <th>Date</th>
                                    <th>Company</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productsData.map((product, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className="hstack gap-3">
                                                <div className="avatar-image avatar-lg rounded">
                                                    <img className="img-fluid" src={product.image} alt={product.name} />
                                                </div>
                                                <div>
                                                    <a href="#" className="d-block">{product.name}</a>
                                                    <span className="fs-12 text-muted">{product.category}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <a href="#" className="d-block mb-1">{product.location}</a>
                                            <span className="fs-12 text-muted d-block">Code: PH</span>
                                        </td>
                                        <td>
                                            <a href="#" className="d-block mb-1">{product.date}</a>
                                            <span className="fs-12 text-muted d-block">Code: Paid</span>
                                        </td>
                                        <td>
                                            <a href="#" className="d-block mb-1">{product.company}</a>
                                            <span className="fs-12 text-muted d-block">Web, UI/UX Design</span>
                                        </td>
                                        <td className="text-dark fw-bold">{product.totalPrice}</td>
                                        <td>
                                            <span className={`badge bg-soft-${product.color} text-${product.color}`}>{product.status}</span>
                                        </td>
                                        <td className="text-end">
                                            <div className="hstack gap-2 justify-content-end">
                                                <a href="#" className="avatar-text avatar-md">
                                                    <FiEye />
                                                </a>
                                                <a href="#" className="avatar-text avatar-md">
                                                    <FiEdit />
                                                </a>
                                                <a href="#" className="avatar-text avatar-md">
                                                    <FiTrash2 />
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="card-footer"> <Pagination /></div>
                <CardLoader refreshKey={refreshKey} />
            </div>
        </div>
    )
}

export default Orders
