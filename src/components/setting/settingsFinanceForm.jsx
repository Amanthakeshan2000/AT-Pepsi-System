import React, { useState } from 'react'
import PageHeaderSetting from '@/components/shared/pageHeader/PageHeaderSetting'
import Footer from '@/components/shared/Footer'
import { settingOptions } from './settingsEmailForm'
import SelectDropdown from '@/components/shared/SelectDropdown'
import { FiCalendar } from 'react-icons/fi'
import PerfectScrollbar from 'react-perfect-scrollbar'
import TextAreaTopLabel from '@/components/shared/TextAreaTopLabel'

const decimalSeparator = [
  { value: "dot", label: ". (Dot)" },
  { value: "clone", label: ", (Clone)" },
]
const thousandSeparator = [
  { value: "dot", label: ". (Dot)" },
  { value: "clone", label: ", (Clone)" },
  { value: "apostrophe", label: "' (Apostrophe)" },
  { value: "none", label: "None" },
  { value: "space", label: "Space" },
]

const taxOptions = [
  { value: "no-tax", label: "No Tax", color: "#283c50" },
  { value: "5-percent", label: "5% + $2", color: "#3454d1" },
  { value: "10-percent", label: "10% + $2", color: "#17c666" },
  { value: "15-percent", label: "15% + $2", color: "#6610f2" },
  { value: "20-percent", label: "20% + $2", color: "#ffa21d" },
  { value: "25-percent", label: "25% + $2", color: "#ea4d4d" }
]
const SettingsFinanceForm = () => {
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
                <h4 className="fw-bold">Finance General</h4>
                <div className="fs-12 text-muted">Financial general settings</div>
              </div>
              <div className="mb-5">
                <label className="form-label">Decimal Separator </label>
                <SelectDropdown
                  options={decimalSeparator}
                  defaultSelect={"dot"}
                  selectedOption={selectedOption}
                  onSelectOption={(option) => setSelectedOption(option)}
                />
                <small className="form-text text-muted">Decimal Separator [Ex: ./,]</small>
              </div>
              <div className="mb-5">
                <label className="form-label">Thousand Separator </label>
                <SelectDropdown
                  options={thousandSeparator}
                  defaultSelect={"clone"}
                  selectedOption={selectedOption}
                  onSelectOption={(option) => setSelectedOption(option)}
                />
                <small className="form-text text-muted">Thousand Separator [Ex: ./,/'/None/Space]</small>
              </div>
              <div className="mb-5">
                <label className="form-label">Default Tax </label>
                <SelectDropdown
                  options={taxOptions}
                  defaultSelect={"no-tax"}
                  selectedOption={selectedOption}
                  onSelectOption={(option) => setSelectedOption(option)}
                />
                <small className="form-text text-muted">Default Tax [Ex: 5%/10%/15%]</small>
              </div>
              <div className="mb-5">
                <label className="form-label">Show TAX per item </label>
                <SelectDropdown
                  options={options}
                  defaultSelect={"yes"}
                  selectedOption={selectedOption}
                  onSelectOption={(option) => setSelectedOption(option)}
                />
                <small className="form-text text-muted">Show TAX per item [Ex: Yes/No]</small>
              </div>
              <div className="mb-5">
                <label className="form-label">Remove the tax name from item table row</label>
                <SelectDropdown
                  options={options}
                  defaultSelect={"no"}
                  selectedOption={selectedOption}
                  onSelectOption={(option) => setSelectedOption(option)}
                />
                <small className="form-text text-muted">Remove the tax name from item table row [Ex: Yes/No]</small>
              </div>
              <div className="mb-5">
                <label className="form-label">Exclude currency symbol from items table Amount </label>
                <SelectDropdown
                  options={options}
                  defaultSelect={"yes"}
                  selectedOption={selectedOption}
                  onSelectOption={(option) => setSelectedOption(option)}
                />
                <small className="form-text text-muted">Exclude currency symbol from items table Amount [Ex: Yes/No]</small>
              </div>
              <div className="mb-5">
                <label className="form-label">Remove decimals on numbers/money with zero decimals (2.00 will become 2, 2.25 will stay 2.25) </label>
                <SelectDropdown
                  options={options}
                  defaultSelect={"no"}
                  selectedOption={selectedOption}
                  onSelectOption={(option) => setSelectedOption(option)}
                />
                <small className="form-text text-muted">Remove decimals on numbers/money with zero decimals (2.00 will become 2, 2.25 will stay 2.25) [Ex: Yes/No]</small>
              </div>
              <div className="mb-5">
                <label className="form-label">Output total amount to words in invoice/estimate/proposal </label>
                <SelectDropdown
                  options={options}
                  defaultSelect={"yes"}
                  selectedOption={selectedOption}
                  onSelectOption={(option) => setSelectedOption(option)}
                />
                <small className="form-text text-muted">Output total amount to words in invoice/estimate/proposal [Ex: Yes/No]</small>
              </div>
              <div className="mb-5">
                <label className="form-label">Number words into lowercase </label>
                <SelectDropdown
                  options={options}
                  defaultSelect={"no"}
                  selectedOption={selectedOption}
                  onSelectOption={(option) => setSelectedOption(option)}
                />
                <small className="form-text text-muted">Number words into lowercase [Ex: Yes/No]</small>
              </div>
              <hr className="my-5" />
              <div className="mb-5">
                <h4 className="fw-bold">Invoice Seetting</h4>
                <div className="fs-12 text-muted">Invoicing set correctly.</div>
              </div>
              <div className="mb-5">
                <label className="form-label">Invoice Number Prefix</label>
                <div className="input-group">
                  <span className="input-group-text">INV-</span>
                  <input type="text" className="form-control" placeholder="Invoice Number Prefix" />
                </div>
                <small className="form-text text-muted">Invoice Number Prefix [Ex: INV-/ORD-]</small>
              </div>
              <div className="mb-5">
                <label className="form-label">Invoice due after (days)</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FiCalendar size={16} />
                  </span>
                  <input type="number" className="form-control" placeholder="Invoice due after (days)" />
                </div>
                <small className="form-text text-muted">Invoice due after (days) [Ex: 15/30 days]</small>
              </div>
              <div className="mb-5">
                <label className="form-label">Allow staff members to view invoices where they are assigned to </label>
                <SelectDropdown
                  options={options}
                  defaultSelect={"yes"}
                  selectedOption={selectedOption}
                  onSelectOption={(option) => setSelectedOption(option)}
                />
                <small className="form-text text-muted">Allow staff members to view invoices where they are assigned to [Ex: Yes/No]</small>
              </div>
              <div className="mb-5">
                <label className="form-label">Require client to be logged in to view invoice </label>
                <SelectDropdown
                  options={options}
                  defaultSelect={"no"}
                  selectedOption={selectedOption}
                  onSelectOption={(option) => setSelectedOption(option)}
                />
                <small className="form-text text-muted">Require client to be logged in to view invoice [Ex: Yes/No]</small>
              </div>
              <div className="mb-5">
                <label className="form-label">Delete invoice allowed only on last invoice </label>
                <SelectDropdown
                  options={options}
                  defaultSelect={"yes"}
                  selectedOption={selectedOption}
                  onSelectOption={(option) => setSelectedOption(option)}
                />
                <small className="form-text text-muted">Delete invoice allowed only on last invoice [Ex: Yes/No]</small>
              </div>
              <div className="mb-5">
                <label className="form-label"> Decrement invoice number on delete </label>
                <SelectDropdown
                  options={options}
                  defaultSelect={"no"}
                  selectedOption={selectedOption}
                  onSelectOption={(option) => setSelectedOption(option)}
                />
                <small className="form-text text-muted"> Decrement invoice number on delete [Ex: Yes/No]</small>
              </div>
              <div className="mb-5">
                <label className="form-label">Exclude invoices with draft status from customers area </label>
                <SelectDropdown
                  options={options}
                  defaultSelect={"yes"}
                  selectedOption={selectedOption}
                  onSelectOption={(option) => setSelectedOption(option)}
                />
                <small className="form-text text-muted">Exclude invoices with draft status from customers area [Ex: Yes/No]</small>
              </div>
              <div className="mb-5">
                <label className="form-label">Show Sale Agent On Invoice </label>
                <SelectDropdown
                  options={options}
                  defaultSelect={"no"}
                  selectedOption={selectedOption}
                  onSelectOption={(option) => setSelectedOption(option)}
                />
                <small className="form-text text-muted">Show Sale Agent On Invoice [Ex: Yes/No]</small>
              </div>
              <div className="mb-5">
                <label className="form-label">Show Project Name On Invoice </label>
                <SelectDropdown
                  options={options}
                  defaultSelect={"yes"}
                  selectedOption={selectedOption}
                  onSelectOption={(option) => setSelectedOption(option)}
                />
                <small className="form-text text-muted">Show Project Name On Invoice [Ex: Yes/No]</small>
              </div>
              <div className="mb-5">
                <label className="form-label">Show Total Paid On Invoice </label>
                <SelectDropdown
                  options={options}
                  defaultSelect={"no"}
                  selectedOption={selectedOption}
                  onSelectOption={(option) => setSelectedOption(option)}
                />
                <small className="form-text text-muted">Show Total Paid On Invoice [Ex: Yes/No]</small>
              </div>
              <div className="mb-5">
                <label className="form-label">Show Credits Applied On Invoice </label>
                <SelectDropdown
                  options={options}
                  defaultSelect={"yes"}
                  selectedOption={selectedOption}
                  onSelectOption={(option) => setSelectedOption(option)}
                />
                <small className="form-text text-muted">Show Credits Applied On Invoice [Ex: Yes/No]</small>
              </div>
              <div className="mb-5">
                <label className="form-label">Show Amount Due On Invoice </label>
                <SelectDropdown
                  options={options}
                  defaultSelect={"no"}
                  selectedOption={selectedOption}
                  onSelectOption={(option) => setSelectedOption(option)}
                />
                <small className="form-text text-muted">Show Amount Due On Invoice [Ex: Yes/No]</small>
              </div>
              <div className="mb-5">
                <label className="form-label">Attach invoice PDF when sending payment receipt to email </label>
                <SelectDropdown
                  options={options}
                  defaultSelect={"yes"}
                  selectedOption={selectedOption}
                  onSelectOption={(option) => setSelectedOption(option)}
                />
                <small className="form-text text-muted">Attach invoice PDF when sending payment receipt to email [Ex: Yes/No]</small>
              </div>
              <TextAreaTopLabel
                label={"Predefined Client Note"}
                placeholder={"Predefined Client Note"}
                info={"Predefined Client Note"}
                className={"mb-5"}
              />
              <TextAreaTopLabel
                label={"Predefined Terms & Conditions"}
                placeholder={"Predefined Terms & Conditions"}
                info={"Predefined Terms & Conditions"}
                className={"mb-5"}
              />
              <TextAreaTopLabel
                label={"Proposal Info Format (PDF and HTML)"}
                placeholder="{proposal_to}
{address}
{city} {state}
{country_code} {zip_code}
{phone}
{email}"
                info={"Proposal Info Format (PDF and HTML) [Ex: {proposal_to} {address} {city} {state} {country_code} {zip_code} {phone} {email}]"}
              />
            </div>
          </div>
        </div>
        <Footer />
      </PerfectScrollbar>
    </div>

  )
}

export default SettingsFinanceForm