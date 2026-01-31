import { spawn } from 'bun';

export interface ZkNote {
  filename: string;
  path: string;
  absPath: string;
  title?: string;
  created?: string;
  modified?: string;
  [key: string]: any;
}

export interface ZkClientOptions {
  notebookDir?: string;
  binPath?: string;
  spawn?: typeof spawn;
}

export class ZkClient {
  private notebookDir: string;
  private binPath: string;
  private spawn: typeof spawn;

  constructor(options: ZkClientOptions = {}) {
    this.notebookDir = options.notebookDir || process.cwd();
    this.binPath = options.binPath || 'zk';
    this.spawn = options.spawn || spawn;
  }

  async exec(args: string[]): Promise<string> {
    const cmd = [this.binPath, ...args];

    const env = {
      ...process.env,
      ZK_NOTEBOOK_DIR: this.notebookDir,
    };

    try {
      const proc = this.spawn(cmd, {
        env,
        stdout: 'pipe',
        stderr: 'pipe',
      });

      const output = await new Response(proc.stdout).text();
      const error = await new Response(proc.stderr).text();
      const exitCode = await proc.exited;

      if (exitCode !== 0) {
        throw new Error(
          `zk command failed with exit code ${exitCode}: ${error.trim() || 'Unknown error'}`
        );
      }

      return output;
    } catch (err: unknown) {
      // Handle spawn errors (e.g. binary not found)
      if (err instanceof Error) {
        throw err;
      }
      throw new Error(String(err));
    }
  }

  async list(args: string[] = []): Promise<ZkNote[]> {
    const cmdArgs = ['list', '--format', 'json', ...args];
    const output = await this.exec(cmdArgs);

    if (!output.trim()) {
      return [];
    }

    try {
      // zk list --format json outputs a JSON array
      return JSON.parse(output);
    } catch (e) {
      throw new Error(`Failed to parse zk output: ${output}`);
    }
  }
}
