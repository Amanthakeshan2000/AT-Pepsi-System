import React from 'react'
import TabProfile from './TabProfile'
import TabPassword from './TabPassword'
import TabBilling from './TabBilling'
import TabNotificationsContent from '../customersView/TabNotificationsContent'
import TabConnections from '../customersView/TabConnections'
import TabBillingContent from '../customersView/TabBillingContent'

const CustomerCreateContent = () => {
    return (
        <div className="col-lg-12">
            <div className="card border-top-0">
                <div className="card-header p-0">
                    <ul className="nav nav-tabs flex-wrap w-100 text-center customers-nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item flex-fill border-top" role="presentation">
                            <a href="$" className="nav-link active" data-bs-toggle="tab" data-bs-target="#profileTab" role="tab">Profile</a>
                        </li>
                        <li className="nav-item flex-fill border-top" role="presentation">
                            <a href="$" className="nav-link" data-bs-toggle="tab" data-bs-target="#passwordTab" role="tab">Password</a>
                        </li>
                        <li className="nav-item flex-fill border-top" role="presentation">
                            <a href="$" className="nav-link" data-bs-toggle="tab" data-bs-target="#billingTab" role="tab">Billing & Shipping</a>
                        </li>
                        <li className="nav-item flex-fill border-top" role="presentation">
                            <a href="$" className="nav-link" data-bs-toggle="tab" data-bs-target="#subscriptionTab" role="tab">Subscription</a>
                        </li>
                        <li className="nav-item flex-fill border-top" role="presentation">
                            <a href="$" className="nav-link" data-bs-toggle="tab" data-bs-target="#notificationsTab" role="tab">Notifications</a>
                        </li>
                        <li className="nav-item flex-fill border-top" role="presentation">
                            <a href="$" className="nav-link" data-bs-toggle="tab" data-bs-target="#connectionTab" role="tab">Connection</a>
                        </li>
                    </ul>
                </div>
                <div className="tab-content">
                    <TabProfile />
                    <TabPassword />
                    <TabBilling />
                    <div className="tab-pane fade" id="subscriptionTab" role="tabpanel">
                        <TabBillingContent />
                    </div>
                    <TabNotificationsContent />
                    <TabConnections />
                </div>
            </div>
        </div>
    )
}

export default CustomerCreateContent