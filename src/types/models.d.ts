// for larger projects, I would suggest splitting this file into multiple files based on the feature and adding types into corresponding files. For example, you could have a file for API-related types, another for TV show-related types, etc. This will help keep your codebase organized and maintainable.

// for now, I will add the types in the same file

export type Show = {
  id: number
  url: string
  name: string
  type: string
  language: string
  genres: string[]
  status: string
  runtime: number | null
  averageRuntime: number | null
  premiered: string | null
  ended: string | null
  officialSite?: string
  schedule: Schedule
  rating: Rating
  weight: number
  network?: Network | null
  webChannel?: any
  dvdCountry?: any
  externals: Externals
  image?: Image
  summary?: string | null
  updated: number
  _links: Links
}

export type Schedule = {
  time: string
  days: string[]
}

export type Rating = {
  average: number | null
}

export type Country = {
  name: string
  code: string
  timezone: string
}

export interface Network {
  id: number
  name: string
  country: Country
  officialSite?: string
}

export type Externals = {
  tvrage?: number
  thetvdb?: number
  imdb?: string
}

export type Image = {
  medium: string
  original: string
}

export type Links = {
  self: {
    href: string
  }
  previousepisode?: {
    href: string
    name?: string
  }
}

export interface ScoredShow {
  score: number
  show: Show
}
