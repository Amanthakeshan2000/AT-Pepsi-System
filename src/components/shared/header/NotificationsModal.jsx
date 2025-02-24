import React from 'react'
import { FiBell, FiCheck, FiX } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const notificationsList = [
    {
        id: 1,
        src: "/images/avatar/2.png",
        time: "2",
        titleFirst: "Malanie Hanvey",
        titleSecond: "We should talk about that at lunch!"
    },
    {
        id: 3,
        src: "/images/avatar/3.png",
        time: "36",
        titleFirst: "Valentine Maton",
        titleSecond: "You can download the latest invoices now."
    },
    {
        id: 4,
        src: "/images/avatar/4.png",
        time: "53",
        titleFirst: "Archie Cantones",
        titleSecond: "Don't forget to pickup Jeremy after school!"
    },

]
const NotificationsModal = () => {
    return (
        <div className="dropdown nxl-h-item">
            <div className="nxl-head-link me-3" data-bs-toggle="dropdown" role="button" data-bs-auto-close="outside">
                <FiBell size={20} />
                <span className="badge bg-danger nxl-h-badge">3</span>
            </div>
            <div className="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-notifications-menu">
                <div className="d-flex justify-content-between align-items-center notifications-head">
                    <h6 className="fw-bold text-dark mb-0">Notifications</h6>
                    <Link to="#" className="fs-11 text-success text-end ms-auto" data-bs-toggle="tooltip" title="Make as Read">
                        <FiCheck size={16} />
                        {/* <span>Make as Read</span> */}
                    </Link>
                </div>
                {
                    notificationsList.map(({ id, src, time, titleFirst, titleSecond }) => <Card key={id} src={src} time={time} titleFirst={titleFirst} titleSecond={titleSecond} />)
                }

                <div className="text-center notifications-footer">
                    <Link to="#" className="fs-13 fw-semibold text-dark">Alls Notifications</Link>
                </div>
            </div>
        </div>
    )
}

export default NotificationsModal


const Card = ({ src, time, titleFirst, titleSecond }) => {
    return (
        <div className="notifications-item">
            <img src={src} alt="" className="rounded me-3 border" />
            <div className="notifications-desc">
                <Link to="#" className="font-body text-truncate-2-line"> <span className="fw-semibold text-dark">{titleFirst}</span> {titleSecond}</Link>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="notifications-date text-muted border-bottom border-bottom-dashed">{time} minutes ago</div>
                    <div className="d-flex align-items-center float-end gap-2">
                        <span className="d-block wd-8 ht-8 rounded-circle bg-gray-300" data-bs-toggle="tooltip" title="Make as Read"></span>
                        <span className="text-danger" data-bs-toggle="tooltip" title="Remove"> <FiX className="fs-12" /></span>
                    </div>
                </div>
            </div>
        </div>
    )
}