import moment from 'moment';
import Vue from 'vue'

Vue.filter('currency', s => {
  let options = { minimumFractionDigits: 2, maximumFractionDigits: 2 }
  let result = new Intl.NumberFormat('pt-BR', options).format(s);
  return result;
});

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('uppercase', function (value) {
  if (!value) return ''
  return value.toUpperCase()
})

Vue.filter('cpf', function (value) {
  return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
})

Vue.filter('cnpj', function (value) {
  return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");
})

Vue.filter('momentFormat', function (value, format) {
  if (!value) return
  return moment(value).format(format)
});
