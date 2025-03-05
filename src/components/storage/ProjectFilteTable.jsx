import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiEye, FiScissors, FiShare2, FiX } from 'react-icons/fi'
import ImageGroup from '@/components/shared/ImageGroup'
import Dropdown from '@/components/shared/Dropdown'
import Pagination from '@/components/shared/Pagination'
import { storageProjectData } from '@/utils/fackData/storageData'
import { confirmDelete } from '@/utils/confirmDelete'

const ProjectFilteTable = () => {
    const [data, setData] = useState(storageProjectData)

    const handleDelete = (label, id) => {
        if (label === "Delete") {
            confirmDelete(id).then((result) => {
                if (result.confirmed) {
                    setData(data.filter((data) => data.id !== result.id));
                }
            })
        }
    };
    return (
        <div className="card mb-0">
            <div className="card-body p-0">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Size</th>
                                <th scope="col">Upload</th>
                                <th scope="col">Members</th>
                                <th scope="col" className="text-end">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map(({ id, fileSIze, iconSrc, members, title, uploadDate }) =>
                                    <TableRow
                                        key={id}
                                        fileSIze={fileSIze}
                                        iconSrc={iconSrc}
                                        members={members}
                                        title={title}
                                        uploadDate={uploadDate}
                                        id={id}
                                        handleDelete={handleDelete}
                                    />
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='card-footer'>
                <Pagination />
            </div>
        </div>
    )
}

export default ProjectFilteTable

const TableRow = ({ fileSIze, iconSrc, title, uploadDate, members, handleDelete, id }) => {
    return (
        <tr>
            <td>
                <div className="d-flex align-items-center gap-3">
                    <img src={iconSrc} className="img-fluid rounded wd-30" alt="" />
                    <Link to="#">{title}</Link>
                </div>
            </td>
            <td>{fileSIze}</td>
            <td>{uploadDate}</td>
            <td>
                <div className="img-group lh-lg">
                    <ImageGroup data={members.user_list} avatarStyle={"avatar-sm bg-soft-primary"} />
                    <div>
                        <span className="text-muted fs-12 ms-2">{members.total_user}</span>
                    </div>
                </div>
            </td>
            <td>
                <Dropdown dropdownItems={tableActons} dropdownParentStyle={"hstack text-end justify-content-end"} id={id} onClick={handleDelete} />
            </td>
        </tr>
    )
}

const tableActons = [
    { label: "Open", icon: <FiEye /> },
    { label: "Share", icon: <FiShare2 /> },
    { type: "divider" },
    { label: "Backup", icon: <FiScissors /> },
    { label: "Delete", icon: <FiX />, },
];
