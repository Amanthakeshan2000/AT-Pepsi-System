import React from 'react'
import Comments from '../Comments'

const CommentTabContent = () => {
    return (
        <div className="tab-pane fade" id="commentTab">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card stretch stretch-full">
                        <div className="card-body">
                            <div className="task-comment pb-4">
                                <div className="mb-2 d-flex align-items-center justify-content-between">
                                    <div>
                                        <h5>Comments:</h5>
                                        <p className="fs-12 text-muted mb-0">Responses for this tasks</p>
                                    </div>
                                    <a href="#" className="">6 Comments </a>
                                </div>
                                <hr className="border-dashed my-4" />

                                <Comments />
                            </div>
                            <div className="input-group mb-4">
                                <input type="text" name="name" id="name" className="form-control" placeholder="Your comment..." aria-describedby="suffixId" />
                                <a href="#" className="input-group-text" id="suffixId">Submit</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentTabContent