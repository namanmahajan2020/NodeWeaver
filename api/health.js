import { handlePreflight, setCorsHeaders } from "./_lib/http.js";

export default function handler(req, res) {
  if (handlePreflight(req, res)) {
    return;
  }

  setCorsHeaders(res);

  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  return res.status(200).json({ status: "ok" });
}
