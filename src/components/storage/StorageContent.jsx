import React, { useState } from 'react'
import { FiCopy, FiDownload, FiEdit2, FiInfo, FiLink2, FiMove, FiScissors, FiShare2, FiTrash2 } from 'react-icons/fi'
import CloudStorageCard from './CloudStorageCard';
import RecentFileCard from './RecentFileCard';
import { cloudStorageData, storageFolderData } from '@/utils/fackData/storageData';
import FoldersCard from './FoldersCard';
import ProjectFilteTable from './ProjectFilteTable';
import StrogeHeader from './StorageHeader';
import PerfectScrollbar from "react-perfect-scrollbar";
import Footer from '@/components/shared/Footer';
import { confirmDelete } from '@/utils/confirmDelete';
import StorageSidebar from './StorageSidebar';

export const strogeOptions = [
    { icon: <FiShare2 />, label: "Share" },
    { icon: <FiInfo />, label: "Details", modalTarget: "#fileFolderDetailsOffcanvas" },
    { icon: <FiEdit2 />, label: "Rename" },
    { icon: <FiDownload />, label: "Download" },
    { type: "divider" },
    { icon: <FiCopy />, label: "Copy to..." },
    { icon: <FiMove />, label: "Move to..." },
    { icon: <FiLink2 />, label: "Open with...", link: "https://themeforest.net/user/theme_ocean/" },
    { type: "divider" },
    { icon: <FiScissors />, label: "Backup" },
    { icon: <FiTrash2 />, label: "Remove" },
]

const StorageContent = () => {
    const [cloudData, setCloudData] = useState(cloudStorageData)
    const [fileData, setFileData] = useState(storageFolderData(0, 4))
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const handleDeleteCloud = (label, id) => {
        if (label === "Remove") {
            confirmDelete(id).then((result) => {
                if (result.confirmed) {
                    setCloudData(cloudData.filter((data) => data.id !== result.id));
                }
            })
        }
    };
    const handleDeleteFile = (label, id) => {
        if (label === "Remove") {
            confirmDelete(id).then((result) => {
                if (result.confirmed) {
                    setFileData(fileData.filter((data) => data.id !== result.id));
                }
            })
        }
    };

    return (
        <>
            <StorageSidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
            <div className='content-area'>
                <PerfectScrollbar>
                    <StrogeHeader setSidebarOpen={setSidebarOpen} />
                    <div className='content-area-body'>
                        <div className="recent-section mb-5">
                            <SectionTitle
                                sectionName={"Cloud Storage"}
                                sectionDescription={"Total Storage 100 GB (Free space 53.64 GB)"}
                            />
                            <div className="row">
                                {
                                    cloudData.map(({ id, iconSrc, lastActivity, name, progressColor, total, used }, index) => (
                                        <div key={id} className={`col-xxl-4 col-md-6 ${index === 0 ? " d-xxl-none" : ""}`}>
                                            <CloudStorageCard
                                                iconSrc={iconSrc}
                                                name={name}
                                                used={used}
                                                total={total}
                                                lastActivity={lastActivity}
                                                strogeOptions={strogeOptions}
                                                progressColor={progressColor}
                                                handleDelete={handleDeleteCloud}
                                                id={id}
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        <div className="recent-section mb-5">
                            <SectionTitle
                                sectionName={"Recent Files"}
                                sectionDescription={"Recent access files (Last access 24 min ago)"}
                            />
                            <div className="row">
                                {
                                    fileData.map(({ id, iconSrc, title }) => (
                                        <RecentFileCard
                                            key={id}
                                            imgSrc={iconSrc}
                                            title={title}
                                            projectLink="Project"
                                            dashboardLink="Dashboard"
                                            category="Webapps"
                                            strogeOptions={strogeOptions}
                                            handleDelete={handleDeleteFile}
                                            id={id}
                                        />
                                    ))
                                }
                            </div>
                        </div>

                        <div className="folder-section mb-5">
                            <SectionTitle
                                sectionName={"Folders"}
                                sectionDescription={"Recent access folders (Last access 2 hours ago)"}
                            />
                            <div className="row">
                                {
                                    storageFolderData().map(({ iconSrc, title, files, members, id }) => (
                                        <FoldersCard
                                            key={id}
                                            members={members}
                                            imgSrc={iconSrc}
                                            title={title}
                                            projectLink="Project"
                                            dashboardLink="Dashboard"
                                            category="Webapps"
                                            strogeOptions={strogeOptions}
                                        />
                                    ))
                                }
                            </div>
                        </div>

                        <div className="project-section">
                            <SectionTitle
                                sectionName={"Project Files"}
                                sectionDescription={"Recent project files (Last access 24 min ago)"}
                            />
                            <ProjectFilteTable />
                        </div>
                    </div>
                    <Footer />
                </PerfectScrollbar>
            </div>
        </>
    )
}

export default StorageContent


const SectionTitle = ({ sectionName, sectionDescription }) => {
    return (
        <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="me-4">
                <h2 className="fs-16 fw-bold mb-1">{sectionName}</h2>
                <div className="fs-12 text-muted text-truncate-1-line">{sectionDescription}</div>
            </div>
            <a href="#" className="btn btn-sm btn-light-brand">View More</a>
        </div>
    )
}


