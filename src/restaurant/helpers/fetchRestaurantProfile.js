import { getFirestore, doc, getDoc } from "firebase/firestore";
const db = getFirestore();

export const fetchRestaurantProfile = async (uid) => {
    try {
        const restaurantDoc = await getDoc(doc(db, "restaurants", uid));
        if (restaurantDoc.exists()) {
            return restaurantDoc.data();
        } else {
            return null;
        }
    } catch(error) {
        console.log(error);
        return null;
    }
}