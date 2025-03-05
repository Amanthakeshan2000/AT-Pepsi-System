import React from 'react'
import { FiActivity, FiCalendar, FiClock, FiCodepen, FiDownload, FiExternalLink, FiGithub, FiGitlab, FiGlobe, FiInstagram, FiLinkedin, FiMail, FiMapPin, FiPhone, FiUser, FiUsers } from 'react-icons/fi'
import ImageGroup from '@/components/shared/ImageGroup'
import { imageList } from '../projectsView/TabProjectOverview'
import getIcon from '@/utils/getIcon'
import { userList } from '@/utils/fackData/userList'
import { BsPatchCheck, BsPatchPlus, BsPatchQuestion } from 'react-icons/bs'
import topTost from '@/utils/topTost'

const imagePaths = [
    "/images/gallery/1.png",
    "/images/gallery/2.png",
    "/images/gallery/3.png",
    "/images/gallery/4.png",
    "/images/gallery/5.png",
    "/images/gallery/6.png",
    "/images/gallery/7.png",
    "/images/gallery/8.png",
    "/images/gallery/9.png",
    "/images/gallery/10.png",
    "/images/gallery/11.png",
    "/images/gallery/12.png"
];

const ChatProfileInfo = () => {
    return (
        <div className="offcanvas offcanvas-end userProfileDetails" id="userProfileDetails" aria-hidden="true" tabIndex={-1}>
            <div className="offcanvas-header border-bottom">
                <h5 className="offcanvas-title">Profile Info</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
            </div>
            <div className="offcanvas-body p-0">
                <div className="p-4 text-center position-relative">
                    <img src="/images/avatar/1.png" alt="img" className="wd-100 ht-100 rounded-circle border border-5 img-fluid" />
                    <h2 className="text-dark fs-13 fw-bold mt-3 mb-0">Alexandra Della
                        <i className="text-success fs-11 ms-1" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Verified" ><BsPatchCheck /></i>
                        <i className="text-warning fs-11 ms-1" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Feedback" ><BsPatchQuestion /></i>
                        <i className="text-primary fs-11 ms-1" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Milestone" ><BsPatchPlus /></i>
                    </h2>
                    <span className="fs-12 text-muted d-block mb-3">alex.della@outlook.com</span>
                    <a href="#" className="btn btn-sm btn-primary d-inline-block rounded-pill">Software Engineer</a>
                    <div className="d-flex justify-content-center mt-3 social-profile">
                        <a href="#" className="avatar-text avatar-md me-1" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Github" aria-label="Github"><FiGithub /></a>
                        <a href="#" className="avatar-text avatar-md me-1" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Codepen" aria-label="Codepen"><FiCodepen strokeWidth={1.6} /></a>
                        <a href="#" className="avatar-text avatar-md me-1" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Gitlab" aria-label="Gitlab"><FiGitlab /></a>
                        <a href="#" className="avatar-text avatar-md me-1" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Linkdein" aria-label="Linkdein"><FiLinkedin strokeWidth={1.6} /></a>
                        <a href="#" className="avatar-text avatar-md me-1" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Instagram" aria-label="Instagram"><FiInstagram strokeWidth={1.6} /></a>
                    </div>
                </div>
                {/* Info */}
                <a className="py-2 px-4 fs-12 fw-bold d-block bg-gray-200 border-top border-bottom sticky-top sticky-bar" data-bs-toggle="collapse" href="#PersonalInfo">Personal</a>
                <div className="p-4 fs-13 collapse show" id="PersonalInfo">
                    <div className="d-flex align-items-start mb-3">
                        <div className="me-3 lh-1">
                            <FiClock size={16} />
                        </div>
                        <div className="d-flex align-items-center">
                            <span className="wd-10 ht-10 rounded-circle opacity-75 me-1 bg-success" />
                            <span className="fs-9 text-uppercase fw-bold text-success">Active Now</span>
                        </div>
                    </div>
                    <div className="d-flex align-items-start mb-3">
                        <div className="me-3">
                            <FiCalendar size={16} />
                        </div>
                        <a href="#">26 Mar, 2022</a>
                    </div>
                    <div className="d-flex align-items-start mb-3">
                        <div className="me-3">
                            <FiPhone size={16} />
                        </div>
                        <a href="#">759-479-5968</a>
                    </div>
                    <div className="d-flex align-items-start mb-3">
                        <div className="me-3">
                            <FiGlobe size={16} />
                        </div>
                        <a href="#">GMT: +06, 12:56 PM</a>
                    </div>
                    <div className="d-flex align-items-start mb-3">
                        <div className="me-3">
                            <FiMapPin size={16} />
                        </div>
                        <a href="#">San Diego, California</a>
                    </div>
                    <div className="d-flex align-items-start mb-3">
                        <div className="me-3">
                            <FiMail size={16} />
                        </div>
                        <a href="#">alex.della@outlook.com</a>
                    </div>
                    <div className="d-flex align-items-start mb-3">
                        <div className="me-3">
                            <FiExternalLink size={16} />
                        </div>
                        <a href="#">https://www.wrapcoders.com</a>
                    </div>
                    <div className="d-flex align-items-start mb-3">
                        <div className="me-3">
                            <FiActivity size={16} />
                        </div>
                        <div><span className="fw-medium text-muted">Recent activity by </span> <a href="#" className="ac-info-sidebar-open-trigger">Alexandra Della</a></div>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                        <div className="me-3"><FiUsers size={16} /></div>
                        <div className="img-group lh-0 ms-3">
                            <ImageGroup data={imageList} />
                            <span className="text-muted fs-12 ms-3">886+ members connections</span>
                        </div>
                    </div>
                    <div className="d-flex align-items-start about-text">
                        <div className="me-3">
                            <FiUser size={16} />
                        </div>
                        <p className="fs-12 text-muted mb-0 text-truncate-2-line">The story is about a weary detective who can"t resist a fight. It takes place in a jungle commonwealth on a world of forbidden magic. The threat of bioterrorism plays a major part in this story.</p>
                    </div>
                </div>
                {/* / Info */}
                {/* Experience */}
                <a className="py-2 px-4 fs-12 fw-bold d-block bg-gray-200 border-top border-bottom sticky-top sticky-bar" data-bs-toggle="collapse" href="#ExperienceInfo">Experience</a>
                <div className="p-4 collapse show" id="ExperienceInfo">
                    <ExperienceCard
                        icon={"feather-briefcase"}
                        company={"Gaibandha Computer & IT Education, Bangladesh"}
                        title={"Sr. Web Designer"}
                        years={"2014 - 2016"}
                    />
                    <hr />
                    <ExperienceCard
                        icon={"feather-briefcase"}
                        company={"Gaibandha Computer & IT Education, Bangladesh"}
                        title={"Jr. Web Desinger & Developer"}
                        years={"2016 - 2019"}
                    />
                    <hr />
                    <ExperienceCard
                        icon={"feather-briefcase"}
                        company={"Gaibandha Computer & IT Education, Bangladesh"}
                        title={"JFull-Stack Desinger & Developer"}
                        years={"2019 - Present"}
                    />
                </div>
                {/*/ Experience */}
                {/* Skills */}
                <a className="py-2 px-4 fs-12 fw-bold d-block bg-gray-200 border-top border-bottom sticky-top sticky-bar" data-bs-toggle="collapse" href="#SkillsInfo">Skills</a>
                <div className="p-4 collapse show" id="SkillsInfo">
                    <SkillsCard className={"mb-4"} skillName={"HTML"} progress={"80%"} progressColor="secondary" />
                    <SkillsCard className={"mb-4"} skillName={"CSS"} progress={"90%"} progressColor="success" />
                    <SkillsCard className={"mb-4"} skillName={"UI/UX"} progress={"80%"} progressColor="danger" />
                    <SkillsCard className={"mb-4"} skillName={"JavaScript"} progress={"90%"} progressColor="warning" />
                    <SkillsCard className={"mb-0"} skillName={"Communication"} progress={"95%"} progressColor="primary" />
                </div>
                {/* / Skills */}
                {/* Followers */}
                <a className="py-2 px-4 fs-12 fw-bold d-block bg-gray-200 border-top border-bottom sticky-top sticky-bar" data-bs-toggle="collapse" href="#FollowersInfo">Followers</a>
                <div className="p-4 collapse show" id="FollowersInfo">
                    <ul className="list-unstyled mb-0 followers-cards">
                        {
                            userList(0, 6).map(({ id, user_email, user_img, user_name }, index) =>
                                <FollowerCard key={id} email={user_email} img={user_img} name={user_name} index={index} />
                            )
                        }
                    </ul>
                </div>
                {/* / Followers */}
                {/* Attachments */}
                <a className="py-2 px-4 fs-12 fw-bold d-block bg-gray-200 border-top border-bottom sticky-top sticky-bar" data-bs-toggle="collapse" href="#Attachments">Attachments</a>
                <div className="p-4 collapse show" id="Attachments">
                    <AttachmentsCard fileName={"Projects.zip"} fileSize={"40.65/MB"} img={"/images/file-icons/zip.png"} className="mb-4" />
                    <AttachmentsCard fileName={"Document.png"} fileSize={"480.148/KB"} img={"/images/file-icons/png.png"} className="mb-4" />
                    <AttachmentsCard fileName={"Project.psd"} fileSize={"32.423/MB"} img={"/images/file-icons/psd.png"} className="mb-4" />
                    <AttachmentsCard fileName={"Photos.pdf"} fileSize={"48.254/MB"} img={"/images/file-icons/pdf.png"} />
                </div>
                {/* / Attachments */}
                {/* Medias */}
                <a className="py-2 px-4 fs-12 fw-bold d-block bg-gray-200 border-top border-bottom sticky-top sticky-bar" data-bs-toggle="collapse" href="#MediasInfo">Medias</a>
                <div className="p-4 collapse show" id="MediasInfo">
                    <div className="row g-3 media-list">
                        {imagePaths.map((imagePath, index) => (
                            <div key={index} className="col-4">
                                <a href="#" className="d-block px-3 py-2 border rounded">
                                    <img src={imagePath} className="img-fluid" alt="image" />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
                {/* / Medias */}
            </div>
        </div>

    )
}

export default ChatProfileInfo


const SkillsCard = ({ skillName, progress, className, progressColor }) => {
    return (
        <div className={className}>
            <div className="d-flex align-items-center mb-1 fs-11 fw-medium text-uppercase">{skillName} <span className="ms-auto">{progress}%</span></div>
            <div className="progress ht-3">
                <div className={`progress-bar bg-${progressColor}`} style={{ width: progress }} />
            </div>
        </div>
    )
}

const ExperienceCard = ({ icon, title, company, years }) => {
    return (
        <div className="d-flex align-items-center mb-3">
            <div className="bg-gray-200 wd-60 ht-60 d-flex align-items-center justify-content-center rounded-3">
                {React.cloneElement(getIcon(icon), { size: "16" })}
            </div>
            <div className="ms-3">
                <h6 className="fs-13 fw-bold mb-1">{title}</h6>
                <span className="fs-12 text-muted text-truncate-1-line">{company}</span>
                <span className="fs-11 fw-medium text-muted d-block">{years}</span>
            </div>
        </div>
    )
}

const FollowerCard = ({ name, email, img }) => {
    const handleClick = () => {
        topTost()
    };
    return (
        <li className="d-flex align-items-center justify-content-between chat-single-item">
            <div className="d-flex align-items-center">
                {
                    img ?
                        <div className="avatar-image me-3">
                            <img src={img} alt="img" className="img-fluid rounded-circle" />
                        </div>
                        :
                        <div className="avatar-text me-3 bg-info text-white">{name.substring(0, 1)}</div>
                }
                <div className="lh-sm">
                    <h2 className="fs-13 fw-bold mb-0"><a href="#">{name}</a></h2>
                    <span className="fs-12 text-muted">{email}</span>
                </div>
            </div>
            <a href="#" className="btn btn-sm btn-light-brand ml-auto d-none d-sm-block" onClick={handleClick}>Follow</a>
        </li>
    )
}

const AttachmentsCard = ({ img, fileName, fileSize, className }) => {
    return (
        <div className={`text-dark d-flex align-items-center justify-content-between border rounded-3 ${className}`}>
            <div className="d-flex align-items-center">
                <a href="#" className="p-3 d-flex align-items-center border-end wd-70 ht-70">
                    <img src={img} className="img-fluid" alt="image" />
                </a>
                <div className="d-block ms-3">
                    <a href="#" className="fs-13 fw-bold d-block">{fileName}</a>
                    <small className="fw-300 text-muted">{fileSize}</small>
                </div>
            </div>
            <div className="d-flex align-items-center p-3 border-start">
                <a href="#" className="avatar-text file-download">
                    <FiDownload size={16} />
                </a>
            </div>
        </div>
    )
}

