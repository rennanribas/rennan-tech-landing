import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useHeader } from "../hooks/useHeader";
import { ThemeToggle } from "./ThemeToggle";

type NavChild = { to: string; label: string };

function DesktopNavItem({
  to,
  label,
  children,
  index,
  linkClassName,
}: {
  to: string;
  label: string;
  children?: NavChild[];
  index: number;
  linkClassName: ({ isActive }: { isActive: boolean }) => string;
}) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);

  const cancelClose = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => () => cancelClose(), []);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 + 0.3 }}
      onMouseEnter={() => {
        if (children) {
          cancelClose();
          setOpen(true);
        }
      }}
      onMouseLeave={() => {
        if (children) scheduleClose();
      }}
    >
      <NavLink to={to} className={linkClassName}>
        {({ isActive }) => (
          <>
            <span className="relative z-10 inline-flex items-center gap-1">
              {label}
              {children && (
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              )}
            </span>
            {isActive && (
              <motion.div
                className="absolute inset-0 glass-highlight opacity-50 rounded-xl"
                layoutId="activeTab"
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              />
            )}
            <motion.div
              className="absolute inset-0 glass-highlight opacity-0 group-hover:opacity-30 rounded-xl transition-opacity duration-300"
              whileHover={{ opacity: 0.3 }}
            />
          </>
        )}
      </NavLink>

      {children && (
        <AnimatePresence>
          {open && (
            <motion.div
              className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
            >
              <div className="min-w-[260px] rounded-xl border border-border/30 bg-background/90 p-2 shadow-xl backdrop-blur-xl">
                {children.map((child) => (
                  <NavLink
                    key={child.to}
                    to={child.to}
                    end
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-foreground/80 hover:bg-foreground/5 hover:text-foreground"
                      }`
                    }
                  >
                    {child.label}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { navItems } = useHeader();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClassName = ({ isActive }: { isActive: boolean }): string =>
    `relative font-semibold transition-all duration-300 px-4 py-3 rounded-xl group overflow-hidden ${
      isActive
        ? "text-primary glass-subtle shadow-soft"
        : "text-foreground/70 hover:text-foreground hover:glass-subtle hover:shadow-soft"
    }`;

  const mobileLinkClassName = ({ isActive }: { isActive: boolean }): string =>
    `relative font-medium transition-all duration-300 py-3 px-4 rounded-xl overflow-hidden ${
      isActive
        ? "text-primary glass-surface shadow-soft"
        : "text-foreground/80 hover:text-foreground hover:glass-subtle hover:shadow-soft"
    }`;

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/20 shadow-xl"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <NavLink
              to="/"
              className="text-xl lg:text-2xl font-bold text-foreground hover:text-primary transition-all duration-300 tracking-tight"
            >
              Rennan Ribas
            </NavLink>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex items-center space-x-1">
              {navItems.map((item, index) => (
                <DesktopNavItem
                  key={item.to}
                  to={item.to}
                  label={item.label}
                  children={item.children}
                  index={index}
                  linkClassName={linkClassName}
                />
              ))}
            </div>
            <motion.div
              className="ml-8 pl-8 border-l border-border/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <ThemeToggle />
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-3 text-foreground/60 hover:text-foreground transition-all duration-300 rounded-xl hover:glass-subtle hover:shadow-soft relative overflow-hidden"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="px-4 py-6 border-t border-glass-border glass-surface glass-refraction relative overflow-hidden">
                {/* Mobile Menu Glass Effects */}
                <div className="absolute inset-0 glass-highlight opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-secondary/3" />
                <div className="flex flex-col space-y-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.to}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <NavLink
                        to={item.to}
                        end
                        onClick={() => setIsMenuOpen(false)}
                        className={mobileLinkClassName}
                      >
                        {({ isActive }) => (
                          <>
                            <span className="relative z-10">{item.label}</span>
                            {isActive && (
                              <div className="absolute inset-0 glass-highlight opacity-40 rounded-xl" />
                            )}
                          </>
                        )}
                      </NavLink>
                      {item.children && (
                        <div className="ml-3 mt-1 flex flex-col gap-1 border-l border-border/20 pl-3">
                          {item.children.map((child) => (
                            <NavLink
                              key={child.to}
                              to={child.to}
                              end
                              onClick={() => setIsMenuOpen(false)}
                              className={({ isActive }) =>
                                `rounded-lg px-3 py-2 text-sm transition-colors ${
                                  isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
                                }`
                              }
                            >
                              {child.label}
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                  <motion.div
                    className="pt-6 mt-4 border-t border-border/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navItems.length * 0.1 + 0.2 }}
                  >
                    <ThemeToggle />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
