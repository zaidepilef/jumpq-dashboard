export type Roles = 'ROOT'|'ADMIN'|'SUSCRIPTOR'|'STAFF';

export interface User{
    username:string;
    email:string;
    password:string;
}

export interface UserResponse{

    status: string;
    message: string;
    jwt:string;
    user:any;

}