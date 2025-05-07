'use server';
/**
 * @fileOverview Fractal Sequence Management for EbaAaZ.
 *
 * - manageFractalSequences - A function to manage fractal growth equations and Fibonacci sequences.
 * - FractalSequenceInput - The input type for the manageFractalSequences function.
 * - FractalSequenceOutput - The return type for the manageFractalSequences function.
 */

import { ai } from '@/ai/ai-instance';
import { z } from 'genkit';

export const FractalSequenceInputSchema = z.object({
  sequenceType: z.enum(['fractal', 'fibonacci']).describe('The type of sequence to manage.'),
  parameters: z.record(z.string(), z.number()).describe('Parameters for the sequence calculation.'),
});
export type FractalSequenceInput = z.infer<typeof FractalSequenceInputSchema>;

export const FractalSequenceOutputSchema = z.object({
  result: z.array(z.number()).describe('The calculated sequence.'),
});
export type FractalSequenceOutput = z.infer<typeof FractalSequenceOutputSchema>;

export const manageFractalSequences = async (input: FractalSequenceInput): Promise<FractalSequenceOutput> => {
  return fractalSequenceFlow(input);
}

const fractalSequencePrompt = ai.definePrompt({
  name: 'fractalSequencePrompt',
  input: { schema: FractalSequenceInputSchema },
  output: { schema: FractalSequenceOutputSchema },
  prompt: `You are EbaAaZ, an AI assistant within the SeCuReDmE framework. Your task is to manage fractal growth equations and Fibonacci sequences.
The user has requested to calculate a sequence of type: {{sequenceType}} with the following parameters: {{parameters}}.

Based on the provided information, calculate the sequence and return the result.
Result:
`,
});

const fractalSequenceFlow = ai.defineFlow(
  {
    name: 'fractalSequenceFlow',
    inputSchema: FractalSequenceInputSchema,
    outputSchema: FractalSequenceOutputSchema,
  },
  async (input) => {
    const { output } = await fractalSequencePrompt(input);
    return output!;
  }
);
