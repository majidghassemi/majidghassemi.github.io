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
        },{id: "news-i-have-won-the-wilfrid-laurier-s-academic-excellence-master-s-gold-medal-it-is-a-prestigious-medal-awarding-to-master-students-with-competitive-achievements",
          title: '🥇 I have won the Wilfrid Laurier’s Academic Excellence Master’s Gold Medal! It...',
          description: "",
          section: "News",},{id: "news-i-have-started-my-ph-d-in-ece-at-the-university-of-waterloo-working-with-dr-mark-crowley",
          title: '🎉 I have started my Ph.D. in ECE at the University of Waterloo...',
          description: "",
          section: "News",},{id: "news-i-am-happy-to-share-that-our-paper-𝐓𝐨𝐰𝐚𝐫𝐝-𝐕𝐢𝐫𝐭𝐮𝐨𝐮𝐬-𝐑𝐞𝐢𝐧𝐟𝐨𝐫𝐜𝐞𝐦𝐞𝐧𝐭-𝐋𝐞𝐚𝐫𝐧𝐢𝐧𝐠-𝐀-𝐂𝐫𝐢𝐭𝐢𝐪𝐮𝐞-𝐚𝐧𝐝-𝐑𝐨𝐚𝐝𝐦𝐚𝐩-has-been-accepted-to-the-𝑀𝑎𝑐ℎ𝑖𝑛𝑒-𝐸𝑡ℎ𝑖𝑐𝑠-𝐹𝑜𝑟𝑚𝑎𝑙-𝑀𝑒𝑡ℎ𝑜𝑑𝑠-𝑡𝑜-𝐸𝑚𝑒𝑟𝑔𝑒𝑛𝑡-𝑀𝑎𝑐ℎ𝑖𝑛𝑒-𝐸𝑡ℎ𝑖𝑐𝑠-workshop-at-the-𝐀𝐀𝐀𝐈-conference",
          title: '🎉 I am happy to share that our paper “𝐓𝐨𝐰𝐚𝐫𝐝 𝐕𝐢𝐫𝐭𝐮𝐨𝐮𝐬 𝐑𝐞𝐢𝐧𝐟𝐨𝐫𝐜𝐞𝐦𝐞𝐧𝐭 𝐋𝐞𝐚𝐫𝐧𝐢𝐧𝐠:...',
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
