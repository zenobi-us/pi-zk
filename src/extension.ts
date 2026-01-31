import { Extension } from '@mariozechner/pi-coding-agent';

export class ZkExtension implements Extension {
  name = 'pi-zk';
  description = 'A pi-mono extension for editing zk notebooks';

  async activate(): Promise<void> {
    // TODO: Implement activation logic
  }

  async deactivate(): Promise<void> {
    // TODO: Implement deactivation logic
  }
}
