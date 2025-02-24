import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import DeviceCreate from '@/components/device/DeviceCreate'

const DevicesCreate = () => {
    return (
        <>
            <PageHeader>
                {/* <PaymentHeader /> */}
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    {/* <PaymentTable /> */}
                    <DeviceCreate />
                </div>
            </div>
        </>
    )
}

export default DevicesCreate