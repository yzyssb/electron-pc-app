// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1500,
    height: 900,
	icon: path.join(__dirname, './girl.png'),    // 注意，这里的path是一个node模块哦，需要npm安装并且引入使用。最直接的作用就是拼接字符串。
    webPreferences: {
      preload: path.join(__dirname, './preload.js')
    }
  })
  
  const menu = Menu.buildFromTemplate([
      {
        label: '前进',
        click: () => { mainWindow.webContents.goForward() }
      },
	  {
	    label: '后退',
	    click: () => { mainWindow.webContents.goBack() }
	  },
	  {
	    label: '百度',
	    click: () => { mainWindow.loadURL('https://www.baidu.com') }
	  },
	  {
	    label: '关闭',
	    click: () => { app.quit() }
	  }
  ])
  
    Menu.setApplicationMenu(menu)
    // Menu.setApplicationMenu(null)

  // and load the index.html of the app.
  // mainWindow.loadFile('./dist/index.html')
  // mainWindow.loadURL('https://yangzhiyuan.top')
  mainWindow.loadURL('https://www.baidu.com')
  
  const contents = mainWindow.webContents
  console.log(contents)
  
  const homeDir = path.dirname(app.getPath('exe')) 
  alert(homeDir)

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

try{
	require('electron-reloader')(module,{});
}catch(_){
	
}