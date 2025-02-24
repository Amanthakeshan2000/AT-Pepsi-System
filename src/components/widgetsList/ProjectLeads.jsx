import React, { useState } from 'react'
import CardHeader from '@/components/shared/CardHeader'
import { FiCamera, FiClipboard, FiEdit, FiGrid, FiMail, FiMapPin, FiMoreHorizontal, FiMoreVertical, FiPhoneCall } from 'react-icons/fi'
import CircleProgress from '@/components/shared/CircleProgress'
import SelectDropdown from '@/components/shared/SelectDropdown'
import { projectsData } from '@/utils/fackData/projectsData'
import ImageGroup from '@/components/shared/ImageGroup'
import getIcon from '@/utils/getIcon'
import useCardTitleActions from '@/hooks/useCardTitleActions'
import CardLoader from '@/components/shared/CardLoader'

const projectStatusOptions = [
    { value: 'inprogress', label: 'Inprogress', color: 'blue' },
    { value: 'pending', label: 'Pending', color: 'gray' },
    { value: 'completed', label: 'Completed', color: 'green' },
    { value: 'rejected', label: 'Rejected', color: 'red' },
    { value: 'upcoming', label: 'Upcoming', color: 'orange' },
];

const ProjectLeads = () => {
    const data = projectsData.leadsProject.map((proj) => {
        return ({ ...proj, options: projectStatusOptions })
    })
    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();

    if (isRemoved) {
        return null;
    }
    return (
        <div className="col-lg-12">
            <div className={`card stretch stretch-full ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
                <CardHeader title={"Project Leads"} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand}  />
                <div className='card-body custom-card-action'>
                    {
                        data.map(({ title, salesReps, count, label, id, address, email, phone, revenue, advance, icon, options }, index) => (
                            <NeedleCard
                                key={id}
                                count={count}
                                label={label}
                                title={title}
                                badge={id}
                                phone={phone}
                                email={email}
                                address={address}
                                revenue={revenue}
                                salesReps={salesReps}
                                projectStatus="primary"
                                options={options}
                                index={index}
                                advance={advance}
                                icon={icon}
                            />
                        ))
                    }
                </div>
                <CardLoader refreshKey={refreshKey} />
            </div>
        </div>
    )
}

export default ProjectLeads


const NeedleCard = ({ index, count, label, title, badge, phone, email, address, revenue, salesReps, advance, icon, projectStatus, options }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const values = ["inprogress", "completed", "upcoming"]
    const defaultValue = options.find(option => option.value === values[index]);

    return (
        <div className={`row g-0 align-items-center border border-dashed rounded-3 ${index === projectsData.leadsProject.length - 1 ? "mb-0" : "mb-4"} lead-card-${index + 1}`}>
            <div className="col-lg-4">
                <div className="d-lg-flex align-items-center">
                    <div className="m-3 wd-150 d-flex flex-column justify-content-center align-items-center text-center">
                        <div className={`p-3 wd-150 rounded-top font-size-16 icon-${index + 1}`}>
                            {React.cloneElement(getIcon(icon))}
                        </div>
                        <div className={`p-4 wd-150 rounded-bottom label-${index + 1}`}>
                            <div className="fs-16 fw-bold">{count}+</div>
                            <div className="fs-12 fw-medium">{label}</div>
                        </div>
                    </div>
                    <div className="px-3">
                        <a href="#" className="fs-14 fw-bold text-truncate-1-line">
                            {title} <span className="badge bg-gray-200 text-dark ms-2">{badge}</span>
                        </a>
                        <div className="fs-12 mt-3">
                            <div className="hstack gap-2 text-muted mb-2">
                                <div className="avatar-text avatar-sm">
                                    <FiPhoneCall />
                                </div>
                                <span className="text-truncate-1-line">{phone}</span>
                            </div>
                            <div className="hstack gap-2 text-muted mb-2">
                                <div className="avatar-text avatar-sm">
                                    <FiMail />
                                </div>
                                <span className="text-truncate-1-line">{email}</span>
                            </div>
                            <div className="hstack gap-2 text-muted mb-3">
                                <div className="avatar-text avatar-sm">
                                    <FiMapPin />
                                </div>
                                <span className="text-truncate-1-line">{address}</span>
                            </div>
                            <a href="#" className="hstack gap-2 lh-sm">
                                <span>
                                    <FiMoreHorizontal />
                                </span>
                                <span>Show More</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-6 offset-lg-2 p-3">
                <div className="row gy-4 gx-5 align-items-center">
                    <div className="col-lg-6 col-xl-4">
                        <div className="mb-4">
                            <label className="fs-12 text-muted">Est. Revenue</label>
                            <div className="fs-14 fw-bold text-dark">{revenue} USD</div>
                        </div>
                        <div className="mb-0">
                            <label className="fs-12 text-muted">Sales Rep.</label>
                            <div className="img-group lh-0 ms-2 justify-content-start">
                                <ImageGroup data={salesReps} avatarSize='avatar-md' avatarMore={"35+"} />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-xl-4">
                        <div className="form-group mb-4">
                            <label className="fs-12 text-muted mb-2">Project Info</label>
                            <SelectDropdown
                                options={options}
                                defaultSelect={defaultValue ? defaultValue.value : ''}
                                selectedOption={selectedOption}
                                onSelectOption={(option) => setSelectedOption(option)}
                            />
                        </div>
                        <div className="hstack gap-2">
                            <a href="#" className="avatar-text avatar-md">
                                <FiCamera />
                            </a>
                            <a href="#" className="avatar-text avatar-md">
                                <FiEdit />
                            </a>
                            <a href="#" className="avatar-text avatar-md">
                                <FiClipboard />
                            </a>
                            <a href="#" className="avatar-text avatar-md">
                                <FiGrid />
                            </a>
                            <a href="#" className="avatar-text avatar-md">
                                <FiMoreVertical />
                            </a>
                        </div>

                    </div>
                    <div className="col-xl-4 d-lg-none d-xl-block">
                        <div className={`text-start text-lg-end lead-progress-${index + 1}`}>
                            <CircleProgress text_first_sym='$' value={advance} text_sym={"USD"} path_width='6' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
