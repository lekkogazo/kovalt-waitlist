'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, X } from 'lucide-react'
import { Brain, Lightning, Users, Sparkle, Target, Code, MagnifyingGlass } from 'phosphor-react'
import { ButtonRefined } from '@/components/ui/button-refined'
import { Badge } from '@/components/ui/badge'

export default function WaitlistPage() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setIsLoading(true)
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, timestamp: new Date().toISOString() })
      })
      
      if (response.ok) {
        setIsSubmitted(true)
        setShowModal(true)
        setEmail('')
      }
    } catch (error) {
      console.error('Error submitting email:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Nav */}
      <nav className="px-6 py-4 border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="font-semibold text-gray-900">Kovalt</span>
        </div>
      </nav>

      {/* Centered Hero */}
      <section className="px-6 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="outline" className="mb-8">
            <Sparkle size={12} className="mr-1.5" weight="bold" />
            Early Access Program
          </Badge>
          
          <h1 className="text-5xl lg:text-6xl font-semibold text-gray-900 mb-6 tracking-tight">
            Top 1% AI Agents,<br />
            On Your Team
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Elite AI agents that think, remember, and collaborate. Completing real work from research to content creation, 24/7.
          </p>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email"
                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:bg-white focus:border-gray-300 transition-all"
                required
              />
              <ButtonRefined type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Join Waitlist'}
                {!isLoading && <ArrowRight className="ml-2 w-4 h-4" />}
              </ButtonRefined>
              <p className="text-xs text-gray-500">
                Free during beta • No credit card required
              </p>
            </form>
          ) : (
            <div className="max-w-md mx-auto p-4 bg-gray-50/50 border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-900 font-medium flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                Successfully added to waitlist
              </p>
            </div>
          )}

          <div className="mt-12 flex flex-col items-center gap-2">
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-green-600" />
                <span>837 teams signed up</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-green-600" />
                <span>Access for selected teams</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-green-600" />
                <span>1000+ integrations</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Cards Style Features */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Top-1% Expertise Card */}
            <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 transition-all hover:bg-gray-100/50">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
                  <Target size={16} className="text-gray-900" weight="bold" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-gray-900">Top-1% Expertise</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-3">
                Trained and inspired by leading industry professionals
              </p>
            </div>

            {/* Second Brain Card */}
            <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 transition-all hover:bg-gray-100/50">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
                  <Brain size={16} className="text-gray-900" weight="bold" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-gray-900">Your Second Brain</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-3">
                Persistent memory of your goals, preferences, and history
              </p>
            </div>

            {/* Cross-Agent Collaboration Card */}
            <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 transition-all hover:bg-gray-100/50">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
                  <Users size={16} className="text-gray-900" weight="bold" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-gray-900">Cross-Agent Collaboration</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-3">
                Agents coordinate with each other to complete complex tasks
              </p>
            </div>

            {/* Natural Automations Card */}
            <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 transition-all hover:bg-gray-100/50">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
                  <Lightning size={16} className="text-gray-900" weight="bold" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-gray-900">Natural Automations</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-3">
                Set up flows in plain language, no coding or drag-and-drop required
              </p>
            </div>

            {/* Integrated From Day One Card */}
            <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 transition-all hover:bg-gray-100/50">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
                  <Code size={16} className="text-gray-900" weight="bold" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-gray-900">Integrated From Day One</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-3">
                Built-in tools and third-party integrations
              </p>
            </div>

            {/* Research & Analysis Card */}
            <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 transition-all hover:bg-gray-100/50">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
                  <MagnifyingGlass size={16} className="text-gray-900" weight="bold" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-gray-900">Research & Analysis</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-3">
                Deep research, SEO, marketing analysis, and automation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple CTA */}
      <section className="px-6 py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-12 text-center">
            <h2 className="text-3xl font-semibold text-gray-900 mb-3">
              Join the waitlist today
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Be among the first to deploy your AI workforce
            </p>
            
            <div className="max-w-md mx-auto mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex flex-col items-center">
                  <Lightning className="w-5 h-5 text-blue-600 mb-2" weight="bold" />
                  <span className="text-gray-900 font-medium">Free Beta</span>
                  <span className="text-xs text-gray-500">No card required</span>
                </div>
                <div className="flex flex-col items-center">
                  <Users className="w-5 h-5 text-green-600 mb-2" weight="bold" />
                  <span className="text-gray-900 font-medium">837 Teams</span>
                  <span className="text-xs text-gray-500">Already signed up</span>
                </div>
                <div className="flex flex-col items-center">
                  <Sparkle className="w-5 h-5 text-purple-600 mb-2" weight="bold" />
                  <span className="text-gray-900 font-medium">Ship Fast</span>
                  <span className="text-xs text-gray-500">Weekly updates</span>
                </div>
              </div>
            </div>
            
            <ButtonRefined 
              size="lg" 
              className="px-8"
              onClick={() => {
                const emailInput = document.querySelector('input[type="email"]') as HTMLElement;
                if (emailInput) {
                  emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  setTimeout(() => (emailInput as HTMLInputElement).focus(), 500);
                }
              }}
            >
              Reserve Your Spot
              <ArrowRight className="ml-2 w-4 h-4" />
            </ButtonRefined>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="text-sm text-gray-500">© 2025 Kovalt</span>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-gray-500 hover:text-gray-900">Privacy</Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-gray-900">Terms</Link>
          </div>
        </div>
      </footer>

      {/* Selection Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-2xl border border-gray-200 shadow-xl max-w-md w-full p-8 animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center border border-gray-200">
                <Check className="w-8 h-8 text-gray-900" />
              </div>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                You're on the list!
              </h3>
              
              <p className="text-gray-600 mb-6">
                Thanks for your interest in Kovalt. We're carefully selecting teams for our beta program.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700 font-medium mb-2">
                  What happens next:
                </p>
                <ul className="text-sm text-gray-600 space-y-1 text-left">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>We'll review your application</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Selected teams will receive early access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>You'll be notified within 48 hours</span>
                  </li>
                </ul>
              </div>
              
              <ButtonRefined 
                onClick={() => setShowModal(false)}
                className="w-full"
              >
                Got it
              </ButtonRefined>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
