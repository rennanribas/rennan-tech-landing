export interface HeaderItem {
  to: string;
  label: string;
  children?: HeaderItem[];
}

export const useHeader = (): { navItems: HeaderItem[] } => {
  const navItems: HeaderItem[] = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    {
      to: "/leetcode",
      label: "LeetCode",
      children: [
        { to: "/leetcode", label: "Overview" },
        { to: "/leetcode/provinces", label: "Number of Provinces" },
      ],
    },
  ];

  return { navItems };
};
