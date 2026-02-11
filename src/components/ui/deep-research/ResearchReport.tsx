"use client";
import { useDeepResearchStore } from "@/store/deepResearch";
import React, { ComponentPropsWithRef } from "react";
import { Card } from "../card";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Prism as SyntaxHighlighter,
  SyntaxHighlighterProps,
} from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Download, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "../button";

type CodeProps = ComponentPropsWithRef<"code"> & {
  inline?: boolean;
};

const ResearchReport = () => {
  const { report, isCompleted, isLoading, topic } = useDeepResearchStore();

  // Helper function to extract content safely
  const extractReportContent = (reportText: string) => {
    const reportMatch = reportText.match(/<report>([\s\S]*?)<\/report>/);
    return reportMatch ? reportMatch[1].trim() : reportText;
  };

  const handleMarkdownDownload = () => {
    const content = extractReportContent(report);
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${topic}-research-report.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isCompleted) return null;

  if (report.length <= 0 && isLoading) {
    return (
      <Card className="glass max-w-[90vw] sm:max-w-[600px] p-8 rounded-2xl border-0 shadow-xl fade-in">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
            <div className="relative animate-spin rounded-full h-12 w-12 border-4 border-primary/20 border-t-primary" />
          </div>
          <div className="text-center space-y-2">
            <p className="font-semibold text-foreground">Researching your topic...</p>
            <p className="text-sm text-muted-foreground">This may take a few moments</p>
          </div>
        </div>
      </Card>
    );
  }

  if (report.length <= 0) return null;

  const reportContent = extractReportContent(report);

  return (
    <Card className="glass max-w-[90vw] xl:max-w-[900px] relative rounded-2xl border-0 shadow-2xl fade-in">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-primary to-accent p-6 rounded-t-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Research Report</h2>
              <p className="text-white/80 text-sm">{topic}</p>
            </div>
          </div>
          <Button
            size="sm"
            variant="secondary"
            className="flex items-center gap-2 rounded-lg bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm"
            onClick={handleMarkdownDownload}
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download</span>
          </Button>
        </div>
      </div>

      {/* Success indicator */}
      <div className="px-6 py-4 border-b border-border/50 bg-accent/5">
        <div className="flex items-center gap-2 text-sm text-accent">
          <CheckCircle2 className="w-4 h-4" />
          <span className="font-medium">Report generated successfully</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        <div className="prose prose-sm sm:prose-base max-w-none 
          prose-headings:font-bold prose-headings:text-foreground
          prose-p:text-foreground/80 prose-p:leading-relaxed
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-strong:text-foreground prose-strong:font-semibold
          prose-code:text-primary prose-code:bg-primary/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
          prose-pre:bg-muted prose-pre:border prose-pre:border-border
          prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-1
          prose-li:text-foreground/80
        ">
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ className, children, inline, ...props }: CodeProps) {
                const match = /language-(\w+)/.exec(className || "");
                const language = match ? match[1] : "";

                if (!inline && language) {
                  const SyntaxHighlighterProps: SyntaxHighlighterProps = {
                    style: nightOwl,
                    language,
                    PreTag: "div",
                    children: String(children).replace(/\n$/, ""),
                  };

                  return <SyntaxHighlighter {...SyntaxHighlighterProps} />;
                }

                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {reportContent}
          </Markdown>
        </div>
      </div>
    </Card>
  );
};

export default ResearchReport;