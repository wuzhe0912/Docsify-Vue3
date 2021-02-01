window.$docsify = {
  name: 'docsify',
  repo: 'https://github.com/wuzhe0912/docsify-note',
  // open coverpage
  coverpage: true,
  logo: '/_media/icon.svg',
  loadSidebar: true,
  auto2top: true,
  maxLevel: 6,
  subMaxLevel: 3,
  tabs: {
    persist    : true,      // default
    sync       : true,      // default
    theme      : 'classic', // default
    tabComments: true,      // default
    tabHeadings: true       // default
  }
};
// Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-MMW5V7NW8N');