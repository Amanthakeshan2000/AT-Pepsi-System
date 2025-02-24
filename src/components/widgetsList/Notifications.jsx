import React, { Fragment } from 'react'
import CardHeader from '@/components/shared/CardHeader';
import useCardTitleActions from '@/hooks/useCardTitleActions';
import CardLoader from '@/components/shared/CardLoader';
import getIcon from '@/utils/getIcon';
import { FiArrowRight } from 'react-icons/fi';

const trendingItemsData = [
    { color: 'success', icon: 'feather-shopping-bag', title: 'Best Offers', description: 'Check our best new offers' },
    { color: 'primary', icon: 'feather-clipboard', title: 'Recent Invoices', description: 'Whole documentations' },
    { color: 'warning', icon: 'feather-star', title: 'Recent Feedback', description: 'All feeback from your clients' },
    { color: 'danger', icon: 'feather-message-square', title: 'Support Request', description: 'All request from your clients' },
    { color: 'teal', icon: 'feather-shopping-cart', title: 'New Order', description: 'All new order from your clients' },
];

const Notifications = ({ title }) => {

    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();

    if (isRemoved) {
        return null;
    }
    return (
        <div className="col-xxl-4 col-lg-6">
            <div className={`card stretch stretch-full ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
                <CardHeader title={title} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} />
                <div className="card-body custom-card-action">
                    {
                        trendingItemsData.map(({ color, icon, description, title }, index) => {
                            return (
                                <Fragment key={index}>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <div className={`avatar-text avatar-lg bg-soft-${color} text-${color} border-soft-${color} rounded me-3`}>
                                                {React.cloneElement(getIcon(icon), { size: "16" })}
                                            </div>
                                            <div>
                                                <a href="#">{title}</a>
                                                <p className="fs-12 text-muted mb-0">{description}</p>
                                            </div>
                                        </div>
                                        <div className="avatar-text avatar-md">
                                            <FiArrowRight />
                                        </div>
                                    </div>
                                    {trendingItemsData.length - 1 === index ? "" : <hr className="border-dashed my-3" />}
                                </Fragment>
                            )
                        })
                    }
                </div>

                <a href="#" className="card-footer fs-11 fw-bold text-uppercase text-center">Refresh</a>
                <CardLoader refreshKey={refreshKey} />
            </div>
        </div>

    )
}

export default Notifications

