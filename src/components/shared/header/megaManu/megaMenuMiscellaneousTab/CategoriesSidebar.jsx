import React from 'react'
import { Link } from 'react-router-dom'

const CategoriesSidebar = () => {
    return (
        <div className="col-xxl-2 d-lg-none d-xxl-block">
            <h6 className="dropdown-item-title">Categories</h6>
            <Link to="#" className="dropdown-item">Support</Link>
            <Link to="#" className="dropdown-item">Services</Link>
            <Link to="#" className="dropdown-item">Applicatios</Link>
            <Link to="#" className="dropdown-item">eCommerce</Link>
            <Link to="#" className="dropdown-item">Development</Link>
            <Link to="#" className="dropdown-item">Miscellaneous</Link>
        </div>
    )
}

export default CategoriesSidebar