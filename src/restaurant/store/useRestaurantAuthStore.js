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
import { useRestaurantProfileStore } from "./useRestaurantProfileStore";

const db = getFirestore();

export const useRestaurantAuthStore = create(
  immer(
    persist(
      (set, get) => ({
        token: null,
        loading: false,
        error: null,
        restaurant: null,

        // Function that lets restaurant sign up and set their doc
        signUp: async ({
          restaurantName,
          email,
          password,
          contactPersonNumber,
          contactPhoneNumber,
          restaurantAddress,
          cuisineTypes,
        }) => {
          set((state) => {
            state.loading = true;
            state.error = null;
          });
          try {
            const restaurantCredential = await createUserWithEmailAndPassword(
              auth,
              email,
              password
            );
            const restaurant = restaurantCredential.user;
            await updateProfile(restaurant, {
              displayName: restaurantName,
            });

            await setDoc(doc(db, "restaurants", restaurant.uid), {
              restaurantName,
              email,
              contactPersonNumber,
              contactPhoneNumber,
              restaurantAddress,
              cuisineTypes,
              createdAt: new Date(),
            });

            set((state) => {
              state.token = restaurant.accessToken;
              state.user = {
                uid: restaurant.uid,
                email: restaurant.email,
                displayName: restaurant.displayName,
              };
              state.loading = false;
            });

            // Fetch restaurant profile after successful signup
            await useRestaurantProfileStore.getState().fetchProfile(restaurant.uid);
          } catch (error) {
            set((state) => {
              state.error = error.message;
              state.loading = false;
            });
          }
        },

        // Function that lets restaurant sign in and set their doc

        login: async ({ email, password }) => {
          set((state) => {
            state.loading = true;
            state.error = null;
          });

          try {
            const restaurantCredential = await signInWithEmailAndPassword(auth, email, password);
            const restaurant = restaurantCredential.user;

            set((state) => {
              state.token = restaurant.accessToken;
              state.restaurant = {
                uid: restaurant.uid,
                email: restaurant.email,
                displayName: restaurant.displayName,
              };
              state.loading = false;
            });

            // Fetch profile after successful login
            await useRestaurantProfileStore.getState().fetchProfile(restaurant.uid);
          } catch (error) {
            set((state) => {
              state.error = error.message;
              state.loading = false;
            });
          }
        },

        // Function that let's restaurant to logout and clear profile
        logout: async () => {
          try {
            await signOut(auth);
            set((state) => {
              state.token = null;
              state.user = null;
            });

            // Clear profile from profile store
            useRestaurantProfileStore.getState().clearProfile();
          } catch (error) {
            set((state) => {
              state.error = error.message;
            });
          }
        },
      }),

      // Persist token and restuarant data to localStorage
      {
        name: "restaurant-auth-store",
        getStorage: () => localStorage,
        partialize: (state) => ({
          token: state.token,
          restaurant: state.restaurant,
        }),
      }
    )
  )
);
