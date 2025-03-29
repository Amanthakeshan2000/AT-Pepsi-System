import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import CategoryHeader from '@/components/category/CategoryHeader'
import CategoryTable from '@/components/category/CategoryTable'
import Footer from '@/components/shared/Footer'
import SummeryofmonthTable from '@/components/Summeryofmonth/SummeryofmonthTable'
const SummeryofmonthTables = () => {
    return (
        <>
            <PageHeader>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <SummeryofmonthTable />
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default SummeryofmonthTables