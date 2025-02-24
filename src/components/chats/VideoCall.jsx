import React from 'react'
import CallingChat from './CallingChat'
import CallHeader from './CallHeader'
import CallAction from './CallAction'

const VideoCall = () => {
    return (
        <div className="modal fade calling-modal-screen" id="videoCallingModalScreen" data-bs-backdrop="static" aria-hidden="true" aria-labelledby="videoCallingModalScreen" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-fullscreen" role="document">
                <div className="modal-content">
                    <div className="h-100 d-flex aling-items-center justify-content-center">
                        <div className="w-100 chat-calling-content">
                            <CallHeader />
                            {/* <!--! BEGIN: [video-call-content] !--> */}
                            <div className="d-flex align-items-end justify-content-start position-relative video-call-content">
                                <video autoPlay loop playsInline>
                                    <source src="/images/general/video_bg_1.mp4" type="video/mp4" />
                                </video>
                                <div className="m-4 border border-5 rounded-3" style={{ zIndex: "1" }}>
                                    <img src="/images/avatar/10.png" className="img-fluid" alt="Image" />
                                </div>
                            </div>
                            <div className="p-4 gap-2 d-flex align-items-center justify-content-center calling-receiver-action">
                                <CallAction isVideoCall={true}/>
                            </div>
                        </div>
                        <CallingChat />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoCall