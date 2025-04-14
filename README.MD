<link
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
  rel="stylesheet"
/>

# Karteira

[Mermaidjs fontawesome icons](https://fontawesome.com/search?ip=classic&s=solid&o=r)

<!-- TOC -->
- [Karteira](#karteira)
  - [Como funciona?](#como-funciona)
  - [Diagramas](#diagramas)
    - [Estrutura básica](#estrutura-básica)
    - [Jornada da usuária](#jornada-da-usuária)
<!-- TOC -->

## Como funciona?

1. Cria uma karteira.
2. Cria uma conta de pagamento para a karteira, que irá agrupar os gastos.
3. Adiciona uma nova despesa/gasto a uma conta.

Funcionalidades:

```mermaid
mindmap
  root((Karteira))
    (Tudo uma questão de agrupamentos: Karterias - Contas - Despesas)
    Funcionamento básico
      Primeiro se criar uma Carteira
      ::icon(fa fa-1)
        (Cada Carteira tem um conjunto de contas)
        Cria-se contas
        ::icon(fa fa-2)
          (As contas servem para agrupar despesas)
          (As contas também server para otimizar o preenchimento de uma despesa)
          Cria-se Despesas para uma determinada conta
          ::icon(fa fa-3)
            (As desepsas podem modificar os padrões criados pelas contas, mas ainda sim mantém-se no mesmo agrupamento.)
            (As parcelas são calculadas com base no formulário)
              (Cria-se todas as parcelas para salvar no objeto no banco.)
              (Isso facilita o gerenciamento, não precisando fazer contas.)
              (Nas consultas, basta verificar as datas.)
              (Na hora do pagamento, só alteramos o valor condicional de pago)
            (Os valores das despesas são salvas como inteiro, sempre adicionando 2 zeros. )
              (O objetivo disso é evitar problema de números flutuantes,float e doubles)
    Paineis
      (A criação dos paineis serão divididas em várias análises)
      Gráfico de custos por mês
        (Deve contas um gráfico de barra com o consumo por mês)
        (Contém uma linha que simbolizará o limite)
        (Contém uma linha que simbolizará a meta)
          (Podendo também ser um gráfico de barra dentro da barra)
      Valores em números das contas do mês
        (Vários cards cada um representando o mês)
        (Exibir os próximos 12 meses)
      2 Cards contentdo a META e o LIMITE
        (Mudar as cores de cada um dependendo da porcentagem alcançada)
          )Vermelho para quando ultrapassar(
          )Laranja para quando estiver uns 90% próximo do valor(
          )Verde para quando estiver uns 30% do valor definido(
          )Sem cor para quando não estiver nos parâmetros(
        (Exibir valor e porcentagem)

    
    
```

## Diagramas

### Estrutura básica
```mermaid
---
title: Estrutura básica
---
erDiagram
  KARTEIRA only one -- one or more CONTAS : contem
  CONTAS one or more -- zero or many DESPESAS : "deve ter"
```

### Jornada da usuária

```mermaid
---
title: Jornada da usuária
---
flowchart
  classDef done stroke: #B4EEB4, stroke-width: 4px
  classDef doing stroke: #FFFF66, stroke-width: 4px
  classDef bug stroke: #F00, stroke-width: 4px
  start(((Inicío)))
  start ==> karteira-flow
  subgraph karteira-flow[fa:fa-wallet Fluxo de Karteira]
    direction TB
    karteira-features{funcionalidades}:::doing
    karteira-features ==>|novo| karteira-form:::doing
    karteira-features ==>|editar| karteira-form
    karteira-features ==>|deletar| karteira-delete

    subgraph karteira-form[Formuário da Karteira]
      karteira-create-init ==> karteira-create-fill(Preencher formuário):::doing
      karteira-create-fill ==> karteira-name[Nome]:::done ==> karteira-create-submit(Salvar)
      karteira-create-fill ==> karteira-goal[Meta de gastos]:::done ==> karteira-create-submit(Salvar)
      karteira-create-fill ==> karteira-limit[Limite de gastos]:::done ==> karteira-create-submit(Salvar)
      karteira-create-fill ==> karteira-owner[Dono da karteira]:::done ==> karteira-create-submit(Salvar)
      karteira-create-fill ==> karteira-guests[Convidados da kateira]:::doing ==> karteira-create-submit(Salvar)
      karteira-guests ==> karteira-guests-email[E-mail] & karteira-guests-role[Nível de permissão]
      karteira-guests-role -.-> karteira-guests-role-owner[Dono] & karteira-guests-role-guest[Participante]
      karteira-create-submit(Salvar)
      karteira-create-init(((Inicío))):::doing
    end

    subgraph karteira-delete[Remover Karteira]
      karteira-delete-init ==> karteira-delete-confirm
      karteira-delete-confirm ==> karteira-delete-yes[Sim] ==> karteira-delete-submit
      karteira-delete-confirm ==> karteira-delete-no[Não] ==> karteira-delete-submit
      karteira-delete-confirm{Tem certeza que deseja <br/> deletar a karteira?}
      karteira-delete-submit(((Deletar)))
      karteira-delete-init(((Início)))
    end
  end

  karteira-flow ==> template-flow:::done

  subgraph template-flow[Fluxo de Contas]
    direction TB
    template-flow-init(((Início)))
    template-features{Funcionalidades}
    template-flow-init ==> template-features
    template-features ==>|Criar| template-form
    template-features ==>|Editar| template-form
    template-features ==>|Deletar| template-delete

    subgraph template-form[Formulário]
      template-form-init(((Início)))
      template-form-fill(Preencher formulário)
      template-form-save(((Save)))
      template-form-init ==>|Create| template-form-fill
      template-form-fill ==> template-form-name[Nome] ==> template-form-save
      template-form-fill ==> template-form-expense[Dados da Despesa] ==> template-form-save
    end

    subgraph template-delete[Remover teamplate]
      template-delete-init(((Início)))
      template-delete-confirmation{Deseja remover?}
      template_delete_finish(((Removido)))
      template-delete-init ==> template-delete-confirmation
      template-delete-confirmation ==> template-delete-yes(Sim) ==> template_delete_finish
      template-delete-confirmation ==> template-delete-no(Não) ==> template_delete_finish
    end
  end

  template-flow ==> expense-flow

  subgraph expense-flow[Fluxo de Despesas]
    expense-init(((Início)))
    expense-features{Funcionalidades}
    expense-init ==> expense-features
    expense-features ==>|Criar| expense-form
    expense-features ==>|Editar| expense-form
    expense-features ==>|Remover| expense-delete

    subgraph expense-delete[Remover teamplate]
      direction TB
      expense-delete-init(((Início)))
      expense-delete-confirmation{Deseja remover?}
      expense_delete_finish(((Removido)))
      expense-delete-init ==> expense-delete-confirmation
      expense-delete-confirmation ==> expense-delete-yes(Sim) ==> expense_delete_finish
      expense-delete-confirmation ==> expense-delete-no(Não) ==> expense_delete_finish
    end

    subgraph expense-form[Formulário de Despesas]
      direction LR
      expense-form-init(((Início)))
      expense-form-fill(Preencher o formulário)
      expense-form-save(((Salvar)))
      expense-form-init ==> expense-form-fill
      expense-form-fill ==> expense-form-name[Nome da despssa]
      expense-form-fill ==> expense-form-purchasedAt[Data da compra]
      expense-form-fill ==> expense-form-value[Valor]
      expense-form-name & expense-form-purchasedAt & expense-form-value ==> expense-form-save
      expense-form-fill ==> expense-form-details[Detalhes da despesa]
      expense-form-details ==> expense-form-detail-category[Categoria da despesa: <br> casa, assinatura, fastfood etc]
      expense-form-details ==> expense-form-detail-form[Forma de pagamento: <br> crédito, débito, pix]
      expense-form-details ==> expense-form-detail-type[Tipo da Despesa: <br> parcelado, a vista, recorrente]
      expense-form-details ==> expense-form-detail-source[Fonte cobradora: <br> Itaú, Nubank, Tio, irmão, Família]
      expense-form-detail-category & expense-form-detail-form & expense-form-detail-type & expense-form-detail-source ==> expense-form-save
      expense-form-fill ==> expense-form-payment[Detalhes da compra]
      expense-form-payment ==> expense-form-payment-total-installments[Num total de parcelas]
      expense-form-payment ==> expense-form-payment-current-installment[Num de parcelas pagas]
      expense-form-payment ==> expense-form-payment-payday[Dia do vencimento pagamento]
      expense-form-payment-total-installments & expense-form-payment-current-installment & expense-form-payment-payday -.-> expense-form-payment-installments-feature
      expense-form-payment ==> expense-form-payment-isRecurrent{É recorrente}
      expense-form-payment-isRecurrent ==>|Sim| expense-form-payment-frequency[Qual a frequência?]
      expense-form-payment-isRecurrent ==>|Sim| expense-form-payment-frequencyPeriod[Repete a cada quantidade]
      expense-form-payment-frequency & expense-form-payment-frequencyPeriod -.-> expense-form-payment-installments-feature
      expense-form-payment-installments-feature(fa:fa-sheet Calculo das parcelas) ==> expense-form-payment-installments[Parcelas]
      expense-form-payment-total-installments & expense-form-payment-current-installment & expense-form-payment-payday & expense-form-payment-installments & expense-form-payment-frequency & expense-form-payment-frequencyPeriod ==> expense-form-save
    end
  end

  expense-form ==> painels

  subgraph painels[Fluxo dos paineis]
    direction TB
    painels-init(((Início)))
    painels-init ==> painels-months(Lista de gastos por mês com gráficos)
    painels-init ==> painels-goal(Painel de metas e limites)
  end

```

