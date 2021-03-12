import { mount } from '@vue/test-utils'
import Index from '@/pages/index.vue'
import db from '@/mock/db'
import { ListGroupPlugin } from 'bootstrap-vue'

describe.skip('Calculos Portifólio - Comprado', () => {
  test('Vue instance',() => {
    const wrapper = mount(Index)
    expect(wrapper.vm).toBeTruthy()
  })

  test('Verifica compra Comum - primeira', async() => {
    const wrapper = mount(Index)
    const operacoes = db.operacoes.slice(0,1)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(calculos).toHaveProperty("KLBN11")
    expect(calculos["KLBN11"]).toHaveProperty("portifolio", {
      quantidade: 400,
      preco: 1,
      lucro_prejuizo: 0
    })
    // expect(calculos["KLBN11"]).toHaveProperty("operacoes")
    // expect(calculos["KLBN11"].operacoes).toHaveProperty("1", {
    //   operacao: "Comum",
    //   lucro_prejuizo: 0
    // })
    // expect(calculos["KLBN11"]).toHaveProperty("portifolio_do_dia", {
    //   data_negocio: new Date("2020-01-01"),
    //   quantidade: 400,
    //   preco: 1,
    //   lucro_prejuizo: 0
    // })
  })

  test('Verifica venda Day-Trade', async() => {
    const wrapper = mount(Index)
    const operacoes = db.operacoes.slice(0,2)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(Object.keys(calculos["KLBN11"].operacoes)).toHaveLength(2)
    expect(calculos["KLBN11"].portifolio).toEqual({
      quantidade: 300,
      preco: 1,
      lucro_prejuizo: 100
    })
    // expect(calculos["KLBN11"].operacoes['2']).toEqual({
    //   operacao: "Day-Trade",
    //   lucro_prejuizo: 0
    // })
    // expect(calculos["KLBN11"].portifolio_do_dia).toEqual({
    //   data_negocio: new Date("2020-01-01"),
    //   quantidade: 300,
    //   preco: 1,
    //   lucro_prejuizo: 100
    // })
  })

  test('Verifica venda Comum', async() => {
    const wrapper = mount(Index)
    const operacoes = db.operacoes.slice(0,3)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(Object.keys(calculos["KLBN11"].operacoes)).toHaveLength(3)
    expect(calculos["KLBN11"].portifolio).toEqual({
      quantidade: 200,
      preco: 1,
      lucro_prejuizo: 50
    })
    // expect(Object.keys(calculos["KLBN11"].operacoes)).toHaveLength(3)
    // expect(calculos["KLBN11"].operacoes).toHaveProperty("3", {
    //   operacao:"Comum",
    //   lucro_prejuizo: -50
    // })
  })

  test('Verifica compra Comum - dia seguinte', async() => {
    const wrapper = mount(Index)
    const operacoes = db.operacoes.slice(0,4)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(Object.keys(calculos["KLBN11"].operacoes)).toHaveLength(4)
    expect(calculos["KLBN11"].portifolio).toEqual({
      quantidade: 400,
      preco: .75,
      lucro_prejuizo: 50
    })
    // expect(Object.keys(calculos["KLBN11"].operacoes)).toHaveLength(3)
    // expect(calculos["KLBN11"].operacoes).toHaveProperty("3", {
    //   operacao:"Comum",
    //   lucro_prejuizo: -50
    // })
  })
  test('Verifica compra Comum - no mesmo dia', async() => {
    const wrapper = mount(Index)
    const operacoes = db.operacoes.slice(0,5)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(Object.keys(calculos["KLBN11"].operacoes)).toHaveLength(5)
    expect(calculos["KLBN11"].portifolio).toEqual({
      quantidade: 500,
      preco: .8,
      lucro_prejuizo: 50
    })
  })
  test('Verifica venda Day-Trade', async() => {
    const wrapper = mount(Index)
    const operacoes = db.operacoes.slice(0,6)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(Object.keys(calculos["KLBN11"].operacoes)).toHaveLength(6)
    expect(calculos["KLBN11"].portifolio).toEqual({
      quantidade: 400,
      preco: .8,
      lucro_prejuizo: 70
    })
  })

  test('Verifica venda Comum - Zerar posição', async() => {
    const wrapper = mount(Index)
    const operacoes = db.operacoes.slice(0,7)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(Object.keys(calculos["KLBN11"].operacoes)).toHaveLength(7)
    expect(calculos["KLBN11"].portifolio).toEqual({
      quantidade: 0,
      preco: 0,
      lucro_prejuizo: 550
    })
  })

  test('Verifica compra Comum', async() => {
    const wrapper = mount(Index)
    const operacoes = db.operacoes.slice(0,8)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(Object.keys(calculos["KLBN11"].operacoes)).toHaveLength(8)
    expect(calculos["KLBN11"].portifolio).toEqual({
      quantidade: 1000,
      preco: 1,
      lucro_prejuizo: 0
    })
  })

  test('Verifica venda Comum', async() => {
    const wrapper = mount(Index)
    const operacoes = db.operacoes.slice(0,9)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(Object.keys(calculos["KLBN11"].operacoes)).toHaveLength(9)
    expect(calculos["KLBN11"].portifolio).toEqual({
      quantidade: 0,
      preco: 0,
      lucro_prejuizo: 0
    })
  })
})

describe('Calculos Portifólio - Vendido', () => {
  test('Verifica venda Comum - Primeira', async() => {
    const wrapper = mount(Index)
    const operacoes = db.operacoes.slice(10,11)
    console.log(operacoes)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(calculos).toHaveProperty("KLBN11")
    expect(calculos["KLBN11"]).toHaveProperty("portifolio", {
      quantidade: -400,
      preco: 1,
      lucro_prejuizo: 400
    })
  })

  test('Verifica compra Day-Trade', async() => {
    const wrapper = mount(Index)
    const operacoes = db.operacoes.slice(10,12)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(Object.keys(calculos["KLBN11"].operacoes)).toHaveLength(2)
    expect(calculos["KLBN11"].portifolio).toEqual({
      quantidade: -300,
      preco: 1,
      lucro_prejuizo: 200
    })
  })

  test('Verifica compra Comum', async() => {
    const wrapper = mount(Index)
    const operacoes = db.operacoes.slice(10,13)
    console.log(operacoes);
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(Object.keys(calculos["KLBN11"].operacoes)).toHaveLength(3)
    expect(calculos["KLBN11"].portifolio).toEqual({
      quantidade: -200,
      preco: 1,
      lucro_prejuizo: 150
    })
  })

  test.skip('Verifica compra Comum - dia seguinte', async() => {
    const wrapper = mount(Index)
    const operacoes = db.operacoes.slice(0,14)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(Object.keys(calculos["KLBN11"].operacoes)).toHaveLength(14)
    expect(calculos["KLBN11"].portifolio).toEqual({
      quantidade: -400,
      preco: .75,
      lucro_prejuizo: 50
    })
    // expect(Object.keys(calculos["KLBN11"].operacoes)).toHaveLength(3)
    // expect(calculos["KLBN11"].operacoes).toHaveProperty("3", {
    //   operacao:"Comum",
    //   lucro_prejuizo: -50
    // })
  })
  test.skip('Verifica compra Comum - no mesmo dia', async() => {
    const wrapper = mount(Index)
    const operacoes = db.operacoes.slice(0,15)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(Object.keys(calculos["KLBN11"].operacoes)).toHaveLength(15)
    expect(calculos["KLBN11"].portifolio).toEqual({
      quantidade: -500,
      preco: .8,
      lucro_prejuizo: 50
    })
  })
  test.skip('Verifica venda Day-Trade', async() => {
    const wrapper = mount(Index)
    const operacoes = db.operacoes.slice(0,16)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(Object.keys(calculos["KLBN11"].operacoes)).toHaveLength(16)
    expect(calculos["KLBN11"].portifolio).toEqual({
      quantidade: -400,
      preco: .8,
      lucro_prejuizo: 70
    })
  })

  test.skip('Verifica venda Comum - Zerar posição', async() => {
    const wrapper = mount(Index)
    const operacoes = db.operacoes.slice(0,17)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(Object.keys(calculos["KLBN11"].operacoes)).toHaveLength(17)
    expect(calculos["KLBN11"].portifolio).toEqual({
      quantidade: 0,
      preco: 0,
      lucro_prejuizo: 550
    })
  })

  test.skip('Verifica compra Comum', async() => {
    const wrapper = mount(Index)
    const operacoes = db.operacoes.slice(0,18)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(Object.keys(calculos["KLBN11"].operacoes)).toHaveLength(18)
    expect(calculos["KLBN11"].portifolio).toEqual({
      quantidade: -1000,
      preco: 1,
      lucro_prejuizo: 0
    })
  })

  test.skip('Verifica venda Comum', async() => {
    const wrapper = mount(Index)
    const operacoes = db.operacoes.slice(0,19)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(Object.keys(calculos["KLBN11"].operacoes)).toHaveLength(19)
    expect(calculos["KLBN11"].portifolio).toEqual({
      quantidade: 0,
      preco: 0,
      lucro_prejuizo: 0
    })
  })
})
