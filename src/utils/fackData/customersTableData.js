import { customerListStatusOptions, customerListTagsOptions } from "../options"

const tags = customerListTagsOptions
const status = customerListStatusOptions

export const customersTableData = [
    {
        "id": 1,
        "customer": {
            "name": "Amantha Keshan",
            "img": ""
        },
        "email": "amanthakeshandanujaya@gmail.com",
        "group": { tags, defaultSelect: [tags[5]] },
        "phone": "071 000 0000",
        "date": "2023-04-25, 03:42PM",
        "status": { status, defaultSelect: "active" }
    },
    {
        "id": 2,
        "customer": {
            "name": "Amantha Keshan",
            "img": ""
        },
        "email": "amanthakeshandanujaya@gmail.com",
        "group": { tags, defaultSelect: [tags[5]] },
        "phone": "071 000 0000",
        "date": "2023-04-06, 02:52PM",
        "status": { status, defaultSelect: "active" }
    },
    {
        "id": 3,
        "customer": {
            "name": "Amantha Keshan",
            "img": ""
        },
        "email": "amanthakeshandanujaya@gmail.com",
        "group": { tags, defaultSelect: [tags[5]] },
        "phone": "071 000 0000",
        "date": "2023-04-08, 08:34PM",
        "status": { status, defaultSelect: "active" }
    },
  
]