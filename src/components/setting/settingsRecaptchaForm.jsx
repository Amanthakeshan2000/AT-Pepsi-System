import React, { useState } from 'react'
import Footer from '@/components/shared/Footer'
import PageHeaderSetting from '@/components/shared/pageHeader/PageHeaderSetting'
import PerfectScrollbar from 'react-perfect-scrollbar'
import InputTopLabel from '@/components/shared/InputTopLabel'
import TextAreaTopLabel from '@/components/shared/TextAreaTopLabel'
import { settingOptions } from './settingsEmailForm'
import SelectDropdown from '@/components/shared/SelectDropdown'

const SettingsRecaptchaForm = () => {
    const options= settingOptions
    const [selectedOption, setSelectedOption] = useState(null)
    return (
        <div className="content-area">
            <PerfectScrollbar>
                <PageHeaderSetting />
                <div className="content-area-body">
                    <div className="card mb-0">
                        <div className="card-body">
                            <InputTopLabel
                                label={"Google API Client ID"}
                                placeholder={"Google API Client ID"}
                                info={"Google API Client ID [Ex: G-THEMEOCEAN-2024]"}
                            />
                            <InputTopLabel
                                label={"Google API Key"}
                                placeholder={"Google API Key"}
                                info={"Google API Key [Ex: 25DFSDDSF584DSF5245DFSF575]"}
                            />

                            <hr className="my-5" />
                            <div className="mb-5">
                                <h4 className="fw-bold">reCAPTCHA</h4>
                                <div className="fs-12 text-muted">reCAPTCHA setup</div>
                            </div>
                            <div className="mb-5">
                                <label className="form-label">Enable reCAPTCHA on customers area (Login/Register) </label>
                                <SelectDropdown
                                    options={options}
                                    defaultSelect={"yes"}
                                    selectedOption={selectedOption}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                                <small className="form-text text-muted">Enable reCAPTCHA on customers area (Login/Register) [Ex: Yes/No]</small>
                            </div>
                            <InputTopLabel
                                label={"Site key"}
                                placeholder={"Site key"}
                                info={"Site key [Ex: G-THEMEOCEAN-2024]"}
                            />
                            <InputTopLabel
                                label={"Secret key"}
                                placeholder={"Secret key"}
                                info={"Secret key [Ex: 25DFSDDSF584DSF5245DFSF575]"}
                            />
                            <InputTopLabel
                                label={"Ignored IP Addresses"}
                                placeholder={"Secret key"}
                                info={"Enter coma separated IP addresses that you want the reCaptcha to skip validation."}
                            />
                            <TextAreaTopLabel
                                label={"Ignored IP Addresses"}
                                placeholder="147.365.325.654
254.236.214.256
159.357.258.951
321.256.254.852
145.326.698.562
258.369.147.654
236.354.256.357"
                                info={"Enter coma separated IP addresses that you want the reCaptcha to skip validation."}
                            />

                        </div>
                    </div>
                </div>
                <Footer />
            </PerfectScrollbar>
        </div>

    )
}

export default SettingsRecaptchaForm