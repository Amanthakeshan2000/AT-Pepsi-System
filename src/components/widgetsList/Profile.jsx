import React from 'react'
import { BsPatchCheckFill } from 'react-icons/bs'
import { FiEdit, FiMail, FiMapPin, FiPhone, FiTrash2 } from 'react-icons/fi'
const Profile = () => {
    return (

        <div className="card stretch stretch-full">
            <div className="card-body">
                <div className="mb-4 text-center">
                    <div className="wd-150 ht-150 mx-auto mb-3 position-relative">
                        <div className="avatar-image wd-150 ht-150 border border-5 border-gray-3">
                            <img src="/images/avatar/1.png" alt="img" className="img-fluid" />
                        </div>
                        <div className="wd-10 ht-10 text-success rounded-circle position-absolute translate-middle" style={{ top: "76%", right: "10px" }}>
                            <BsPatchCheckFill size={16} />
                        </div>
                    </div>
                    <div className="mb-4">
                        <a href="#" className="fs-14 fw-bold d-block"> Amantha Keshan</a>
                        <a href="#" className="fs-12 fw-normal text-muted d-block">amantha@gmail.com</a>
                    </div>
                    <div className="fs-12 fw-normal text-muted text-center d-flex flex-wrap gap-3 mb-4">
                        <div className="flex-fill py-3 px-4 rounded-1 d-none d-sm-block border border-dashed border-gray-5">
                            <h6 className="fs-15 fw-bolder">28.65K</h6>
                            <p className="fs-12 text-muted mb-0">Followers</p>
                        </div>
                        <div className="flex-fill py-3 px-4 rounded-1 d-none d-sm-block border border-dashed border-gray-5">
                            <h6 className="fs-15 fw-bolder">38.85K</h6>
                            <p className="fs-12 text-muted mb-0">Following</p>
                        </div>
                        <div className="flex-fill py-3 px-4 rounded-1 d-none d-sm-block border border-dashed border-gray-5">
                            <h6 className="fs-15 fw-bolder">43.67K</h6>
                            <p className="fs-12 text-muted mb-0">Engagement</p>
                        </div>
                    </div>
                </div>
                <ul className="list-unstyled mb-4">
                    <li className="hstack justify-content-between mb-4">
                        <span className="text-muted fw-medium hstack gap-3"><FiMapPin size={16} />Location</span>
                        <a href="#" className="float-end">California, USA</a>
                    </li>
                    <li className="hstack justify-content-between mb-4">
                        <span className="text-muted fw-medium hstack gap-3"><FiPhone size={16} />Phone</span>
                        <a href="#" className="float-end">+01 (375) 2589 645</a>
                    </li>
                    <li className="hstack justify-content-between mb-0">
                        <span className="text-muted fw-medium hstack gap-3"><FiMail size={16} />Email</span>
                        <a href="#" className="float-end">alex.della@outlook.com</a>
                    </li>
                </ul>
                <div className="d-flex gap-2 text-center pt-4">
                    <a href="#" className="w-50 btn btn-light-brand">
                        <FiTrash2 size={16} className='me-2' />
                        <span>Delete</span>
                    </a>
                    <a href="#" className="w-50 btn btn-primary">
                        <FiEdit size={16} className='me-2' />
                        <span>Edit Profile</span>
                    </a>
                </div>
            </div>
        </div>


    )
}

export default Profile