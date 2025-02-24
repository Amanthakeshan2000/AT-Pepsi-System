import React from 'react'
import CallingChat from './CallingChat'
import CallHeader from './CallHeader'
import CallAction from './CallAction'

const VoiceCall = () => {
    return (
        <div className="modal fade calling-modal-screen" id="voiceCallingModalScreen" data-bs-backdrop="static" aria-hidden="true" aria-labelledby="voiceCallingModalScreen" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-fullscreen" role="document">
                <div className="modal-content rounded-0">
                    <div className="h-100 d-flex aling-items-center justify-content-center">
                        <div className="w-100 chat-calling-content">
                            <CallHeader />
                            {/* <!--! BEGIN: [voice-call-content] !-->  */}
                            <div className="d-flex align-items-center justify-content-center flex-column voice-call-content">
                                <div className="wd-150 ht-150">
                                    <img src="/images/avatar/1.png" className="rounded-circle border border-5 img-fluid animation-infinite" alt="image" />
                                </div>
                                <div className="my-4 text-center">
                                    <h2 className="fs-13 fw-bold text-dark mb-1">Alexandra Della</h2>
                                    <span className="fs-12 text-muted d-block">alex.della@outlook.com</span>
                                </div>
                                <CallAction />
                            </div>
                            {/* <!--! END: [voice-call-content] !--> */}
                        </div>
                        <CallingChat />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VoiceCall