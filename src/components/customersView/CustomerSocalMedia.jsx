import React from 'react'
import { FiFacebook, FiGithub, FiGlobe, FiLinkedin, FiLock, FiSettings, FiTwitter, FiUserCheck, FiUsers, FiYoutube } from 'react-icons/fi'
import Dropdown from '@/components/shared/Dropdown'
export const customerProfileOption = [
    { label: "Only Me", icon: <FiLock /> },
    { label: "Everyone", icon: <FiGlobe /> },
    { label: "Anonymous", icon: <FiUsers /> },
    { label: "People I Follow", icon: <FiUserCheck /> },
    { label: "Custom Selections Ever", icon: <FiSettings /> },
]
const CustomerSocalMedia = () => {
    return (
        <div className="card stretch stretch-full">
            <div className="card-header">
                <h5 className="card-title">Social</h5>
                <Dropdown dropdownItems={customerProfileOption} triggerPosition='25,25' dropdownMenuStyle={"wd-250"} />
            </div>
            <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                    <div className="avatar-text bg-gray-100">
                        <FiFacebook size={16} />
                    </div>
                    <span className="mx-2 text-gray-300">/</span>
                    <a href="https://www.facebook.com/wrapcoders" target="_blank" className="text-truncate-1-line">https://www.facebook.com/<span className="text-muted">wrapcoders</span></a>
                </div>
                <div className="d-flex align-items-center mb-3">
                    <div className="avatar-text bg-gray-100">
                        <FiTwitter size={16} />
                    </div>
                    <span className="mx-2 text-gray-300">/</span>
                    <a href="https://www.twitter.com/wrapcoders" target="_blank" className="text-truncate-1-line">https://www.twitter.com/<span className="text-muted">wrapcoders</span></a>
                </div>
                <div className="d-flex align-items-center mb-3">
                    <div className="avatar-text bg-gray-100">
                        <FiGithub size={16} />
                    </div>
                    <span className="mx-2 text-gray-300">/</span>
                    <a href="https://www.github.com/wrapcoders" target="_blank" className="text-truncate-1-line">https://www.github.com/<span className="text-muted">wrapcoders</span></a>
                </div>
                <div className="d-flex align-items-center mb-3">
                    <div className="avatar-text bg-gray-100">
                        <FiLinkedin size={16} />
                    </div>
                    <span className="mx-2 text-gray-300">/</span>
                    <a href="https://www.linkedin.com/wrapcoders" target="_blank" className="text-truncate-1-line">https://www.linkedin.com/<span className="text-muted">wrapcoders</span></a>
                </div>
                <div className="d-flex align-items-center">
                    <div className="avatar-text bg-gray-100">
                        <FiYoutube size={16} />
                    </div>
                    <span className="mx-2 text-gray-300">/</span>
                    <a href="https://www.youtube.com/wrapcoders" target="_blank" className="text-truncate-1-line">https://www.youtube.com/<span className="text-muted">wrapcoders</span></a>
                </div>
            </div>
            <a href="#" className="ladda-button zoom-out" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Refresh Now">
                <span>Refresh</span>
                <span className="spinner"></span>
            </a>
        </div>
    )
}

export default CustomerSocalMedia