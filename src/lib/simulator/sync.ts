/** Shared request generation protects unmounted clients and older responses.
 * A foreground start and background refresh share the same flight. */
export class SimulatorSync<T> {
  private flight: Promise<void> | null = null;
  private generation = 0;
  invalidate() { this.generation++; this.flight = null; }
  run(load: () => Promise<T>, accept: (value: T) => void, reject: (error: unknown) => void): Promise<void> {
    if (this.flight) return this.flight;
    const generation = ++this.generation;
    const flight = load().then(value => { if (generation === this.generation) accept(value); }, error => { if (generation === this.generation) reject(error); }).finally(() => { if (this.flight === flight) this.flight = null; });
    this.flight = flight;
    return flight;
  }
}
