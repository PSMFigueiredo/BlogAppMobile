export interface RefreshToken {
    id: string;          // ID do refresh token
    userId: string;      // ID do usuário associado ao refresh token
    createdAt: string;   // Data de criação do refresh token
    expiresIn: string;   // Tempo de expiração do refresh token em segundos
}

export interface Auth {
    token: string;       // Token JWT do usuário
    refreshToken: RefreshToken; // Detalhes do refresh token
}