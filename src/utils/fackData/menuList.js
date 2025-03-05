export const menuList = [
    {
        id: 0,
        name: "dashboards",
        path: "#",
        icon: 'feather-airplay',
        dropdownMenu: [
            {
                id: 1,
                name: "Admin Dashboard",
                path: "/",
                subdropdownMenu: false
            },
            // {
            //     id: 2,
            //     name: "Analytics",
            //     path: "/dashboards/analytics",
            //     subdropdownMenu: false
            // }
        ]
    },
    // {
    //     id: 1,
    //     name: "reports",
    //     path: "#",
    //     icon: 'feather-cast',
    //     dropdownMenu: [
    //         {
    //             id: 1,
    //             name: "Sales Report",
    //             path: "/reports/sales",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 2,
    //             name: "Leads Report",
    //             path: "/reports/leads",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 3,
    //             name: "Project Report",
    //             path: "/reports/project",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 4,
    //             name: "Timesheets Report",
    //             path: "/reports/timesheets",
    //             subdropdownMenu: false
    //         },

    //     ]
    // },
    // {
    //     id: 2,
    //     name: "applications",
    //     path: '#',
    //     icon: 'feather-send',
    //     dropdownMenu: [
    //         {
    //             id: 1,
    //             name: "Chat",
    //             path: "/applications/chat",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 2,
    //             name: "Email",
    //             path: "/applications/email",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 3,
    //             name: "Tasks",
    //             path: "/applications/tasks",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 4,
    //             name: "Notes",
    //             path: "/applications/notes",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 5,
    //             name: "Storage",
    //             path: "/applications/storage",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 6,
    //             name: "Calender",
    //             path: "/applications/calender",
    //             subdropdownMenu: false
    //         },
    //     ]
    // },
    // {
    //     id: 3,
    //     name: "proposal",
    //     path: "#",
    //     icon: 'feather-sign',
    //     dropdownMenu: [
    //         {
    //             id: 1,
    //             name: "Proposal",
    //             path: "/proposal/list",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 2,
    //             name: "Proposal View",
    //             path: "/proposal/view",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 3,
    //             name: "Proposal Edit",
    //             path: "/proposal/edit",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 4,
    //             name: "Proposal Create",
    //             path: "/proposal/create",
    //             subdropdownMenu: false
    //         },

    //     ],
    // },
    {
        id: 4,
        name: "Category",
        path: "#",
        icon: 'feather-alert-circle',
        dropdownMenu: [
            {
                id: 1,
                name: "Category",
                path: "/category/category-list",
                subdropdownMenu: false
            },
            // {
            //     id: 2,
            //     name: "Invoice View",
            //     path: "/payment/view",
            //     subdropdownMenu: false
            // },
            {
                id: 4,
                name: "Category Create",
                path: "/category/create-category",
                subdropdownMenu: false
            }
        ]
    },
    {
        id: 4,
        name: "Product",
        path: "#",
        icon: 'feather-shopping-cart',
        dropdownMenu: [
            {
                id: 1,
                name: "Product",
                path: "/product/product-list",
                subdropdownMenu: false
            },

            {
                id: 2,
                name: "Product Create",
                path: "/Product/create-product",
                subdropdownMenu: false
            }
        ]
    },

    {
        id: 5,
        name: "Bill",
        path: "#",
        icon: 'feather-file-text',
        dropdownMenu: [
     
            {
                id: 1,
                name: "Create Bill",
                path: "/customers/view",
                subdropdownMenu: false
            }
           
        ]
    },

    {
        id: 6,
        name: "Stock",
        path: "#",
        icon: 'feather-briefcase',
        dropdownMenu: [
            {
                id: 1,
                name: "Stocks",
                path: "/customers/list",
                subdropdownMenu: false
            }
        ]
    },
    {
        id: 7,
        name: "Customers",
        path: "#",
        icon: 'feather-users',
        dropdownMenu: [
          
            {
                id: 1,
                name: "Customer Create",
                path: "/customers/create",
                subdropdownMenu: false
            }
        ]
    },

    {
        id: 6,
        name: "Manual Invoice",
        path: "#",
        icon: 'feather-file-text',
        dropdownMenu: [
            // {
            //     id: 1,
            //     name: "Devices",
            //     path: "/device/device-list",
            //     subdropdownMenu: false
            // },
           
            {
                id: 1,
                name: "Invoice Create",
                path: "/device/create-device",
                subdropdownMenu: false
            }
        ]
    },

    {
        id: 7,
        name: "Boottle per Case",
        path: "#",
        icon: 'feather-briefcase',
        dropdownMenu: [
            {
                id: 1,
                name: "Boottle per Case assign",
                path: "/invoice/create",
                subdropdownMenu: false
            },
          
        ]
    },
    
    // {
    //     id: 6,
    //     name: "leads",
    //     path: "#",
    //     icon: 'feather-alert-circle',
    //     dropdownMenu: [
    //         {
    //             id: 1,
    //             name: "Leads",
    //             path: "/leads/list",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 2,
    //             name: "Leads View",
    //             path: "/leads/view",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 3,
    //             name: "Leads Create",
    //             path: "/leads/create",
    //             subdropdownMenu: false
    //         }
    //     ]
    // },
    // {
    //     id: 7,
    //     name: "projects",
    //     path: "#",
    //     icon: 'feather-briefcase',
    //     dropdownMenu: [
    //         {
    //             id: 1,
    //             name: "Projects",
    //             path: "/projects/list",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 2,
    //             name: "Projects View",
    //             path: "/projects/view",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 3,
    //             name: "Projects Create",
    //             path: "/projects/create",
    //             subdropdownMenu: false
    //         }
    //     ]
    // },
    // {
    //     id: 8,
    //     name: "widgets",
    //     path: "#",
    //     icon: 'feather-layout',
    //     dropdownMenu: [
    //         {
    //             id: 1,
    //             name: "Lists",
    //             path: "/widgets/lists",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 2,
    //             name: "Tables",
    //             path: "/widgets/tables",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 3,
    //             name: "Charts",
    //             path: "/widgets/charts",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 4,
    //             name: "Statistics",
    //             path: "/widgets/statistics",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 5,
    //             name: "Miscellaneous",
    //             path: "/widgets/miscellaneous",
    //             subdropdownMenu: false
    //         },
    //     ]
    // },
    // {
    //     id: 9,
    //     name: "settings",
    //     path: "#",
    //     icon: 'feather-settings',
    //     dropdownMenu: [
    //         {
    //             id: 1,
    //             name: "General Master",
    //             path: "#",
    //             subdropdownMenu: [
        
    //                 {
    //                     id: 1,
    //                     name: "Create Organization",
    //                     path: "/settings/create-organization",
    //                 },
    //                 {
    //                     id: 2,
    //                     name: "View Organization",
    //                     path: "/settings/organization-list",
    //                 },
    //             ]
    //         },
           
            // {
            //     id: 3,
            //     name: "Tags",
            //     path: "/settings/tags",
            //     subdropdownMenu: false
            // },
            // {
            //     id: 4,
            //     name: "Email",
            //     path: "/settings/email",
            //     subdropdownMenu: false
            // },
            // {
            //     id: 5,
            //     name: "Tasks",
            //     path: "/settings/tasks",
            //     subdropdownMenu: false
            // },
            // {
            //     id: 6,
            //     name: "Leads",
            //     path: "/settings/leads",
            //     subdropdownMenu: false
            // },
            // {
            //     id: 7,
            //     name: "Support",
            //     path: "/settings/Support",
            //     subdropdownMenu: false
            // },
            // {
            //     id: 8,
            //     name: "Finance",
            //     path: "/settings/finance",
            //     subdropdownMenu: false
            // },
            // {
            //     id: 9,
            //     name: "Gateways",
            //     path: "/settings/gateways",
            //     subdropdownMenu: false
            // },
            // {
            //     id: 10,
            //     name: "Customers",
            //     path: "/settings/customers",
            //     subdropdownMenu: false
            // },
            // {
            //     id: 11,
            //     name: "Localization",
            //     path: "/settings/localization",
            //     subdropdownMenu: false
            // },
            // {
            //     id: 12,
            //     name: "reCAPTCHA",
            //     path: "/settings/recaptcha",
            //     subdropdownMenu: false
            // },
            // {
            //     id: 13,
            //     name: "Miscellaneous",
            //     path: "/settings/miscellaneous",
            //     subdropdownMenu: false
            // },
    //     ]
    // },
    // {
    //     id: 10,
    //     name: "authentication",
    //     path: "#",
    //     icon: 'feather-power',
    //     dropdownMenu: [
    //         {
    //             id: 1,
    //             name: "login",
    //             path: "#",
    //             subdropdownMenu: [
    //                 // {
    //                 //     id: 1,
    //                 //     name: "Cover",
    //                 //     path: "/authentication/login/cover",
    //                 // },
    //                 // {
    //                 //     id: 2,
    //                 //     name: "Minimal",
    //                 //     path: "/authentication/login/minimal",
    //                 // },
    //                 {
    //                     id: 1,
    //                     name: "SignIn",
    //                     path: "/authentication/login/creative",
    //                 },
    //             ]
    //         },
            // {
            //     id: 2,
            //     name: "register",
            //     path: "#",
            //     subdropdownMenu: [
            //         // {
            //         //     id: 1,
            //         //     name: "Cover",
            //         //     path: "/authentication/register/cover",
            //         // },
            //         // {
            //         //     id: 2,
            //         //     name: "Minimal",
            //         //     path: "/authentication/register/minimal",
            //         // },
            //         {
            //             id: 1,
            //             name: "SignUp",
            //             path: "/authentication/register/creative",
            //         },
            //     ]
            // },
            // {
            //     id: 3,
            //     name: "Error 404",
            //     path: "#",
            //     subdropdownMenu: [
            //         {
            //             id: 1,
            //             name: "Cover",
            //             path: "/authentication/404/cover",
            //         },
            //         {
            //             id: 2,
            //             name: "Minimal",
            //             path: "/authentication/404/minimal",
            //         },
            //         {
            //             id: 3,
            //             name: "Creative",
            //             path: "/authentication/404/creative",
            //         },
            //     ]
            // },
            // {
            //     id: 4,
            //     name: "Reset Pass",
            //     path: "#",
            //     subdropdownMenu: [
            //         {
            //             id: 1,
            //             name: "Cover",
            //             path: "/authentication/reset/cover",
            //         },
            //         {
            //             id: 2,
            //             name: "Minimal",
            //             path: "/authentication/reset/minimal",
            //         },
            //         {
            //             id: 3,
            //             name: "Creative",
            //             path: "/authentication/reset/creative",
            //         },
            //     ]
            // },
            // {
            //     id: 5,
            //     name: "Verify OTP",
            //     path: "#",
            //     subdropdownMenu: [
            //         {
            //             id: 1,
            //             name: "Cover",
            //             path: "/authentication/verify/cover",
            //         },
            //         {
            //             id: 2,
            //             name: "Minimal",
            //             path: "/authentication/verify/minimal",
            //         },
            //         {
            //             id: 3,
            //             name: "Creative",
            //             path: "/authentication/verify/creative",
            //         },
            //     ]
            // },
            // {
            //     id: 6,
            //     name: "Maintenance",
            //     path: "#",
            //     subdropdownMenu: [
            //         {
            //             id: 1,
            //             name: "Cover",
            //             path: "/authentication/maintenance/cover",
            //         },
            //         {
            //             id: 2,
            //             name: "Minimal",
            //             path: "/authentication/maintenance/minimal",
            //         },
            //         {
            //             id: 3,
            //             name: "Creative",
            //             path: "/authentication/maintenance/creative",
            //         },
            //     ]
            // },
    //     ]
    // },
    // {
    //     id: 11,
    //     name: "Help Center",
    //     path: "#",
    //     icon: 'feather-life-buoy',
    //     dropdownMenu: [
    //         {
    //             id: 1,
    //             name: "Support",
    //             path: "https://themeforest.net/user/theme_ocean",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 2,
    //             name: "KnowledgeBase",
    //             path: "/help/knowledgebase",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 3,
    //             name: "Documentations",
    //             path: "/documentations",
    //             subdropdownMenu: false
    //         }
    //     ]
    // },
]
