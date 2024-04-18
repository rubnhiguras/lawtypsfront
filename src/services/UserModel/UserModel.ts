export class UserModel{
    name: string;
    email: string;
    role: string;
    uuid:string
    
    constructor(name: string, email:string, role:string, uuid:string){
        this.name = name;
        this.email= email; 
        this.role = role;
        this.uuid = uuid;
    }
} 