import React, { useState } from 'react'
import { FiInfo, FiPlus } from 'react-icons/fi'

const checkList = [
    {
        id: 1,
        title: "Tested, debugged, and shipped 10s of 1000s of lines of code to various development teams.",
        checked: true
    },
    {
        id: 2,
        title: " Introduced Kanban Board style ticketing system to promote highly.",
        checked: false
    },
    {
        id: 3,
        title: "Utilized HTML, CSS, and JavaScript to create 100+ responsive landing pages for both company and client.",
        checked: false
    },
    {
        id: 4,
        title: "Rewrote HTML to meet industry and company standards for SEO and Accessibility.",
        checked: true
    },
    {
        id: 5,
        title: "Led bi-weekly stand-up to ensure team worked effectively.",
        checked: false
    },
    {
        id: 6,
        title: "Worked with Quality Assurance to get new pages/products tested.",
        checked: false
    },

]
const CheckList = () => {
    const [data, setData] = useState(checkList)
    const [inputValue, setInputValue] = useState("")

    const handleCheckList = (id) => {
        const updatedData = data.map(item => {
            if (item.id === id) {
                return { ...item, checked: !item.checked };
            }
            return item;
        });

        setData(updatedData);
    }

    const handleDeleteItem = (id) => {
        setData(data.filter((item) => item.id !== id))
    }

    const handleValueSubmit = () => {
        const id = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
        const value = {
            id,
            title: inputValue,
            checked: false
        }
        setData([...data, value])
        setInputValue("")
    }

    return (
        <>
            <div id="checklist">
                {
                    data.map(({ checked, id, title }) => (
                        <div key={id} className='d-flex p-0'>
                            <div onClick={() => handleCheckList(id)} className={`mb-0 w-100 ${checked ? "checked" : ""}`}>
                                {title}
                            </div>
                            <span onClick={() => handleDeleteItem(id)} className="close">×</span>
                        </div>
                    ))
                }
            </div>
            <div className="input-group mt-3">
                <input
                    id="checklistInput"
                    type="text"
                    className="form-control"
                    placeholder="Title..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <a
                    href="#"
                    className="input-group-text addCheckList"
                    onClick={handleValueSubmit}
                >
                    <FiPlus size={16} className='me-2' />
                    <span>Add Checklist</span>
                </a>
            </div>
        </>
    )
}

export default CheckList