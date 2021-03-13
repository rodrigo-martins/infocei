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

        return { quantidade, preco, lucro_prejuizo };
      }

      function fnOperacoes(ultima_data_negocio, portifolio, operacao) {
        let _operacao = "Comum"
        let _lucro_prejuizo = 0
        ultima_data_negocio = new Date(ultima_data_negocio).getTime()
        let data_negocio = new Date(operacao.data_negocio).getTime()

        if (data_negocio == ultima_data_negocio) {
          if (portifolio.quantidade == 0) {
            _operacao = "Comum"
            if (operacao.compra_venda == "C") _lucro_prejuizo = 0
            else _lucro_prejuizo = operacao.valor_total
          } else if (portifolio.quantidade > 0 && operacao.compra_venda == "C") {
            _operacao = "Comum"
            _lucro_prejuizo = 0
          } else if (portifolio.quantidade > 0 && operacao.compra_venda == "V") {
            _operacao = "Day-Trade",
              _lucro_prejuizo = operacao.valor_total - portifolio.preco * operacao.quantidade
            //Comprado para vendido
            if (portifolio.quantidade < operacao.quantidade) {
              _lucro_prejuizo = operacao.valor_total - portifolio.quantidade * portifolio.preco
            }
          } else if (portifolio.quantidade < 0 && operacao.compra_venda == "V") {
            _operacao = "Comum",
              _lucro_prejuizo = operacao.valor_total
          } else if (portifolio.quantidade < 0 && operacao.compra_venda == "C") {
            _operacao = "Day-Trade",
              _lucro_prejuizo = portifolio.preco * operacao.quantidade - operacao.valor_total
            //Vendido para comprado
            if (Math.abs(portifolio.quantidade) < operacao.quantidade) {
              _lucro_prejuizo = Math.abs(portifolio.quantidade) * (portifolio.preco - operacao.preco)
            }
          }
        } else {
          _operacao = "Comum"
          if (portifolio.quantidade == 0) {
            if (operacao.compra_venda == "C") _lucro_prejuizo = 0
            else _lucro_prejuizo = operacao.valor_total
          } else if (portifolio.quantidade > 0 && operacao.compra_venda == "C") {
            _lucro_prejuizo = 0
          } else if (portifolio.quantidade > 0 && operacao.compra_venda == "V") {
            _lucro_prejuizo = operacao.valor_total - portifolio.preco * operacao.quantidade
            //Comprado para vendido
            if (portifolio.quantidade < operacao.quantidade) {
              _lucro_prejuizo = operacao.valor_total - portifolio.quantidade * portifolio.preco
            }
          } else if (portifolio.quantidade < 0 && operacao.compra_venda == "V") {
            _lucro_prejuizo = operacao.valor_total
          } else if (portifolio.quantidade < 0 && operacao.compra_venda == "C") {
            _lucro_prejuizo = portifolio.preco * operacao.quantidade - operacao.valor_total
            //Vendido para comprado
            if (Math.abs(portifolio.quantidade) < operacao.quantidade) {
              _lucro_prejuizo = portifolio.quantidade * (portifolio.preco - operacao.preco)
            }
          }
        }

        return {
          operacao: _operacao,
          lucro_prejuizo: _lucro_prejuizo != 0 ? _lucro_prejuizo : 0
        }
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
            ultima_data_negocio: null
          };
        }

        result[operacao.codigo].operacoes[operacao.key] = fnOperacoes(
          result[operacao.codigo].ultima_data_negocio,
          result[operacao.codigo].portifolio,
          operacao,
        );

        result[operacao.codigo].portifolio = fnPortifolio(
          result[operacao.codigo].portifolio,
          operacao
        );

        result[operacao.codigo].ultima_data_negocio = operacao.data_negocio

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
