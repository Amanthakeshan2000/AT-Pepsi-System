import React from 'react'
import { ProjectTypeCard } from './TabProjectType'
import { FiAlertTriangle } from 'react-icons/fi'

const TabProjectBudget = ({ setFormData, formData, error, setError }) => {
    return (
        <section className="step-body mt-4 body current">
            <form id="project-budgets">
                <fieldset>
                    <fieldset>
                        <div className="mb-5">
                            <h2 className="fs-16 fw-bold">Project budgets</h2>
                            <p className="text-muted">If you need more info, please check <a href="#">help center</a></p>
                            <label className="error" style={{ display: 'none' }} />
                        </div>
                        {error && <label id="project-type-error" className="error"><FiAlertTriangle /> This field is required.</label>}
                        <fieldset>
                            <Card
                                title={"Budget tire 1"}
                                budget={"$100 - $999"}
                                id={"budgets_tire_1"}
                                name={"project-budgets"}
                                setFormData={setFormData}
                                formData={formData}
                                setError={setError}
                            />
                            <Card
                                title={"Budget tire 2"}
                                budget={"$1,000 - $4,999"}
                                id={"budgets_tire_2"}
                                name={"project-budgets"}
                                setFormData={setFormData}
                                formData={formData}
                                setError={setError}
                            />
                            <Card
                                title={"Budget tire 3"}
                                budget={"$4,999 - $9,999"}
                                id={"budgets_tire_3"}
                                name={"project-budgets"}
                                setFormData={setFormData}
                                formData={formData}
                                setError={setError}
                            />
                            <Card
                                title={"Budget tire 4"}
                                budget={"$10,000+"}
                                id={"budgets_tire_4"}
                                name={"project-budgets"}
                                setFormData={setFormData}
                                formData={formData}
                                setError={setError}
                            />
                        </fieldset>
                    </fieldset>
                    <hr className="mb-5" />
                    <fieldset>
                        <div className="mb-5">
                            <h2 className="fs-16 fw-bold">Budgets spend</h2>
                            <p className="text-muted">If you need more info, please check <a href="#">FAQ's</a></p>
                            <label className="error" style={{ display: 'none' }} />
                        </div>
                        {error && <label id="project-type-error" className="error"><FiAlertTriangle /> This field is required.</label>}
                        <fieldset>
                            <ProjectTypeCard
                                icon={"feather-user"}
                                title={"Precise Usage"}
                                description={"Withdraw money to your bank account per transaction under <strong>$5000</strong> budget"}
                                id={"precise_usage"}
                                isRequired={true}
                                name={"budget-spend"}
                                setFormData={setFormData}
                                formData={formData}
                                setError={setError}
                            />
                            <ProjectTypeCard
                                icon={"feather-users"}
                                title={"Extreme Usage"}
                                description={"Withdraw money to your bank account per transaction under $50,000 budget"}
                                id={"extreme_usage"}
                                isRequired={false}
                                name={"budget-spend"}
                                setFormData={setFormData}
                                formData={formData}
                                setError={setError}
                            />

                        </fieldset>
                        <hr className="mb-5" />
                        <div className="custom-control custom-checkbox mb-2">
                            <input type="checkbox" className="custom-control-input" id="allowChanges" defaultChecked />
                            <label className="custom-control-label c-pointer" htmlFor="allowChanges">Allow Changes in Budget.</label>
                        </div>
                        <div className="custom-control custom-checkbox mb-2">
                            <input type="checkbox" className="custom-control-input" id="budgetReset" defaultChecked />
                            <label className="custom-control-label c-pointer" htmlFor="budgetReset">Budgets reset every month.</label>
                        </div>
                        <div className="custom-control custom-checkbox mb-2">
                            <input type="checkbox" className="custom-control-input" id="promectAlert" defaultChecked />
                            <label className="custom-control-label c-pointer" htmlFor="promectAlert">Send email alarts if project <span className="badge bg-gray-200 text-dark">80.00</span>% of budget.</label>
                        </div>
                    </fieldset>
                </fieldset>
            </form>
        </section>

    )
}

export default TabProjectBudget

const Card = ({ title, id, budget, name, setFormData, formData, setError }) => {
    const handleOnChange = (e) => {
        const name = e.target.name
        const id = e.target.id

        let updatedType = { ...formData };

        if (name === "project-budgets") {
            updatedType = { ...updatedType, projectBudgets: id };
            setError(false)
        }

        setFormData({ ...formData, ...updatedType });
    }

    const { projectBudgets } = formData
    return (
        <label className="w-100" htmlFor={id}>
            <input
                className="card-input-element"
                type="radio"
                name={name}
                id={id}
                onClick={(e) => handleOnChange(e)}
                defaultChecked={projectBudgets === id ? true : false}
            />
            <span className="card card-body d-flex flex-row justify-content-between align-items-center">
                <span>
                    <span className="d-block fs-13 fw-normal text-muted mb-2">{title}</span>
                    <span className="d-block fs-16 fw-bold text-dark mb-0">{budget}</span>
                </span>
            </span>
        </label>
    )
}