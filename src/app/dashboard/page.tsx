import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        {[
          { label: "Videos Generated", value: "0", sub: "This month", color: "bg-stone-900" },
          { label: "Credits Used", value: "0", sub: "of 120 available", color: "bg-wood" },
          { label: "Scheduled", value: "0", sub: "Pending publish", color: "bg-stone-600" },
          { label: "Views", value: "—", sub: "Coming soon", color: "bg-stone-400" },
        ].map((s) => (
          <div key={s.label} className="rounded-[24px] border-2 border-stone-200 bg-white p-6">
            <div className={`mb-3 h-2 w-8 rounded-full ${s.color}`} />
            <p className="text-3xl font-bold text-stone-900">{s.value}</p>
            <p className="mt-1 text-sm text-stone-500">{s.label}</p>
            <p className="text-xs text-stone-400">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="rounded-[24px] border-2 border-stone-200 bg-white p-8">
        <h3 className="font-display text-xl font-bold text-stone-900">Quick Actions</h3>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Link
            href="/viral-video-ai/dashboard/create"
            className="card-hover rounded-[24px] border-2 border-stone-200 bg-stone-50 p-6 hover:border-stone-900"
          >
            <span className="text-3xl">🎬</span>
            <h4 className="mt-3 font-display font-bold text-stone-900">Create Video</h4>
            <p className="mt-1 text-sm text-stone-500">Paste a URL and generate a UGC video</p>
          </Link>

          <div className="card-hover rounded-[24px] border-2 border-stone-200 bg-stone-50 p-6 opacity-50">
            <span className="text-3xl">📅</span>
            <h4 className="mt-3 font-display font-bold text-stone-900">Schedule</h4>
            <p className="mt-1 text-sm text-stone-500">Coming soon</p>
          </div>

          <div className="card-hover rounded-[24px] border-2 border-stone-200 bg-stone-50 p-6 opacity-50">
            <span className="text-3xl">📊</span>
            <h4 className="mt-3 font-display font-bold text-stone-900">Analytics</h4>
            <p className="mt-1 text-sm text-stone-500">Coming soon</p>
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="rounded-[24px] border-2 border-stone-200 bg-white p-8">
        <h3 className="font-display text-xl font-bold text-stone-900">Recent Activity</h3>
        <div className="mt-6 flex flex-col items-center justify-center py-12 text-center">
          <span className="text-5xl">🎥</span>
          <p className="mt-4 font-display text-lg font-bold text-stone-500">No videos yet</p>
          <p className="mt-1 text-sm text-stone-400">
            Create your first video to see activity here
          </p>
          <Link
            href="/viral-video-ai/dashboard/create"
            className="mt-6 rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-stone-800"
          >
            Create Your First Video
          </Link>
        </div>
      </div>
    </div>
  );
}
