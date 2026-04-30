import { motion } from "motion/react";
import {
  ChevronDown,
  Github,
  Globe2,
  Heart,
  Linkedin,
  Mail,
} from "lucide-react";
import { useI18n, type Locale } from "@/i18n";

const localeLabels: Record<Locale, string> = {
  en: "English",
  "pt-BR": "Portugu\u00eas",
};

export default function Footer() {
  const { locale, setLocale } = useI18n();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/rennanribas",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/rennanribas",
      label: "LinkedIn",
    },
    {
      icon: Mail,
      href: "mailto:rennanrr@gmail.com",
      label: "Email",
    },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative z-10 mt-16 lg:mt-24"
    >
      {/* Subtle separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

      <div className="container-responsive pb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand & Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-lg font-bold text-foreground"
            >
              Rennan Ribas
            </motion.div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>© {currentYear}</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                Made with{" "}
                <Heart className="w-3 h-3 text-red-500 fill-current" /> in
                Brazil
              </span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-xl bg-muted/50 hover:bg-muted transition-all duration-300 group"
                  >
                    <IconComponent className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </motion.a>
                );
              })}
            </div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.7 }}
            >
              <Globe2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <select
                value={locale}
                onChange={(event) => setLocale(event.target.value as Locale)}
                aria-label="Change language"
                className="h-9 w-36 appearance-none rounded-xl border border-border/40 bg-muted/40 py-0 pl-9 pr-8 text-xs font-semibold text-muted-foreground shadow-soft transition-all duration-300 hover:border-primary/30 hover:bg-muted hover:text-primary"
              >
                {Object.entries(localeLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
