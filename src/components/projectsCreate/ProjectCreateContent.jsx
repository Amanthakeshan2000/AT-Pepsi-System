import React, { useState } from 'react'
import TabProjectType from './TabProjectType'
import TabProjectDetails from './TabProjectDetails';
import TabProjectSettings from './TabProjectSettings';
import TabProjectBudget from './TabProjectBudget';
import TabProjectAssigned from './TabProjectAssigned';
import TabProjectTarget from './TabProjectTarget';
import TabAttachement from './TabAttachement';
import TabCompleted from './TabCompleted';

const steps = [
    { name: "Type", required: true },
    { name: "Details", required: false },
    { name: "Settings", required: false },
    { name: "Budget", required: true },
    { name: "Assagined", required: false },
    { name: "Target", required: false },
    { name: "Attachment", required: false },
    { name: "Completed", required: false },
];

const ProjectCreateContent = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [error, setError] = useState(false)
    const [formData, setFormData] = useState({
        projectType: "",
        projectManage: "",
        projectBudgets: "",
        budgetsSpend: "",
    });

    const validateFields = () => {
        const { projectManage, projectType, budgetsSpend, projectBudgets, target } = formData;
        if (steps[currentStep].required) {
            if (
                (currentStep === 0 && (projectManage === "" || projectType === "")) ||
                (currentStep === 3 && (projectBudgets === "" || budgetsSpend === ""))
            ) {
                setError(true)
                return false;
            }
        }
        return true;
    };

    const handleNext = (e) => {
        e.preventDefault()
        if (validateFields()) {
            setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
        }
    };

    // Handle prev button click
    const handlePrev = (e) => {
        e.preventDefault()
        setCurrentStep((prev) => Math.max(prev - 1, 0));
    };

    // Handle tab click to change step
    const handleTabClick = (e, index) => {
        e.preventDefault()
        if (validateFields()) {
            setCurrentStep(index);
        }
    };

    return (
        <div className="col-lg-12">
            <div className="card border-top-0">
                <div className="card-body p-0 wizard" id="project-create-steps">
                    <div className='steps clearfix'>
                        <ul role="tablist">
                            {steps.map((step, index) => (
                                <li
                                    key={index}
                                    className={`${currentStep === index ? "current" : ""} ${currentStep === index && error ? "error" : ""}`}
                                    onClick={(e) => handleTabClick(e, index)}
                                >
                                    <a href="#" className='d-block fw-bold'>{step.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="content clearfix">
                        {currentStep === 0 && <TabProjectType setFormData={setFormData} formData={formData} error={error} setError={setError} />}
                        {currentStep === 1 && <TabProjectDetails />}
                        {currentStep === 2 && <TabProjectSettings />}
                        {currentStep === 3 && <TabProjectBudget setFormData={setFormData} formData={formData} error={error} setError={setError} />}
                        {currentStep === 4 && <TabProjectAssigned />}
                        {currentStep === 5 && <TabProjectTarget />}
                        {currentStep === 6 && <TabAttachement />}
                        {currentStep === 7 && <TabCompleted />}
                    </div>

                    {/* Buttons */}
                    <div className="actions clearfix">
                        <ul>
                            <li className={`${currentStep === 0 ? "disabled" : ""}`} onClick={(e) => handlePrev(e)} disabled={currentStep === 0}>
                                <a href="#">Previous</a>
                            </li>
                            <li className={`${currentStep === steps.length - 1 ? "disabled" : ""}`} onClick={(e) => handleNext(e)} disabled={currentStep === steps.length - 1}>
                                <a href="#">Next</a>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProjectCreateContent