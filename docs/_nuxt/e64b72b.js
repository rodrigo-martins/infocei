(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{430:function(e,o,t){"use strict";t(4),t(8),t(84),t(12),t(45);var r=t(10),n=t(0),d=t(431),c=t.n(d);o.a={data:function(){return{operacoes:[]}},methods:{calculos:function(e){var o={};return(e=c.a.orderBy(e,["data_negociacao"],["asc"])).forEach((function(e){o[e.codigo]||(o[e.codigo]={portifolio:{quantidade:0,preco:0,lucro_prejuizo:0},operacoes:Object(n.a)({},e.key,{}),ultima_data_negocio:null}),o[e.codigo].operacoes[e.key]=function(e,o,t){var r="Comum",n=0;return e=new Date(e).getTime(),new Date(t.data_negocio).getTime()==e?0==o.quantidade?(r="Comum",n="C"==t.compra_venda?0:t.valor_total):o.quantidade>0&&"C"==t.compra_venda?(r="Comum",n=0):o.quantidade>0&&"V"==t.compra_venda?(r="Day-Trade",n=t.valor_total-o.preco*t.quantidade,o.quantidade<t.quantidade&&(n=t.valor_total-o.quantidade*o.preco)):o.quantidade<0&&"V"==t.compra_venda?(r="Comum",n=t.valor_total):o.quantidade<0&&"C"==t.compra_venda&&(r="Day-Trade",n=o.preco*t.quantidade-t.valor_total,Math.abs(o.quantidade)<t.quantidade&&(n=Math.abs(o.quantidade)*(o.preco-t.preco))):(r="Comum",0==o.quantidade?n="C"==t.compra_venda?0:t.valor_total:o.quantidade>0&&"C"==t.compra_venda?n=0:o.quantidade>0&&"V"==t.compra_venda?(n=t.valor_total-o.preco*t.quantidade,o.quantidade<t.quantidade&&(n=t.valor_total-o.quantidade*o.preco)):o.quantidade<0&&"V"==t.compra_venda?n=t.valor_total:o.quantidade<0&&"C"==t.compra_venda&&(n=o.preco*t.quantidade-t.valor_total,Math.abs(o.quantidade)<t.quantidade&&(n=o.quantidade*(o.preco-t.preco)))),{operacao:r,lucro_prejuizo:0!=n?n:0}}(o[e.codigo].ultima_data_negocio,o[e.codigo].portifolio,e),o[e.codigo].portifolio=function(e,o){var t,r,n;return 0==e.quantidade?("C"==o.compra_venda?(t=o.quantidade,n=0):(t=o.quantidade?-o.quantidade:0,n=o.quantidade*o.preco),r=o.preco):e.quantidade>0&&"V"==o.compra_venda?(t=e.quantidade-o.quantidade,r=e.preco,t||(r=0),n=e.lucro_prejuizo+o.preco*o.quantidade-e.preco*o.quantidade,t<0&&(r=o.preco,n=e.lucro_prejuizo+o.preco*o.quantidade-e.preco*e.quantidade)):e.quantidade>0&&"C"==o.compra_venda?(t=e.quantidade+o.quantidade,r=(e.preco*e.quantidade+o.preco*o.quantidade)/(e.quantidade+o.quantidade),n=e.lucro_prejuizo):e.quantidade<0&&"V"==o.compra_venda?(t=e.quantidade-o.quantidade,r=(e.preco*-e.quantidade+o.preco*o.quantidade)/(-e.quantidade+o.quantidade),n=e.lucro_prejuizo+o.quantidade*o.preco):e.quantidade<0&&"C"==o.compra_venda&&(t=e.quantidade+o.quantidade,r=e.preco,t||(r=0),n=e.lucro_prejuizo-o.preco*o.quantidade,t>0&&(n=0)),{quantidade:t,preco:r,lucro_prejuizo:n}}(o[e.codigo].portifolio,e),o[e.codigo].ultima_data_negocio=e.data_negocio})),o},fnPortifolio:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function o(){var t,r;return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.$db.operacoes.getAll();case 2:t=o.sent,r=e.calculos(t),r=Object.keys(r).map((function(e){var o=r[e].portifolio,t={codigo:e,valor_total:o.quantidade*o.preco};return Object.assign(t,r[e].portifolio)})).filter((function(p){return p.quantidade})),e.portifolio=r;case 6:case"end":return o.stop()}}),o)})))()}}}},434:function(e,o,t){"use strict";t.r(o);var r={mixins:[t(430).a],data:function(){return{portifolio:[],fields:[{key:"codigo",label:"Código",sortable:!0},{key:"quantidade",label:"Quantidade",sortable:!0,class:"text-center"},{key:"preco",label:"Preço Médio",sortable:!0,class:"text-center"},{key:"valor_total",label:"Valor de Aquisição",sortable:!0,class:"text-center"},{key:"lucro_prejuizo",label:"Lucro/Prejuizo",sortable:!0,class:"text-center"}]}},mounted:function(){this.fnPortifolio()}},n=t(50),component=Object(n.a)(r,(function(){var e=this,o=e.$createElement,t=e._self._c||o;return t("b-container",{attrs:{fluid:""}},[t("b-row",{staticClass:"my-4"},[t("b-col",[t("h3",[e._v("Portifólio")])])],1),e._v(" "),t("b-row",[t("b-col",[t("b-table",{attrs:{items:e.portifolio,fields:e.fields,"head-variant":"light",responsive:"sm",small:"",hover:""},scopedSlots:e._u([{key:"cell(preco)",fn:function(data){return[t("p",{staticClass:"text-right"},[e._v("\n            "+e._s(e._f("currency")(data.value))+"\n          ")])]}},{key:"cell(valor_total)",fn:function(data){return[t("p",{staticClass:"text-right"},[e._v("\n            "+e._s(e._f("currency")(data.value))+"\n          ")])]}},{key:"cell(lucro_prejuizo)",fn:function(data){return[t("p",{staticClass:"text-right"},[e._v("\n            "+e._s(e._f("currency")(data.value))+"\n          ")])]}}])})],1)],1)],1)}),[],!1,null,null,null);o.default=component.exports}}]);