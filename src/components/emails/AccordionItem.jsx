
import React from 'react';
import { FiRepeat, FiStar } from 'react-icons/fi';

const AccordionItem = ({
    id,
    headingId,
    avatarSrc,
    name,
    email,
    date,
    message,
    details,
    children,
}) => {

    return (
        <div className="accordion-item">
            <div className="accordion-header" id={headingId}>
                <div
                    className="accordion-button collapsed"
                    role="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${id}`}
                    aria-expanded="false"
                    aria-controls={id}
                >
                    <div className="d-flex align-items-center">
                        <div className="avatar-image avatar-md">
                            <img src={avatarSrc} alt="Avatar" className="img-fluid" />
                        </div>
                        <div className="ms-3">
                            <h2 className="fs-13 mb-1 text-truncate-1-line">{name}</h2>
                            <div
                                className="fs-12 fw-normal text-muted text-truncate-1-line"
                                data-bs-toggle="popover"
                                data-bs-trigger="hover"
                                data-bs-html="true"
                                data-bs-content={details}
                            >
                                <span>to: {email}</span>
                            </div>
                        </div>
                    </div>
                    <div className="d-none d-sm-flex align-items-center gap-3 position-absolute" style={{ top: 25, right: 50 }}>
                        <div className="fs-10 fw-medium text-muted text-uppercase item-time d-none d-sm-block">
                            {date}
                        </div>
                        <div className="c-pointer">
                            <FiRepeat className='fs-12' />
                        </div>
                        <div className="text-warning c-pointer">
                            <FiStar className='fs-12' />
                        </div>
                    </div>
                </div>
            </div>
            <div id={id} className="accordion-collapse collapse" aria-labelledby={headingId}>
                <div className="accordion-body" dangerouslySetInnerHTML={{ __html: message }}>
                    {children}
                </div>
            </div>
        </div>

    );
};

export default AccordionItem;