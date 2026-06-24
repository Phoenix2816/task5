const API_URL = "http://localhost:5000/api";

export async function fetchSongs({
    page,
    seed,
    region,
    likes
}) {
    const response = await fetch(
        `${API_URL}/songs?page=${page}&seed=${seed}&region=${region}&likes=${likes}`
    );

    return response.json();
}