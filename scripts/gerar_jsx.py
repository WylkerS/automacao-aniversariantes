import pandas as pd
import os

# Caminho da planilha de entrada
planilha_path = os.path.join(r'..', 'data', 'aniversariantes_abril.xlsx')

# Caminho de saída do arquivo JSX com os dados formatados
jsx_output_path = os.path.join(r'..', 'output', 'Lista.jsx')


def ler_planilha(caminho):
    """Lê a planilha Excel e retorna o DataFrame com os dados dos aniversariantes"""
    df = pd.read_excel(caminho, sheet_name=0, header=1)
    print("Colunas detectadas:", df.columns)
    return df


def gerar_jsx(df, caminho_jsx):
    """Gera o arquivo JSX contendo a lista formatada de aniversariantes"""
    with open(caminho_jsx, 'w', encoding='utf-8') as f:
        f.write('var aniversariantes = [\n')

        # Ordena por dia do mês
        df = df.sort_values(by='DIA DO MÊS')
        dias_unicos = df['DIA DO MÊS'].unique()

        for i, dia in enumerate(dias_unicos):
            nomes = df[df['DIA DO MÊS'] == dia]['NOME'].tolist()
            nomes_formatados = ', '.join([f'"{nome}"' for nome in nomes])
            mes = df.iloc[0]['MÊS']

            f.write(f'    {{ dia: {dia}, mes: "{mes}", nomes: [{nomes_formatados}] }}')
            f.write(',\n' if i < len(dias_unicos) - 1 else '\n')

        f.write('];')

    print(f"Arquivo JSX gerado em: {caminho_jsx}")


def main():
    df = ler_planilha(planilha_path)
    gerar_jsx(df, jsx_output_path)


if __name__ == "__main__":
    main()
