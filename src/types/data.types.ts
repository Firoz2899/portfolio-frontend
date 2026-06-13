import type { RoleType } from "@/constants";

export interface IProfile {
  UserUniqueCode: string;
  UniqueCode: string;
  FullName: string;
  Email: string;
  Slug: string;
  createdAt: string;
  updatedAt: string;
  Skills: ISkill[];
  Experiences: IExperience[];
  Services: IService[];
  Projects: IProject[];
  Contacts: IContact[];
}

export interface ISkill {
  [key: string]: any;
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