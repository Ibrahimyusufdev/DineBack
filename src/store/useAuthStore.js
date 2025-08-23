import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { auth } from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore();

// Auth store focused only on authentication/session state
export const useAuthStore = create(
  immer(
    persist(
      (set) => ({
        token: null,
        loading: false,
        error: null,
        user: null, // keep only minimal user info (uid, email, displayName, photoURL)

        // Signup (auth in Zustand, profile in Firestore)
        signUp: async ({ firstName, lastName, email, phoneNumber, password, profilePic }) => {
          set((state) => {
            state.loading = true;
            state.error = null;
          });

          try {
            // Create user in Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update Firebase Auth profile (displayName, photoURL)
            await updateProfile(user, {
              displayName: `${firstName} ${lastName}`,
              photoURL: profilePic || null,
            });

            // Save profile in Firestore
            await setDoc(doc(db, "users", user.uid), {
              firstName,
              lastName,
              email,
              phoneNumber,
              profilePic: profilePic || null,
              createdAt: new Date(),
            });

            // Update Zustand state (only auth/session info)
            set((state) => {
              state.token = user.accessToken;
              state.user = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
              };
              state.loading = false;
            });
          } catch (error) {
            set((state) => {
              state.error = error.message;
              state.loading = false;
            });
          }
        },

        // Login
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
                photoURL: user.photoURL,
              };
              state.loading = false;
            });
          } catch (error) {
            set((state) => {
              state.error = error.message;
              state.loading = false;
            });
          }
        },

        // logout
        logout: async () => {
          await signOut(auth);
          set((state) => {
            state.token = null;
            state.user = null;
          });
        },
      }),

      {
        name: "auth-store",
        getStorage: () => localStorage,
        partialize: (state) => ({
          token: state.token,
          user: state.user, 
        }),
      }
    )
  )
);
