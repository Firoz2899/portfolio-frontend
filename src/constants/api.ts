export const apiUrls = {
    auth: {
        login: "/api/v1/auth/login",
        signup: "/api/v1/auth/signup",
        verifyEmail: "/api/v1/auth/verify-email",
        resendOtp: "/api/v1/auth/resend-otp",
        forgotPassword: "/api/v1/auth/forgot-password",
        resetPassword: "/api/v1/auth/reset-password",
        refreshToken: "/api/v1/auth/refresh-token",
        me: "/api/v1/auth/me",
        logout: "/api/v1/auth/logout"
    },
    skills: {
        createSkill: "/api/v1/skills",
        updateSkill: "/api/v1/skills/:uniqueCode",
        createSubSkill: "/api/v1/skills/:uniqueCode/subskills",
        deleteSkill: "/api/v1/skills/:uniqueCode",
        getSkillByCode: "/api/v1/skills/details/:uniqueCode",
        profileSkills: "/api/v1/skills/profile-skills"
    },
    teamMembers: {
        createTeamMember: "/api/v1/team-members",
        updateTeamMember: "/api/v1/team-members/:uniqueCode",
        deleteTeamMember: "/api/v1/team-members/:uniqueCode",
        getTeamMemberByCode: "/api/v1/team-members/details/:uniqueCode",
        profileTeamMember: "/api/v1/team-members/profile-team-members"
    },
    educations: {
        createEducation: "/api/v1/educations",
        updateEducation: "/api/v1/educations/:uniqueCode",
        deleteEducation: "/api/v1/educations/:uniqueCode",
        getEducationByCode: "/api/v1/educations/details/:uniqueCode",
        profileEducation: "/api/v1/educations/profile-educations"
    },
    experiences: {
        createExperience: "/api/v1/experiences",
        updateExperience: "/api/v1/experiences/:uniqueCode",
        deleteExperience: "/api/v1/experiences/:uniqueCode",
        getExperienceByCode: "/api/v1/experiences/details/:uniqueCode",
        profileExperiences: "/api/v1/experiences/profile-experiences"
    },
    services: {
        createService: "/api/v1/services",
        updateService: "/api/v1/services/:uniqueCode",
        deleteService: "/api/v1/services/:uniqueCode",
        getServiceByCode: "/api/v1/services/details/:uniqueCode",
        profileServices: "/api/v1/services/profile-services"
    },
    projects: {
        createProjects: "/api/v1/projects",
        updateProjects: "/api/v1/projects/:projectCode",
        deleteProjects: "/api/v1/projects/:projectCode",
        getServiceByCode: "/api/v1/projects/details/:projectCode",
        profileProjects: "/api/v1/projects/profile-projects",
        getProjectBySlug: "/api/v1/projects/slug/:slug",
        uploadCoverImage: "/api/v1/projects/:projectCode/upload-cover",
        uploadProjectImages: "/api/v1/projects/:projectCode/upload-images",
        updateSlug: "/api/v1/projects/:projectCode/update-slug",
        replaceProjectImage: "/api/v1/projects/:projectCode/images/:imageCode/replace",
        deleteProjectImage: "/api/v1/projects/:projectCode/images/:imageCode"
    },
    slugs: {
        checkSlugAvailability: "/api/v1/slugs/validate",
        createReservedSlug: "/api/v1/slugs/createReservedSlug",
        updateReservedSlug: "/api/v1/slugs/:uniqueCode",
        deleteReservedSlug: "/api/v1/slugs/:uniqueCode",
        getReservedSlugs: "/api/v1/slugs",
        getReservedSlugByCode: "/api/v1/slugs/:uniqueCode"
    },
    profiles: {
        getProfileBySlug: "/api/v1/profiles/slug/:slug",
        getDefaultProfile: "/api/v1/profiles/default-profile",
        getProfile: "/api/v1/profiles",
        updateProfile: "/api/v1/profiles",
        updateProfileSlug: "/api/v1/profiles/slug/:slug",
        uploadProfileImage: "/api/v1/profiles/profile-image",
        deleteProfileImage: "/api/v1/profiles/profile-image",
        uploadCoverImage: "/api/v1/profiles/cover-image",
        deleteCoverImage: "/api/v1/profiles/cover-image",
        updateTechnologies: "/api/v1/profiles/update-technologies"
    },
    settings: {
        getSiteSettings: "/api/v1/settings",
        updateDefaultProfile: "/api/v1/settings/:profileCode",
        deleteDefaultProfile: "/api/v1/settings/:profileCode",
    },
    UniqueCodekeys: {
        unique: ":uniqueCode",
        projects: ":projectCode",
        slug: ":slug",
        image: ":imageCode",
        profile: ":profileCode"
    }
}  as const

export const ApiErrorTypes = {
  // Authentication
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  INVALID_TOKEN: "INVALID_TOKEN",
  TOKEN_EXPIRED: "TOKEN_EXPIRED",
  REFRESH_TOKEN_INVALID_OR_EXPIRED: "REFRESH_TOKEN_INVALID_OR_EXPIRED",
  UNAUTHORIZED: "UNAUTHORIZED",
  UNAUTHORIZED_OR_NOT_FOUND: "UNAUTHORIZED_OR_NOT_FOUND",
  NOT_FOUND: "NOT_FOUND",

  // Authorization
  ACCESS_DENIED: "ACCESS_DENIED",
  INSUFFICIENT_PERMISSIONS: "INSUFFICIENT_PERMISSIONS",

  // Validation
  VALIDATION_ERROR: "VALIDATION_ERROR",
  INVALID_INPUT: "INVALID_INPUT",
  REQUIRED_FIELD_MISSING: "REQUIRED_FIELD_MISSING",

  // User
  USER_NOT_FOUND: "USER_NOT_FOUND",
  USER_ALREADY_EXISTS: "USER_ALREADY_EXISTS",
  EMAIL_ALREADY_EXISTS: "EMAIL_ALREADY_EXISTS",
  PHONE_ALREADY_EXISTS: "PHONE_ALREADY_EXISTS",
  ACCOUNT_DISABLED: "ACCOUNT_DISABLED",
  ACCOUNT_LOCKED: "ACCOUNT_LOCKED",
  EMAIL_NOT_VERIFIED: "EMAIL_NOT_VERIFIED",

  // Resource
  RESOURCE_NOT_FOUND: "RESOURCE_NOT_FOUND",
  RESOURCE_ALREADY_EXISTS: "RESOURCE_ALREADY_EXISTS",

  // File
  FILE_NOT_FOUND: "FILE_NOT_FOUND",
  FILE_TOO_LARGE: "FILE_TOO_LARGE",
  INVALID_FILE_TYPE: "INVALID_FILE_TYPE",

  // Business Rules
  OPERATION_NOT_ALLOWED: "OPERATION_NOT_ALLOWED",
  BUSINESS_RULE_VIOLATION: "BUSINESS_RULE_VIOLATION",

  // Rate Limiting
  TOO_MANY_REQUESTS: "TOO_MANY_REQUESTS",

  // External Services
  EXTERNAL_SERVICE_ERROR: "EXTERNAL_SERVICE_ERROR",
  PAYMENT_FAILED: "PAYMENT_FAILED",
  EMAIL_SEND_FAILED: "EMAIL_SEND_FAILED",
  SMS_SEND_FAILED: "SMS_SEND_FAILED",

  // Server
  DATABASE_ERROR: "DATABASE_ERROR",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",

  // Generic
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
} as const