import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import OrganizationCreate from '@/components/settings/OrganizationCreate'

const ProductCreates = () => {
    return (
        <>
            <PageHeader>
                {/* <PaymentHeader /> */}
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    {/* <PaymentTable /> */}
                    <OrganizationCreate />
                </div>
            </div>
        </>
    )
}

export default ProductCreates