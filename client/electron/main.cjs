const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { spawn } = require("child_process");

const isDev = process.env.NODE_ENV === "development";
let win;
let serverProcess;

function startServer() {
  const serverPath = isDev
    ? path.join(__dirname, "../../server")
    : path.join(process.resourcesPath, "server");

  serverProcess = spawn("node", ["index.js"], {
    cwd: serverPath,
    env: { ...process.env, PORT: "5000" },
    shell: true,
  });

  serverProcess.stdout.on("data", (data) => {
    console.log(`Server: ${data}`);
  });

  serverProcess.stderr.on("data", (data) => {
    console.error(`Server Error: ${data}`);
  });

  serverProcess.on("close", (code) => {
    console.log(`Server exited with code ${code}`);
  });
}

function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.cjs"),
    },
    frame: false,
    title: "N&A School Supplies POS",
    backgroundColor: "#0a0a0a",
  });

  if (isDev) {
    win.loadURL(
      "data:text/html,<html style='background:#0a0a0a;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;font-family:sans-serif'><div style='text-align:center'><div style='width:48px;height:48px;border-radius:50%;background:#dc2626;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:500;color:#fff;margin:0 auto 12px'>N&A</div><p style='color:#fff;font-size:14px;margin:0 0 4px'>N&A School Supplies POS</p><p style='color:#555;font-size:12px;margin:0'>Starting system...</p></div></html>"
    );
    setTimeout(() => {
      win.loadURL("http://localhost:5173");
    }, 5000);
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  }
}

function killServer() {
  if (serverProcess && !serverProcess.killed) {
    serverProcess.kill("SIGTERM");
    serverProcess = null;
  }
}

ipcMain.on("minimize", () => win?.minimize());
ipcMain.on("maximize", () => {
  if (win?.isMaximized()) win.unmaximize();
  else win?.maximize();
});
ipcMain.on("close", () => {
  killServer();
  win?.close();
});

app.whenReady().then(() => {
  startServer();
  createWindow();
});

app.on("window-all-closed", () => {
  killServer();
  if (process.platform !== "darwin") app.quit();
});

app.on("before-quit", () => {
  killServer();
});