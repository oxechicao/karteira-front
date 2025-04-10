# KarteiraSchema Front

## ToDOing

### Pagamento

#### Conta individual
- [ ] Implementar modal para escolher as datas de pagamento
- [ ] Imeplementar lógica para pagar o mês
 
#### Pagamento em massa
- [ ] Implementar lógica para pagar todas os gastos de uma conta

## Como funciona?

1. Cria uma karteira
2. Cria uma conta de pagamento para a karteira, que irá agrupar os gastos
2. Adiciona uma nova despesa/gasto a uma conta


```mermaid
mindmap
    ((KarteiraSchema))
        KarteiraSchema
            Nome
            Controle de Acesso
              Proprietário
              Convidados
            Meta
            Limite
        Despesas
            Nome
            Valor
            Data da Compra
            Nome da Conta
        Contas
            Nome
            Detalhes
                Categoria
                Tipo
                Forma de pagamento
                Fonte do pagamento
            Pagamento
                Data do vencimento
                Recorrente
                Frequencia da cobrança
                    Em meses
                    Em dias
                    Em semanas
                    Em anos
                Periodo da cobrança número
                Parcelas
                    Número total de parcelas
                    Quantidade de parcelas pagas
```

## Features

- Visualizar as despesas por mês
  - Despesas por Conta
  - Despesas por cada campo em Detalhes
    - Categoria
    - Tipo
    - Forma de pagamento
    - Fonte do pagamento
- Saúde financeira
  - Exibir os dados da carteira
    - Meta
    - Limite
    - Somatório atual
  - Valor anual de gastos
    - Traçar um grafico representando o ano de acordo com o limite-meta / gastos-mes
