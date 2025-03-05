import React from 'react'
import { FiAlertOctagon, FiCheck, FiEye, FiMoreVertical, FiSend } from 'react-icons/fi';

const TabBillingContent = ({billingHistoryshow}) => {
    const billingHistory = [
        { id: '#258963', date: '02 NOV, 2022', amount: '$350', status: 'Completed', statusColor: 'success' },
        { id: '#987456', date: '05 DEC, 2022', amount: '$590', status: 'Pending', statusColor: 'warning' },
        { id: '#456321', date: '31 NOV, 2022', amount: '$450', status: 'Rejected', statusColor: 'danger' },
        { id: '#357951', date: '03 JAN, 2023', amount: '$250', status: 'Completed', statusColor: 'success' },
    ];
    return (
        <>
            <div
                className="alert alert-dismissible m-4 p-4 d-flex alert-soft-teal-message"
                role="alert"
            >
                <div className="me-4 d-none d-md-block">
                    <FiAlertOctagon className='fs-1' />
                </div>
                <div>
                    <p className="fw-bold mb-1 text-truncate-1-line">
                        We need your attention!
                    </p>
                    <p className="fs-12 fw-medium text-truncate-1-line">
                        Your payment was declined. To start using tools, please{" "}
                        <strong>Add Payment Method</strong>
                    </p>
                    <a
                        href="#"
                        className="btn btn-sm bg-soft-teal text-teal d-inline-block"
                    >
                        Add Payment Method
                    </a>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                    />
                </div>
            </div>
            <div className="subscription-plan px-4 pt-4">
                <div className="mb-4 d-flex align-items-center justify-content-between">
                    <h5 className="fw-bold mb-0">Subscription &amp; Plan:</h5>
                    <a href="#" className="btn btn-sm btn-light-brand">
                        4 days remaining
                    </a>
                </div>
                <SubscriptionPlan
                    planName="Team Plan"
                    description="A simple start for everyone"
                    price="$29.99"
                    billingCycle="Month"
                    nextPayment="12/10/2023"
                    onCancel={() => alert('Cancel Plan clicked')}
                    onUpdate={() => alert('Update Plan clicked')}
                />
                <div className="row">
                    <SubscriptionCard
                        planName="BASIC"
                        description="Starter plan for individuals."
                        details="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod ipsa id corrupti modi, impedit exercitationem harum voluptates reiciendis."
                        price="$12.99"
                        billingCycle="Month"
                        isActive={false}
                    />
                    <SubscriptionCard
                        planName="TEAM"
                        description="Collaborate up to 10 people."
                        details="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod ipsa id corrupti modi, impedit exercitationem harum voluptates reiciendis."
                        price="$29.99"
                        billingCycle="Month"
                        isActive={true}
                    />
                    <SubscriptionCard
                        planName="ENTERPRISE"
                        description="For bigger businesses."
                        details="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod ipsa id corrupti modi, impedit exercitationem harum voluptates reiciendis."
                        price="$49.99"
                        billingCycle="Month"
                        isActive={false}
                    />
                </div>
            </div>
            <hr className="mt-2" />
            <div className="payment-methord px-4">
                <div className="mb-4 d-flex align-items-center justify-content-between">
                    <h5 className="fw-bold mb-0">Payment Methods:</h5>
                    <a href="#" className="btn btn-sm btn-light-brand">Add Method</a>
                </div>
                <div className="row">
                    <div className="col-xxl-6 col-xl-12 col-lg-6">
                        <PaymentMethod
                            cardType="mastercard"
                            cardHolder="Alexandra Della"
                            cardNumber="5155 **** **** ****"
                            expiryDate="12/24"
                            isActive={true}
                        />
                    </div>
                    <div className="col-xxl-6 col-xl-12 col-lg-6">
                        <PaymentMethod
                            cardType="visa"
                            cardHolder="Alexandra Della"
                            cardNumber="4236 **** **** ****"
                            expiryDate="11/23"
                        />
                    </div>
                    <div className="col-xxl-6 col-xl-12 col-lg-6">
                        <PaymentMethod
                            cardType="american-express"
                            cardHolder="Alexandra Della"
                            cardNumber="3437 **** **** ****"
                            expiryDate="11/24"
                        />
                    </div>
                    <div className="col-xxl-6 col-xl-12 col-lg-6">
                        <PaymentMethod
                            cardType="discover"
                            cardHolder="Alexandra Della"
                            cardNumber="6011 **** **** ****"
                            expiryDate="11/25"
                        />
                    </div>
                </div>
            </div>

            <hr className="mt-2" />
            {billingHistoryshow && <BillingHistory history={billingHistory} />}
        </>

    )
}

export default TabBillingContent


const SubscriptionPlan = ({ planName, description, price, billingCycle, nextPayment, onCancel, onUpdate }) => {
    return (
        <div className="p-4 mb-4 d-xxl-flex d-xl-block d-md-flex align-items-center justify-content-between gap-4 border border-dashed border-gray-5 rounded-1">
            <div>
                <div className="fs-14 fw-bold text-dark mb-1">
                    Your current plan is <a href="#" className="badge bg-primary text-white ms-2">{planName}</a>
                </div>
                <div className="fs-12 text-muted">{description}</div>
            </div>
            <div className="my-3 my-xxl-0 my-md-3 my-md-0">
                <div className="fs-20 text-dark">
                    <span className="fw-bold">{price}</span> / <em className="fs-11 fw-medium">{billingCycle}</em>
                </div>
                <div className="fs-12 text-muted mt-1">
                    Billed Monthly / Next payment on {nextPayment} for <strong className="text-dark">$62.48</strong>
                </div>
            </div>
            <div className="hstack gap-3">
                <a href="#" className="text-danger" onClick={onCancel}>Cancel Plan</a>
                <a href="#" className="btn btn-light-brand" onClick={onUpdate}>Update Plan</a>
            </div>
        </div>
    );
};


const SubscriptionCard = ({ planName, description, details, price, billingCycle, isActive }) => {
    return (
        <div className="col-xxl-4 col-xl-12 col-lg-4">
            <a href="#" className={`p-4 mb-4 d-block ${isActive ? 'bg-soft-200' : 'bg-soft-100'} border border-dashed border-gray-5 rounded-1 position-relative`}>
                <h6 className="fs-13 fw-bold">{planName}</h6>
                <p className="fs-12 fw-normal text-muted">{description}</p>
                <p className="fs-12 fw-normal text-muted text-truncate-2-line">{details}</p>
                <div className="mt-4">
                    <span className="fs-16 fw-bold text-dark">{price}</span> / <em className="fs-11 fw-medium">{billingCycle}</em>
                </div>
                {isActive && (
                    <div className="position-absolute top-0 start-50 translate-middle">
                        <FiCheck size={20} className='bg-primary text-white p-1 rounded-circle' />
                    </div>
                )}
            </a>
        </div>
    );
};


const PaymentMethod = ({ isActive, cardType, cardHolder, cardNumber, expiryDate, cardImg }) => {
    return (
        <div className="px-4 py-2 mb-4 d-sm-flex justify-content-between border border-dashed border-gray-3 rounded-1 position-relative">
            <div className="d-sm-flex align-items-center">
                <div className="wd-100">
                    <img src={`/images/payment/${cardType}.svg`} className="img-fluid" alt="" />
                </div>
                <div className="ms-0 ms-sm-3">
                    <div className="text-dark fw-bold mb-2">{cardHolder}</div>
                    <div className="mb-0 text-truncate-1-line">{cardNumber}</div>
                    <small className="fs-10 fw-medium text-uppercase text-muted text-truncate-1-line">Card expires at {expiryDate}</small>
                </div>
            </div>
            <div className="hstack gap-3 mt-3 mt-sm-0">
                <a href="#" className="text-danger" >Delete</a>
                <a href="#" className="btn btn-sm btn-light">Edit</a>
            </div>
            {isActive && (
                <div className="position-absolute top-50 start-0 translate-middle">
                    <FiCheck size={20} className='bg-primary text-white p-1 rounded-circle' />
                </div>
            )}
        </div>
    );
};


const BillingHistory = ({ history }) => {
    return (
        <div className="payment-history">
            <div className="mb-4 px-4 d-flex align-items-center justify-content-between">
                <h5 className="fw-bold mb-0">Billing History:</h5>
                <a href="#" className="btn btn-sm btn-light-brand">All History</a>
            </div>
            <div className="table-responsive">
                <table className="table mb-0">
                    <thead>
                        <tr className="border-top">
                            <th>ID</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th className="text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((item, index) => (
                            <tr key={index}>
                                <td><a href="#">{item.id}</a></td>
                                <td>{item.date}</td>
                                <td>{item.amount}</td>
                                <td><span className={`badge bg-soft-${item.statusColor} text-${item.statusColor}`}>{item.status}</span></td>
                                <td className="hstack justify-content-end gap-4 text-end">
                                    <a href="#" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Sent Mail"><FiSend className='fs-12' /></a>
                                    <a href="#" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Invoice Details"><FiEye className='fs-12' /></a>
                                    <a href="#" data-bs-toggle="tooltip" data-bs-trigger="hover" title="More Options"><FiMoreVertical className='fs-12' /></a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

