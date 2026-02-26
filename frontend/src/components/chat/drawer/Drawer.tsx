import { motion } from "framer-motion";
import IconButton from "../../ui/IconButton";
import { faX } from "@fortawesome/free-solid-svg-icons";

export type DrawerView = "settings" | "contacts" | null;

interface Props {
  children?: React.ReactNode;
  title: string;
  onClose: () => void;
}

const Drawer = ({ children, title, onClose }: Props) => {
  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute inset-0 rounded-3xl bg-[var(--bg-chatlist)] h-full theme-transition xbg-green-800"
    >
      <div className="flex justify-end pt-4 ">
        <IconButton icon={faX} className="text-xl" onClick={onClose} />
      </div>
      <div className="h-full pb-24 flex flex-col bg-red-950x">
        <h2 className="text-3xl uppercase text-center mb-4">{title}</h2>
        <div className="flex-1 overflow-y-auto overflow-x-hidden bg-blue-900x p-4">{children}</div>
      </div>
    </motion.div>
  );
};

export default Drawer;
