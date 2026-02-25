import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface Props {
  className?: string;
}

const Spinner = ({ className }: Props) => {
  return (
    <div className={`w-full flex justify-center items-center text-xl ${className}`}>
      <FontAwesomeIcon icon={faSpinner} spin />
    </div>
  );
};

export default Spinner;
