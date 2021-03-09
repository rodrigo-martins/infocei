<template>
  <div>
    <fieldset class="border p-2">
      <legend class="w-auto">Tipo de Mercado/Ativo</legend>
      <table-mercado
        v-for="(mercado, index) in mercados"
        :fields="mercado.fields"
        :items="mercado.items"
        :key="index"
      />
    </fieldset>
    <fieldset class="border p-2">
      <legend class="w-auto">Consolidação do Mês</legend>
      <table-consolidado :fields="consolidado.fields" :items="consolidado.items" />
    </fieldset>
  </div>
</template>
<script>
import TableConsolidado from "./TableConsolidado";
import TableMercado from "./TableMercado.vue";
export default {
  components: {
    TableConsolidado,
    TableMercado,
  },
  data() {
    return {
      consolidado: {
        fields: [
          { key: "consolidado", label: "Consolidado", class: "w-75" },
          { key: "valores", label: "Valores", class: "w-25" },
        ],
        items: [
          {
            consolidado: "Total do Imposto devido",
            valores: 0,
          },
          {
            consolidado: "IR fonte de Day-Trade do mês",
            valores: 0,
          },
          {
            consolidado: "IR fonte de Day-Trade nos meses anteriores",
            valores: 0,
          },
          {
            consolidado: "IR fonte de Day-Trade a compensar",
            valores: 0,
          },
          {
            consolidado: "IR fonte (Lei nº 11.033/2004) no mês",
            valores: 0,
          },
          {
            consolidado: "IR fonte (Lei nº 11.033/2004) nos meses anteriores",
            valores: 0,
          },
          {
            consolidado: "IR fonte (Lei nº 11.033/2004) a compensar",
            valores: 0,
          },
          {
            consolidado: "Imposto a pagar",
            valores: 0,
          },
          {
            consolidado: "Imposto pago",
            valores: 0,
          },
        ],
      },
      mercados: [
        {
          fields: [
            { key: "mercado", label: "Mercado à Vista", class: "w-50" },
            { key: "comuns", label: "Operações Comuns", class: "w-25" },
            { key: "day_trade", label: "Day-Trade", class: "w-25" },
          ],
          items: [
            {
              mercado: "Mercado à vista - ações",
              comuns: 749.8,
              day_trade: 2290,
            },
            {
              mercado: "Mercado à vista - ouro",
              comuns: 0,
              day_trade: 0,
            },
            {
              mercado: "Mercado à vista - ouro at. fin. fora bolsa",
              comuns: 0,
              day_trade: 0,
            },
          ],
        },
        {
          fields: [
            { key: "mercado", label: "Mercado Opções", class: "w-50" },
            { key: "comuns", label: "Operações Comuns", class: "w-25" },
            { key: "day_trade", label: "Day-Trade", class: "w-25" },
          ],
          items: [
            {
              mercado: "Mercado Opções - ações",
              comuns: 749.8,
              day_trade: 2290,
            },
            {
              mercado: "Mercado Opções - ouro",
              comuns: 0,
              day_trade: 0,
            },
            {
              mercado: "Mercado Opções - fora de bolsa",
              comuns: 0,
              day_trade: 0,
            },
            {
              mercado: "Mercado Opções - outros",
              comuns: 0,
              day_trade: 0,
            },
          ],
        },
        {
          fields: [
            { key: "mercado", label: "Mercado Futuro", class: "w-50" },
            { key: "comuns", label: "Operações Comuns", class: "w-25" },
            { key: "day_trade", label: "Day-Trade", class: "w-25" },
          ],
          items: [
            {
              mercado: "Mercado futuro - dólar dos EUA",
              comuns: 749.8,
              day_trade: 2290,
            },
            {
              mercado: "Mercado futuro - indices",
              comuns: 0,
              day_trade: 0,
            },
            {
              mercado: "Mercado futuro - juros",
              comuns: 0,
              day_trade: 0,
            },
            {
              mercado: "Mercado futuro - outros",
              comuns: 0,
              day_trade: 0,
            },
          ],
        },
        {
          fields: [
            { key: "mercado", label: "Mercado a Termo", class: "w-50" },
            { key: "comuns", label: "Operações Comuns", class: "w-25" },
            { key: "day_trade", label: "Day-Trade", class: "w-25" },
          ],
          items: [
            {
              mercado: "Mercado a termo - ações/ouro",
              comuns: 749.8,
              day_trade: 2290,
            },
            {
              mercado: "Mercado a termo - outros",
              comuns: 0,
              day_trade: 0,
            },
          ],
        },

        {
          fields: [
            { key: "mercado", label: "Resultados", class: "w-50" },
            { key: "comuns", label: "Operações Comuns", class: "w-25" },
            { key: "day_trade", label: "Day-Trade", class: "w-25" },
          ],
          items: [
            {
              mercado: "RESULTADO LÍQUIDO DO MÊS",
              comuns: 749.8,
              day_trade: 2290,
            },
            {
              mercado: "Resultado negativo até o mês anterior",
              comuns: 0,
              day_trade: 0,
            },
            {
              mercado: "BASE DE CÁLCULO DO IMPOSTO",
              comuns: 0,
              day_trade: 0,
            },
            {
              mercado: "Prejuízo a compensar",
              comuns: 0,
              day_trade: 0,
            },
            {
              mercado: "Alíquota do imposto",
              comuns: 0,
              day_trade: 0,
            },
            {
              mercado: "IMPOSTO DEVIDO",
              comuns: 0,
              day_trade: 0,
            },
          ],
        },
      ],
    };
  },
};
</script>
