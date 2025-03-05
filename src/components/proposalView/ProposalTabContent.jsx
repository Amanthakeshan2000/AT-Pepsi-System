import React, { useState } from 'react'
import { FiAirplay, FiAnchor, FiArchive, FiBook, FiEdit, FiFacebook, FiGithub, FiInstagram, FiLinkedin, FiPlus, FiSend, FiSettings, FiTwitter } from 'react-icons/fi'
import { servicesData } from '@/utils/fackData/servicesData'
import ReactQuill from 'react-quill'
import { accordionData } from '@/utils/fackData/accordionData'

const editorContent = `  <p>
                                    "Web Design Company" is still a broad term and refers to any
                                    company that specializes in designing and creating websites. These
                                    companies typically offer a range of services including website
                                    design, development, and maintenance. They may also offer other
                                    related services such as search engine optimization (SEO),
                                    e-commerce solutions, and website hosting.
                                </p>
                                <br />
                                <p>
                                    Web design companies vary greatly in terms of size, focus, and
                                    services offered. Some are large, full-service agencies that work
                                    with big-name clients, while others are small, boutique studios
                                    that specialize in creating unique, custom websites for smaller
                                    businesses.
                                </p>
                                <br />
                                <p>
                                    If you are interested in finding a web design company, here are
                                    some factors you may want to consider:
                                </p>
                                <br />
                                <p>
                                    <strong className="text-dark">Portfolio:</strong> Look at the
                                    company's portfolio to see if they have experience working with
                                    businesses similar to yours, and if you like the style and quality
                                    of their work.
                                </p>
                                <br />
                                <p>
                                    <strong className="text-dark">Services:</strong> Make sure the
                                    company offers the services you need, such as website design,
                                    development, and maintenance.
                                </p>
                                <br />
                                <p>
                                    <strong className="text-dark">Cost:</strong> Get quotes from
                                    several companies to compare prices and make sure you are getting
                                    a fair deal.
                                </p>
                                <br />
                                <p>
                                    <strong className="text-dark">Reputation:</strong> Read online
                                    reviews and check the company's rating with organizations such as
                                    the Better Business Bureau to make sure they have a good
                                    reputation.
                                </p>
                                <br />
                                <p>
                                    <strong className="text-dark">
                                        Communication and responsiveness:
                                    </strong>{" "}
                                    Good communication is key to a successful web design project, so
                                    make sure the company you choose is responsive and easy to work
                                    with.
                                </p>`
const ProposalTabContent = () => {
    const [value, setValue] = useState(editorContent);

    return (
        <div className="tab-pane fade active show" id="proposalTab">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card stretch stretch-full">
                        <div className="card-body">
                            <div className="d-sm-flex justify-content-between">
                                <div className="proposal-from">
                                    <h4 className="fw-bold mb-4">From:</h4>
                                    <div className="fs-13 text-muted lh-lg">
                                        <div>
                                            <span className="fw-semibold text-dark border-bottom border-bottom-dashed">
                                                Phone:
                                            </span>
                                            <span>(123) 456-7890</span>
                                        </div>
                                        <div>
                                            <span className="fw-semibold text-dark border-bottom border-bottom-dashed">
                                                Email:
                                            </span>
                                            <span>exmalple@email.com</span>
                                        </div>
                                        <address>
                                            <span className="fw-semibold text-dark border-bottom border-bottom-dashed">
                                                Address:
                                            </span>
                                            <span>P.O. Box 18728,</span>
                                            <br />
                                            <span>Delorean New York,</span>
                                            <br />
                                            <span>VAT No: 2617 348 2752</span>
                                            <br />
                                        </address>
                                        <div className="d-flex gap-2">
                                            <a href="#" className="avatar-text avatar-sm">
                                                <FiFacebook />
                                            </a>
                                            <a href="#" className="avatar-text avatar-sm">
                                                <FiTwitter />
                                            </a>
                                            <a href="#" className="avatar-text avatar-sm">
                                                <FiInstagram />
                                            </a>
                                            <a href="#" className="avatar-text avatar-sm">
                                                <FiLinkedin />
                                            </a>
                                            <a href="#" className="avatar-text avatar-sm">
                                                <FiGithub />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <hr className="d-md-none" />
                                <div className="proposal-to">
                                    <h6 className="fw-bold mb-4">To:</h6>
                                    <div className="fs-13 lh-lg">
                                        <div>
                                            <span className="fw-semibold text-dark border-bottom border-bottom-dashed">
                                                Proposal:
                                            </span>
                                            <span className="fw-bold text-primary">#NXL369852</span>
                                        </div>
                                        <div>
                                            <span className="fw-semibold text-dark border-bottom border-bottom-dashed">
                                                Due Date:
                                            </span>
                                            <span className="text-muted">28 May, 2023</span>
                                        </div>
                                        <div>
                                            <span className="fw-semibold text-dark border-bottom border-bottom-dashed">
                                                Issued Date:
                                            </span>
                                            <span className="text-muted">25 May, 2023</span>
                                        </div>
                                    </div>
                                    <div className="fs-13 text-muted lh-lg mt-3">
                                        <div>
                                            <span className="fw-semibold text-dark border-bottom border-bottom-dashed">
                                                Phone:
                                            </span>
                                            <span>(123) 456-7890</span>
                                        </div>
                                        <div>
                                            <span className="fw-semibold text-dark border-bottom border-bottom-dashed">
                                                Email:
                                            </span>
                                            <span>exmalple@email.com</span>
                                        </div>
                                        <address className="mb-0">
                                            <span className="fw-semibold text-dark border-bottom border-bottom-dashed">
                                                Address:
                                            </span>
                                            <span>9498 Harvard Street,</span>
                                            <br />
                                            <span>Fairfield, Chicago Town 06824</span>
                                            <br />
                                        </address>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="card stretch stretch-full">
                        <div className="card-header">
                            <h5 className="card-title">Proposal</h5>
                            <a
                                href="#"
                                className="avatar-text avatar-md"
                                data-bs-toggle="tooltip"
                                title="Update Proposal"
                            >
                                <FiEdit />
                            </a>
                        </div>
                        <div className="card-body p-0 proposal-tab-editor">
                            <ReactQuill theme="snow" value={value} onChange={setValue} className=" font-inter botder-top-0" />
                        </div>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="card stretch stretch-full">
                        <div className="card-header">
                            <h5 className="card-title">Services</h5>
                            <a href="#" className="btn btn-md btn-light-brand">
                                <FiPlus className='me-2' />
                                <span>New Services</span>
                            </a>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                {
                                    servicesData.map(({ icon, id, description, title }) => (
                                        <ServiceCard
                                            key={id}
                                            icon={icon}
                                            title={title}
                                            description={description}
                                            link="#"
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="card stretch stretch-full">
                        <div className="card-header">
                            <h5 className="card-title">FAQ's</h5>
                            <a href="#" className="btn btn-md btn-light-brand">
                                <FiPlus className='me-2' />
                                <span>Add New FAQ</span>
                            </a>
                        </div>
                        <div className="card-body">
                            <div
                                className="accordion proposal-faq-accordion"
                                id="accordionFaqGroup"
                            >
                                {
                                    accordionData.map(({ ans, id, qustion }) => (
                                        <AccordionItem
                                            key={id}
                                            id={id}
                                            header={qustion}
                                            content={ans}
                                        />
                                    ))
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProposalTabContent


const ServiceCard = ({ icon, title, description, link }) => {
    return (
        <div className="col-xxl-4 col-md-6">
            <div className="card stretch stretch-full">
                <div className="card-body">
                    <div className="avatar-text rounded-2 mb-4">
                        {getIcon(icon)}
                    </div>
                    <h6 className="fw-bold mb-3 text-truncate-1-line">
                        {title}
                    </h6>
                    <p className="text-muted mb-4 text-truncate-3-line">
                        {description}
                    </p>
                    <a
                        href={link}
                        className="d-block fs-10 fw-bold text-dark text-uppercase text-spacing-1"
                    >
                        Learn More →
                    </a>
                </div>
            </div>
        </div>
    );
};


const AccordionItem = ({ id, header, content }) => {
    return (
        <div className="accordion-item">
            <h2 className="accordion-header" id={`flush-heading${id}`}>
                <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#flush-collapse${id}`}
                    aria-expanded="false"
                    aria-controls={`flush-collapse${id}`}
                >
                    {header}
                </button>
            </h2>
            <div
                id={`flush-collapse${id}`}
                className="accordion-collapse collapse"
                aria-labelledby={`flush-heading${id}`}
                data-bs-parent="#accordionFaqGroup"
            >
                <div className="accordion-body">
                    {content}
                </div>
            </div>
        </div>
    );
}


const getIcon = (icon) => {
    switch (icon) {
        case "feather-archive":
            return <FiArchive size={16} strokeWidth={1.6} />
        case "feather-airplay":
            return <FiAirplay size={16} strokeWidth={1.6} />
        case "feather-settings":
            return <FiSettings size={16} strokeWidth={1.6} />
        case "feather-send":
            return <FiSend size={16} strokeWidth={1.6} />
        case "feather-anchor":
            return <FiAnchor size={16} strokeWidth={1.6} />
        case "feather-book":
            return <FiBook size={16} strokeWidth={1.6} />

        default:
            break;
    }
}