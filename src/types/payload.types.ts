import type { ReservedSlugType } from "@/constants";

export interface ISignup {
    FirstName: string;
    LastName: string;
    Email: string;
    Password: string;
    ProfileSlug: string;
}

export interface ISlugValidate {
    Slug: string, 
    SlugType: ReservedSlugType
}

export interface ISignIn {
    Email: string;
    Password: string;
}

export interface IVerifyEmail {
    Email: string;
    OTP: string;
}