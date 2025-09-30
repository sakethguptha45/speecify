import { Client } from "./client";
import { User } from "./user";

export interface DatabaseSchema {
    clients: Client[];
    users: User[];
}