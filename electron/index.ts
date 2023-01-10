// app 控制应用程序的事件生命周期（相当于应用程序）
// BrowserWindow 创建并控制浏览器窗口（相当于打开桌面弹框）
import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'

//获取当前环境
const evn = process.env.NODE_ENV;

// 定义全局变量，获取窗口实例
var win: BrowserWindow;

/**
 * 创建一个窗口
 */
const createWindow = () => {
    win = new BrowserWindow({
        webPreferences: {
            devTools: true,
            // 集成网页和 Node.js，也就是在渲染进程中，可以调用 Node.js 方法
            nodeIntegration: true,
            contextIsolation: false,
            //允许html页面上的javascipt代码访问nodejs 环境api代码的能力（与node集成的意思）
        }
    })

    // 生产环境、开发环境，访问的路径不同
    // 开发环境下，我们访问的是 Vite 本地服务
    // 打包之后，我们访问的是 dist 静态文件
    // 所以这里要加个判断
    if (evn == 'development') {
        win.loadURL(`http://localhost:3000/`)
        win.webContents.openDevTools()
    } else {
        win.loadFile(path.join(__dirname, "../dist/index.html"));
    }

    ipcMain.on('message', () => {
        console.log('收到网页消息')
    })
}

// 初始化app（在 Electron 完成初始化时触发）
app.whenReady().then(createWindow).then(() => {
    setTimeout(() => {
        win.webContents.send("message", { message: "electron初始化了" })
        console.log("发送了消息")
    }, 500)
})

