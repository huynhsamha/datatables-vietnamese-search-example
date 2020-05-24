import axios from 'axios';

const jsrmvi = require('jsrmvi');

$(() => {

  const $Elements = {
    dataLoading: $('#dataLoading'),
    tbData: $('#tbData')
  };

  const Tables = {
    tbData: null
  };

  const loadData = async () => axios.get('data/data.json').then(res => res.data);

  function initDataTables() {
    Tables.tbData = $Elements.tbData.DataTable({
      data: [], pagingType: 'numbers',
      deferRender: true,
      columns: [
        { }, // city
        { }, // admin
        { }, // lat
        { }, // lng
        { visible: false } // payload
      ],
      createdRow: (row, data, index) => {
      }
    });
  }

  function parseDataToTable(data = []) {
    return data.map((r) => {
      const { city, admin, lat, lng } = r;
      const payload = `${jsrmvi.removeVI(city)}|${jsrmvi.removeVI(admin)}`;
      return [city, admin, parseInt(lat, 10), parseInt(lng, 10), payload];
    });
  }

  async function main() {
    initDataTables();
    const data = await loadData();
    console.log(data);
    const rows = parseDataToTable(data);
    Tables.tbData.rows.add(rows).draw();
    $Elements.dataLoading.hide();
  }

  main();

});
