import { api } from './client';

export interface SendOtpResponse {
	message: string;
}

export interface VerifyOtpResponse {
	accessToken: string;
	refreshToken: string;
}

export interface RefreshResponse {
	accessToken: string;
}

export function sendOtp(email: string): Promise<SendOtpResponse> {
	return api.post('/auth/send-otp', { email });
}

export function verifyOtp(email: string, otp: string): Promise<VerifyOtpResponse> {
	return api.post('/auth/verify-otp', { email, otp });
}

export function refreshToken(refreshToken: string): Promise<RefreshResponse> {
	return api.post('/auth/refresh', { refreshToken });
}
