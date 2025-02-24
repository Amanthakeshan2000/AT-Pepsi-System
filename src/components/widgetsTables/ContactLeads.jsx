import React from 'react'
import CardHeader from '@/components/shared/CardHeader'
import Pagination from '@/components/shared/Pagination'
import CardLoader from '@/components/shared/CardLoader'
import useCardTitleActions from '@/hooks/useCardTitleActions'


const contactData = [
    { name: 'Archie Tones', email: 'archie.tones@emial.com', avatar: '/images/avatar/12.png', date: '15 June, 2023', status: 'Deal Won', amount: '$15.65K', color:"success" },
    { name: 'Holmes Cherry', email: 'holmes.cherry@emial.com', avatar: '/images/avatar/11.png', date: '20 June, 2023', status: 'Intro Call', amount: '$10.24K', color:"warning" },
    { name: 'Kenneth Hune', email: 'kenneth.hune@emial.com', avatar: '/images/avatar/10.png', date: '18 June, 2023', status: 'Stuck', amount: '$12.47K', color:"primary" },
    { name: 'Malanie Hanvey', email: 'malanie.hanvey@emial.com', avatar: '/images/avatar/9.png', date: '22 June, 2023', status: 'Cancelled', amount: '$10.88K', color:"danger" },
    { name: 'Valentine Maton', email: 'valentine.maton@emial.com', avatar: '/images/avatar/8.png', date: '25 June, 2023', status: 'Progress', amount: '$13.85K', color:"primary" },
];

const ContactLeads = ({ title }) => {
    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();

    if (isRemoved) {
        return null;
    }
    return (
        <div className="col-lg-8">
            <div className={`card stretch stretch-full ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
                <CardHeader title={title} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} />

                <div className="card-body custom-card-action p-0">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead>
                                <tr>
                                    <th scope="col">Clients</th>
                                    <th scope="col" className="wd-100">Sale Rep.</th>
                                    <th scope="col">Contacted</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contactData.map((contact, index) => (
                                    <tr key={index} className=''>
                                        <td className={`position-relative`}>
                                            <div className={`ht-50 position-absolute start-0 top-50 translate-middle border-start border-5 border-${contact.color}`} />
                                            <div className="hstack gap-3">
                                                <div className="avatar-image rounded">
                                                    <img className="img-fluid" src={contact.avatar} alt={"user"} />
                                                </div>
                                                <div>
                                                    <a href="#" className="d-block">{contact.name}</a>
                                                    <span className="fs-12 text-muted">{contact.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <a href="#" className="avatar-image avatar-md">
                                                <img src={contact.avatar} alt={"user"} className="img-fluid" />
                                            </a>
                                        </td>
                                        <td>{contact.date}</td>
                                        <td>
                                            <a href="#" className={`badge bg-soft-${contact.color} text-${contact.color}`}>{contact.status}</a>
                                        </td>
                                        <td><a href="#">{contact.amount}</a></td>
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

export default ContactLeads
