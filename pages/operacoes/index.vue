<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <div class="input-group my-4">
          <div class="custom-file">
            <label class="custom-file-label" for="upload">Arquivo</label>
            <input
              type="file"
              class="custom-file-input"
              @change="onChange"
              id="upload"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            />
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table
          :fields="operacoes.fields"
          :items="operacoes.items"
          head-variant="light"
          responsive="sm"
          small
        >
          <template #cell(data_negocio)="data">
            {{ data.value | momentFormat("DD/MM/YYYY") }}
          </template>
          <template #cell(prazo)="data">
            {{ data.value | momentFormat("DD/MM/YYYY") }}
          </template>
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
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      operacoes: {
        fields: [
          { key: "key", label: "ID" },
          { key: "data_negocio", label: "Data Negócio" },
          { key: "compra_venda", label: "C/V" },
          { key: "mercado", label: "Mercado" },
          { key: "prazo", label: "Prazo" },
          { key: "codigo", label: "Código" },
          { key: "especificacao_do_ativo", label: "Especificação do Ativo" },
          { key: "quantidade", label: "Quantidade" },
          { key: "preco", label: "Preço (R$)" },
          { key: "valor_total", label: "Valor Total (R$)" },
        ],
        items: [],
      },
    };
  },
  methods: {
    async onChange(e) {
      let json = await this.$xlsx.cei_json(e);
      for (let i in json) {
        this.$db.operacoes.add(json[i]);
      }
      this.operacoes.items = await this.$db.operacoes.getAll();
    },
  },
  async mounted() {
    this.operacoes.items = await this.$db.operacoes.getAll();
    console.log(await this.$db.operacoes.get(1));
  },
};
</script>
