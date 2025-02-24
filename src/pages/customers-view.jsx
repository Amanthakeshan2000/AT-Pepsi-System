import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import CustomersViewHeader from '@/components/customersView/CustomersViewHeader'
import CustomerContent from '@/components/customersView/CustomerContent'

const CustomersView = () => {
    return (
        <>
            <PageHeader>
                <CustomersViewHeader />
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <CustomerContent/>
                </div>
            </div>
        </>
    )
}

export default CustomersView