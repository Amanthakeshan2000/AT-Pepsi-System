import React from 'react'
import PageHeaderWidgets  from '@/components/shared/pageHeader/PageHeaderWidgets'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import ProjectDateLineMiscellaneous from '@/components/widgetsMiscellaneous/ProjectDateLineMiscellaneous'
import ProjectAssingeMiscellaneous from '@/components/widgetsMiscellaneous/ProjectAssingeMiscellaneous'
import ProjectTimeMiscellaneous from '@/components/widgetsMiscellaneous/ProjectTimeMiscellaneous'
import GoalMiscellaneous from '@/components/widgetsMiscellaneous/GoalMiscellaneous'
import Progress from '@/components/widgetsList/Progress'
import ForecasRevenuetMiscellaneousTwo from '@/components/widgetsMiscellaneous/ForecastRevenueMiscellaneousTwo'
import EstimateMiscellaneous from '@/components/widgetsMiscellaneous/EstimateMiscellaneous'
import SellingStatusMiscellaneous from '@/components/widgetsMiscellaneous/SellingStatusMiscellaneous'
import ConversionStatusMiscellaneous from '@/components/widgetsMiscellaneous/ConversionStatusMiscellaneous'
import TrafficSourceMiscellaneous from '@/components/widgetsMiscellaneous/TrafficSourceMiscellaneous'
import SalesMiscellaneous from '@/components/widgetsMiscellaneous/SalesMiscellaneous'
import CommentMiscellaneous from '@/components/widgetsMiscellaneous/CommentMiscellaneous'
import StatusMiscellaneous from '@/components/widgetsMiscellaneous/StatusMiscellaneous'
import Footer from '@/components/shared/Footer'
import { productsData } from '@/utils/fackData/productsData'

const WidgetsMiscellaneous = () => {
    return (
        <>
            <PageHeader >
                <PageHeaderWidgets />
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <ProjectDateLineMiscellaneous />
                    <ProjectAssingeMiscellaneous />
                    <Progress title={"Tasks Progress"} btnFooter={true}/>
                    <GoalMiscellaneous />
                    <ForecasRevenuetMiscellaneousTwo/>
                    <ProjectTimeMiscellaneous />
                    <SellingStatusMiscellaneous/>
                    <ConversionStatusMiscellaneous/>
                    <TrafficSourceMiscellaneous/>
                    <SalesMiscellaneous dataList={productsData}/>
                    <CommentMiscellaneous/>
                    <StatusMiscellaneous/>
                    <EstimateMiscellaneous/>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default WidgetsMiscellaneous