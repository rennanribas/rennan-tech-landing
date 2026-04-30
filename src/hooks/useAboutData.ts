import { useI18n } from "@/i18n";

export interface Experience {
  title: string;
  company: string;
  period: string;
  summary: string;
  highlights: string[];
  stack: string[];
}

export interface Capability {
  title: string;
  description: string;
  focus: string[];
  tools: string[];
}

export function useAboutData(): {
  experiences: Experience[];
  capabilities: Capability[];
} {
  const { messages } = useI18n();
  const { experiences, capabilities } = messages.about;

  return { experiences, capabilities };
}
