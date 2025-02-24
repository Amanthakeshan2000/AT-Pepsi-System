import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import CategoryCreate from '@/components/category/CategoryCreate'

const CategoryCreates = () => {
    return (
        <>
            <PageHeader>
                {/* <PaymentHeader /> */}
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    {/* <PaymentTable /> */}
                    <CategoryCreate />
                </div>
            </div>
        </>
    )
}

export default CategoryCreates