import React from 'react'
import { Link } from 'react-router-dom'
import CardHeader from '@/components/shared/CardHeader'
import { browserList } from '@/utils/fackData/browserList'
import useCardTitleActions from '@/hooks/useCardTitleActions'
import CardLoader from '@/components/shared/CardLoader'
import getIcon from '@/utils/getIcon'
import HorizontalProgress from '@/components/shared/HorizontalProgress'

const Browser = ({title}) => {
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
                        <table className="table table-hover mb-0">
                            <tbody>
                                {
                                    browserList.map(({ browser_name, id, total_user, icon, iconColor, progressColor }) =>
                                        <tr key={id}>
                                            <td>
                                                <Link to="#">
                                                    <i className={`fs-16 text-primary me-2 text-${iconColor}`}>{getIcon(icon)}</i>
                                                    <span>{browser_name}</span>
                                                </Link>
                                            </td>
                                            <td>
                                                <span className="text-end d-flex align-items-center m-0">
                                                    <span className="me-3">{total_user}%</span>
                                                    <HorizontalProgress progress={total_user} barHeight='w-100 ht-5' barColor={`bg-${progressColor}`} />
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <Link to="#" className="card-footer fs-11 fw-bold text-uppercase text-center">Explore Details</Link>
                <CardLoader refreshKey={refreshKey} />
            </div>
        </div>
    )
}

export default Browser

