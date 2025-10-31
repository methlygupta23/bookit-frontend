export function getApiBaseUrl() {
  return import.meta.env.VITE_API_URL || "http://localhost:5000";
}

export async function fetchJson(path) {
  const res = await fetch(`${getApiBaseUrl()}${path}`);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}


