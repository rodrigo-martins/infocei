<template>
  <div v-if="resultado">
    <div v-for="ano in anos" :key="ano">
      {{ ano }}
    </div>
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
import index from "@/mixins/index";
import TableConsolidado from "./TableConsolidado";
import TableMercado from "./TableMercado.vue";
export default {
  async mounted() {
    let operacoes = await this.$db.operacoes.getAll();
    this.resultado = this.resultados(operacoes);
  },
  mixins: [index],
  components: {
    TableConsolidado,
    TableMercado,
  },
  computed: {
    mercados() {
      if (!this.resultado) return [];
      return [
        {
          fields: [
            { key: "mercado", label: "Mercado à Vista", class: "w-50" },
            { key: "comuns", label: "Operações Comuns", class: "w-25" },
            { key: "day_trade", label: "Day-Trade", class: "w-25" },
          ],
          items: this.resultado[this.mes].mercado_a_vista,
        },
        {
          fields: [
            { key: "mercado", label: "Mercado Opções", class: "w-50" },
            { key: "comuns", label: "Operações Comuns", class: "w-25" },
            { key: "day_trade", label: "Day-Trade", class: "w-25" },
          ],
          items: this.resultado[this.mes].mercado_opcoes,
        },
        {
          fields: [
            { key: "mercado", label: "Mercado Futuro", class: "w-50" },
            { key: "comuns", label: "Operações Comuns", class: "w-25" },
            { key: "day_trade", label: "Day-Trade", class: "w-25" },
          ],
          items: this.resultado[this.mes].mercado_futuro,
        },
        {
          fields: [
            { key: "mercado", label: "Mercado a Termo", class: "w-50" },
            { key: "comuns", label: "Operações Comuns", class: "w-25" },
            { key: "day_trade", label: "Day-Trade", class: "w-25" },
          ],
          items: this.resultado[this.mes].mercado_a_termo,
        },
        {
          fields: [
            { key: "mercado", label: "Resultados", class: "w-50" },
            { key: "comuns", label: "Operações Comuns", class: "w-25" },
            { key: "day_trade", label: "Day-Trade", class: "w-25" },
          ],
          items: this.resultado[this.mes].resultados,
        },
      ];
    },
    anos() {
      if (!this.resultado) return [];
      let anos = {};
      Object.keys(this.resultado).forEach((mes) => {
        anos[mes.slice(0, 4)] = null;
      });
      return Object.keys(anos);
    },
  },
  data() {
    return {
      mes: "2021-01",
      resultado: null,
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
    };
  },
};
</script>
