import React from 'react'
import CardHeader from '@/components/shared/CardHeader'
import Pagination from '@/components/shared/Pagination'
import CardLoader from '@/components/shared/CardLoader'
import useCardTitleActions from '@/hooks/useCardTitleActions'

const supportData = [
    { name: 'Alexandra Della', message: "My item doesn't ship to correct address", avatar: '/images/avatar/1.png', time: '2 hours ago' },
    { name: 'Green Cute', message: 'Can you please refund back my money', avatar: '/images/avatar/2.png', time: '3 hours ago' },
    { name: 'Marianne Audrey', message: 'You shipped the wrong color, I need it to be', avatar: '/images/avatar/3.png', time: '4 hours ago' },
    { name: 'Holland Scott', message: 'Thank you very much for quick support!', avatar: '/images/avatar/4.png', time: '5 hours ago' },
    { name: 'Gregory Miller', message: 'You shipped the wrong color, I need it to be', avatar: '/images/avatar/5.png', time: '6 hours ago' }
];

const Support = ({ title }) => {
    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();

    if (isRemoved) {
        return null;
    }
    return (
        <div className="col-xxl-4">
            <div className={`card stretch stretch-full ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
                <CardHeader title={title} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} />
                <div className="card-body custom-card-action p-0">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Clients</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {supportData.map((data, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className="hstack gap-3">
                                                <div className="avatar-image rounded">
                                                    <img className="img-fluid" src={data.avatar} alt={data.name} />
                                                </div>
                                                <div>
                                                    <a href="#" className="d-block">{data.name}</a>
                                                    <span className="fs-12 text-muted">{data.message}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td><a href="#" className="btn btn-sm bg-soft-primary text-primary">{data.time}</a></td>
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

export default Support
