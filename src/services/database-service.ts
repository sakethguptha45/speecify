import { JSONFilePreset } from "lowdb/node";
import { nanoid } from "nanoid";
import { ClientRepository } from "./client-service.js";
import { Client } from "../models/client.js";
import { User } from "../models/user.js";
import { DatabaseSchema } from "../models/dataSchema.js";

export class DatabaseService{
    private static dbInstance : DatabaseService;
    private db: any;

    private constructor() {}

    public static getInstance(): DatabaseService{
        if (!DatabaseService.dbInstance){
            DatabaseService.dbInstance = new DatabaseService();
        }
        return DatabaseService.dbInstance
    }
    
    public async intialize(): Promise<void>{
        if(!this.db){
            this.db = await JSONFilePreset<DatabaseSchema>('db.json',{
                clients: [],
                users: []
            })
        }
    }

    public async getDatabase(){
        if (!this.db){
            await this.intialize();
        }
        return this.db;
    }

    public async getClient(id: string): Promise<Client | null>{
        const db = await this.getDatabase();
        const clients = db.data.clients as Client[];
        const index = clients.findIndex(c => c.id == id);

        if(index !== -1){
            return clients[index]
        }
        return null
    }

    public async getClients():Promise<Client[]>{
        const db = await this.getDatabase();
        return db.data.clients as Client[];
    }

    public async getUsers(): Promise<User[]>{
        const db = await this.getDatabase();
        return db.data.users as User[];
        
    }

    public async addUser(user:User):Promise<void>{
        const db = await this.getDatabase();
        db.data.users.push(user);
        await db.write();

    }

    public async updateUser(user:User): Promise<void>{
        const db = await this.getDatabase();
        const users =  db.data.users as User[];
        const index = users.findIndex(u => u.id == user.id);

        if(index !== -1){
            users[index] = user;
            await db.write()
        }
    }

    public async write():Promise<void>{
        await this.db.write();
    }
}