import React from 'react'
import { FiBarChart2, FiBell, FiFeather, FiLifeBuoy, FiShield, FiShoppingCart } from 'react-icons/fi'
import MegaMenuSlider from '../MegaMenuSlider'
import TabFooter from './TabFooter'

const ServicesTab = () => {
    return (
        <div className="tab-pane fade" id="v-pills-services" role="tabpanel">
            <div className="row g-4 nxl-mega-menu-miscellaneous-services">
                <div className="col-xl-8">
                    <div className="row g-4">
                        <ServiceCard icon={<FiBarChart2 />} title={"Analytics Services"} />
                        <ServiceCard icon_bg="bg-danger" icon={<FiFeather />} title={"Content Writing"} />
                        <ServiceCard icon_bg="bg-warning" icon={<FiBell />} title={"SEO (Search Engine Optimization)"} />
                        <ServiceCard icon_bg="bg-success" icon={<FiShield />} title={"Security Services"} />
                        <ServiceCard icon_bg="bg-teal" icon={<FiShoppingCart />} title={"eCommerce Services"} />
                        <ServiceCard icon_bg="bg-dark" icon={<FiLifeBuoy />} title={"Support Services"} />

                        <TabFooter />
                    </div>
                </div>
                <div className="col-xl-4">
                    <MegaMenuSlider />
                </div>
            </div>
        </div>
    )
}

export default ServicesTab

const ServiceCard = ({ title, description, icon, icon_bg }) => {
    return (
        <div className="col-lg-6">
            <div className="d-flex align-items-start gap-3">
                <div className={`avatar-text avatar-lg rounded bg-primary text-white ${icon_bg}`}>
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
