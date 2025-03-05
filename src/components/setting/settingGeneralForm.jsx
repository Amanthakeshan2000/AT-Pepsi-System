import React from 'react'
import PageHeaderSetting from '@/components/shared/pageHeader/PageHeaderSetting'
import Footer from '@/components/shared/Footer'
import TextAreaTopLabel from '@/components/shared/TextAreaTopLabel'
import { FiCamera } from 'react-icons/fi'
import useImageUpload from '@/hooks/useImageUpload'
import PerfectScrollbar from 'react-perfect-scrollbar'
import InputTopLabel from '@/components/shared/InputTopLabel'

const SettingGeneralForm = () => {
    const { handleImageUpload, uploadedImage } = useImageUpload()
    return (
        <div className="content-area">
            <PerfectScrollbar>
                <PageHeaderSetting />
                <div className="content-area-body">
                    <div className="card mb-0">
                        <div className="card-body">
                            <div className="mb-5">
                                <label htmlFor='img' className="wd-100 ht-100 position-relative overflow-hidden border border-gray-2 rounded d-inline-block" style={{ marginBottom: "-8px" }}>
                                    <img src={uploadedImage || "/images/logo-abbr.png"} className="upload-pic img-fluid rounded h-100 w-100" alt="img" />
                                    <div className="position-absolute start-50 top-50 end-0 bottom-0 translate-middle h-100 w-100 hstack align-items-center justify-content-center c-pointer upload-button">
                                        <i className="camera-icon" aria-hidden="true" ><FiCamera /></i>
                                    </div>
                                    <input className="file-upload" type="file" accept="image/*" id='img' hidden onChange={handleImageUpload} />
                                </label>
                            </div>
                            <InputTopLabel
                                label={"Name"}
                                placeholder={"Company Name"}
                                info={"Your company name [Ex: Theme Ocean]"}
                            />
                            <InputTopLabel
                                label={"Address"}
                                placeholder={"Company Address"}
                                info={"Your company address [Ex: 708 Heavner Court]"}
                            />
                            <InputTopLabel
                                label={"City"}
                                placeholder={"Company City"}
                                info={"Your company city [Ex: Levittown]"}
                            />
                            <InputTopLabel
                                label={"State"}
                                placeholder={"Company State"}
                                info={"Your company state [Ex: NY 11756]"}
                            />
                            <InputTopLabel
                                label={"Zip"}
                                placeholder={"Zip COde"}
                                info={"Zip Code [Ex: 11756]"}
                            />
                            <InputTopLabel
                                label={"Phone"}
                                placeholder={"Company Phone"}
                                info={"TIN Number [Ex: 987-6985-9658-654]"}
                            />
                            <InputTopLabel
                                label={"TIN Number"}
                                placeholder={"TIN Number"}
                                info={"TIN Number [Ex: 987-6985-9658-654]"}
                            />
                            <InputTopLabel
                                label={"Domain"}
                                placeholder={"Domain"}
                                info={"Company main domain [Ex: https://themeforest.net/user/theme_ocean]"}
                            />
                            <InputTopLabel
                                label={"Allowed"}
                                placeholder={"Allowed file types"}
                                info={"Allowed file types [Ex: .png,.jpg,.pdf,.doc,.docx,.xls,.xlsx,.zip,.rar,.txt]"}
                            />

                            <div className="mb-5">
                                <label className="form-label">Direction</label>
                                <div className="form-check">
                                    <label className="form-check-label" htmlFor="LRTdirection">LRT Direction (Left to Right)</label>
                                    <input className="form-check-input" type="radio" name="site-direction" id="LRTdirection" defaultChecked />
                                </div>
                                <div className="form-check">
                                    <label className="form-check-label" htmlFor="RTLdirection">RTL Direction (Right to Left)</label>
                                    <input className="form-check-input" type="radio" name="site-direction" id="RTLdirection" />
                                </div>
                            </div>
                            <TextAreaTopLabel
                                label={"Information (PDF and HTML)"}
                                placeholder="{company_name} 
{address}
{city} {state}
{country_code} {zip_code}
{vat_number_with_label}"
                                info="Company Information Format [Ex: {company_name} {address}, {city}, {state}, {zip_code}, {country_code}, {phone}, {vat_number}, {vat_number_with_label}]"
                            />
                        </div>
                    </div>
                </div>
                <Footer />
            </PerfectScrollbar>
        </div>

    )
}

export default SettingGeneralForm