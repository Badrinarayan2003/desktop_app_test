import { app, BrowserWindow, dialog } from "electron";
import electronUpdater from "electron-updater";
import path from "path";
import { fileURLToPath } from "url";

const { autoUpdater } = electronUpdater;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,

        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    if (!app.isPackaged) {
        mainWindow.loadURL("http://localhost:5173");
    } else {
        mainWindow.loadFile(
            path.join(__dirname, "../dist/index.html")
        );
    }
}

function setupAutoUpdater() {

    autoUpdater.checkForUpdatesAndNotify();

    autoUpdater.on("checking-for-update", () => {
        console.log("Checking for updates...");
    });

    autoUpdater.on("update-available", () => {
        console.log("Update available");
    });

    autoUpdater.on("update-not-available", () => {
        console.log("No updates available");
    });

    autoUpdater.on("download-progress", (progress) => {
        console.log(
            `Downloaded ${progress.percent.toFixed(2)}%`
        );
    });

    autoUpdater.on("update-downloaded", () => {
        dialog.showMessageBox({
            type: "info",
            title: "Update Ready",
            message:
                "A new version has been downloaded. Restart now?"
        }).then(() => {
            autoUpdater.quitAndInstall();
        });
    });

    autoUpdater.on("error", (err) => {
        console.log("Auto Update Error:", err);
    });
}

app.whenReady().then(() => {
    createWindow();

    if (app.isPackaged) {
        setupAutoUpdater();
    }
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});