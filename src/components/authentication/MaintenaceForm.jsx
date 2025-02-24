import React from 'react'
import { FiFacebook, FiGithub, FiInstagram, FiLinkedin, FiTwitter } from 'react-icons/fi'

const MaintenaceForm = () => {
    return (
        <>
            <h2 className="fs-20 fw-bolder mb-4">Maintenance</h2>
            <h4 className="fs-13 fw-bold mb-2">Now we are under maintenance</h4>
            <p className="fs-12 fw-medium text-muted">Sorry for the inconvenience but we're performing some maintenance at the moment.</p>
            <form action="#" className="w-100 mt-4 pt-2">
                <div className="mb-4">
                    <input type="email" className="form-control" placeholder="Enter Your Email" required />
                </div>
                <div className="mt-5">
                    <button type="submit" className="btn btn-lg btn-primary w-100">Notify Me</button>
                </div>
            </form>
            <div className="mt-5 d-flex justify-content-center gap-2">
                <a href="#" className="avatar-text avatar-md" data-bs-toggle="tooltip" title="Follow on Facebook">
                    <FiFacebook />
                </a>
                <a href="#" className="avatar-text avatar-md" data-bs-toggle="tooltip" title="Follow on Twitter">
                    <FiTwitter />
                </a>
                <a href="#" className="avatar-text avatar-md" data-bs-toggle="tooltip" title="Follow on Instagram">
                    <FiInstagram />
                </a>
                <a href="#" className="avatar-text avatar-md" data-bs-toggle="tooltip" title="Follow on Github">
                    <FiGithub />
                </a>
                <a href="#" className="avatar-text avatar-md" data-bs-toggle="tooltip" title="Follow on Linkedin">
                    <FiLinkedin />
                </a>
            </div>
        </>
    )
}

export default MaintenaceForm