export class CreateUserDto { }
export class RegistrationDto {
    name: string;
    email: string;
    password: string;
}

export class LoginDto {
    email: string;
    password: string;
}
