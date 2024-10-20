@echo off
setlocal enabledelayedexpansion

rem Устанавливаем начальный номер для переименования
set count=1

rem Перебираем все файлы .png в текущем каталоге
for %%f in (*.png) do (
    rem Проверяем, является ли имя файла числом
    set "filename=%%~nf"
    if "!filename!" neq "png" (
        rem Переименовываем файл, используя текущий номер
        ren "%%f" "!count!.png"
        rem Увеличиваем номер для следующего файла
        set /a count+=1
    )
)

endlocal
