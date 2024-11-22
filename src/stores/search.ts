import type { MovieItem, Show } from "@/types"
import { create } from "zustand"

interface SearchState {
  query: string
  setQuery: (query: string) => void
  shows: MovieItem[]
  setShows: (shows: MovieItem[]) => void
}

export const useSearchStore = create<SearchState>()((set) => ({
  query: "",
  setQuery: (query: string) => set(() => ({ query })),
  shows: [],
  setShows: (shows: MovieItem[]) => set(() => ({ shows })),
}))
