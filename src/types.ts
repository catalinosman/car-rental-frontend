// vehicle 
export interface Vehicle { 
    id : number | undefined,
    name : string | undefined,
    description : string | undefined, 
    price : number | undefined,
    imageURL : string | undefined,
};

export interface Category {
    id: number,
    name: string
};

export interface Review {
    vehicleId: number
    id: number,
    title: string,
    description: string
};

export interface User {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    createdOn: number
};

