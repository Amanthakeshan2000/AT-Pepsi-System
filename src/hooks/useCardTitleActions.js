import { useState, useEffect } from 'react';
import { Tooltip, Toast, Popover } from 'bootstrap';
import useBootstrapUtils from './useBootstrapUtils';

const useCardTitleActions = () => {
    const [refreshKey, setRefreshKey] = useState(false);
    const [isRemoved, setIsRemoved] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleRefresh = () => {
        if (!refreshKey) {
            setRefreshKey(true);
        }
        setInterval(() => {
            setRefreshKey(false);
        }, 500);
    };

    const handleExpand = () => {
        setIsExpanded(!isExpanded);

        setTimeout(() => {
            window.dispatchEvent(new Event("resize"));
        }, 0);
    };

    useEffect(() => {
        if (isExpanded) {
            document.body.classList.add("card-expand");
        } else {
            document.body.classList.remove("card-expand");
        }

        return () => {
            document.body.classList.remove("card-expand");
        };
    }, [isExpanded]);

    const handleDelete = () => {
        setIsRemoved(true);
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl))

    };

    return {
        refreshKey,
        isRemoved,
        isExpanded,
        handleRefresh,
        handleExpand,
        handleDelete
    };
};

export default useCardTitleActions;