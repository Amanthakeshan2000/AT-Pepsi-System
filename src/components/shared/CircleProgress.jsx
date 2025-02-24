import React, { useEffect, useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';

const CircleProgress = ({ value, text_first_sym="", text_sym, path_color, path_width="5px"}) => {  
    const [progressValue, setProgressValue] = useState(0);
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        const numericValue = typeof value === 'string' ? parseInt(value.replace(/,/g, '').replace('%', ''), 10) : value;

        if (text_sym === "%") {
            setPercentage(numericValue);
        }
        else {
            let calculatedPercentage;
            if (numericValue >= 1000) {
                calculatedPercentage = 100;
            } else {
                calculatedPercentage = (numericValue / 1000) * 100;
            }
            setPercentage(calculatedPercentage.toFixed(2));
        }

    }, [value])

    useEffect(() => {
        const interval = setInterval(() => {
            setProgressValue(prevPercent => {
                if (prevPercent < percentage) {
                    return prevPercent + 1;
                } else {
                    clearInterval(interval);
                    return prevPercent;
                }
            });
        }, 0);

        return () => clearInterval(interval);
    }, [percentage]);
    return (
        <>
            <CircularProgressbar
                value={progressValue}
                text={`${text_first_sym}${value}${text_sym}`}
                styles={{
                    path: {
                        stroke: `${path_color}`,
                        strokeWidth: `${path_width}`,
                        transition: "stroke-dashoffset 0.5s ease"
                    },
                }}
            />
        </>
    )
}

export default CircleProgress