import { JSONFilePreset } from "lowdb/node";
import { Client } from "./client.js";
export class ClientRepository {
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
