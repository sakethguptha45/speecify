import { JSONFilePreset } from "lowdb/node";
import { Client } from "../models/client.js";
import { DatabaseService } from "./database-service.js";
import { createLRUCacheProvider, LRUCacheProvider } from "../lru-cache.js";

export class ClientRepository {
  public databaseService: DatabaseService;
  private cache : LRUCacheProvider<Client>;

  private constructor(){
    this.databaseService = DatabaseService.getInstance();
    this.cache = createLRUCacheProvider({ ttl: 100000, itemLimit: 10 });
  }

  
  public async getById(id: string): Promise<Client | null> {
    const db = await JSONFilePreset("db.json", {
      clients: [],
      users: [],
    });
    const clients = db.data.clients as Client[];
    let c: Client | null = null;
    for (let i = 0; i < clients.length; i++) {
      if (clients[i].id === id) {
        c = clients[i];
        break;
      }
    }
    if (!c) {
      return null;
    }
    return {
      id: c.id,
      name: c.name,
    };
  }

  public async getAll(): Promise<Client[]> {
    const db = await JSONFilePreset("db.json", {
      clients: [],
      users: [],
    });
    const clients = db.data.clients as Client[];
    return clients;
  }
}
