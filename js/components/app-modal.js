Vue.component('ba-app-modal', function (resolve, reject) {
    ApiService.loadTemplate('./templates/app-modal.html').then(html => {
        resolve({
            template: html,
            props: {
                show: { type: Boolean, default: false },
                title: { type: String, default: 'Info Akademik' }
            },
            methods: {
                closeModal() { this.$emit('close'); }
            }
        });
    });
});