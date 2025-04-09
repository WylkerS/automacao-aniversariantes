
# Aniversariantes

Este projeto automatiza a geração e posicionamento de aniversariantes do mês em um layout pré-definido no Adobe Illustrator, foi criado no intuito de automatizar um processo de inserção dos aniversariantes no modelo padrão.

## 📁 Estrutura do Projeto

```
AniversariantesTVCorporativa/
│
├── README.md
├── data/
│   └── aniversariantes_abril.xlsx
├── scripts/
│   ├── gerar_jsx.py
│   └── aniversariantes.jsx
├── output/
│   └── Lista.jsx
└── layout/
    └── Layout de Aniversariantes.ai
```

## 📝 Pré-requisitos

- Python 3 com `pandas`
- Adobe Illustrator (com suporte a scripts `.jsx`)

## ✅ Como usar

1. Atualize a planilha com os aniversariantes no arquivo `data/aniversariantes_abril.xlsx`.
2. Execute o script Python:
   ```bash
   python scripts/gerar_jsx.py
   ```
   Isso irá gerar o arquivo `output/Lista.jsx`.

3. Abra o arquivo `layout/Layout de Aniversariantes.ai` no Illustrator.
4. Execute o script `scripts/aniversariantes.jsx`.

> O script criará automaticamente colunas e pranchetas com base na quantidade de aniversariantes.

## 🖼️ Layout

O arquivo `layout/Layout de Aniversariantes.ai` contém a base visual e deve ser usado como modelo. Certifique-se de que ele está aberto no Illustrator antes de rodar o script.

## 📦 Output

O arquivo `output/Lista.jsx` contém os dados dos aniversariantes formatados para serem consumidos no Illustrator.

---
Projeto criado para facilitar um processo da comunicação interna de uma empresa.
