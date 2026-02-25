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
      className="absolute inset-0 rounded-3xl bg-[var(--bg-chatlist)] h-full theme-transition"
    >
      <div className="flex justify-end pt-4 ">
        <IconButton icon={faX} className="text-xl" onClick={onClose} />
      </div>
      <div className="p-6 h-full">
        <h2 className="text-3xl uppercase text-center mb-7">{title}</h2>
        <div className="h-full overflow-y-auto">{children}</div>
      </div>
    </motion.div>
  );
};

export default Drawer;
