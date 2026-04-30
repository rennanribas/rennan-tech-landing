import { motion } from "motion/react";
import { Github, Linkedin, Mail, Heart, Languages } from "lucide-react";
import { useI18n, type Locale } from "@/i18n";

const localeLabels: Record<Locale, string> = {
  en: "EN",
  "pt-BR": "PT-BR",
};

const localeNames: Record<Locale, string> = {
  en: "English",
  "pt-BR": "Portugu\u00eas",
};

export default function Footer() {
  const { locale, setLocale } = useI18n();
  const currentYear = new Date().getFullYear();
  const nextLocale: Locale = locale === "en" ? "pt-BR" : "en";

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

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <motion.button
              type="button"
              onClick={() => setLocale(nextLocale)}
              aria-label={`Change language to ${localeNames[nextLocale]}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex h-9 items-center gap-2 rounded-xl bg-muted/50 px-3 text-xs font-semibold text-muted-foreground transition-all duration-300 hover:bg-muted hover:text-primary"
            >
              <Languages className="h-4 w-4" />
              {localeLabels[nextLocale]}
            </motion.button>

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
        </div>
      </div>
    </motion.footer>
  );
}
