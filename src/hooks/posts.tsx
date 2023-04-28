import { useState } from "react";
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
import { db } from "lib/firebase";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";

export function useAddPost() {
  const [isLoading, setLoading] = useState(false);
  async function addPost(post: any) {
    setLoading(true);
    const id = uuidv4();
    await setDoc(doc(db, "posts", id), {
      ...post,
      id,
      likes: [],
      date: Date.now(),
    });
    //toast Post added successfully

    setLoading(false);
  }

  return { addPost, isLoading };
}

export function usePosts(uid?: string) {
  const q = uid
    ? query(
        collection(db, "posts"),
        orderBy("date", "desc"),
        where("uid", "==", uid)
      )
    : query(collection(db, "posts"), orderBy("date", "desc"));
  const [posts, isLoading, error] = useCollectionData(q);
  if (error) throw error;
  return { posts, isLoading };
}

export function useToggleLike(obj: any) {
  const { id, isLiked, uid } = obj;
  const [isLoading, setLoading] = useState(false);

  async function toggleLike() {
    setLoading(true);
    const docRef = doc(db, "posts", String(id));
    await updateDoc(docRef, {
      likes: isLiked ? arrayRemove(uid) : arrayUnion(uid),
    });

    setLoading(false);
  }

  return { toggleLike, isLoading };
}

export function useDeletePost(id: any) {
  const [isLoading, setLoading] = useState(false);

  async function deletePost() {
    setLoading(true);

    setTimeout(async () => {
      // Delete Post
      await deleteDoc(doc(db, "posts", id));

      // Delete Comments
      const q = query(collection(db, "comments"), where("postId", "==", id));
      const querySnapShot = await getDocs(q);
      querySnapShot.forEach(async (doc) => deleteDoc(doc.ref));

      //toast Post deleted
    }, 3000);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }

  return { deletePost, isLoading };
}

export function usePost(id: any) {
  const q: any = doc(db, "posts", String(id));
  const [post, isLoading] = useDocumentData(q);

  return { post, isLoading };
}
