import React from 'react'
import CategoriesSidebar from './CategoriesSidebar'
import { Link } from 'react-router-dom'

const ProjectsTab = () => {
    return (
        <div className="tab-pane fade active show" id="v-pills-projects" role="tabpanel">
            <div className="row g-4">
                <CategoriesSidebar />
                <div className="col-xxl-10">
                    <div className="row g-4">
                        <ProjectCard avatar={"images/avatar/1.png"} thumbnail={"/images/banner/1.jpg"} name={"Alexandra Della"} title={"Shopify eCommerce Store"} description={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint nam ullam iure eum sed rerum libero quis doloremque maiores veritatis?"} />
                        <ProjectCard avatar={"images/avatar/2.png"} thumbnail={"/images/banner/2.jpg"} name={"Green Cute"} title={"iOS Apps Development"} description={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint nam ullam iure eum sed rerum libero quis doloremque maiores veritatis?"} />
                        <ProjectCard avatar={"images/avatar/3.png"} thumbnail={"/images/banner/3.jpg"} name={"Malanie Hanvey"} title={"Figma Dashboard Design"} description={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint nam ullam iure eum sed rerum libero quis doloremque maiores veritatis?"} />
                        <ProjectCard avatar={"images/avatar/4.png"} thumbnail={"/images/banner/4.jpg"} name={"Kenneth Hune"} title={"React Dashboard Design"} description={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint nam ullam iure eum sed rerum libero quis doloremque maiores veritatis?"} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectsTab


const ProjectCard = ({ thumbnail, title, description, name, avatar }) => {
    return (
        <div className="col-xl-6">
            <div className="d-lg-flex align-items-center gap-3">
                <div className="wd-150 rounded-3">
                    <img src={thumbnail} alt="thumbnail" className="img-fluid rounded-3" />
                </div>
                <div className="mt-3 mt-lg-0 ms-lg-3 item-text">
                    <Link to="#">
                        <h6 className="menu-item-heading text-truncate-1-line">{title}</h6>
                    </Link>
                    <p className="fs-12 fw-normal text-muted mb-0 text-truncate-2-line">{description}</p>
                    <div className="hstack gap-2 mt-3">
                        <div className="avatar-image avatar-sm">
                            <img src={avatar} alt="avatar" className="img-fluid" />
                        </div>
                        <Link to="#" className="fs-12">{name}</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
