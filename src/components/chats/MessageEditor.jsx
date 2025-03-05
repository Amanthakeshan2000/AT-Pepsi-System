import React from 'react'
import Dropdown from '@/components/shared/Dropdown'
import { FiHash, FiLink, FiPhoneCall, FiSend, FiVideo, } from 'react-icons/fi'
import { initMessage, uploadAttachments } from '../emails/ComposeMailFooter';
import EmojiPicker from 'emoji-picker-react';
import useEmojiPicker from '@/hooks/useEmojiPicker';


const callingOptions = [
    { icon: <FiPhoneCall />, label: "Audio Call", modalTarget: "#voiceCallingModalScreen" },
    { icon: <FiVideo />, label: "Video Call", modalTarget: "#videoCallingModalScreen" },
]

const MessageEditor = () => {
    const { emoji, setEmoji, toggleEmojiPicker, emojiPickerRefs, showEmojiPicker } = useEmojiPicker()
    return (
        <div className="d-flex align-items-center justify-content-between border-top border-gray-5 bg-white sticky-bottom">
            <div className="d-flex align-center">
                <Dropdown
                    dropdownItems={initMessage}
                    triggerIcon={<FiHash size={16} />}
                    dropdownMenuStyle='wd-300'
                    dropdownParentStyle={"border-end border-gray-5"}
                    triggerClass='wd-60 ht-60 d-flex align-items-center justify-content-center'
                    tooltipTitle="Pick Template"
                    isAvatar={false}
                />
                <Dropdown
                    dropdownItems={uploadAttachments}
                    triggerIcon={<FiLink size={16} />}
                    dropdownMenuStyle='wd-300'
                    dropdownParentStyle={"border-end border-gray-5"}
                    triggerClass='wd-60 ht-60 d-flex align-items-center justify-content-center'
                    tooltipTitle="Upload Attachments"
                    isAvatar={false}
                />
                <Dropdown
                    dropdownItems={callingOptions}
                    triggerIcon={<FiPhoneCall size={16} />}
                    dropdownMenuStyle='wd-300'
                    dropdownParentStyle={"border-end border-gray-5 d-none d-sm-block"}
                    triggerClass='wd-60 ht-60 d-flex align-items-center justify-content-center'
                    tooltipTitle="Calling Options"
                    isAvatar={false}
                />
            </div>
            <div className='position-relative form-control border-0 '>
                <input
                    className="w-100 border-0"
                    placeholder="Type your message here..."
                    defaultValue={emoji.join(' ')}
                />
                <div className='position-absolute emoji-clicker emoji fs-18 c-pointer' onClick={toggleEmojiPicker}>
                    😊
                </div>
            </div>
            {showEmojiPicker && <div className='emoji' ref={emojiPickerRefs}> <EmojiPicker onEmojiClick={(e) => setEmoji([...emoji, e.emoji])} className='position-absolute emoji-picker' /> </div>}
            <div className="border-start border-gray-5 send-message">
                <a
                    href="#"
                    className="wd-60 d-flex align-items-center justify-content-center"
                    data-bs-toggle="tooltip"
                    data-bs-trigger="hover"
                    title="Send Message"
                    style={{ height: 59 }}
                >
                    <FiSend size={16} strokeWidth={1.7} />
                </a>
            </div>
        </div>

    )
}

export default MessageEditor