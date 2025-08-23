export const Dashboard = () => {

    return (
        <section className="mt-4">
            <div className="container mx-auto px-4">
                <h1>This is dashbaord page</h1>
            </div>
        </section>
    )
}



// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import { immer } from "zustand/middleware/immer";
// import { auth } from "../config/firebaseConfig";
// import {
//   signInWithEmailAndPassword,
//   signOut,
//   createUserWithEmailAndPassword,
//   updateProfile,
// } from "firebase/auth";
// import { getFirestore, doc, setDoc } from "firebase/firestore";

// const db = getFirestore();

// // Setting up auth store with firebase
// export const useAuthStore = create(
//   immer(
//     persist(
//       (set) => ({
//         token: null,
//         loading: false,
//         error: null,
//         userData: null,

//         signUp: async ({ firstName, lastName, email, phoneNumber, password, profilePic }) => {
//           set((state) => (state.loading = true));

//           try {
//             // Creating user in Firebase Auth
//             const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//             const user = userCredential.user;

//             // Updating Firebase Auth profile (displayName, photoUrl)
//             await updateProfile(user, {
//               displayName: `${firstName} ${lastName}`,
//               photoURL: profilePic || null,
//             });

//             // save extra info to Firestore

//             await setDoc(doc(db, "users", user.uid), {
//               firstName,
//               lastName,
//               email,
//               phoneNumber,
//               profilePic: profilePic || null,
//               createdAt: new Date(),
//             });

//             // Updating global state with the user details

//             set((state) => {
//               state.token = user.accessToken;
//               state.userData = { firstName, lastName, email, phoneNumber, profilePic };
//               state.loading = false;
//               state.error = null;
//             });
//           } catch (error) {
//             set((state) => {
//               state.error = error.message;
//               state.loading = false;
//             });
//           }
//         },

//         login: async ({ email, password }) => {
//           set((state) => {
//             state.loading = true;
//           });

//           try {
//             const userCredential = await signInWithEmailAndPassword(auth, email, password);
//             const user = userCredential.user;
//             set((state) => {
//               state.token = user.accessToken;
//               state.loading = false;
//               state.error = null;
//             });
//           } catch (error) {
//             set((state) => {
//               state.error = error.message;
//               state.loading = false;
//             });
//           }
//         },

//         logout: async () => {
//           await signOut(auth);
//           set((state) => {
//             state.token = null;
//             state.userData = null;
//           });
//         },
//       }),

//       {
//         name: "auth-token",
//         getStorage: () => localStorage,
//         partialize: (state) => ({
//           token: state.token,
//           userData: state.userData,
//         }),
//       }
//     )
//   )
// );