import React, { useState } from 'react'

const AddsNote = () => {
    const [title, setTitle] = useState("")
    return (
        <div
            className="modal fade"
            id="addNewNotes"
            tabIndex={-1}
            data-bs-keyboard="false"
            role="dialog"

        >
            <div
                className="modal-dialog modal-dialog-scrollable modal-dialog-centered"
                role="document"
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalTitleId">
                            Add Notes
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        />
                    </div>
                    <div className="modal-body">
                        <div className="notes-box">
                            <div className="notes-content">
                                <form action="#" id="addnotesmodalTitle">
                                    <div className="row">
                                        <div className="col-md-12 mb-3">
                                            <div className="note-title">
                                                <label className="form-label">Note Title</label>
                                                <input
                                                    type="text"
                                                    id="note-has-title"
                                                    className="form-control"
                                                    minLength={25}
                                                    placeholder="Title"
                                                    defaultValue={title}
                                                    onChange={(e) => setTitle(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="note-description">
                                                <label className="form-label">Note Description</label>
                                                <textarea
                                                    id="note-has-description"
                                                    className="form-control"
                                                    minLength={60}
                                                    placeholder="Description"
                                                    rows={5}
                                                    defaultValue={""}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        {/* <button id="btn-n-save" className="float-left btn btn-success">
                            Save
                        </button> */}
                        <button className="btn btn-danger" data-bs-dismiss="modal">
                            Discard
                        </button>
                        <button className="btn btn-success" data-bs-dismiss="modal" disabled={title.length < 2 ? "disabled" : ""}>
                            Add Note
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AddsNote