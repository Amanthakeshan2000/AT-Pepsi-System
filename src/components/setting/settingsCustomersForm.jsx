import React, { useState } from 'react'
import Footer from '@/components/shared/Footer'
import PageHeaderSetting from '@/components/shared/pageHeader/PageHeaderSetting'
import { settingOptions } from './settingsEmailForm'
import SelectDropdown from '@/components/shared/SelectDropdown'
import TextAreaTopLabel from '@/components/shared/TextAreaTopLabel'
import MultiSelectTags from '@/components/shared/MultiSelectTags'

const permissionsOptions = [
    { label: "Invoices", value: "invoices" },
    { label: "Estimates", value: "estimates" },
    { label: "Contracts", value: "contracts" },
    { label: "Proposals", value: "proposals" },
    { label: "Support", value: "support" },
    { label: "Projects", value: "projects" },
]
const SettingsCustomersForm = () => {
    const [selectedOption, setSelectedOption] = useState(null)
    const options = settingOptions
    return (
        <div className="content-area" data-scrollbar-target="#psScrollbarInit">
            <PageHeaderSetting />
            <div className="content-area-body">
                <div className="card mb-0">
                    <div className="card-body">
                        <div className="mb-5">
                            <label className="form-label">Company field is required? </label>
                            <SelectDropdown
                                options={options}
                                defaultSelect={"yes"}
                                selectedOption={selectedOption}
                                onSelectOption={(option) => setSelectedOption(option)}
                            />
                            <small className="form-text text-muted">Company field is required? [Ex: Yes/No]</small>
                        </div>
                        <div className="mb-5">
                            <label className="form-label">Company requires the usage of the VAT Number field </label>
                            <SelectDropdown
                                options={options}
                                defaultSelect={"no"}
                                selectedOption={selectedOption}
                                onSelectOption={(option) => setSelectedOption(option)}
                            />
                            <small className="form-text text-muted">Company requires the usage of the VAT Number field [Ex: Yes/No]</small>
                        </div>
                        <div className="mb-5">
                            <label className="form-label">Allow customers to register </label>
                            <SelectDropdown
                                options={options}
                                defaultSelect={"yes"}
                                selectedOption={selectedOption}
                                onSelectOption={(option) => setSelectedOption(option)}
                            />
                            <small className="form-text text-muted">Allow customers to register [Ex: Yes/No]</small>
                        </div>
                        <div className="mb-5">
                            <label className="form-label">Allow primary contact to manage other customer contacts </label>
                            <SelectDropdown
                                options={options}
                                defaultSelect={"no"}
                                selectedOption={selectedOption}
                                onSelectOption={(option) => setSelectedOption(option)}
                            />
                            <small className="form-text text-muted">Allow primary contact to manage other customer contacts [Ex: Yes/No]</small>
                        </div>
                        <div className="mb-5">
                            <label className="form-label">Enable Honeypot spam validation </label>
                            <SelectDropdown
                                options={options}
                                defaultSelect={"yes"}
                                selectedOption={selectedOption}
                                onSelectOption={(option) => setSelectedOption(option)}
                            />
                            <small className="form-text text-muted">Enable Honeypot spam validation [Ex: Yes/No]</small>
                        </div>
                        <div className="mb-5">
                            <label className="form-label">Require registration confirmation from administrator after customer register </label>
                            <SelectDropdown
                                options={options}
                                defaultSelect={"no"}
                                selectedOption={selectedOption}
                                onSelectOption={(option) => setSelectedOption(option)}
                            />
                            <small className="form-text text-muted">Require registration confirmation from administrator after customer register [Ex: Yes/No]</small>
                        </div>
                        <div className="mb-5">
                            <label className="form-label"> Contacts see only own files uploaded in customer area (files uploaded in customer profile) </label>
                            <SelectDropdown
                                options={options}
                                defaultSelect={"yes"}
                                selectedOption={selectedOption}
                                onSelectOption={(option) => setSelectedOption(option)}
                            />
                            <small className="form-text text-muted"> Contacts see only own files uploaded in customer area (files uploaded in customer profile) [Ex: Yes/No]</small>
                        </div>
                        <div className="mb-5">
                            <label className="form-label">Allow contacts to delete own files uploaded from customers area </label>
                            <SelectDropdown
                                options={options}
                                defaultSelect={"no"}
                                selectedOption={selectedOption}
                                onSelectOption={(option) => setSelectedOption(option)}
                            />
                            <small className="form-text text-muted">Allow contacts to delete own files uploaded from customers area [Ex: Yes/No]</small>
                        </div>
                        <div className="mb-5">
                            <label className="form-label"> Use Knowledge Base </label>
                            <SelectDropdown
                                options={options}
                                defaultSelect={"yes"}
                                selectedOption={selectedOption}
                                onSelectOption={(option) => setSelectedOption(option)}
                            />
                            <small className="form-text text-muted"> Use Knowledge Base [Ex: Yes/No]</small>
                        </div>
                        <div className="mb-5">
                            <label className="form-label">Allow primary contact to view/edit billing &amp; shipping details </label>
                            <SelectDropdown
                                options={options}
                                defaultSelect={"no"}
                                selectedOption={selectedOption}
                                onSelectOption={(option) => setSelectedOption(option)}
                            />
                            <small className="form-text text-muted">Allow primary contact to view/edit billing &amp; shipping details [Ex: Yes/No]</small>
                        </div>
                        <div className="mb-5">
                            <label className="form-label">Allow knowledge base to be viewed without registration </label>
                            <SelectDropdown
                                options={options}
                                defaultSelect={"yes"}
                                selectedOption={selectedOption}
                                onSelectOption={(option) => setSelectedOption(option)}
                            />
                            <small className="form-text text-muted">Allow knowledge base to be viewed without registration [Ex: Yes/No]</small>
                        </div>
                        <div className="mb-5">
                            <label className="form-label">Default contact permissions </label>
                            <MultiSelectTags
                                options={permissionsOptions}
                                defaultSelect={[permissionsOptions[0], permissionsOptions[1], permissionsOptions[2], permissionsOptions[3], permissionsOptions[4], permissionsOptions[5]]}
                            />
                            <small className="form-text text-muted">Default contact permissions [Ex: USD/EUR/RUB]</small>
                        </div>
                        <TextAreaTopLabel
                            label={"Customer Information Format (PDF and HTML)"}
                            placeholder="{company_name}
{street}
{city} {state}
{country_code} {zip_code}
{vat_number_with_label}"
                            info={"Customer Information Format (PDF and HTML) [Ex: {company_name}, {customer_id}, {street}, {city}, {state}, {zip_code}, {country_code}, {country_name}, {phone}, {vat_number}, {vat_number_with_label}]"}
                        />

                    </div>
                </div>
            </div>
            <Footer />
        </div>

    )
}

export default SettingsCustomersForm