import React, { useState } from 'react'
import CardHeader from '@/components/shared/CardHeader'
import CardLoader from '@/components/shared/CardLoader'
import useCardTitleActions from '@/hooks/useCardTitleActions'
import { FiMoreVertical } from 'react-icons/fi';

const trafficData = [
    { source: 'Organic', visits: 8965, percentVisits: '47.79%', percentBounce: '69.74%', avgSessionDuration: '2.76', avgTimeOnPage: '00:05:37', percentConversion: '2.00%', color: 'warning' },
    { source: 'Referral', visits: 3698, percentVisits: '14.79%', percentBounce: '61.80%', avgSessionDuration: '6.76', avgTimeOnPage: '00:06:37', percentConversion: '3.48%', color: 'primary' },
    { source: 'Direct', visits: 6542, percentVisits: '68.79%', percentBounce: '47.47%', avgSessionDuration: '2.58', avgTimeOnPage: '00:04:58', percentConversion: '6.57%', color: 'success' },
    { source: 'Affiliate', visits: 5896, percentVisits: '65.54%', percentBounce: '46.47%', avgSessionDuration: '3.48', avgTimeOnPage: '00:04:37', percentConversion: '6.00%', color: 'danger' },
    { source: 'Email', visits: 1597, percentVisits: '14.41%', percentBounce: '45.80%', avgSessionDuration: '5.76', avgTimeOnPage: '00:04:47', percentConversion: '6.47%', color: 'info' },
    { source: 'Other', visits: 1597, percentVisits: '14.41%', percentBounce: '45.80%', avgSessionDuration: '5.76', avgTimeOnPage: '00:04:47', percentConversion: '6.47%', color: 'dark' },
];


const TrafficReports = ({ title }) => {
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
                            <thead className="thead-light">
                                <tr>
                                    <th>Source</th>
                                    <th>Sessions</th>
                                    <th>Changes</th>
                                    <th>Pages/Session</th>
                                    <th>Avg. Session</th>
                                    <th>Conversion Rate</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trafficData.map((data, index) => (
                                    <tr key={index}>
                                        <td>
                                            <a href="#">
                                                <span className={`wd-10 ht-10 bg-${data.color} me-2 d-inline-block rounded-circle`} />
                                                <span>{data.source}</span>
                                            </a>
                                        </td>
                                        <td>{data.visits} <small className="text-muted">({data.percentVisits})</small></td>
                                        <td>{data.percentBounce}</td>
                                        <td>{data.avgSessionDuration}</td>
                                        <td>{data.avgTimeOnPage}</td>
                                        <td>{data.percentConversion}</td>
                                        <td className="text-end">
                                            <a href="#">
                                                <FiMoreVertical />
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <CardLoader refreshKey={refreshKey} />
            </div>
        </div>
    )
}

export default TrafficReports
