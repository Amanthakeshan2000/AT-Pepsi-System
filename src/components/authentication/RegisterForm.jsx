import React from 'react'
import { FiEye, FiHash } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const RegisterForm = ({path}) => {
    return (
        <>
            <h2 className="fs-20 fw-bolder mb-4">Register</h2>
            <h4 className="fs-13 fw-bold mb-2">Manage all your Duralux crm</h4>
            <p className="fs-12 fw-medium text-muted">Let's get you all setup, so you can verify your personal
                account and begine setting up your profile.</p>
            <form action="index.html" className="w-100 mt-4 pt-2">
                <div className="mb-4">
                    <input type="text" className="form-control" placeholder="Full Name" required />
                </div>
                <div className="mb-4">
                    <input type="email" className="form-control" placeholder="Email" required />
                </div>
                <div className="mb-4">
                    <input type="tel" className="form-control" placeholder="Username" required />
                </div>
                <div className="mb-4 generate-pass">
                    <div className="input-group field">
                        <input type="password" className="form-control password" id="newPassword" placeholder="Password Confirm" />
                        <div className="input-group-text c-pointer gen-pass" data-bs-toggle="tooltip" title="Generate Password"><FiHash size={16}/></div>
                        <div className="input-group-text border-start bg-gray-2 c-pointer" data-bs-toggle="tooltip" title="Show/Hide Password"><FiEye size={16}/></div>
                    </div>
                    <div className="progress-bar mt-2">
                        <div />
                        <div />
                        <div />
                        <div />
                    </div>
                </div>
                <div className="mb-4">
                    <input type="password" className="form-control" placeholder="Password again" required />
                </div>
                <div className="mt-4">
                    <div className="custom-control custom-checkbox mb-2">
                        <input type="checkbox" className="custom-control-input" id="receiveMial" required />
                        <label className="custom-control-label c-pointer text-muted" htmlFor="receiveMial" style={{ fontWeight: '400 !important' }}>Yes, I wnat to receive Duralux community
                            emails</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="termsCondition" required />
                        <label className="custom-control-label c-pointer text-muted" htmlFor="termsCondition" style={{ fontWeight: '400 !important' }}>I agree to all the <a href="#">Terms &amp;
                            Conditions</a> and <a href="#">Fees</a>.</label>
                    </div>
                </div>
                <div className="mt-5">
                    <button type="submit" className="btn btn-lg btn-primary w-100">Create Account</button>
                </div>
            </form>
            <div className="mt-5 text-muted">
                <span>Already have an account?</span>
                <Link to={path} className="fw-bold"> Login</Link>
            </div>
        </>
    )
}

export default RegisterForm