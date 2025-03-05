import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import useDatePicker from '@/hooks/useDatePicker';
import DatePicker from 'react-datepicker';
import MultiSelectImg from '@/components/shared/MultiSelectImg';
import { customerListTagsOptions, taskAssigneeOptions } from '@/utils/options';
import MultiSelectTags from '@/components/shared/MultiSelectTags';

const TabProjectTarget = () => {
    const [value, setValue] = useState('');
    const { startDate, endDate, setStartDate, setEndDate, renderFooter } = useDatePicker();
    useEffect(() => {
        setStartDate(new Date())
        setValue(`
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores beatae inventore reiciendis ipsum natus, porro recusandae sunt accusantium reprehenderit aliquid commodi est veniam sit molestiae, nesciunt cupiditate. Laborum, culpa maxime.
            `)
    }, [])
    return (
        <section className="step-body mt-4 body current">
            <form id="project-target">
                <fieldset>
                    <div className="mb-5">
                        <h2 className="fs-16 fw-bold">Project target</h2>
                        <p className="text-muted">If you need more info, please check <a href="#">help center</a></p>
                    </div>
                    <fieldset>
                        <div className="mb-4">
                            <label htmlFor="targetTitle" className="fw-semibold text-dark">Target title</label>
                            <input type="text" className="form-control" id="targetTitle" name="targetTitle" placeholder="First target title.." />
                        </div>
                        <div className="mb-4">
                            <label className="form-label">Target Description <span className="text-danger">*</span></label>
                            <ReactQuill theme="snow" value={value} onChange={setValue} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="targetReleaseDate" className="form-label">Release Date <span className="text-danger">*</span></label>
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
                        <div className="mb-4">
                            <label htmlFor="tragetAssigned" className="form-label">Taget assigned<span className="text-danger">*</span></label>
                            <MultiSelectImg options={taskAssigneeOptions} defaultSelect={[taskAssigneeOptions[0]]} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="tragetTags" className="form-label">Project tags <span className="text-danger">*</span></label>
                            <MultiSelectTags options={customerListTagsOptions} defaultSelect={[customerListTagsOptions[0], customerListTagsOptions[2], customerListTagsOptions[4]]} />
                        </div>
                    </fieldset>
                    <hr className="my-5" />
                    <div className="custom-control custom-checkbox mb-2">
                        <input type="checkbox" className="custom-control-input" id="allowChanges_2" defaultChecked />
                        <label className="custom-control-label c-pointer" htmlFor="allowChanges_2">Allow Changes in Budget.</label>
                    </div>
                    <div className="custom-control custom-checkbox mb-2">
                        <input type="checkbox" className="custom-control-input" id="allowNotifications_2" defaultChecked />
                        <label className="custom-control-label c-pointer" htmlFor="allowNotifications_2">Allow Notifications by Phone or Email.</label>
                    </div>
                </fieldset>
            </form>
        </section>
    )
}

export default TabProjectTarget