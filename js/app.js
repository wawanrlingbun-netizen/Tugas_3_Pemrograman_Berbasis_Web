new Vue({
    el: '#app',
    data() {
        return {
            // State Otentikasi Admin UT
            isLoggedIn: false,
            loginForm: { username: '', password: '' },

            currentTab: 'stok',
            stokBahanAjar: [],
            upbjjData: [],
            kategoriData: [],
            paketData: [],
            pengirimanData: [],
            trackingData: [],
            loading: true
        };
    },
    async mounted() {
        // Cek status login dari localStorage agar tidak hilang saat di-refresh
        if (localStorage.getItem('admin_logged_in') === 'true') {
            this.isLoggedIn = true;
        }

        const data = await ApiService.fetchData();
        if (data) {
            this.stokBahanAjar = data.stok;
            this.upbjjData = data.upbjjList;
            this.kategoriData = data.kategoriList;
            this.paketData = data.paket;
            this.pengirimanData = data.pengirimanList;
            this.trackingData = data.tracking;
        }
        this.loading = false;
    },
    methods: {
        handleLogin() {
            // Validasi Akun Admin UT
            if (this.loginForm.username === 'adminUT' && this.loginForm.password === 'admin123') {
                this.isLoggedIn = true;
                localStorage.setItem('admin_logged_in', 'true');
                // Reset form login
                this.loginForm.username = '';
                this.loginForm.password = '';
            } else {
                alert('Kredensial Salah! Gunakan Username: adminUT & Password: admin123');
            }
        },
        handleLogout() {
            if (confirm('Apakah Anda yakin ingin keluar dari sistem admin UT?')) {
                this.isLoggedIn = false;
                localStorage.removeItem('admin_logged_in');
                this.currentTab = 'stok'; // Reset tab ke awal
            }
        },
        setTab(tabName) {
            this.currentTab = tabName;
        },
        addNewStock(newItems) {
            const isExist = this.stokBahanAjar.some(item => item.kode.toLowerCase() === newItems.kode.toLowerCase());
            if (isExist) {
                alert(`Gagal! Buku dengan Kode ${newItems.kode} sudah terdaftar.`);
                return;
            }
            this.stokBahanAjar.unshift(newItems);
            alert('Sukses menambahkan data modul baru.');
        },
        deleteStock(kode) {
            this.stokBahanAjar = this.stokBahanAjar.filter(item => item.kode !== kode);
        },
        handleNewOrder(orderPayload) {
            const selectedPaket = this.paketData.find(p => p.kode === orderPayload.paketKode);
            const newDoNumber = `DO2026-000${this.trackingData.length + 1}`;
            
            const newTrackingEntry = {};
            newTrackingEntry[newDoNumber] = {
                nim: orderPayload.nim,
                nama: orderPayload.nama,
                status: "Dalam Perjalanan",
                ekspedisi: orderPayload.pengiriman === "EXP" ? "JNE Express" : "JNE Reguler",
                tanggalKirim: new Date().toISOString().split('T')[0],
                paket: orderPayload.paketKode,
                total: selectedPaket ? selectedPaket.harga : 0,
                perjalanan: [
                    { waktu: new Date().toLocaleString('id-ID'), keterangan: "Gudang UT Pusat: Paket dipersiapkan" }
                ]
            };

            this.trackingData.push(newTrackingEntry);
            alert(`Pemesanan Berhasil! Transaksi: ${newDoNumber}`);
            this.currentTab = 'tracking';
        }
    }
});