import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "lib/firebase";

export default async function isUserNameExists(username: string) {
  const q = query(collection(db, "users"), where("username", "==", username));
  const querySnapShot = await getDocs(q);

  return querySnapShot.size > 0;
}
