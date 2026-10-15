import type { CurrentStateItem } from '../../src/lib/simulator/consequences/types';

export default function CurrentState({ items }: { items: readonly CurrentStateItem[] }) {
  if (items.length === 0) return null;
  return <section className="sim-current app-card" aria-labelledby="current-state-title">
    <h2 id="current-state-title">Acum</h2>
    <ul>{items.map(item => <li key={item.id}><strong>{item.title}</strong>
      {item.description && <p>{item.description}</p>}
      {item.validityLabel && <small>{item.validityLabel}</small>}
    </li>)}</ul>
  </section>;
}
