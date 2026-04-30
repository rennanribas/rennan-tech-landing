export type Messages = {
  home: {
    hero: {
      name: string;
      role: string;
      description: string;
      social: {
        email: string;
        github: string;
        linkedin: string;
      };
    };
  };
};

export const messages = {
  en: {
    home: {
      hero: {
        name: "Rennan Ribas",
        role: "Senior Software Engineer",
        description:
          "Architecting enterprise-grade solutions with 10+ years of expertise in TypeScript, React, and cloud-native technologies. Delivering scalable systems that drive business growth.",
        social: {
          email: "Email",
          github: "GitHub",
          linkedin: "LinkedIn",
        },
      },
    },
  },
  "pt-BR": {
    home: {
      hero: {
        name: "Rennan Ribas",
        role: "Engenheiro de Software S\u00eanior",
        description:
          "Projeto solu\u00e7\u00f5es corporativas com mais de 10 anos de experi\u00eancia em TypeScript, React e tecnologias nativas de nuvem. Entrego sistemas escal\u00e1veis que impulsionam o crescimento do neg\u00f3cio.",
        social: {
          email: "Email",
          github: "GitHub",
          linkedin: "LinkedIn",
        },
      },
    },
  },
} as const satisfies Record<string, Messages>;
