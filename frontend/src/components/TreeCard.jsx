import TreeNode from "./TreeNode.jsx";

export default function TreeCard({ hierarchy }) {
  const rootEntry = Object.entries(hierarchy.tree ?? {})[0];

  return (
    <article className="panel-card p-5 transition-all duration-300 hover:scale-[1.01]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="section-label">Tree</p>
          <h3 className="mt-2 text-lg font-semibold text-white">Root {hierarchy.root}</h3>
        </div>
        <span className="pill border-green-900 bg-green-500/10 text-green-200">
          Depth {hierarchy.depth}
        </span>
      </div>

      <div className="mt-5 rounded-2xl border border-gray-800 bg-[#020617]/70 p-4">
        <ul className="space-y-3">
          <TreeNode label={rootEntry?.[0]} value={rootEntry?.[1]} level={0} />
        </ul>
      </div>
    </article>
  );
}

