export default function InputPanel({
  input,
  onInputChange,
  onSubmit,
  onLoadSample,
  lineCount,
  loading,
  error
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="panel-card flex h-full flex-col gap-6 p-4 sm:p-6 transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="section-label">Input Builder</p>
          <div>
            <h2 className="text-lg font-semibold text-white sm:text-xl">Node Relationships</h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-gray-400">
              Enter one edge per line using uppercase single-letter nodes. The backend will validate,
              classify, and summarize the graph.
            </p>
          </div>
        </div>

        <div className="pill border-blue-900 bg-blue-500/10 text-blue-200">{lineCount} lines</div>
      </div>

      <label className="flex flex-1 flex-col gap-3">
        <span className="text-sm font-medium text-gray-300">Hierarchy Input</span>
        <textarea
          value={input}
          onChange={(event) => onInputChange(event.target.value)}
          placeholder={"A->B\nA->C\nB->D\nX->Y"}
          className="min-h-[320px] flex-1 rounded-2xl border border-gray-800 bg-[#020617]/80 px-4 py-4 font-['IBM_Plex_Mono'] text-sm text-gray-100 outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
        />
      </label>

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-blue-500 disabled:cursor-wait disabled:opacity-70"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Processing
            </>
          ) : (
            "Submit to /bfhl"
          )}
        </button>

        <button
          type="button"
          onClick={onLoadSample}
          className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-4 py-3 text-sm font-semibold text-slate-950 transition-all duration-300 hover:scale-105 hover:bg-orange-400"
        >
          Load Sample
        </button>
      </div>

      <div className="rounded-2xl border border-gray-800 bg-[#111827] p-4 text-sm text-gray-400">
        <p className="font-medium text-gray-300">Accepted examples</p>
        <p className="mt-2 leading-6">
          Use values like <code className="rounded bg-slate-900 px-2 py-1 text-blue-200">A-&gt;B</code> or{" "}
          <code className="rounded bg-slate-900 px-2 py-1 text-blue-200">A -&gt; B</code>.
        </p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-900 bg-red-500/10 p-4 text-sm text-red-200">
          <p className="font-semibold text-red-300">Request failed</p>
          <p className="mt-1 leading-6">{error}</p>
        </div>
      )}
    </form>
  );
}

