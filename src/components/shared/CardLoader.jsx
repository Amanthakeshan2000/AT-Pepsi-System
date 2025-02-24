import React from 'react'

const CardLoader = ({ refreshKey }) => {
    return (
        <>
            {refreshKey && (
                <div className="card-loader">
                    <div className="spinner-border text-primary"></div>
                </div>
            )}
        </>
    )
}

export default CardLoader