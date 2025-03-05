import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import PaymentHeader from '@/components/payment/PaymentHeader'
import InvoiceView from '@/components/payment/InvoiceView'
import { useParams } from 'react-router-dom'

const PaymentView = () => {
    const { id } = useParams();
    return (
        <>
            <PageHeader>
                <PaymentHeader />
            </PageHeader>
            <div className='main-content container-lg'>
                <div className='row'>
                    <InvoiceView invoiceId={id} />
                </div>
            </div>

        </>
    )
}

export default PaymentView