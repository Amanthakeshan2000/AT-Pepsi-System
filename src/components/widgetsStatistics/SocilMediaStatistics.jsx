import React from 'react'
import getIcon from '@/utils/getIcon';
const socialMediaData = [
    { platform: 'facebook', users: '5,165 +', icon: 'fa-facebook', color: 'primary' },
    { platform: 'twitter', users: '4,254 +', icon: 'fa-twitter', color: 'teal' },
    { platform: 'youtube', users: '3,355 +', icon: 'fa-youtube', color: 'danger' },
    { platform: 'linkedin', users: '2,658 +', icon: 'fa-linkedin', color: 'indigo' }
];


const SocilMediaStatistics = () => {
    return (
        <>
            {socialMediaData.map(({ platform, users, icon, color }, index) => (
                <div key={index} className="col-xxl-3 col-md-6">
                    <div className={`card card-body bg-${color} text-white position-relative`}>
                        <h3 className="text-reset">{users}</h3>
                        <span className="mt-2 text-capitalize">{platform} Users</span>
                        <div className="position-absolute top-50 end-0 translate-middle">
                            <i className={`fs-1`} >{getIcon(icon)}</i>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default SocilMediaStatistics