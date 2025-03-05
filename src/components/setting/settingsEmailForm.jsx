import React, { useState } from 'react'
import Footer from '@/components/shared/Footer'
import PageHeaderSetting from '@/components/shared/pageHeader/PageHeaderSetting'
import SelectDropdown from '@/components/shared/SelectDropdown'
import InputTopLabel from '@/components/shared/InputTopLabel'
import TextAreaTopLabel from '@/components/shared/TextAreaTopLabel'
import { FiInfo } from 'react-icons/fi'
import PerfectScrollbar from 'react-perfect-scrollbar'

const mailEngine = [
    { value: "HPMailer", label: "HPMailer" },
    { value: "codeIgniter", label: "CodeIgniter" },
]
const mailProtocol = [
    { value: "Mail", label: "Mail" },
    { value: "SMTP", label: "SMTP" },
    { value: "Sendmail", label: "Sendmail" },
]
export const settingOptions = [
    { value: "yes", label: "Yes", icon: "feather-check", iconClassName: "text-success" },
    { value: "no", label: "No", icon: "feather-x", iconClassName: "text-danger" },
]

const SettingsEmailForm = () => {
    const [selectedOption, setSelectedOption] = useState(null)
    const options = settingOptions
    return (
        <div className="content-area">
            <PerfectScrollbar>
                <PageHeaderSetting />
                <div className="content-area-body">
                    <div className="card mb-0">
                        <div className="card-body">
                            <div className="mb-5">
                                <h4 className="fw-bold">SMTP Settings</h4>
                                <div className="fs-12 text-muted">SMTP setup main email</div>
                            </div>
                            <div className="mb-5">
                                <label className="form-label">Mail Engine <span className="text-danger">*</span></label>
                                <SelectDropdown
                                    options={mailEngine}
                                    defaultSelect={"HPMailer"}
                                    selectedOption={selectedOption}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                                <small className="form-text text-muted">Mail Engine [Ex: HPMailer/CodeIgniter]</small>
                            </div>
                            <div className="mb-5">
                                <label className="form-label">Email Protocol</label>
                                <SelectDropdown
                                    options={mailProtocol}
                                    defaultSelect={"SMTP"}
                                    selectedOption={selectedOption}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                                <small className="form-text text-muted">Email Protocol [Ex: Mail/SMTP/Sendmail]</small>
                            </div>
                            <InputTopLabel
                                label={"Email"}
                                placeholder={"Email"}
                                info={"Email [Ex: themeocean91@gmail.com]"}
                            />
                            <InputTopLabel
                                label={"Email Charset"}
                                placeholder={"Email Charset"}
                                info={"Email [Ex: utf-8]"}
                            />
                            <InputTopLabel
                                label={"Email Signature"}
                                placeholder={"Email Signature"}
                                info={"Email Signature [Ex: themeocean]"}
                            />
                            <TextAreaTopLabel
                                label={"Predefined Header"}
                                placeholder={"Predefined Header"}
                                info={"Predefined Header [Ex: Email template header code]"}
                                className={"mb-5"}
                            />
                            <TextAreaTopLabel
                                label={"Predefined Footer"}
                                placeholder={"Predefined Footer"}
                                info={"Predefined footer [Ex: Email template footer code]"}
                                className={"mb-5"}
                            />
                            <TextAreaTopLabel
                                label={"Predefined Footer"}
                                placeholder={"Predefined Footer"}
                                info={"Predefined footer [Ex: Email template footer code]"}
                            />


                            <hr className="my-5" />
                            <div className="mb-4">
                                <h4 className="fw-bold">Email Queue</h4>
                                <div className="fs-12 text-muted">Email queue setup</div>
                            </div>
                            <div className="mb-5">
                                <label className="form-label">
                                    <span className="me-2">Enable Email Queue</span>
                                    <span data-bs-toggle="tooltip" title="To speed up the emailing process, the system will add the emails in queue and will send them via cron job, make sure that the cron job is properly configured in order to use this feature."><i className="fs-13 text-muted lh-1" ><FiInfo /></i></span>
                                </label>
                                <SelectDropdown
                                    options={options}
                                    defaultSelect={"yes"}
                                    selectedOption={selectedOption}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                                <small className="form-text text-muted">Enable Email Queue [Ex: YES/NO]</small>
                            </div>
                            <div className="mb-0">
                                <label className="form-label">
                                    <span className="me-2">Do not add emails with attachments in the queue?</span>
                                    <span data-bs-toggle="tooltip" title="Most likely you will encounter problems with the email queue if the system needs to add big files to the queue."><i className="fs-13 text-muted lh-1" ><FiInfo /></i></span>
                                </label>
                                <SelectDropdown
                                    options={options}
                                    defaultSelect={"yes"}
                                    selectedOption={selectedOption}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                                <small className="form-text text-muted">Do not add emails with attachments in the queue? [Ex: YES/NO]</small>
                            </div>
                            <hr className="my-5" />
                            <div className="mb-5">
                                <h4 className="fw-bold">Send Test Email</h4>
                                <div className="fs-12 text-muted">Send test email to make sure that your SMTP settings is set correctly.</div>
                            </div>
                            <div className="mb-0">
                                <label className="form-label">Test Email</label>
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Send Test Email" />
                                    <a href="#" className="input-group-text">Send Test</a>
                                </div>
                                <small className="form-text text-muted">Send Test Email [Ex: test_1@email.com, test_2@email.com, test_3@email.com]</small>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </PerfectScrollbar>
        </div>

    )
}

export default SettingsEmailForm