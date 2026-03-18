import postgres from 'postgres'

let sql: postgres.Sql | null = null

export function useDatabase(): postgres.Sql {
  if (!sql) {
    const config = useRuntimeConfig()
    sql = postgres(config.databaseUrl, {
      max: 10,
      idle_timeout: 20,
      connect_timeout: 10,
    })
  }
  return sql
}
