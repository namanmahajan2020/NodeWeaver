import CycleCard from "./CycleCard.jsx";
import DuplicateList from "./DuplicateList.jsx";
import InvalidList from "./InvalidList.jsx";
import RawJsonViewer from "./RawJsonViewer.jsx";
import SummaryCards from "./SummaryCards.jsx";
import TreeCard from "./TreeCard.jsx";

function IdentityCard({ response }) {
  return (
    <article className="panel-card p-5">
      <p className="section-label">Identity</p>
      <h3 className="mt-2 text-lg font-semibold text-white">Submission Metadata</h3>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-800 bg-[#111827] p-4">
          <p className="text-sm font-medium text-gray-400">User ID</p>
          <p className="mt-3 break-all text-base font-semibold text-gray-100">{response.user_id}</p>
        </div>
        <div className="rounded-2xl border border-gray-800 bg-[#111827] p-4">
          <p className="text-sm font-medium text-gray-400">Email</p>
          <p className="mt-4 break-all text-base font-semibold text-gray-100">{response.email_id}</p>
        </div>
        <div className="rounded-2xl border border-gray-800 bg-[#111827] p-4">
          <p className="text-sm font-medium text-gray-400">Roll Number</p>
          <p className="mt-3 break-all text-base font-semibold text-gray-100">
            {response.college_roll_number}
          </p>
        </div>
      </div>
    </article>
  );
}

function EmptyState() {
  return (
    <div className="panel-card flex min-h-[420px] flex-col items-center justify-center p-8 text-center">
      <div className="rounded-full border border-blue-900 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-200">
        Awaiting Input
      </div>
      <h3 className="mt-6 text-2xl font-semibold text-white">Your results will appear here</h3>
      <p className="mt-3 max-w-lg text-sm leading-6 text-gray-400">
        Submit node relationships from the input panel to view hierarchies, invalid entries, duplicate
        edges, summary metrics, and the raw API response.
      </p>
    </div>
  );
}

export default function OutputPanel({ response }) {
  if (!response) {
    return <EmptyState />;
  }

  return (
    <div className="flex flex-col gap-6">
      <SummaryCards summary={response.summary} />
      <IdentityCard response={response} />

      <section className="grid gap-4 xl:grid-cols-2">
        {response.hierarchies.map((hierarchy) =>
          hierarchy.has_cycle ? (
            <CycleCard key={`${hierarchy.root}-cycle`} hierarchy={hierarchy} />
          ) : (
            <TreeCard key={`${hierarchy.root}-${hierarchy.depth}`} hierarchy={hierarchy} />
          )
        )}
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <InvalidList items={response.invalid_entries} />
        <DuplicateList items={response.duplicate_edges} />
      </section>

      <RawJsonViewer data={response} />
    </div>
  );
}

