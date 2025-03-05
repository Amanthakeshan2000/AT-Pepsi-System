import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import CustomersCreateHeader from '@/components/customersCreate/CustomersCreateHeader'
import CustomerCreateContent from '@/components/customersCreate/CustomerCreateContent'

const CustomersCreate = () => {
    return (
        <>
            <PageHeader>
                <CustomersCreateHeader />
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <CustomerCreateContent />
                </div>
            </div>
        </>
    )
}

export default CustomersCreate