import { describe, it, expect, mock, beforeEach } from 'bun:test';
import { ZkClient } from '../src/lib/zk-client';

describe('ZkClient', () => {
  const mockSpawn = mock();

  beforeEach(() => {
    mockSpawn.mockReset();
  });

  it('should construct with default options', () => {
    const client = new ZkClient();
    expect(client).toBeDefined();
  });

  it('should execute list command correctly', async () => {
    const mockNotes = [
      {
        filename: '202401010000.md',
        path: '202401010000.md',
        absPath: '/notes/202401010000.md',
        title: 'Test Note',
      },
    ];

    mockSpawn.mockReturnValue({
      stdout: new Blob([JSON.stringify(mockNotes)]),
      stderr: new Blob(['']),
      exited: Promise.resolve(0),
    });

    // Inject mockSpawn
    const client = new ZkClient({
      notebookDir: '/notes',
      spawn: mockSpawn as any,
    });

    const notes = await client.list();

    expect(mockSpawn).toHaveBeenCalledTimes(1);
    const [cmd, options] = mockSpawn.mock.calls[0];

    expect(cmd).toEqual(['zk', 'list', '--format', 'json']);
    expect(options.env).toMatchObject({
      ZK_NOTEBOOK_DIR: '/notes',
    });

    expect(notes).toEqual(mockNotes);
  });

  it('should handle execution errors', async () => {
    mockSpawn.mockReturnValue({
      stdout: new Blob(['']),
      stderr: new Blob(['Command failed']),
      exited: Promise.resolve(1),
    });

    const client = new ZkClient({ spawn: mockSpawn as any });
    await expect(client.list()).rejects.toThrow(/zk command failed with exit code 1/);
  });

  it('should handle empty output', async () => {
    mockSpawn.mockReturnValue({
      stdout: new Blob(['']), // Empty output
      stderr: new Blob(['']),
      exited: Promise.resolve(0),
    });

    const client = new ZkClient({ spawn: mockSpawn as any });
    const notes = await client.list();
    expect(notes).toEqual([]);
  });

  it('should pass additional arguments to list', async () => {
    mockSpawn.mockReturnValue({
      stdout: new Blob(['[]']),
      stderr: new Blob(['']),
      exited: Promise.resolve(0),
    });

    const client = new ZkClient({ spawn: mockSpawn as any });
    await client.list(['--limit', '5', 'tag:todo']);

    expect(mockSpawn).toHaveBeenCalled();
    const [cmd] = mockSpawn.mock.calls[0];
    expect(cmd).toEqual(['zk', 'list', '--format', 'json', '--limit', '5', 'tag:todo']);
  });
});
