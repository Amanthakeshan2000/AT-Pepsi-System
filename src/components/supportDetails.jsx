import React from 'react'
// import { TrandingCard } from '.'
import { FiCheck, FiFacebook, FiX } from 'react-icons/fi'
import { TrandingCard } from '../pages/help-knowledgebase'

const SupportDetails = () => {
    return (
        <div className="offcanvas offcanvas-end topics-details-offcanvas" tabIndex={-1} id="topicsDetailsOffcanvas" aria-labelledby="topicsDetailsOffcanvas">
            <div className="offcanvas-header border-bottom px-4">
                <div className="d-flex">
                    <a href="#">Help</a>
                    <span className="mx-2 text-muted">/</span>
                    <a href="#">Started</a>
                    <span className="mx-2 text-muted">/</span>
                    <div className="text-muted">Integration</div>
                </div>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" />
            </div>
            <div className="offcanvas-body">
                <div className="p-lg-5 mx-lg-5 help-center details-content-body">
                    <h2 className="fs-18">How to filter object on the map?</h2>
                    <p className="fs-12 text-muted">Last Updates: <span className="text-dark fw-medium">26 May, 2024</span></p>
                    <hr className="my-4" />
                    <h4 className="fs-14">Hey there...!!!</h4>
                    <p className="text-muted">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda consectetur illo at placeat cum nulla repellat expedita nostrum praesentium blanditiis repudiandae commodi tempore debitis odio, doloremque magni eaque soluta cupiditate ullam harum, necessitatibus sunt voluptas eum laboriosam. Consequatur nobis fuga fugiat deleniti veritatis sint, suscipit magni tempora labore. Neque, eaque?</p>
                    <p className="text-muted">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda consectetur illo at placeat cum nulla repellat expedita nostrum praesentium blanditiis repudiandae commodi tempore debitis odio, doloremque magni eaque soluta cupiditate ullam harum, necessitatibus sunt voluptas eum laboriosam. Consequatur nobis fuga fugiat deleniti veritatis sint, suscipit magni tempora labore. Neque, eaque?</p>
                    <ul className="text-muted my-4">
                        <li className="mb-2"><strong className="text-dark">Integration</strong> Applications</li>
                        <li className="mb-2"><strong className="text-dark">Integration</strong> Video Tutorials</li>
                        <li className="mb-2"><strong className="text-dark">Step by Step</strong> Intigrations Guide</li>
                        <li className="mb-2"><strong className="text-dark">Add favorite</strong> for quick and messaging</li>
                        <li className="mb-2"><strong className="text-dark">Fine-tune</strong> your notifications to focus on that matters</li>
                        <li><strong className="text-dark">Trigger your inbox</strong> and own your email experience</li>
                    </ul>
                    <div className="mt-5">
                        <h2 className="fs-13 fw-700 mb-3">Integration Features</h2>
                        <ul className="list-unstyled">
                            <li className="d-flex align-items-center mb-2">
                                <span className="avatar-text avatar-sm bg-soft-success text-success me-2">
                                    <FiCheck size={10} />
                                </span>
                                <span>Access basic company informations and details.</span>
                            </li>
                            <li className="d-flex align-items-center mb-2">
                                <span className="avatar-text avatar-sm bg-soft-success text-success me-2">
                                    <FiCheck size={10} />
                                </span>
                                <span>Access and edite bugs reports and create new issues.</span>
                            </li>
                            <li className="d-flex align-items-center mb-2">
                                <span className="avatar-text avatar-sm bg-soft-success text-success me-2">
                                    <FiCheck size={10} />
                                </span>
                                <span>Change issues status and assignee of issues.</span>
                            </li>
                            <li className="d-flex align-items-center mb-2">
                                <span className="avatar-text avatar-sm bg-soft-success text-success me-2">
                                    <FiCheck size={10} />
                                </span>
                                <span>Open and resolve intercom conversations.</span>
                            </li>
                            <li className="d-flex align-items-center mb-2">
                                <span className="avatar-text avatar-sm bg-soft-success text-success me-2">
                                    <FiCheck size={10} />
                                </span>
                                <span>Add or remover users and change user roles.</span>
                            </li>
                            <li className="d-flex align-items-center mb-2">
                                <span className="avatar-text avatar-sm bg-soft-success text-success me-2">
                                    <FiCheck size={10} />
                                </span>
                                <span>We care about your Privacy in our <a href="#">Privacy &amp; Policy</a>.</span>
                            </li>
                            <li className="d-flex align-items-center">
                                <span className="avatar-text avatar-sm bg-soft-success text-success me-2">
                                    <FiCheck size={10} />
                                </span>
                                <span>By clicking allow access, your authorize untitled to access your informations.</span>
                            </li>
                        </ul>
                    </div>
                    <div className="mb-5">
                        <pre><code className="language-html">{"\t"}{"\t"}{"\t"}{"\t"}{"\t"}{"\n"}&lt;!DOCTYPE html&gt;{"\n"}&lt;html lang="zxx"&gt;{"\n"}&lt;head&gt;{"\n"}{"    "}&lt;meta charset="utf-8"&gt;{"\n"}{"    "}&lt;meta http-equiv="x-ua-compatible" content="IE=edge"&gt;{"\n"}{"    "}&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;{"\n"}{"    "}&lt;meta name="description" content=""&gt;{"\n"}{"    "}&lt;meta name="keyword" content=""&gt;{"\n"}{"    "}&lt;meta name="author" content="WRAPCODERS"&gt;{"\n"}{"    "}&lt;!--! The above 6 meta tags *must* come first in the head; any other head content must come *after* these tags !--&gt;{"\n"}{"    "}&lt;!--! BEGIN: Apps Title--&gt;{"\n"}{"    "}&lt;title&gt;Help Center&lt;/title&gt;{"\n"}{"    "}&lt;!--! END:{"  "}Apps Title--&gt;{"\n"}{"    "}&lt;!--! BEGIN: Favicon--&gt;{"\n"}{"    "}&lt;link type="image/x-icon" rel="shortcut icon" href=".assets/images/favicon.ico"&gt;{"\n"}{"    "}&lt;!--! END: Favicon--&gt;{"\n"}{"    "}&lt;!--! BEGIN: Bootstrap CSS--&gt;{"\n"}{"    "}&lt;link type="text/css" rel="stylesheet" href=".assets/css/bootstrap.min.css"&gt;{"\n"}{"    "}&lt;!--! END: Bootstrap CSS--&gt;{"\n"}{"    "}&lt;!--! BEGIN: Vendors CSS--&gt;{"\n"}{"    "}&lt;link type="text/css" rel="stylesheet" href=".assets/vendors/css/vendors.min.css"&gt;{"\n"}{"    "}&lt;!--! END: Vendors CSS--&gt;{"\n"}{"    "}&lt;!--! BEGIN: Custom CSS--&gt;{"\n"}{"    "}&lt;link type="text/css" rel="stylesheet" href=".assets/css/theme.min.css"&gt;{"\n"}{"    "}&lt;!--! END: Custom CSS--&gt;{"\n"}{"    "}&lt;!--! HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries !--&gt;{"\n"}{"    "}&lt;!--! WARNING: Respond.js doesn"t work if you view the page via file: !--&gt;{"\n"}{"    "}&lt;!--[if lt IE 9]&gt;{"\n"}{"        "}&lt;script src="https:oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"&gt;&lt;/script&gt;{"\n"}{"        "}&lt;script src="https:oss.maxcdn.com/respond/1.4.2/respond.min.js"&gt;&lt;/script&gt;{"\n"}{"    "}&lt;![endif]--&gt;{"\n"}&lt;/head&gt;{"\n"}&lt;/html&gt;{"\n"}{"                            "}</code>{"\n"}{"                            "}</pre>
                    </div>
                    <h4 className="fs-13">👋 Threds</h4>
                    <p className="text-muted mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque officiis minus omnis veniam cupiditate molestiae itaque hic quibusdam fuga modi quam cumque recusandae harum nulla vero, tempore possimus aliquid animi!</p>
                    <div className="mb-5">
                        <pre><code className="language-js">{"\n"}{"                                "}const Prism = require('prismjs');{"\n"}{"\n"}{"                                "}// The code snippet you want to highlight, as a string{"\n"}{"                                "}const code = `var data = 1;`;{"\n"}{"\n"}{"                                "}// Returns a highlighted HTML string{"\n"}{"                                "}const html = Prism.highlight(code, Prism.languages.javascript, 'javascript');{"\n"}{"                            "}</code></pre>
                    </div>
                    <h4 className="fs-13">📌 Inbox</h4>
                    <p className="text-muted mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque officiis minus omnis veniam cupiditate molestiae itaque hic quibusdam fuga modi quam cumque recusandae harum nulla vero, tempore possimus aliquid animi!</p>
                    <div className="mb-5">
                        <pre><code className="language-js">{"\n"}{"                                "}const Prism = require('prismjs');{"\n"}{"\n"}{"                                "}// The code snippet you want to highlight, as a string{"\n"}{"                                "}const code = `var data = 1;`;{"\n"}{"\n"}{"                                "}// Returns a highlighted HTML string{"\n"}{"                                "}const html = Prism.highlight(code, Prism.languages.javascript, 'javascript');{"\n"}{"                            "}</code></pre>
                    </div>
                    <h4 className="fs-13">👙 Bundles</h4>
                    <p className="text-muted mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque officiis minus omnis veniam cupiditate molestiae itaque hic quibusdam fuga modi quam cumque recusandae harum nulla vero, tempore possimus aliquid animi!</p>
                    <div className="mb-5">
                        <pre><code className="language-js">{"\n"}{"                                "}const Prism = require('prismjs');{"\n"}{"\n"}{"                                "}// The code snippet you want to highlight, as a string{"\n"}{"                                "}const code = `var data = 1;`;{"\n"}{"\n"}{"                                "}// Returns a highlighted HTML string{"\n"}{"                                "}const html = Prism.highlight(code, Prism.languages.javascript, 'javascript');{"\n"}{"                            "}</code></pre>
                    </div>
                    <h4 className="fs-13">⌚ Snoozen</h4>
                    <p className="text-muted mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque officiis minus omnis veniam cupiditate molestiae itaque hic quibusdam fuga modi quam cumque recusandae harum nulla vero, tempore possimus aliquid animi!</p>
                    <div className="mb-5">
                        <pre><code className="language-js">{"\n"}{"                                "}const Prism = require('prismjs');{"\n"}{"\n"}{"                                "}// The code snippet you want to highlight, as a string{"\n"}{"                                "}const code = `var data = 1;`;{"\n"}{"\n"}{"                                "}// Returns a highlighted HTML string{"\n"}{"                                "}const html = Prism.highlight(code, Prism.languages.javascript, 'javascript');{"\n"}{"                            "}</code></pre>
                    </div>
                    <h4 className="fs-13">🎂 Groups</h4>
                    <p className="text-muted mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque officiis minus omnis veniam cupiditate molestiae itaque hic quibusdam fuga modi quam cumque recusandae harum nulla vero, tempore possimus aliquid animi!</p>
                    <div className="mb-5">
                        <pre><code className="language-js">{"\n"}{"                                "}const Prism = require('prismjs');{"\n"}{"\n"}{"                                "}// The code snippet you want to highlight, as a string{"\n"}{"                                "}const code = `var data = 1;`;{"\n"}{"\n"}{"                                "}// Returns a highlighted HTML string{"\n"}{"                                "}const html = Prism.highlight(code, Prism.languages.javascript, 'javascript');{"\n"}{"                            "}</code></pre>
                    </div>
                    <h4 className="fs-13">😳 Channel</h4>
                    <p className="text-muted mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque officiis minus omnis veniam cupiditate molestiae itaque hic quibusdam fuga modi quam cumque recusandae harum nulla vero, tempore possimus aliquid animi!</p>
                    <div className="mb-5">
                        <pre><code className="language-js">{"\n"}{"                                "}const Prism = require('prismjs');{"\n"}{"\n"}{"                                "}// The code snippet you want to highlight, as a string{"\n"}{"                                "}const code = `var data = 1;`;{"\n"}{"\n"}{"                                "}// Returns a highlighted HTML string{"\n"}{"                                "}const html = Prism.highlight(code, Prism.languages.javascript, 'javascript');{"\n"}{"                            "}</code></pre>
                    </div>
                    <h4 className="fs-13">🎉 Favorite</h4>
                    <p className="text-muted mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque officiis minus omnis veniam cupiditate molestiae itaque hic quibusdam fuga modi quam cumque recusandae harum nulla vero, tempore possimus aliquid animi!</p>
                    <div>
                        <pre><code className="language-js">{"\n"}{"                                "}const Prism = require('prismjs');{"\n"}{"\n"}{"                                "}// The code snippet you want to highlight, as a string{"\n"}{"                                "}const code = `var data = 1;`;{"\n"}{"\n"}{"                                "}// Returns a highlighted HTML string{"\n"}{"                                "}const html = Prism.highlight(code, Prism.languages.javascript, 'javascript');{"\n"}{"                            "}</code></pre>
                    </div>
                    <hr className="my-5" />
                    <p className="text-muted">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda consectetur illo at placeat cum nulla repellat expedita nostrum praesentium blanditiis repudiandae commodi tempore debitis odio, doloremque magni eaque soluta cupiditate ullam harum, necessitatibus sunt voluptas eum laboriosam. Consequatur nobis fuga fugiat deleniti veritatis sint, suscipit magni tempora labore. Neque, eaque?</p>
                    <ul className="text-muted my-4">
                        <li className="mb-2"><strong className="text-dark">Integration</strong> Applications</li>
                        <li className="mb-2"><strong className="text-dark">Integration</strong> Video Tutorials</li>
                        <li className="mb-2"><strong className="text-dark">Step by Step</strong> Intigrations Guide</li>
                        <li className="mb-2"><strong className="text-dark">Add favorite</strong> for quick and messaging</li>
                        <li className="mb-2"><strong className="text-dark">Fine-tune</strong> your notifications to focus on that matters</li>
                        <li><strong className="text-dark">Trigger your inbox</strong> and own your email experience</li>
                    </ul>
                    <hr className="my-5" />
                    <div className="w-100 p-5 bg-gray-100 text-center">
                        <h2 className="fs-16 mb-2">Having trouble logging in?</h2>
                        <p className="text-muted">Explore some common issues or solutions or get in tuch with us.</p>
                        <div className="d-flex justify-content-center gap-2">
                            <a href="#" className="btn btn-sm btn-success">Read FAQ's</a>
                            <a href="#" className="btn btn-sm btn-danger">Contact Support</a>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center mt-5">
                        <div className="d-flex align-items-center text-muted">
                            <fs-11 className="me-3">Is this article helpful?</fs-11>
                            <a href="#" className="wd-15 ht-15 d-flex align-items-center justify-content-center rounded-3 bg-gray-100 m-1">
                                <FiX className="text-danger fs-12" />
                            </a>
                            <a href="#" className="wd-15 ht-15 d-flex align-items-center justify-content-center rounded-3 bg-gray-100 m-1">
                                <FiCheck className="text-success fs-12" />
                            </a>
                        </div>
                    </div>
                    <hr className="my-5" />
                    <div className="mb-4">
                        <h2 className="fs-18 mb-1">Topics in this collections</h2>
                        <p className="fs-12 text-muted">6 More topics in this collections</p>
                    </div>
                    <div className="row">
                        <div className="col-xxl-6">
                            <TrandingCard title={"How to upload data to the system?"} />
                            <TrandingCard title={"How to draw a land plot on a map?"} />
                            <TrandingCard title={"How to to view expire services?"} />
                        </div>
                        <div className="col-xxl-6">
                            <TrandingCard title={"How to upload data to the system?"} />
                            <TrandingCard title={"How to draw a land plot on a map?"} />
                            <TrandingCard title={"How to to view expire services?"} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SupportDetails