const cards = [
  { key: "total_trees", label: "Total Trees", icon: "🌳", accent: "text-green-300" },
  { key: "total_cycles", label: "Total Cycles", icon: "⟳", accent: "text-red-300" },
  { key: "largest_tree_root", label: "Largest Root", icon: "◎", accent: "text-blue-300" }
];

export default function SummaryCards({ summary }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <article
          key={card.key}
          className="panel-card p-5 transition-all duration-300 hover:scale-[1.02]"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-gray-400">{card.label}</p>
              <p className={`mt-3 text-3xl font-bold ${card.accent}`}>
                {summary[card.key] || summary[card.key] === 0 ? summary[card.key] : "-"}
              </p>
            </div>
            <span className="text-2xl">{card.icon}</span>
          </div>
        </article>
      ))}
    </div>
  );
}
