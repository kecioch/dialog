import { useEffect, useState } from "react";
import { Passkey } from "../types/Auth";
import { useAuth } from "./useAuth";

export type PasskeysLoadingState =
  | { status: "idle" }
  | { status: "loadingPasskeys" }
  | { status: "addingPasskey" }
  | { status: "deletingPasskey"; deletingId: string };

export function usePasskeys() {
  const { fetchPasskeys, deletePasskey, registerPasskey } = useAuth();
  const [loadingState, setLoadingState] = useState<PasskeysLoadingState>({
    status: "loadingPasskeys",
  });
  const [error, setError] = useState<null | string>(null);
  const [passkeys, setPasskeys] = useState<Passkey[]>([]);

  useEffect(() => {
    fetchPasskeys()
      .then((passkeys) => setPasskeys(passkeys))
      .catch((e) => setError(e.message))
      .finally(() => setLoadingState({ status: "idle" }));
  }, [fetchPasskeys]);

  const handleDeletePasskey = async (id: string) => {
    try {
      setError(null);
      setLoadingState({
        status: "deletingPasskey",
        deletingId: id,
      });
      await deletePasskey(id);
      setPasskeys((prev) => [...prev.filter((p) => p.id !== id)]);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoadingState({
        status: "idle",
      });
    }
  };

  const handleAddPasskey = async () => {
    try {
      setError(null);
      setLoadingState({ status: "addingPasskey" });
      const newPasskey = await registerPasskey();
      setPasskeys((prev) => [...prev, newPasskey]);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoadingState({
        status: "idle",
      });
    }
  };

  return {
    loadingState,
    error,
    passkeys,
    handleDeletePasskey,
    handleAddPasskey,
  };
}
