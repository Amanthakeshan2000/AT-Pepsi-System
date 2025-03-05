import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import PaymentTable from '@/components/payment/InvoiceTable'
import PaymentHeader from '@/components/payment/PaymentHeader'
import Footer from '@/components/shared/Footer'

const PaymentList = () => {
    return (
        <>
            <PageHeader>
                <PaymentHeader />
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <PaymentTable />
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default PaymentList