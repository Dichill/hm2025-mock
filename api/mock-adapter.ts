import {
    AxiosAdapter,
    AxiosHeaders,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";
import {
    ApplicationDto,
    ApplicationResponseDto,
    ApplicationStatus,
    ApplicationSummaryDto,
    ApplicationsPageDto,
    FieldOfStudy,
    Gender,
    School,
    SkillLevel,
    TShirtSize,
} from "@/core/apply/types/apply.dto";
import { UserDataResponse } from "@/core/user/types/user.dto";
import {
    EventRegistrationDto,
    EventResponseDto,
} from "@/core/user/types/event.dto";
import {
    NotifyNonApplicantsResponse,
    StudentData,
    UserCheckinStatusDto,
} from "@/core/user/types/admin.dto";
import {
    ProfileResponseDto,
    QrCodeResponseDto,
    UserProfileDto,
} from "@/core/user/types/profile.dto";
import { Setting } from "@/core/grace/types/settings.dto";
import { Team, TeamMemberPublic, TeamWithMembers } from "@/core/grace/types/team.dto";
import { CreateProjectDto, Project } from "@/core/grace/types/project.dto";
import {
    AwardCategory,
    AwardScore,
    AwardWinner,
    RoundResult,
    Score,
    ScoredProject,
    SubmitAwardScoreRequest,
    SubmitScoreRequest,
    TopProject,
    TrackWinner,
} from "@/core/grace/types/judge.dto";

type ServiceName = "application" | "user" | "grace" | "kickpost";

interface MockApplicationDetail extends ApplicationDto {
    id: string;
    userId: string;
    created_at: string;
    updated_at: string;
    status: ApplicationStatus;
    resumeUrl?: string;
    resumeFileName?: string;
}

const mockNow = (): string => new Date().toISOString();
const mockUuid = (prefix: string): string =>
    `${prefix}-${Math.random().toString(36).slice(2, 10)}`;

const mockUserData: UserDataResponse = {
    userId: "demo-user-1",
    email: "demo.hacker@hackmesa.org",
    roles: ["HACKER"],
    emailConfirmed: true,
    profile: {
        id: "profile-1",
        user_id: "demo-user-1",
        display_name: "Demo Hacker",
        first_name: "Demo",
        last_name: "Hacker",
        created_at: "2025-09-01T00:00:00.000Z",
        updated_at: "2025-09-01T00:00:00.000Z",
    },
};

let mockProfile: UserProfileDto = {
    id: "profile-1",
    user_id: "demo-user-1",
    full_name: "Demo Hacker",
    school: "LA City College",
    major: "Computer Science",
    year: "2nd Year",
    t_shirt_size: "M",
    dietary_restrictions: "None",
    linkedin_url: "https://linkedin.com/in/demo-hacker",
};

let mockApplications: MockApplicationDetail[] = [
    {
        id: "app-1",
        userId: "demo-user-1",
        firstName: "Demo",
        lastName: "Hacker",
        email: "demo.hacker@hackmesa.org",
        studentNumber: "900123456",
        school: School.LA_CITY_COLLEGE,
        age: "20",
        country: "USA",
        linkedInUrl: "https://linkedin.com/in/demo-hacker",
        isMesaStudent: true,
        gender: Gender.PREFER_NOT_TO_SAY,
        tShirtSize: TShirtSize.M,
        fieldOfStudy: FieldOfStudy.COMPUTER_SCIENCE,
        firstTime: false,
        skillLevel: SkillLevel.INTERMEDIATE,
        primarySkills: ["React", "Node.js", "Python"],
        mlhCodeOfConduct: true,
        mlhPrivacyPolicy: true,
        mlhEmailSubscription: true,
        levelOfStudy: "Undergraduate",
        phoneNumber: "555-0198",
        dietaryRestrictions: ["Vegetarian"],
        whyAttend:
            "I want to build with my team, connect with mentors, and compete in sponsor challenges.",
        mesaSubscription: true,
        needsParkingPermit: false,
        created_at: "2025-09-15T09:00:00.000Z",
        updated_at: "2025-10-01T18:30:00.000Z",
        status: ApplicationStatus.APPROVED,
        resumeFileName: "demo_hacker_resume.pdf",
        resumeUrl: "https://example.com/mock/demo_hacker_resume.pdf",
    },
    {
        id: "app-2",
        userId: "student-2",
        firstName: "Alex",
        lastName: "Rivera",
        email: "alex.rivera@laccd.edu",
        studentNumber: "900654321",
        school: School.EAST_LA_COLLEGE,
        age: "19",
        country: "USA",
        linkedInUrl: "https://linkedin.com/in/alex-rivera",
        isMesaStudent: true,
        gender: Gender.FEMALE,
        tShirtSize: TShirtSize.S,
        fieldOfStudy: FieldOfStudy.DATA_SCIENCE,
        firstTime: true,
        skillLevel: SkillLevel.BEGINNER,
        primarySkills: ["Python", "Pandas"],
        mlhCodeOfConduct: true,
        mlhPrivacyPolicy: true,
        mlhEmailSubscription: false,
        levelOfStudy: "Undergraduate",
        created_at: "2025-09-20T09:00:00.000Z",
        updated_at: "2025-09-22T11:15:00.000Z",
        status: ApplicationStatus.PENDING,
    },
];

let mockEvents: EventResponseDto[] = [
    {
        id: "event-1",
        title: "Welcome Mixer",
        description: "Meet teammates, mentors, and organizers before kickoff.",
        start_time: new Date("2025-11-08T17:00:00.000Z"),
        end_time: new Date("2025-11-08T19:00:00.000Z"),
        location: "Engineering Hall",
        event_type: "Networking",
        thumbnail_url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
        created_at: new Date("2025-10-01T00:00:00.000Z"),
        updated_at: new Date("2025-10-01T00:00:00.000Z"),
    },
    {
        id: "event-2",
        title: "AI Workshop",
        description: "Hands-on session on building ML-powered prototypes quickly.",
        start_time: new Date("2025-11-09T10:00:00.000Z"),
        end_time: new Date("2025-11-09T11:30:00.000Z"),
        location: "Lab B",
        event_type: "Workshop",
        created_at: new Date("2025-10-01T00:00:00.000Z"),
        updated_at: new Date("2025-10-01T00:00:00.000Z"),
    },
];

let mockRegisteredEventIds: string[] = ["event-1"];

let mockSettings: Setting[] = [
    {
        id: "setting-1",
        name: "hackathon_started",
        value: { enabled: true },
        description: "Controls hackathon active state",
        created_at: "2025-10-01T00:00:00.000Z",
        updated_at: "2025-10-01T00:00:00.000Z",
    },
    {
        id: "setting-2",
        name: "submissions_enabled",
        value: { enabled: true },
        description: "Controls project submissions",
        created_at: "2025-10-01T00:00:00.000Z",
        updated_at: "2025-10-01T00:00:00.000Z",
    },
    {
        id: "setting-3",
        name: "team_formation_enabled",
        value: { enabled: true },
        description: "Controls team formation",
        created_at: "2025-10-01T00:00:00.000Z",
        updated_at: "2025-10-01T00:00:00.000Z",
    },
    {
        id: "setting-4",
        name: "main_judging_enabled",
        value: { enabled: true },
        description: "Main judging toggle",
        created_at: "2025-10-01T00:00:00.000Z",
        updated_at: "2025-10-01T00:00:00.000Z",
    },
    {
        id: "setting-5",
        name: "round2_judging_enabled",
        value: { enabled: false },
        description: "Round 2 judging toggle",
        created_at: "2025-10-01T00:00:00.000Z",
        updated_at: "2025-10-01T00:00:00.000Z",
    },
];

let mockTeams: TeamWithMembers[] = [
    {
        id: "team-1",
        name: "Byte Builders",
        code: "TEAM2025",
        created_at: "2025-10-15T14:30:00.000Z",
        members: [
            {
                id: "member-1",
                team_id: "team-1",
                full_name: "Demo Hacker",
                role: "Creator",
                created_at: "2025-10-15T14:30:00.000Z",
            },
            {
                id: "member-2",
                team_id: "team-1",
                full_name: "Alex Rivera",
                role: "Member",
                created_at: "2025-10-15T14:31:00.000Z",
            },
        ],
    },
];

let mockCurrentTeamId: string | null = "team-1";

let mockProjects: Project[] = [
    {
        id: "project-1",
        team_id: "team-1",
        name: "PulsePath",
        table_number: "A12",
        devpost_url: "https://devpost.com/software/pulsepath",
        awards_opt_in: ["Best AI/ML Project", "Best Community Impact"],
        track: "AI for Good",
        sponsor_opt_in: ["WSS", "LACCD"],
        created_by: "demo-user-1",
        created_at: "2025-11-09T03:00:00.000Z",
    },
];

let mockScores: Score[] = [];
let mockAwardScores: AwardScore[] = [];

const mockAwardCategories: AwardCategory[] = [
    {
        id: "award-1",
        name: "Best AI/ML Project",
        description: "Outstanding use of machine learning.",
        created_at: "2025-10-01T00:00:00.000Z",
    },
    {
        id: "award-2",
        name: "Best Community Impact",
        description: "Meaningful social impact and accessibility.",
        created_at: "2025-10-01T00:00:00.000Z",
    },
];

const parseBody = <T>(data: unknown): T => {
    if (typeof data === "string") {
        return JSON.parse(data) as T;
    }
    return data as T;
};

const toSummary = (application: MockApplicationDetail): ApplicationSummaryDto => ({
    id: application.id,
    firstName: application.firstName,
    lastName: application.lastName,
    school: application.school,
    status: application.status,
    gender: application.gender,
    fieldOfStudy: application.fieldOfStudy,
    skillLevel: application.skillLevel,
    isMesaStudent: application.isMesaStudent,
    age: application.age,
    firstTime: application.firstTime,
    updated_at: application.updated_at,
});

const ok = <T>(
    config: InternalAxiosRequestConfig,
    data: T,
    status = 200
): AxiosResponse<T> => ({
    data,
    status,
    statusText: "OK",
    headers: new AxiosHeaders(),
    config,
});

const getPath = (url: string | undefined): string => (url ?? "/").split("?")[0];

const getParams = (config: AxiosRequestConfig): URLSearchParams =>
    new URLSearchParams((config.params as Record<string, string>) ?? {});

const handleApplication = (
    config: InternalAxiosRequestConfig
): AxiosResponse<unknown> => {
    const method = (config.method ?? "get").toLowerCase();
    const path = getPath(config.url);
    const params = getParams(config);

    if (method === "get" && path === "/applications/me") {
        const mine = mockApplications.find(
            (application) => application.userId === mockUserData.userId
        );
        const response: ApplicationResponseDto | null = mine
            ? {
                  id: mine.id,
                  userId: mine.userId,
                  created_at: mine.created_at,
                  updated_at: mine.updated_at,
                  status: mine.status,
                  resumeUrl: mine.resumeUrl,
                  resumeFileName: mine.resumeFileName,
              }
            : null;
        return ok(config, response);
    }

    if (method === "post" && path === "/applications/unregister") {
        const mine = mockApplications.find(
            (application) => application.userId === mockUserData.userId
        );
        if (mine) {
            mine.status = ApplicationStatus.REJECTED;
            mine.updated_at = mockNow();
        }
        return ok(config, { message: "You have been unregistered." });
    }

    if (method === "get" && path === "/applications") {
        const page = Number(params.get("page") ?? 1);
        const limit = Number(params.get("limit") ?? 10);
        const status = params.get("status");
        const school = params.get("school");
        const search = params.get("search")?.toLowerCase();

        let filtered = [...mockApplications];
        if (status) {
            filtered = filtered.filter((application) => application.status === status);
        }
        if (school) {
            filtered = filtered.filter((application) => application.school === school);
        }
        if (search) {
            filtered = filtered.filter((application) =>
                `${application.firstName} ${application.lastName}`
                    .toLowerCase()
                    .includes(search)
            );
        }

        const offset = (page - 1) * limit;
        const result: ApplicationsPageDto = {
            applications: filtered.slice(offset, offset + limit).map(toSummary),
            total: filtered.length,
            page,
            limit,
        };
        return ok(config, result);
    }

    if (method === "get" && path === "/applications/search") {
        const page = Number(params.get("page") ?? 1);
        const limit = Number(params.get("limit") ?? 10);
        const q = (params.get("q") ?? "").toLowerCase();
        const filtered = mockApplications.filter((application) =>
            `${application.firstName} ${application.lastName} ${application.email} ${application.studentNumber}`
                .toLowerCase()
                .includes(q)
        );
        const offset = (page - 1) * limit;
        const result: ApplicationsPageDto = {
            applications: filtered.slice(offset, offset + limit).map(toSummary),
            total: filtered.length,
            page,
            limit,
        };
        return ok(config, result);
    }

    if (method === "get" && path.startsWith("/applications/")) {
        const id = path.replace("/applications/", "");
        const application = mockApplications.find((item) => item.id === id);
        if (!application) {
            return ok(config, null, 404);
        }
        return ok(config, application);
    }

    if (method === "post" && (path === "/applications" || path === "/applications/submit")) {
        const created: MockApplicationDetail = {
            ...mockApplications[0],
            id: mockUuid("app"),
            userId: mockUserData.userId,
            status: ApplicationStatus.PENDING,
            created_at: mockNow(),
            updated_at: mockNow(),
        };
        mockApplications = [created, ...mockApplications.filter((item) => item.userId !== mockUserData.userId)];
        const response: ApplicationResponseDto = {
            id: created.id,
            userId: created.userId,
            status: created.status,
            created_at: created.created_at,
            updated_at: created.updated_at,
            resumeUrl: created.resumeUrl,
            resumeFileName: created.resumeFileName,
        };
        return ok(config, response);
    }

    if (method === "post" && path === "/applications/save") {
        const created: MockApplicationDetail = {
            ...mockApplications[0],
            id: mockUuid("app"),
            userId: mockUserData.userId,
            status: ApplicationStatus.SAVED,
            created_at: mockNow(),
            updated_at: mockNow(),
        };
        mockApplications = [created, ...mockApplications.filter((item) => item.userId !== mockUserData.userId)];
        const response: ApplicationResponseDto = {
            id: created.id,
            userId: created.userId,
            status: created.status,
            created_at: created.created_at,
            updated_at: created.updated_at,
        };
        return ok(config, response);
    }

    if (method === "patch" && path.startsWith("/applications/")) {
        const id = path.replace("/applications/", "");
        const application = mockApplications.find((item) => item.id === id);
        if (!application) {
            return ok(config, null, 404);
        }
        application.updated_at = mockNow();
        const response: ApplicationResponseDto = {
            id: application.id,
            userId: application.userId,
            created_at: application.created_at,
            updated_at: application.updated_at,
            status: application.status,
        };
        return ok(config, response);
    }

    if (method === "post" && path === "/admin/applications/status") {
        const body = parseBody<{ applicationId: string; status: ApplicationStatus }>(
            config.data
        );
        const application = mockApplications.find(
            (item) => item.id === body.applicationId
        );
        if (!application) {
            return ok(config, null, 404);
        }
        application.status = body.status;
        application.updated_at = mockNow();
        const response: ApplicationResponseDto = {
            id: application.id,
            userId: application.userId,
            created_at: application.created_at,
            updated_at: application.updated_at,
            status: application.status,
        };
        return ok(config, response);
    }

    return ok(config, {});
};

const handleUser = (config: InternalAxiosRequestConfig): AxiosResponse<unknown> => {
    const method = (config.method ?? "get").toLowerCase();
    const path = getPath(config.url);

    if (method === "post" && path === "/auth/register") {
        return ok(config, { message: "Demo registration complete.", token: "demo-token" });
    }
    if (method === "post" && path === "/auth/verify") {
        return ok(config, { verified: true });
    }
    if (method === "post" && path === "/auth/resend-verification") {
        return ok(config, { success: true, message: "Verification code sent." });
    }
    if (method === "get" && path === "/auth/data") {
        return ok(config, mockUserData);
    }
    if (method === "get" && path === "/auth/stats") {
        return ok(config, {
            totalUsers: 342,
            totalApplications: mockApplications.length,
            lastUpdated: mockNow(),
        });
    }

    if (method === "get" && path === "/profile/me") {
        return ok(config, mockProfile);
    }
    if (method === "patch" && path === "/profile") {
        const update = parseBody<Partial<UserProfileDto>>(config.data);
        mockProfile = { ...mockProfile, ...update };
        const response: ProfileResponseDto = {
            success: true,
            message: "Profile updated successfully.",
            profile: mockProfile,
        };
        return ok(config, response);
    }
    if (method === "delete" && path === "/profile") {
        const response: ProfileResponseDto = {
            success: true,
            message: "Profile deleted in demo mode.",
        };
        return ok(config, response);
    }
    if (method === "get" && path.startsWith("/profile/") && !path.endsWith("/qr-code")) {
        return ok(config, mockProfile);
    }
    if (method === "delete" && path.startsWith("/profile/")) {
        const response: ProfileResponseDto = {
            success: true,
            message: "User profile deleted in demo mode.",
        };
        return ok(config, response);
    }
    if (method === "get" && path.endsWith("/qr-code")) {
        const response: QrCodeResponseDto = {
            signedUrl: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=demo-user-1",
        };
        return ok(config, response);
    }

    if (method === "get" && path === "/admin/students") {
        const students: StudentData[] = mockApplications.map((application) => ({
            id: application.userId,
            display_name: `${application.firstName} ${application.lastName}`,
            email: application.email,
        }));
        return ok(config, students);
    }
    if (method === "post" && path === "/admin/notify-non-applicants") {
        const response: NotifyNonApplicantsResponse = {
            success: true,
            notifiedCount: 12,
            failedCount: 0,
        };
        return ok(config, response);
    }
    if (method === "get" && path === "/events") {
        return ok(config, mockEvents);
    }
    if (method === "get" && path.startsWith("/events/") && path.endsWith("/registered")) {
        const id = path.replace("/events/", "").replace("/registered", "");
        return ok(config, { registered: mockRegisteredEventIds.includes(id) });
    }
    if (method === "get" && path === "/events/my/registered") {
        return ok(
            config,
            mockEvents.filter((event) => mockRegisteredEventIds.includes(event.id))
        );
    }
    if (method === "get" && path.startsWith("/events/")) {
        const id = path.replace("/events/", "");
        const event = mockEvents.find((item) => item.id === id);
        return ok(config, event ?? null, event ? 200 : 404);
    }
    if (method === "post" && path === "/events/register") {
        const payload = parseBody<EventRegistrationDto>(config.data);
        if (!mockRegisteredEventIds.includes(payload.eventId)) {
            mockRegisteredEventIds = [...mockRegisteredEventIds, payload.eventId];
        }
        return ok(config, {});
    }
    if (method === "delete" && path === "/events/unregister") {
        const payload = parseBody<EventRegistrationDto>(config.data);
        mockRegisteredEventIds = mockRegisteredEventIds.filter(
            (id) => id !== payload.eventId
        );
        return ok(config, {});
    }

    if (method === "post" && path === "/admin/events") {
        const payload = parseBody<Partial<EventResponseDto>>(config.data);
        const event: EventResponseDto = {
            id: mockUuid("event"),
            title: payload.title ?? "New Demo Event",
            description: payload.description ?? "Demo event description",
            start_time: payload.start_time
                ? new Date(payload.start_time)
                : new Date(),
            end_time: payload.end_time
                ? new Date(payload.end_time)
                : new Date(Date.now() + 60 * 60 * 1000),
            location: payload.location ?? "Demo Hall",
            event_type: payload.event_type ?? "Workshop",
            thumbnail_url: payload.thumbnail_url,
            created_at: new Date(),
            updated_at: new Date(),
        };
        mockEvents = [event, ...mockEvents];
        return ok(config, event);
    }
    if (method === "patch" && path.startsWith("/admin/events/")) {
        const id = path.replace("/admin/events/", "");
        const payload = parseBody<Partial<EventResponseDto>>(config.data);
        mockEvents = mockEvents.map((event) =>
            event.id === id
                ? {
                      ...event,
                      ...payload,
                      updated_at: new Date(),
                  }
                : event
        );
        const event = mockEvents.find((item) => item.id === id);
        return ok(config, event ?? null, event ? 200 : 404);
    }
    if (method === "delete" && path.startsWith("/admin/events/")) {
        const id = path.replace("/admin/events/", "");
        mockEvents = mockEvents.filter((event) => event.id !== id);
        return ok(config, {});
    }
    if (method === "get" && path === "/admin/events") {
        return ok(
            config,
            mockEvents.map((event) => ({
                ...event,
                registration_count: mockRegisteredEventIds.filter(
                    (registeredId) => registeredId === event.id
                ).length,
            }))
        );
    }
    if (method === "get" && path.endsWith("/registrations")) {
        return ok(
            config,
            mockRegisteredEventIds.map((eventId) => {
                const event = mockEvents.find((item) => item.id === eventId) ?? mockEvents[0];
                return {
                    user_id: mockUserData.userId,
                    display_name: mockProfile.full_name ?? "Demo Hacker",
                    email: mockUserData.email,
                    registered_at: new Date(),
                    event,
                };
            })
        );
    }

    if (method === "post" && path === "/auth/create-student") {
        return ok(config, {
            userId: mockUuid("student"),
            email: "student@hackmesa.org",
            token: "demo-student-token",
            role: "HACKER",
            message: "Student created in demo mode.",
        });
    }
    if (method === "delete" && path === "/auth/users") {
        return ok(config, { success: true, message: "User deleted in demo mode." });
    }
    if (method === "get" && path.startsWith("/checkin/user/")) {
        const checkin: UserCheckinStatusDto = {
            id: "checkin-1",
            user_id: mockUserData.userId,
            full_name: mockProfile.full_name ?? "Demo Hacker",
            avatar_url: "",
            school: mockProfile.school ?? "LA City College",
            major: mockProfile.major ?? "Computer Science",
            year: mockProfile.year ?? "2nd Year",
            dietary_restrictions: mockProfile.dietary_restrictions ?? "None",
            t_shirt_size: mockProfile.t_shirt_size ?? "M",
            is_approved: true,
            day_one: true,
            day_two: false,
            created_at: "2025-10-01T00:00:00.000Z",
            updated_at: mockNow(),
        };
        return ok(config, checkin);
    }

    return ok(config, {});
};

const buildRoundResults = (): RoundResult[] =>
    mockProjects.map((project) => {
        const projectScores = mockScores.filter((score) => score.project_id === project.id);
        const judgeCount = projectScores.length;
        const avg = (selector: (score: Score) => number): number =>
            judgeCount
                ? Number(
                      (
                          projectScores.reduce((sum, score) => sum + selector(score), 0) /
                          judgeCount
                      ).toFixed(2)
                  )
                : 0;
        const bonusPoints = projectScores.reduce(
            (sum, score) =>
                sum +
                (score.bonus_all_participated ? 1 : 0) +
                (score.bonus_scalability ? 1 : 0) +
                (score.bonus_task_division ? 1 : 0),
            0
        );
        const totalScore =
            avg((score) => score.technical_complexity) +
            avg((score) => score.potential_impact) +
            avg((score) => score.design_implementation) +
            avg((score) => score.presentation) +
            bonusPoints;
        return {
            project_id: project.id,
            table_number: project.table_number,
            project_name: project.name,
            track: project.track,
            avg_technical: avg((score) => score.technical_complexity),
            avg_impact: avg((score) => score.potential_impact),
            avg_design: avg((score) => score.design_implementation),
            avg_presentation: avg((score) => score.presentation),
            bonus_points: bonusPoints,
            total_score: Number(totalScore.toFixed(2)),
            judge_count: judgeCount,
            judges: [{ id: "judge-1", display_name: "Demo Judge", email: "judge@hackmesa.org" }],
        };
    });

const handleGrace = (config: InternalAxiosRequestConfig): AxiosResponse<unknown> => {
    const method = (config.method ?? "get").toLowerCase();
    const path = getPath(config.url);
    const params = getParams(config);

    if (method === "get" && path === "/settings") {
        return ok(config, mockSettings);
    }
    if (method === "get" && path.startsWith("/settings/")) {
        const name = path.replace("/settings/", "");
        return ok(config, mockSettings.find((setting) => setting.name === name) ?? null);
    }
    if (method === "get" && path === "/admin/settings") {
        return ok(config, mockSettings);
    }
    if (method === "get" && path.startsWith("/admin/settings/")) {
        const name = path.replace("/admin/settings/", "");
        return ok(config, mockSettings.find((setting) => setting.name === name) ?? null);
    }
    if (method === "post" && path === "/admin/settings") {
        const payload = parseBody<{ name: string; value: Record<string, unknown>; description?: string }>(config.data);
        const setting: Setting = {
            id: mockUuid("setting"),
            name: payload.name,
            value: payload.value,
            description: payload.description ?? null,
            created_at: mockNow(),
            updated_at: mockNow(),
        };
        mockSettings = [...mockSettings, setting];
        return ok(config, setting);
    }
    if (method === "patch" && path.startsWith("/admin/settings/")) {
        const name = path.replace("/admin/settings/", "");
        const payload = parseBody<{ value: Record<string, unknown>; description?: string }>(
            config.data
        );
        mockSettings = mockSettings.map((setting) =>
            setting.name === name
                ? {
                      ...setting,
                      value: payload.value,
                      description: payload.description ?? setting.description,
                      updated_at: mockNow(),
                  }
                : setting
        );
        return ok(config, mockSettings.find((setting) => setting.name === name) ?? null);
    }

    if (method === "get" && path === "/teams") {
        return ok(
            config,
            mockTeams.map<Team>((team) => ({
                id: team.id,
                name: team.name,
                code: team.code,
                created_at: team.created_at,
            }))
        );
    }
    if (method === "get" && path === "/teams/my-team") {
        const team = mockTeams.find((item) => item.id === mockCurrentTeamId) ?? null;
        return ok(config, team);
    }
    if (method === "post" && path === "/teams") {
        const payload = parseBody<{ name: string }>(config.data);
        const team: TeamWithMembers = {
            id: mockUuid("team"),
            name: payload.name,
            code: Math.random().toString(36).slice(2, 10).toUpperCase(),
            created_at: mockNow(),
            members: [
                {
                    id: mockUuid("member"),
                    team_id: "pending",
                    full_name: mockProfile.full_name ?? "Demo Hacker",
                    role: "Creator",
                    created_at: mockNow(),
                },
            ],
        };
        team.members = team.members.map((member) => ({ ...member, team_id: team.id }));
        mockTeams = [team, ...mockTeams];
        mockCurrentTeamId = team.id;
        return ok(config, team);
    }
    if (method === "post" && path === "/teams/join-by-code") {
        const payload = parseBody<{ code: string }>(config.data);
        const team = mockTeams.find((item) => item.code === payload.code);
        if (!team) {
            return ok(config, null, 404);
        }
        const member: TeamMemberPublic = {
            id: mockUuid("member"),
            team_id: team.id,
            full_name: mockProfile.full_name ?? "Demo Hacker",
            role: "Member",
            created_at: mockNow(),
        };
        team.members = [...team.members, member];
        mockCurrentTeamId = team.id;
        return ok(config, member);
    }
    if (method === "post" && path.startsWith("/teams/leave/")) {
        const id = path.replace("/teams/leave/", "");
        const team = mockTeams.find((item) => item.id === id);
        if (team) {
            team.members = team.members.filter((member) => member.role === "Creator");
        }
        mockCurrentTeamId = null;
        return ok(config, { message: "Left team successfully." });
    }
    if (method === "delete" && path.startsWith("/teams/members/")) {
        const teamId = path.replace("/teams/members/", "");
        const body = parseBody<{ userId: string }>(config.data);
        const team = mockTeams.find((item) => item.id === teamId);
        if (team) {
            team.members = team.members.filter((member) => member.id !== body.userId);
        }
        return ok(config, { message: "Team member removed." });
    }
    if (method === "get" && path.startsWith("/teams/members/")) {
        const teamId = path.replace("/teams/members/", "");
        const team = mockTeams.find((item) => item.id === teamId);
        return ok(config, team?.members ?? []);
    }
    if (method === "patch" && path.startsWith("/teams/members/")) {
        const teamId = path.replace("/teams/members/", "");
        const body = parseBody<{ userId: string; role: string }>(config.data);
        const team = mockTeams.find((item) => item.id === teamId);
        if (team) {
            team.members = team.members.map((member) =>
                member.id === body.userId ? { ...member, role: body.role } : member
            );
        }
        return ok(config, team?.members.find((member) => member.id === body.userId) ?? null);
    }
    if (method === "get" && path.startsWith("/teams/")) {
        const id = path.replace("/teams/", "");
        return ok(config, mockTeams.find((team) => team.id === id) ?? null);
    }

    if (method === "get" && path === "/projects") {
        return ok(config, mockProjects);
    }
    if (method === "get" && path.startsWith("/projects/team/")) {
        const teamId = path.replace("/projects/team/", "");
        return ok(config, mockProjects.find((project) => project.team_id === teamId) ?? null);
    }
    if (method === "get" && path.startsWith("/projects/table/")) {
        const tableNumber = path.replace("/projects/table/", "");
        return ok(
            config,
            mockProjects.find((project) => project.table_number === tableNumber) ?? null
        );
    }
    if (
        method === "get" &&
        /^\/projects\/[^/]+$/.test(path) &&
        !path.startsWith("/projects/team/") &&
        !path.startsWith("/projects/table/")
    ) {
        const id = path.replace("/projects/", "");
        return ok(config, mockProjects.find((project) => project.id === id) ?? null);
    }
    if (method === "post" && path === "/projects") {
        const payload = parseBody<CreateProjectDto>(config.data);
        const project: Project = {
            id: mockUuid("project"),
            team_id: payload.team_id,
            name: payload.name,
            table_number: payload.table_number,
            devpost_url: payload.devpost_url,
            awards_opt_in: payload.awards_opt_in,
            track: payload.track,
            sponsor_opt_in: payload.sponsor_opt_in,
            created_by: payload.created_by ?? mockUserData.userId,
            created_at: mockNow(),
        };
        mockProjects = [...mockProjects.filter((item) => item.team_id !== payload.team_id), project];
        return ok(config, project);
    }
    if (method === "put" && path.startsWith("/projects/")) {
        const id = path.replace("/projects/", "");
        const payload = parseBody<CreateProjectDto>(config.data);
        mockProjects = mockProjects.map((project) =>
            project.id === id
                ? {
                      ...project,
                      ...payload,
                  }
                : project
        );
        return ok(config, mockProjects.find((project) => project.id === id) ?? null);
    }
    if (method === "get" && path === "/projects/sponsor-opt-ins") {
        const grouped = mockProjects.reduce<Record<string, { name: string; table_number: string }[]>>(
            (accumulator, project) => {
                project.sponsor_opt_in.forEach((sponsor) => {
                    accumulator[sponsor] = accumulator[sponsor] ?? [];
                    accumulator[sponsor].push({
                        name: project.name,
                        table_number: project.table_number,
                    });
                });
                return accumulator;
            },
            {}
        );
        return ok(config, grouped);
    }
    if (method === "get" && path === "/projects/sponsors/projects") {
        const grouped = mockProjects.reduce<Record<string, Project[]>>((accumulator, project) => {
            project.sponsor_opt_in.forEach((sponsor) => {
                accumulator[sponsor] = accumulator[sponsor] ?? [];
                accumulator[sponsor].push(project);
            });
            return accumulator;
        }, {});
        return ok(config, grouped);
    }

    if (method === "post" && path === "/scores") {
        const payload = parseBody<SubmitScoreRequest>(config.data);
        const score: Score = {
            id: mockUuid("score"),
            judge_id: payload.judge_id,
            project_id: payload.project_id,
            round: payload.round,
            technical_complexity: payload.technical_complexity,
            potential_impact: payload.potential_impact,
            design_implementation: payload.design_implementation,
            presentation: payload.presentation,
            bonus_scalability: payload.bonus_scalability,
            bonus_all_participated: payload.bonus_all_participated,
            bonus_task_division: payload.bonus_task_division,
            created_at: mockNow(),
        };
        mockScores = [
            ...mockScores.filter(
                (item) =>
                    !(
                        item.judge_id === score.judge_id &&
                        item.project_id === score.project_id &&
                        item.round === score.round
                    )
            ),
            score,
        ];
        return ok(config, score);
    }
    if (method === "post" && path === "/scores/award") {
        const payload = parseBody<SubmitAwardScoreRequest>(config.data);
        const score: AwardScore = {
            id: mockUuid("award-score"),
            judge_id: payload.judge_id,
            project_id: payload.project_id,
            award_category: payload.award_category,
            score: payload.score,
            notes: payload.notes,
            created_at: mockNow(),
        };
        mockAwardScores = [
            ...mockAwardScores.filter(
                (item) =>
                    !(
                        item.judge_id === score.judge_id &&
                        item.project_id === score.project_id &&
                        item.award_category === score.award_category
                    )
            ),
            score,
        ];
        return ok(config, score);
    }
    if (method === "get" && path.startsWith("/scores/project/")) {
        const projectId = path.replace("/scores/project/", "");
        const round = Number(params.get("round") ?? 1);
        return ok(
            config,
            mockScores.filter(
                (score) => score.project_id === projectId && score.round === round
            )
        );
    }
    if (method === "get" && path.startsWith("/scores/award/project/")) {
        const projectId = path.replace("/scores/award/project/", "");
        const category = params.get("category");
        const filtered = mockAwardScores.filter((score) => score.project_id === projectId);
        return ok(
            config,
            category
                ? filtered.filter((score) => score.award_category === category)
                : filtered
        );
    }
    if (method === "get" && path === "/scores/award-categories") {
        return ok(config, mockAwardCategories);
    }
    if (method === "get" && path.startsWith("/scores/judge/")) {
        const judgeId = path.replace("/scores/judge/", "");
        const round = Number(params.get("round") ?? 1);
        const projects: ScoredProject[] = mockScores
            .filter((score) => score.judge_id === judgeId && score.round === round)
            .map((score) => {
                const project = mockProjects.find((item) => item.id === score.project_id);
                return {
                    score_id: score.id,
                    project_id: score.project_id,
                    project_name: project?.name ?? "Unknown Project",
                    table_number: project?.table_number ?? "-",
                    track: project?.track ?? null,
                    technical_complexity: score.technical_complexity,
                    potential_impact: score.potential_impact,
                    design_implementation: score.design_implementation,
                    presentation: score.presentation,
                    bonus_scalability: score.bonus_scalability,
                    bonus_all_participated: score.bonus_all_participated,
                    bonus_task_division: score.bonus_task_division,
                    created_at: score.created_at,
                };
            });
        return ok(config, projects);
    }
    if (method === "get" && (path === "/scores/round1-results" || path === "/scores/round2-results")) {
        return ok(config, buildRoundResults());
    }
    if (method === "get" && path === "/scores/top-projects") {
        const count = Number(params.get("count") ?? 10);
        const top: TopProject[] = buildRoundResults()
            .sort((a, b) => b.total_score - a.total_score)
            .slice(0, count)
            .map((item) => ({
                project_id: item.project_id,
                table_number: item.table_number,
                project_name: item.project_name,
                total_score: item.total_score,
            }));
        return ok(config, top);
    }
    if (method === "get" && path === "/scores/track-winners") {
        const winners: TrackWinner[] = buildRoundResults().map((item) => ({
            track: item.track ?? "General",
            project_id: item.project_id,
            project_name: item.project_name,
            table_number: item.table_number,
            total_score: item.total_score,
            from_round: 1,
            judges: item.judges,
        }));
        return ok(config, winners);
    }
    if (method === "get" && path === "/scores/award-winners") {
        const winners: AwardWinner[] = mockAwardCategories.map((category) => {
            const match = mockAwardScores.find(
                (score) => score.award_category === category.name
            );
            const project = mockProjects.find((item) => item.id === match?.project_id) ?? mockProjects[0];
            return {
                award_category: category.name,
                project_id: project.id,
                project_name: project.name,
                table_number: project.table_number,
                avg_score: match?.score ?? 0,
                judge_count: match ? 1 : 0,
                judges: [{ id: "judge-1", display_name: "Demo Judge", email: "judge@hackmesa.org" }],
            };
        });
        return ok(config, winners);
    }

    return ok(config, {});
};

export const createMockAdapter = (service: ServiceName): AxiosAdapter => {
    return async (config: InternalAxiosRequestConfig): Promise<AxiosResponse> => {
        if (service === "application") {
            return handleApplication(config);
        }
        if (service === "user") {
            return handleUser(config);
        }
        if (service === "grace") {
            return handleGrace(config);
        }
        return ok(config, { message: "Demo KickPost response" });
    };
};
