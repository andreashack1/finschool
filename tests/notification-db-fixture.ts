import type { PGlite } from '@electric-sql/pglite';
/** Small PostgREST transport adapter backed by real PostgreSQL, for domain tests. */
export function notificationDbFixture(database: () => PGlite) {
  const ident = (s: string) => { if (!/^[a-z_][a-z_0-9]*$/.test(s)) throw Error('Invalid fixture identifier'); return `"${s}"`; };
  class Query {
    table: string; operation = 'select'; columns = '*'; values: Record<string, unknown> = {}; filters: string[] = []; params: unknown[] = []; sorting: string[] = []; maximum = 10000; one = false; head = false; count = false; conflict = ''; ignore = false;
    constructor(table: string) { this.table = ident(table); }
    param(value: unknown) { this.params.push(value); return `$${this.params.length}`; }
    select(columns = '*', options?: { count?: string; head?: boolean }) { this.columns = columns === '*' ? '*' : columns.split(',').map(ident).join(','); this.count = !!options?.count; this.head = !!options?.head; return this; }
    eq(key: string, value: unknown) { this.filters.push(`${ident(key)}=${this.param(value)}`); return this; }
    is(key: string, value: null) { void value; this.filters.push(`${ident(key)} is null`); return this; }
    lte(key: string, value: unknown) { this.filters.push(`${ident(key)}<=${this.param(value)}`); return this; }
    gte(key: string, value: unknown) { this.filters.push(`${ident(key)}>=${this.param(value)}`); return this; }
    in(key: string, values: unknown[]) { this.filters.push(`${ident(key)} in (${values.map(v => this.param(v)).join(',')})`); return this; }
    order(key: string, options?: { ascending?: boolean }) { this.sorting.push(`${ident(key)} ${options?.ascending === false ? 'desc' : 'asc'}`); return this; }
    limit(n: number) { this.maximum = n; return this; }
    single() { this.one = true; return this; }
    maybeSingle() { this.one = true; return this; }
    upsert(values: Record<string, unknown>, options: { onConflict: string; ignoreDuplicates?: boolean }) { this.operation = 'insert'; this.values = values; this.conflict = options.onConflict.split(',').map(ident).join(','); this.ignore = !!options.ignoreDuplicates; return this; }
    update(values: Record<string, unknown>) { this.operation = 'update'; this.values = values; return this; }
    async execute() {
      try {
        const where = this.filters.length ? ` where ${this.filters.join(' and ')}` : '';
        const keys = Object.keys(this.values);
        let sql: string;
        if (this.operation === 'insert') sql = `insert into public.${this.table}(${keys.map(ident).join(',')}) values(${keys.map(k => this.param(this.values[k])).join(',')}) on conflict(${this.conflict}) do ${this.ignore ? 'nothing' : `update set ${keys.map(k => `${ident(k)}=excluded.${ident(k)}`).join(',')}`} returning *`;
        else if (this.operation === 'update') sql = `update public.${this.table} set ${keys.map(k => `${ident(k)}=${this.param(this.values[k])}`).join(',')}${where} returning *`;
        else sql = `select ${this.head ? 'count(*)::integer as count' : this.columns} from public.${this.table}${where}${this.sorting.length && !this.head ? ` order by ${this.sorting.join(',')}` : ''} limit ${this.maximum}`;
        const result = await database().query<Record<string, unknown>>(sql, this.params);
        const rows = JSON.parse(JSON.stringify(result.rows)) as Record<string, unknown>[];
        return { data: this.head ? null : this.one ? rows[0] ?? null : rows, error: null, count: this.head ? rows[0]?.count : null };
      } catch (error) { return { data: null, error, count: null }; }
    }
    then<T>(fulfilled: (value: Awaited<ReturnType<Query['execute']>>) => T | PromiseLike<T>) { return this.execute().then(fulfilled); }
  }
  return { from: (table: string) => new Query(table), rpc: async (name: string, args: { p_token: string; p_limit: number; p_user?: string }) => {
    if (name !== 'claim_notification_users') throw Error('Unknown fixture RPC');
    const result = await database().query<{ id: string }>('select public.claim_notification_users($1,$2,$3) as id', [args.p_token, args.p_limit, args.p_user ?? null]);
    return { data: result.rows.map(r => r.id), error: null };
  } };
}
