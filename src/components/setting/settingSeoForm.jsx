import React, { useState } from 'react'
import PageHeaderSetting from '@/components/shared/pageHeader/PageHeaderSetting'
import InputTopLabel from '@/components/shared/InputTopLabel'
import TextAreaTopLabel from '@/components/shared/TextAreaTopLabel'
import Footer from '@/components/shared/Footer'
import SelectDropdown from '@/components/shared/SelectDropdown'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { settingOptions } from './settingsEmailForm'


const SettingSeoForm = () => {
    const [selectedOption, setSelectedOption] = useState(null)
    const options= settingOptions
    return (
        <div className="content-area setting-form">
            <PerfectScrollbar>
                <PageHeaderSetting />
                <div className="content-area-body">
                    <div className="card mb-0">
                        <div className="card-body">
                            <InputTopLabel
                                label={"Site Title"}
                                placeholder={"Site Title"}
                                info={"SEO Title [Ex: CRM Application & Admin Dashboard]"}
                                isRequired={true}
                            />
                            <InputTopLabel
                                label={"Site Slug"}
                                placeholder={"Site Slug"}
                                info={"SEO Slug [Ex: crm-adpplication-and-admin-dashboard]"}
                                isOptional={true}
                            />
                            <TextAreaTopLabel
                                label={"Meta Description (max 160 chars)"}
                                placeholder={"Meta Description (max 160 chars)"}
                                info={"Meta Description (max 160 chars) [Ex: A meta description is a brief summary of a webpage's content that appears in search engine results pages (SERPs).]"}
                                className="mb-5"
                            />
                            <TextAreaTopLabel
                                label={"Meta Keywords (max 15 keywords)"}
                                placeholder={"Meta Keywords (max 15 keywords)"}
                                info={"Meta Keywords (max 15 keywords) [Ex: CRM, Admin, Dashbard, webapp]"}
                                className="mb-5"
                            />


                            <div className="mb-5">
                                <label className="form-label">URL Rewriting?</label>
                                <SelectDropdown
                                    options={options}
                                    defaultSelect={"yes"}
                                    selectedOption={selectedOption}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                                <small className="form-text text-muted">URL Rewriting [Ex: Yes/No]</small>
                            </div>
                            <div className="mb-5">
                                <label className="form-label">Minify CSS</label>
                                <SelectDropdown
                                    options={options}
                                    defaultSelect={"yes"}
                                    selectedOption={selectedOption}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                                <small className="form-text text-muted">Minify CSS [Ex: Yes/No]</small>
                            </div>
                            <div className="mb-5">
                                <label className="form-label">Minify JS</label>
                                <SelectDropdown
                                    options={options}
                                    defaultSelect={"yes"}
                                    selectedOption={selectedOption}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                                <small className="form-text text-muted">Minify JS [Ex: Yes/No]</small>
                            </div>
                            <InputTopLabel
                                label={"Google Analytics"}
                                placeholder={"Google Analytics"}
                                info={"Google Analytics [Ex: UA-XXXXX-Y]"}
                                className="mb-0"
                            />
                        </div>
                    </div>
                </div>
                <Footer />
            </PerfectScrollbar>
        </div>

    )
}

export default SettingSeoForm