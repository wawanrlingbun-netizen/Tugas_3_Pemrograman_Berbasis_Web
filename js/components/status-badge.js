Vue.component('ba-status-badge', function (resolve, reject) {
    ApiService.loadTemplate('./templates/status-badge.html').then(html => {
        resolve({
            template: html,
            props: { status: { type: String, required: true } },
            computed: {
                badgeClass() {
                    const s = this.status.toLowerCase();
                    return {
                        'badge-ut-success': s === 'aman' || s === 'selesai',
                        'badge-ut-warning': s === 'menipis' || s === 'proses' || s === 'dalam perjalanan',
                        'badge-ut-danger': s === 'gagal'
                    };
                }
            }
        });
    });
});