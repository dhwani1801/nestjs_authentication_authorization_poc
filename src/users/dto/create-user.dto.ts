import { UserRole } from "../enum/roles.enum";
export class RegistrationDto {
    name: string;
    email: string;
    password: string;
    role: UserRole
}

export class LoginDto {
    email: string;
    password: string;
}
