const path = require('path');
const winstaller = require('electron-winstaller');

var root = path.join('./');
var out = path.join(root, 'builds');

var handle = Promise.resolve({
    appDirectory: out,
    authors: 'Christian Engvall',
    noMsi: true,
    outputDirectory: path.join(out, 'builds'),
    exe: 'focus-kiosk.exe',
    setupExe: 'installer-win32.exe',
    setupIcon: path.join(root, './public/assets/images/logo-loader.png')
});

handle.then(winstaller.createWindowsInstaller).catch(function(err){
    console.error(err.message);
    process.exit(1);
});