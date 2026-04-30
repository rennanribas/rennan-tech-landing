import { useI18n } from "@/i18n";

export interface HeaderItem {
  to: string;
  label: string;
  children?: HeaderItem[];
}

export const useHeader = (): {
  navItems: HeaderItem[];
  menuToggleLabel: string;
} => {
  const { messages } = useI18n();
  const navigation = messages.navigation;

  const navItems: HeaderItem[] = [
    { to: "/", label: navigation.home },
    { to: "/about", label: navigation.about },
    { to: "/contact", label: navigation.contact },
    {
      to: "/leetcode",
      label: navigation.leetcode,
      children: [
        { to: "/leetcode", label: navigation.leetcodeOverview },
        { to: "/leetcode/provinces", label: navigation.leetcodeProvinces },
        {
          to: "/leetcode/smallest-missing-positive",
          label: navigation.leetcodeSmallestMissingPositive,
        },
      ],
    },
  ];

  return { navItems, menuToggleLabel: navigation.menuToggle };
};
