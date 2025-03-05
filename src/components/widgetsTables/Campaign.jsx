import React from 'react'
import CardHeader from '@/components/shared/CardHeader'
import Pagination from '@/components/shared/Pagination'
import CardLoader from '@/components/shared/CardLoader'
import useCardTitleActions from '@/hooks/useCardTitleActions'
import { FiPause, FiPlay, FiStopCircle } from 'react-icons/fi'

const campaignData = [
    { brand: 'Facebook', image: '/images/brand/facebook.png', link: 'http://ads.facebook.com/#campaign', target: '50K', reach: '46.44K', progress: 92, status: 'Active', actions: ['Pause', 'Stop'], color: "primary" },
    { brand: 'Gmail', image: '/images/brand/gmail.png', link: 'http://ads.google.com/#campaign', target: '30K', reach: '22.82K', progress: 82, status: 'Paused', actions: ['Pause', 'Play'], color: "warning" },
    { brand: 'Twitter', image: '/images/brand/twitter.png', link: 'http://ads.twitter.com/#campaign', target: '40K', reach: '35.2K', progress: 88, status: 'Active', actions: ['Pause', 'Stop'], color: "primary" },
    { brand: 'Pinterest', image: '/images/brand/pinterest.png', link: 'http://ads.pinterest.com/#campaign', target: '60K', reach: '55.1K', progress: 91, status: 'Active', actions: ['Pause', 'Stop'], color: "success" },
    { brand: 'Instagram', image: '/images/brand/instagram.png', link: 'http://ads.instagram.com/#campaign', target: '25K', reach: '18.6K', progress: 74, status: 'Paused', actions: ['Pause', 'Play'], color: "primary" },
];

const Campaign = ({ title }) => {
    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();

    if (isRemoved) {
        return null;
    }
    return (
        <div className="col-xxl-8">
            <div className={`card stretch stretch-full ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
                <CardHeader title={title} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} />
                <div className="card-body custom-card-action p-0">
                    <div className="table-responsive mb-3">
                        <table className="table table-hover mb-0">
                            <thead>
                                <tr>
                                    <th>Campaign Name</th>
                                    <th>Conversions</th>
                                    <th className="text-end">Status</th>
                                    <th className="text-end">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {campaignData.map((campaign, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className="hstack gap-3">
                                                <div className="avatar-image">
                                                    <img src={campaign.image} alt="" className="img-fluid" />
                                                </div>
                                                <div>
                                                    <a href="#" className="d-block">{campaign.brand} Campaign</a>
                                                    <a href="#" className="fs-12 fw-normal text-muted d-block">{campaign.link}</a>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="fs-11 d-flex justify-content-between mb-1">
                                                <span>Target: {campaign.target}</span>
                                                <span>Reach: {campaign.reach}</span>
                                            </div>
                                            <div className="progress ht-3">
                                                <div className={`progress-bar bg-${campaign.color}`} role="progressbar" aria-valuenow={campaign.progress} aria-valuemin={0} aria-valuemax={100} style={{ width: `${campaign.progress}%` }} />
                                            </div>
                                        </td>
                                        <td className="text-end"><span className={`badge bg-soft-${campaign.color} text-${campaign.color}`}>{campaign.status}</span></td>
                                        <td className="text-end">
                                            <div className="hstack gap-2 justify-content-end">
                                                {campaign.actions.map((action, idx) => (
                                                    <a key={idx} href="#" className="avatar-text avatar-md" data-bs-toggle="tooltip" title={action}>
                                                        {action === "Pause" && <FiPause strokeWidth='1.6' size={13} />}
                                                        {action === "Stop" && <FiStopCircle strokeWidth='1.6' size={13} />}
                                                        {action === "Play" && <FiPlay strokeWidth='1.6' size={13} />}
                                                    </a>
                                                ))}
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

export default Campaign
