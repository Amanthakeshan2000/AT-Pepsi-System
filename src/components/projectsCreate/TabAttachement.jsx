import React from 'react'
import Dropdown from '@/components/shared/Dropdown'
import { strogeOptions } from '../storage/StorageContent'

const TabAttachement = () => {
    return (
        <section className="step-body mt-4">
            <div>
                <div className="mb-5">
                    <h2 className="fs-16 fw-bold">Attachement files</h2>
                    <p className="text-muted">If you need more info, please check <a href="#">help center</a></p>
                </div>
                <div className="mb-4">
                    <label htmlFor="choose-file" className="custom-file-upload" id="choose-file-label"> Upload Document </label>
                    <input name="uploadDocument" type="file" id="choose-file" style={{ display: 'none' }} />
                </div>
                <div className="row">
                    {/* <RecentFileCard
                        imgSrc={"/images/file-icons/zip.png"}
                        title={"UI/UX Design Templates"}
                        projectLink={"Project"}
                        dashboardLink={"Dashboard"}
                        category={"Webapps"}
                    /> */}
                    <AttachementCard
                        title={"UI/UX Design Templates"}
                        iconSrc={"/images/file-icons/zip.png"}
                        category1={"Project"}
                        category2={"Dashboard"}
                        category3={"Webapps"}
                    />
                    <AttachementCard
                        title={"UI/UX Design Templates"}
                        iconSrc={"/images/file-icons/png.png"}
                        category1={"Project"}
                        category2={"Dashboard"}
                        category3={"Webapps"}
                    />
                    <AttachementCard
                        title={"UI/UX Design Templates"}
                        iconSrc={"/images/file-icons/pdf.png"}
                        category1={"Project"}
                        category2={"Dashboard"}
                        category3={"Webapps"}
                    />
                    <AttachementCard
                        title={"UI/UX Design Templates"}
                        iconSrc={"/images/file-icons/psd.png"}
                        category1={"Project"}
                        category2={"Dashboard"}
                        category3={"Webapps"}
                    />
                </div>
            </div>
        </section>

    )
}

export default TabAttachement


const AttachementCard = ({ title, category1, category2, category3, iconSrc }) => {
    return (
        <div className="col-sm-6">
            <div className="card stretch stretch-full">
                <div className="card-body p-0 ht-200 position-relative">
                    <a href="#" className="w-100 h-100 d-flex align-items-center justify-content-center">
                        <img src={iconSrc} className="img-fluid wd-80 ht-80" alt="img" />
                    </a>
                    <Dropdown dropdownItems={strogeOptions} dataBsToggle='offcanvas' dropdownParentStyle={"position-absolute top-15 right-15"}/>
                </div>
                <div className="card-footer p-4">
                    <h2 className="fs-13 mb-1 text-truncate-1-line">{title}</h2>
                    <small className="fs-10 text-uppercase">
                        <a href="#">{category1}</a> / <a href="#">{category2}</a> / <span className="text-gray-500">{category3}</span>
                    </small>
                </div>
            </div>
        </div>
    );
};