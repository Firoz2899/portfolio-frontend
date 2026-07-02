import type { EducationLevel, LanguageType, RoleType } from "@/constants";

export interface IProfile {
  UserUniqueCode: string;
  UniqueCode: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  Designation: string;
  Technologies: string[],
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
  Educations: IEducation[];
  Experiences: IExperience[];
  Teams: ITeam[];
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
  UniqueCode: string;
  AddressLine1: string;
  AddressLine2: string;
  Country: ICountry;
  State: IState;
  City: string;
  Pincode: string;
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

export interface IEducation {
  UniqueCode?: string;
  ProfileUniqueCode?: string;
  EducationLevel: EducationLevel;
  Institute: string;
  Degree: string;
  SpecializationOfStudy?: string;
  Description?: string;
  StartDate: string;
  EndDate?: string | null;
  Marks?: number | string;
  Grade?: number | string;
  Address?: IAddress;
  Achievements: string[]
}

export interface IExperience {
  UniqueCode?: string;
  ProfileUniqueCode?: string;
  Company: string;
  Position: string;
  Address?: IAddress;
  Phone?: string;
  Website?: string;
  StartDate?: string;
  EndDate?: string | null;
  Description?: string;
  Achievements: string[];
}

export interface ITeam {
  UniqueCode?: string;
  ProfileUniqueCode?: string;
  MemberName: string;
  Position: string;
  Image?: IMedia;
  Experience?: number;
  Bio?: string;
  Skills: string[];
  Social?: ITeamSocial;
}

export interface ITeamSocial {
  Facebook?: string;
  Twitter?: string;
  LinkedIn?: string;
  Instagram?: string;
  Github?: string;
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



export interface ITeamMembers {
    MemberName: string;
    Designation: string;
    ImageUrl: string;
    Experience: number;
    Bio: string;
    Skills: string[];
    Social: {
        Facebook: string;
        Twitter: string;
        LinkedIn: string;
        Instagram: string;
        Github: string;
    }
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

export interface ICreateSubSkillRes {
  SkillUniqueCode: string;
  SubSkill: ISubSkill;
}
