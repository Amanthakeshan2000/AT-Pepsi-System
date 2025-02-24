import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import ProducrHeader from '@/components/product/ProductHeader'
import ProductTable from '@/components/product/ProductTable'
import Footer from '@/components/shared/Footer'

const ProductList = () => {
    return (
        <>
            <PageHeader>
                <ProducrHeader />
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <ProductTable />
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default ProductList