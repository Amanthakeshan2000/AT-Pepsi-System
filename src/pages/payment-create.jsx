import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import InvoiceView from '@/components/payment/InvoiceView'


const PaymentCreate = () => {
    return (
        <>
            <PageHeader>
                {/* <PaymentHeader /> */}
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <InvoiceView />
                </div>
            </div>
        </>
    )
}

export default PaymentCreate