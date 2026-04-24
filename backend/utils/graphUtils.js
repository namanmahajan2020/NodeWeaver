export function buildNestedTree(root, adjacency) {
  const children = adjacency.get(root) ?? [];
  const branch = {};

  for (const child of children) {
    branch[child] = buildNestedTree(child, adjacency);
  }

  return branch;
}

export function calculateDepth(root, adjacency) {
  const children = adjacency.get(root) ?? [];

  if (children.length === 0) {
    return 1;
  }

  return 1 + Math.max(...children.map((child) => calculateDepth(child, adjacency)));
}

export function detectCycleInComponent(nodes, adjacency) {
  const componentNodes = new Set(nodes);
  const visited = new Set();
  const visiting = new Set();

  const visit = (node) => {
    visited.add(node);
    visiting.add(node);

    for (const child of adjacency.get(node) ?? []) {
      if (!componentNodes.has(child)) {
        continue;
      }

      if (visiting.has(child)) {
        return true;
      }

      if (!visited.has(child) && visit(child)) {
        return true;
      }
    }

    visiting.delete(node);
    return false;
  };

  for (const node of nodes) {
    if (!visited.has(node) && visit(node)) {
      return true;
    }
  }

  return false;
}
