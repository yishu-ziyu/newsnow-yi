import type { Database } from "db0"
import type { AgentChatMessage } from "@shared/agent"

export class AgentHistoryTable {
  private db
  constructor(db: Database) {
    this.db = db
  }

  async init() {
    await this.db.prepare(`
      CREATE TABLE IF NOT EXISTS agent_history (
        id TEXT PRIMARY KEY,
        data TEXT,
        updated INTEGER
      );
    `).run()
    logger.success(`init agent_history table`)
  }

  async get(id: string): Promise<{ messages: AgentChatMessage[], updated: number }> {
    const row = (await this.db.prepare(`SELECT data, updated FROM agent_history WHERE id = ?`).get(id)) as any
    if (!row) return { messages: [], updated: 0 }
    try {
      const messages = JSON.parse(row.data)
      return { messages: Array.isArray(messages) ? messages : [], updated: row.updated ?? 0 }
    } catch {
      return { messages: [], updated: row.updated ?? 0 }
    }
  }

  async set(id: string, messages: AgentChatMessage[]) {
    const now = Date.now()
    await this.db.prepare(
      `INSERT OR REPLACE INTO agent_history (id, data, updated) VALUES (?, ?, ?)`,
    ).run(id, JSON.stringify(messages), now)
    logger.success(`set agent history ${id} (${messages.length} messages)`)
    return now
  }

  async clear(id: string) {
    await this.db.prepare(`DELETE FROM agent_history WHERE id = ?`).run(id)
    logger.success(`clear agent history ${id}`)
  }
}
