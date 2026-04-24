import assert from "node:assert/strict";
import { processBfhlPayload } from "../services/bfhlService.js";

process.env.FULL_NAME = "testuser";
process.env.DOB_DDMMYYYY = "01012000";
process.env.EMAIL_ID = "test@example.com";
process.env.COLLEGE_ROLL_NUMBER = "ROLL001";

const testCases = [
  {
    name: "sample style payload with tree cycle duplicate and invalid inputs",
    input: {
      data: [
        "A->B",
        "A->C",
        "B->D",
        "C->E",
        "E->F",
        "X->Y",
        "Y->Z",
        "Z->X",
        "P->Q",
        "Q->R",
        "G->H",
        "G->H",
        "G->I",
        "hello",
        "1 ->2",
        "A->"
      ]
    },
    assert(result) {
      assert.equal(result.summary.total_trees, 3);
      assert.equal(result.summary.total_cycles, 1);
      assert.equal(result.summary.largest_tree_root, "A");
      assert.deepEqual(result.invalid_entries, ["hello", "1 ->2", "A->"]);
      assert.deepEqual(result.duplicate_edges, ["G->H"]);
      assert.equal(result.hierarchies[1].has_cycle, true);
    }
  },
  {
    name: "duplicate edges are reported once only",
    input: { data: ["A->B", "A->B", "A->B"] },
    assert(result) {
      assert.deepEqual(result.duplicate_edges, ["A->B"]);
      assert.equal(result.summary.total_trees, 1);
    }
  },
  {
    name: "multi-parent keeps the first parent only",
    input: { data: ["A->D", "B->D", "D->E"] },
    assert(result) {
      assert.equal(result.summary.total_trees, 1);
      const treeA = result.hierarchies.find((item) => item.root === "A");
      assert.deepEqual(treeA.tree, { A: { D: { E: {} } } });
      assert.equal(result.hierarchies.find((item) => item.root === "B"), undefined);
    }
  },
  {
    name: "cycle with no root uses lexicographically smallest node",
    input: { data: ["Z->X", "X->Y", "Y->Z"] },
    assert(result) {
      assert.equal(result.summary.total_cycles, 1);
      assert.equal(result.summary.total_trees, 0);
      assert.equal(result.summary.largest_tree_root, "");
      assert.equal(result.hierarchies[0].root, "X");
      assert.deepEqual(result.hierarchies[0].tree, {});
      assert.equal("depth" in result.hierarchies[0], false);
      assert.equal(result.hierarchies[0].has_cycle, true);
    }
  },
  {
    name: "whitespace trims before validation and self-loop is invalid",
    input: { data: [" A->B ", "A->A", ""] },
    assert(result) {
      assert.equal(result.summary.total_trees, 1);
      assert.deepEqual(result.invalid_entries, ["A->A", ""]);
      assert.deepEqual(result.hierarchies[0].tree, { A: { B: {} } });
    }
  },
  {
    name: "mixed trees and cycles are classified correctly in summary",
    input: { data: ["A->B", "B->C", "X->Y", "Y->X", "P->Q"] },
    assert(result) {
      assert.equal(result.summary.total_trees, 2);
      assert.equal(result.summary.total_cycles, 1);
      assert.equal(result.summary.largest_tree_root, "A");
      assert.equal(result.hierarchies.find((item) => item.root === "X").has_cycle, true);
    }
  },
  {
    name: "largest_tree_root ignores cycles and breaks ties lexicographically",
    input: { data: ["B->C", "A->D"] },
    assert(result) {
      assert.equal(result.summary.total_trees, 2);
      assert.equal(result.summary.total_cycles, 0);
      assert.equal(result.summary.largest_tree_root, "A");
    }
  }
];

for (const testCase of testCases) {
  const result = processBfhlPayload(testCase.input);
  testCase.assert(result);
  console.log(`PASS: ${testCase.name}`);
}

console.log("All backend tests passed.");
