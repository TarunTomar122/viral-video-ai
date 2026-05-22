"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("");

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h3 className="font-display text-xl font-bold text-stone-900">Integrations</h3>
        <p className="mt-1 text-sm text-stone-500">Connect your API keys for video generation</p>
      </div>

      <div className="rounded-[24px] border-2 border-stone-200 bg-white p-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎬</span>
              <div>
                <h4 className="font-display font-bold text-stone-900">Runway ML</h4>
                <p className="text-sm text-stone-500">For AI video generation</p>
              </div>
            </div>
          </div>
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">Connected</span>
        </div>
      </div>

      <div className="rounded-[24px] border-2 border-stone-200 bg-white p-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🤖</span>
              <div>
                <h4 className="font-display font-bold text-stone-900">OpenRouter</h4>
                <p className="text-sm text-stone-500">For AI script generation</p>
              </div>
            </div>
          </div>
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">Connected</span>
        </div>
      </div>

      <div className="rounded-[24px] border-2 border-stone-200 bg-white p-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">📅</span>
              <div>
                <h4 className="font-display font-bold text-stone-900">Postiz</h4>
                <p className="text-sm text-stone-500">For auto-scheduling to social platforms</p>
              </div>
            </div>
          </div>
          <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-400">Coming Soon</span>
        </div>
      </div>

      <div className="rounded-[24px] border-2 border-stone-200 bg-white p-8">
        <h4 className="font-display font-bold text-stone-900">Plan</h4>
        <div className="mt-4 flex items-center justify-between rounded-2xl bg-stone-900 p-6">
          <div>
            <p className="font-display text-lg font-bold text-white">Pro Plan</p>
            <p className="text-sm text-stone-300">120 credits remaining this month</p>
          </div>
          <span className="rounded-full bg-white/20 px-4 py-1.5 text-xs font-medium text-white">
            Active
          </span>
        </div>
      </div>
    </div>
  );
}
