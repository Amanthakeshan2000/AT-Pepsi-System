import React, { createContext, useState } from 'react';

export const NavigationContext = createContext();

const NavigationProvider = ({ children }) => {
    const [navigationOpen, setNavigationOpen] = useState(false)
    const [navigationExpend, setNavigationExpend] = useState(false)

    const obj = {
        navigationOpen,
        setNavigationOpen,
        navigationExpend,
        setNavigationExpend
    }

    return (
        <NavigationContext.Provider value={obj}>
            {children}
        </NavigationContext.Provider>
    );
};

export default NavigationProvider