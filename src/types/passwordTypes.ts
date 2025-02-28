// Define a TypeScript interface for a single password entry
export interface GetAllPasswordsResponse {
    passwords: PasswordEntryResponse[];
}

export interface PasswordEntryResponse {
    id: number;
    entryName: number;
    username: number;
    password: number;
}

