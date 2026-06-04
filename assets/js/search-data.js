// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "publications",
          description: "publications by categories in reversed chronological order.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-teaching",
          title: "teaching",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "news-i-graduated-from-the-master-of-applied-computing-program-at-wilfrid-laurier-university-where-i-was-awarded-wilfrid-laurier-s-academic-excellence-master-s-gold-medal-the-university-s-most-prestigious-distinction-for-master-s-students",
          title: 'I graduated from the Master of Applied Computing program at Wilfrid Laurier University,...',
          description: "",
          section: "News",},{id: "news-i-have-started-my-ph-d-in-ece-at-the-university-of-waterloo-working-with-dr-mark-crowley",
          title: 'I have started my Ph.D. in ECE at the University of Waterloo working...',
          description: "",
          section: "News",},{id: "news-my-paper-toward-virtuous-reinforcement-learning-a-critique-and-roadmap-has-been-accepted-to-machine-ethics-formal-methods-to-emergent-machine-ethics-workshop-at-the-aaai-2026-conference",
          title: 'My paper “Toward Virtuous Reinforcement Learning: A Critique and Roadmap has been accepted...',
          description: "",
          section: "News",},{id: "news-i-am-awarded-the-university-of-waterloo-s-graduate-student-research-dissemination-award-gsrda",
          title: 'I am awarded the University of Waterloo’s Graduate Student Research Dissemination Award (GSRDA)!...',
          description: "",
          section: "News",},{id: "news-my-paper-on-deep-reinforcement-learning-s-scaling-limits-is-accepted-to-canadian-ai-2026",
          title: 'My paper on Deep Reinforcement Learning’s scaling limits is accepted to Canadian AI...',
          description: "",
          section: "News",},{id: "news-my-extended-abstract-on-virtue-ethics-with-reinforcement-learning-is-accepted-to-formal-ethics-2026-conference",
          title: 'My Extended abstract on Virtue Ethics with Reinforcement Learning is accepted to Formal...',
          description: "",
          section: "News",},{id: "news-i-am-awarded-the-university-of-waterloo-s-graduate-student-research-dissemination-award-gsrda",
          title: 'I am awarded the University of Waterloo’s Graduate Student Research Dissemination Award (GSRDA)!...',
          description: "",
          section: "News",},{id: "news-two-of-my-papers-are-accepted-to-icml-26-workshops-pluralistic-alignment-and-philml",
          title: 'Two of my papers are accepted to ICML’26 Workshops (Pluralistic Alignment and PhilML)!...',
          description: "",
          section: "News",},{id: "news-i-am-awarded-the-university-of-waterloo-s-faculty-of-engineering-star-student-term-activity-report-award-previously-recognized-as-the-foe-awards-for-my-winter-semester-s-outstanding-performance",
          title: 'I am awarded the University of Waterloo’s Faculty of Engineering STAR (Student Term...',
          description: "",
          section: "News",},{
        id: 'social-cv',
        title: 'CV',
        section: 'Socials',
        handler: () => {
          window.open("/assets/pdf/Majid_Ghasemi_CV.pdf", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%6D%61%6A%69%64.%67%68%61%73%65%6D%69@%75%77%61%74%65%72%6C%6F%6F.%63%61", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/majidghassemi", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/majiddghasemi", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=cHOAJEgAAAAJ", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
