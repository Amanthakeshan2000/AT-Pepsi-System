
import React from 'react'
import HelpBanner from '@/components/helpBanner';
import { FiArrowRight, FiFileText } from 'react-icons/fi';

const categoryData = [
    {
        title: 'Getting Started',
        icon: '/images/icons/line-icon/safe.png',
        topics: ['Getting Started', 'Adding End Users', 'Integration Applications', 'Integration Video Tutorials', 'Step by Step Intigrations Guide'],
        moreTopicsLink: 'More Topics →',
        totalTopic: 6
    },
    {
        title: 'User Shortwave',
        icon: '/images/icons/line-icon/mexican.png',
        topics: ['Getting Started', 'Adding End Users', 'Integration Applications', 'Integration Video Tutorials', 'Step by Step Intigrations Guide'],
        moreTopicsLink: 'More Topics →',
        totalTopic: 8
    },
    {
        title: 'Settings & Preferences',
        icon: '/images/icons/line-icon/shield.png',
        topics: ['Getting Started', 'Adding End Users', 'Integration Applications', 'Integration Video Tutorials', 'Step by Step Intigrations Guide'],
        moreTopicsLink: 'More Topics →',
        totalTopic: 9
    },
    {
        title: 'Terms & Billing',
        icon: '/images/icons/line-icon/money-bag.png',
        topics: ['Getting Started', 'Adding End Users', 'Integration Applications', 'Integration Video Tutorials', 'Step by Step Intigrations Guide'],
        moreTopicsLink: 'More Topics →',
        totalTopic: 10
    },
    {
        title: 'Integrations',
        icon: '/images/icons/line-icon/lifebuoy.png',
        topics: ['Getting Started', 'Adding End Users', 'Integration Applications', 'Integration Video Tutorials', 'Step by Step Intigrations Guide'],
        moreTopicsLink: 'More Topics →',
        totalTopic: 8
    },
    {
        title: 'Troubleshooting',
        icon: '/images/icons/line-icon/award.png',
        topics: ['Getting Started', 'Adding End Users', 'Integration Applications', 'Integration Video Tutorials', 'Step by Step Intigrations Guide'],
        moreTopicsLink: 'More Topics →',
        totalTopic: 7
    },
];

const trandingData = [
    { title: 'How to upload data to the system?' },
    { title: 'How to draw a land plot on a map?' },
    { title: 'How to view expired services?' },
    { title: 'How to integrate new web applications?' },
    { title: 'How do I set the geometry of an object?' },
    { title: 'How to filter object on the map?' },
    { title: 'How to count the number of document in the register?' }
];

const questionData = [
    {
        title: '+1 (375) 658 9321',
        icon: '/images/icons/line-icon/phone.png',
        link: 'https://themeforest.net/user/theme_ocean/',
        description: 'We are always happy to help.'
    },
    {
        title: 'support@helpcenter.com',
        icon: '/images/icons/line-icon/email.png',
        link: 'https://themeforest.net/user/theme_ocean/',
        description: 'The best way to get answers faster.'
    },
    {
        title: 'Submit Ticket',
        icon: '/images/icons/line-icon/notebook.png',
        link: 'https://themeforest.net/user/theme_ocean/',
        description: 'The best way to get answers faster.'
    }
];
const HelpKnowledgebase = () => {
    return (
        <>
            <HelpBanner />
            <div className="main-content container-lg px-4 help-center-main-contet-area overflow-visible">
                <div className="row help-quick-card">
                    <HelpCard
                        description={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi, veniam. Modi quas vero odit asperiores alias libero quae in quam dicta autem et repudiandae ex, molestiae doloremque, explicabo reiciendis minus?"}
                        img={"/images/icons/line-icon/idea.png"}
                        title={"Knowledge Base"}
                    />
                    <HelpCard
                        description={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi, veniam. Modi quas vero odit asperiores alias libero quae in quam dicta autem et repudiandae ex, molestiae doloremque, explicabo reiciendis minus?"}
                        img={"/images/icons/line-icon/support.png"}
                        title={"Contact Agent"}
                    />
                    <HelpCard
                        description={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi, veniam. Modi quas vero odit asperiores alias libero quae in quam dicta autem et repudiandae ex, molestiae doloremque, explicabo reiciendis minus?"}
                        img={"/images/icons/line-icon/rocket.png"}
                        title={"Community Forum"}
                    />
                </div>
                <section className="topic-category-section">
                    <div className="d-flex flex-column align-items-center justify-content-center mb-5">
                        <h2 className="fs-20 fw-bold mb-3">Documentation Category</h2>
                        <p className="px-5 mx-5 text-center text-muted text-truncate-3-line">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus laboriosam obcaecati fuga repellat animi quam nesciunt maiores dolorem corporis debitis incidunt, accusantium corrupti dignissimos repellendus, saepe accusamus expedita necessitatibus.</p>
                    </div>
                    <div className="row">
                        {categoryData.map((card, index) => (
                            <div className="col-xl-4 col-lg-6" key={index}>
                                <CategoryCard {...card} />
                            </div>
                        ))}
                    </div>
                </section>
                <section className="topic-tranding-section">
                    <div className="d-flex flex-column align-items-center justify-content-center mb-5">
                        <h2 className="fs-20 fw-bold mb-3">Tranding Topics</h2>
                        <p className="px-5 mx-5 text-center text-muted text-truncate-3-line">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus laboriosam obcaecati fuga repellat animi quam nesciunt maiores dolorem corporis debitis incidunt, accusantium corrupti dignissimos repellendus, saepe accusamus expedita necessitatibus.</p>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            {trandingData.map((card, index) => (
                                <TrandingCard key={index} {...card} />
                            ))}
                        </div>
                        <div className="col-lg-6">
                            {trandingData.map((card, index) => (
                                <TrandingCard key={index} {...card} />
                            ))}
                        </div>
                    </div>
                </section>
                <section className="still-question-section">
                    <div className="d-flex flex-column align-items-center justify-content-center mb-5">
                        <h2 className="fs-20 fw-bold mb-3">Still Have A Question?</h2>
                        <p className="px-5 mx-5 text-center text-muted text-truncate-3-line">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus laboriosam obcaecati fuga repellat animi quam nesciunt maiores dolorem corporis debitis incidunt, accusantium corrupti dignissimos repellendus, saepe accusamus expedita necessitatibus.</p>
                    </div>
                    <div className="row">
                        {questionData.map((card, index) => (
                            <QuestionCard key={index} {...card} />
                        ))}
                    </div>
                </section>
            </div>

        </>
    )
}

export default HelpKnowledgebase


const HelpCard = ({ img, title, description }) => {
    return (
        <div className="col-lg-4">
            <div className="card mb-4 mb-lg-0">
                <div className="card-body p-5">
                    <div className="wd-50 ht-50 d-flex align-items-center justify-content-center mb-5">
                        <img src={img} className="img-fluid" alt="img" />
                    </div>
                    <h2 className="fs-16 fw-bold mb-3">{title}</h2>
                    <p className="fs-12 fw-medium text-muted text-truncate-3-line">{description}</p>
                    <a href="#" className="fs-12">Learn More →</a>
                </div>
            </div>
        </div>
    )
}

const CategoryCard = ({ title, icon, topics, moreTopicsLink, totalTopic }) => {
    return (
        <div className="card p-4 mb-4">
            <div className="d-sm-flex align-items-center">
                <div className="wd-50 ht-50 p-2 d-flex align-items-center justify-content-center border rounded-3">
                    <img src={icon} className="img-fluid" alt="img" />
                </div>
                <div className="ms-0 ms-sm-3 mt-4 mt-sm-0">
                    <h2 className="fs-14 fw-bold mb-1">{title}</h2>
                    <span className="fs-10 fw-semibold text-uppercase text-muted">{totalTopic} topics category</span>
                </div>
            </div>
            <ul className="list-unstyled mb-0 mt-4 ms-sm-5 ps-sm-3">
                {topics.map((topic, index) => (
                    <li key={index} className='mb-2'>
                        <i className="feather-file-text me-2 fs-13" ><FiFileText /></i>
                        <a href="#" className="fs-13 fw-medium" data-bs-toggle="offcanvas" data-bs-target="#topicsDetailsOffcanvas">{topic}</a>
                    </li>
                ))}
            </ul>
            <div className="mt-4 ms-5 ps-3">
                <a href="#" className="fs-12">{moreTopicsLink}</a>
            </div>
        </div>
    );
}


export const TrandingCard = ({ title}) => {
    return (
        <div className="card border rounded-3 mb-3 overflow-hidden">
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    <div className="wd-50 ht-50 bg-gray-100 me-3 d-flex align-items-center justify-content-center">
                        <FiFileText size={16} />
                    </div>
                    <a href="#" className="text-truncate-1-line" data-bs-toggle="offcanvas" data-bs-target="#topicsDetailsOffcanvas">{title}</a>
                </div>
                <a href="#" className="avatar-text avatar-sm me-3" data-bs-toggle="offcanvas" data-bs-target="#topicsDetailsOffcanvas">
                    <FiArrowRight />
                </a>
            </div>
        </div>
    );
}

function QuestionCard({ title, icon, link, description }) {
    return (
        <div className="col-lg-4">
            <div className="card card-body pb-0 pb-lg-4 text-center">
                <a href={link} className="card stretch stretch-full p-5 mb-4 mb-lg-0 d-flex flex-column flex-fill align-items-center justify-content-center border rounded-3">
                    <div className="mb-4 wd-50 ht-50">
                        <img src={icon} className="img-fluid" alt={title} />
                    </div>
                    <div className="fs-14 fw-bold d-block mb-1">{title}</div>
                    {description && <div className="fs-12 fw-medium text-muted text-truncate-1-line">{description}</div>}
                </a>
            </div>
        </div>
    );
}
