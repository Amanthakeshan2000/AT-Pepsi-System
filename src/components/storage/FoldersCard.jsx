import React from 'react'
import { FiMoreHorizontal } from 'react-icons/fi';
import ImageGroup from '@/components/shared/ImageGroup';

const FoldersCard = ({ imgSrc, imgAlt,  title, fileCount, members, additionalText }) => {
    return (
        <div className="col-xxl-3 col-sm-6">
            <div className="card mb-4 stretch stretch-full">
                <CardBody imgSrc={imgSrc} imgAlt={imgAlt} title={title} fileCount={fileCount} />
                <div className="img-group lh-0 p-3" style={{ marginLeft: '15px' }}>
                    <ImageGroup data={members.user_list} avatarStyle={"avatar-sm bg-soft-primary"} />
                    <div className="text-truncate-1-line">
                        <span className="text-muted fs-12 ms-2">{members.total_user}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FoldersCard


const CardBody = ({ imgSrc, imgAlt, title, fileCount }) => {
    return (
        <div className="card-body p-0">
            <a href="#" className="d-flex align-items-center border-bottom p-3" data-bs-toggle="offcanvas" data-bs-target="#fileFolderDetailsOffcanvas">
                <div className="p-2 avatar-image bg-gray-200 rounded-3">
                    <img src={imgSrc} alt={imgAlt} className="img-fluid" />
                </div>
                <div className="ms-3">
                    <span className="d-block">{title}</span>
                    <span className="fs-10 text-muted text-uppercase d-block">2,447 Files</span>
                </div>
            </a>
        </div>
    );
};

