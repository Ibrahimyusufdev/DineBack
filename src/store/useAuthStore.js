import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// Setting up auth store with firebase
export const useAuthStore = create(
  immer(
    persist(
      (set) => ({
        token: null,
        error: null,
        loading: false,

        login: async ({ username, password }) => {
          set((state) => {
            state.loading = true;
          });

          try {
            const userCredential = await signInWithEmailAndPassword(auth, username, password);
            set((state) => {
              state.token = userCredential.user.accessToken;
              state.loading = false;
              state.error = null;
            });
          } catch (error) {
            set((state) => {
              state.error = error;
              state.loading = false;
            });
          }
        },

        logout: async () => {
          await signOut(auth);
          set((state) => {
            state.token = null;
          });
        },
      }),

      {
        name: "auth-token",
        getStorage: () => localStorage,
        partialize: (state) => ({
          token: state.token,
        }),
      }
      
    )
  )
);
