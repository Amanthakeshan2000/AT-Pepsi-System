import React, { useState } from 'react'
import PageHeaderSetting from '@/components/shared/pageHeader/PageHeaderSetting'
import Footer from '@/components/shared/Footer'
import InputTopLabel from '@/components/shared/InputTopLabel'
import { settingOptions } from './settingsEmailForm'
import SelectDropdown from '@/components/shared/SelectDropdown'
import MultiSelectImg from '@/components/shared/MultiSelectImg'
import PerfectScrollbar from 'react-perfect-scrollbar'

const status = [
    { label: "Sandbox", value: "sandbox" },
    { label: "Live", value: "live" },
]
const currencies = [
    { label: "USD", value: "USD", img: "/images/flags/1x1/us.svg" },
    { label: "EUR", value: "EUR", img: "/images/flags/1x1/eu.svg" },
    { label: "AUD", value: "AUD", img: "/images/flags/1x1/au.svg" },
    { label: "BDT", value: "BDT", img: "/images/flags/1x1/bd.svg" },
    { label: "GBP", value: "GBP", img: "/images/flags/1x1/gb.svg" },
    { label: "RUB", value: "RUB", img: "/images/flags/1x1/ru.svg" },
]
const SettingsGatewaysForm = () => {
    return (
        <div className="content-area">
            <PerfectScrollbar>
                <PageHeaderSetting />
                <div className="content-area-body">
                    <div className="card mb-0">
                        <div className="card-body">
                            <div className="mb-5">
                                <h4 className="fw-bold">Paypal</h4>
                                <div className="fs-12 text-muted">Paypal payment gateways</div>
                            </div>
                            <Paypal />
                            <hr className="my-5" />
                            <div className="mb-5">
                                <h4 className="fw-bold">Stripe Checkout</h4>
                                <div className="fs-12 text-muted">Stripe Checkout gateways</div>
                            </div>
                            <Stripe />
                            <hr className="my-5" />
                            <div className="mb-5">
                                <h4 className="fw-bold">2Checkout</h4>
                                <div className="fs-12 text-muted">2Checkout payment gateways</div>
                            </div>
                            <TwoCheckout />
                        </div>
                    </div>
                </div>
                <Footer />
            </PerfectScrollbar>
        </div>

    )
}

export default SettingsGatewaysForm

const Paypal = () => {
    const [selectedOption, setSelectedOption] = useState(null)
    const options = settingOptions
    return (
        <>
            <InputTopLabel
                label={"PayPal API Username"}
                placeholder={"PayPal API Username"}
                info={"PayPal API Username"}
            />
            <InputTopLabel
                label={"PayPal API Password"}
                placeholder={"PayPal API Password"}
                info={"PayPal API Password"}
            />
            <InputTopLabel
                label={"PayPal API Signature"}
                placeholder={"PayPal API Signature"}
                info={"PayPal API Signature"}
            />
            <div className="mb-5">
                <label className="form-label">Status</label>
                <SelectDropdown
                    options={status}
                    defaultSelect={"sandbox"}
                    selectedOption={selectedOption}
                    onSelectOption={(option) => setSelectedOption(option)}
                />
                <small className="form-text text-muted">Decimal Separator [Ex: Sandbox/Live]</small>
            </div>
            <div className="mb-5">
                <label className="form-label">Selected by default on invoice </label>
                <SelectDropdown
                    options={options}
                    defaultSelect={"yes"}
                    selectedOption={selectedOption}
                    onSelectOption={(option) => setSelectedOption(option)}
                />
                <small className="form-text text-muted">Selected by default on invoice [Ex: Yes/No]</small>
            </div>
            <div className="mb-5">
                <label className="form-label">Currencies</label>
                <MultiSelectImg
                    options={currencies}
                    defaultSelect={[currencies[0], currencies[1], currencies[2], currencies[3], currencies[4], currencies[5]]}
                />
                <small className="form-text text-muted">Currencies [Ex: USD/EUR/RUB]</small>
            </div>
        </>
    )
}

const Stripe = () => {
    const [selectedOption, setSelectedOption] = useState(null)
    const options = settingOptions
    return (
        <>
            <InputTopLabel
                label={"Stripe Publishable Key"}
                placeholder={"Stripe Publishable Key"}
                info={"Stripe Publishable Key"}
            />
            <InputTopLabel
                label={"Stripe API Secret Key"}
                placeholder={"Stripe API Secret Key"}
                info={"Stripe API Secret Key"}
            />
            <div className="mb-5">
                <label className="form-label">Status</label>
                <SelectDropdown
                    options={status}
                    defaultSelect={"sandbox"}
                    selectedOption={selectedOption}
                    onSelectOption={(option) => setSelectedOption(option)}
                />
                <small className="form-text text-muted">Decimal Separator [Ex: Sandbox/Live]</small>
            </div>
            <div className="mb-5">
                <label className="form-label">Selected by default on invoice </label>
                <SelectDropdown
                    options={options}
                    defaultSelect={"yes"}
                    selectedOption={selectedOption}
                    onSelectOption={(option) => setSelectedOption(option)}
                />
                <small className="form-text text-muted">Selected by default on invoice [Ex: Yes/No]</small>
            </div>
            <div className="mb-5">
                <label className="form-label">Allow primary contact to update stored credit card token? </label>
                <SelectDropdown
                    options={options}
                    defaultSelect={"yes"}
                    selectedOption={selectedOption}
                    onSelectOption={(option) => setSelectedOption(option)}
                />
                <small className="form-text text-muted">Allow primary contact to update stored credit card token? [Ex: Yes/No]</small>
            </div>
            <div className="mb-5">
                <label className="form-label">Currencies</label>
                <MultiSelectImg
                    options={currencies}
                    defaultSelect={[currencies[0], currencies[1], currencies[2], currencies[3], currencies[4], currencies[5]]}
                />
                <small className="form-text text-muted">Currencies [Ex: USD/EUR/RUB]</small>
            </div>
        </>
    )
}

const TwoCheckout = () => {
    const [selectedOption, setSelectedOption] = useState(null)
    const options = settingOptions
    return (
        <>
            <InputTopLabel
                label={"Merchant Code"}
                placeholder={"Merchant Code"}
                info={"Merchant Code"}
            />
            <InputTopLabel
                label={"Secret Code"}
                placeholder={"Secret Code"}
                info={"Secret Code"}
            />
            <div className="mb-5">
                <label className="form-label">Status</label>
                <SelectDropdown
                    options={status}
                    defaultSelect={"sandbox"}
                    selectedOption={selectedOption}
                    onSelectOption={(option) => setSelectedOption(option)}
                />
                <small className="form-text text-muted">Decimal Separator [Ex: Sandbox/Live]</small>
            </div>
            <div className="mb-5">
                <label className="form-label">Selected by default on invoice </label>
                <SelectDropdown
                    options={options}
                    defaultSelect={"yes"}
                    selectedOption={selectedOption}
                    onSelectOption={(option) => setSelectedOption(option)}
                />
                <small className="form-text text-muted">Selected by default on invoice [Ex: Yes/No]</small>
            </div>
            <div className="mb-5">
                <label className="form-label">Allow primary contact to update stored credit card token? </label>
                <SelectDropdown
                    options={options}
                    defaultSelect={"yes"}
                    selectedOption={selectedOption}
                    onSelectOption={(option) => setSelectedOption(option)}
                />
                <small className="form-text text-muted">Allow primary contact to update stored credit card token? [Ex: Yes/No]</small>
            </div>
            <div className="mb-5">
                <label className="form-label">Currencies</label>
                <MultiSelectImg
                    options={currencies}
                    defaultSelect={[currencies[0], currencies[1], currencies[2], currencies[3], currencies[4], currencies[5]]}
                />
                <small className="form-text text-muted">Currencies [Ex: USD/EUR/RUB]</small>
            </div>
        </>
    )
}