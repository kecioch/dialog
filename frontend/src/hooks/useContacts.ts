import { useEffect, useState } from "react";
import api from "../lib/api";
import { Contact } from "../types/chat";

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<Contact[]>("/contacts")
      .then((data) => setContacts(data))
      .catch(() => setError("Failed to load contacts"))
      .finally(() => setLoading(false));
  }, []);

  return { contacts, loading, error };
}
