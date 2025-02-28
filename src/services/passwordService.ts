
import { GetAllPasswordsResponse, PasswordEntryResponse } from "@/types/passwordTypes";
import { axiosAuth } from "./authService";

// Define the base API path for password-related endpoints
const PASSWORDS_API = "/passwords";

// Get all passwords
export const getPasswords = async (): Promise<GetAllPasswordsResponse> => {
    try {
        const response = await axiosAuth.get(PASSWORDS_API);
        return response.data;
    } catch (error) {
        console.error("Error fetching passwords", error);
        throw error;
    }
};

// Get a single password by ID
export const getPassword = async (id: number): Promise<PasswordEntryResponse> => {
    try {
        const response = await axiosAuth.get(`${PASSWORDS_API}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching password with ID ${id}`, error);
        throw error;
    }
};

// Add a new password entry
export const addPassword = async (entryName: string, username: string, password: string): Promise<PasswordEntryResponse> => {
    try {
        const response = await axiosAuth.post(PASSWORDS_API, { entryName, username, password });
        return response.data;
    } catch (error) {
        console.error("Error adding password entry", error);
        throw error;
    }
};

// Update an existing password entry
export const updatePassword = async (id: number, entryName: string, username: string, password: string): Promise<PasswordEntryResponse> => {
    try {
        const response = await axiosAuth.put(`${PASSWORDS_API}/${id}`, { entryName, username, password });
        return response.data;
    } catch (error) {
        console.error(`Error updating password with ID ${id}`, error);
        throw error;
    }
};

// Delete a password entry
export const deletePassword = async (id: number): Promise<void> => {
    try {
        await axiosAuth.delete(`${PASSWORDS_API}/${id}`);
    } catch (error) {
        console.error(`Error deleting password with ID ${id}`, error);
        throw error;
    }
};