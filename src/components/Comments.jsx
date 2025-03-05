import React, { Fragment } from 'react'
import { FiBellOff, FiEyeOff, FiFlag, FiMoreHorizontal, FiSlash } from 'react-icons/fi';
import { tasksCommentsData } from '../utils/fackData/tasksListData';
import Dropdown from './shared/Dropdown';
const Comments = () => {
    return (
        <>
            {
                tasksCommentsData.map(({ comments, like, replies, time, user_img, user_name }, index) => {
                    return (
                        <Fragment key={index}>
                            <CommentCard user_img={user_img} user_name={user_name} like={like} comments={comments} time={time} replies={replies} />
                            {
                                replies.length ?
                                    <div className="ms-4">
                                        <div className="ms-4">
                                            {
                                                replies.slice(0, 2).map(({ replie, like, time, user_img, user_name, replies }, index) =>
                                                    <CommentCard key={index} user_img={user_img} user_name={user_name} like={like} comments={replie} time={time} replies={replies} />
                                                )
                                            }
                                            {
                                                replies.length > 2
                                                    ?
                                                    <div className="ms-4 mb-4">
                                                        <a
                                                            href="#"
                                                            className="d-flex align-items-center text-muted"
                                                        >
                                                            <FiMoreHorizontal className='fs-12' />
                                                            <span className="fs-10 text-uppercase ms-2 text-truncate-1-line">
                                                                Load More Replies
                                                            </span>
                                                        </a>
                                                    </div>
                                                    :
                                                    ""
                                            }

                                        </div>
                                    </div>
                                    :
                                    ""
                            }
                        </Fragment>
                    )
                })
            }
        </>
    )
}

export default Comments


const CommentCard = ({ user_img, user_name, like, comments, time, replies }) => {
    const commentOptions = [
        { label: "Mute", icon: <FiBellOff /> },
        { label: "Hide", icon: <FiEyeOff /> },
        { label: "Block", icon: <FiSlash /> },
        { label: "Report", icon: <FiFlag /> },
    ]
    return (
        <div className="d-flex mb-4">
            <div className="avatar-image me-3">
                <a href="#">
                    <img
                        src={user_img}
                        className="img-fluid"
                        alt=""
                    />
                </a>
            </div>
            <div className="">
                <a
                    href="#"
                    className="mb-1 d-flex align-items-center"
                >
                    <span>{user_name}</span>
                    <span className="wd-3 ht-3 bg-gray-500 rounded-circle d-flex mx-2 d-none d-sm-block" />
                    <span className="fs-10 text-uppercase text-muted d-none d-sm-block">
                        {time}
                    </span>
                </a>
                <div className="d-flex align-items-center">
                    <p className="fs-12 text-dark p-3 bg-gray-200 rounded-3 mb-0">{comments}</p>
                    <Dropdown dropdownItems={commentOptions} dropdownParentStyle={"ms-2"} />
                </div>
                <div className="fs-10 text-uppercase d-flex align-items-center mt-2">
                    <a href="#" className="text-muted">
                        Like {like ? `(${like})` : ""}
                    </a>
                    <span className="wd-3 ht-3 bg-gray-500 rounded-circle d-flex mx-2" />
                    <a href="#" className="text-muted">
                        Reply
                    </a>
                    <span className="wd-3 ht-3 bg-gray-500 rounded-circle d-flex mx-2" />
                    <a href="#" className="text-muted">
                        {replies.length ? `${replies.length} Replies` : ""}
                    </a>
                </div>
            </div>
        </div>
    )
}