import React from 'react'
import OtpVerifyForm from '@/components/authentication/OtpVerifyForm'

const OtpCover = () => {
    return (
        <main className="auth-cover-wrapper">
            <div className="auth-cover-content-inner">
                <div className="auth-cover-content-wrapper">
                    <div className="auth-img">
                        <img src="/images/auth/auth-cover-verify-bg.svg" alt="img" className="img-fluid" />
                    </div>
                </div>
            </div>
            <div className="auth-cover-sidebar-inner">
                <div className="auth-cover-card-wrapper">
                    <div className="auth-cover-card p-sm-5">
                        <div className="wd-50 mb-5">
                            <img src="/images/logo-abbr.png" alt="img" className="img-fluid" />
                        </div>
                        <OtpVerifyForm />
                    </div>
                </div>
            </div>
        </main>

    )
}

export default OtpCover