export enum School {
    EAST_LA_COLLEGE = "East LA College",
    LA_CITY_COLLEGE = "LA City College",
    LA_HARBOR_COLLEGE = "LA Harbor College",
    LA_MISSION_COLLEGE = "LA Mission College",
    LA_PIERCE_COLLEGE = "LA Pierce College",
    LA_SOUTHWEST_COLLEGE = "LA Southwest College",
    LA_TRADE_TECH_COLLEGE = "LA Trade-Tech College",
    LA_VALLEY_COLLEGE = "LA Valley College",
    WEST_LA_COLLEGE = "West LA College",
}

export enum Gender {
    MALE = "Male",
    FEMALE = "Female",
    NON_BINARY = "Non-Binary",
    OTHER = "Other",
    PREFER_NOT_TO_SAY = "Prefer not to say",
}

export enum TShirtSize {
    XS = "XS",
    S = "S",
    M = "M",
    L = "L",
    XL = "XL",
    XXL = "XXL",
    XXXL = "XXXL",
}

export enum FieldOfStudy {
    COMPUTER_SCIENCE = "Computer Science",
    COMPUTER_ENGINEERING = "Computer Engineering",
    ELECTRICAL_ENGINEERING = "Electrical Engineering",
    MECHANICAL_ENGINEERING = "Mechanical Engineering",
    CIVIL_ENGINEERING = "Civil Engineering",
    DATA_SCIENCE = "Data Science",
    INFORMATION_TECHNOLOGY = "Information Technology",
    CYBERSECURITY = "Cybersecurity",
    MATHEMATICS = "Mathematics",
    PHYSICS = "Physics",
    BIOLOGY = "Biology",
    CHEMISTRY = "Chemistry",
    BUSINESS = "Business",
    MARKETING = "Marketing",
    FINANCE = "Finance",
    DESIGN = "Design",
    OTHER = "Other",
}

export enum SkillLevel {
    BEGINNER = "Beginner",
    INTERMEDIATE = "Intermediate",
    ADVANCED = "Advanced",
    EXPERT = "Expert",
}

export interface ApplicationDto {
    // Required fields
    firstName: string;
    lastName: string;
    email: string;
    studentNumber: string;
    school: School;
    age: string;
    country: string;
    linkedInUrl: string;
    isMesaStudent: boolean;
    gender: Gender;
    tShirtSize: TShirtSize;
    fieldOfStudy: FieldOfStudy;
    firstTime: boolean;
    skillLevel: SkillLevel;
    primarySkills: string[];
    mlhCodeOfConduct: boolean;
    mlhPrivacyPolicy: boolean;
    mlhEmailSubscription: boolean;
    levelOfStudy: string;

    // Optional fields
    phoneNumber?: string;
    dietaryRestrictions?: string[];
    otherSkill?: string[];
    whyAttend?: string;
    resume?: File;
    mesaSubscription?: boolean;
    needsParkingPermit?: boolean;
    updated_at?: string;
}

/**
 * Interface for HackMESA application response
 */
export interface ApplicationResponseDto {
    id: string;
    userId: string;
    created_at: string;
    updated_at: string;
    status: ApplicationStatus;
    resumeUrl?: string;
    resumeFileName?: string;
}

/**
 * Enumeration of application statuses
 */
export enum ApplicationStatus {
    SAVED = "SAVED",
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    WAITLISTED = "WAITLISTED",
}

export interface ApplicationSummaryDto {
    id: string;
    firstName: string;
    lastName: string;
    school: School;
    status: ApplicationStatus;
}

export interface ApplicationsPageDto {
    applications: ApplicationSummaryDto[];
    total: number;
    page: number;
    limit: number;
}
