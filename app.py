import pandas as pd

# Укажите путь к вашему Excel-файлу
input_excel_file = 'data.xlsx'

# Укажите путь для сохранения CSV-файла
output_json_file = 'data.json'

# Чтение Excel-файла
df = pd.read_excel(input_excel_file, engine='openpyxl')

df = df.dropna(how='all')

header = list(df)[0]
df = df.rename(columns={header : 'datentime'})

#заполнить пустые строки на предыдущие
df['datentime'] = df['datentime'].ffill()
df['Время'] = df['Время'].ffill()
df['ППС'] = df['ППС'].ffill()

#аудитории в солнечном
try:
    df['№ гр.'] = pd.to_numeric(df['№ гр.'])
except ValueError as ve:
    print (ve)
    pass

for idx, row in df.iterrows():
    try:
        group_val = int(row['№ гр.'])
        if 100 <= group_val <= 199:
            df.at[idx, 'каб'] = '3.10'
        elif 200 <= group_val <= 299:
            df.at[idx, 'каб'] = '3.24'
    except (ValueError, TypeError):
        continue
    #df.loc[(df['№ гр.'] >= 100) & (df['№ гр.'] <= 199), 'каб'] = '3.10'
    #df.loc[(df['№ гр.'] >= 200) & (df['№ гр.'] <= 299), 'каб'] = '3.24'

    

# Замена оставшихся null на пустые строки
df = df.fillna('')

with open(output_json_file, 'w', encoding='utf-8') as f:
    df.to_json(f, force_ascii=False, orient='records', indent=4)

print(f"Файл успешно преобразован и сохранён как {output_json_file}")
