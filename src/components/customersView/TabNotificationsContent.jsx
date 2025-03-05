import React from 'react'
import SelectDropdown from '@/components/shared/SelectDropdown'
import { customerViewOptions } from '@/utils/options'
import getIcon from '@/utils/getIcon'



const notificationSetting = [
    {
        title: "Successful payments",
        description: "Receive a notification for every successful payment.",
        options: customerViewOptions,
        defaultSelect: 'email'
    },
    {
        title: "Customer payment dispute",
        description: "Receive a notification if a payment is disputed by a customer and for dispute purposes.",
        options: customerViewOptions,
        defaultSelect: 'push'
    },
    {
        title: "Refund alerts",
        description: "Receive a notification if a payment is stated as risk by the Finance Department.",
        options: customerViewOptions,
        defaultSelect: 'repeat'
    },
    {
        title: "Successful payments",
        description: "Receive a notification for every successful payment.",
        options: customerViewOptions,
        defaultSelect: 'sms-email'
    },
    {
        title: "Invoice payments",
        description: "Receive a notification if a customer sends an incorrect amount to pay their invoice. ",
        options: customerViewOptions,
        defaultSelect: 'deactivate'
    },
    {
        title: "Rating reminders",
        description: "Send an email reminding me to rate an item a week after purchase ",
        options: customerViewOptions,
        defaultSelect: 'sms-push-email'
    },
    {
        title: "Item update notifications",
        description: "Send an email when an item I've purchased is updated ",
        options: customerViewOptions,
        defaultSelect: 'repeat'
    },
    {
        title: "Item comment notifications",
        description: "Send me an email when someone comments on one of my items ",
        options: customerViewOptions,
        defaultSelect: 'push'
    },
    {
        title: "Team comment notifications",
        description: "Send me an email when someone comments on one of my team items ",
        options: customerViewOptions,
        defaultSelect: 'sms'
    },
    {
        title: "Item review notifications",
        description: "Send me an email when my items are approved or rejected ",
        options: customerViewOptions,
        defaultSelect: 'email'
    },
    {
        title: "Buyer review notifications",
        description: "Send me an email when someone leaves a review with their rating ",
        options: customerViewOptions,
        defaultSelect: 'deactivate'
    },
    {
        title: "Expiring support notifications",
        description: "Send me emails showing my soon to expire support entitlements ",
        options: customerViewOptions,
        defaultSelect: 'email-push'
    },
    {
        title: "Daily summary emails",
        description: "Send me a daily summary of all items approved or rejected ",
        options: customerViewOptions,
        defaultSelect: 'sms-push'
    },

]

const TabNotificationsContent = () => {
    return (
        <div className="tab-pane fade" id="notificationsTab" role="tabpanel">
            <div className="table-responsive">
                <table className="table mb-0">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th className="wd-250 text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            notificationSetting.map(({ defaultSelect, description, options, title }, index) => (
                                <NotificationRow
                                    key={index}
                                    title={title}
                                    description={description}
                                    options={options}
                                    defaultSelect={defaultSelect}
                                />
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <hr />
            <div className="notify-activity-section">
                <div className="px-4 mb-4 d-flex justify-content-between">
                    <h5 className="fw-bold">Account Activity</h5>
                    <a href="#" className="btn btn-sm btn-light-brand">View Alls</a>
                </div>
                <div className="px-4">
                    <NotificationItem
                        icon="feather-message-square"
                        title="Someone comments on one of my items"
                        description="If someone comments on one of your items, it's important to respond in a timely and appropriate manner."
                    />
                    <NotificationItem
                        icon="feather-briefcase"
                        title="Someone replies to my job posting"
                        description="Great! It's always exciting to hear from someone who's interested in a job posting you've put out."
                    />
                    <NotificationItem
                        icon="feather-briefcase"
                        title="Someone mentions or follows me"
                        description="If you received a notification that someone mentioned or followed you, take a moment to read it and understand what it means."
                    />
                </div>
            </div>
        </div>
    )
}

export default TabNotificationsContent


const NotificationRow = ({ title, description, options, defaultSelect }) => {
    return (
        <tr>
            <td>
                <div className="fw-bold text-dark">{title}</div>
                <small className="fs-12 text-muted">{description}</small>
            </td>
            <td className="text-end">
                <SelectDropdown options={options} defaultSelect={defaultSelect} className={"select-wd-lg"} />
            </td>
        </tr>
    );
};

const NotificationItem = ({ title, description, icon }) => {
    return (
        <div className="hstack justify-content-between p-4 mb-3 border border-dashed border-gray-3 rounded-1">
            <div className="hstack me-4">
                <div className="avatar-text">
                    {React.cloneElement(getIcon(icon), { size: "16" })}
                </div>
                <div className="ms-4">
                    <a href="#" className="fw-bold mb-1 text-truncate-1-line">{title}</a>
                    <div className="fs-12 text-muted text-truncate-1-line">{description}</div>
                </div>
            </div>
            <div className="form-check form-switch form-switch-sm">
                <label className="form-check-label fw-500 text-dark c-pointer" htmlFor="formSwitchComment"></label>
                <input className="form-check-input c-pointer" type="checkbox" id="formSwitchComment" />
            </div>
        </div>
    );
};