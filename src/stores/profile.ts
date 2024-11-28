import { ProfileDataState } from "@/types"
import { create } from "zustand"
import { createJSONStorage, devtools, persist } from "zustand/middleware"

type ProfileState = {
  chooseProfile: boolean
  setChooseProfile: (chooseProfile: boolean) => void
  activeProfile: ProfileDataState | undefined
  setActiveProfile: (profile: ProfileDataState) => void
  parentProfile: ProfileDataState | undefined
  setParentProfile: (profile: ProfileDataState) => void
  childrenProfiles: ProfileDataState[]
  setChildrenProfiles: (profiles: ProfileDataState[]) => void
  pinForm: boolean
  setPinForm: (pinForm: boolean) => void
}

export const useProfileStore = create<ProfileState>()(
  devtools(
    persist(
      (set) => ({
        chooseProfile: false,
        setChooseProfile: (chooseProfile: boolean) => set({ chooseProfile }),
        activeProfile: undefined,
        setActiveProfile: (activeProfile: ProfileDataState) => set({ activeProfile }),
        parentProfile: undefined,
        setParentProfile: (parentProfile: ProfileDataState) => set({ parentProfile }),
        childrenProfiles: [],
        setChildrenProfiles: (childrenProfiles: ProfileDataState[]) => set({ childrenProfiles }),
        pinForm: false,
        setPinForm: (pinForm: boolean) => set({ pinForm }),
      }),
      {
        name: "test-store",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
)
