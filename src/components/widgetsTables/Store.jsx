import React from 'react'
import CardHeader from '@/components/shared/CardHeader'
import CardLoader from '@/components/shared/CardLoader'
import useCardTitleActions from '@/hooks/useCardTitleActions'
import Pagination from '@/components/shared/Pagination'
import { FaStar } from "react-icons/fa";
import { FiArrowRight } from 'react-icons/fi'

const storeData = [
    { logo: '/images/logo/adwords.png', storeName: 'hazymemory.store', storeUrl: 'http://hazymemory.store', marketValue: '$86,954USD', reviews: '5,698', badgeText: 'Trending', badgeColor: 'primary' },
    { logo: '/images/logo/app-store.png', storeName: 'slickthings.store', storeUrl: 'http://slickthings.store', marketValue: '$77,597USD', reviews: '7,875', badgeText: 'Topper', badgeColor: 'success' },
    { logo: '/images/logo/google-wallet.png', storeName: 'southernstyle.store', storeUrl: 'http://southernstyle.store', marketValue: '$67,578USD', reviews: '9,748', badgeText: 'Feature', badgeColor: 'warning' },
    { logo: '/images/logo/pawprint.png', storeName: 'happydesire.store', storeUrl: 'http://happydesire.store', marketValue: '$60,447USD', reviews: '6,425', badgeText: 'Exclusive', badgeColor: 'danger' },
    { logo: '/images/logo/shopping.png', storeName: 'alikedesire.store', storeUrl: 'http://alikedesire.store', marketValue: '$59,697USD', reviews: '4,968', badgeText: 'Trending', badgeColor: 'primary' },
]
const Store = ({ title }) => {
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
                                    <th>Store</th>
                                    <th>Market Value</th>
                                    <th>Reviews</th>
                                    <th className="text-end">Status</th>
                                    <th className="text-end">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {storeData.map(({ badgeColor, badgeText, logo, marketValue, reviews, storeName, storeUrl }, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="avatar-image">
                                                    <img src={logo} alt="img" className="img-fluid" />
                                                </div>
                                                <div>
                                                    <a href="#" className="text-dark d-block">{storeName}</a>
                                                    <span className="fs-12 text-muted">{storeUrl}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <a href="#" className="fw-bold">{marketValue}</a>
                                            </div>
                                            <div>
                                                <span className="fs-12 text-muted">Market Values</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex gap-1 mb-1">
                                                {[...Array(5)].map((_, index) => (
                                                    <i key={index} className="text-warning fs-13"><FaStar /> </i>
                                                ))}
                                            </div>
                                            <div>
                                                <span className="fs-12 text-muted">{reviews} Reviews</span>
                                            </div>
                                        </td>
                                        <td className="text-end"><span className={`badge bg-soft-${badgeColor} text-${badgeColor}`}>{badgeText}</span></td>
                                        <td className="text-end">
                                            <a href="#" className="avatar-text avatar-md ms-auto"><FiArrowRight/></a>
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

export default Store
