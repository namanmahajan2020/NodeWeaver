export default function RawJsonViewer({ data }) {
  return (
    <article className="panel-card p-5">
      <div>
        <p className="section-label">Debug View</p>
        <h3 className="mt-2 text-lg font-semibold text-white">Raw JSON Response</h3>
      </div>

      <pre className="mt-5 overflow-x-auto rounded-2xl border border-gray-800 bg-[#020617]/80 p-4 font-['IBM_Plex_Mono'] text-xs leading-6 text-blue-100">
        {JSON.stringify(data, null, 2)}
      </pre>
    </article>
  );
}

