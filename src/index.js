import toolbarIcon from './assets/toolbaricon.svg?raw';
import libraryIcon from './assets/libraryicon.svg?raw';

miro.onReady(() => {
  console.log("Andreia 1");
  miro.initialize({
    extensionPoints: {
      toolbar: {
        title: 'Calculator',
        toolbarSvgIcon: toolbarIcon,
        librarySvgIcon: libraryIcon,
        async onClick() {
          // Remember that 'app.html' resolves relative to index.js file. So app.html have to be in the /dist/ folder.
          // await miro.board.ui.openLibrary('app.html', {
          //   title: 'Create Miro App',
          // });

          await miro.board.ui.openLeftSidebar('app.html')

        },
      },
    },
  });
});
