'use client';

import { useState } from 'react';
import ChatInterface from './ChatInterface';

export default function HomePage() {
  const [showChat, setShowChat] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Hero Section with Central Chat Button */}
      <section className="relative min-h-[80vh] flex items-center justify-center px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[500px] h-[500px] bg-blue-100/50 rounded-full -top-48 -right-24 blur-3xl"></div>
          <div className="absolute w-[500px] h-[500px] bg-blue-100/50 rounded-full -bottom-48 -left-24 blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-gray-900">
            Legal <span className="text-blue-600">Saathi</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Your AI-powered legal assistant for Indian law. Get instant guidance on your legal matters.
          </p>
          
          {/* Central Chat Button */}
          <button
            onClick={() => setShowChat(true)}
            className="group relative bg-blue-600 text-white px-8 py-4 rounded-2xl shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 mb-8"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">⚖️</span>
              <span className="text-lg font-semibold">Start Legal Consultation</span>
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm text-gray-500">
              Free • Instant • Confidential
            </div>
          </button>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 text-center">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-lg font-semibold mb-2">Instant Answers</h3>
              <p className="text-gray-600">Get immediate responses to your legal questions</p>
            </div>
            <div className="p-6 text-center">
              <div className="text-3xl mb-4">📚</div>
              <h3 className="text-lg font-semibold mb-2">Legal Knowledge</h3>
              <p className="text-gray-600">Access comprehensive Indian law information</p>
            </div>
            <div className="p-6 text-center">
              <div className="text-3xl mb-4">🔒</div>
              <h3 className="text-lg font-semibold mb-2">Private & Secure</h3>
              <p className="text-gray-600">Your conversations remain confidential</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="font-semibold mb-2">Ask Your Question</h3>
              <p className="text-gray-600">Describe your legal concern in simple terms</p>
            </div>
            <div className="hidden md:block text-gray-300 text-2xl">→</div>
            <div className="flex-1 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="font-semibold mb-2">AI Analysis</h3>
              <p className="text-gray-600">Our AI processes your query using Indian law</p>
            </div>
            <div className="hidden md:block text-gray-300 text-2xl">→</div>
            <div className="flex-1 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="font-semibold mb-2">Get Guidance</h3>
              <p className="text-gray-600">Receive clear legal advice and next steps</p>
            </div>
          </div>
        </div>
      </section>

      {/* Chat Interface */}
      {showChat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl h-[600px] relative">
            <button 
              onClick={() => setShowChat(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <ChatInterface onClose={() => setShowChat(false)} />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center text-gray-600">
          <p>© 2024 Legal Saathi • AI-Powered Legal Assistant</p>
        </div>
      </footer>
    </main>
  );
} 