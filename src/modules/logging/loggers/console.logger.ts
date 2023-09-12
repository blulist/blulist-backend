import { MessageLogger } from '../messageLogger.interface';

export class ConsoleLogger implements MessageLogger {
  error(message: string, stack?: string): void {
    console.log(message);
  }

  log(message: string): void {
    console.log(message);
  }

  warn(message: string, stack?: string): void {
    console.log(message);
  }
}
