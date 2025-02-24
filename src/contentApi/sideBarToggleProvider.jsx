import React, { createContext, useState } from 'react'

export const SidebarContext = createContext()
const SideBarToggleProvider = ({children}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    return (
        <SidebarContext.Provider value={{sidebarOpen, setSidebarOpen}}>
            {children}
        </SidebarContext.Provider>
    )
}

export default SideBarToggleProvider