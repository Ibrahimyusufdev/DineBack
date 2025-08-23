
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

// Setting up auth store with firebase
export const useAuthStore = create(
  immer(
    persist(
      (set) => ({
        token: null,
        loading: false,
        error: null,
        

        login: async ({ email, password }) => {
          set((state) => {
            state.loading = true;
          });

          try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            set((state) => {
              state.token = userCredential.user.accessToken;
              state.loading = false;
              state.error = null;
            });
          } catch (error) {
            set((state) => {
              state.error = error.message;
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
