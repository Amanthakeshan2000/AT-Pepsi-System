import React, { Fragment } from 'react'
import CardHeader from '@/components/shared/CardHeader';
import useCardTitleActions from '@/hooks/useCardTitleActions';
import CardLoader from '@/components/shared/CardLoader';

const invoiceData = [
    { status: 'Draft', count: 5, percentage: 23.42, color: 'primary' },
    { status: 'Not Sent', count: 22, percentage: 33.86, color: 'warning' },
    { status: 'Unpaid', count: 8, percentage: 38.57, color: 'danger' },
    { status: 'Overdue', count: 4, percentage: 27.65, color: 'teal' },
    { status: 'Paid', count: 34, percentage: 76.89, color: 'success' }
];
const estimateData = [
    { status: 'Draft', count: 6, percentage: 20.42, color: 'primary' },
    { status: 'Not Sent', count: 32, percentage: 42.86, color: 'warning' },
    { status: 'Unpaid', count: 14, percentage: 55.57, color: 'danger' },
    { status: 'Overdue', count: 8, percentage: 35.65, color: 'teal' },
    { status: 'Paid', count: 30, percentage: 84.89, color: 'success' }
];
const proposalData = [
    { status: 'Draft', count: 2, percentage: 15.42, color: 'primary' },
    { status: 'Not Sent', count: 4, percentage: 30.86, color: 'warning' },
    { status: 'Unpaid', count: 16, percentage: 40.57, color: 'danger' },
    { status: 'Overdue', count: 9, percentage: 25.65, color: 'teal' },
    { status: 'Paid', count: 20, percentage: 65.89, color: 'success' }
];


const InvoiceOverview = ({ title }) => {

    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();

    if (isRemoved) {
        return null;
    }
    return (
        <div className="col-xxl-6 col-lg-6">
            <div className={`card stretch stretch-full ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
                <CardHeader title={title} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} />
                <div className="card-body custom-card-action p-0">
                    <ul className="nav-tab-items-wrapper nav nav-justified invoice-overview-tab-item">
                        <li className="nav-item">
                            <a href="#" className="nav-link active" data-bs-toggle="tab" data-bs-target="#invoiceTab">Invoice</a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link" data-bs-toggle="tab" data-bs-target="#estimateTab">Estimate</a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link" data-bs-toggle="tab" data-bs-target="#proposalTab">Proposal</a>
                        </li>
                    </ul>
                    <div className="tab-content p-4">
                        <div className="tab-pane fade show active" id="invoiceTab" role="tabpanel" aria-labelledby="invoiceTab">
                            {invoiceData.map((data, index) => (
                                <InvoiceStatus key={index} {...data} />
                            ))}
                        </div>
                        <div className="tab-pane fade" id="estimateTab" role="tabpanel" aria-labelledby="estimateTab">
                            {estimateData.map((data, index) => (
                                <InvoiceStatus key={index} {...data} />
                            ))}
                        </div>
                        <div className="tab-pane fade" id="proposalTab" role="tabpanel" aria-labelledby="proposalTab">
                            {proposalData.map((data, index) => (
                                <InvoiceStatus key={index} {...data} />
                            ))}
                        </div>
                    </div>
                    <div className="px-4 pt-4 border-top">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="card border-dashed">
                                    <div className="card-body">
                                        <p className="fs-16 fw-bold text-primary mb-2">$2,658 USD</p>
                                        <p className="text-muted mb-0">Due Invoices</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="card border-dashed">
                                    <div className="card-body">
                                        <p className="fs-16 fw-bold text-success mb-2">$6,863 USD</p>
                                        <p className="text-muted mb-0">Paid Invoices</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <CardLoader refreshKey={refreshKey} />
            </div>
        </div>

    )
}

export default InvoiceOverview

const InvoiceStatus = ({ status, count, percentage, color }) => {
    return (
        <div className="mt-4 pt-2">
            <div className="d-flex align-items-center justify-content-between">
                <a href="#" className="fs-12 fw-medium text-muted">{status} ({count})</a>
                <div className="fs-12 text-muted">{percentage}%</div>
            </div>
            <div className="progress mt-2 ht-3">
                <div className={`progress-bar bg-${color}`} role="progressbar" style={{ width: `${percentage}%` }} />
            </div>
        </div>
    );
};