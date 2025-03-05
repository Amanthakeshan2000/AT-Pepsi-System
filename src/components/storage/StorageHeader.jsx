import React, { useState } from 'react'
import Dropdown from '@/components/shared/Dropdown'
import { emailActions, tagsItems } from '../emails/EmailHeader'
import { FiAlertOctagon, FiAlertTriangle, FiAlignLeft, FiArchive, FiBellOff, FiDatabase, FiEye, FiEyeOff, FiFilePlus, FiFileText, FiFolderPlus, FiGrid, FiHardDrive, FiImage, FiList, FiMusic, FiPlus, FiSearch, FiSlash, FiSliders, FiTag, FiTrash2, FiVideo } from 'react-icons/fi'
import { labels } from '../tasks/TaskHeader'
import SelectDropdown from '@/components/shared/SelectDropdown'
import HeaderSearchForm from '@/components/shared/pageHeader/HeaderSearchForm'

const projectOptions = [
    { value: "iCloud", label: "iCloud", img: '/images/storage-icons/icloud.png' },
    { value: "box", label: "Box", img: '/images/storage-icons/box.png' },
    { value: "dropbox", label: "Dropbox", img: '/images/storage-icons/dropbox.png ' },
    { value: "onedrive", label: "Onedrive", img: '/images/storage-icons/onedrive.png' },
    { value: "g-drive", label: "G-Drive", img: '/images/storage-icons/google-drive.png' },
    { value: "local", label: "Local", img: '/images/storage-icons/local-storage.png' },
]

const fileType = [
    { label: "New File", icon: <FiFilePlus /> },
    { label: "New Note", icon: <FiFileText /> },
    { label: "New Folder", icon: <FiFolderPlus /> },
    { label: "New Image", icon: <FiImage /> },
    { label: "New Audio", icon: <FiMusic /> },
    { label: "New Video", icon: <FiVideo /> },
    { label: "Add New Drive", icon: <FiHardDrive /> },
    { label: "Add New Storage", icon: <FiDatabase /> },
]
const moreOptions = [
    { label: "Filter", icon: <FiSliders /> },
    { label: "Unread", icon: <FiEyeOff /> },
    { label: "Archive", icon: <FiArchive /> },
    { type: "divider" },
    { label: "Spam", icon: <FiAlertTriangle /> },
    { label: "phishing", icon: <FiAlertOctagon /> },
    { type: "divider" },
    { label: "Mute", icon: <FiBellOff /> },
    { label: "Block", icon: <FiSlash /> },
    { label: "Delete", icon: <FiTrash2 /> },
]

const StrogeHeader = ({ setSidebarOpen }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    return (
        <div className="content-area-header sticky-top">
            <div className="page-header-left d-flex align-items-center gap-2">
                <a href="#" className="app-sidebar-open-trigger me-2" onClick={() => setSidebarOpen(true)}>
                    <FiAlignLeft className='fs-20' />
                </a>
                <div>
                    <SelectDropdown
                        options={projectOptions}
                        selectedOption={selectedOption}
                        defaultSelect={"dropbox"}
                        onSelectOption={(option) => setSelectedOption(option)}
                    />
                </div>

                <Dropdown
                    dropdownItems={emailActions}
                    triggerIcon={<FiEye />}
                    triggerPosition={"0,22"}
                    triggerClass='avatar-md'
                    dropdownPosition='dropdown-menu-start'
                />
                <Dropdown
                    dropdownItems={tagsItems}
                    triggerIcon={<FiTag />}
                    triggerPosition={"0,22"}
                    triggerClass='avatar-md'
                    dropdownAutoClose='outside'
                    tooltipTitle={"Tags"}
                    dropdownPosition='dropdown-menu-start'
                />

                <Dropdown
                    dropdownItems={labels}
                    triggerIcon={<FiFolderPlus />}
                    triggerPosition={"0,22"}
                    triggerClass='avatar-md'
                    dropdownAutoClose='outside'
                    tooltipTitle={"Labels"}
                    dropdownPosition='dropdown-menu-start'
                />

            </div>
            <div className="page-header-right ms-auto">
                <div className="hstack gap-2">
                    <HeaderSearchForm />
                    <a href="#" className="d-flex d-none d-sm-block">
                        <div className="avatar-text avatar-md" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Grid View">
                            <FiGrid />
                        </div>
                    </a>
                    <a href="#" className="d-flex d-none d-sm-block">
                        <div className="avatar-text avatar-md" data-bs-toggle="tooltip" data-bs-trigger="hover" title="List View">
                            <FiList />
                        </div>
                    </a>
                    <Dropdown
                        dropdownItems={fileType}
                        triggerIcon={<FiPlus />}
                        triggerPosition={"0,22"}
                        triggerClass='avatar-md'
                        dropdownAutoClose='outside'
                        tooltipTitle={"Add New"}
                        dropdownPosition='dropdown-menu-start'
                        dropdownParentStyle={"d-none d-sm-block"}
                    />
                    <Dropdown
                        dropdownItems={moreOptions}
                        triggerPosition={"0,22"}
                        triggerClass='avatar-md'
                        dropdownAutoClose='outside'
                        tooltipTitle={"More Options"}
                        dropdownPosition='dropdown-menu-start'
                        dropdownParentStyle={"d-none d-sm-block"}
                    />
                </div>
            </div>
        </div>
    )
}

export default StrogeHeader