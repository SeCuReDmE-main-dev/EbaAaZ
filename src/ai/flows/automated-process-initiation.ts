'use server';

/**
 * @fileOverview Automated Process Initiation for EbaAaZ.
 *
 * - initiateAutomatedProcess - A function to initiate automated processes.
 * - AutomatedProcessInput - The input type for the initiateAutomatedProcess function.
 * - AutomatedProcessOutput - The return type for the initiateAutomatedProcess function.
 */

import { ai } from '@/ai/ai-instance';
import { z } from 'genkit';

export const AutomatedProcessInputSchema = z.object({
  processType: z.string().describe('The type of process to initiate.'),
  parameters: z.record(z.string(), z.any()).describe('Parameters for the process initiation.'),
});
export type AutomatedProcessInput = z.infer<typeof AutomatedProcessInputSchema>;

export const AutomatedProcessOutputSchema = z.object({
  success: z.boolean().describe('Indicates whether the process initiation was successful.'),
  message: z.string().optional().describe('Optional message providing additional information.'),
});
export type AutomatedProcessOutput = z.infer<typeof AutomatedProcessOutputSchema>;

export const initiateAutomatedProcess = async (input: AutomatedProcessInput): Promise<AutomatedProcessOutput> => {
  return automatedProcessFlow(input);
}

const automatedProcessPrompt = ai.definePrompt({
  name: 'automatedProcessPrompt',
  input: { schema: AutomatedProcessInputSchema },
  output: { schema: AutomatedProcessOutputSchema },
  prompt: `You are EbaAaZ, an AI assistant within the SeCuReDmE framework. Your task is to initiate automated processes based on the provided process type and parameters.
Process Type: {{{processType}}}
Parameters: {{{parameters}}}
Initiate the automated process and indicate whether it was successful. Provide an optional message if necessary.
`,
});

const automatedProcessFlow = ai.defineFlow(
  {
    name: 'automatedProcessFlow',
    inputSchema: AutomatedProcessInputSchema,
    outputSchema: AutomatedProcessOutputSchema,
  },
  async (input) => {
    const { output } = await automatedProcessPrompt(input);
    return output!;
  }
);
