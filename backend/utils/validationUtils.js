export const EDGE_PATTERN = /^([A-Z])\s*->\s*([A-Z])$/;

export function canonicalEdge(parent, child) {
  return `${parent}->${child}`;
}

