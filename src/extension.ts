import { Extension } from '@mariozechner/pi-coding-agent';

export class ZkExtension implements Extension {
  name = 'pi-zk';
  description = 'A pi-mono extension for editing zk notebooks';
  
  async activate(): Promise<void> {
    console.log('pi-zk extension activated');
  }

  async deactivate(): Promise<void> {
    console.log('pi-zk extension deactivated');
  }
}
