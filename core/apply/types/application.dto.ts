import { ApplicationStatus } from "./apply.dto";

export interface UpdateApplicationStatusDto {
    applicationId: string;
    status: ApplicationStatus;
}
