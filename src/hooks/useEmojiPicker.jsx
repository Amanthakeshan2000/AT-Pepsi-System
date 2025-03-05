import React, { useEffect, useRef, useState } from 'react'

const useEmojiPicker = () => {
    const [emoji, setEmoji] = useState([])
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const emojiPickerRefs = useRef();

    const toggleEmojiPicker = (e) => {
        e.stopPropagation();
        setShowEmojiPicker(!showEmojiPicker);

    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (emojiPickerRefs.current && !emojiPickerRefs.current.contains(event.target)) {
                setShowEmojiPicker(false);
            }
        };
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return { emoji, setEmoji, toggleEmojiPicker, emojiPickerRefs, showEmojiPicker }
}

export default useEmojiPicker