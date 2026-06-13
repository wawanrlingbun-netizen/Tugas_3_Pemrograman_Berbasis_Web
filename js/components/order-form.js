Vue.component('ba-order-form', function (resolve, reject) {
    ApiService.loadTemplate('./templates/order-form.html').then(html => {
        resolve({
            template: html,
            props: {
                paketList: { type: Array, required: true },
                pengirimanList: { type: Array, required: true }
            },
            data() {
                return {
                    order: { nim: '', nama: '', paketKode: '', pengiriman: '' }
                };
            },
            methods: {
                processOrder() {
                    this.$emit('submit-order', { ...this.order });
                    this.order = { nim: '', nama: '', paketKode: '', pengiriman: '' };
                }
            }
        });
    });
});