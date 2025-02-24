import React from 'react'
import ResetForm from '@/components/authentication/ResetForm'

const ResetCover = () => {
    return (
        <main className="auth-cover-wrapper">
            <div className="auth-cover-content-inner">
                <div className="auth-cover-content-wrapper">
                    <div className="auth-img">
                        <img src="/images/auth/auth-cover-reset-bg.svg" alt="img" className="img-fluid" />
                    </div>
                </div>
            </div>
            <div className="auth-cover-sidebar-inner">
                <div className="auth-cover-card-wrapper">
                    <div className="auth-cover-card p-sm-5">
                        <div className="wd-50 mb-5">
                            <img src="/images/logo-abbr.png" alt="img" className="img-fluid" />
                        </div>
                        <ResetForm path={"/authentication/register/cover"} />
                    </div>
                </div>
            </div>
        </main>

    )
}

export default ResetCover