export interface VerifyEmailResponseDto {
    verified: boolean;
    message?: string;
    status?: "success" | "error" | "pending";
}

export interface VerifyCodeDto {
    code: string;
}
