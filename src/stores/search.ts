import type { MovieItem } from "@/types"
import { create } from "zustand"

interface SearchState {
  isFetching: boolean
  setFetching: (isFetching: boolean) => void
  query: string
  setQuery: (query: string) => void
  shows: MovieItem[]
  setShows: (shows: MovieItem[]) => void
}

export const useSearchStore = create<SearchState>()((set) => ({
  isFetching: false,
  setFetching: (isFetching: boolean) => set(() => ({ isFetching })),
  query: "",
  setQuery: (query: string) => set(() => ({ query })),
  shows: [],
  setShows: (shows: MovieItem[]) => set(() => ({ shows })),
}))
