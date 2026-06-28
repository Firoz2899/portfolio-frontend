export const localStorageKeys = {
    accessToken: "Access_Token",
    refreshToken: "Refresh_Token",
    userData: "User_Data",
    themeMode: "theme-mode",
    rememberMe: "remember-me",
} as const

export const Regex = {
    Email: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
    Password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
    Slug: /^[a-z0-9]+(?:-[a-z0-9]+)*$/
} as const

export const ReservedSlugTypes = {
    PROFILE: "PROFILE",
    PROJECT: "PROJECT"
} as const

export type ReservedSlugType = (typeof ReservedSlugTypes)[keyof typeof ReservedSlugTypes];

export const Roles = {
    SUPERADMIN: "SUPERADMIN",
    USER: "USER"
} as const

export type RoleType = typeof Roles[keyof typeof Roles];

export const LanguageLevel = {
    BASIC: "Basic",
    INTERMEDIATE: "Intermediate",
    NATIVE: "Native"
} as const

export type LanguageType = typeof LanguageLevel[keyof typeof LanguageLevel];

export const ROLE_HIERARCHY = {
    [Roles.USER]: [Roles.USER],
    [Roles.SUPERADMIN]: [
        Roles.USER,
        Roles.SUPERADMIN
    ],
};

export const educationLevels = [
    'High School',
    "Bachelor's Degree",
    "Master's Degree",
    "PhD",
    "Vocational Training",
    "Certificate Program"
] as const;

export type EducationLevel = typeof educationLevels[number];

export const DATE_FORMATS = {
  DATE: "dd/MM/yyyy",
  DATE_US: "MM/dd/yyyy",

  SHORT_DATE: "dd MMM yyyy",
  LONG_DATE: "dd MMMM yyyy",

  MONTH_YEAR: "MMM yyyy",
  MONTH_YEAR_FULL: "MMMM yyyy",

  YEAR_MONTH: "yyyy-MM",
  YEAR: "yyyy",

  TIME_12: "hh:mm a",
  TIME_24: "HH:mm",

  DATE_TIME: "dd/MM/yyyy hh:mm a",
  DATE_TIME_24: "dd/MM/yyyy HH:mm",

  ISO_DATE: "yyyy-MM-dd",
  ISO_DATE_TIME: "yyyy-MM-dd'T'HH:mm:ss",

  DAY_DATE: "EEEE, dd MMM yyyy",
  DAY_MONTH: "EEEE, dd MMMM",

  MONTH_DAY_YEAR: "MMM dd, yyyy",
  FULL: "EEEE, dd MMMM yyyy hh:mm a",
} as const;