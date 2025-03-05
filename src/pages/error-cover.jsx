import React from 'react'
import { Link } from 'react-router-dom'

const ErrorCover = () => {
    return (
        <main className="auth-cover-wrapper">
            <div className="auth-cover-content-inner">
                <div className="auth-cover-content-wrapper">
                    <div className="auth-img">
                        <img src="/images/auth/auth-cover-404-bg.svg" alt="img" className="img-fluid" />
                    </div>
                </div>
            </div>
            <div className="auth-cover-sidebar-inner">
                <div className="auth-cover-card-wrapper">
                    <div className="auth-cover-card p-sm-5">
                        <div className="wd-50 mb-5">
                            <img src="/images/logo-abbr.png" alt="img" className="img-fluid" />
                        </div>
                        <h4 className="fw-bold mb-2">Page not found</h4>
                        <p className="fs-12 fw-medium text-muted">Sorry, the page you are looking for can't be found. Please check the URL or try to a different page on our site.</p>
                        <h2 className="fw-bolder mb-4" style={{ fontSize: 120 }}>4<span className="text-danger">0</span>4</h2>
                        <div className="mt-5">
                            <Link to="/" className="btn btn-light-brand w-100">Back Home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    )
}

export default ErrorCover