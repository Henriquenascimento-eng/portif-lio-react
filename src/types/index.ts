export type Repo = {
  id: number
  name: string
  description: string | null
  language: string | null
  stargazers_count: number
  updated_at: string
  html_url: string
  homepage: string | null
  topics: string[]
  fork: boolean
}

export type StoredMessage = {
  id: string
  name: string
  email: string
  message: string
  replied: boolean
  created_at: string
}
