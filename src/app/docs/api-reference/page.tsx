
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const ApiReferencePage = () => {
  return (
    <div className="container mx-auto p-4 page-fade-in text-center">
      <h1 className="text-4xl font-bold text-center mb-6" style={{ color: 'var(--primary)' }}>API Reference</h1>
      <ScrollArea className="h-[calc(100vh-200px)] w-full rounded-md border p-4 text-left">
        <Card className="w-full shadow-lg border-primary text-left">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-semibold" style={{ color: 'var(--primary-foreground)' }}>
              EbaAaZ Genkit AI Flows
            </CardTitle>
            <CardDescription style={{ color: 'var(--muted-foreground)' }}>
              This section details the available Genkit AI flows within the EbaAaZ application.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-sm" style={{ color: 'var(--muted-foreground)' }}>
            
            <section>
              <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--primary)' }}>Podcast Summary Generation</h2>
              <p className="mb-1"><strong>File:</strong> <code>src/ai/flows/podcast-summary.ts</code></p>
              
              <h3 className="text-lg font-medium my-1" style={{ color: 'var(--secondary-foreground)' }}><code>generatePodcastSummary(input: PodcastSummaryInput): Promise&lt;PodcastSummaryOutput&gt;</code></h3>
              <p>Generates a concise and engaging podcast summary from the provided data.</p>
              
              <h4 className="text-md font-medium mt-2 mb-1" style={{ color: 'var(--accent-foreground)' }}>Input: <code>PodcastSummaryInput</code></h4>
              <pre className="p-2 my-1 rounded-md bg-muted overflow-x-auto text-xs">
                <code>
{`{
  data: string; // The loaded data to summarize for a podcast.
}`}
                </code>
              </pre>

              <h4 className="text-md font-medium mt-2 mb-1" style={{ color: 'var(--accent-foreground)' }}>Output: <code>PodcastSummaryOutput</code></h4>
              <pre className="p-2 my-1 rounded-md bg-muted overflow-x-auto text-xs">
                <code>
{`{
  podcastSummary: string; // A concise and engaging podcast summary.
}`}
                </code>
              </pre>
              <p className="mt-2"><strong>Description:</strong> This flow takes a string of data as input and uses an AI prompt to create a narrative suitable for a podcast summary.</p>
            </section>

            <hr className="my-6 border-border" />

            <section>
              <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--primary)' }}>Graft-to-Code Conversion</h2>
              <p className="mb-1"><strong>File:</strong> <code>src/ai/flows/graft-to-code-conversion.ts</code></p>
              
              <h3 className="text-lg font-medium my-1" style={{ color: 'var(--secondary-foreground)' }}><code>graftToCode(input: GraftToCodeInput): Promise&lt;GraftToCodeOutput&gt;</code></h3>
              <p>Transforms a 'graft' data structure (representing application logic) into codeline.</p>
              
              <h4 className="text-md font-medium mt-2 mb-1" style={{ color: 'var(--accent-foreground)' }}>Input: <code>GraftToCodeInput</code></h4>
              <pre className="p-2 my-1 rounded-md bg-muted overflow-x-auto text-xs">
                <code>
{`{
  graft: string; // A data structure representing the desired application logic.
  format?: string; // Optional: The desired output format (e.g., TypeScript, Python). Defaults to TypeScript.
}`}
                </code>
              </pre>

              <h4 className="text-md font-medium mt-2 mb-1" style={{ color: 'var(--accent-foreground)' }}>Output: <code>GraftToCodeOutput</code></h4>
              <pre className="p-2 my-1 rounded-md bg-muted overflow-x-auto text-xs">
                <code>
{`{
  codeline: string; // The generated codeline representing the application logic.
}`}
                </code>
              </pre>
              <p className="mt-2"><strong>Description:</strong> This flow converts a conceptual "graft" into actual programming code. The user can specify the desired output language.</p>
            </section>
            
            {/* Add more API/flow references here as they are developed */}

          </CardContent>
        </Card>
      </ScrollArea>
    </div>
  );
};

export default ApiReferencePage;
