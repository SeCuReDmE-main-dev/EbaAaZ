'use server';
/**
 * @fileOverview Converts a 'graft' data structure into codeline using AI.
 *
 * - graftToCode - A function that transforms a graft into code.
 * - GraftToCodeInput - The input type for the graftToCode function.
 * - GraftToCodeOutput - The return type for the graftToCode function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GraftToCodeInputSchema = z.object({
  graft: z.string().describe('A data structure representing the desired application logic.'),
  format: z.string().optional().describe('The desired output format for the codeline (e.g., TypeScript, Python).'),
});
export type GraftToCodeInput = z.infer<typeof GraftToCodeInputSchema>;

const GraftToCodeOutputSchema = z.object({
  codeline: z.string().describe('The generated codeline representing the application logic.'),
});
export type GraftToCodeOutput = z.infer<typeof GraftToCodeOutputSchema>;

export async function graftToCode(input: GraftToCodeInput): Promise<GraftToCodeOutput> {
  return graftToCodeFlow(input);
}

const graftToCodePrompt = ai.definePrompt({
  name: 'graftToCodePrompt',
  input: {
    schema: z.object({
      graft: z.string().describe('A data structure representing the desired application logic.'),
      format: z.string().optional().describe('The desired output format for the codeline (e.g., TypeScript, Python).'),
    }),
  },
  output: {
    schema: z.object({
      codeline: z.string().describe('The generated codeline representing the application logic.'),
    }),
  },
  prompt: `You are an AI code generation expert. You will convert the given graft data structure into codeline, in the format specified by the user.  If no format is specified, generate Typescript code.

Graft:
{{graft}}

Desired Format (if any):
{{format}}

Codeline:
`,
});

const graftToCodeFlow = ai.defineFlow<
  typeof GraftToCodeInputSchema,
  typeof GraftToCodeOutputSchema
>({
  name: 'graftToCodeFlow',
  inputSchema: GraftToCodeInputSchema,
  outputSchema: GraftToCodeOutputSchema,
}, async input => {
  const {output} = await graftToCodePrompt(input);
  return output!;
});

