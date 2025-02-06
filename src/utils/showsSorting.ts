import type { Show } from '@/types/models'

/**
 * Groups TV shows by genre.
 */
export function groupShowsByGenre(shows: Show[]): Map<string, Show[]> {
  return shows.reduce((grouped, show) => {
    show.genres.forEach(genre => {
      if (!grouped.has(genre)) {
        grouped.set(genre, [])
      }
      grouped.get(genre)!.push(show)
    })
    return grouped
  }, new Map<string, Show[]>())
}

/**
 * Sorts grouped shows by rating in descending order.
 */
export function sortGroupedShows(groupedShows: Map<string, Show[]>): Map<string, Show[]> {
  groupedShows.forEach((shows, genre) => {
    groupedShows.set(
      genre,
      shows.sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0))
    )
  })
  return groupedShows
}
