import React from 'react'
import CustomerSocalMedia from './CustomerSocalMedia'
import TabOverviewContent from './TabOverviewContent'
import TabBillingContent from './TabBillingContent'
import TabActivityContent from './TabActivityContent'
import TabNotificationsContent from './TabNotificationsContent'
import TabConnections from './TabConnections'
import TabSecurity from './TabSecurity'
import Profile from '../widgetsList/Profile'
import CustomerSocalFlower from './CustomerSocalFlower'

const CustomerContent = () => {
    return (
        <>
            <div className="col-xxl-4 col-xl-6">
                <Profile />
                <CustomerSocalMedia />
                <CustomerSocalFlower />
            </div>
            <div className="col-xxl-8 col-xl-6">
                <div className="card border-top-0">
                    <div className="card-header p-0">
                        <ul className="nav nav-tabs flex-wrap w-100 text-center customers-nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item flex-fill border-top" role="presentation">
                                <a href="#" className="nav-link active" data-bs-toggle="tab" data-bs-target="#overviewTab" role="tab">Overview</a>
                            </li>
                            <li className="nav-item flex-fill border-top" role="presentation">
                                <a href="#" className="nav-link" data-bs-toggle="tab" data-bs-target="#billingTab" role="tab">Billing</a>
                            </li>
                            <li className="nav-item flex-fill border-top" role="presentation">
                                <a href="#" className="nav-link" data-bs-toggle="tab" data-bs-target="#activityTab" role="tab">Activity</a>
                            </li>
                            <li className="nav-item flex-fill border-top" role="presentation">
                                <a href="#" className="nav-link" data-bs-toggle="tab" data-bs-target="#notificationsTab" role="tab">Notifications</a>
                            </li>
                            <li className="nav-item flex-fill border-top" role="presentation">
                                <a href="#" className="nav-link" data-bs-toggle="tab" data-bs-target="#connectionTab" role="tab">Connection</a>
                            </li>
                            <li className="nav-item flex-fill border-top" role="presentation">
                                <a href="#" className="nav-link" data-bs-toggle="tab" data-bs-target="#securityTab" role="tab">Security</a>
                            </li>
                        </ul>
                    </div>
                    <div className="tab-content">
                        <TabOverviewContent />
                        <div className="tab-pane fade" id="billingTab" role="tabpanel">
                            <TabBillingContent billingHistoryshow={true} />
                        </div>
                        <TabActivityContent />
                        <TabNotificationsContent />
                        <TabConnections />
                        <TabSecurity />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomerContent