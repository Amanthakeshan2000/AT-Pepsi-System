import React, { useState } from 'react'
import ChartsHeader from './ChatHeader'
import { chatMessageData } from '@/utils/fackData/chatMessageData'
import MessageEditor from './MessageEditor'
import PerfectScrollbar from "react-perfect-scrollbar";
import ChatMessage from './ChatMessage';
import ChatsUsers from './ChatsUsers';

const ChatContent = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    return (
        <>
            <ChatsUsers sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="content-area">
                <PerfectScrollbar>
                    <ChartsHeader setSidebarOpen={setSidebarOpen} />
                    <div className="content-area-body">
                        {
                            chatMessageData.map(({ isReplay, messages, time, user_img, user_name, isTyping }, index) => (
                                <ChatMessage
                                    key={index}
                                    avatar={user_img}
                                    name={user_name}
                                    time={time}
                                    messages={messages}
                                    isReplay={isReplay}
                                    isTyping={isTyping}
                                />
                            ))
                        }
                    </div>
                    <MessageEditor />
                </PerfectScrollbar>
            </div>
        </>
    )
}

export default ChatContent