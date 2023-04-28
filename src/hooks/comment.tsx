import { useState } from "react";
import { uuidv4 } from "@firebase/util";
import {
  doc,
  setDoc,
  query,
  collection,
  where,
  orderBy,
  deleteDoc,
} from "@firebase/firestore";
import { db } from "lib/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

export function useAddComment({
  postId,
  uid,
}: {
  postId: string;
  uid: string;
}) {
  const [isLoading, setLoading] = useState(false);

  async function addComment(text: string) {
    setLoading(true);
    const id = uuidv4();
    const date = Date.now();
    const docRef = doc(db, "comments", id);
    await setDoc(docRef, { text, id, postId, date, uid });

    //toast --> comment added !

    setLoading(false);
  }
  return { addComment, isLoading };
}

export function useComments(postId: string) {
  const q = query(
    collection(db, "comments"),
    where("postId", "==", postId),
    orderBy("date", "desc")
  );

  const [comments, isLoading, error] = useCollectionData(q);

  if (error) throw error;

  return { comments, isLoading };
}

export function useDeleteComment(id: string) {
  const [isLoading, setLoading] = useState(false);

  async function deleteComment() {
    setLoading(true);

    // just to see loader
    setTimeout(async () => {
      const docRef = doc(db, "comments", id);
      await deleteDoc(docRef);
    }, 3000);
    // toast comment deleted
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }
  return { deleteComment, isLoading };
}
