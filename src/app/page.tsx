import QnA from "@/components/ui/deep-research/QnA";
import UserInput from "@/components/ui/deep-research/UserInput";
import { Sparkles, Search, BookOpen } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-start relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10 gradient-bg" />
      
      {/* Subtle grid pattern overlay */}
      <div className="fixed inset-0 -z-10 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Floating orbs for visual interest */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10 animate-pulse delay-1000" />

      {/* Header Section */}
      <div className="flex flex-col items-center gap-6 pt-20 pb-12 px-4 fade-in">
        {/* Logo/Icon */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-xl opacity-50 animate-pulse" />
          <div className="relative bg-gradient-to-br from-primary to-accent p-4 rounded-2xl shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Title */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-6xl sm:text-8xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
            DeepScope
          </h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Search className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide">AI-Powered Research Assistant</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-foreground/70 text-center max-w-[90vw] sm:max-w-[600px] text-base sm:text-lg leading-relaxed">
          Dive deep into any topic with AI-powered research. 
          <br className="hidden sm:block" />
          Get comprehensive, well-sourced reports in minutes.
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap gap-2 justify-center mt-2">
          <div className="glass px-4 py-2 rounded-full text-sm font-medium text-foreground/80 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Comprehensive Reports
          </div>
          <div className="glass px-4 py-2 rounded-full text-sm font-medium text-foreground/80 flex items-center gap-2">
            <Search className="w-4 h-4" />
            Multi-Source Analysis
          </div>
          <div className="glass px-4 py-2 rounded-full text-sm font-medium text-foreground/80 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            AI-Driven Insights
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full flex flex-col items-center gap-8 px-4 pb-20">
        <UserInput />
        <QnA />
      </div>
    </main>
  );
}