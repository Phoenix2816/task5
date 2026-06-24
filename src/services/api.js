const API_URL = "https://task5-ixa8.onrender.com/api";

export async function fetchSongs({ page, seed, region, likes }) {
  const response = await fetch(
    `${API_URL}/songs?page=${page}&seed=${seed}&region=${region}&likes=${likes}`
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HTTP ${response.status}: ${text.slice(0, 200)}`);
  }

  return response.json();
}
