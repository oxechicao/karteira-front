# KarteiraSchema Front

## Como funciona?

1. Cria uma karteira
2. Cria uma conta de pagamento para a karteira, que irá agrupar os gastos
2. Adiciona uma nova despesa/gasto a uma conta

### Diagramas


```mermaid
---
title: Mapa de funcionalidades
---
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

```mermaid
---
title: Estrutura básica 
---
erDiagram
  KARTEIRA only one -- one or more CONTAS : contem
  CONTAS one or more -- zero or many DESPESAS : "deve ter"
```

```mermaid
---
title: Jornada da usuária
---
flowchart
  start --> karteira-flow
  karteira-flow --> template-flow
    subgraph karteira-flow[Fluxo de Karteira]
      direction TB
      karteira-features --> |novo| karteira-form
      karteira-features --> |editar| karteira-form
      karteira-features --> |deletar| karteira-delete
      subgraph karteira-form[Formuário da Karteira]
        karteira-create-init --> karteira-create-fill(Preencher formuário)
        karteira-create-fill --> karteira-name[Nome] & karteira-goal[Meta de gastos] & karteira-limit[Limite de gastos] & karteira-owner[Dono da karteira] & karteira-guests[Convidados da kateira] --> karteira-create-submit(Salvar)
        karteira-create-init(((Inicío))) 
      end
      
      subgraph karteira-delete[Remover Karteira]
        karteira-delete-init --> karteira-delete-confirm{Tem certeza que deseja <br/> deletar a karteira?} --> karteira-delete-yes[Sim] & karteira-delete-no[Não] --> karteira-delete-submit(((Deletar)))
        karteira-delete-init(((Início)))
      end
      karteira-features{funcionalidades}
    end
    
    subgraph template-flow[Fluxo de Contas]
        
        template-features{Funcionalidades}
        template-flow-init(((Início)))
    end
    start(((Inicío)))
```


## ToDOing

### Despesas
- [x] Criar despesas
- [x] Editar despesas
- [x] Deletar despesa
- [x] Automatizar criação da parcelas despesas
- [x] Corrigir o bug quando edita despesa define o mês atual como pago se a data de vencimento já estiver passado.

### Pagamento
#### Conta individual
- [ ] Implementar modal para escolher as datas de pagamento
- [ ] Imeplementar lógica para pagar o mês
 
#### Pagamento em massa
- [ ] Implementar lógica para pagar todas os gastos de uma conta

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
