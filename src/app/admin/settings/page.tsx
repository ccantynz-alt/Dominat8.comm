"use client";

import React, { useEffect, useState } from "react";

type Settings = {
  defaultProjectId: string;
  debugMode: boolean;
  autoPublish: boolean;
  agentConcurrency: number;
  notificationsEnabled: boolean;
  theme: "dark" | "system";
};

const DEFAULT_SETTINGS: Settings = {
  defaultProjectId: "",
  debugMode: false,
  autoPublish: false,
  agentConcurrency: 3,
  notificationsEnabled: true,
  theme: "dark",
};

export default function AdminSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("d8:settings");
    if (stored) {
      try {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(stored) });
      } catch {}
    }
  }, []);

  function update<K extends keyof Settings>(key: K, value: Settings[K]) {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  function handleSave() {
    setSaving(true);
    localStorage.setItem("d8:settings", JSON.stringify(settings));
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 300);
  }

  function handleReset() {
    if (!confirm("Reset all settings to defaults?")) return;
    setSettings(DEFAULT_SETTINGS);
    localStorage.removeItem("d8:settings");
    setSaved(false);
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-semibold tracking-wide text-white/60">SETTINGS</div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-2 text-sm text-white/60">
          Configure your workspace preferences and feature toggles.
        </p>
      </div>

      <div className="max-w-2xl space-y-4">
        {/* Workspace */}
        <div className="rounded-3xl border border-white/10 bg-black/30 p-6 space-y-5">
          <div className="text-sm font-semibold">Workspace</div>

          <div>
            <label className="block text-sm text-white/70 mb-1.5">Default Project ID</label>
            <input
              type="text"
              value={settings.defaultProjectId}
              onChange={(e) => update("defaultProjectId", e.target.value)}
              placeholder="proj_..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/50"
            />
            <p className="mt-1 text-xs text-white/40">Used as the default when creating new runs or videos.</p>
          </div>

          <div>
            <label className="block text-sm text-white/70 mb-1.5">Agent Concurrency</label>
            <input
              type="number"
              value={settings.agentConcurrency}
              onChange={(e) => update("agentConcurrency", Math.max(1, Math.min(10, Number(e.target.value))))}
              min={1}
              max={10}
              className="w-32 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/50"
            />
            <p className="mt-1 text-xs text-white/40">Max concurrent agent runs (1-10).</p>
          </div>

          <div>
            <label className="block text-sm text-white/70 mb-1.5">Theme</label>
            <select
              value={settings.theme}
              onChange={(e) => update("theme", e.target.value as "dark" | "system")}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/50"
            >
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
        </div>

        {/* Feature Toggles */}
        <div className="rounded-3xl border border-white/10 bg-black/30 p-6 space-y-4">
          <div className="text-sm font-semibold">Feature Toggles</div>

          {([
            { key: "debugMode" as const, label: "Debug Mode", desc: "Show extra logging and diagnostic info in the admin console." },
            { key: "autoPublish" as const, label: "Auto-Publish", desc: "Automatically publish marketing content after agent approval." },
            { key: "notificationsEnabled" as const, label: "Notifications", desc: "Show browser notifications for agent run completions." },
          ]).map(({ key, label, desc }) => (
            <label key={key} className="flex items-start gap-3 cursor-pointer group">
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  checked={settings[key] as boolean}
                  onChange={(e) => update(key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="h-5 w-9 rounded-full bg-white/10 peer-checked:bg-purple-500 transition" />
                <div className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition peer-checked:translate-x-4" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white/80 group-hover:text-white transition">{label}</div>
                <div className="text-xs text-white/40">{desc}</div>
              </div>
            </label>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 items-center">
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>
          <button
            onClick={handleReset}
            className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/70 hover:bg-white/10 transition"
          >
            Reset to Defaults
          </button>
          {saved && (
            <span className="text-sm text-green-400 font-semibold">Saved!</span>
          )}
        </div>
      </div>
    </div>
  );
}
