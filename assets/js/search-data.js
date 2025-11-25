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
          description: "Materials for courses you taught. Replace this text with your description.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather.html";
            },},{id: "news-i-have-won-the-wilfrid-laurier-s-academic-excellence-master-s-gold-medal-it-is-a-prestigious-medal-awarding-to-master-students-with-competitive-achievements",
          title: '🥇 I have won the Wilfrid Laurier’s Academic Excellence Master’s Gold Medal! It...',
          description: "",
          section: "News",},{id: "news-i-am-happy-to-share-that-our-paper-𝐓𝐨𝐰𝐚𝐫𝐝-𝐕𝐢𝐫𝐭𝐮𝐨𝐮𝐬-𝐑𝐞𝐢𝐧𝐟𝐨𝐫𝐜𝐞𝐦𝐞𝐧𝐭-𝐋𝐞𝐚𝐫𝐧𝐢𝐧𝐠-𝐀-𝐂𝐫𝐢𝐭𝐢𝐪𝐮𝐞-𝐚𝐧𝐝-𝐑𝐨𝐚𝐝𝐦𝐚𝐩-has-been-accepted-to-the-𝑀𝑎𝑐ℎ𝑖𝑛𝑒-𝐸𝑡ℎ𝑖𝑐𝑠-𝐹𝑜𝑟𝑚𝑎𝑙-𝑀𝑒𝑡ℎ𝑜𝑑𝑠-𝑡𝑜-𝐸𝑚𝑒𝑟𝑔𝑒𝑛𝑡-𝑀𝑎𝑐ℎ𝑖𝑛𝑒-𝐸𝑡ℎ𝑖𝑐𝑠-workshop-at-the-𝐀𝐀𝐀𝐈-conference",
          title: '🎉 I am happy to share that our paper “𝐓𝐨𝐰𝐚𝐫𝐝 𝐕𝐢𝐫𝐭𝐮𝐨𝐮𝐬 𝐑𝐞𝐢𝐧𝐟𝐨𝐫𝐜𝐞𝐦𝐞𝐧𝐭 𝐋𝐞𝐚𝐫𝐧𝐢𝐧𝐠:...',
          description: "",
          section: "News",},{
        id: 'social-cv',
        title: 'CV',
        section: 'Socials',
        handler: () => {
          window.open("/assets/pdf/example_pdf.pdf", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%79%6F%75@%65%78%61%6D%70%6C%65.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-inspire',
        title: 'Inspire HEP',
        section: 'Socials',
        handler: () => {
          window.open("https://inspirehep.net/authors/1010907", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=qc6CJjYAAAAJ", "_blank");
        },
      },{
        id: 'social-custom_social',
        title: 'Custom_social',
        section: 'Socials',
        handler: () => {
          window.open("https://www.alberteinstein.com/", "_blank");
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
