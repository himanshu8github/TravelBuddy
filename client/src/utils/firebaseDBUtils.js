
import { collection,  query, where, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const addTrip = async (trip) => {
  try {
    const docRef = await addDoc(collection(db, "trips"), trip);
    return docRef.id;
  } catch (error) {
    console.error("Error adding trip:", error);
    return null;
  }
};

export const fetchTripsByUser = async (userId) => {
  const q = query(collection(db, "trips"), where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
