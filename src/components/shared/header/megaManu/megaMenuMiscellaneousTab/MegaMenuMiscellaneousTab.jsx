import React from 'react'
import FeaturesTab from './FeaturesTab'
import ProjectsTab from './ProjectsTab'
import ServicesTab from './ServicesTab'
import BlogsTab from './BlogsTab'
import { FiAirplay, FiBold, FiCast, FiCheckSquare } from 'react-icons/fi'

const MegaMenuMiscellaneousTab = () => {
  return (
    <div className="tab-pane fade nxl-mega-menu-miscellaneous" id="v-pills-miscellaneous" role="tabpanel">
      {/* <!-- Nav tabs --> */}
      <ul className="nav nav-tabs flex-column flex-lg-row nxl-mega-menu-miscellaneous-tabs" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#v-pills-projects" type="button" role="tab">
            <span className="menu-icon">
              <FiCast size={15}/>
            </span>
            <span className="menu-title">Projects</span>
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" data-bs-toggle="tab" data-bs-target="#v-pills-services" type="button" role="tab">
            <span className="menu-icon">
              <FiCheckSquare size={15}/>
            </span>
            <span className="menu-title">Services</span>
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" data-bs-toggle="tab" data-bs-target="#v-pills-features" type="button" role="tab">
            <span className="menu-icon">
              <FiAirplay size={15}/>
            </span>
            <span className="menu-title">Features</span>
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" data-bs-toggle="tab" data-bs-target="#v-pills-blogs" type="button" role="tab">
            <span className="menu-icon">
              <FiBold size={15}/>
            </span>
            <span className="menu-title">Blogs</span>
          </button>
        </li>
      </ul>
      {/* <!-- Tab panes --> */}
      <div className="tab-content nxl-mega-menu-miscellaneous-content">
        <ProjectsTab/>
        <ServicesTab/>
        <FeaturesTab />
        <BlogsTab/>
      </div>
    </div>
  )
}

export default MegaMenuMiscellaneousTab
