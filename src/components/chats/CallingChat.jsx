import React from 'react'
import { FiAlertTriangle, FiEyeOff, FiTrash2 } from 'react-icons/fi'
import Dropdown from '@/components/shared/Dropdown'
import { chatMessageData } from '@/utils/fackData/chatMessageData'
import { FileMessage } from './ChatMessage'
import PerfectScrollbar from "react-perfect-scrollbar";
import useEmojiPicker from '@/hooks/useEmojiPicker'
import EmojiPicker from 'emoji-picker-react'

const chatptions = [
    { icon: <FiEyeOff />, label: "Hide Message" },
    { icon: <FiTrash2 />, label: "Delete Message" },
    { icon: <FiAlertTriangle />, label: "Report Message" },
]
const CallingChat = () => {
    const { emoji, setEmoji, toggleEmojiPicker, emojiPickerRefs, showEmojiPicker } = useEmojiPicker()
    return (
        <div className="d-none d-lg-block chat-calling-text-message-sidebar active">
            <div className="p-4 fs-16 fw-bold text-dark border-bottom">In-call messages</div>
            <div className="d-flex flex-column position-relative in-call-messages-items" data-scrollbar-target="#psScrollbarInit">
                <PerfectScrollbar>
                    {
                        chatMessageData.map(({ isReplay, messages, time, user_img, user_name, isTyping }, index) => {
                            return (
                                <div key={index} className="p-4 text-dark border-bottom single-item">
                                    <div className="w-100 d-flex align-items-start justify-content-between">
                                        <div className="d-flex align-items-start">
                                            <div className="avatar-image me-3">
                                                <img src={user_img} className="img-fluid" alt="image" />
                                            </div>
                                            <div>
                                                <a href="#" className="fs-13 fw-bold d-flex align-items-center mb-1">{user_name}</a>
                                                {
                                                    messages.map((message, index) => (
                                                        message.fileUrl ? (
                                                            <FileMessage key={index} fileUrl={message.fileUrl} />
                                                        ) : (
                                                            <div key={index} className="fs-12 fw-normal text-muted text-truncate-2-line" dangerouslySetInnerHTML={{ __html: message }}></div>
                                                        )
                                                    ))
                                                }
                                                {
                                                    isTyping ?
                                                        <div className="d-flex align-items-baseline text typing">
                                                            <div className="fs-11 text-success">Typing</div>
                                                            <div className="wave">
                                                                <span className="dot"></span>
                                                                <span className="dot"></span>
                                                                <span className="dot"></span>
                                                            </div>
                                                        </div>
                                                        :
                                                        ""
                                                }
                                            </div>
                                        </div>
                                        {
                                            isTyping ?
                                                ""
                                                :
                                                <Dropdown
                                                    dropdownItems={chatptions}
                                                    dropdownParentStyle={"ms-3"}
                                                />
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </PerfectScrollbar>
            </div>
            <div className="px-3 py-2 fs-16 fw-bold">
                <div className='position-relative  '>
                    <input className="form-control border-0 emoji-picker" placeholder="Type your message here..." />
                    <div className='position-absolute emoji-clicker emoji fs-18 c-pointer' onClick={toggleEmojiPicker}>
                        😊
                    </div>
                    {showEmojiPicker && <div className='emoji' ref={emojiPickerRefs}> <EmojiPicker onEmojiClick={(e) => setEmoji([...emoji, e.emoji])} className='position-absolute emoji-picker' /> </div>}
                </div>
            </div>
        </div>
    )
}

export default CallingChat