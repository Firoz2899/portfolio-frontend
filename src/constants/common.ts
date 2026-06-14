export const localStorageKeys = {
    accessToken: "Access_Token",
    refreshToken: "Refresh_Token",
    userData: "User_Data",
    themeMode: "theme-mode"
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