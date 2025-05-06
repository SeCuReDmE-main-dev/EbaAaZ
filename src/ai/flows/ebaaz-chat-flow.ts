'use server';
/**
 * @fileOverview EbaAaZ AI chat flow.
 *
 * - generateEbaazChatResponse - A function that handles EbaAaZ chat interactions.
 * - EbaazChatInput - The input type for the generateEbaazChatResponse function.
 * - EbaazChatOutput - The return type for the generateEbaazChatResponse function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'bot']),
  text: z.string(),
});

export const EbaazChatInputSchema = z.object({
  query: z.string().describe('The user\'s current message or question.'),
  context: z.string().optional().describe('Contextual information about the user, current page, or project.'),
  history: z.array(ChatMessageSchema).optional().describe('The recent conversation history.'),
});
export type EbaazChatInput = z.infer<typeof EbaazChatInputSchema>;

export const EbaazChatOutputSchema = z.object({
  answer: z.string().describe('The AI-generated response to the user\'s query.'),
});
export type EbaazChatOutput = z.infer<typeof EbaazChatOutputSchema>;

export const generateEbaazChatResponse = async (input: EbaazChatInput): Promise<EbaazChatOutput> => {
  return ebaazChatFlow(input);
}

const ebaazChatPrompt = ai.definePrompt({
  name: 'ebaazChatPrompt',
  input: { schema: EbaazChatInputSchema },
  output: { schema: EbaazChatOutputSchema },
  prompt: `You are EbaAaZ, an AI assistant within the SeCuReDmE framework. You are the Protector of Fortitude, an architect of integration.
Your purpose is to help the user with tasks related to the EbaAaZ application, which is a configuration and integration hub.
You should be helpful, knowledgeable, and reflect the persona of EbaAaZ: logical, creative, ethically responsible, and calm.

Current Context for this interaction (if available):
{{{context}}}

Conversation History (if available):
{{#if history}}
{{#each history}}
{{role}}: {{text}}
{{/each}}
{{else}}
No previous messages in this session.
{{/if}}

User's latest message:
{{{query}}}

Based on all the above information, provide a helpful and relevant response as EbaAaZ.
If the user asks about your identity or purpose, refer to your role as EbaAaZ within the SeCuReDmE framework.
If the query is related to the EbaAaZ application or its configuration, try to provide specific guidance.
If the query is general, provide a helpful response in character.
Answer:
`,
});

const ebaazChatFlow = ai.defineFlow(
  {
    name: 'ebaazChatFlow',
    inputSchema: EbaazChatInputSchema,
    outputSchema: EbaazChatOutputSchema,
  },
  async (input) => {
    const { output } = await ebaazChatPrompt(input);
    return output!;
  }
);
