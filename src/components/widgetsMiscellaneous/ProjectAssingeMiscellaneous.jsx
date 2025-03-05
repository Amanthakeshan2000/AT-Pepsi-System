import React from 'react'
import { recentDealData } from '@/utils/fackData/recentDealData'
import { Link } from 'react-router-dom'
import CircleProgress from '@/components/shared/CircleProgress'

const ProjectAssingeMiscellaneous = () => {
  return (
    <div className="col-lg-12">
      <div className="card stretch stretch-full">
        <div className="card-body">
          <div className="row g-4">
            {recentDealData.map(({ clossing_date, deal_name, deal_price, dealr_img, dealr_name }, index) => (
              <div key={index} className="col-xxl-3 col-lg-6">
                <div className="border border-dashed border-gray-5 p-4 rounded-3 gap-4 text-center">
                  <div className={`sales-progress-${index}`}>
                    <CircleProgress value={deal_price} text_first_sym="$" text_sym=" USD" />
                  </div>
                  <div className="mt-4">
                    <p className="fs-12 text-muted mb-1">Clossing date: <span className="fs-11 fw-medium text-dark">{clossing_date}</span></p>
                    <Link to="#" className="fw-bold text-truncate-1-line">{deal_name}</Link>
                    <div className="hstack gap-3 mt-3 justify-content-center">
                      <div className="avatar-image avatar-sm">
                        <img src={dealr_img} alt="" className="img-fluid" />
                      </div>
                      <Link to="#">{dealr_name}</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectAssingeMiscellaneous
