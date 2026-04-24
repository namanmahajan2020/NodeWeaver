export default function DuplicateList({ items }) {
  return (
    <article className="panel-card p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="section-label">Deduplication</p>
          <h3 className="mt-2 text-lg font-semibold text-white">Duplicate Edges</h3>
        </div>
        <span className="pill border-orange-900 bg-orange-500/10 text-orange-200">{items.length}</span>
      </div>

      {items.length === 0 ? (
        <p className="mt-5 text-sm text-gray-400">No duplicate edges were found.</p>
      ) : (
        <ul className="mt-5 space-y-3">
          {items.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-gray-800 bg-[#111827] px-4 py-3 font-['IBM_Plex_Mono'] text-sm text-orange-200"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

