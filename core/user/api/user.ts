import { userClient } from "@/api/user-client";
import { RegisterDto } from "../types/register.dto";

export async function register(registerDto: RegisterDto) {
    const response = await userClient.post("/auth/register", registerDto);
    return response.data;
}
