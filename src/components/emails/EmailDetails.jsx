import React, { useState } from 'react'
import { FiArrowLeft, FiBell, FiFlag, FiPrinter, FiStar, FiTrash2 } from 'react-icons/fi'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import ComposeMailFooter from './ComposeMailFooter';
import ComposeMailForm from './ComposeMailForm';
import AccordionItem from './AccordionItem';
import { emailList } from '@/utils/fackData/emailList';
import { confirmDelete } from '@/utils/confirmDelete';
import topTost from '@/utils/topTost';

const EmailDetails = ({ setShowDetails }) => {
    const [value, setValue] = useState('');
    const handleDeleteMessage = () => {
        confirmDelete()
    };

    const handleClick = () => {
        topTost()
    };

    return (
        <div className="items-details" data-scrollbar-target="#psScrollbarInit">
            <div className="items-details-header bg-white sticky-top">
                <div className="d-flex align-items-center">
                    <div
                        onClick={() => setShowDetails(false)}
                        className="avatar-text avatar-md item-info-close"
                        data-bs-toggle="tooltip"
                        data-bs-trigger="hover"
                        title="Back"
                    >
                        <FiArrowLeft />
                    </div>
                    <span className="vr mx-4" />
                    <div className="d-flex align-items-center">
                        <h4 className="fw-bold mb-0 text-dark text-truncate-1-line">
                            [Update] Latest news updates on your subscribed channel
                        </h4>
                        <span className="vr mx-2 d-none d-sm-block" />
                        <span className="d-none d-sm-inline-flex gap-2">
                            <span className="badge bg-soft-primary text-primary">Product</span>
                            <span className="badge bg-soft-success text-success">Design</span>
                            <span className="badge bg-soft-danger text-danger">Office</span>
                        </span>
                    </div>
                </div>
                <div className="ms-4 d-none d-md-flex gap-1">
                    <a href="#" className="d-flex me-1" onClick={handleClick}>
                        <div
                            className="avatar-text avatar-md"
                            data-bs-toggle="tooltip"
                            data-bs-trigger="hover"
                            title="Print"
                        >
                            <FiPrinter strokeWidth={1.6} />
                        </div>
                    </a>
                    <a href="#" className="d-flex me-1" onClick={handleClick}>
                        <div
                            className="avatar-text avatar-md"
                            data-bs-toggle="tooltip"
                            data-bs-trigger="hover"
                            title="Snooze"
                        >
                            <FiBell strokeWidth={1.6} />
                        </div>
                    </a>
                    <a href="#" className="d-flex me-1" onClick={handleClick}>
                        <div
                            className="avatar-text avatar-md"
                            data-bs-toggle="tooltip"
                            data-bs-trigger="hover"
                            title="Favorite"
                        >
                            <FiStar strokeWidth={1.6} />
                        </div>
                    </a>
                    <a href="#" className="d-flex me-1" onClick={handleClick}>
                        <div
                            className="avatar-text avatar-md"
                            data-bs-toggle="tooltip"
                            data-bs-trigger="hover"
                            title="Flag"
                        >
                            <FiFlag strokeWidth={1.6} />
                        </div>
                    </a>
                    <a href="#" className="d-flex me-1" onClick={handleDeleteMessage}>
                        <div
                            className="avatar-text avatar-md"
                            data-bs-toggle="tooltip"
                            data-bs-trigger="hover"
                            title="Delete"
                        >
                            <FiTrash2 strokeWidth={1.6} />
                        </div>
                    </a>
                </div>
            </div>
            <div className="items-details-body">
                <div className="accordion">
                    {
                        emailList.prevSentEmail.map(({ date, details, id, message, user_email, user_img, user_name }, index) => (
                            <AccordionItem
                                key={id}
                                id={id}
                                headingId={`heading-${index}`}
                                avatarSrc={user_img}
                                name={user_name}
                                email={user_email}
                                date={date}
                                message={message}
                                details={details}
                            />
                        ))
                    }
                </div>
            </div>
            <div className="items-details-footer mail-action-editor m-4 border border-top-0 rounded-3">
                <div
                    className="p-0 ht-400 border-top position-relative editor-section"
                    data-scrollbar-target="#psScrollbarInit"
                >
                    <ComposeMailForm />
                    <ReactQuill theme="snow" value={value} onChange={setValue} className="ht-150 border-0" />
                </div>
                <div className="px-4 py-3 d-flex align-items-center justify-content-between border-top email-modal">
                    <ComposeMailFooter />
                </div>
            </div>
        </div>

    )
}

export default EmailDetails