import React from "react";
import { motion } from "framer-motion";
import { Passkey } from "../../../../types/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faKey, faTrash } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../../../ui/IconButton";

interface Props {
  data: Passkey;
  isLoading?: boolean;
  onDelete: (id: string) => void;
}

const PasskeyListItem = ({ data, isLoading = false, onDelete }: Props) => {
  return (
    <motion.li
      key={data.id}
      className="bg-[var(--bg-listitem)] p-2 rounded-lg theme-transition"
      layout
      exit={{
        opacity: 0,
        x: 20,
        height: 0,
        marginBottom: 0,
        padding: 0,
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div>
        <div className="flex gap-3 justify-between items-start">
          <p className="font-normal text-base mb-1">
            {data.deviceType === "multiDevice" ? (
              <FontAwesomeIcon
                icon={faCloud}
                className="text-[var(--primary-300)]"
              />
            ) : (
              <FontAwesomeIcon
                icon={faKey}
                className="text-[var(--primary-300)]"
              />
            )}
            <span className="ml-2">{data.name}</span>
          </p>
          <IconButton
            icon={faTrash}
            className={`bg-red-700 text-sm text-[var(--neutral-500)] 
                      ${!isLoading && "active:text-[var(--neutral-100)]"}`}
            title="Delete Passkey"
            onClick={() => onDelete(data.id)}
            disabled={isLoading}
            isLoading={isLoading}
          />
        </div>
        <p className="text-sm">
          <span className="font-normal">Added:</span>{" "}
          {new Date(data.createdAt).toLocaleString()}
        </p>
        {data.lastUsedAt && (
          <p className="text-sm">
            <span className="font-normal">Last used:</span>{" "}
            {new Date(data.lastUsedAt).toLocaleString()}
          </p>
        )}
      </div>
    </motion.li>
  );
};

export default PasskeyListItem;
