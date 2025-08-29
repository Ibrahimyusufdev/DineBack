import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {fetchRestaurantProfile} from "../helpers/fetchRestaurantProfile.js";

export const useRestaurantProfileStore = create(
  immer((set) => ({
    profile: null,
    loading: false,
    error: null,

    //Fetch and set restuarant profile
    fetchProfile: async (uid) => {
      set((state) => {
        state.loading = true;
        state.error = null;
      });

      try {
        const profile = await fetchRestaurantProfile(uid);
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

    // Update restaurant profile
    updateProfile: async (updates) => {
        set((state) => {
            state.profile = {...state.profile, ...updates}
        })
    },

    // Clear restaurant profile on logout
    clearProfile: () => {
        set((state) => {
            state.profile = null;
            state.error = null;
        })
    }
  }))
);
