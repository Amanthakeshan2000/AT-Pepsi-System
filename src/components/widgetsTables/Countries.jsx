import React from 'react'
import CardHeader from '@/components/shared/CardHeader'
import Pagination from '@/components/shared/Pagination'
import useCardTitleActions from '@/hooks/useCardTitleActions'
import CardLoader from '@/components/shared/CardLoader'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

const countriesData = [
    { name: 'United States', flag: '/images/flags/4x3/us.svg', percentage: '76.57%', count: '968k', trending: "up" },
    { name: 'India', flag: '/images/flags/4x3/in.svg', percentage: '35.00%', count: '758k', trending: "down" },
    { name: 'United Kingdom', flag: '/images/flags/4x3/gb.svg', percentage: '76.57%', count: '691k', trending: "down" },
    { name: 'Australia', flag: '/images/flags/4x3/au.svg', percentage: '35.00%', count: '558k', trending: "up" },
    { name: 'Bangladesh', flag: '/images/flags/4x3/bd.svg', percentage: '76.57%', count: '492k', trending: "down" },
    { name: 'Germany', flag: '/images/flags/4x3/de.svg', percentage: '35.00%', count: '387k', trending: "up" },
    { name: 'Turkey', flag: '/images/flags/4x3/tr.svg', percentage: '76.57%', count: '322k', trending: "down" }
]

const Countries = ({ title }) => {
    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();

    if (isRemoved) {
        return null;
    }

    return (
        <div className="col-xxl-4">
            <div className={`card stretch stretch-full ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
                <CardHeader title={title} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} />
                <div className="card-body custom-card-action p-0">
                    <div className="table-responsive mb-3">
                        <table className="table table-hover mb-0">
                            <tbody>
                                {countriesData.map(({ count, flag, name, percentage, trending }, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className="hstack gap-3">
                                                <div className="wd-30">
                                                    <img src={flag} alt="" className="img-fluid rounded" />
                                                </div>
                                                <div>
                                                    <a href="#" className="d-block">{name}</a>
                                                </div>
                                            </div>
                                        </td>
                                        {
                                            trending === "up" ?
                                                <td className={'text-success'}>
                                                    <i className={`fs-12 me-1`} ><FiChevronUp /></i>
                                                    {percentage}
                                                </td>
                                                :
                                                <td className={'text-danger'}>
                                                    <i className={`fs-12 me-1`} ><FiChevronDown /></i>
                                                    {percentage}
                                                </td>
                                        }
                                        <td className="fw-bold">{count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="card-footer">
                    <Pagination />
                </div>
                <CardLoader refreshKey={refreshKey} />
            </div>
        </div>
    )
}

export default Countries
