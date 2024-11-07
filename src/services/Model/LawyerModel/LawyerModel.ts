export class LawyerModel{
    name: string;
    email: string;
    role: string;
    gender: string;
    urlAvatarProfile: string;
    uuid:string;
    valid: boolean;

    constructor(name: string, email:string, role:string, gender:string, urlAvatarProfile:string, uuid:string, valid:boolean){
        this.name  = name;
        this.email = email; 
        this.role  = role;
        this.uuid  = uuid; 
        this.urlAvatarProfile = urlAvatarProfile;
        this.gender = gender;
        this.valid  = valid;

    }
} 