import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const UserFeedback = () => {
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!feedback.trim()) {
      toast({
        title: 'Feedback Required',
        description: 'Please provide your feedback before submitting.',
        variant: 'destructive',
      });
      return;
    }

    // Simulate feedback submission
    setTimeout(() => {
      toast({
        title: 'Feedback Submitted',
        description: 'Thank you for your feedback!',
        variant: 'default',
      });
      setFeedback('');
      setEmail('');
    }, 1000);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg border-primary text-left mt-8">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-semibold" style={{ color: 'var(--primary-foreground)' }}>
          User Feedback
        </CardTitle>
        <CardDescription style={{ color: 'var(--muted-foreground)' }} className="text-center">
          We value your feedback. Please share your thoughts and suggestions with us.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="email" className="text-sm font-medium text-left block mb-1">Email (optional)</label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="bg-card border-input text-card-foreground focus:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="feedback" className="text-sm font-medium text-left block mb-1">Feedback</label>
          <Textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Enter your feedback"
            rows={4}
            className="bg-card border-input text-card-foreground focus:ring-primary"
          />
        </div>
        <div className="flex justify-center mt-4">
          <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Submit Feedback
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserFeedback;
