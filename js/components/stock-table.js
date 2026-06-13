Vue.component('ba-stock-table', function (resolve, reject) {
    ApiService.loadTemplate('./templates/stock-table.html').then(html => {
        resolve({
            template: html,
            props: {
                items: { type: Array, required: true },
                upbjjList: { type: Array, required: true },
                kategoriList: { type: Array, required: true }
            },
            data() {
                return {
                    form: { kode: '', judul: '', kategori: '', upbjj: '', lokasiRak: '', harga: '', qty: '', safety: '', catatanHTML: '' },
                    filters: { search: '', upbjj: '', kategori: '' }
                };
            },
            computed: {
                filteredItems() {
                    return this.items.filter(item => {
                        const matchSearch = item.judul.toLowerCase().includes(this.filters.search.toLowerCase());
                        const matchUpbjj = this.filters.upbjj ? item.upbjj === this.filters.upbjj : true;
                        const matchKategori = this.filters.kategori ? item.kategori === this.filters.kategori : true;
                        return matchSearch && matchUpbjj && matchKategori;
                    });
                }
            },
            methods: {
                submitForm() {
                    this.$emit('add-stock', { ...this.form });
                    this.form = { kode: '', judul: '', kategori: '', upbjj: '', lokasiRak: '', harga: '', qty: '', safety: '', catatanHTML: '' };
                },
                resetFilter() {
                    this.filters.search = '';
                    this.filters.upbjj = '';
                    this.filters.kategori = '';
                },
                deleteItem(kode) {
                    if (confirm(`Apakah Anda yakin ingin menghapus data stok dengan kode ${kode}?`)) {
                        this.$emit('delete-stock', kode);
                    }
                }
            }
        });
    });
});