import React, { Fragment } from 'react'
import CardHeader from '@/components/shared/CardHeader';
import useCardTitleActions from '@/hooks/useCardTitleActions';
import { FiArrowRight, FiClock, FiEye, FiMessageSquare, FiScissors, FiShare2, FiX } from 'react-icons/fi';
import CardLoader from '@/components/shared/CardLoader';
import { userList } from '@/utils/fackData/userList';
import Dropdown from '@/components/shared/Dropdown';

const options = [
    { label: "Open", icon: <FiEye /> },
    { label: "Share", icon: <FiShare2 /> },
    { label: "Backup", icon: <FiScissors /> },
    { type: "divider" },
    { label: "Delete", icon: <FiX /> },
]

const UsersList = ({ title }) => {
    const data = userList(0, 6)
    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();

    if (isRemoved) {
        return null;
    }
    return (
        <div className="col-xxl-4 col-lg-6">
            <div className={`card stretch stretch-full ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
                <CardHeader title={title} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} />
                <div className="card-body custom-card-action">
                    {data.map(({ id, user_email, user_img, user_name }, index) => (
                        <Fragment key={id}>
                            <div className="w-100 d-flex align-items-center justify-content-between chat-single-item">
                                <div className="d-flex align-items-center">
                                    {
                                        user_img ?
                                            <div className="avatar-image me-3">
                                                <img src={user_img} alt="img" className="img-fluid rounded-circle" />
                                            </div>
                                            :
                                            <div className="text-white avatar-text user-avatar-text  me-3">{user_name.substring(0, 1)}</div>
                                    }
                                    <div>
                                        <a href="#" className="d-flex align-items-center mb-1">{user_name}</a>
                                        <div className="fs-12 fw-normal text-muted">{user_email}</div>
                                    </div>
                                </div>
                                <Dropdown
                                    dropdownItems={options}
                                    dropdownParentStyle={"hstack text-end justify-content-end"}
                                    triggerClass='avatar-md'
                                />
                            </div>
                            {data.length - 1 === index ? "" : <hr className="border-dashed my-3" />}
                        </Fragment>
                    ))}
                </div>


                <a href="#" className="card-footer fs-11 fw-bold text-uppercase text-center">Refresh</a>
                <CardLoader refreshKey={refreshKey} />
            </div>
        </div>

    )
}

export default UsersList
