// stores/authStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { auth } from "../../config/firebaseConfig";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useUserProfileStore } from "./userProfileStore";

const db = getFirestore();

export const useDinersAuthStore = create(
  immer(
    persist(
      (set, get) => ({
        token: null,
        loading: false,
        error: null,
        user: null,
        // Function that lets user sign up and set their doc
        signUp: async ({ firstName, lastName, email, phoneNumber, password }) => {
          set((state) => {
            state.loading = true;
            state.error = null;
          });

          try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, {
              displayName: `${firstName} ${lastName}`,
            });

            await setDoc(doc(db, "users", user.uid), {
              firstName,
              lastName,
              email,
              phoneNumber,
              createdAt: new Date(),
            });

            set((state) => {
              state.token = user.accessToken;
              state.user = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
              };
              state.loading = false;
            });

            // Fetch profile after successful signup
            await useUserProfileStore.getState().fetchProfile(user.uid);
          } catch (error) {
            set((state) => {
              state.error = error.message;
              state.loading = false;
            });
          }
        },
// Function that lets user sign in and set their doc
        login: async ({ email, password }) => {
          set((state) => {
            state.loading = true;
            state.error = null;
          });

          try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            set((state) => {
              state.token = user.accessToken;
              state.user = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
              };
              state.loading = false;
            });

            // Fetch profile after successful login
            await useUserProfileStore.getState().fetchProfile(user.uid);
          } catch (error) {
            set((state) => {
              state.error = error.message;
              state.loading = false;
            });
          }
        },

// Function that let's user to logout and clear profile
        logout: async () => {
          try {
            await signOut(auth);
            set((state) => {
              state.token = null;
              state.user = null;
            });

            // Clear profile from profile store
            useUserProfileStore.getState().clearProfile();
          } catch (error) {
            set((state) => {
              state.error = error.message;
            });
          }
        },
      }),
  // Persist token and user data to localStorage
      {
        name: "user-auth-store",
        getStorage: () => localStorage,
        partialize: (state) => ({
          token: state.token,
          user: state.user,
        }),
      }
    )
  )
);
