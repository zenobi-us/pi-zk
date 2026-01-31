import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { ExtensionContext } from '@mariozechner/pi-coding-agent';
import { ZkClient } from '../src/lib/zk-client';

describe('zk_list tool', () => {
  let mockContext: ExtensionContext;

  beforeEach(() => {
    // Setup mock context
    mockContext = {
      cwd: '/test/notebook',
      ui: {} as any,
      hasUI: false,
      sessionManager: {} as any,
      modelRegistry: {} as any,
      model: undefined,
      isIdle: () => true,
      abort: vi.fn(),
      hasPendingMessages: () => false,
      shutdown: vi.fn(),
      getContextUsage: () => undefined,
      compact: vi.fn(),
      getSystemPrompt: () => '',
    };
  });

  it('should map tags to --tag flags', async () => {
    const mockSpawn = vi.fn().mockReturnValue({
      stdout: new Blob([JSON.stringify([])]),
      stderr: new Blob(['']),
      exited: Promise.resolve(0),
    });

    const zkClient = new ZkClient({
      notebookDir: mockContext.cwd,
      spawn: mockSpawn as any,
    });

    const args = ['--tag', 'work', '--tag', 'urgent'];
    await zkClient.list(args);

    expect(mockSpawn).toHaveBeenCalledWith(
      ['zk', 'list', '--format', 'json', '--tag', 'work', '--tag', 'urgent'],
      expect.objectContaining({
        env: expect.objectContaining({
          ZK_NOTEBOOK_DIR: '/test/notebook',
        }),
      })
    );
  });

  it('should map query to --match flag', async () => {
    const mockSpawn = vi.fn().mockReturnValue({
      stdout: new Blob([JSON.stringify([])]),
      stderr: new Blob(['']),
      exited: Promise.resolve(0),
    });

    const zkClient = new ZkClient({
      notebookDir: mockContext.cwd,
      spawn: mockSpawn as any,
    });

    const args = ['--match', 'meeting notes'];
    await zkClient.list(args);

    expect(mockSpawn).toHaveBeenCalledWith(
      ['zk', 'list', '--format', 'json', '--match', 'meeting notes'],
      expect.objectContaining({
        env: expect.objectContaining({
          ZK_NOTEBOOK_DIR: '/test/notebook',
        }),
      })
    );
  });

  it('should map sort to --sort flag', async () => {
    const mockSpawn = vi.fn().mockReturnValue({
      stdout: new Blob([JSON.stringify([])]),
      stderr: new Blob(['']),
      exited: Promise.resolve(0),
    });

    const zkClient = new ZkClient({
      notebookDir: mockContext.cwd,
      spawn: mockSpawn as any,
    });

    const args = ['--sort', 'created'];
    await zkClient.list(args);

    expect(mockSpawn).toHaveBeenCalledWith(
      ['zk', 'list', '--format', 'json', '--sort', 'created'],
      expect.objectContaining({
        env: expect.objectContaining({
          ZK_NOTEBOOK_DIR: '/test/notebook',
        }),
      })
    );
  });

  it('should map limit to --limit flag', async () => {
    const mockSpawn = vi.fn().mockReturnValue({
      stdout: new Blob([JSON.stringify([])]),
      stderr: new Blob(['']),
      exited: Promise.resolve(0),
    });

    const zkClient = new ZkClient({
      notebookDir: mockContext.cwd,
      spawn: mockSpawn as any,
    });

    const args = ['--limit', '10'];
    await zkClient.list(args);

    expect(mockSpawn).toHaveBeenCalledWith(
      ['zk', 'list', '--format', 'json', '--limit', '10'],
      expect.objectContaining({
        env: expect.objectContaining({
          ZK_NOTEBOOK_DIR: '/test/notebook',
        }),
      })
    );
  });

  it('should return formatted output for notes', async () => {
    const mockNotes = [
      {
        filename: '202401010000.md',
        path: '202401010000.md',
        absPath: '/test/notebook/202401010000.md',
        title: 'Test Note 1',
        created: '2024-01-01T00:00:00Z',
        modified: '2024-01-01T12:00:00Z',
      },
      {
        filename: '202401020000.md',
        path: '202401020000.md',
        absPath: '/test/notebook/202401020000.md',
        title: 'Test Note 2',
        created: '2024-01-02T00:00:00Z',
        modified: '2024-01-02T12:00:00Z',
      },
    ];

    const mockSpawn = vi.fn().mockReturnValue({
      stdout: new Blob([JSON.stringify(mockNotes)]),
      stderr: new Blob(['']),
      exited: Promise.resolve(0),
    });

    const zkClient = new ZkClient({
      notebookDir: mockContext.cwd,
      spawn: mockSpawn as any,
    });

    const notes = await zkClient.list();

    expect(notes).toHaveLength(2);
    expect(notes[0]).toMatchObject({
      filename: '202401010000.md',
      title: 'Test Note 1',
    });
    expect(notes[1]).toMatchObject({
      filename: '202401020000.md',
      title: 'Test Note 2',
    });
  });

  it('should handle empty results', async () => {
    const mockSpawn = vi.fn().mockReturnValue({
      stdout: new Blob([JSON.stringify([])]),
      stderr: new Blob(['']),
      exited: Promise.resolve(0),
    });

    const zkClient = new ZkClient({
      notebookDir: mockContext.cwd,
      spawn: mockSpawn as any,
    });

    const notes = await zkClient.list();

    expect(notes).toEqual([]);
  });

  it('should handle errors', async () => {
    const mockSpawn = vi.fn().mockReturnValue({
      stdout: new Blob(['']),
      stderr: new Blob(['zk command failed']),
      exited: Promise.resolve(1),
    });

    const zkClient = new ZkClient({
      notebookDir: mockContext.cwd,
      spawn: mockSpawn as any,
    });

    await expect(zkClient.list()).rejects.toThrow(/zk command failed with exit code 1/);
  });
});
