<template>
  <b-container fluid>
    <b-row class="my-4">
      <b-col>
        <h4>Configurações</h4>
      </b-col>
      <b-col class="text-right">
        <b-button @click="putConfiguracoes">Salvar</b-button>
      </b-col>
    </b-row>
    <b-row v-if="configuracoes">
      <b-col>
        <fieldset class="border p-2">
          <legend class="w-auto">Vendas de Ações Isentas</legend>
          <b-row>
            <b-col>
              <b-form-group id="isentas" label="Valor" label-for="isentas">
                <b-form-input
                  id="isentas"
                  v-model="configuracoes.isentas"
                  type="number"
                  placeholder="Isentas"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </fieldset>
        <fieldset class="border p-2">
          <legend class="w-auto">Prejuizos Acumulados</legend>
          <b-row>
            <b-col>
              <b-form-group id="comum" label="Comum" label-for="comum">
                <b-form-input
                  id="comum"
                  v-model="configuracoes.prejuizos_acumulados.comuns"
                  type="number"
                  placeholder="1000.12"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="day_trade" label="Day Trade" label-for="day_trade">
                <b-form-input
                  id="day_trade"
                  v-model="configuracoes.prejuizos_acumulados.day_trade"
                  type="number"
                  placeholder="1000.12"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </fieldset>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  async mounted() {
    this.configuracoes = await this.$db.configuracoes.get(1);
  },
  data() {
    return {
      configuracoes: null,
    };
  },
  methods: {
    async putConfiguracoes() {
      this.$db.configuracoes.put(this.configuracoes, 1);
    },
  },
};
</script>
