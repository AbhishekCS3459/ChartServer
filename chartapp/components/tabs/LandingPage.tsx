
'use client';
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart2, Zap, Shield } from 'lucide-react'
import Link from 'next/link'
import { NavigationBar } from "./NavigationBar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavigationBar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Track Your Energy, Save the Planet</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">EnergyTrack helps you monitor and optimize your energy consumption, reducing costs and environmental impact.</p>
          <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white">
            <Link href="/signup">Get Started <ArrowRight className="ml-2" /></Link>
          </Button>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose EnergyTrack?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<BarChart2 size={40} />}
              title="Real-time Monitoring"
              description="Track your energy usage in real-time with intuitive dashboards and reports."
            />
            <FeatureCard 
              icon={<Zap size={40} />}
              title="Smart Insights"
              description="Get AI-powered recommendations to optimize your energy consumption patterns."
            />
            <FeatureCard 
              icon={<Shield size={40} />}
              title="Secure & Private"
              description="Your data is protected with industry-leading security measures and encryption."
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Reduce Your Energy Footprint?</h2>
          <p className="text-xl mb-8">Join thousands of users who are making a difference with EnergyTrack.</p>
          <Button asChild size="lg" variant="outline" className="bg-white text-green-500 hover:bg-gray-100">
            <Link href="/signup">Start Your Free Trial</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">EnergyTrack</h3>
              <p className="text-sm">Empowering you to make sustainable energy choices.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/features" className="hover:underline">Features</Link></li>
                <li><Link href="/pricing" className="hover:underline">Pricing</Link></li>
                <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:underline">About Us</Link></li>
                <li><Link href="/blog" className="hover:underline">Blog</Link></li>
                <li><Link href="/careers" className="hover:underline">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
                <li><Link href="https://twitter.com/energytrack" className="hover:underline">Twitter</Link></li>
                <li><Link href="https://linkedin.com/company/energytrack" className="hover:underline">LinkedIn</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} EnergyTrack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="text-green-500 mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}