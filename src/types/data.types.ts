export interface IProfile {
  ProfileCode: string;
  FullName: string;
  Designation: string;
  Summary: string;
  AboutMe: string;
  ProfileImage: string;
  CoverImage: string;
  ResumeUrl: string;
  Email: string;
  Phone: string;
  Location: string;
  LinkedIn: string;
  Github: string;
}

export interface IProject {
  ProjectCode: string;
  Title: string;
  Slug: string;
  ShortDescription: string;
  Description: string;
  CoverImage: string;
  WebsiteUrl: string;
  GithubUrl: string;
  IsFeatured: boolean;
}

export interface IUser {
  
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