var items = [
  {
    name: '鉛筆',
    price: 300,
    quantity: 0
  },
  {
    name: 'ノート',
    price: 400,
    quantity: 0
  },
  {
    name: '消しゴム',
    price: 500,
    quantity:0
  }
]

var vm = new Vue({
  el: '#app',
  data: {// dataプロパティ
    items: items,
  },
  filters: {
    numberWithDelimiter: function(value) {
      if(!value) {
        return '0'
      }
      return value.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
  },//マウントやデータ定義
  computed: {// 関数として実装、参照時はプロパティとして機能
    totalPrice/*（算出プロパティ名）*/ : function () {
      //this経由でインスタンス内のデータにアクセス
      return this.items.reduce(function(sum, item){
        /*thisはdetaやcomputedで定義したプロパティを呼び出す為に必要*/ 
        return sum + (item.price * item.quantity);
      }, 0)
    },
    totalPriceWithTax: function() {
    //  算出プロパティに依存した算出プロパティも定義できる
      return Math.floor(this.totalPrice * 1.08);
    },
    canBuy: function() {
      return this.totalPrice >= 1000 //1000円以上なら購入可能にする
    },
    errorMessageClass: function() {
      // canBuyが偽の時赤く表示する
      return {
        border: this.canBuy ? '' : '1px solid red',
        color: this.canBuy ? '' : 'red'
      }
    }
  },
  methods: {
    doBuy: function() {
      alert(this.totalPriceWithTax + '円のお買い上げ！')
      this.items.forEach(function(item){
        item.quantity = 0
      }) 
    }
  }
})
// JSFiddleでコンソールからvmにアクセスするための対応
window.vm =vm
