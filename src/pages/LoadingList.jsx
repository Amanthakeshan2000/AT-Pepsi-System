import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import ProducrHeader from '@/components/product/ProductHeader'
import LoadingTable from '@/components/loadingSheet/LoadingTable'
import Footer from '@/components/shared/Footer'

const LoadingList = () => {
    return (
        <>
            <PageHeader>
                {/* <ProducrHeader /> */}
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <LoadingTable />
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default LoadingList