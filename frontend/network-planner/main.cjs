const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    title: "Сервис планирования сети"
  });

  // Загружаем только готовый билд из папки dist
  win.loadFile(path.join(__dirname, 'dist/index.html'));
  
  // Убираем верхнее меню для красоты
  win.setMenu(null);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
