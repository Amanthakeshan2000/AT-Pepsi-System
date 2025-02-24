import React from 'react'
import getIcon from '@/utils/getIcon'
import { FiAlertTriangle, FiCheck } from 'react-icons/fi'

const TabProjectType = ({ setFormData, formData, error, setError }) => {

    return (

        <section className="step-body mt-4 body current">
            <form id="project-type">
                <fieldset>
                    <div className="mb-5">
                        <h2 className="fs-16 fw-bold">Project type</h2>
                        <p className="text-muted">Select project type first.</p>
                        {error && <label id="project-type-error" className="error"><FiAlertTriangle /> This field is required.</label>}
                    </div>
                    <fieldset>
                        <ProjectTypeCard
                            icon={"feather-user"}
                            title={"Personal Project"}
                            description={"If you need more info, please check it out"}
                            id={"project_personal"}
                            name={"project-type"}
                            isRequired={true}
                            setFormData={setFormData}
                            formData={formData}
                            setError={setError}
                        />
                        <ProjectTypeCard
                            icon={"feather-users"}
                            title={"Team Project"}
                            description={"Create corporate account to manage users"}
                            id={"project_team"}
                            name={"project-type"}
                            isRequired={false}
                            setFormData={setFormData}
                            formData={formData}
                            setError={setError}
                        />
                    </fieldset>
                </fieldset>
                <hr className="mb-5" />
                <fieldset>
                    <div className="mb-5">
                        <h2 className="fs-16 fw-bold">Project manage</h2>
                        <p className="text-muted">Who can manage projects</p>
                        {error && <label id="project-type-error" className="error"><FiAlertTriangle /> This field is required.</label>}
                    </div>
                    <fieldset>
                        <ProjectTypeCard
                            icon={"feather-globe"}
                            title={"Everyone"}
                            description={"All users now can to see it, but guests can't access."}
                            id={"project_everyone"}
                            name={"project-manage"}
                            isRequired={true}
                            setFormData={setFormData}
                            formData={formData}
                            setError={setError}
                        />
                        <ProjectTypeCard
                            icon={"feather-shield"}
                            title={"Only Admin's"}
                            description={"Only admin's can manage everythings."}
                            id={"project_admin"}
                            name={"project-manage"}
                            isRequired={false}
                            setFormData={setFormData}
                            formData={formData}
                            setError={setError}
                        />
                        <ProjectTypeCard
                            icon={"feather-settings"}
                            title={"Only to Specific People"}
                            description={"Only some specific people can able to see it."}
                            id={"project_specific"}
                            name={"project-manage"}
                            isRequired={false}
                            setFormData={setFormData}
                            formData={formData}
                            setError={setError}
                        />
                    </fieldset>
                </fieldset>
            </form>
        </section>

    )
}

export default TabProjectType

export const ProjectTypeCard = ({ icon, title, description, id, isRequired, name, setFormData, formData, setError }) => {
    const handleOnChange = (e) => {
        const name = e.target.name
        const id = e.target.id
        let updatedType = { ...formData };
        
        if (name === "project-type") {
            updatedType = { ...updatedType, projectType: id };
            setError(false)
        }
        if (name === "project-manage") {
            updatedType = { ...updatedType, projectManage: id };
            setError(false)
        }
        if (name === "budget-spend") {
            updatedType = { ...updatedType, budgetsSpend: id };
            setError(false)
        }
        setFormData({ ...formData, ...updatedType });
    }

    const { projectType, projectManage, budgetsSpend } = formData
    return (
        <>

            <label className="w-100" htmlFor={id}>
                <input
                    className="card-input-element"
                    type="radio"
                    name={name}
                    id={id}
                    required={isRequired}
                    onClick={(e) => handleOnChange(e)}
                    defaultChecked={projectType === id || projectManage === id || budgetsSpend === id ? true : false}
                />
                <span className="card card-body d-flex flex-row justify-content-between align-items-center ">
                    <span className="hstack gap-3">
                        <span className="avatar-text">
                            {React.cloneElement(getIcon(icon), { size: "16", strokeWidth: "1.6" })}
                        </span>
                        <span>
                            <span className="d-block fs-13 fw-bold text-dark">{title}</span>
                            <span className="d-block text-muted mb-0" dangerouslySetInnerHTML={{ __html: description }} />
                        </span>
                    </span>
                </span>
            </label>
        </>
    )
}