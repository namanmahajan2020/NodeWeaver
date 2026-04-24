import { buildNestedTree, calculateDepth, detectCycleInComponent } from "../utils/graphUtils.js";
import { createIdentity } from "../utils/identityUtils.js";
import { EDGE_PATTERN, canonicalEdge } from "../utils/validationUtils.js";

export function processBfhlPayload(payload) {
  const rawItems = Array.isArray(payload?.data) ? payload.data : [];
  const invalidEntries = [];
  const duplicateEdges = [];
  const seenEdges = new Set();
  const reportedDuplicates = new Set();
  const childOwners = new Map();
  const acceptedEdges = [];
  const nodeOrder = new Map();
  let sequence = 0;

  for (const rawEntry of rawItems) {
    const originalEntry = typeof rawEntry === "string" ? rawEntry : String(rawEntry);
    const normalized = originalEntry.trim();
    const match = normalized.match(EDGE_PATTERN);

    if (!match) {
      invalidEntries.push(originalEntry);
      continue;
    }

    const [, parent, child] = match;

    if (parent === child) {
      invalidEntries.push(originalEntry);
      continue;
    }

    const edgeKey = canonicalEdge(parent, child);

    if (seenEdges.has(edgeKey)) {
      if (!reportedDuplicates.has(edgeKey)) {
        duplicateEdges.push(edgeKey);
        reportedDuplicates.add(edgeKey);
      }
      continue;
    }

    seenEdges.add(edgeKey);

    if (childOwners.has(child)) {
      continue;
    }

    childOwners.set(child, parent);
    acceptedEdges.push([parent, child]);

    if (!nodeOrder.has(parent)) {
      nodeOrder.set(parent, sequence++);
    }

    if (!nodeOrder.has(child)) {
      nodeOrder.set(child, sequence++);
    }
  }

  const adjacency = new Map();
  const indegree = new Map();
  const undirected = new Map();

  const ensureNode = (node) => {
    if (!adjacency.has(node)) adjacency.set(node, []);
    if (!indegree.has(node)) indegree.set(node, 0);
    if (!undirected.has(node)) undirected.set(node, new Set());
  };

  for (const [parent, child] of acceptedEdges) {
    ensureNode(parent);
    ensureNode(child);
    adjacency.get(parent).push(child);
    indegree.set(child, (indegree.get(child) ?? 0) + 1);
    undirected.get(parent).add(child);
    undirected.get(child).add(parent);
  }

  for (const [node, children] of adjacency.entries()) {
    adjacency.set(node, [...children].sort());
  }

  const nodesByAppearance = [...undirected.keys()].sort(
    (left, right) => (nodeOrder.get(left) ?? 0) - (nodeOrder.get(right) ?? 0)
  );
  const visited = new Set();
  const hierarchies = [];

  for (const startNode of nodesByAppearance) {
    if (visited.has(startNode)) {
      continue;
    }

    const stack = [startNode];
    const component = [];
    visited.add(startNode);

    while (stack.length > 0) {
      const node = stack.pop();
      component.push(node);

      for (const neighbor of undirected.get(node) ?? []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          stack.push(neighbor);
        }
      }
    }

    component.sort((left, right) => (nodeOrder.get(left) ?? 0) - (nodeOrder.get(right) ?? 0));
    const roots = component.filter((node) => (indegree.get(node) ?? 0) === 0).sort();
    const root = roots[0] ?? [...component].sort()[0];
    const hasCycle = detectCycleInComponent(component, adjacency);

    if (hasCycle) {
      hierarchies.push({
        root,
        tree: {},
        has_cycle: true
      });
      continue;
    }

    hierarchies.push({
      root,
      tree: {
        [root]: buildNestedTree(root, adjacency)
      },
      depth: calculateDepth(root, adjacency)
    });
  }

  const nonCyclicTrees = hierarchies.filter((item) => !item.has_cycle);
  let largestTreeRoot = "";
  let largestDepth = -1;

  for (const item of nonCyclicTrees) {
    if (
      item.depth > largestDepth ||
      (item.depth === largestDepth && (largestTreeRoot === "" || item.root < largestTreeRoot))
    ) {
      largestDepth = item.depth;
      largestTreeRoot = item.root;
    }
  }

  return {
    ...createIdentity(),
    hierarchies,
    invalid_entries: invalidEntries,
    duplicate_edges: duplicateEdges,
    summary: {
      total_trees: nonCyclicTrees.length,
      total_cycles: hierarchies.length - nonCyclicTrees.length,
      largest_tree_root: largestTreeRoot
    }
  };
}

