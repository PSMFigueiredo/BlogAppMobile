export interface RefreshedToken {
    token: string;
}

export interface RefreshToken {
    createdAt: string;
    expiresIn: number;
    id: string;
    userId: string;
}

export interface Auth {
    token: string;
    refreshToken: RefreshToken;
    user: {
        id: string;
        name: string;
        email: string;
        role: string;
    }
}