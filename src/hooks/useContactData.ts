import type { ComponentType } from "react";
import { MdEmail } from "react-icons/md";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useI18n } from "@/i18n";

export interface ContactMethod {
  title: string;
  value: string;
  href: string;
  description: string;
  icon: ComponentType<{ className?: string; size?: number }>;
  external?: boolean;
}

export function useContactData(): { methods: ContactMethod[] } {
  const { messages } = useI18n();
  const { methods: methodMessages } = messages.contact;

  const methods: ContactMethod[] = [
    {
      title: methodMessages.email.title,
      value: "rennanrr@gmail.com",
      href: "mailto:rennanrr@gmail.com",
      description: methodMessages.email.description,
      icon: MdEmail,
    },
    {
      title: methodMessages.github.title,
      value: "github.com/rennanribas",
      href: "https://github.com/rennanribas",
      description: methodMessages.github.description,
      icon: FaGithub,
      external: true,
    },
    {
      title: methodMessages.linkedin.title,
      value: "linkedin.com/in/rennan-ribas",
      href: "https://linkedin.com/in/rennan-ribas",
      description: methodMessages.linkedin.description,
      icon: FaLinkedin,
      external: true,
    },
  ];

  return { methods };
}
