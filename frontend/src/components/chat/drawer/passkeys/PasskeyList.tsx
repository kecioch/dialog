import Button from "../../../ui/Button";
import { AnimatePresence, motion } from "framer-motion";
import MutedTextHeading from "../../../ui/MutedTextHeading";
import { usePasskeys } from "../../../../hooks/usePasskeys";
import ErrorText from "../../../ui/ErrorText";
import Spinner from "../../../ui/Spinner";
import PasskeyListItem from "./PasskeyListItem";

export function PasskeyList() {
  const {
    passkeys,
    loadingState,
    error,
    handleAddPasskey,
    handleDeletePasskey,
  } = usePasskeys();

  const deletingId =
    loadingState.status === "deletingPasskey" ? loadingState.deletingId : null;

  return (
    <div>
      <div className="flex flex-col  gap-2 justify-center items-center mb-5">
        <Button
          className="w-[90%] text-sm py-2 "
          fill
          disabled={loadingState.status === "addingPasskey"}
          onClick={handleAddPasskey}
        >
          Add new Passkey
        </Button>
        {error && <ErrorText>{error}</ErrorText>}
      </div>

      {loadingState.status === "loadingPasskeys" ? (
        <Spinner />
      ) : (
        <motion.ul layout className="flex flex-col gap-2">
          <AnimatePresence>
            {passkeys.map((passkey) => (
              <PasskeyListItem
                key={passkey.id}
                data={passkey}
                isLoading={deletingId === passkey.id}
                onDelete={handleDeletePasskey}
              />
            ))}

            {passkeys.length <= 0 && (
              <MutedTextHeading>No passkeys registered yet</MutedTextHeading>
            )}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
}
