import React, { useEffect } from 'react'
import { Tooltip, Toast, Popover } from 'bootstrap';

const useBootstrapUtils = (pathName) => {
    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl))

        const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
        const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new Popover(popoverTriggerEl))


        const handleResize = () => {
            const newWindowWidth = window.innerWidth;
            if (newWindowWidth >= 1400) {
                document.querySelectorAll(".dropdown").forEach((e) => {
                    e.addEventListener("mouseover", () => {
                        e.querySelector(".dropdown-menu").classList.add("show")

                    })
                    e.addEventListener("mouseleave", () => {
                        e.querySelector(".dropdown-menu").classList.remove("show")

                    })
                })
            }
        }

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, [pathName])
}

export default useBootstrapUtils