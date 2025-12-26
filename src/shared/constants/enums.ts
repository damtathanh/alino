/**
 * Enums and Constants
 * 
 * Centralized constants to replace magic strings throughout the app.
 * Provides type safety and prevents typos.
 */

/**
 * User Roles
 */
export enum Role {
    CREATOR = 'creator',
    BRAND = 'brand',
}

/**
 * Form Field Names
 * Used for validation and error handling
 */
export enum ProfileField {
    FULL_NAME = 'fullName',
    CITY = 'city',
    PHONE = 'phone',
    GENDER = 'gender',
    BIRTH_YEAR = 'birthYear',
    CREATOR_TYPE = 'creatorType',
    EXPERIENCE = 'experience',
    INCOME = 'income',
    GOALS = 'goals',
    PLATFORMS = 'platforms',
    CATEGORIES = 'categories',
    COMPANY_NAME = 'companyName',
    DOMAIN = 'domain',
    COMPANY_TYPE = 'companyType',
    TEAM_SIZE = 'teamSize',
    CONTACT_NAME = 'contactName',
    JOB_TITLE = 'jobTitle',
}

/**
 * Gender Options
 */
export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other',
}
