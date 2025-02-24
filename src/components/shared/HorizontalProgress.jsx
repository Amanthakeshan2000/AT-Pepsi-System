import React from 'react'

const HorizontalProgress = ({ progress, barColor = "bg-success", barHeight = "ht-3" }) => {
    return (
        <div className={`progress ${barHeight}`}>
            <div className={`progress-bar ${barColor}`} role="progressbar" aria-valuenow="86" aria-valuemin="0" aria-valuemax="100" style={{ width: `${progress}%` }}></div>
        </div>
    )
}

export default HorizontalProgress