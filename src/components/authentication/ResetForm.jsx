import React from 'react'
import { Link } from 'react-router-dom'

const ResetForm = ({ path }) => {
    return (
        <>
            <h2 className="fs-20 fw-bolder mb-4">Reset</h2>
            <h4 className="fs-13 fw-bold mb-2">Reset to your username/password</h4>
            <p className="fs-12 fw-medium text-muted">Enter your email and a reset link will sent to you, let's
                access our the best recommendation for you.</p>
            <form action="auth-resetting-cover.html" className="w-100 mt-4 pt-2">
                <div className="mb-4">
                    <input className="form-control" placeholder="Email or Username" required />
                </div>
                <div className="mt-5">
                    <button type="submit" className="btn btn-lg btn-primary w-100">Reset Now</button>
                </div>
            </form>
            <div className="mt-5 text-muted">
                <span> Don't have an account?</span>
                <Link to={path} className="fw-bold"> Create an Account</Link>
            </div>
        </>
    )
}

export default ResetForm