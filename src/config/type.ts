export type Role = 'admin' | 'editor' | 'viewer' | 'undefined';

export interface User {
    staffID: string;
    username: string;
    role: Role;
    access_token: string;
}
