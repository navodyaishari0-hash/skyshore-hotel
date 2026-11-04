'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, MessageCircle } from 'lucide-react';

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

const KEYWORD_RESPONSES: Record<string, string> = {
  villa: `Thanks for your interest in Skyshore. Current villa details, capacity and availability are confirmed by the host. Share your preferred dates through the booking form or contact us directly.`,
  room: `Current villa details and availability are confirmed by the host. Share your preferred dates through the booking form or contact us directly.`,
  availability: `Choose your dates in the availability form to start a booking request. The host can confirm current availability.`,
  facility: `Facilities and amenities are being confirmed. Please contact the host with the details you would like to check.`,
  facilit: `Facilities and amenities are being confirmed. Please contact the host with the details you would like to check.`,
  contact: `Contact Skyshore on WhatsApp at +94 77 396 4515 or by email at dishanrandika0@gmail.com.`,
  restaurant: `Dining style, menu and service availability are confirmed by the host. Ask us about Sri Lankan cuisine, fresh produce, seafood, breakfast, tea and coffee.`,
  meal: `Menu details are not confirmed yet. Contact the host to ask about Sri Lankan dishes, breakfast, seafood and other options.`,
  breakfast: `Breakfast availability and menu details are confirmed by the host. Please contact us with your dates and preferences.`,
  price: `Current villa rates are confirmed directly by the host. Send your preferred dates through the booking form to request a quote.`,
  checkout: `Check-in and check-out times are confirmed with each reservation. Please contact the host before planning your arrival.`,
  experience: `Local experiences, travel times and availability depend on your dates and location. Ask the host about beaches, nature, culture and local tours.`,
  nearby: `Nearby places and travel times are being confirmed. Contact the host with your interests and we can help check current options.`,
  airport: `Airport transfer availability and journey time are confirmed directly with the host. Please share your arrival details using the contact form.`,
  transfer: `Airport transfer availability and journey time are confirmed directly with the host. Please share your arrival details using the contact form.`,
};

const suggestions = ['Find a villa', 'Check availability', 'Facilities', 'Nearby places', 'Dining', 'Airport transfer', 'Contact reception'];

const DEFAULT_RESPONSE =
  "Thank you for your question! Our hosts will be happy to assist you. Reach us on WhatsApp at +94 77 396 4515 or use the contact form on our website.";

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [keyword, response] of Object.entries(KEYWORD_RESPONSES)) {
    if (lower.includes(keyword)) return response;
  }
  return DEFAULT_RESPONSE;
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 px-4 pb-3">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center bg-primary/15">
        <Bot className="h-3.5 w-3.5 text-primary" />
      </div>
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-white/5 px-4 py-3">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block h-1.5 w-1.5 rounded-full bg-gray-400"
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function ChatWidget({ isOpen, onClose }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: 'Welcome to Skyshore. How may I help you plan your stay?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: trimmed,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: getBotResponse(trimmed),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 500);
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-end bg-black/40 p-4 backdrop-blur-sm sm:items-end sm:justify-end sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="flex max-h-[min(680px,calc(100dvh-2rem))] w-full max-w-[400px] flex-col overflow-hidden border border-white/10 bg-[#18392F] shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring' as const, damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/10 bg-[#142B24]/60 px-4 py-3">
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center bg-primary">
                <Bot className="h-5 w-5 text-secondary" />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 border-2 border-secondary bg-[#A8B8A0]" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-white">Skyshore Concierge</h3>
                <p className="text-[10px] text-white/55">Automated guide · details confirmed by host</p>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="min-h-0 flex-1 space-y-1 overflow-y-auto px-4 py-4" style={{ maxHeight: '400px' }}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'bot' && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15">
                      <Bot className="h-3.5 w-3.5 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'rounded-br-sm bg-primary text-[#142B24]'
                        : 'rounded-bl-sm bg-white/5 text-gray-200'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                    <p
                      className={`mt-1 text-[10px] ${
                        msg.sender === 'user' ? 'text-[#142B24]/50' : 'text-gray-500'
                      }`}
                    >
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {msg.sender === 'user' && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/20">
                      <MessageCircle className="h-3.5 w-3.5 text-primary" />
                    </div>
                  )}
                </div>
              ))}
              {isTyping && <TypingIndicator />}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-3">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => setInput(suggestion)}
                      className="border border-white/15 px-3 py-2 text-left text-[11px] text-white/75 transition-colors hover:border-primary/70 hover:text-white"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-white/10 bg-[#142B24]/40 px-4 py-3">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about your stay..."
                  className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-primary/50 focus:ring-1 focus:ring-[#C8A951]/30"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-[#142B24] transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
