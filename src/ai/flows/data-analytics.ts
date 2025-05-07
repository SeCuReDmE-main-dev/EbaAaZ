'use server';

/**
 * @fileOverview Data Analytics Hub for EbaAaZ.
 *
 * - performDataAnalysis - A function to perform data analysis on the databases managed by EbaAaZ.
 * - generateInsights - A function to generate insights and reports based on the data.
 * - integrateWithAIModels - A function to integrate data analytics with existing AI models.
 */

import { ai } from '@/ai/ai-instance';
import { z } from 'genkit';

const DataAnalysisInputSchema = z.object({
  database: z.string().describe('The name of the database to analyze.'),
  query: z.string().describe('The query to perform data analysis.'),
});
export type DataAnalysisInput = z.infer<typeof DataAnalysisInputSchema>;

const DataAnalysisOutputSchema = z.object({
  results: z.array(z.any()).describe('The results of the data analysis.'),
});
export type DataAnalysisOutput = z.infer<typeof DataAnalysisOutputSchema>;

export const performDataAnalysis = async (input: DataAnalysisInput): Promise<DataAnalysisOutput> => {
  return dataAnalysisFlow(input);
}

const dataAnalysisPrompt = ai.definePrompt({
  name: 'dataAnalysisPrompt',
  input: { schema: DataAnalysisInputSchema },
  output: { schema: DataAnalysisOutputSchema },
  prompt: `You are EbaAaZ, an AI assistant within the SeCuReDmE framework. Your task is to perform data analysis on the specified database using the provided query.
Database: {{{database}}}
Query: {{{query}}}
Perform the data analysis and return the results.
`,
});

const dataAnalysisFlow = ai.defineFlow(
  {
    name: 'dataAnalysisFlow',
    inputSchema: DataAnalysisInputSchema,
    outputSchema: DataAnalysisOutputSchema,
  },
  async (input) => {
    const { output } = await dataAnalysisPrompt(input);
    return output!;
  }
);

const InsightsInputSchema = z.object({
  analysisResults: z.array(z.any()).describe('The results of the data analysis.'),
});
export type InsightsInput = z.infer<typeof InsightsInputSchema>;

const InsightsOutputSchema = z.object({
  insights: z.array(z.string()).describe('The generated insights and reports.'),
});
export type InsightsOutput = z.infer<typeof InsightsOutputSchema>;

export const generateInsights = async (input: InsightsInput): Promise<InsightsOutput> => {
  return insightsFlow(input);
}

const insightsPrompt = ai.definePrompt({
  name: 'insightsPrompt',
  input: { schema: InsightsInputSchema },
  output: { schema: InsightsOutputSchema },
  prompt: `You are EbaAaZ, an AI assistant within the SeCuReDmE framework. Your task is to generate insights and reports based on the provided data analysis results.
Analysis Results: {{{analysisResults}}}
Generate insights and reports based on the analysis results.
`,
});

const insightsFlow = ai.defineFlow(
  {
    name: 'insightsFlow',
    inputSchema: InsightsInputSchema,
    outputSchema: InsightsOutputSchema,
  },
  async (input) => {
    const { output } = await insightsPrompt(input);
    return output!;
  }
);

const AIIntegrationInputSchema = z.object({
  insights: z.array(z.string()).describe('The generated insights and reports.'),
});
export type AIIntegrationInput = z.infer<typeof AIIntegrationInputSchema>;

const AIIntegrationOutputSchema = z.object({
  success: z.boolean().describe('Indicates whether the integration was successful.'),
});
export type AIIntegrationOutput = z.infer<typeof AIIntegrationOutputSchema>;

export const integrateWithAIModels = async (input: AIIntegrationInput): Promise<AIIntegrationOutput> => {
  return aiIntegrationFlow(input);
}

const aiIntegrationPrompt = ai.definePrompt({
  name: 'aiIntegrationPrompt',
  input: { schema: AIIntegrationInputSchema },
  output: { schema: AIIntegrationOutputSchema },
  prompt: `You are EbaAaZ, an AI assistant within the SeCuReDmE framework. Your task is to integrate the generated insights and reports with existing AI models.
Insights: {{{insights}}}
Integrate the insights with the AI models and indicate whether the integration was successful.
`,
});

const aiIntegrationFlow = ai.defineFlow(
  {
    name: 'aiIntegrationFlow',
    inputSchema: AIIntegrationInputSchema,
    outputSchema: AIIntegrationOutputSchema,
  },
  async (input) => {
    const { output } = await aiIntegrationPrompt(input);
    return output!;
  }
);
