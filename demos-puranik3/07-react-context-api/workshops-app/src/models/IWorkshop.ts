export type WorkshopCategory = "frontend" | "backend" | "mobile" | "devops" | "language" | "database";

export default interface IWorkshop {
    "name": string,
    "category": WorkshopCategory,
    "id": number,
    "description": string,
    "startDate": string,
    "endDate": string,
    "time": string,
    "location": {
        "address": string,
        "city": string,
        "state": string
    },
    "modes": {
        "inPerson": boolean,
        "online": boolean
    },
    "imageUrl": string
}