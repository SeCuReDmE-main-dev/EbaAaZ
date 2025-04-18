'use server';
/**
 * @fileOverview Generates a podcast summary from loaded data.
 *
 * - generatePodcastSummary - A function that generates the podcast summary.
 * - PodcastSummaryInput - The input type for the generatePodcastSummary function.
 * - PodcastSummaryOutput - The return type for the generatePodcastSummary function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const PodcastSummaryInputSchema = z.object({
  data: z.string().describe('The loaded data to summarize for a podcast.'),
});
export type PodcastSummaryInput = z.infer<typeof PodcastSummaryInputSchema>;

const PodcastSummaryOutputSchema = z.object({
  podcastSummary: z.string().describe('A concise and engaging podcast summary.'),
});
export type PodcastSummaryOutput = z.infer<typeof PodcastSummaryOutputSchema>;

export async function generatePodcastSummary(input: PodcastSummaryInput): Promise<PodcastSummaryOutput> {
  return podcastSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'podcastSummaryPrompt',
  input: {
    schema: z.object({
      data: z.string().describe('The loaded data to summarize for a podcast.'),
    }),
  },
  output: {
    schema: z.object({
      podcastSummary: z.string().describe('A concise and engaging podcast summary.'),
    }),
  },
  prompt: `You are an AI assistant specializing in creating podcast summaries.
  Based on the provided data, generate a concise and engaging narrative suitable for a podcast.
  Data: {{{data}}}`,
});

const podcastSummaryFlow = ai.defineFlow<
  typeof PodcastSummaryInputSchema,
  typeof PodcastSummaryOutputSchema
>({
  name: 'podcastSummaryFlow',
  inputSchema: PodcastSummaryInputSchema,
  outputSchema: PodcastSummaryOutputSchema,
},
async input => {
  const {output} = await prompt(input);
  return output!;
});
