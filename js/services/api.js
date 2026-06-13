// js/services/api.js
const ApiService = {
  async fetchData() {
    try {
      const response = await fetch('./data/dataBahanAjar.json');
      if (!response.ok) throw new Error('Gagal mengambil berkas JSON default.');
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  async loadTemplate(path) {
    try {
      const response = await fetch(path);
      if (!response.ok) throw new Error(`Gagal memuat template: ${path}`);
      return await response.text();
    } catch (error) {
      console.error(error);
      return '';
    }
  }
};