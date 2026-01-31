import { describe, it, expect, vi } from 'vitest';
import extensionFactory from '../src/extension';
import type { ExtensionAPI } from '@mariozechner/pi-coding-agent';

describe('ZkExtension', () => {
  it('should be a function', () => {
    expect(typeof extensionFactory).toBe('function');
  });

  it('should register zk_list tool', () => {
    const mockRegisterTool = vi.fn();
    const mockApi: Partial<ExtensionAPI> = {
      registerTool: mockRegisterTool,
      on: vi.fn(),
      registerCommand: vi.fn(),
      registerShortcut: vi.fn(),
    };

    extensionFactory(mockApi as ExtensionAPI);

    expect(mockRegisterTool).toHaveBeenCalledTimes(1);
    expect(mockRegisterTool).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'zk_list',
        label: 'zk list',
        description: expect.stringContaining('List and search notes'),
        parameters: expect.any(Object),
        execute: expect.any(Function),
      })
    );
  });
});
