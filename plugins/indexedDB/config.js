const name = "b3"
const version = 1
const objectStore = [
  {
    name: "configuracoes",
    options: {
      autoIncrement: true,
    },
    data:[
      {
        isentas: 20000,
        prejuizos_acumulados:{
          comuns: 0,
          day_trade: 0
        }
      }
    ]
  },
  {
    name: "operacoes",
    options: {
      autoIncrement: true,
    },
    createIndex: [
      {
        name: "data_negocio",
        fields: "data_negocio",
        options: {
          unique: false,
        }
      },
      {
        name: "compra_venda",
        fields: "compra_venda",
        options: {
          unique: false
        }
      },
      {
        name: "mercado",
        fields: "mercado",
        options: {
          unique: false
        }
      },
      {
        name: "prazo",
        fields: "prazo",
        options: {
          unique: false
        }
      },
      {
        name: "codigo",
        fields: "codigo",
        options: {
          unique: false
        }
      },
      {
        name: "especificacao_do_ativo",
        fields: "especificacao_do_ativo",
        options: {
          unique: false
        }
      },
      {
        name: "quantidade",
        fields: "quantidade",
        options: {
          unique: false
        }
      },
      {
        name: "preco",
        fields: "preco",
        options: {
          unique: false
        }
      },
      {
        name: "valor_total",
        fields: "valor_total",
        options: {
          unique: false
        }
      },

    ],
    data: [
      // {
      //   data_negocio: "21/05/19",
      //   compra_venda:	"C",
      //   mercado:"Opção de Compra",
      //   prazo:"17/06/2019",
      //   codigo:"ABEVF17",
      //   especificacao_do_ativo:	"AMBEV S/AON",
      //   quantidade: 100,
      //   preco: 0.32,
      //   valor_total: 32.00
      // }
    ]
  }
]
export { name, version, objectStore }
