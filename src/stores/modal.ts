import type { MovieItem, Show } from "@/types"
import { create } from "zustand"

interface ModalState {
  open: boolean
  setOpen: (open: boolean) => void
  show: MovieItem | null
  setShow: (show: MovieItem | null) => void
  play: boolean
  setPlay: (play: boolean) => void
}

export const useModalStore = create<ModalState>()((set) => ({
  open: false,
  setOpen: (open: boolean) => set(() => ({ open })),
  show: null,
  setShow: (show: MovieItem | null) => set(() => ({ show })),
  play: false,
  setPlay: (play: boolean) => set(() => ({ play })),
}))
