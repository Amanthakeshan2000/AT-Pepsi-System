import React from 'react'
import { FiFileText, FiImage, FiLayers, FiMonitor, FiMusic, FiVideo } from 'react-icons/fi';

const StorageDetails = () => {
    return (
        <div
            className="offcanvas offcanvas-end file-manager-folder-details"
            tabIndex={-1}
            id="fileFolderDetailsOffcanvas"
        >
            <div className="offcanvas-header border-bottom">
                <h5 className="offcanvas-title" id="staticBackdropLabel">
                    Storage Details
                </h5>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                />
            </div>
            <div className="offcanvas-body p-0">
                <div className="tab-content">
                    <div className="tab-pane fade active show" id="fileDetailsTab">
                        <div className="p-4 d-flex align-items-center justify-content-center">
                            <img
                                src="/images/storage-icons/undefined.png"
                                className="img-fluid wd-200"
                                alt=""
                            />
                        </div>
                        <div className="drive-specifications">
                            <div className="px-4 py-2 fw-bold text-dark border-top border-bottom sticky-top bg-gray-100">
                                Specifications
                            </div>
                            <div className="p-4 fs-12">
                                <SpecificationsRow label="Type" value="Folder" />
                                <SpecificationsRow label="Location" value="Files & Documents" />
                                <SpecificationsRow label="Contributing" value="Specify" />
                                <SpecificationsRow label="Album" value="Specify" />
                                <SpecificationsRow label="Genre" value="Specify" />
                                <SpecificationsRow label="Year" value="2021" />
                                <SpecificationsRow label="Size" value="65.52 MB" />
                                <SpecificationsRow label="Track" value="Specify" />
                                <SpecificationsRow label="Artist" value="Specify" />
                                <SpecificationsRow label="Title" value="All Folder" />
                                <SpecificationsRow label="Bit Rate" value="512kbps" />
                                <SpecificationsRow label="Date Modification" value="10/10/2022" />
                                <SpecificationsRow label="Date Created" value="05/05/2022" />
                            </div>
                        </div>

                        <div className="drive-settings">
                            <div className="px-4 py-2 fw-bold text-dark border-top border-bottom sticky-top bg-gray-100">
                                Settings
                            </div>
                            <div className="p-4">
                                <SettingsChecbox id={"synchronization"} label={"Synchronization"} description={"Lorem ipsum quia dolor sit amet adipisci quia dolor"} />
                                <SettingsChecbox id={"autoBackup"} checked={true} label={"Auto Backup"} description={"Lorem ipsum quia dolor sit amet adipisci quia dolor"} />
                                <SettingsChecbox id={"muteNotification"} label={"Mute Notification"} description={"Lorem ipsum quia dolor sit amet adipisci quia dolor"} />
                                <SettingsChecbox id={"pushNotification"} checked={true} label={"Push Notification"} description={"Lorem ipsum quia dolor sit amet adipisci quia dolor"} />
                                <SettingsChecbox id={"getNotification"} label={"Get Notification"} description={"Lorem ipsum quia dolor sit amet adipisci quia dolor"} />
                            </div>
                        </div>

                        <div className="drive-status">
                            <div className="px-4 py-2 fw-bold text-dark border-top border-bottom sticky-top bg-gray-100">
                                Statistics
                            </div>
                            <div className="p-4">
                                <StorageItem
                                    icon={<FiImage />}
                                    bgClass="bg-soft-primary"
                                    textClass="text-primary"
                                    borderClass="border-soft-primary"
                                    title="Images"
                                    fileCount="1,252"
                                    size="2.25 GB"
                                />
                                <StorageItem
                                    icon={<FiVideo />}
                                    bgClass="bg-soft-danger"
                                    textClass="text-danger"
                                    borderClass="border-soft-danger"
                                    title="Video Files"
                                    fileCount="3,586"
                                    size="9.75 GB"
                                />

                                <StorageItem
                                    icon={<FiFileText />}
                                    bgClass="bg-soft-success"
                                    textClass="text-success"
                                    title="Documents"
                                    fileCount="2,147"
                                    size="3.47 GB"
                                />
                                <StorageItem
                                    icon={<FiMusic />}
                                    bgClass="bg-soft-teal"
                                    textClass="text-teal"
                                    title="Audio Files"
                                    fileCount="2,354"
                                    size="3.49 GB"
                                />
                                <StorageItem
                                    icon={<FiMonitor />}
                                    bgClass="bg-soft-warning"
                                    textClass="text-warning"
                                    title="UI/UX Design"
                                    fileCount="3,456"
                                    size="2.94 GB"
                                />
                                <StorageItem
                                    icon={<FiLayers />}
                                    bgClass="bg-soft-info"
                                    textClass="text-info"
                                    title="Other Files"
                                    fileCount="2,258"
                                    size="2.00 GB"
                                />
                            </div>
                        </div>

                        <div className="drive-comments">
                            <div className="px-4 py-2 fw-bold text-dark border-top border-bottom sticky-top bg-gray-100">
                                Comments
                            </div>
                            <div className="p-4">
                                <Comment
                                    avatarSrc="/images/avatar/3.png"
                                    name="Marianne Audrey"
                                    date="(Mar 2, 5:26 am)"
                                    content="Lorem ipsum dolor sit amet, consec tetuer adipi scing elit aenean commodo scing elit aenean commodo"
                                />
                                <Comment
                                    avatarText="N"
                                    name="Nancy Elliot"
                                    date="(Mar 2, 5:26 am)"
                                    content="Lorem ipsum dolor sit amet, consec tetuer adipi scing elit aenean commodo scing elit aenean commodo"
                                />
                                <Comment
                                    avatarSrc="/images/avatar/4.png"
                                    name="Holland Scott"
                                    date="(Mar 2, 2:21 pm)"
                                    content="Lorem ipsum dolor sit amet, consec tetuer adipi scing elit aenean commodo scing elit aenean commodo"
                                />
                                <textarea
                                    rows={5}
                                    className="form-control"
                                    placeholder="Comment"
                                    defaultValue={""}
                                />
                                <a href="#" className="btn btn-primary mt-4">
                                    Post Comment
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default StorageDetails

const SpecificationsRow = ({ label, value }) => {
    return (
        <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="fw-semibold text-dark">{label}</span>
            <span className="text-muted">{value}</span>
        </div>
    );
};

const SettingsChecbox = ({ id, label, description, checked, onChange }) => {
    return (
        <div className="form-group mb-4">
            <div className="form-item custom-control custom-checkbox checkbox-primary">
                <input
                    type="checkbox"
                    className="custom-control-input"
                    id={id}
                    defaultChecked={checked}
                    onChange={onChange}
                />
                <label
                    className="custom-control-label ps-2"
                    htmlFor={id}
                >
                    <span className="fw-semibold" style={{ marginTop: "-5px" }}>
                        {label}
                    </span>
                    <span className="fs-11 fw-normal text-muted text-truncate-1-line">
                        {description}
                    </span>
                </label>
            </div>
        </div>
    );
};


const StorageItem = ({ icon, bgClass, textClass, borderClass, title, fileCount, size }) => {
    return (
        <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center">
                <div className={`avatar-text ${bgClass} ${textClass} ${borderClass} rounded-3`}>
                    {React.cloneElement(icon, { size: 16 })}
                </div>
                <div className="ms-3">
                    <div className="fw-bold text-dark">{title}</div>
                    <span className="fs-11 fw-normal text-muted">
                        {fileCount} Files
                    </span>
                </div>
            </div>
            <div className="badge bg-gray-100 text-dark">{size}</div>
        </div>
    );
};

const Comment = ({ avatarSrc, avatarText, name, date, content }) => {
    return (
        <div className="mb-4 d-flex align-items-start">
            {avatarSrc ? (
                <div className="me-3 avatar-image">
                    <img src={avatarSrc} className="rounded-circle img-fluid" alt="avatar" />
                </div>
            ) : (
                <div className="me-3 bg-warning text-white avatar-text">{avatarText}</div>
            )}
            <div>
                <div className="d-flex align-items-center">
                    <a href="#" className="me-2">
                        {name}
                    </a>
                    <div className="fs-11 fw-normal text-muted">{date}</div>
                </div>
                <div className="fs-12 text-muted mt-1 text-truncate-2-line">{content}</div>
            </div>
        </div>
    );
};
