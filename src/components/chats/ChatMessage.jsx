import React from 'react';
import { FiDownload } from 'react-icons/fi';

// Single Chat Component
const ChatMessage = ({ avatar, name, time, messages, isReplay, isTyping }) => {

    return (
        <div className={`single-chat-item mb-5`}>
            <div className={`d-flex align-items-center gap-3 mb-3 ${isReplay ? 'flex-row-reverse' : ''}`}>
                <a href="#" className="avatar-image">
                    <img src={avatar} className="img-fluid rounded-circle" alt="avatar" />
                </a>
                <div className={`d-flex align-items-center gap-2 ${isReplay ? 'flex-row-reverse' : ''}`}>
                    <a href="#">{name}</a>
                    <span className="wd-5 ht-5 bg-gray-400 rounded-circle"></span>
                    <span className="fs-11 text-muted">{time}</span>
                </div>
            </div>
            <div className={`wd-500 p-3 rounded-5 bg-gray-200 message-content ${isReplay ? 'ms-auto' : ''}`}>
                {
                    messages.map((message, index) => (
                        message.fileUrl ? (
                            <FileMessage key={index} fileUrl={message.fileUrl} />
                        ) : (
                            <p key={index} className="py-2 px-3 rounded-5 bg-white" dangerouslySetInnerHTML={{ __html: message }}></p>
                        )
                    ))
                }
                {
                    isTyping &&
                    <div className="py-2 px-3 rounded-5 bg-white d-flex align-items-center text typing chat-message-items">
                        <div className="fs-12 fw-semibold text-success">Typing</div>
                        <div className="wave">
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                        </div>
                    </div>
                }

            </div>
        </div>
    );
};

export default ChatMessage;


export const FileMessage = ({ fileUrl }) => {
    return (
        fileUrl.map(({ iconSrc, fileName, fileSize }, index) => (
            <div key={index} className="mb-3 d-flex align-items-center justify-content-between bg-white border rounded-3">
                <div className="d-flex align-items-center">
                    <a href="#" className="p-3 d-flex align-items-center border-end wd-70 ht-70">
                        <img src={iconSrc} className="img-fluid" alt="image" />
                    </a>
                    <div className="d-block ms-3">
                        <a href="#" className="fs-13 fw-700 text-dark d-block">{fileName}</a>
                        <small className="fw-300 text-dark">{fileSize}</small>
                    </div>
                </div>
                <div className="d-flex align-items-center p-3 border-start">
                    <a href="#" className="avatar-text file-download">
                        <FiDownload size={16} />
                    </a>
                </div>
            </div>
        ))
    );
};

