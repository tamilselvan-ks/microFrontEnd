export class Modal {
}
    export interface UserDetails {
        id?: string;       // MongoDB ID
        address: string;
        userId?: string;   // Matches Register Service user ID
        description: string;
        gender: string;
      }
      
      export interface User {
        id?: number;       // PostgreSQL ID
        name: string;
        phone: string;
        email: string;
        details: UserDetails[]; // List of user details
      }
      export interface UserFlatDetails {
        id?: number;
        name: string;
        phone: string;
        email: string;
        address: string;
        description: string;
        gender: string;
      }

