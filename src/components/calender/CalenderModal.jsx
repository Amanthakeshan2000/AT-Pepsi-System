import React, { forwardRef } from 'react';
import { IoMdClose } from 'react-icons/io';

const CalenderModal = forwardRef(({ children, onClose, position }, ref) => {

    return (
        <div className='calender-event-modal-container' ref={ref}>
            <div className='calender-event-modal'>
                {/* <div className="modal-top-arrow"></div> */}
                <div onClick={onClose} className="calender-event-modal-close">
                    <IoMdClose />
                </div>
                <div style={{ marginTop: "20px" }}>{children}</div>
            </div>
        </div>
    );
});

export default CalenderModal;
