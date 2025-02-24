import React, { useEffect, useState } from 'react'
import { FiStar, FiTrash2 } from 'react-icons/fi';
import { notesData } from '@/utils/fackData/notesData';
import { Link } from 'react-router-dom';
import { BsCircleFill } from 'react-icons/bs';
import NotesHeader from './NotesHeader';
import PerfectScrollbar from "react-perfect-scrollbar";
import Footer from '@/components/shared/Footer';
import NotesSidebar from './NotesSidebar';

const NotesContent = () => {
    const [data, setData] = useState()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [selectTab, setSelectTab] = useState("alls")
    const [selectCategory, setSelectCategory] = useState({id:"", name:""})
    const [favourites, setFavourites] = useState([])

    useEffect(() => {
        setData(notesData)
    }, [])

    useEffect(() => {
        if (selectTab === 'alls') {
            setData(notesData)
        }
        else {
            setData(notesData?.filter(({ category }) => category === selectTab))
        }
    }, [selectTab])


    const filteredCategory = []
    data?.forEach(({ category }) => {
        if (!filteredCategory.includes(category)) {
            filteredCategory.push(category)
        }
    })

    const handleDeleteNote = (id) => {
        setData(data.filter((note) => note.id !== id))
    }

    const handleFavourite = (id) => {
        if (favourites.includes(id)) {
            setFavourites(favourites.filter(favId => favId !== id));
        } else {
            setFavourites([...favourites, id]);
        }
    }


    const onCategory = (e, name, id) => {
        e.preventDefault()
        setSelectCategory({id:id, name:name})
    }

    return (
        <>
            <NotesSidebar selectTab={selectTab} setSelectTab={setSelectTab} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="content-area">
                <PerfectScrollbar>
                    <NotesHeader setSidebarOpen={setSidebarOpen} />
                    <div className="content-area-body pb-0">
                        <div className="row note-has-grid" id="note-full-container">
                            {
                                data?.map(({ category, content, date, id, title }) => (
                                    <NoteCard
                                        key={id}
                                        id={id}
                                        title={title}
                                        date={date}
                                        content={content}
                                        category={category}
                                        handleFavourite={handleFavourite}
                                        handleDeleteNote={handleDeleteNote}
                                        filteredCategory={filteredCategory}
                                        favourites={favourites}
                                        onCategory={onCategory}
                                        selectCategory={selectCategory}
                                    />
                                ))
                            }
                        </div>
                    </div>
                    <Footer />
                </PerfectScrollbar>
            </div>
        </>
    )
}

export default NotesContent


const NoteCard = ({ title, date, content, category, handleFavourite, handleDeleteNote, filteredCategory, id, favourites, onCategory, selectCategory }) => {

    return (
        <div className="col-xxl-4 col-xl-6 col-lg-4 col-sm-6 single-note-item all-category">
            <div className="card card-body mb-4 stretch stretch-full">
                <span className={`side-stick bg-${getColor(selectCategory.id == id ? selectCategory.name : category)}`}></span>
                <h5 className="note-title text-truncate w-75 mb-1 d-flex align-items-center" data-noteheading={title}>
                    {title}
                    <i className={`point ms-2 fs-7 text-${getColor(selectCategory.id == id ? selectCategory.name : category)}`}><BsCircleFill /></i>
                </h5>
                <p className="fs-11 text-muted note-date">{date}</p>
                <div className="note-content flex-grow-1">
                    <p className="text-muted note-inner-content text-truncate-3-line" data-notecontent={content}>
                        {content}
                    </p>
                </div>
                <div className="d-flex align-items-center gap-1">
                    <span className={`avatar-text avatar-sm ${favourites.includes(id) ? 'favourite' : ''}`} onClick={() => handleFavourite(id)}>
                        <FiStar />
                    </span>
                    <span className="avatar-text avatar-sm" onClick={() => handleDeleteNote(id)}>
                        <FiTrash2 />
                    </span>
                    <div className="ms-auto">
                        <div className="filter-dropdown btn-group category-selector">
                            <a className="nav-link dropdown-toggle category-dropdown label-group p-0" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="true">
                            </a>
                            <div className="dropdown-menu dropdown-menu-right category-menu">
                                {
                                    filteredCategory?.map((name, index) => (
                                        <Link
                                            key={index}
                                            onClick={(e) => onCategory(e, name, id)}
                                            className="note-tasks badge-group-item badge-tasks dropdown-item position-relative category-tasks text-capitalize" href="#">
                                            <span className={`wd-5 ht-5 rounded-circle me-3 bg-${getColor(name)}`}></span>
                                            {name}
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const getColor = (name) => {
    switch (name) {
        case 'tasks':
            return "danger"
        case 'works':
            return "primary"
        case 'social':
            return "info"
        case 'archive':
            return "dark"
        case 'priority':
            return "danger"
        case 'personal':
            return "primary"
        case 'business':
            return "warning"
        case 'important':
            return "success"

        default:
            return null;
    }
}
