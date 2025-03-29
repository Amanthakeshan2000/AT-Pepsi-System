import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import Footer from '@/components/shared/Footer'
import PaymentTable from '@/components/Payments/PaymentTable'

const PaymentTables = () => {
    return (
        <>
            <PageHeader>
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

export default PaymentTables