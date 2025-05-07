'use client';

import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Send, Bot, User, Loader2, File, Mic, MicOff, Settings, Star, Globe, MessageCircle, ThumbsUp, ThumbsDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { generateEbaazChatResponse, type EbaazChatInput } from '@/ai/flows/ebaaz-chat-flow';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface EbaazChatSpaceProps {
  onClose: () => void;
  context?: string; // Context about the current page/user
}

export const EbaazChatSpace: React.FC<EbaazChatSpaceProps> = ({ onClose, context }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceInput, setIsVoiceInput] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [feedback, setFeedback] = useState<{ [key: string]: 'up' | 'down' | null }>({});
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (context) {
      const initialBotMessage: Message = {
        id: Date.now().toString() + 'init',
        text: "Hello! I'm EbaAaZ, your AI assistant. How can I help you today based on your current context?",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages([initialBotMessage]);
    }
  }, [context]);

  const handleSendMessage = async (e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString() + 'user',
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chatInput: EbaazChatInput = {
        query: userMessage.text,
        context: context || "User is interacting with EbaAaZ chat without specific page context.",
        history: messages.map(msg => ({ role: msg.sender, text: msg.text })) // Basic history
      };
      const response = await generateEbaazChatResponse(chatInput);
      const botMessageText = response.answer;

      const botMessage: Message = {
        id: Date.now().toString() + 'bot',
        text: botMessageText,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error generating EbaAaZ chat response:', error);
      const errorMessage: Message = {
        id: Date.now().toString() + 'error',
        text: 'Sorry, I encountered an error processing your request. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInputToggle = () => {
    setIsVoiceInput(!isVoiceInput);
  };

  const handleThemeToggle = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const handleFeedback = (messageId: string, type: 'up' | 'down') => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [messageId]: type,
    }));
  };

  return (
    <div className={`fixed inset-0 ${isDarkTheme ? 'bg-black/50' : 'bg-white/50'} backdrop-blur-sm flex items-center justify-center z-50 p-4 page-fade-in`}>
      <Card className={`w-full max-w-2xl h-[80vh] flex flex-col shadow-2xl ${isDarkTheme ? 'border-primary' : 'border-secondary'} text-center`}>
        <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
          <CardTitle className="text-lg font-semibold flex items-center text-center w-full justify-center">
            <Bot className="mr-2 h-6 w-6 text-primary" />
            EbaAaZ Chat
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={handleVoiceInputToggle} aria-label="Toggle voice input">
              {isVoiceInput ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={handleThemeToggle} aria-label="Toggle theme">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close chat">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-0 overflow-hidden">
          <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    'flex items-end gap-2 max-w-[85%]',
                    msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                  )}
                >
                  {msg.sender === 'bot' && <Bot className="h-6 w-6 text-primary flex-shrink-0 mb-1" />}
                  {msg.sender === 'user' && <User className="h-6 w-6 text-secondary-foreground flex-shrink-0 mb-1" />}
                  <div
                    className={cn(
                      'p-3 rounded-lg shadow text-left',
                      msg.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    <p className="text-xs opacity-70 mt-1 text-right">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    {msg.sender === 'bot' && (
                      <div className="flex justify-end space-x-1 mt-1">
                        <Button variant="ghost" size="icon" onClick={() => handleFeedback(msg.id, 'up')} aria-label="Thumbs up">
                          <ThumbsUp className={`h-4 w-4 ${feedback[msg.id] === 'up' ? 'text-green-500' : 'text-muted-foreground'}`} />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleFeedback(msg.id, 'down')} aria-label="Thumbs down">
                          <ThumbsDown className={`h-4 w-4 ${feedback[msg.id] === 'down' ? 'text-red-500' : 'text-muted-foreground'}`} />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center justify-center space-x-2">
                   <Bot className="h-6 w-6 text-primary flex-shrink-0" />
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">EbaAaZ is thinking...</span>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Chat with EbaAaZ..."
              rows={1}
              className="flex-grow resize-none min-h-[40px] max-h-[120px] bg-card border-input text-card-foreground focus:ring-primary text-left"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !input.trim()} size="icon" aria-label="Send message">
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};
