import { processBfhlPayload } from "../services/bfhlService.js";

export function handleBfhlRequest(req, res) {
  if (!Array.isArray(req.body?.data)) {
    return res.status(400).json({
      error: "Invalid payload. Expected JSON body with a data array."
    });
  }

  return res.json(processBfhlPayload(req.body));
}

