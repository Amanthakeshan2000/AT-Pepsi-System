import React, { useState } from 'react'
import SelectDropdown from '@/components/shared/SelectDropdown'
import MultiSelectTags from '@/components/shared/MultiSelectTags'
import MultiSelectImg from '@/components/shared/MultiSelectImg'
import DatePicker from 'react-datepicker'
import useDatePicker from '@/hooks/useDatePicker'
import { propasalLeadOptions, propsalDiscountOptions, propsalRelatedOptions, propsalStatusOptions, propsalVisibilityOptions, taskAssigneeOptions, taskLabelsOptions } from '@/utils/options'
import { timezonesData } from '@/utils/fackData/timeZonesData'
import { currencyOptionsData } from '@/utils/fackData/currencyOptionsData'
import useLocationData from '@/hooks/useLocationData'
import Loading from '@/components/shared/Loading'
import AddProposal from './AddProposal'

const previtems = [
    {
        id: 1,
        product: "",
        qty: 0,
        price: 0
    },
]
const ProposalCreateContent = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const { startDate, endDate, setStartDate, setEndDate, renderFooter } = useDatePicker();
    const { countries, states, cities, loading, error, fetchStates, fetchCities } = useLocationData();


    return (
        <>
            {loading ? <Loading /> : ""}

            <div className="col-xl-6">
                <div className="card stretch stretch-full">
                    <div className="card-body">
                        <div className="mb-4">
                            <label className="form-label">Subject <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" placeholder="Subject" defaultValue="" />
                        </div>
                        <div className="mb-4">
                            <label className="form-label">Related <span className="text-danger">*</span></label>
                            <SelectDropdown
                                options={propsalRelatedOptions}
                                selectedOption={selectedOption}
                                defaultSelect="lead"
                                onSelectOption={(option) => setSelectedOption(option)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="form-label">Lead <span className="text-danger">*</span></label>
                            <SelectDropdown
                                options={propasalLeadOptions}
                                selectedOption={selectedOption}
                                defaultSelect="ui"
                                onSelectOption={(option) => setSelectedOption(option)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="form-label">Discount </label>
                            <SelectDropdown
                                options={propsalDiscountOptions}
                                selectedOption={selectedOption}
                                defaultSelect="no-discount"
                                onSelectOption={(option) => setSelectedOption(option)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="form-label">Visibility:</label>
                            <SelectDropdown
                                options={propsalVisibilityOptions}
                                selectedOption={selectedOption}
                                defaultSelect="private"
                                onSelectOption={(option) => setSelectedOption(option)}
                            />
                        </div>
                        <div className="row">
                            <div className="col-lg-6 mb-4">
                                <label className="form-label">Start <span className="text-danger">*</span></label>
                                <div className='input-group date '>
                                    <DatePicker
                                        placeholderText='Pick start date'
                                        selected={startDate}
                                        showPopperArrow={false}
                                        onChange={(date) => setStartDate(date)}
                                        className='form-control'
                                        popperPlacement="bottom-start"
                                        calendarContainer={({ children }) => (
                                            <div className='bg-white react-datepicker'>
                                                {children}
                                                {renderFooter("start")}
                                            </div>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6 mb-4">
                                <label className="form-label">Due <span className="text-danger">*</span></label>
                                <div className='input-group date '>
                                    <DatePicker
                                        placeholderText='Pick due date'
                                        selected={endDate}
                                        showPopperArrow={false}
                                        onChange={(date) => setEndDate(date)}
                                        className='form-control'
                                        popperPlacement="bottom-start"
                                        calendarContainer={({ children }) => (
                                            <div className='bg-white react-datepicker'>
                                                {children}
                                                {renderFooter("end")}
                                            </div>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="form-label">Tags:</label>
                            <MultiSelectTags options={taskLabelsOptions} placeholder={""} />
                        </div>
                        <div className="mb-0">
                            <label className="form-label">Assignee:</label>
                            <MultiSelectImg options={taskAssigneeOptions} placeholder={""} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-6">
                <div className="card stretch stretch-full">
                    <div className="card-body">
                        <div className="mb-4">
                            <label className="form-label">To <span className="text-danger">*</span></label>
                            <SelectDropdown
                                options={taskAssigneeOptions}
                                selectedOption={selectedOption}
                                defaultSelect="nneth.une@gmail.com"
                                onSelectOption={(option) => setSelectedOption(option)}
                            />
                        </div>
                        <div>
                            <label className="form-label">Address <span className="text-danger">*</span></label>
                            <div className="row">
                                <div className="col-lg-6 mb-4">
                                    <input type="text" className="form-control mb-2" placeholder="Address Line 1" />
                                </div>
                                <div className="col-lg-6 mb-4">
                                    <input type="text" className="form-control" placeholder="Address Line 2" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 mb-4">
                                <label className="form-label">Email <span className="text-danger">*</span></label>
                                <input type="text" className="form-control" placeholder="Emial" />
                            </div>
                            <div className="col-lg-6 mb-4">
                                <label className="form-label">Phone <span className="text-danger">*</span></label>
                                <input type="text" className="form-control" placeholder="Phone" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 mb-4">
                                <label className="form-label">Country <span className="text-danger">*</span></label>
                                <SelectDropdown
                                    options={countries}
                                    selectedOption={selectedOption}
                                    defaultSelect="usa"
                                    onSelectOption={(option) => {
                                        fetchStates(option.label);
                                        fetchCities(option.label);
                                        setSelectedOption(option)
                                    }}
                                />
                            </div>
                            <div className="col-lg-6 mb-4">
                                <label className="form-label">State</label>
                                <SelectDropdown
                                    options={states}
                                    selectedOption={selectedOption}
                                    defaultSelect={"new-york"}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 mb-4">
                                <label className="form-label">City </label>
                                <SelectDropdown
                                    options={cities}
                                    selectedOption={selectedOption}
                                    defaultSelect="new-york"
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                            </div>
                            <div className="col-lg-6 mb-4">
                                <label className="form-label">Timezone </label>
                                <SelectDropdown
                                    options={timezonesData}
                                    selectedOption={selectedOption}
                                    defaultSelect="Western Europe Time"
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                            </div>
                        </div>
                        <hr className="my-5" />
                        <div className="row">
                            <div className="col-lg-6 mb-4">
                                <label className="form-label">Currency</label>
                                <SelectDropdown
                                    options={currencyOptionsData}
                                    selectedOption={selectedOption}
                                    defaultSelect="usd"
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                            </div>
                            <div className="col-lg-6 mb-4">
                                <label className="form-label">Status </label>
                                <SelectDropdown
                                    options={propsalStatusOptions}
                                    selectedOption={selectedOption}
                                    defaultSelect="open"
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                            </div>
                        </div>
                        <hr className="my-5" />
                        <div className="row mb-4">
                            <div className="form-check form-switch form-switch-sm ps-5">
                                <input className="form-check-input c-pointer" type="checkbox" id="commentSwitch" />
                                <label className="form-check-label fw-500 text-dark c-pointer" htmlFor="commentSwitch">Allow Comments</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AddProposal previtems={previtems} />
        </>
    )
}

export default ProposalCreateContent