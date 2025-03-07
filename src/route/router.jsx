import { createBrowserRouter, Navigate} from "react-router-dom";
import RootLayout from "../layout/root";
import Home from "../pages/home";
import Analytics from "../pages/analytics";
import ReportsSales from "../pages/reports-sales";
import ReportsLeads from "../pages/reports-leads";
import ReportsProject from "../pages/reports-project";
import AppsChat from "../pages/apps-chat";
import LayoutApplications from "../layout/layoutApplications";
import AppsEmail from "../pages/apps-email";
import ReportsTimesheets from "../pages/reports-timesheets";
import LoginCover from "../pages/login-cover";
import AppsTasks from "../pages/apps-tasks";
import AppsNotes from "../pages/apps-notes";
import AppsCalender from "../pages/apps-calender";
import AppsStorage from "../pages/apps-storage";
import Proposalist from "../pages/proposal-list";
import CustomersList from "../pages/customers-list";
import ProposalView from "../pages/proposal-view";
import ProposalEdit from "../pages/proposal-edit";
import LeadsList from "../pages/leadsList";
import CustomersView from "../pages/customers-view";
import CustomersCreate from "../pages/customers-create";
import ProposalCreate from "../pages/proposal-create";
import LeadsView from "../pages/leads-view";
import LeadsCreate from "../pages/leads-create";
import PaymentList from "../pages/payment-list";
import CategoryList from "../pages/category-list";
import CategoryCreate from "../pages/category-create";
import OrganizationCreate from "../pages/organization-create";
import ProductCreate from "../pages/product-create";
import ProductList from "../pages/product-list";
import OrganizationList from "../pages/organization-list";
import LoadingSheet from "../pages/LoadingList";
import UnLoadingSheet from "../pages/unLoadingList";

import PaymentView from "../pages/payment-view";
import PaymentCreate from "../pages/payment-create";
import ProjectsList from "../pages/projects-list";
import ProjectsView from "../pages/projects-view";
import ProjectsCreate from "../pages/projects-create";
import SettingsGaneral from "../pages/settings-ganeral";
import LayoutSetting from "../layout/layoutSetting";
import SettingsSeo from "../pages/settings-seo";
import SettingsTags from "../pages/settings-tags";
import SettingsEmail from "../pages/settings-email";
import SettingsTasks from "../pages/settings-tasks";
import SettingsLeads from "../pages/settings-leads";
import SettingsMiscellaneous from "../pages/settings-miscellaneous";
import SettingsRecaptcha from "../pages/settings-recaptcha";
import SettingsLocalization from "../pages/settings-localization";
import SettingsCustomers from "../pages/settings-customers";
import SettingsGateways from "../pages/settings-gateways";
import SettingsFinance from "../pages/settings-finance";
import SettingsSupport from "../pages/settings-support";
import LayoutAuth from "../layout/layoutAuth";
import LoginMinimal from "../pages/login-minimal";
import LoginCreative from "../pages/login-creative";
import RegisterCover from "../pages/register-cover";
import RegisterMinimal from "../pages/register-minimal";
import RegisterCreative from "../pages/register-creative";
import ResetCover from "../pages/reset-cover";
import ResetMinimal from "../pages/reset-minimal";
import ResetCreative from "../pages/reset-creative";
import ErrorCover from "../pages/error-cover";
import ErrorCreative from "../pages/error-creative";
import ErrorMinimal from "../pages/error-minimal";
import OtpCover from "../pages/otp-cover";
import OtpMinimal from "../pages/otp-minimal";
import OtpCreative from "../pages/otp-creative";
import MaintenanceCover from "../pages/maintenance-cover";
import MaintenanceMinimal from "../pages/maintenance-minimal";
import MaintenanceCreative from "../pages/maintenance-creative";
import HelpKnowledgebase from "../pages/help-knowledgebase";
import WidgetsLists from "../pages/widgets-lists";
import WidgetsTables from "../pages/widgets-tables";
import WidgetsCharts from "../pages/widgets-charts";
import WidgetsStatistics from "../pages/widgets-statistics";
import WidgetsMiscellaneous from "../pages/widgets-miscellaneous";
import DeviceList from "../pages/device-list";
import DevicesCreate from "../pages/device-create";
import OrganizationChoose from "@/components/organization/SelectOrganization";
import NewInvoiceCreate from "../pages/invoice-create";
import InvoiceList from "../pages/invoice-list";

// ProtectedRoute Component
const ProtectedRoute = ({ children }) => {
    const accessToken = localStorage.getItem('accessToken'); // Check for access token
    if (!accessToken) {
        // Redirect to login if no token is found
        return <Navigate to="/authentication/login/creative" replace />;
    }
    // Render the children components if authenticated
    return children;
};

// Routes Configuration
export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <RootLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/payment/list",
                element: <PaymentList />,
            },
            {
                path: "/category/category-list",
                element: <CategoryList />,
            },
            {
                path: "/category/create-category",
                element: <CategoryCreate />,
            },
  
            // 
            {
                path: "/device/device-list",
                element: <DeviceList />,
            },
            {
                path: "/device/create-device",
                element: <DevicesCreate />,
            },
            //

            {
                path: "/product/create-product",
                element: <ProductCreate />,
            },
            {
                path: "/product/product-list",
                element: <ProductList />,
            },
            {
                path: "/settings/create-organization",
                element: <OrganizationCreate />,
            },
            {
                path: "/settings/organization-list",
                element: <OrganizationList />,
            },
            {
                path: "/invoice/view/:id",
                element: <PaymentView />, // One Invoice view //////////////////////
            },
            {
                path: "/invoice/create",
                element: <NewInvoiceCreate />, // Invoice create //////////////////////
            }, 
            {
                path: "/invoice/list",
                element: <InvoiceList />, // Invoice list //////////////////////
            }, 
            {
                path: "/customers/list",
                element: <CustomersList />,
            },
            {
                path: "/customers/view",
                element: <CustomersView />,
            },
            {
                path: "/loadingsheet/loadingList",
                element: <LoadingSheet />,
            },
            {
                path: "/loadingsheet/unloadingList",
                element: <UnLoadingSheet />,
            },
            {
                path: "/customers/create",
                element: <CustomersCreate />,
            },
        ],
    },
    {
        path: "/authentication",
        element: <LayoutAuth />,
        children: [
            {
                path: "login/creative",
                element: <LoginCreative />, 
            },
            {
                path: "register/creative",
                element: <RegisterCreative />,
            },
        ],
    },
    //
    {
        path: "/organization/organization-list",
        element: <OrganizationChoose />,
    },
    //

]);
