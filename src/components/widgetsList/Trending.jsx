import React, { Fragment } from 'react'
import CardHeader from '@/components/shared/CardHeader';
import useCardTitleActions from '@/hooks/useCardTitleActions';
import CardLoader from '@/components/shared/CardLoader';
import getIcon from '@/utils/getIcon';

const trendingItemsData = [
    { color: 'primary', icon: 'feather-airplay', title: 'Weekly Bestseller', names: 'Mark, Rowling, Esther', amount: '$99,685', salesCount: '698' },
    { color: 'success', icon: 'feather-award', title: 'Feature Sellers', names: 'Randy, Steve, Mike', amount: '$95,685', salesCount: '457' },
    { color: 'danger', icon: 'feather-user-check', title: 'Popular Authors', names: 'John, Pat, Jimmy', amount: '$90,759', salesCount: '447' },
    { color: 'warning', icon: 'feather-bar-chart-2', title: 'Average Bestseller', names: 'John, Pat, Jimmy', amount: '$92,569', salesCount: '334' },
    { color: 'indigo', icon: 'feather-users', title: 'New Sellers', names: 'Randy, Steve, Mike', amount: '$75,478', salesCount: '320' },
];

const Trending = ({ title }) => {

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
                        trendingItemsData.map(({ amount, color, icon, names, salesCount, title }, index) => {
                            return (
                                <Fragment key={index}>
                                    <div className="d-md-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <div className={`avatar-text avatar-lg bg-soft-${color} text-${color} border-soft-${color} rounded me-3`}>
                                                {React.cloneElement(getIcon(icon), { size: "16" })}
                                            </div>
                                            <div>
                                                <a href="#">{title}</a>
                                                <p className="fs-12 text-muted mb-0">{names}</p>
                                            </div>
                                        </div>
                                        <div className="mt-2 mt-md-0 text-md-end mg-l-60 ms-md-0">
                                            <a href="#" className="fw-bold d-block">{amount}</a>
                                            <span className="fs-12 text-muted">{salesCount} Sales</span>
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

export default Trending

