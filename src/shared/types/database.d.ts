import { Database } from "@include/database";

export enum DatabaseEvents {
  Created,
  Updated,
  Deleted,
}

/**
 * Enums
 */
export type Role = Database["public"]["Enums"]["role"];
export type Class = Database["public"]["Tables"]["classes"]["Row"];

/**
 * User Table types
 */
export type User = Database["public"]["Tables"]["users"]["Row"];
export type UserInsert = Database["public"]["Tables"]["users"]["Insert"];
export type UserUpdate = Database["public"]["Tables"]["users"]["Update"];

/**
 * Class Table types
 */
export type ClassInsert = Database["public"]["Tables"]["classes"]["Insert"];
export type ClassUpdate = Database["public"]["Tables"]["classes"]["Update"];
export type ClassType = Database["public"]["Enums"]["class"];
