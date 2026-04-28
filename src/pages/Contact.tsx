import { motion } from "motion/react";
import { useContactData } from "../hooks/useContactData";
import { ContactHeader } from "../components/contact/ContactHeader";
import { ContactDetails } from "../components/contact/ContactDetails";

export default function Contact() {
  const { methods } = useContactData();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ContactHeader />
      <ContactDetails methods={methods} />
    </motion.div>
  );
}
