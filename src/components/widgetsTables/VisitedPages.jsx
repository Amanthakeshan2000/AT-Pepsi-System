import React from 'react'
import CardHeader from '@/components/shared/CardHeader'
import Pagination from '@/components/shared/Pagination'
import CardLoader from '@/components/shared/CardLoader'
import useCardTitleActions from '@/hooks/useCardTitleActions'

const tableData = [
    { page: '/app/widgets.html', visits: 2514, percentage: '23%', status: 'up' },
    { page: '/app/analytics.html', visits: 1912, percentage: '22%', status: 'up' },
    { page: '/app/index.html', visits: 1245, percentage: '14%', status: 'down' },
    { page: '/app/reports.html', visits: 458, percentage: '12%', status: 'up' },
    { page: '/app/chatting.html', visits: 1245, percentage: '14%', status: 'down' },
    { page: '/app/settings.html', visits: 458, percentage: '07%', status: 'up' },
    { page: '/app/documentations.html', visits: 1245, percentage: '10%', status: 'down' }
];

const VisitedPages = ({ title }) => {
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
                        <table className="align-middle mb-0 table">
                            <thead className="small text-uppercase text-body-secondary">
                                <tr>
                                    <th>Page</th>
                                    <th>Visitors</th>
                                    <th>Bounce</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((data, index) => (
                                    <tr key={index}>
                                        <td>{data.page}</td>
                                        <td>{data.visits}</td>
                                        <td>
                                            <span className={`align-middle material-symbols-rounded ms-1 text-${data.status === 'up' ? 'success' : 'danger'}`}>{data.percentage}</span>
                                            <i className={`feather-arrow-${data.status} text-${data.status === 'up' ? 'success' : 'danger'} fs-12 ms-1`}></i>
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

export default VisitedPages
