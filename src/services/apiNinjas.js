const API_BASE_URL = 'https://api.api-ninjas.com/v1/exercises';

const API_KEY = 'v93NjznVguK5WMp4hfoVM0saEoeCglhbiLFd7OpJ';

export async function fetchExercises(params = {}) {
  const query = new URLSearchParams(params).toString();
  const url = query ? `${API_BASE_URL}?${query}` : API_BASE_URL;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-Api-Key': API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar exercícios');
  }

  return response.json();
}
