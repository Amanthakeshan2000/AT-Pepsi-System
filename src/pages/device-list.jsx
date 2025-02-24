import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import DeviceHeader from '@/components/device/DeviceHeader'
import DeviceTable from '@/components/device/DeviceTable'
import Footer from '@/components/shared/Footer'

const DeviceList = () => {
    return (
        <>
            <PageHeader>
                <DeviceHeader />
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <DeviceTable />
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default DeviceList