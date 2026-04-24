export default function TreeNode({ label, value, level = 0 }) {
  const children = Object.entries(value ?? {});

  return (
    <li className="relative">
      <div className="flex items-start gap-3">
        {level > 0 && <span className="mt-3 h-px w-4 bg-blue-500/40" />}
        <div className="min-w-0 rounded-xl border border-blue-900/50 bg-blue-500/10 px-3 py-2 text-sm font-semibold text-blue-100">
          {label}
        </div>
      </div>

      {children.length > 0 && (
        <ul className="ml-4 mt-3 space-y-3 border-l border-gray-800 pl-4">
          {children.map(([childLabel, childValue]) => (
            <TreeNode key={childLabel} label={childLabel} value={childValue} level={level + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

