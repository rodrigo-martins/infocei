export default {
  data() {
    return {
      operacoes: []
    };
  },
  methods: {
    calculos(operacoes) {
      let result = {};

      function fnPortifolio(portifolio, operacao) {
        let _portifolio = {};
        let _operacao = {};

        let quantidade;
        let preco;
        let lucro_prejuizo;

        if (portifolio.quantidade == 0) {
          if (operacao.compra_venda == "C") {
            quantidade = operacao.quantidade;
            lucro_prejuizo = 0;
          } else {
            quantidade = operacao.quantidade ? -operacao.quantidade : 0;
            lucro_prejuizo = operacao.quantidade * operacao.preco;
          }
          preco = operacao.preco;
        } else if (portifolio.quantidade > 0 && operacao.compra_venda == "V") {
          quantidade = portifolio.quantidade - operacao.quantidade;
          preco = portifolio.preco;
          //Posição Zerada
          if (!quantidade) preco = 0;
          lucro_prejuizo =
            portifolio.lucro_prejuizo +
            operacao.preco * operacao.quantidade -
            portifolio.preco * operacao.quantidade;

          // Comprado para Vendido
          if (quantidade < 0) {
            preco = operacao.preco;
            lucro_prejuizo =
              portifolio.lucro_prejuizo +
              operacao.preco * operacao.quantidade -
              portifolio.preco * portifolio.quantidade;
          }
        } else if (portifolio.quantidade > 0 && operacao.compra_venda == "C") {
          quantidade = portifolio.quantidade + operacao.quantidade;
          preco =
            (portifolio.preco * portifolio.quantidade +
              operacao.preco * operacao.quantidade) /
            (portifolio.quantidade + operacao.quantidade);
          lucro_prejuizo = portifolio.lucro_prejuizo;
        } else if (portifolio.quantidade < 0 && operacao.compra_venda == "V") {
          quantidade = portifolio.quantidade - operacao.quantidade;
          preco =
            (portifolio.preco * -portifolio.quantidade +
              operacao.preco * operacao.quantidade) /
            (-portifolio.quantidade + operacao.quantidade);
          lucro_prejuizo =
            portifolio.lucro_prejuizo + operacao.quantidade * operacao.preco;
        } else if (portifolio.quantidade < 0 && operacao.compra_venda == "C") {
          quantidade = portifolio.quantidade + operacao.quantidade;
          preco = portifolio.preco;
          //Posição Zerada
          if (!quantidade) preco = 0;
          lucro_prejuizo =
            portifolio.lucro_prejuizo - operacao.preco * operacao.quantidade;

          // Vendido para Comprado
          if (quantidade > 0) {
            lucro_prejuizo = 0;
          }
        }

        _portifolio = { quantidade, preco, lucro_prejuizo };

        return { _portifolio, _operacao };
      }

      function outra() {
        // if (
        //   new Date(portifolio_do_dia.data_negocio).getTime() !=
        //   new Date(operacao.data_negocio).getTime()
        // ) {
        //   let quantidade =
        //     operacao.compra_venda == "C" ? operacao.quantidade : -operacao.quantidade;
        //   quantidade = portifolio.quantidade + quantidade;
        //   let preco =
        //     (portifolio.preco * portifolio.quantidade +
        //       operacao.preco * operacao.quantidade) /
        //     (portifolio.quantidade + operacao.quantidade);
        //   let lucro_prejuizo =
        //     operacao.preco * operacao.quantidade - portifolio.preco * operacao.quantidade;
        //   _portifolio = { quantidade, preco, lucro_prejuizo };
        //   _operacao = {
        //     operacao: "Comum",
        //     lucro_prejuizo,
        //   };
        //   _portifolio_do_dia = {
        //     data_negocio: operacao.data_negocio,
        //     quantidade,
        //     preco,
        //     lucro_prejuizo,
        //   };
        // } else {
        //   let quantidade =
        //     operacao.compra_venda == "C" ? operacao.quantidade : -operacao.quantidade;
        //   quantidade = portifolio.quantidade + quantidade;
        //   _portifolio = { quantidade, preco, lucro_prejuizo };
        //   _operacao = {
        //     operacao: "Comum",
        //     lucro_prejuizo,
        //   };
        //   _portifolio_do_dia = {
        //     data_negocio: operacao.data_negocio,
        //     quantidade,
        //     preco,
        //     lucro_prejuizo,
        //   };
        // }
      }

      operacoes.forEach((operacao) => {
        if (!result[operacao.codigo]) {
          result[operacao.codigo] = {
            portifolio: {
              quantidade: 0,
              preco: 0,
              lucro_prejuizo: 0,
            },
            operacoes: {
              [operacao.key]: {},
            },
            portifolio_do_dia: {
              //id: 12,
              data_negocio: null,
              quantidade: 0,
              preco: 0,
              lucro_prejuizo: 0,
              //compra_venda: "C",
              //quantidade: 200,
              //preco_medio: 23,
            },
          };
        }

        let { _portifolio, _operacao } = fnPortifolio(
          result[operacao.codigo].portifolio,
          operacao
        );

        result[operacao.codigo].portifolio = _portifolio;
        result[operacao.codigo].operacoes[operacao.key] = _operacao;
        // result[operacao.codigo].portifolio_do_dia = _portifolio_do_dia;
      });
      return result;
    },
    async fnPortifolio() {
      const operacoes = await this.$db.operacoes.getAll();
      let portifolio = this.calculos(operacoes);
      portifolio = Object.keys(portifolio)
        .map((codigo) => {
          let { quantidade, preco } = portifolio[codigo].portifolio;
          let port = {
            codigo,
            valor_total: quantidade * preco,
          };
          return Object.assign(port, portifolio[codigo].portifolio);
        })
        .filter((p) => p.quantidade);
      this.portifolio = portifolio;
    },
  }
};