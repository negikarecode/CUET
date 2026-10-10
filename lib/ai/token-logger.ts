/**
 * CUET AI-Prep Token & Cost Logger
 * Tracks token usage, latency, and estimated costs per feature and per user.
 * Supports in-memory caching + local storage persistence on client.
 */

export interface TokenUsageLog {
  id: string;
  timestamp: string;
  userId: string;
  feature: "why_wrong" | "repair_quiz" | "doubt_solver" | "cycle_narrative" | "weekly_report" | "subject_radar";
  model: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  estimatedCostUsd: number;
  latencyMs: number;
  cached: boolean;
  success: boolean;
}

// Approximate pricing per 1M tokens (USD)
const MODEL_PRICING: Record<string, { prompt: number; completion: number }> = {
  "llama-3.1-8b-instant": { prompt: 0.05, completion: 0.08 },
  "llama-3.3-70b-versatile": { prompt: 0.59, completion: 0.79 },
  "gemini-1.5-flash": { prompt: 0.075, completion: 0.30 },
  "gemini-1.5-pro": { prompt: 1.25, completion: 5.00 },
  "default-cheap": { prompt: 0.10, completion: 0.20 },
};

class TokenLogger {
  private logs: TokenUsageLog[] = [];

  constructor() {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("cuet_ai_token_logs");
        if (stored) {
          this.logs = JSON.parse(stored);
        }
      } catch (e) {
        // Ignore localStorage error
      }
    }
  }

  logUsage(params: {
    userId: string;
    feature: TokenUsageLog["feature"];
    model: string;
    promptTokens: number;
    completionTokens: number;
    latencyMs: number;
    cached?: boolean;
    success?: boolean;
  }): TokenUsageLog {
    const { userId, feature, model, promptTokens, completionTokens, latencyMs, cached = false, success = true } = params;
    const pricing = MODEL_PRICING[model] || MODEL_PRICING["default-cheap"] || { prompt: 0.05, completion: 0.1 };
    const promptCost = (promptTokens / 1_000_000) * pricing.prompt;
    const completionCost = (completionTokens / 1_000_000) * pricing.completion;
    const estimatedCostUsd = cached ? 0 : Number((promptCost + completionCost).toFixed(6));

    const entry: TokenUsageLog = {
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      userId,
      feature,
      model,
      promptTokens,
      completionTokens,
      totalTokens: promptTokens + completionTokens,
      estimatedCostUsd,
      latencyMs,
      cached,
      success,
    };

    this.logs.unshift(entry);
    // Keep last 500 logs
    if (this.logs.length > 500) {
      this.logs = this.logs.slice(0, 500);
    }

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("cuet_ai_token_logs", JSON.stringify(this.logs));
      } catch (e) {
        // Ignore quota errors
      }
    }

    return entry;
  }

  getLogs(userId?: string): TokenUsageLog[] {
    if (userId) {
      return this.logs.filter((l) => l.userId === userId);
    }
    return this.logs;
  }

  getSummary(userId?: string): {
    totalCalls: number;
    totalTokens: number;
    totalCostUsd: number;
    cacheHitRate: number;
    byFeature: Record<string, { calls: number; cost: number }>;
  } {
    const list = this.getLogs(userId);
    const totalCalls = list.length;
    let totalTokens = 0;
    let totalCostUsd = 0;
    let cachedCalls = 0;
    const byFeature: Record<string, { calls: number; cost: number }> = {};

    for (const log of list) {
      totalTokens += log.totalTokens;
      totalCostUsd += log.estimatedCostUsd;
      if (log.cached) cachedCalls++;

      const feat = byFeature[log.feature] || { calls: 0, cost: 0 };
      feat.calls++;
      feat.cost += log.estimatedCostUsd;
      byFeature[log.feature] = feat;
    }

    const cacheHitRate = totalCalls > 0 ? Math.round((cachedCalls / totalCalls) * 100) : 0;

    return {
      totalCalls,
      totalTokens,
      totalCostUsd: Number(totalCostUsd.toFixed(4)),
      cacheHitRate,
      byFeature,
    };
  }

  clearLogs(): void {
    this.logs = [];
    if (typeof window !== "undefined") {
      localStorage.removeItem("cuet_ai_token_logs");
    }
  }
}

export const tokenLogger = new TokenLogger();
