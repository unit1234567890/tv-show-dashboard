import axios from 'axios'
import type { Show, ScoredShow } from '@/types/models'

const showsApiClient = axios.create({
  baseURL: 'https://api.tvmaze.com',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const showsApi = {
  async getShows(page = 0): Promise<Show[]> {
    const response = await showsApiClient.get<Show[]>(`/shows?page=${page}`)
    return response.data
  },

  async getShowById(id: number): Promise<Show> {
    const response = await showsApiClient.get<Show>(`/shows/${id}`)
    return response.data
  },

  async searchShows(query: string): Promise<ScoredShow[]> {
    const response = await showsApiClient.get<{ show: Show; score: number }[]>(
      `/search/shows?q=${query}`
    )
    return response.data
  }
}
