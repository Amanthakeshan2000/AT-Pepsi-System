import React from 'react'
import Header from '@/components/shared/header/Header'
import NavigationManu from '@/components/shared/navigationMenu/NavigationMenu'
import { Outlet, useLocation } from 'react-router-dom'
import VoiceCall from '@/components/chats/VoiceCall'
import VideoCall from '@/components/chats/VideoCall'
import StorageDetails from '@/components/storage/StorageDetails'
import AddsNote from '@/components/notes/AddsNote'
import TasksDetails from '@/components/tasks/TasksDetails'
import AddTask from '@/components/tasks/AddTask'
import useBootstrapUtils from '@/hooks/useBootstrapUtils'
import ChatProfileInfo from '@/components/chats/ChatProfileInfo'
import ComposeMailPopUp from '@/components/emails/ComposeMailPopup'

const LayoutApplications = () => {
    const pathName = useLocation().pathname
    useBootstrapUtils(pathName)

    const getClassName = (pathName) => {
        switch (pathName) {
            case "/applications/email":
                return "apps-email"
            case "/applications/chat":
                return "apps-chat"
            case "/applications/tasks":
                return "apps-tasks"
            case "/applications/notes":
                return "apps-notes"
            case "/applications/calender":
                return "apps-calendar"
            case "/applications/storage":
                return "apps-storage"

            default:
                return null
        }
    }
    return (
        <>
            <Header />
            <NavigationManu />
            <main className={`nxl-container apps-container ${getClassName(pathName)}`}>
                <div className="nxl-content without-header nxl-full-content">
                    <div className='main-content d-flex'>
                        <Outlet />
                    </div>
                </div>
            </main>
            <ChatProfileInfo />
            <VoiceCall />
            <VideoCall />
            <ComposeMailPopUp />
            <StorageDetails />
            <AddsNote />
            <TasksDetails />
            <AddTask />
        </>
    )
}

export default LayoutApplications