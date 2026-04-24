export default function InvalidList({ items }) {
  return (
    <article className="panel-card p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="section-label">Validation</p>
          <h3 className="mt-2 text-lg font-semibold text-white">Invalid Entries</h3>
        </div>
        <span className="pill border-red-900 bg-red-500/10 text-red-200">{items.length}</span>
      </div>

      {items.length === 0 ? (
        <p className="mt-5 text-sm text-gray-400">No invalid entries were found.</p>
      ) : (
        <ul className="mt-5 space-y-3">
          {items.map((item, index) => (
            <li
              key={`${item}-${index}`}
              className="rounded-xl border border-gray-800 bg-[#111827] px-4 py-3 font-['IBM_Plex_Mono'] text-sm text-red-200"
            >
              {item === "" ? "<empty string>" : item}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

