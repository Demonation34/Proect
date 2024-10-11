# Сначала устанавливаем параметры для работы с PowerShell
Set-ExecutionPolicy Bypass -Scope Process -Force

# Мониторим изменения в файле index.html и автоматически выполняем команды
chokidar "F:\Proect\Proect\index.html" -c `
  "git add F:/Proect/Proect/index.html`
   git commit -m 'Auto commit: изменения в index.html' `
   git push origin main"
