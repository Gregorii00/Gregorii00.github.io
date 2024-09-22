import pandas as pd

FILE_NAME1 = 'C:/Users/zhevn/Downloads/Ники.xlsx'

df = pd.read_excel(FILE_NAME1, sheet_name='Лист1')
df = df[['фамилия','ник', 'оценка']]
list1 = []
for under_tems, tems in df.items():
    list1.append(tems)
operators = {}
for i in df.index:
    operators[list1[2][i]] = operators.get(list1[2][i], '') + list1[1][i]+' '
for i in operators:
    print(str(i) + ': ' + operators[i])
