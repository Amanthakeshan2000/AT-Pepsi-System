import React from 'react'
import CardHeader from '@/components/shared/CardHeader'
import { Link } from 'react-router-dom'
import { CircularProgressbar } from 'react-circular-progressbar'
import CardLoader from '@/components/shared/CardLoader'
import getIcon from '@/utils/getIcon'
import useCardTitleActions from '@/hooks/useCardTitleActions'

const ForecasRevenuetMiscellaneous = () => {
    const percent = 63
    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();

    if (isRemoved) {
        return
    }
    return (
        <div className="col-xxl-4">
            {isRemoved ? "" :
                <div className={`card stretch stretch-full ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
                    <CardHeader title={"Revenue Forecast"} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} />

                    <div className="card-body custom-card-action">
                        <div className="text-center mb-4">
                            <div className="revenue-progress">
                                <CircularProgressbar
                                    value={percent}
                                    text={`${percent}%`}
                                    background
                                    // backgroundPadding={5}
                                    styles={{
                                        path: {
                                            transition: "stroke-dashoffset 0.5s ease"
                                        },
                                    }}
                                />
                            </div>
                        </div>
                        <div className="row g-4">
                            <Card icon='feather-activity' name={"Marketing Gaol"} revenue={"$550/$1250"} />
                            <Card icon='feather-users' name={"Teams Goal"} revenue={"$550/$1250"} />
                            <Card icon='feather-check-circle' name={"Teams Goal"} revenue={"$850/$950"} />
                            <Card icon='feather-dollar-sign' name={"Revenue Goal"} revenue={"$5,655/$12,500"} />
                        </div>
                        <CardLoader refreshKey={refreshKey} />
                    </div>
                    <div className="card-footer">
                        <Link to="#" className="btn btn-primary">Generate Report</Link>
                    </div>
                </div>
            }
        </div>
    )
}

export default ForecasRevenuetMiscellaneous

const Card = ({ name, revenue, icon }) => {
    return (
        <div className="col-sm-6">
            <div className="px-4 py-3 text-center border border-dashed rounded-3">
                <div className="avatar-text bg-gray-200 mx-auto mb-2">
                    {React.cloneElement(getIcon(icon), { size: "16" })}
                </div>
                <h2 className="fs-13 tx-spacing-1">{name}</h2>
                <div className="fs-11 text-muted">{revenue} USD</div>
            </div>
        </div>
    )
}