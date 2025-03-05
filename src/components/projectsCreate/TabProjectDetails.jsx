import React, { useEffect, useState } from 'react'
import SelectDropdown from '@/components/shared/SelectDropdown'
import { customerListTagsOptions, projectBillingOptions, projectStatusOptions, propasalLeadOptions } from '@/utils/options'
import MultiSelectTags from '@/components/shared/MultiSelectTags';
import DatePicker from 'react-datepicker';
import useDatePicker from '@/hooks/useDatePicker';
import ReactQuill from 'react-quill';

const TabProjectDetails = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const { startDate, endDate, setStartDate, setEndDate, renderFooter } = useDatePicker();
    const [value, setValue] = useState('');

    useEffect(() => {
        setStartDate(new Date())
        setValue(`
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores beatae inventore reiciendis ipsum natus, porro recusandae sunt accusantium reprehenderit aliquid commodi est veniam sit molestiae, nesciunt cupiditate. Laborum, culpa maxime.
            `)
    }, []);

    return (
        <section className="step-body mt-4 body current">
            <form id="project-details">
                <fieldset>
                    <div className="mb-5">
                        <h2 className="fs-16 fw-bold">Project details</h2>
                        <p className="text-muted">You project details gose here.</p>
                    </div>
                    <fieldset>
                        <div className="mb-4">
                            <label htmlFor="projectName" className="form-label">Project Name <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" id="projectName" name="projectName" defaultValue="Website design and development" required />
                        </div>
                        <div className="mb-4 ">
                            <label className="form-label">Project Description <span className="text-danger">*</span></label>
                            <ReactQuill theme="snow" value={value} onChange={setValue} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="ratePerHour" className="form-label">Rate Per Hour <span className="text-danger">*</span></label>
                            <input type="number" className="form-control" id="ratePerHour" name="ratePerHour" defaultValue={20} required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="projectClient" className="form-label">Project Client <span className="text-danger">*</span></label>
                            <SelectDropdown
                                options={propasalLeadOptions}
                                selectedOption={selectedOption}
                                defaultSelect="ui"
                                onSelectOption={(option) => setSelectedOption(option)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="billingType" className="form-label">Billing type <span className="text-danger">*</span></label>
                            <SelectDropdown
                                options={projectBillingOptions}
                                selectedOption={selectedOption}
                                defaultSelect="tasks-hours"
                                onSelectOption={(option) => setSelectedOption(option)}
                            />
                        </div>
                        <div className="mb-4">

                            <label htmlFor="projectStatus" className="form-label">Project status <span className="text-danger">*</span></label>
                            <SelectDropdown
                                options={projectStatusOptions}
                                selectedOption={selectedOption}
                                defaultSelect="active"
                                onSelectOption={(option) => setSelectedOption(option)}
                            />

                        </div>
                        <div className="mb-4">
                            <label htmlFor="projectTags" className="form-label">Project tags <span className="text-danger">*</span></label>
                            <MultiSelectTags
                                options={customerListTagsOptions}
                                selectedOption={selectedOption}
                                defaultSelect={[customerListTagsOptions[10]]}
                                onSelectOption={(option) => setSelectedOption(option)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="projectReleaseDate" className="form-label">Release Date <span className="text-danger">*</span></label>
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
                        <hr className="mb-5" />
                        <div className="custom-control custom-checkbox mb-2">
                            <input type="checkbox" className="custom-control-input" id="sendProjectEmail" defaultChecked />
                            <label className="custom-control-label c-pointer" htmlFor="sendProjectEmail">Send project created email.</label>
                        </div>
                        <div className="custom-control custom-checkbox mb-2">
                            <input type="checkbox" className="custom-control-input" id="calculateTasks" defaultChecked />
                            <label className="custom-control-label c-pointer" htmlFor="calculateTasks">Calculate progress through tasks.</label>
                        </div>
                        <div className="custom-control custom-checkbox mb-2">
                            <input type="checkbox" className="custom-control-input" id="allowNotifications" defaultChecked />
                            <label className="custom-control-label c-pointer" htmlFor="allowNotifications">Allow Notifications by Phone or Email.</label>
                        </div>
                    </fieldset>
                </fieldset>
            </form>
        </section>

    )
}

export default TabProjectDetails