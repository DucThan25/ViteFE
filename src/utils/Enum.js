export const DichVuVienThong = {
  TATCA: -1,
  CO_DINH: 1,
  DI_DONG: 2,
  ADSL: 4,
  DD_TRATRUOC: 5,
  EMAIL: 6,
  METRONET: 7,
  MEGAWAN: 8,
  TSL: 9,
  GPHONE: 10,
  IMS: 11,
  MEGA_EYES: 12,
  HOINGHI_TRUYENHINH: 13,
  ANTOAN_BAOMAT_TT: 14,
  DICHVU_CNTT: 15,
  TRUNGTAM_DULIEU: 16,
  HATANG_VIENTHONG: 19,
  IMS_DOITAC: 21,
  BRCD_DOITAC: 22,
  MGW_DOITAC: 23,
  TSL_DOITAC: 24
};

export const LoaiHopDong = {
  KHONG_DUNG: 0,
  DAT_MOI: 1,
  CHUYEN_QUYEN: 2,
  DI_CHUYEN: 3,
  CHAMDUT_SD: 4,
  THAYDOI_THONGSO_MEGAWAN: 5,
  CHUYENDOI_LH: 6,
  THAY_DOI_DV: 7,
  THAY_DOI_TOCDO_ADSL: 8,
  THAY_DOI_SOMAY_TN: 9,
  TACHNHAP_TB: 10,
  THAY_TT_KHAC: 11,
  THAY_DOI_SO_SIM: 12,
  THUEBAO_TRATRUOC: 13,
  THAY_DAY_MAY: 13,
  VATTU_THUEBAO: 13,
  DOISO_TB: 14,
  BAN_THIETBI: 15,
  THAY_DOI_TOCDO_TSL: 16,
  THU_KHAC: 17,
  KHAO_SAT: 18,
  TDTT_DV_CNTT: 19,
  GHEP_MA_KHACHHANG: 20,
  KY_LAI_HD_GOC: 24,
  TAMDUNG_SD: 25,
  THAYDOI_THONGSO_MYTV: 25,
  TIEPNHAN_DATMOI: 26,
  DOIGOICUOC_DD: 27,
  TIEPNHAN_CDLH: 28,
  TIEPNHAN_DC: 29,
  KHOIPHUC_SD: 30,

  DANGKY_GOI_DADV: 27,
  THAYDOI_GOI_DADV: 28,

  DATCOC_MOI: 31,
  THAYDOI_DATCOC: 32,

  KHAOSATDATMOI: 33,
  KHAOSATCDLH: 34,
  KHAOSATDC: 35,
  TIEPNHANHD: 36,
  THUCUOC_THUHOIVT: 37,
  TUVAN_DV: 38, //phối hợp tư vấn dịch vụ giữa NVKT và TTKD
  THAYDOI_TT_DD: 100, // vuth them - thay doi thoong tin di dong

  DD_SIPTRUNKING: 40, // Taita thêm đăng ký dịch vụ SIPTRUNKING
  DD_HUYSTKING: 42, // Hủy dịch vụ Siptrunking di động
  DD_DKVCC: 43, //  Đăng ký dịch vụ VCC di động
  DD_HUYVCC: 44, //  Hủy dịch vụ VCC di động
  DD_TAMDUNGVCC: 45, //  Tạm dừng dịch vụ VCC di động
  DD_KICHVCC: 46, //   Kích hoạt lại dịch vụ VCC di động
  DD_CAPNHATGOI: 47, // Cập nhật gói VCC
  DD_XOAGOI: 48, // Xóa gói VCC
  DD_CAPNHATDATA: 49, // Thêm mới dịch vụ data
  DD_XOADATA: 50, // Xóa data VCC

  DD_HSSV: 101, // vuth update before 1509
  DD_DOANVIEN: 102, // vuth update before 1509
  DK_MULTISIM: 39, // vuth them 27/08/2020
  GIAHAN: 41 // vuth them 27/08/2020
};

export const NHOM_KQXL = {
  DA_THU_KO_CO_NHUCAU_SUDUNG: 7,
  DA_THU_CO_NHUCAU_SUDUNG: 8,
  CHUA_THU_CUOC: 9, //: với TTKD chưa đôn đốc của HNI
  CHUA_XACDINH_NGUYEN_NHAN: 10,
  KH_DONGY_TIEPTUC_SUDUNG: 28,
  KH_KHONG_DONGY_TIEPTUC_SUDUNG: 27,
  TTKD_DA_DON_DOC: 30
};
export const KETQUA_XL = {
  KO_CAN_THUHOI_TBI: 1,
  KO_THUHOI_DUOC_TBI: 1,
  THUHOI_DUOC_TBI: 3,
  CHUA_THU_TIEN: 6,
  DA_THU_TIEN: 7,
  TOT: 10,
  KO_TOT: 11,
  DUOC_DUYET: 12,
  KO_DUOC_DUYET: 13,
  DAY_DU: 14,
  KO_DAY_DU: 15,
  /// <summary>
  /// Không khóa
  /// </summary>
  KHONG_KHOA: 28,
  /// <summary>
  /// Khóa máy
  /// </summary>
  KHOA: 29,
  /// <summary>
  /// Khách hàng đồng ý thanh toán
  /// </summary>
  KH_DONG_Y_THANHTOAN: 121,
  /// <summary>
  /// Khách hàng không đồng ý thanh toán
  /// </summary>
  KH_KHONG_DONG_Y_THANHTOAN: 122
};
export const TRANGTHAI_DONGBO = {
  KHONGPHAI_DB: -1,
  CHUADONGBO: 0,
  DONGBO_LHD: 1,
  DONGBO_TT: 2,
  KICH_HOAT_CA: 3,
  DONGBO_CM: 5,
  DONGBO_HT: 6,
  DONGBO_SERVICE: 7,
  //TuấnNA thêm biến cho phép đóng, mở hàm vinaphone: false -> đóng hàm, else : mở hàm -- ngày 11.10.2012
  OPEN_SYNC_VINA: false,
  OPEN_SYNC_VINA_TRASAU: false // vuth them bien tat mo dong bo tra sau theo chỉ đạo của sếp hiếu.
};
export const TrangThaiHD = {
  MOI: 1,
  THANH_TOAN: 2,
  DIEUHANH_THI_CONG: 3,
  DANG_THI_CONG: 4,
  DA_THI_CONG_XONG: 5,
  HOAN_THANH: 6,
  THOAITRA: 7,
  DA_LAY_DU_LIEU: 8,
  KHAIBAO_TONGDAI: 9,
  DANGCHO_HOANCONG: 10,
  DOISOAT_HOSO: 11,
  TTVT_XACMINH_NO: 14,
  THOAITRA_TMP: 17,
  TTVT_HOANCONG_DICHVU: 23,
  HTHS_BANCHEO: 26,
  NVKD_XACMINH: 27
};
export const Loai_NV = {
  NHANVIEN_GD: 2,
  THICONG_DAYMAY: 6,
  // TONGDAI_CD : 9,
  // TO_THICONG_ADSL : 11,
  // NHANVIEN_DOTHU : 12,
  LANHDAO_DV: 13,
  THUNGAN: 17,
  NHANVIEN_XULY_NO: 19,
  // NHANVIEN_XULY_SUCO : 21,
  NHANVIEN_DIEUCHINH_NO: 22,
  CONGTACVIEN: 24,
  NHANVIEN_TC: 25,
  CHAM_SOC_KHACH_HANG: 32,
  NHANVIEN_PHAPLY: 34,
  NHANVIEN_TN: 39,
  NHANVIEN_QLDL: 40,
  NHAN_BANGKE: 45,
  NHANVIEN_KYTHUAT: 51, // Nhân viên quản lý kỹ thuật
  NHANVIEN_KINHDOANH: 52, // Nhân viên quản lý kinh doanh
  NHANVIEN_KD_HENLD: 58, // hoangpkn : 24/10/2016 thêm loại nhân viên này phục vụ việc ko cho user TTKD được sửa ngày hẹn LĐ dp người LHĐ
  NHANVIEN_KHAOSAT_KH: 95,
  NHANVIEN_TTVT_KHAOSAT_KH: 96,
  NHANVIEN_QL_AM: 116, // CUONG thêm quản lý AM,
  THANHLY: 33,
  THUKHO: 303,
  NHANVIEN_AM: 104
};
export const QUYEN = {
  TOTRUONG_XLKN: 60,
  TOTRUONG_XLN: 61,
  BIENDICH: 2000,
  DUOC_SUA_LIENHE_BH: 9000,
  DUOC_SUA_KHGOI_BH: 9001,
  KETOAN_BHTB: 10102
};
export const KIEUNO = {
  NO_DAU_KY: 0,
  TONG_NO: 1,
  NO_TRUNG_GIAN: 3,
  NO_PHAT_SINH: 5
};
export const TRANGTHAI_XLN = {
  CHUAXULY: 0,
  /// <summary>
  /// Thanh toán hết tiền
  /// </summary>
  DAXULY: 2,
  /// <summary>
  /// Không thu được
  /// </summary>
  KHONGTHUDUOC: 1,
  /// <summary>
  /// Hẹn trả - thanh toán hết
  /// </summary>
  KHACHHANG_HENTRA: 3,
  /// <summary>
  /// Khách hàng tự đi thanh toán
  /// </summary>
  KHACHHANG_TUTHANHTOAN: 4,
  /// <summary>
  /// Khách hàng hẹn trả(chưa thanh toán)
  /// </summary>
  HENTRA_CHUA_TT: 11,
  /// <summary>
  /// XLN theo quyết định của Hội Đồng Xử Lý Nợ - BDG
  /// </summary>
  XULYNO_HOIDONG: 15
};
export const KETQUA_XLN = {
  THANHTOAN_HET: 2,
  // THANHTOAN_MOT_PHAN : 2,
  KHONGTHUDUOC: 1,
  KHACHHANG_HENTRA: 3,
  KHACHHANG_TU_THANHTOAN: 4
};
export const NHOM_BC = {
  BC_TIEPNHAP: 1,
  BC_PHATTRIEN: 4,
  BC_BAOHONG_119: 10,
  BC_TRAMVT: 12,
  HD_PL_PYC: 15,
  MAU_IN_HDTN: 16,
  BB_NGHIEMTHU: 21,
  XULYNO: 24,
  KHIEUNAI: 99 //tunghpg
};
export const MA_BC = {
  /// <summary>
  /// Phiếu ký nhận khiếu nại
  /// </summary>
  PHIEU_KYNHAN_KN: "KYNHAN_KN",
  /// <summary>
  /// Phiếu thuê bao trả trước
  /// </summary>
  PHIEU_TB_TT: "TT_TBTT",
  /// <summary>
  /// Tra cứu nợ tổng hợp
  /// </summary>
  TRACUU_NO_TH: "TC_NO_TH",

  /// <summary>
  /// In danh sách giao nhận thông báo nợ
  /// </summary>
  IN_DS_GIAONHAN_TBN: "DSGN_TBN",
  /// <summary>
  /// Công văn nhắc nợ theo thuê bao
  /// </summary>
  CONGVAN_NHACNO_TB: "CVNN_TB",
  /// <summary>
  /// Công văn nhắc nợ theo thuê bao mẫu 3
  /// </summary>
  CONGVAN_NHACNO_TB_3: "CVNN_TB3",
  /// <summary>
  /// Đơn khởi kiện mẫu 1
  /// </summary>
  DON_KHOI_KIEN_1: "DKK_1",
  /// <summary>
  /// Đơn khởi kiện mẫu 2
  /// </summary>
  DON_KHOI_KIEN_2: "DKK_2",
  /// <summary>
  /// Phiếu thu
  /// </summary>
  PHIEU_THU: "PHIEU_THU"
};

export const KIEUKHOAMO = {
  KHOAMAY: 1,
  MOMAY: 0
};

export const KieuKhoa = {
  KHOA_MOT_CHIEU: 1,
  KHOA_HAI_CHIEU: 2,
};

export const TrangThaiTB = {
  THUONG: 1,
  KHOA_MOTCHIEU_YEUCAU: 2,
  KHOA_MOTCHIEU_CUONGBUC: 3,
  KHOA_HAICHIEU_YEUCAU: 4,
  KHOA_HAICHIEU_CUONGBUC: 5,
  TAMDUNG: 6,
  THANHLY: 7,
  DOISO: 8,
  THANHLY_NO: 9,
  MO: 10
};

export const HinhThucThanhToan = {
    THU_TAI_QUAY : 1,
    THU_TAI_NHA : 2,
    UYNHIEM_THU : 3,
    UYNHIEM_CHI : 4,
    GACHNO_POS : 133
};

export const KIEU_KH = {
    CA_NHAN: 0,
    DOANH_NGHIEP: 1,
};

export const PHANLOAI_KH = {
    CA_NHAN: 2,
    DOANH_NGHIEP: 1,
};

export const TRANGTHAI_PH = {
    MOI:1,
    DAGIAO:2,
    DATRALAI:3,
    DATHUCHIEN: 4 
};
