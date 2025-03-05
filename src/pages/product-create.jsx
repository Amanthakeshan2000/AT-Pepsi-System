import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import ProductCreate from '@/components/product/ProductCreate'

const ProductCreates = () => {
    return (
        <>
            <PageHeader>
                {/* <PaymentHeader /> */}
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    {/* <PaymentTable /> */}
                    <ProductCreate />
                </div>
            </div>
        </>
    )
}

export default ProductCreates