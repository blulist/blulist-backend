import { Injectable } from '@nestjs/common';
import { MessageLogger } from '../messageLogger.interface';
import { WebhookClient } from 'discord.js';
import * as process from 'process';

@Injectable()
export class DiscordLogger implements MessageLogger {
  private client: WebhookClient = new WebhookClient({
    url: process.env.WEBHOOK,
  });
  warn(message: string, stack?: string): Promise<void> | void {
    return undefined;
  }
  constructor() {}

  async error(message: string, stack?: string): Promise<void> {
    if (!stack) {
      await this.client.send({
        embeds: [
          {
            title: '❌ Error',
            description: message,
          },
        ],
      });
    } else {
      await this.client.send({
        embeds: [
          {
            title: '❌ Error',
            description: message,
            fields: [
              {
                name: 'Stack',
                value: `\`\`\`\n ${stack || 'noStack'} \`\`\``,
              },
            ],
          },
        ],
      });
    }
  }

  async log(message: string, options?: any): Promise<void> {
    await this.client.send({
      embeds: [
        {
          title: '🐳 INFO',
          description: message,
        },
      ],
    });
  }
}
