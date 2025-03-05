import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import CardHeader from '@/components/shared/CardHeader'
import useCardTitleActions from '@/hooks/useCardTitleActions'
import CardLoader from '@/components/shared/CardLoader'
import { FiPlus, FiUserPlus } from 'react-icons/fi'
import getIcon from '@/utils/getIcon'
import { userList } from '@/utils/fackData/userList'
import { teamMembersList } from '@/utils/fackData/teamMembersList'

const socialLinks = [
    { icon: 'feather-facebook', link: 'https://www.facebook.com/', text: 'https://www.facebook.com/', followers: '9.47K' },
    { icon: 'feather-twitter', link: 'https://www.twitter.com/', text: 'https://www.twitter.com/', followers: '8.38K' },
    { icon: 'feather-github', link: 'https://www.github.com/', text: 'https://www.github.com/', followers: '4.57K' },
    { icon: 'feather-linkedin', link: 'https://www.linkedin.com/', text: 'https://www.linkedin.com/', followers: '5.68K' },
    { icon: 'feather-gitlab', link: 'https://www.gitlab.com/', text: 'https://www.gitlab.com/', followers: '3.78K' },
    { icon: 'feather-figma', link: 'https://www.figma.com/', text: 'https://www.figma.com/', followers: '2.47K' }
];

const Suggestions = ({ title }) => {
    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();

    if (isRemoved) {
        return null;
    }
    return (
        <div className="col-xxl-4">
            <div className={`card stretch stretch-full ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
                <CardHeader title={title} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} />
                <div className="card-body custom-card-action ">
                    {
                        teamMembersList.map(({ id, position, name, thumbnail }, index) => (
                            <Fragment key={id}>
                                <div className="d-flex align-items-center chat-single-item">
                                    {
                                        thumbnail ?
                                            <div className="avatar-image flex-shrink-0 me-3">
                                                <img src={thumbnail} alt="img" className="img-fluid" />
                                            </div>
                                            :
                                            <div className="text-white avatar-text user-avatar-text flex-shrink-0 me-3">{name.substring(0, 1)}</div>
                                    }
                                    <div className="flex-grow-1">
                                        <div>
                                            <h5 className="fs-13 mb-1">{name}</h5>
                                            <p className="fs-12 text-muted mb-0">{position}</p>
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0 ms-2">
                                        <a href="#" className="avatar-text avatar-md"><i className="align-middle"><FiUserPlus /></i></a>
                                    </div>
                                </div>
                                {teamMembersList.length - 1 === index ? "" : <hr className="border-dashed my-3" />}
                            </Fragment>
                        ))
                    }

                </div>

                <Link to="#" className="card-footer fs-11 fw-bold text-uppercase text-center py-4"> <i className="me-2"><FiPlus size={16} /></i> Add New</Link>
                <CardLoader refreshKey={refreshKey} />
            </div>
        </div>
    )
}

export default Suggestions
