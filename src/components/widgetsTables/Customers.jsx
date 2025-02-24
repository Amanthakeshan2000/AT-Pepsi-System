import React from 'react'
import CardHeader from '@/components/shared/CardHeader'
import CardLoader from '@/components/shared/CardLoader'
import useCardTitleActions from '@/hooks/useCardTitleActions'
import Pagination from '@/components/shared/Pagination'
import Dropdown from '@/components/shared/Dropdown'

const actionOptions = [
    { label: "View User" },
    { label: "Delete User" },
]
const customerData = [
    { name: 'Amantha Keshan', email: 'alex.della@email.com', avatar: '/images/avatar/1.png', flag: '/images/flags/1x1/us.svg', country: 'United States', cardNumber: '****6231', date: '21 Sep, 2023' },
    { name: 'Valentine Maton', email: 'valentine.maton@email.com', avatar: '/images/avatar/2.png', flag: '/images/flags/1x1/gb.svg', country: 'United Kingdom', cardNumber: '****8563', date: '25 Sep, 2023' },
    { name: 'Kenneth Hune', email: 'kenneth.hune@email.com', avatar: '/images/avatar/3.png', flag: '/images/flags/1x1/fr.svg', country: 'France', cardNumber: '****4524', date: '16 Sep, 2023' },
    { name: 'Malanie Hanvey', email: 'malanie.hanvey@email.com', avatar: '/images/avatar/4.png', flag: '/images/flags/1x1/de.svg', country: 'Germany', cardNumber: '****3486', date: '20 Sep, 2023' },
    { name: 'Archie Cantones', email: 'archie.cantones@email.com', avatar: '/images/avatar/5.png', flag: '/images/flags/1x1/bd.svg', country: 'Bangladesh', cardNumber: '****7896', date: '20 Sep, 2023' },
];

const Customers = ({ title }) => {
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
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Country</th>
                                    <th>Payment method</th>
                                    <th>Created Date</th>
                                    <th className="text-end">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customerData.map((customer, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="avatar-image">
                                                    <img src={customer.avatar} className="img-fluid" alt="Customer" />
                                                </div>
                                                <div>
                                                    <a href="#">{customer.name}</a>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{customer.email}</td>
                                        <td>
                                            <div className="hstack gap-2">
                                                <div className="avatar-image avatar-sm">
                                                    <img src={customer.flag} className="img-fluid" alt="img" />
                                                </div>
                                                <span className="d-inline-block align-middle">{customer.country}</span>
                                            </div>
                                        </td>
                                        <td><span>{customer.cardNumber}</span></td>
                                        <td>{customer.date}</td>
                                        <td className="text-end">
                                            <Dropdown dropdownItems={actionOptions} triggerClass='avatar-md ms-auto' />
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

export default Customers
