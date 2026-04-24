import { useMemo, useState } from "react";
import InputPanel from "../components/InputPanel.jsx";
import Layout from "../components/Layout.jsx";
import OutputPanel from "../components/OutputPanel.jsx";
import { submitBfhlData } from "../services/bfhlApi.js";

const sampleInput = `A->B
A->C
B->D
C->E
E->F
X->Y
Y->Z
Z->X
P->Q
Q->R
G->H
G->H
G->I
hello
1 ->2
A->`;

function parseInput(text) {
  return text.split(/\r?\n/).map((item) => item.trim()).filter(Boolean);
}

export default function HomePage() {
  const [input, setInput] = useState(sampleInput);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const parsedCount = useMemo(() => parseInput(input).length, [input]);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await submitBfhlData(parseInput(input));
      setResponse(result);
    } catch (submissionError) {
      setResponse(null);
      setError(submissionError.message || "Something went wrong while calling the API.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <header className="mb-8 lg:mb-10">
        <p className="section-label">SRM Full Stack Engineering Challenge</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
          BFHL Hierarchy Explorer
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-400 sm:text-base">
          A professional dashboard for testing hierarchical node relationships, reviewing the exact API
          response, and checking trees, cycles, duplicates, and invalid entries in one balanced layout.
        </p>
      </header>

      <main className="grid flex-1 gap-6 lg:grid-cols-[minmax(320px,35%)_minmax(0,65%)] lg:items-start">
        <InputPanel
          input={input}
          onInputChange={setInput}
          onSubmit={handleSubmit}
          onLoadSample={() => setInput(sampleInput)}
          lineCount={parsedCount}
          loading={loading}
          error={error}
        />

        <OutputPanel response={response} />
      </main>
    </Layout>
  );
}
