import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { fetchUserProfile } from "../helpers/fetchUserProfile.js";

export const useUserProfileStore = create(
  immer((set, get) => ({
    profile: null,
    loading: false,
    error: null,

    // Fetch and set user profile
    fetchProfile: async (uid) => {
      set((state) => {
        state.loading = true;
        state.error = null;
      });

      try {
        const profile = await fetchUserProfile(uid);
        set((state) => {
          state.profile = profile;
          state.loading = false;
        });
      } catch (error) {
        set((state) => {
          state.error = error.message;
          state.loading = false;
        });
      }
    },

    // Update profile
    updateProfile: (updates) => {
      set((state) => {
        state.profile = { ...state.profile, ...updates };
      });
    },

    // Clear profile on logout
    clearProfile: () => {
      set((state) => {
        state.profile = null;
        state.error = null;
      });
    },
  }))
);
