import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import CategoryHeader from '@/components/category/CategoryHeader'
import CategoryTable from '@/components/category/CategoryTable'
import Footer from '@/components/shared/Footer'

const PaymentList = () => {
    return (
        <>
            <PageHeader>
                <CategoryHeader />
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <CategoryTable />
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default PaymentList