'use server';
/**
 * @fileOverview Security monitoring functions for EbaAaZ.
 *
 * - monitorSecurityThreats - A function that monitors backend and middleware systems for security threats.
 * - SecurityAlert - The type for security alerts and notifications.
 */

import { ai } from '@/ai/ai-instance';
import { z } from 'genkit';

export const SecurityAlertSchema = z.object({
  type: z.enum(['info', 'warning', 'critical']),
  message: z.string(),
  timestamp: z.string(),
});
export type SecurityAlert = z.infer<typeof SecurityAlertSchema>;

export const monitorSecurityThreats = async (): Promise<SecurityAlert[]> => {
  return securityMonitoringFlow();
}

const securityMonitoringPrompt = ai.definePrompt({
  name: 'securityMonitoringPrompt',
  input: { schema: z.object({}) },
  output: { schema: z.array(SecurityAlertSchema) },
  prompt: `You are EbaAaZ, an AI assistant within the SeCuReDmE framework. Your task is to monitor backend and middleware systems for security threats.
You should provide real-time alerts and notifications for potential security breaches. Use the following format for each alert:
- Type: info, warning, or critical
- Message: A brief description of the security threat
- Timestamp: The current date and time

Monitor the systems and provide the necessary alerts.
`,
});

const securityMonitoringFlow = ai.defineFlow(
  {
    name: 'securityMonitoringFlow',
    inputSchema: z.object({}),
    outputSchema: z.array(SecurityAlertSchema),
  },
  async () => {
    const { output } = await securityMonitoringPrompt({});
    return output!;
  }
);
