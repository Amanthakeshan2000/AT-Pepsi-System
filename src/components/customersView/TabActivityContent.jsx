import React from 'react'
import { FiCheck, FiCheckCircle, FiEye, FiMoreHorizontal, FiMoreVertical, FiX } from 'react-icons/fi'
import { profileActivityData } from '@/utils/fackData/profileActivityData'
import { ActivityListItem } from '../widgetsList/ActivityTwo';

const logData = [
    { browser: 'Chrome on Window', ip: '192.149.122.128', time: '11:34 PM', action: 'success' },
    { browser: 'Mozilla on Window', ip: '186.188.154.225', time: 'Nov 20, 2023 10:34 PM', action: 'fail' },
    { browser: 'Chrome on iMac', ip: '192.149.122.128', time: 'Oct 23, 2023 04:16 PM', action: 'fail' },
    { browser: 'Mozilla on Window', ip: '186.188.154.225', time: 'Nov 20, 2023 10:34 PM', action: 'fail' },
    { browser: 'Chrome on Window', ip: '192.149.122.128', time: 'Oct 23, 2023 04:16 PM', action: 'fail' },
    { browser: 'Chrome on iMac', ip: '192.149.122.128', time: 'Oct 15, 2023 11:41 PM', action: 'fail' },
    { browser: 'Mozilla on Window', ip: '186.188.154.225', time: 'Oct 13, 2023 05:43 AM', action: 'fail' },
    { browser: 'Chrome on iMac', ip: '192.149.122.128', time: 'Oct 03, 2023 04:12 AM', action: 'fail' },

];


const TabActivityContent = () => {
    return (
        <div className="tab-pane fade" id="activityTab" role="tabpanel">
            <div className="recent-activity p-4 pb-0">
                <div className="mb-4 pb-2 d-flex justify-content-between">
                    <h5 className="fw-bold">Recent Activity:</h5>
                    <a href="#" className="btn btn-sm btn-light-brand">View Alls</a>
                </div>
                <ul className="list-unstyled activity-feed">
                    {profileActivityData.map((item, index) => (
                        <ActivityListItem
                            key={index}
                            type={item.type}
                            leadDate={item.leadDate}
                            date={item.date}
                            text={item.text}
                            linkText={item.linkText}
                            linkHref={item.linkHref}
                            badge={item.badge}
                            badgeColor={item.badgeColor}
                        />
                    ))}
                </ul>
                <a href="#" className="d-flex align-items-center text-muted">
                    <FiMoreHorizontal className='fs-12' />
                    <span className="fs-10 text-uppercase ms-2 text-truncate-1-line">Load More</span>
                </a>
            </div>
            <hr />
            <div className="logs-history mb-0">
                <div className="px-4 mb-4 d-flex justify-content-between">
                    <h5 className="fw-bold">Logs History</h5>
                    <a href="#" className="btn btn-sm btn-light-brand">View Alls</a>
                </div>
                <div className="table-responsive">
                    <table className="table">
                        <thead className="text-dark text-center border-top">
                            <tr>
                                <th className="text-start ps-4">Browser</th>
                                <th>IP</th>
                                <th>Time</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {logData.map((log, index) => (
                                <LogEntry
                                    key={index}
                                    browser={log.browser}
                                    ip={log.ip}
                                    time={log.time}
                                    action={log.action}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default TabActivityContent




const LogEntry = ({ browser, ip, time, action }) => {
    return (
        <tr>
            <td className="fw-medium text-dark text-start ps-4">{browser}</td>
            <td><span className="text-muted">{ip}</span></td>
            <td>
                <span className="text-muted">{time}</span>
            </td>
            <td>
                {action === 'success' ? (
                    <FiCheckCircle className='text-success' />
                ) : (
                    <FiX className='text-danger' />
                )}
            </td>
        </tr>
    );
};

