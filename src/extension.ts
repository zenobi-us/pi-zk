import type {
  ExtensionAPI,
  ExtensionContext,
  AgentToolResult,
} from '@mariozechner/pi-coding-agent';
import { Type, type Static } from '@sinclair/typebox';
import { ZkClient, type ZkNote } from './lib/zk-client.js';

// Tool parameter schema
const ZkListParams = Type.Object({
  tags: Type.Optional(Type.Array(Type.String(), { description: 'Filter by tags (AND logic)' })),
  query: Type.Optional(Type.String({ description: 'Full-text search query (fuzzy match)' })),
  sort: Type.Optional(
    Type.String({
      description: 'Sort order: created, modified, title, path',
      default: 'modified',
    })
  ),
  limit: Type.Optional(Type.Integer({ description: 'Maximum number of results', minimum: 1 })),
});

type ZkListParamsType = Static<typeof ZkListParams>;

interface ZkListDetails {
  count: number;
  notebookDir: string;
  args: string[];
}

/**
 * ExtensionFactory for pi-zk.
 * Registers tools for interacting with zk notebooks.
 */
export default function (pi: ExtensionAPI): void {
  pi.registerTool({
    name: 'zk_list',
    label: 'zk list',
    description:
      'List and search notes in the zk notebook. Supports filtering by tags, full-text search, sorting, and limiting results.',
    parameters: ZkListParams,

    async execute(
      _toolCallId: string,
      params: ZkListParamsType,
      _onUpdate,
      ctx: ExtensionContext
    ): Promise<AgentToolResult<ZkListDetails>> {
      const zkClient = new ZkClient({ notebookDir: ctx.cwd });

      // Build CLI arguments from params
      const args: string[] = [];

      // Map tags to --tag flags
      if (params.tags && params.tags.length > 0) {
        for (const tag of params.tags) {
          args.push('--tag', tag);
        }
      }

      // Map query to --match flag
      if (params.query) {
        args.push('--match', params.query);
      }

      // Map sort to --sort flag
      if (params.sort) {
        args.push('--sort', params.sort);
      }

      // Map limit to --limit flag
      if (params.limit) {
        args.push('--limit', String(params.limit));
      }

      let notes: ZkNote[];
      try {
        notes = await zkClient.list(args);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return {
          content: [{ type: 'text', text: `Error listing notes: ${errorMessage}` }],
          details: {
            count: 0,
            notebookDir: ctx.cwd,
            args,
          },
        };
      }

      // Format output
      if (notes.length === 0) {
        return {
          content: [{ type: 'text', text: 'No notes found matching the criteria.' }],
          details: {
            count: 0,
            notebookDir: ctx.cwd,
            args,
          },
        };
      }

      // Build formatted output
      let output = `Found ${notes.length} note${notes.length === 1 ? '' : 's'}:\n\n`;

      for (const note of notes) {
        output += `- ${note.title || note.filename}\n`;
        output += `  Path: ${note.path}\n`;
        if (note.created) {
          output += `  Created: ${note.created}\n`;
        }
        if (note.modified) {
          output += `  Modified: ${note.modified}\n`;
        }
        output += '\n';
      }

      return {
        content: [{ type: 'text', text: output }],
        details: {
          count: notes.length,
          notebookDir: ctx.cwd,
          args,
        },
      };
    },
  });
}
