import React from 'react'
import { FiBarChart2, FiBell, FiBook, FiLifeBuoy, FiLink2, FiShield } from 'react-icons/fi'

const FeaturesTab = () => {
    return (
        <div className="tab-pane fade" id="v-pills-features" role="tabpanel">
            <div className="row g-4 nxl-mega-menu-miscellaneous-features">
                <div className="col-xl-8">
                    <div className="row g-4">
                        <Card icon={<FiBell/>} title={"Notifications"} icon_bg={"bg-soft-primary text-primary border-soft-primary"}/>
                        <Card icon={<FiBarChart2/>} title={"Analytics"} icon_bg={"bg-soft-danger text-danger border-soft-danger"}/>
                        <Card icon={<FiLink2/>} title={"Ingetrations"} icon_bg={"bg-soft-success text-success border-soft-success"}/>
                        <Card icon={<FiBook/>} title={"Documentations"} icon_bg={"bg-soft-indigo text-indigo border-soft-indigo"}/>
                        <Card icon={<FiShield/>} title={"Security"} icon_bg={"bg-soft-warning text-warning border-soft-warning"}/>
                        <Card icon={<FiLifeBuoy/>} title={"Support"} icon_bg={"bg-soft-teal text-teal border-soft-teal rounded"}/>
                    </div>
                </div>
                <div className="col-xxl-3 offset-xxl-1 col-xl-4">
                    <div className="nxl-mega-menu-image">
                        <img src="/images/banner/1.jpg" alt="" className="img-fluid" />
                    </div>
                    <div className="mt-4">
                        <a href="mailto:wrapcoders@gmail.com" className="fs-13 fw-bold">View all features on Duralux &rarr;</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeaturesTab

const Card = ({icon, title, description, icon_bg}) => {
    return (
        <div className="col-lg-6">
            <div className="d-flex align-items-start gap-3">
                <div className={`avatar-text avatar-lg rounded ${icon_bg}`}>
                    <i className="mx-auto">{icon}</i>
                </div>
                <div>
                    <a href="#">
                        <h6 className="menu-item-heading text-truncate-1-line">{title}</h6>
                    </a>
                    <p className="fs-12 fw-normal text-muted mb-0 text-truncate-2-line">Lorem ipsum dolor sit amet consectetur adipisicing elit Unde numquam rem dignissimos. elit Unde numquam rem dignissimos.</p>
                </div>
            </div>
        </div>
    )
}