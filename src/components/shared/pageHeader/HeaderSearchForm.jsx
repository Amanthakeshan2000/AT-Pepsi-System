import React, { useState } from 'react'
import { FiArrowLeft, FiSearch } from 'react-icons/fi'

const HeaderSearchForm = () => {
    const [searchOpen, setSearchOpen] = useState(false)
    return (
        <div className="hstack">
            <a href="#" className="search-form-open-toggle" onClick={() => setSearchOpen(true)}>
                <div className="avatar-text avatar-md" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Search">
                    <FiSearch />
                </div>
            </a>
            <form className={`search-form ${searchOpen ? "d-block" : "d-none"}`}>
                <div className="search-form-inner">
                    <a href="#" className="search-form-close-toggle" onClick={() => setSearchOpen(false)}>
                        <div className="avatar-text avatar-md" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Back">
                            <FiArrowLeft />
                        </div>
                    </a>
                    <input type="search" className="py-3 px-0 border-0 w-100" id="storageSearch" placeholder="Search..." autoComplete="off" />
                </div>
            </form>
        </div>
    )
}

export default HeaderSearchForm