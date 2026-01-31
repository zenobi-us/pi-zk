import { describe, it, expect } from 'vitest';
import { ZkExtension } from '../src/extension';

describe('ZkExtension', () => {
  it('should be defined', () => {
    const extension = new ZkExtension();
    expect(extension).toBeDefined();
    expect(extension.name).toBe('pi-zk');
  });
});
