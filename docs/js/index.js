window.$docsify = {
  name: 'docsify',
  repo: 'https://github.com/wuzhe0912/interview-docsify',
  // open coverpage
  coverpage: true,
  logo: '/_media/icon.svg',
  // sidebar
  loadSidebar: true,
  alias: {
    '/.*/_sidebar.md': '/_sidebar.md',
  },
  maxLevel: 6,
  subMaxLevel: 3,
  sidebarDisplayLevel: 1,
  auto2top: true, // 當 router 改變時，回到頁面頂部
  tabs: {
    persist: true, // default
    sync: true, // default
    theme: 'classic', // default
    tabComments: true, // default
    tabHeadings: true, // default
  },
  count: {
    countable: true,
    position: 'top',
    float: 'left',
    fontsize: '1em',
    color: 'rgb(90,90,90)',
    isExpected: true,
  },
  disqus: 'shortname',
  footer: {
    copy: '<span>&copy; 2021</span>',
    auth: 'by PittWu',
    style: 'text-align: center;',
    class: 'className',
  },
};
// Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag('js', new Date());

gtag('config', 'G-MMW5V7NW8N');
