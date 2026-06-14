import type { LanguageType, RoleType } from "@/constants";

export interface IProfile {
  UserUniqueCode: string;
  UniqueCode: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  Designation: string;
  Hobbies: string[],
  Language: ILanguage[],
  Availability: string;
  Summary: string;
  AboutMe: string;
  ProfileImage: IMedia;
  CoverImage: IMedia;
  Address: IAddress;
  Slug: string;
  createdAt: string;
  updatedAt: string;
  Skills: ISkill[];
  Experiences: IExperience[];
  Services: IService[];
  Projects: IProject[];
  Contacts: IContact[];
}

export interface ILanguage {
  UniqueCode?: string;
  Name: string;
  Level: LanguageType
}

export interface IMedia {
  UniqueCode: string;
  OriginalUrl: string;
  ThumbnailUrl: string;
  PublicId: string;
  Alt: string;
  Caption: string;
  Width: number;
  Height: number;
  Size: number;
  SortOrder: number;
}

export interface IAddress {
  UniqueCode: string
  AddressLine1: string
  AddressLine2: string
  Country: ICountry
  State: IState
  City: ICity
  Pincode: string
}

export interface ICountry {
  Name: string;
  Code: string;
  PhoneCode: string;
  Flag: string;
  Currency: string;
}

export interface IState {
  Name: string;
  Code: string;
  CountryCode: string;
}

export interface ICity {
  Name: string;
  CountryCode: string;
  StateCode: string;
}
export interface ISkill {
  UniqueCode: string;
  ProfileUniqueCode: string;
  Title: string;
  Icon: string;
  Skills: ISubSkill[];
  SortOrder: string;
}

export interface ISubSkill {
  UniqueCode: string;
  Name: string;
  Percentage: number;
}

export interface IExperience {
  [key: string]: any;
}

export interface IService {
  [key: string]: any;
}

export interface IProject {
  [key: string]: any;
}

export interface IContact {
  [key: string]: any;
}

// export interface IProject {
//   ProjectCode: string;
//   Title: string;
//   Slug: string;
//   ShortDescription: string;
//   Description: string;
//   CoverImage: string;
//   WebsiteUrl: string;
//   GithubUrl: string;
//   IsFeatured: boolean;
// }

export interface IUser {
  FirstName: string;
  LastName: string;
  Email: string;
  Role: RoleType[];
  IsActive: boolean;
  IsEmailVerified: boolean;
  UniqueCode: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export type slugValidateRes = {Slug: string; Exists: boolean; IsAvailable: boolean;}

export interface ISigninRes {
  tokens: {
    accessToken: string;
    refreshToken: string;
  },
  user: {
    Name: string,
    Email: string,
    Role: string,
    UniqueCode: string
  }

}

// export interface IMeRes {
//   user
// }