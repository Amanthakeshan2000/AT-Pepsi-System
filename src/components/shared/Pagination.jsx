import React from 'react'
import { BsArrowLeft, BsArrowRight, BsDot } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const Pagination = () => {
    return (
        <ul className="list-unstyled d-flex align-items-center gap-2 mb-0 pagination-common-style">
            <li>
                <Link to="#"><BsArrowLeft size={16} /></Link>
            </li>
            <li><Link to="#" className="active">1</Link></li>
            <li><Link to="#">2</Link></li>
            <li>
                <Link to="#"><BsDot size={16} /></Link>
            </li>
            <li><Link to="#">8</Link></li>
            <li><Link to="#">9</Link></li>
            <li>
                <Link to="#"><BsArrowRight size={16} /></Link>
            </li>
        </ul>
    )
}

export default Pagination