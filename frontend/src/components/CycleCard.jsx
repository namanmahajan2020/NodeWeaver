export default function CycleCard({ hierarchy }) {
  return (
    <article className="panel-card p-5 transition-all duration-300 hover:scale-[1.01]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="section-label">Cycle</p>
          <h3 className="mt-2 text-lg font-semibold text-white">Root {hierarchy.root}</h3>
        </div>
        <span className="pill border-red-900 bg-red-500/10 text-red-200">Cycle detected</span>
      </div>

      <div className="mt-5 rounded-2xl border border-red-900/40 bg-red-500/5 p-4 text-sm leading-6 text-gray-300">
        This connected component contains a directed cycle, so the API correctly returns an empty tree
        and omits depth.
      </div>
    </article>
  );
}

