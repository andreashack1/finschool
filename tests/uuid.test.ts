import { afterEach, describe, expect, it, vi } from 'vitest';
import { createClientUuid } from '../src/lib/uuid';

const uuidV4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
afterEach(() => vi.unstubAllGlobals());

describe('client UUID generation', () => {
  it('uses native randomUUID when available', () => {
    const id = '12345678-1234-4234-8234-123456789abc';
    const randomUUID = vi.fn(() => id);
    const getRandomValues = vi.fn();
    vi.stubGlobal('crypto', { randomUUID, getRandomValues });
    expect(createClientUuid()).toBe(id);
    expect(randomUUID).toHaveBeenCalledOnce();
    expect(getRandomValues).not.toHaveBeenCalled();
  });

  it('sets v4 version and RFC variant bits using getRandomValues without randomUUID', () => {
    const getRandomValues = vi.fn((bytes: Uint8Array) => bytes.fill(255));
    vi.stubGlobal('crypto', { getRandomValues });
    expect(createClientUuid()).toBe('ffffffff-ffff-4fff-bfff-ffffffffffff');
    expect(createClientUuid()).toMatch(uuidV4);
    expect(getRandomValues).toHaveBeenCalledWith(expect.any(Uint8Array));
  });

  it('produces distinct valid IDs across multiple fallback calls', () => {
    let sequence = 0;
    vi.stubGlobal('crypto', { getRandomValues: (bytes: Uint8Array) => {
      bytes.fill(0);
      bytes[0] = sequence++;
      return bytes;
    } });
    const ids = Array.from({ length: 100 }, createClientUuid);
    expect(new Set(ids).size).toBe(100);
    for (const id of ids) expect(id).toMatch(uuidV4);
  });

  it('imports safely without crypto and reports unavailable secure randomness on use', async () => {
    vi.stubGlobal('crypto', undefined);
    vi.resetModules();
    const uuidModule = await import('../src/lib/uuid');
    expect(() => uuidModule.createClientUuid()).toThrow('Secure random UUID generation is unavailable.');
  });

  it('initializes account tab events in a browser-like HTTP environment without randomUUID', async () => {
    vi.resetModules();
    vi.stubGlobal('crypto', { getRandomValues: (bytes: Uint8Array) => bytes.fill(0) });
    const postMessage = vi.fn();
    const close = vi.fn();
    vi.stubGlobal('BroadcastChannel', class {
      onmessage = null;
      postMessage = postMessage;
      close = close;
    });
    const events = await import('../src/lib/account/events');
    const dispose = events.listenAuthChanges(vi.fn());
    events.broadcastAuthChange('sessionChanged');
    expect(postMessage).toHaveBeenCalledWith(expect.objectContaining({ sender: expect.stringMatching(uuidV4) }));
    dispose();
    expect(close).toHaveBeenCalledTimes(2);
  });
});
