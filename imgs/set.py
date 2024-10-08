import os

# Укажите путь к каталогу, который хотите обработать
directory = os.getcwd()  # Текущая директория, можно заменить на нужную

# Получаем список всех файлов с расширением .png
png_files = [f for f in os.listdir(directory) if f.endswith('.png')]

# Начинаем с индекса 1
index = 1

while True:
    new_filename = f"{index}.png"
    
    # Проверяем, существует ли файл с таким именем
    if new_filename not in png_files:
        # Переименовываем файл, если имя не занято
        for old_filename in png_files:
            os.rename(os.path.join(directory, old_filename), os.path.join(directory, new_filename))
            print(f"Файл {old_filename} переименован в {new_filename}")
            break  # Выходим из цикла после переименования первого подходящего файла
    
    # Увеличиваем индекс для следующего имени
    index += 1
    
    # Выходим из цикла, если больше нет файлов для переименования
    if index > len(png_files):
        break

print("Переименование завершено!")
