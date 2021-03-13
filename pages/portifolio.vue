<template>
  <b-container fluid>
    <b-row class="my-4">
      <b-col>
        <h3>Portifólio</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table
          :items="portifolio"
          :fields="fields"
          head-variant="light"
          responsive="sm"
          small
          hover
        >
          <template #cell(preco)="data">
            <p class="text-right">
              {{ data.value | currency }}
            </p>
          </template>
          <template #cell(valor_total)="data">
            <p class="text-right">
              {{ data.value | currency }}
            </p>
          </template>
          <template #cell(lucro_prejuizo)="data">
            <p class="text-right">
              {{ data.value | currency }}
            </p>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import index from "@/mixins/index";
export default {
  mixins: [index],
  data() {
    return {
      portifolio: [],
      fields: [
        {
          key: "codigo",
          label: "Código",
          sortable: true,
        },
        {
          key: "quantidade",
          label: "Quantidade",
          sortable: true,
          class: "text-center",
        },
        {
          key: "preco",
          label: "Preço Médio",
          sortable: true,
          class: "text-center",
        },
        {
          key: "valor_total",
          label: "Valor de Aquisição",
          sortable: true,
          class: "text-center",
        },
        {
          key: "lucro_prejuizo",
          label: "Lucro/Prejuizo",
          sortable: true,
          class: "text-center",
        },
      ],
    };
  },
  mounted() {
    this.fnPortifolio();
  },
};
</script>
