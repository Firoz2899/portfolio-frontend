import type { ReservedSlugType } from "@/constants";
import type { IProfile } from "./data.types";

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

export type UpdateProfileForm = Pick<
  IProfile,
  | "FirstName"
  | "LastName"
  | "Email"
  | "Phone"
  | "Designation"
  | "Hobbies"
  | "Language"
  | "Availability"
  | "Summary"
  | "AboutMe"
  | "Address"
>;