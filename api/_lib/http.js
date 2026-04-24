export function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export function handlePreflight(req, res) {
  if (req.method !== "OPTIONS") {
    return false;
  }

  setCorsHeaders(res);
  res.status(204).end();
  return true;
}

export function readJsonBody(req) {
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return undefined;
    }
  }

  return req.body;
}
