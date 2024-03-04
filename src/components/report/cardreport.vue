<script setup>
import 'jquery/dist/jquery.min.js';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';
import 'datatables.net-buttons';
import 'datatables.net-responsive';
import "datatables.net-dt/css/jquery.dataTables.min.css"
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-buttons/js/dataTables.buttons.js"
import "datatables.net-buttons/js/buttons.colVis.js"
import "datatables.net-buttons/js/buttons.flash.js"
import "datatables.net-buttons/js/buttons.html5.js"
import "datatables.net-buttons/js/buttons.print.js"

DataTable.use(DataTablesCore);
</script>
<script>

import DatePicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';
import moment from 'moment'
export default {
  name: 'subreport',
  components: {
    DatePicker,
    DataTable,
    DataTablesCore
  },
  data: () => ({
    thongbao: '',
    subthongbao: '',
    kieusubthongbao: '1',
    // overwrite: true,
    dateFormat: "DD/MM/YYYY",
    columns: [
      { data: 'eLoadNumber', title: 'Eload' },
      { data: 'fileName', title: 'Tên File' },
      { data: 'uploadDate', title: 'Ngày Upload' },
      { data: 'msisdn', title: 'Số thuê bao' },
      { data: 'serial', title: 'Serial' },
      { data: 'apiStatus', title: 'Kết quả / Mã lỗi' },
    ],
    rows: [],
    TuNgay: moment(new Date()).format('DD/MM/YYYY'),
    DenNgay: moment(new Date()).format('DD/MM/YYYY'),
  }),
  created: async function () {
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    async GetReport() {
      this.$_root.context.get('/Cntt/Card',{fromDate: this.TuNgay, toDate: this.DenNgay}).then((response) => {
        this.rows = response.data;
        for(var item of this.rows) {
          item.uploadDate = moment(item.uploadDate).format('DD/MM/YYYY HH:mm:ss');
          item.apiStatus = item.apiStatus?item.apiStatus:"Đang xử lý...";
        }
        this.subthongbao = ("Lấy dữ liệu nạp thẻ thành công!");
        this.$toast.success("Lấy dữ liệu nạp thẻ thành công!");
        this.kieusubthongbao = 0;
      }).catch((ex)=>{
        this.subthongbao = "Có lỗi khi lấy dữ liệu nạp thẻ, vui lòng thử lại sau! "+ex.response.data;
        if(ex.response.data)
          this.$toast.error(""+ex.response.data);
        else
          this.$toast.error("Có lỗi khi lấy dữ liệu nạp thẻ, vui lòng thử lại sau! "+ex);
        this.kieusubthongbao = 1;
      })

    },
    ExportFile() {
      if(!this.rows || this.rows.length == 0) {
        this.$toast.error("Chưa có dữ liệu để xuất file. Vui lòng chọn xem báo cáo và đảm bảo có dữ liệu trước!");
        this.kieusubthongbao = 1;
        this.subthongbao = ("Chưa có dữ liệu để xuất file. Vui lòng chọn xem báo cáo và đảm bảo có dữ liệu trước!");
        return;
      }

      let csvContent = "data:text/csv;charset=utf-8," 
        +`"Eload","Tên File","Ngày Upload","Số thuê bao","Serial","Kết quả / Mã lỗi"` + this.rows.map(e => `${e.eLoadNumber},"${e.fileName}","${e.uploadDate}","${e.msisdn}","${e.serial}","${e.apiStatus}"`).join("\n");

      var encodedUri = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "Ds_DangKy_TTTB.csv");
      document.body.appendChild(link); // Required for FF

      link.click();
    },
  }
}
</script>

<template>
  <div class="container-fluid">
    <h1>Xem kết quả đăng ký nạp thẻ</h1>
    <div class="row">
      <div class="col-md-4 col-sm-12">
        <label class="label">Từ ngày:</label>
        <div class="value">
          <div>
            <date-picker v-model:value="TuNgay" :value-type="'format'" :format="dateFormat"></date-picker>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-12">
        <label class="label">Đến ngày:</label>
        <div class="value">
          <div>
            <date-picker v-model:value="DenNgay" :value-type="'format'" :format="dateFormat"></date-picker>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-12">
        <label class="label"></label>
        <div class="value">
          <div>
            <button class="btn btn-primary" @click.prevent="GetReport">Xem báo cáo</button>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="row" v-if="rows && rows.length>0">
      <DataTable
        :columns="columns"
        :options="{ responsive: true, pageLength: 10, processing: true, dom: 'Bfrtip', buttons: ['copy', 'csv', 'print' ] }"
        :data="rows"
        class="display"
      />
    </div>
    <div class="row text-center" v-if="rows && rows.length>0">
      <button class="btn btn-primary" @click.prevent="ExportFile">Xuất file</button>
    </div>
    <div v-if="subthongbao" class="subthongbao row alert" :class='{"alert-success":kieusubthongbao==0, "alert-danger":kieusubthongbao==1}'>
      Thông báo: {{ subthongbao }}
    </div>
  </div>
  
</template>

<style scoped>
@import 'bootstrap';
@import 'datatables.net-bs5';
@import '/static/css/datatables.css';
.read-the-docs {
  color: #888;
}
.row { padding: 10px 0 0 0; }
.responsive {
  width:100%;
  height: auto;
  /* width:130px;
  height: 100px; */
  /* max-height:130px; */
}

@media only screen and (max-width: 768px) { 
  .responsive {width: 150; height:120px; }
}
.thongbao {
  color: green;
  font-weight: bold;
}
.subthongbao {
  font-weight: bold;
  padding: 10px;
  margin: 10px 0 10px 0;
}
.hidden { display:none; }
</style>
