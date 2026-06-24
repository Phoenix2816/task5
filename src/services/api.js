const API_URL = "https://task5-ixa8.onrender.com/api";

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
