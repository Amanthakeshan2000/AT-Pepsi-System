import React, { useState } from 'react'
import MegaManuTabs from './MegaManuTabs'
import MegaMenuGeneralTab from './MegaMenuGeneralTab'
import MegaMenuApplicationsTab from './MegaMenuApplicationsTab'
import MegaMenuIntegrationsTab from './MegaMenuIntegrationsTab'
import MegaMenuComponentsTab from './MegaMenuComponentsTab'
import MegaMenuAuthenticationTab from './MegaMenuAuthenticationTab'
import MegaMenuMiscellaneousTab from './megaMenuMiscellaneousTab/MegaMenuMiscellaneousTab'

const MegaMenu = () => {
  const [activeMegaManu, setActiveMegaManu] = useState("nxl-mega-menu-sm")
  const handleTabClick = (tab_class) => {
    setActiveMegaManu(`${tab_class} show`)
  }

  return (
    <div className="dropdown nxl-h-item nxl-mega-menu">
      {/* <a href="#" className="btn btn-light-brand" data-bs-toggle="dropdown" data-bs-auto-close="outside"> Mega Menu </a> */}
      <div className={`dropdown-menu nxl-h-dropdown ${activeMegaManu}`}>
        <div className={`d-lg-flex align-items-start`}>

          <MegaManuTabs handleTabClick={handleTabClick} activeMegaManu={activeMegaManu} />

          <div className="tab-content nxl-mega-menu-tabs-content">
            <MegaMenuGeneralTab />
            <MegaMenuApplicationsTab />
            <MegaMenuIntegrationsTab />
            <MegaMenuComponentsTab />
            <MegaMenuAuthenticationTab />
            <MegaMenuMiscellaneousTab />
          </div>

        </div>
      </div>
    </div>
  )
}

export default MegaMenu