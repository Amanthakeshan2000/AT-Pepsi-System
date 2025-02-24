import React, { useContext, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiSunrise } from "react-icons/fi";
import PerfectScrollbar from "react-perfect-scrollbar";
import Menus from './Menus';
import { NavigationContext } from '../../../contentApi/navigationProvider';

const NavigationManu = () => {
    const { navigationOpen, setNavigationOpen } = useContext(NavigationContext)
    const pathName = useLocation().pathname
    useEffect(() => {
        setNavigationOpen(false)
    }, [pathName])
    return (
        <nav className={`nxl-navigation ${navigationOpen ? "mob-navigation-active" : ""}`}>
            <div className="navbar-wrapper">
                <div className="m-header">
                <Link
                        to="/"
                        className="b-brand lg"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            width: '100%',
                            height: '100%',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            // visibility: 'hidden', // Hide by default
                        }}
                        >
                            AT-SYSTEM
                        </Link>



                        {/* <!-- ========   change your logo hear   ============ --> */}
                        {/* <img src="/images/1.png" alt="logo" className="logo logo-lg" />

                        
                        <img src="/images/Logo1.png" alt="logo" className="logo logo-sm" /> */}
                </div>

                <div className={`navbar-content`}>
                    <PerfectScrollbar>
                        <ul className="nxl-navbar">
                            <li className="nxl-item nxl-caption">
                                <label>Navigation</label>
                            </li>
                            <Menus />
                        </ul>
                        {/* <div className="card text-center">
                            <div className="card-body">
                                <i className="fs-4 text-dark"><FiSunrise /></i>
                                <h6 className="mt-4 text-dark fw-bolder">Downloading Center</h6>
                                <p className="fs-11 my-3 text-dark">Duralux is a production ready CRM to get started up and running easily.</p>
                                <Link to="#" className="btn btn-primary text-dark w-100">Download Now</Link>
                            </div>
                        </div>
                        <div style={{ height: "18px" }}></div> */}
                    </PerfectScrollbar>
                </div>
            </div>
            <div onClick={() => setNavigationOpen(false)} className={`${navigationOpen ? "nxl-menu-overlay" : ""}`}></div>
        </nav>
    )
}

export default NavigationManu