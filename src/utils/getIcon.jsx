
import { BsEnvelope, BsEnvelopeCheck, BsEnvelopeHeart, BsEnvelopeOpen, BsEnvelopePlus, BsEnvelopeSlash } from "react-icons/bs";
import { FaBriefcase, FaBuilding, FaCakeCandles, FaCcMastercard, FaCcPaypal, FaCcVisa, FaChrome, FaEdge, FaFacebook, FaFirefoxBrowser, FaHouse, FaInternetExplorer, FaLinkedin, FaLock, FaOctopusDeploy, FaOpera, FaPlane, FaSafari, FaTwitter, FaUmbrellaBeach, FaUsers, FaYoutube } from "react-icons/fa6";
import { FiActivity, FiAirplay, FiAlertCircle, FiArchive, FiArrowDown, FiArrowUp, FiAtSign, FiAward, FiBarChart2, FiBell, FiBellOff, FiBluetooth, FiBriefcase, FiCast, FiCheck, FiCheckCircle, FiChrome, FiClipboard, FiClock, FiCompass, FiCopy, FiCrosshair, FiDelete, FiDollarSign, FiEdit, FiEye, FiFacebook, FiFigma, FiFileText, FiFramer, FiGitBranch, FiGitCommit, FiGithub, FiGitlab, FiGlobe, FiGrid, FiHelpCircle, FiInstagram, FiLayers, FiLayout, FiLifeBuoy, FiLink, FiLink2, FiLinkedin, FiList, FiLock, FiLogIn, FiMail, FiMapPin, FiMessageSquare, FiMonitor, FiMoon, FiPause, FiPhone, FiPieChart, FiPlusSquare, FiPower, FiRepeat, FiSearch, FiSend, FiSettings, FiShield, FiShoppingBag, FiShoppingCart, FiSliders, FiSmartphone, FiStar, FiSun, FiSunrise, FiSunset, FiTablet, FiTag, FiTrash2, FiTwitter, FiType, FiUmbrella, FiUser, FiUserCheck, FiUserMinus, FiUserPlus, FiUsers, FiX, FiYoutube } from "react-icons/fi";

const getIcon = (name) => {
    switch (name) {
        case "feather-moon":
            return <FiMoon />
        case "feather-sunrise":
            return <FiSunrise />
        case "feather-sun":
            return <FiSun />
        case "feather-users":
            return <FiUsers />
        case "feather-user":
            return <FiUser />
        case "feather-user-check":
            return <FiUserCheck />
        case "feather-user-plus":
            return <FiUserPlus />
        case "feather-user-minus":
            return <FiUserMinus />
        case "feather-arrow-up":
            return <FiArrowUp />
        case "feather-arrow-down":
            return <FiArrowDown />
        case "feather-at-sign":
            return <FiAtSign />
        case "feather-globe":
            return <FiGlobe />
        case "feather-lock":
            return <FiLock />
        case "feather-settings":
            return <FiSettings />
        case "feather-smart-phone":
            return <FiSmartphone />
        case "feather-bell":
            return <FiBell />
        case "feather-mail":
            return <FiMail />
        case "feather-repeat":
            return <FiRepeat />
        case "feather-bell-off":
            return <FiBellOff />
        case "feather-link-2":
            return <FiLink2 />
        case "feather-phone":
            return <FiPhone />
        case "feather-compass":
            return <FiCompass />
        case "feather-briefcase":
            return <FiBriefcase />
        case "feather-link":
            return <FiLink />
        case "feather-map-pin":
            return <FiMapPin />
        case "feather-type":
            return <FiType />
        case "feather-dollar-sign":
            return <FiDollarSign />
        case "feather-eye":
            return <FiEye />
        case "feather-tag":
            return <FiTag />
        case "feather-message-square":
            return <FiMessageSquare />
        case "feather-search":
            return <FiSearch />
        case "feather-linkedin":
            return <FiLinkedin />
        case "feather-instagram":
            return <FiInstagram />
        case "feather-twitter":
            return <FiTwitter />
        case "feather-facebook":
            return <FiFacebook />
        case "feather-github":
            return <FiGithub />
        case "feather-shield":
            return <FiShield />
        case "feather-log-in":
            return <FiLogIn />
        case "feather-clipboard":
            return <FiClipboard />
        case "feather-check":
            return <FiCheck />
        case "feather-x":
            return <FiX />
        case "feather-cast":
            return <FiCast />
        case "feather-activity":
            return <FiActivity />
        case "feather-check-circle":
            return <FiCheckCircle />
        case "feather-pie-chart":
            return <FiPieChart />
        case "feather-plus-square":
            return <FiPlusSquare />
        case "feather-sunset":
            return <FiSunset />
        case "feather-power":
            return <FiPower />
        case "feather-alert-circle":
            return <FiAlertCircle />
        case "feather-layout":
            return <FiLayout />
        case "feather-send":
            return <FiSend />
        case "feather-grid":
            return <FiGrid />
        case "feather-youtube":
            return <FiYoutube />
        case "feather-copy":
            return <FiCopy />
        case "feather-edit":
            return <FiEdit />
        case "feather-pause":
            return <FiPause />
        case "feather-star":
            return <FiStar />
        case "feather-delete":
            return <FiDelete />
        case "feather-trash-2":
            return <FiTrash2 />
        case "feather-git-commit":
            return <FiGitCommit />
        case "feather-airplay":
            return <FiAirplay />
        case "feather-clock":
            return <FiClock />
        case "feather-crosshair":
            return <FiCrosshair />
        case "feather-life-buoy":
            return <FiLifeBuoy />
        case "feather-git-branch":
            return <FiGitBranch />
        case "feather-help-circle":
            return <FiHelpCircle />
        case "feather-archive":
            return <FiArchive />
        case "feather-award":
            return <FiAward />
        case "feather-bar-chart-2":
            return <FiBarChart2 />
        case "feather-shopping-bag":
            return <FiShoppingBag />
        case "feather-shopping-cart":
            return <FiShoppingCart />
        case "feather-figma":
            return <FiFigma />
        case "feather-gitlab":
            return <FiGitlab />
        case "feather-bluetooth":
            return <FiBluetooth />
        case "feather-file-text":
            return <FiFileText />
        case "feather-monitor":
            return <FiMonitor />
        case "feather-smartphone":
            return <FiSmartphone />
        case "feather-tablet":
            return <FiTablet />
        case "feather-layers":
            return <FiLayers />
        case "feather-list":
            return <FiList />
        case "feather-umbrella":
            return <FiUmbrella />
        case "feather-sliders":
            return <FiSliders />
        case "feather-framer":
            return <FiFramer />





        case "fa-chrome":
            return <FaChrome />
        case "fa-firefox-browser":
            return <FaFirefoxBrowser />
        case "fa-safari":
            return <FaSafari />
        case "fa-edge":
            return <FaEdge />
        case "fa-opera":
            return <FaOpera />
        case "fa-internet-explorer":
            return <FaInternetExplorer />
        case "fa-octopus-deploy":
            return <FaOctopusDeploy />
        case "fa-cc-visa":
            return <FaCcVisa />
        case "fa-cc-mastercard":
            return <FaCcMastercard />
        case "fa-cc-paypal":
            return <FaCcPaypal />
        case "fa-facebook":
            return <FaFacebook />
        case "fa-twitter":
            return <FaTwitter />
        case "fa-youtube":
            return <FaYoutube />
        case "fa-linkedin":
            return <FaLinkedin />
        case "fa-briefcase":
            return <FaBriefcase />
        case "fa-home":
            return <FaHouse />
        case "fa-users":
            return <FaUsers />
        case "fa-plane":
            return <FaPlane />
        case "fa-lock":
            return <FaLock />
        case "fa-umbrella-beach":
            return <FaUmbrellaBeach />
        case "fa-building":
            return <FaBuilding/>
        case "fa-birthday-cake":
            return <FaCakeCandles />



        case "bi-envelope":
            return <BsEnvelope />
        case "bi-envelope-plus":
            return <BsEnvelopePlus />
        case "bi-envelope-check":
            return <BsEnvelopeCheck />
        case "bi-envelope-open":
            return <BsEnvelopeOpen />
        case "bi-envelope-heart":
            return <BsEnvelopeHeart />
        case "bi-envelope-slash":
            return <BsEnvelopeSlash />


        default:
            break;
    }
}
export default getIcon