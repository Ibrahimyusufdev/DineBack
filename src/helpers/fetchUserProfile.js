import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore();

export const fetchUserProfile = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));

    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
