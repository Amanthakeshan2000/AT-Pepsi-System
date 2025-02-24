import React from 'react'
import { FiAirplay, FiBluetooth, FiChevronRight, FiCpu, FiLayers, FiLink2, FiSend } from 'react-icons/fi'

const tabItems = [
    {
        tab_class: "nxl-mega-menu-sm",
        data_target: "v-pills-general",
        tab_name: "General",
        icon: <FiAirplay />
    },
    {
        tab_class: "nxl-mega-menu-md",
        data_target: "v-pills-applications",
        tab_name: "Applications",
        icon: <FiSend />
    },
    {
        tab_class: "nxl-mega-menu-lg",
        data_target: "v-pills-integrations",
        tab_name: "Integrations",
        icon: <FiLink2 />
    },
    {
        tab_class: "nxl-mega-menu-xl",
        data_target: "v-pills-components",
        tab_name: "Components",
        icon: <FiLayers />
    },
    {
        tab_class: "nxl-mega-menu-xxl",
        data_target: "v-pills-authentication",
        tab_name: "Authentication",
        icon: <FiCpu />
    },
    {
        tab_class: "nxl-mega-menu-full",
        data_target: "v-pills-miscellaneous",
        tab_name: "miscellaneous",
        icon: <FiBluetooth />
    },

]
const MegaManuTabs = ({ handleTabClick, activeMegaManu }) => {
    const handleClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div className="nav flex-column nxl-mega-menu-tabs" role="tablist" aria-orientation="vertical">
            {
                tabItems.map(({ data_target, icon, tab_class, tab_name }) => {
                    return (
                        <button onClick={(e) => handleTabClick(tab_class, e)} key={tab_name} className={`nav-link ${tab_class} ${tab_class === activeMegaManu ? "active" : ""} `} data-bs-toggle="pill" data-bs-target={`#${data_target}`} type="button" role="tab">
                            <span className="menu-icon">
                                <i>{icon}</i>
                            </span>
                            <span className="menu-title">{tab_name}</span>
                            <span className="menu-arrow">
                                <FiChevronRight size={16} />
                            </span>
                        </button>
                    )
                })
            }
        </div>
    )
}

export default MegaManuTabs