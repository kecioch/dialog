import React, { useEffect, useState } from "react";
import Searchbar from "../../Searchbar";
import { useContacts } from "../../../../hooks/useContacts";
import Spinner from "../../../ui/Spinner";
import { Contact } from "../../../../types/chat";
import ContactListItem from "./ContactListItem";
import MutedTextHeading from "../../../ui/MutedTextHeading";
import ErrorText from "../../../ui/ErrorText";

interface Props {
  onSelect: (contact: Contact) => void;
}

const ContactList = ({ onSelect }: Props) => {
  const { contacts, loading, error } = useContacts();
  const [contactList, setContactList] = useState<Contact[]>([]);

  useEffect(() => setContactList([...contacts]), [contacts]);

  const handleSearch = (text: string) => {
    setContactList(
      contacts.filter((el) => {
        const fullName = el.firstName + " " + el.lastName;
        const searchText = text.toLocaleLowerCase();
        return (
          fullName.toLowerCase().includes(searchText) ||
          el.email.toLowerCase().includes(searchText)
        );
      }),
    );
  };

  return (
    <div>
      <Searchbar onSearch={handleSearch} />
      {error && <ErrorText className="px-3 mb-3">{error}</ErrorText>}
      {loading ? (
        <Spinner />
      ) : contactList.length > 0 ? (
        <ul className="flex-1 w-full overflow-y-auto overflow-x-hidden flex flex-col gap-2 ">
          {contactList.map((el, i) => (
            <ContactListItem key={i} data={el} onClick={() => onSelect(el)} />
          ))}
        </ul>
      ) : (
        <MutedTextHeading>Looks empty here!</MutedTextHeading>
      )}
    </div>
  );
};

export default ContactList;
