<script setup>
import { ref } from 'vue'

defineProps({
  loggedInUser: String,
  token: String,
})

const count = ref(0)
</script>
<script>
// If you like - you can move this section into separate file 
// ------- Move from here -------
const dataURItoBlob = (dataURI) => {
  const bytes = dataURI.split(',')[0].indexOf('base64') >= 0
    ? atob(dataURI.split(',')[1])
    : unescape(dataURI.split(',')[1]);
  const mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const max = bytes.length;
  const ia = new Uint8Array(max);
  for (let i = 0; i < max; i += 1) ia[i] = bytes.charCodeAt(i);
  return new Blob([ia], { type: mime });
};

const resizeImage = ({ file, maxSize }) => {
  const reader = new FileReader();
  const image = new Image();
  const canvas = document.createElement('canvas');

  const resize = () => {
    let { width, height } = image;

    if (width > height) {
      if (width > maxSize) {
        height *= maxSize / width;
        width = maxSize;
      }
    } else {
      width *= maxSize / height;
      height = maxSize;
    }

    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(image, 0, 0, width, height);

    const dataUrl = canvas.toDataURL('image/jpeg');

    return dataURItoBlob(dataUrl);
  };

  return new Promise((ok, no) => {
    if (!file.type.match(/image.*/)) {
      no(new Error('Not an image'));
      return;
    }

    reader.onload = (readerEvent) => {
      image.onload = () => ok(resize());
      image.src = readerEvent.target.result;
    };

    reader.readAsDataURL(file);
  });
};

import axios from 'axios'


export default {
  name: 'CNTT',
  components: {
  },
  data: () => ({
    txtPhoneNumber: '',
    Username: 'admin',
    fullname: '',
    idnum: '',
    dob: '',
    thongbao: '',
    subthongbao: '',
    hasImage: false,
    resizedImg: '',
    hople: false,
    sentotp: false,
    disablewhitelist: false,
    otp: '',
    anh1: '/no-img1.png',
    anh2: '/no-img2.png',
    anh3: '/no-img3.png',
  }),
  created: async function () {
  },
  watch: {
    'loggedInUser': function (val) {
      this.Username = val;
    }
  },
  computed: {
  },
  mounted () {
    this.Username = this.loggedInUser;
  },
  methods: {
    Save() {
      // console.log("Save");
      this.thongbao = "Thông tin đã được lưu trữ trên hệ thống! Bấm vào đây để  quay lại!";
    },
    Reset()
    {
      this.thongbao = "";
      this.subthongbao = "";
      this.txtPhoneNumber = "";
      this.fullname = "";
      this.idnum = "";
      this.dob = "";
      this.otp = "";
      this.hople = false;
      this.sentotp = false;
      this.txtOTP = "";
      this.anh1 = '/no-img1.png';
      this.anh2 = '/no-img2.png';
      this.anh3 = '/no-img3.png';
    },
    GenOTP(n) {
        var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   
        
        if ( n > max ) {
                return generate(max) + generate(n - max);
        }
        
        max        = Math.pow(10, n+add);
        var min    = max/10; // Math.pow(10, n) basically
        var number = Math.floor( Math.random() * (max - min + 1) ) + min;
        
        return ("" + number).substring(add); 
    },
    async CheckOTP() {
      var kq = await axios.post('/Cntt/VerifyOTP',{"msisdn":this.txtPhoneNumber, "otp":this.txtOTP},{
        headers: { 
          "Content-Type": "multipart/form-data",
          'Authorization': `Bearer ${this.token}` 
        },
      }).then(async (response) => {
        return response.data;
      }).catch(()=>{ return "Có lỗi xảy ra trong quá trình xác thực OTP, vui lòng thử lại sau!" });
      if(kq == "OK") {
        this.hople = true;
        this.subthongbao = "";
        this.otp = "";
        this.txtOTP = "";
        this.sentotp = false;

        //them search info
        await axios.post('/Cntt/SearchInfo',{"username":this.Username,"msisdn":this.txtPhoneNumber},{
          headers: { 
            "Content-Type": "multipart/form-data",
            'Authorization': `Bearer ${this.token}` 
          },
        }).then((response) => {
          if(response.data.message && response.data.message=="Thanh cong") {
            this.fullname = response.data.result[0].FULLNAME;
            this.idnum = response.data.result[0].IDNUMBER;
            this.dob = response.data.result[0].BIROFDAY;
          }
        })
      }
      else {
        this.hople = false;
        this.subthongbao = "Số OTP chưa đúng, vui lòng thử lại hoặc bấm kiểm tra để nhận số OTP mới!";
      }
    },
    async CheckWhiteList() {
    this.$toast.success("ABCDEF");
      if(this.disablewhitelist) return;
      this.disablewhitelist = true;
      setTimeout(()=>{ this.disablewhitelist = false; },1000);
      this.hople = false;
      this.subthongbao = "";
      this.fullname = "";
      this.idnum = "";
      this.dob = "";
      this.sentotp = false;
      this.otp = "";
      this.txtOTP = "";
      this.anh1 = '/no-img1.png';
      this.anh2 = '/no-img2.png';
      this.anh3 = '/no-img3.png';
      if(!this.txtPhoneNumber) {
        this.subthongbao = ("Phải nhập số điện thoại hợp lệ!");
        return;
      }
      if(this.txtPhoneNumber.match(/^\d{9}$/g))
        this.txtPhoneNumber = '84'+this.txtPhoneNumber;
      if(this.txtPhoneNumber.match(/^0\d{9}$/g))
        this.txtPhoneNumber = '84'+this.txtPhoneNumber.substring(1);
      if(!this.txtPhoneNumber.match(/^84\d{9}$/g)) {
        this.subthongbao = ("Số điện thoại phải bắt đầu bằng 84 và có độ dài 11 số!");
        return;
      }
      await axios.post('/Cntt/CheckWhiteList',{"username":this.Username,"msisdn":this.txtPhoneNumber, "reqotp":disableOTP?0:1},{
        headers: { 
          "Content-Type": "multipart/form-data",
            'Authorization': `Bearer ${this.token}` 
        },
      }).then(async (response) => {
          this.sentotp = false;
          if(response.data.message && response.data.message=="Thanh cong") {
          // this.otp = this.GenOTP(6);
          // if(!disableOTP)
          // await axios.post('/Cntt/SendSMS',{"otp":this.otp,"msisdn":this.txtPhoneNumber},{
          //     headers: { 
          //       "Content-Type": "multipart/form-data",
          //       'Authorization': `Bearer ${this.token}` 
          //     },
          //   }).then(response => {
          //     this.sentotp = response && response.data && response.data.error_code==0;
          //   });
          // if(!disableOTP && !this.sentotp) {
          //   this.hople = false;
          //   this.subthongbao = "Có lỗi trong quá trình gửi OTP, vui lòng thử lại!";
          // }
          if(disableOTP) {
            this.hople = true;
            this.subthongbao = "";

            //them search info
            await axios.post('/Cntt/SearchInfo',{"username":this.Username,"msisdn":this.txtPhoneNumber},{
              headers: { 
                "Content-Type": "multipart/form-data",
                'Authorization': `Bearer ${this.token}` 
              },
            }).then((response) => {
              if(response.data.message && response.data.message=="Thanh cong") {
                this.fullname = response.data.result[0].FULLNAME;
                this.idnum = response.data.result[0].IDNUMBER;
                this.dob = response.data.result[0].BIROFDAY;
                
              }
            })
          } else 
            this.sentotp = true;
        }
        else {
          this.hople = false;
          this.subthongbao = (response.data.message=="Khong thuoc whitelist"?"Số không thuộc danh sách cần cập nhật thông tin.":response.data.message);
        }
      })
    },
    async UploadFileHoSo(ftype) {
      if(!this.hople) return;
      if(!this.txtPhoneNumber) {
        this.subthongbao = ("Phải nhập số điện thoại trước!");
        return;
      }
      // console.info('file',this.$refs['files'+ftype].files);
      // this.loading(true);
      let formData = new FormData();
      const lastDot = this.$refs['files'+ftype].files[0].name.lastIndexOf(".");
      const vfile_ext = this.$refs['files'+ftype].files[0].name.substring(lastDot + 1);
      for (var file of this.$refs['files'+ftype].files) {
        // formData.append("files", file);
        if (!file.type.match(/image.*/)) {
          this.subthongbao = ('Phải chọn ảnh để upload!');
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => this.originalImg = e.target.result;
        reader.readAsDataURL(file); // convert to base64 string
        // END: preview original

        // START: preview resized
        await resizeImage({ file: file, maxSize: 1920 }).then((resizedImage) => {
          // console.log(resizedImage);
          formData.append("files", resizedImage);
          this['anh'+ftype] = URL.createObjectURL(resizedImage);
        }).catch((err) => {
          console.error(err);
        });
      }
      if (this.gioihan_loaifile == 1) {

      }
      formData.append("fileType",(ftype?ftype:1));
      formData.append("phoneNumber",this.txtPhoneNumber);
      formData.append("username",this.Username);
      axios.post('/Cntt/UploadFile',formData,{
        headers: { 
          "Content-Type": "multipart/form-data",
          'Authorization': `Bearer ${this.token}` 
          // "Access-Control-Allow-Origin": "*",
          // "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          // "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
        },
      }).then((response) => {
        // console.log(response.data)
        this.subthongbao = response.data;
      }).catch((ex)=>{this.subthongbao = "Có lỗi khi upload file, vui lòng thử lại sau!"})

      // await UploadEProfileAPI.upload_file_hoso(this.axios, formData, {
      //   headers: { "Content-Type": "multipart/form-data" },
      // })
      //   .then((response) => {
      //     this.loading(false);
      //     if (
      //       response.data.error_code &&
      //       response.data.error_code === this.success_code
      //     ) {
      //       this.listbox.ds_file_hs.value.url = response.data.data[0];
      //       console.log(this.listbox.ds_file_hs.value.kieu)
             
      //     }
      //   })
        
      //   ;
      // this.loading(false);
    },
  }
}
</script>

<template>
  <div class="container-fluid" v-if="!thongbao">
    <h1>Nhập thông tin</h1>
    <div class="subthongbao">{{ subthongbao }}</div>
    <div class="row">
      <!-- <label class="label">Tên đăng nhập</label> -->
      <div class="value">
        <div class="input-group">
          <input class="form-control" type="text" required v-model="txtPhoneNumber" max-length="11" placeholder="Số điện thoại (vd: 0912345678)" @change="CheckWhiteList" />
          <div class="input-group-append"><button class="btn btn-secondary" @click.prevent="CheckWhiteList">Kiểm tra</button></div>
        </div>
      </div>
    </div>
    <div class="row" v-if="!disableOTP && sentotp">
      <div class="value input-group">
        <input class="form-control" type="text" required v-model="txtOTP" placeholder="OTP..." @keypress.enter="CheckOTP" />
        <div class="input-group-append"><button class="btn btn-secondary" @click.prevent="CheckOTP">Xác thực</button></div>
      </div>
    </div>
    <div class="row text-center" v-if="hople">
      <!-- <label class="label">Mật khẩu</label> -->
      <div class="value row">
        <div class="col-md-4 col-sm-12">
          <label class="btn" for="upload-file1">
            <img :src="anh1" class="responsive" />
            <input type="file" ref="files1" class="hidden" id="upload-file1" :accept="formAllowFileType" @change="UploadFileHoSo(1)">
            <br />
            Ảnh trước CCCD
          </label>
        </div>
        <div class="col-md-4 col-sm-12">
          <label class="btn" for="upload-file2">
            <img :src="anh2" class="responsive" />
            <input type="file" ref="files2" class="hidden" id="upload-file2" :accept="formAllowFileType" @change="UploadFileHoSo(2)">
            <br />
            Ảnh sau CCCD
          </label>
        </div>
        <div class="col-md-4 col-sm-12">
          <label class="btn" for="upload-file3">
            <img :src="anh3" class="responsive" />
            <input type="file" ref="files3" class="hidden" id="upload-file3" :accept="formAllowFileType" @change="UploadFileHoSo(3)">
            <br />
            Ảnh chân dung
          </label>
        </div>
      </div>
    </div>
    <div class="row" v-if="hople && anh1!='/no-img1.png' && anh2!='/no-img2.png' && anh3!='/no-img3.png'">
      <div class="label"></div>
      <div class="value"><input class="btn btn-primary" type="submit" value="Lưu thông tin" @click.prevent="Save" /></div>
    </div>
    <div v-if="fullname">
      <hr />
      <h2>Thông tin thuê bao</h2>
      <div class="row">
        <div class="label col-4 text-start">Họ và tên:</div>
        <div class="value col-8 text-start">{{ fullname }}</div>
      </div>
      <div class="row">
        <div class="label col-4 text-start">Số giấy tờ:</div>
        <div class="value col-8 text-start">{{ idnum }}</div>
      </div>

      <div class="row">
        <div class="label col-4 text-start">Ngày sinh:</div>
        <div class="value col-8 text-start">{{ dob }}</div>
      </div>
    </div>
  </div>
  <div class="container" v-if="thongbao">
    <h1>Hoàn thành thông tin</h1>
    <div class="row">
      <!-- <label class="label">OTP</label> -->
      <span class="thongbao">Thông tin đã được lưu trữ trên hệ thống! Bấm vào đây để  quay lại!</span>
    </div>
    <div class="row">
      <div class="label col-12"></div>
      <div class="value col-12"><input class="btn btn-secondary" type="submit" value="Quay lại" @click.prevent="Reset" /></div>
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
  color: red;
  font-weight: bold;
}
.hidden { display:none; }
</style>
