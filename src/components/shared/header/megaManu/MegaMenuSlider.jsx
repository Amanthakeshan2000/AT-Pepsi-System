import React from 'react'
import { authenticationTabSlider } from './itemsList'

const MegaMenuSlider = () => {
    return (
        <div id="carouselResourcesCaptions" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselResourcesCaptions" data-bs-slide-to="0" className="active" aria-current="true"></button>
                <button type="button" data-bs-target="#carouselResourcesCaptions" data-bs-slide-to="1"></button>
                <button type="button" data-bs-target="#carouselResourcesCaptions" data-bs-slide-to="2"></button>
                <button type="button" data-bs-target="#carouselResourcesCaptions" data-bs-slide-to="3"></button>
                <button type="button" data-bs-target="#carouselResourcesCaptions" data-bs-slide-to="4"></button>
                <button type="button" data-bs-target="#carouselResourcesCaptions" data-bs-slide-to="5"></button>
            </div>
            <div className="carousel-inner rounded-3">
                {
                    authenticationTabSlider.map(({ description, src, title }, index) => {
                        return (
                            <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                <div className="nxl-mega-menu-image">
                                    <img src={src} alt="" className="img-fluid d-block w-100" />
                                </div>
                                <div className="carousel-caption">
                                    <h5 className="carousel-caption-title text-truncate-1-line">{title}</h5>
                                    <p className="carousel-caption-desc">{description}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselResourcesCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselResourcesCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}

export default MegaMenuSlider