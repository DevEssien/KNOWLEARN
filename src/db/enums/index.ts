export enum OTPStatus {
    PENDING = 'pending',
    ACTIVE = 'active',
    EXPIRED = 'expired'
}

export enum QuestionType {
    MCQ = 'multiple-choice',
    BINARY = 'true/false',
    CONCISE = 'short answer'
}

export enum UserRole {
    ADMIN = 'administrator',
    INSTRUCTOR = 'instructor',
    STUDENT = 'student'
}

export enum CourseType {
    DOCUMENT = 'document',
    AUDIO = 'audio',
    VIDEO = 'video'
}