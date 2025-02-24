import React, { useEffect, useState } from 'react'
import EmailHeader from './EmailHeader'
import { emailList } from '@/utils/fackData/emailList'
import EmailFooter from './EmailFooter'
import EmailList from './EmailList'
import PerfectScrollbar from "react-perfect-scrollbar";
import EmailSIdebar from './EmailSIdebar'
import EmailDetails from './EmailDetails'

const EmailContent = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [emails, setEmails] = useState(emailList.emails)
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [showIcon, setShowIcon] = useState(false)
    const [showDetails, setShowDetails] = useState(false)

    // Handle individual item selection
    const handleSelectItem = (id) => {
        setSelectedItems((prevSelected) => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter((itemId) => itemId !== id);
            } else {
                return [...prevSelected, id];
            }
        });
    };

    // Handle select all items
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedItems([]);
        } else {
            setSelectedItems(emails.map((item) => item.id));
        }
        setSelectAll(!selectAll);
    };

    // Handle email detsila
    const handleDetailsShow = () => {
        setShowDetails(true)
    }

    useEffect(() => {
        if (selectedItems.length === emails.length) {
            setSelectAll(true);
        } else {
            setSelectAll(false);
        }

        if (selectedItems.length > 0) {
            setShowIcon(true)
        }
        else {
            setShowIcon(false)
        }

    }, [selectedItems, emails.length]);


    return (
        <>
            <EmailSIdebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
            <div className={`content-area ${showDetails ? "items-details-active" : ""}`}>
                <PerfectScrollbar>
                    <EmailHeader handleSelectAll={handleSelectAll} selectAll={selectAll} showIcon={showIcon} setSidebarOpen={setSidebarOpen} />
                    <div className="content-area-body p-0">
                        {
                            emails.map(({ id, user_img, user_name, subject, labels, date }) => (
                                <EmailList
                                    id={id}
                                    user_img={user_img}
                                    user_name={user_name}
                                    subject={subject}
                                    labels={labels}
                                    date={date}
                                    handleSelectItem={handleSelectItem}
                                    selectedItems={selectedItems}
                                    handleDetailsShow={handleDetailsShow}
                                    emails={emails}
                                    setEmails={setEmails}
                                />
                            ))
                        }
                        <EmailFooter />
                    </div>
                </PerfectScrollbar>
                <EmailDetails setShowDetails={setShowDetails} />
            </div>
        </>
    )
}

export default EmailContent