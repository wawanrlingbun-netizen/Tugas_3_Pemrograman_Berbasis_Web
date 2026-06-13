Vue.component('ba-do-tracking', function (resolve, reject) {
    ApiService.loadTemplate('./templates/do-tracking.html').then(html => {
        resolve({
            template: html,
            props: {
                trackingData: { type: Array, required: true }
            },
            data() {
                return {
                    inputDo: '',          // Menampung teks yang sedang diketik user
                    activeSearchDo: '',   // Menampung teks DO setelah tombol cari diklik
                    isSearched: false     // Penanda status apakah user sudah mengklik tombol cari
                };
            },
            computed: {
                searchedResult() {
                    if (!this.activeSearchDo) return null;
                    
                    // Mencari kecocokan nomor DO di dalam database JSON bawaan UT
                    const cleanSearch = this.activeSearchDo.trim().toUpperCase();
                    for (let item of this.trackingData) {
                        if (item[cleanSearch]) {
                            return item[cleanSearch]; // Mengembalikan detail data jika cocok
                        }
                    }
                    return null;
                }
            },
            methods: {
                triggerSearch() {
                    if (!this.inputDo.trim()) {
                        alert('Mohon masukkan nomor DO terlebih dahulu!');
                        return;
                    }
                    this.activeSearchDo = this.inputDo.trim();
                    this.isSearched = true;
                },
                resetSearch() {
                    this.inputDo = '';
                    this.activeSearchDo = '';
                    this.isSearched = false;
                }
            }
        });
    });
});