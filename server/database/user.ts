import type { Database } from "db0"
import type { UserInfo } from "#/types"

export class UserTable {
  private db
  constructor(db: Database) {
    this.db = db
  }

  async init() {
    await this.db.prepare(`
      CREATE TABLE IF NOT EXISTS "user" (
        -- Postgres 里 user 是保留字，必须加引号（SQLite 也接受这种写法）
        id TEXT PRIMARY KEY,
        email TEXT,
        data TEXT,
        type TEXT,
        created BIGINT,
        updated BIGINT
      );
    `).run()
    await this.db.prepare(`
      CREATE INDEX IF NOT EXISTS idx_user_id ON user(id);
    `).run()
    logger.success(`init user table`)
  }

  async addUser(id: string, email: string, type: "github") {
    const u = await this.getUser(id)
    const now = Date.now()
    if (!u) {
      await this.db.prepare(`INSERT INTO "user" (id, email, data, type, created, updated) VALUES (?, ?, ?, ?, ?, ?)`)
        .run(id, email, "", type, now, now)
      logger.success(`add user ${id}`)
    } else if (u.email !== email && u.type !== type) {
      await this.db.prepare(`UPDATE "user" SET email = ?, updated = ? WHERE id = ?`).run(email, now, id)
      logger.success(`update user ${id} email`)
    } else {
      logger.info(`user ${id} already exists`)
    }
  }

  async getUser(id: string) {
    return (await this.db.prepare(`SELECT id, email, data, created, updated FROM "user" WHERE id = ?`).get(id)) as UserInfo
  }

  /**
   * Upsert: a token can be issued locally (or a row can be missing after a
   * manual cleanup) and we still want the write to land.
   */
  async setData(key: string, value: string, updatedTime = Date.now()) {
    const existing = await this.db.prepare(`SELECT id FROM "user" WHERE id = ?`).get(key)
    const state = existing
      ? await this.db.prepare(`UPDATE "user" SET data = ?, updated = ? WHERE id = ?`).run(value, updatedTime, key)
      : await this.db.prepare(`INSERT INTO "user" (id, email, data, type, created, updated) VALUES (?, ?, ?, ?, ?, ?)`)
        .run(key, "", value, "github", updatedTime, updatedTime)
    if (!state.success) throw new Error(`set user ${key} data failed`)
    logger.success(`set ${key} data`)
  }

  /** Missing row means "no data yet", not an error. */
  async getData(id: string) {
    const row: any = await this.db.prepare(`SELECT data, updated FROM "user" WHERE id = ?`).get(id)
    if (!row) {
      logger.info(`user ${id} has no row yet`)
      return { data: "", updated: 0 }
    }
    logger.success(`get ${id} data`)
    return row as {
      data: string
      updated: number
    }
  }

  async deleteUser(key: string) {
    const state = await this.db.prepare(`DELETE FROM "user" WHERE id = ?`).run(key)
    if (!state.success) throw new Error(`delete user ${key} failed`)
    logger.success(`delete user ${key}`)
  }
}
