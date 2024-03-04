<script setup>
const template = new URL('@/assets/uploads/templates/sub.csv', import.meta.url).href
</script>
<script>

import axios from 'axios'


export default {
  name: 'regsubbylist',
  components: {
  },
  data: () => ({
    thongbao: '',
    subthongbao: '',
    kieusubthongbao: '1',
    overwrite: true,
  }),
  created: async function () {
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    async UploadFileHoSo() {
      if(!this.$refs['files'].files || this.$refs['files'].files.length<0 || this.$refs['files'].files>1) {
        this.subthongbao = ('Phải chọn 1 file csv để upload.');
        this.$toast.error('Phải chọn 1 file csv để upload.');
        this.kieusubthongbao = 1;
      }
      let formData = new FormData();
      const lastDot = this.$refs['files'].files[0].name.lastIndexOf(".");
      const vfile_ext = this.$refs['files'].files[0].name.substring(lastDot + 1);
      for (var file of this.$refs['files'].files) {
        // formData.append("files", file);
        if (file.type!="text/csv" && vfile_ext!="csv") {
          this.subthongbao = ('Chỉ được phép upload file csv!');
          this.kieusubthongbao = 1;
          return;
        }
        formData.append("files", file);
      }
      formData.append("confirmOverwrite",this.overwrite?1:0);
      formData.append("fileType",0);
      this.$_root.context.postForm('/Cntt/UploadFile',formData).then((response) => {
        this.subthongbao = response.data;
        this.$toast.success(response.data);
        this.kieusubthongbao = 0;
      }).catch((ex)=>{
        this.subthongbao = "Có lỗi khi upload file, vui lòng thử lại sau! "+ex.response.data;
        if(ex.response.data)
          this.$toast.error(""+ex.response.data);
        else
          this.$toast.error("Có lỗi khi upload file, vui lòng thử lại sau! "+ex);
        this.kieusubthongbao = 1;
      })

    },
  }
}
</script>

<template>
  <div class="container-fluid">
    <h1>Đăng ký TTTB</h1>
    <div class="row">
      <label class="label">File:</label>
      <div class="value">
        <div>
          File mẫu: <a :href="template">84912413751.csv</a>
          <br />
          <input type="file" class="form-control" ref="files" id="upload-file" accept=".csv">
          <br />
          <input type="checkbox" v-model="overwrite" /> Ghi đè file?
        </div>
      </div>
    </div>
    
    <div class="row text-center">
      <button class="btn btn-primary" @click.prevent="UploadFileHoSo">Đăng ký</button>
    </div>
    <div v-if="subthongbao" class="subthongbao row alert" :class='{"alert-success":kieusubthongbao==0, "alert-danger":kieusubthongbao==1}'>
      Thông báo: {{ subthongbao }}
    </div>
  </div>
  
</template>

<style scoped>
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
