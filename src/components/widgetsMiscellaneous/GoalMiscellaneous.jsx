import React from 'react'
import { Link } from 'react-router-dom';
import CardHeader from '@/components/shared/CardHeader'
import CircleProgress from '@/components/shared/CircleProgress';
import CardLoader from '@/components/shared/CardLoader';
import useCardTitleActions from '@/hooks/useCardTitleActions';

const goalData = [
    { value: 40, revenue: "$550/$1250", title: "Marketing Goal", color: "#ea4d4d" },
    { value: 65, revenue: "$550/$1250", title: "Teams Goal", color: "#3454d1" },
    { value: 50, revenue: "$850/$950", title: "Leads Goal", color: "#ffa21d" },
    { value: 75, revenue: "$5,655/$12,500", title: "Revenue Goal", color: "#17c666" }
];

const GoalMiscellaneous = () => {
    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();

    if (isRemoved) {
        return null;
    }
    return (
        <div className="col-xxl-4">
            <div className={`card stretch stretch-full ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
                <CardHeader title={"Goal Progress"} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} />

                <div className="card-body custom-card-action">
                    <div className="row g-4">
                        {goalData.map(({ color, revenue, title, value }, index) => (
                            <div key={index} className="col-sm-6">
                                <div className="px-4 py-3 text-center border border-dashed rounded-3 goal-card">
                                    <div className="mx-auto mb-4">
                                        <CircleProgress value={value} text_sym={"%"} path_color={color} />
                                    </div>
                                    <h2 className="fs-13 tx-spacing-1">{title}</h2>
                                    <div className="fs-11 text-muted text-truncate-1-line">{revenue} USD</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="card-footer">
                    <Link to="#" className="btn btn-primary">Generate Report</Link>
                </div>
            </div>
            <CardLoader refreshKey={refreshKey} />
        </div>
    )
}

export default GoalMiscellaneous


