import { processBfhlPayload } from "../backend/services/bfhlService.js";
import { handlePreflight, readJsonBody, setCorsHeaders } from "./_lib/http.js";

export default function handler(req, res) {
  if (handlePreflight(req, res)) {
    return;
  }

  setCorsHeaders(res);

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  const body = readJsonBody(req);

  if (!Array.isArray(body?.data)) {
    return res.status(400).json({
      error: "Invalid payload. Expected JSON body with a data array."
    });
  }

  return res.status(200).json(processBfhlPayload(body));
}
