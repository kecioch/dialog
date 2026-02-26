import React from "react";
import { Contact } from "../../../../types/chat";
import Avatar from "../../Avatar";

interface Props {
  data: Contact;
  onClick: () => void;
}

const ContactListItem = ({ data, onClick }: Props) => {
  const fullName = data.firstName + " " + data.lastName;

  return (
    <li>
      <button
        className={`min-w-0 w-full flex-1 h-16 flex justify-start items-center gap-2 p-2 rounded-lg
            transition-all duration-200
            active:bg-[var(--bg-chatlist-selected-active)]`}
        onClick={onClick}
        title={`${fullName} [${data.email}]`}
      >
        <Avatar className="h-full" name={fullName} />
        <div className="min-w-0 overflow-hidden text-start">
          <p className="font-normal truncate">{fullName}</p>
          <p className="font-light text-sm text-[var(--text-color-chatlist-muted)] truncate ">
            {data.email}
          </p>
        </div>
      </button>
    </li>
  );
};

export default ContactListItem;
