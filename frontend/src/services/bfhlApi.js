const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export async function submitBfhlData(data) {
  const response = await fetch(`${API_BASE_URL}/bfhl`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ data })
  });

  if (!response.ok) {
    let message = "API request failed.";

    try {
      const errorPayload = await response.json();
      message = errorPayload.error || message;
    } catch {
      message = await response.text() || message;
    }

    throw new Error(message);
  }

  return response.json();
}

