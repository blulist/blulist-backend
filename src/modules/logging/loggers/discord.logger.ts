import { Injectable } from '@nestjs/common';
import { MessageLogger } from '../messageLogger.interface';
import { WebhookClient } from 'discord.js';
import * as process from 'process';
import { json } from 'express';

@Injectable()
export class DiscordLogger implements MessageLogger {
  private client: WebhookClient = new WebhookClient({
    url: process.env.WEBHOOK,
  });
  warn(message: string, stack?: string): Promise<void> | void {
    return undefined;
  }
  constructor() {}

  async error(message: string, stack?: any): Promise<void> {
    try {
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
        let stack_err: string;
        if (typeof stack == 'object') {
          stack_err = `\`\`\`json\n ${JSON.stringify(stack).slice(
            0,
            200,
          )} \`\`\``;
        } else {
          stack_err = stack;
        }
        await this.client.send({
          embeds: [
            {
              title: '❌ Error',
              description: message,
              fields: [
                {
                  name: 'Stack',
                  value: stack_err,
                },
              ],
            },
          ],
        });
      }
    } catch {}
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
