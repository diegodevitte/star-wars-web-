'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AppShell } from '@/components/shell/app-shell';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Send, Bot, User, Loader2, Home, Users, Globe, Rocket } from 'lucide-react';
import { chatApi, ApiError } from '@/lib/api-client';
import { ChatRequest, Message, MessageBubbleProps, SuggestedQuestionProps } from '@/lib/types';

const MessageBubble = ({ message }: MessageBubbleProps) => {
    const isUser = message.role === 'user';

    const getSourceIcon = (type: string) => {
        switch (type.toLowerCase()) {
            case 'people': return Users;
            case 'planets': return Globe;
            case 'starships': return Rocket;
            case 'vehicles': return Rocket;
            default: return Home;
        }
    };

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
            <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} max-w-[80%] space-x-3`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${isUser
                    ? 'bg-gradient-to-br from-[#60A5FA] to-[#2DD4BF]'
                    : 'bg-gradient-to-br from-[#F87171] to-[#EF4444]'
                    }`}>
                    {isUser ? (
                        <User className="w-5 h-5 text-white" />
                    ) : (
                        <Bot className="w-5 h-5 text-white" />
                    )}
                </div>

                <div className={`flex-1 ${isUser ? 'mr-3' : 'ml-3'}`}>
                    <Card className={`p-4 ${isUser
                        ? 'bg-gradient-to-br from-[#60A5FA]/20 to-[#2DD4BF]/10 border-[#60A5FA]/30'
                        : 'card-galactic'
                        }`}>
                        <div className="prose prose-invert max-w-none">
                            <p className="text-[#E5E7EB] text-sm leading-relaxed whitespace-pre-wrap">
                                {message.content}
                            </p>
                        </div>

                        {message.actions && message.actions.length > 0 && (
                            <div className="mt-4 space-y-2">
                                <h4 className="text-sm font-medium text-[#94A3B8] flex items-center">
                                    <MessageSquare className="w-4 h-4 mr-2" />
                                    Actions Taken:
                                </h4>
                                {message.actions.map((action, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                        {action.tool}: {typeof action.input === 'object' ? JSON.stringify(action.input) : action.input}
                                    </Badge>
                                ))}
                            </div>
                        )}

                        {message.sources && message.sources.length > 0 && (
                            <div className="mt-4 space-y-2">
                                <h4 className="text-sm font-medium text-[#94A3B8] flex items-center">
                                    <Globe className="w-4 h-4 mr-2" />
                                    Sources:
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {message.sources.map((source, index) => {
                                        const SourceIcon = getSourceIcon(source.type);
                                        return (
                                            <Badge key={index} variant="secondary" className="text-xs flex items-center space-x-1">
                                                <SourceIcon className="w-3 h-3" />
                                                <span>{source.name || source.type}</span>
                                                {source.id && <span>(#{source.id})</span>}
                                            </Badge>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </Card>

                    <div className={`text-xs text-[#6B7280] mt-2 ${isUser ? 'text-right' : 'text-left'}`}>
                        {message.timestamp.toLocaleTimeString()}
                    </div>
                </div>
            </div>
        </div>
    );
}

const SuggestedQuestion = ({ question, onClick }: SuggestedQuestionProps) => {
    return (
        <Button
            variant="outline"
            size="sm"
            onClick={() => onClick(question)}
            className="text-left h-auto p-3 whitespace-normal text-[#94A3B8] hover:text-[#E5E7EB] hover:border-[#60A5FA] transition-colors"
        >
            {question}
        </Button>
    );
}

const SUGGESTED_QUESTIONS = [
    "Tell me about Luke Skywalker",
    "What planets are featured in Star Wars?",
    "Show me information about the Millennium Falcon",
    "Who are the main characters in the original trilogy?",
    "What vehicles are used in the Battle of Hoth?",
    "Compare Tatooine and Alderaan",
    "List all Death Star appearances",
    "Tell me about Imperial starship classes"
];

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        setMessages([{
            id: '0',
            role: 'assistant',
            content: 'Welcome to the Galactic Console AI! I can help you explore the Star Wars universe. Ask me about characters, planets, starships, vehicles, or anything else from the galaxy far, far away.',
            timestamp: new Date(),
        }]);
    }, []);

    const sendMessage = async (messageContent: string) => {
        if (!messageContent.trim() || loading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: messageContent.trim(),
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);
        setError(null);

        try {
            const request: ChatRequest = {
                message: messageContent.trim(),
                sessionId: `session_${Date.now()}`
            };

            const response = await chatApi.sendMessage(request);

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response.reply,
                timestamp: new Date(),
                actions: response.actions,
                sources: response.sources,
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (err) {
            let errorMessage = 'Failed to send message. Please try again.';

            if (err instanceof ApiError) {
                errorMessage = err.message;
            }

            const errorAssistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: `Sorry, I encountered an error: ${errorMessage}`,
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, errorAssistantMessage]);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(input);
    };

    const handleSuggestedQuestion = (question: string) => {
        sendMessage(question);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <AppShell title="AI Chat">
            <div className="flex flex-col h-[calc(100vh-12rem)] sm:h-[calc(100vh-10rem)]">
                <div className="mb-4 sm:mb-6 flex-shrink-0">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#E5E7EB] mb-2 flex items-center">
                        <Bot className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-[#60A5FA]" />
                        Galactic AI Assistant
                    </h2>
                    <p className="text-sm sm:text-base text-[#94A3B8]">
                        Ask me anything about the Star Wars universe - characters, planets, starships, and more!
                    </p>
                </div>

                <div className="flex-1 overflow-y-auto mb-4 sm:mb-6 space-y-4">
                    {messages.map((message) => (
                        <MessageBubble key={message.id} message={message} />
                    ))}

                    {loading && (
                        <div className="flex justify-start">
                            <div className="flex max-w-[80%] space-x-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F87171] to-[#EF4444] flex items-center justify-center">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                                <Card className="card-galactic p-4 ml-3">
                                    <div className="flex items-center space-x-2 text-[#94A3B8]">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span className="text-sm">AI is thinking...</span>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {messages.length <= 1 && (
                    <div className="mb-4 sm:mb-6 flex-shrink-0">
                        <h3 className="text-sm font-medium text-[#94A3B8] mb-3">Suggested Questions:</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {SUGGESTED_QUESTIONS.map((question, index) => (
                                <SuggestedQuestion
                                    key={index}
                                    question={question}
                                    onClick={handleSuggestedQuestion}
                                />
                            ))}
                        </div>
                    </div>
                )}

                <Card className="card-galactic p-3 sm:p-4 flex-shrink-0">
                    <form onSubmit={handleSubmit}>
                        <div className="flex space-x-2 sm:space-x-3">
                            <div className="flex-1">
                                <Input
                                    ref={inputRef}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Ask me about the Star Wars universe..."
                                    className="w-full"
                                    disabled={loading}
                                />
                            </div>
                            <Button
                                type="submit"
                                disabled={loading || !input.trim()}
                                className="bg-[#60A5FA] hover:bg-[#3B82F6] text-[#0B1020] flex items-center space-x-2"
                            >
                                {loading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Send className="w-4 h-4" />
                                )}
                                <span className="hidden sm:inline">Send</span>
                            </Button>
                        </div>
                    </form>

                    {error && (
                        <div className="mt-2 text-sm text-red-400">
                            {error}
                        </div>
                    )}
                </Card>
            </div>
        </AppShell>
    );
}