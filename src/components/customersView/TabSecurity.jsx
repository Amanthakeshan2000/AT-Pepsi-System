import React from 'react'
import topTost from '@/utils/topTost';

const TabSecurity = () => {
    const handleClick = () => {
        topTost()
    };
    return (
        <div className="tab-pane fade p-4" id="securityTab" role="tabpanel">
            <SecurityFeature
                title="Two-factor Authentication"
                description="Two-factor authentication is an enhanced security measure. Once enabled, you'll be required to give two types of identification when you log into Google Authentication and SMS are Supported."
                label="Enable 2FA Verification"
                checkboxId="2faVerification"
                isChecked={true}
            />
            <SecurityFeature
                title="Secondary Verification"
                description="The first factor is a password and the second commonly includes a text with a code sent to your smartphone, or biometrics using your fingerprint, face, or retina."
                label="Set up secondary method"
                checkboxId="secondaryVerification"
                isChecked={true}
            />
            <SecurityFeature
                title="Backup Codes"
                description="A backup code is automatically generated for you when you turn on two-factor authentication through your iOS or Android Twitter app. You can also generate a backup code on twitter.com."
                label="Generate backup codes"
                checkboxId="generateBackup"
                isChecked={false}
            />
            <SecurityFeature
                title="Login Verification"
                description="Login verification is an enhanced security measure. Once enabled, you'll be required to give two types of identification when you log into Google Authentication and SMS are Supported."
                label="Enable Login Verification"
                checkboxId="loginVerification"
                isChecked={true}
            />
            <hr className="my-5" />
            <div className="alert alert-dismissible mb-4 p-4 d-flex alert-soft-danger-message" role="alert">
                <div className="me-4 d-none d-md-block">
                    <i className="feather feather-alert-triangle text-danger fs-1"></i>
                </div>
                <div>
                    <p className="fw-bold mb-0 text-truncate-1-line">You Are Delete or Deactivating Your Account</p>
                    <p className="text-truncate-3-line mt-2 mb-4">Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to log in.</p>
                    <a href="#" className="btn btn-sm btn-danger d-inline-block">Learn more</a>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
            <div className="card mt-5">
                <div className="card-body">
                    <h6 className="fw-bold">Delete Account</h6>
                    <p className="fs-11 text-muted">Go to the Data & Privacy section of your profile Account. Scroll to "Your data & privacy options." Delete your Profile Account. Follow the instructions to delete your account:</p>
                    <div className="my-4 py-2">
                        <input type="password" className="form-control" placeholder="Enter your password" />
                        <div className="mt-3">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="acDeleteDeactive" />
                                <label className="custom-control-label c-pointer" htmlFor="acDeleteDeactive">I confirm my account deletations or deactivation.</label>
                            </div>
                        </div>
                    </div>
                    <div className="d-sm-flex gap-2">
                        <a href="#" className="btn btn-danger" data-action-target="#acSecctingsActionMessage">Delete Account</a>
                        <a href="#" className="btn btn-warning mt-2 mt-sm-0" onClick={handleClick}>Deactiveted Account</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TabSecurity


const SecurityFeature = ({ title, description, label, checkboxId, isChecked }) => {
    return (
        <div className="p-4 mb-4 border border-dashed border-gray-3 rounded-1">
            <h6 className="fw-bolder"><a href="#">{title}</a></h6>
            <div className="fs-12 text-muted text-truncate-3-line mt-2 mb-4">{description}</div>
            <div className="form-check form-switch form-switch-sm">
                <label className="form-check-label fw-500 text-dark c-pointer" htmlFor={checkboxId}>{label}</label>
                <input className="form-check-input c-pointer" type="checkbox" id={checkboxId} defaultChecked={isChecked} />
            </div>
        </div>
    );
};