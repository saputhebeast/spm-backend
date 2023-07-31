import { User } from '@prisma/client';
export declare class AuthDto {
    email: string;
    password: string;
    role: User['role'];
}
