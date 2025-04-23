import pandas as pd
import os

# Caminho da planilha
planilha_path = os.path.join('..', 'data', 'ANIVERSARIANTES_MAIO_2025.xlsx')

# Caminho de saída do arquivo JSX
jsx_output_path = os.path.join('..', 'output', 'Lista.jsx')

# Defina o mês manualmente
mes = "MAIO"

def ler_planilha_multiplas_abas(caminho):
    """Lê todas as abas da planilha e junta os dados em um único DataFrame"""
    xls = pd.ExcelFile(caminho)
    todas_abas = xls.sheet_names
    print("Abas encontradas:", todas_abas)

    df_final = pd.DataFrame()

    for nome_aba in todas_abas:
        print(f"Lendo aba: {nome_aba}")
        try:
            df = pd.read_excel(xls, sheet_name=nome_aba, header=None, usecols="B,D", names=["NOME", "DIA DO MÊS"])
            df = df.dropna(subset=["NOME", "DIA DO MÊS"])  # Remove linhas em branco
            df_final = pd.concat([df_final, df], ignore_index=True)
        except Exception as e:
            print(f"Erro ao ler aba {nome_aba}: {e}")
    
    return df_final


def gerar_jsx(df, caminho_jsx, mes):
    """Gera o arquivo JSX com os dados formatados"""
    with open(caminho_jsx, 'w', encoding='utf-8') as f:
        f.write('var aniversariantes = [\n')

        df = df.sort_values(by='DIA DO MÊS')
        dias_unicos = df['DIA DO MÊS'].unique()

        for i, dia in enumerate(dias_unicos):
            nomes = df[df['DIA DO MÊS'] == dia]['NOME'].tolist()
            nomes_formatados = ', '.join([f'"{nome}"' for nome in nomes])

            f.write(f'    {{ dia: {int(dia):02}, mes: "{mes}", nomes: [{nomes_formatados}] }}')
            f.write(',\n' if i < len(dias_unicos) - 1 else '\n')

        f.write('];')

    print(f"Arquivo JSX gerado com sucesso em: {caminho_jsx}")


def main():
    df = ler_planilha_multiplas_abas(planilha_path)
    gerar_jsx(df, jsx_output_path, mes)


if __name__ == "__main__":
    main()
