import { collection, doc, query, updateDoc } from "firebase/firestore";
import { db, storage } from "lib/firebase";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";

export function useUser(id: string) {
  const docRef: any = doc(db, "users", String(id));
  const q: any = query(docRef);

  // const q = query(doc(db, "users", String(id)));
  const [user, isLoading] = useDocumentData(q);

  return { user, isLoading };
}

export function useUsers() {
  const [users, isLoading] = useCollectionData(collection(db, "users"));

  return { users, isLoading };
}

export function useUpdateAvatar(uid: string) {
  const [isLoading, setLoading] = useState(false);
  const [file, setFile] = useState<any>(null);
  const navigate = useNavigate();

  async function updateAvatar() {
    if (!file) return;

    setLoading(true);

    const fileRef = ref(storage, "avatars/" + uid);
    await uploadBytes(fileRef, file);

    const avatarURL = await getDownloadURL(fileRef);

    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, { avatar: avatarURL });

    // toast uploaded

    setLoading(false);

    navigate(0);
  }

  return {
    setFile,
    updateAvatar,
    isLoading,
    fileURL: file && URL.createObjectURL(file),
  };
}
