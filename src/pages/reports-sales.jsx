import React from 'react'
import ForecastRevenueMiscellaneous from '@/components/widgetsMiscellaneous/ForecastRevenueMiscellaneous'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import PageHeaderWidgets  from '@/components/shared/pageHeader/PageHeaderWidgets'
import Footer from '@/components/shared/Footer'
import LeadsStatus from '@/components/widgetsTables/LeadsStatus'
import SalesPipelineChart from '@/components/widgetsCharts/SalesPipelineChart'
import EstimateStatisticsTwo from '@/components/widgetsStatistics/EstimateStatisticsTwo'
import ProjectAssingeMiscellaneous from '@/components/widgetsMiscellaneous/ProjectAssingeMiscellaneous'
import EstimateAreaChartThree from '@/components/widgetsCharts/EstimateAreaChartThree'

const ReportsSales = () => {
  return (
    <>
      <PageHeader >
        <PageHeaderWidgets />
      </PageHeader>
      <div className='main-content'>
        <div className='row'>
          <EstimateStatisticsTwo/>
          <SalesPipelineChart isFooterShow={true}/>
          <ForecastRevenueMiscellaneous />
          <ProjectAssingeMiscellaneous />
          <EstimateAreaChartThree />
          <LeadsStatus title={"Contact Leads"} progressFullHeight={true}/>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ReportsSales