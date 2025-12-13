import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

export class GoogleOAuthUtils {
    /**
     * Generate Google OAuth consent screen URL
     * @returns Authorization URL for user to visit
     */
    static generateAuthUrl(): string {
        const scopes = [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
        ];

        return oauth2Client.generateAuthUrl({
            access_type: 'offline',
            client_id: process.env.GOOGLE_CLIENT_ID,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI,
            scope: scopes,
            prompt: 'consent', // Force consent screen to get refresh token
        });
    }

    /**
     * Exchange authorization code for access and refresh tokens
     * @param code - Authorization code from Google OAuth callback
     * @returns Object containing access_token and refresh_token
     */
    static async getTokensFromCode(code: string): Promise<{
        access_token: string;
        refresh_token?: string;
    }> {
        // Create a new OAuth2 client instance to ensure fresh credentials
        const client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_REDIRECT_URI
        );

        const { tokens } = await client.getToken(code);

        if (!tokens.access_token) {
            throw new Error('Failed to obtain access token');
        }

        return {
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token || undefined,
        };
    }

    /**
     * Fetch user profile information from Google
     * @param accessToken - Google OAuth access token
     * @returns User profile with id, email, and name
     */
    static async getUserInfo(accessToken: string): Promise<{
        id: string;
        email: string;
        name: string;
    }> {
        oauth2Client.setCredentials({ access_token: accessToken });

        const oauth2 = google.oauth2({
            auth: oauth2Client,
            version: 'v2',
        });

        const { data } = await oauth2.userinfo.get();

        if (!data.id || !data.email || !data.name) {
            throw new Error('Failed to retrieve user information from Google');
        }

        return {
            id: data.id,
            email: data.email,
            name: data.name,
        };
    }

    /**
     * Refresh an expired access token using refresh token
     * @param refreshToken - Google OAuth refresh token
     * @returns New access token
     */
    static async refreshAccessToken(refreshToken: string): Promise<string> {
        oauth2Client.setCredentials({ refresh_token: refreshToken });

        const { credentials } = await oauth2Client.refreshAccessToken();

        if (!credentials.access_token) {
            throw new Error('Failed to refresh access token');
        }

        return credentials.access_token;
    }
}
