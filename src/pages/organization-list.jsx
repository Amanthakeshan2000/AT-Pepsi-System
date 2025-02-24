import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import ProducrHeader from '@/components/product/ProductHeader'
import OrganizationTable from '@/components/settings/OrganizationTable'
import Footer from '@/components/shared/Footer'

const OrganizationList = () => {
    return (
        <>
            <PageHeader>
                {/* <ProducrHeader /> */}
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <OrganizationTable />
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default OrganizationList