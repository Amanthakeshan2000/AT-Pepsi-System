import React from 'react'
import { Link } from 'react-router-dom'

const ErrorCreative = () => {
    return (
        <main className="auth-creative-wrapper">
            <div className="auth-creative-inner">
                <div className="creative-card-wrapper">
                    <div className="card my-4 overflow-hidden" style={{ zIndex: 1 }}>
                        <div className="row flex-1 g-0">
                            <div className="col-lg-6 h-100 my-auto">
                                <div className="wd-50 bg-white p-2 rounded-circle shadow-lg position-absolute translate-middle top-50 start-50">
                                    <img src="/images/logo-abbr.png" alt="img" className="img-fluid" />
                                </div>
                                <div className="creative-card-body card-body p-sm-5">
                                    <h2 className="fw-bolder mb-4" style={{ fontSize: 120 }}>4<span className="text-danger">0</span>4</h2>
                                    <h4 className="fw-bold mb-2">Page not found</h4>
                                    <p className="fs-12 fw-medium text-muted">Sorry, the page you are looking for can't be found. Please check the URL or try to a different page on our site.</p>
                                    <div className="mt-5">
                                        <Link to='/' className="btn btn-light-brand w-100">Back Home</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 bg-primary">
                                <div className="h-100 d-flex align-items-center justify-content-center">
                                    <img src="/images/auth/auth-user.png" alt="img" className="img-fluid" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    )
}

export default ErrorCreative