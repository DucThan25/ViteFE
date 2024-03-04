import {
  PortVisibility,
  NodeConstraints,
  ConnectorConstraints
} from "@syncfusion/ej2-vue-diagrams";
export default {
  /**
   * Port trên của NODE
   */
  PORT_TREN: { x: 0.5, y: 0 },
  /**
   * Port dưới của NODE
   */
  PORT_DUOI: { x: 0.5, y: 1 },
  /**
   * Port trái của NODE
   */
  PORT_TRAI: { x: 0, y: 0.5 },
  /**
   * Port phải của NODE
   */
  PORT_PHAI: { x: 1, y: 0.5 },

  /**
   *
   * @param {*} id Giá trị (chuỗi) id của NODE
   * @param {*} shape Hình dạng và nội dung của NODE. Ex: { type: "Text", content: "Noi dung" }
   * @param {*} ports Danh sách port trên NODE
   * @param {*} annotations Đối tượng danh sách annotation của NODE. Ex: [{ content: text, margin: { left: 25 }},]
   * @returns
   */
  taoNode: function(id, shape, ports, annotations) {
    let node = {
      id: id,
      constraints:
        NodeConstraints.Default &
        ~NodeConstraints.Rotate &
        ~NodeConstraints.Drag &
        ~NodeConstraints.Resize &
        ~NodeConstraints.Delete
    };
    if (!(typeof shape === "undefined" || shape == null)) {
      node.shape = shape;
    }
    if (!(typeof ports === "undefined" || ports == null)) {
      node.ports = ports;
    }
    if (!(typeof annotations === "undefined" || annotations == null)) {
      node.annotations = annotations;
    }
    return node;
  },

  /**
   *
   * @param {*} stringStyle Giá trị style trên DB. Ex: "BTS"
   * @param {*} id Giá trị (chuỗi) id của NODE
   * @param {*} ports Danh sách port trên NODE
   * @param {*} annotations Đối tượng danh sách annotation của NODE. Ex: [{ content: text, margin: { left: 25 }},]
   * @returns
   */
  taoNodeTheoStyle: function(stringStyle, id, ports, annotations) {
    let node = this.taoNode(id, null, ports, annotations);
    let iconFile = "CHUA_XAC_DINH.jpg";
    if (stringStyle == "ADD") {
      iconFile = "ADD.jpg";
    }
    // Trạm thiết bị
    else if (
      stringStyle == "BTS" ||
      stringStyle == "MSAN_RSU" ||
      stringStyle == "MSAN_RSU_BTS" ||
      stringStyle == "HOST" ||
      stringStyle == "TRAM"
    ) {
      if (stringStyle == "BTS") iconFile = "BTS.jpg";
      if (stringStyle == "MSAN_RSU") iconFile = "MSAN_RSU.jpg";
      if (stringStyle == "MSAN_RSU_BTS") iconFile = "MSAN_RSU_BTS.jpg";
      if (stringStyle == "HOST") iconFile = "HOST.jpg";
      if (stringStyle == "TRAM") iconFile = "TRAM_THIET_BI.jpg";
    }
    // Kết cuối
    else if (stringStyle == "NHA_CAP" || stringStyle == "1") {
      iconFile = "NHA_CAP.jpg";
    } else if (stringStyle == "TU_CAP" || stringStyle == "2") {
      iconFile = "TU_CAP.jpg";
    } else if (stringStyle == "HOP_CAP" || stringStyle == "3") {
      iconFile = "HOP_CAP.jpg";
    } else if (stringStyle == "MANG_XONG" || stringStyle == "4") {
      iconFile = "MANG_XONG.jpg";
    } else if (stringStyle == "SPLITTER" || stringStyle == "5") {
      iconFile = "SPLITTER.jpg";
    } else if (stringStyle == "TU_QUANG_SPLITTER" || stringStyle == "6") {
      iconFile = "TU_QUANG_SPLITTER.jpg";
    } else if (stringStyle == "KHAY_ODF" || stringStyle == "8") {
      iconFile = "KHAY_ODF.jpg";
    } else if (stringStyle == "OVAN") {
      // iconFile = "OVAN.jpg";//chua co
    } else if (stringStyle == "KETCUOI_KHAC_TUYEN") {
      iconFile = "KETCUOI_KHAC_TUYEN.jpg"; // chua co
    }
    // Cột
    else if (stringStyle == "COT_CHUA_XD") {
      // iconFile = "COT_CHUA_XD.jpg"; //chua co
    } else if (stringStyle == "COT_TRON_LYTAM") {
      // iconFile = "COT_TRON_LYTAM.jpg"; //chua co
    } else if (stringStyle == "COT_SAT_TRON") {
      // iconFile = "COT_SAT_TRON.jpg"; //chua co
    } else if (stringStyle == "COT_SAT_T") {
      // iconFile = "COT_SAT_T.jpg"; //chua co
    } else if (stringStyle == "COT_VUONG") {
      // iconFile = "COT_VUONG.jpg"; //chua co
    } else if (stringStyle == "COT_KHAC_TUYEN") {
      // iconFile = "COT_KHAC_TUYEN.jpg"; //chua co
    }
    // Bể cáp
    else if (stringStyle == "BE_CHUA_XACDINH") {
      iconFile = "BE_CHUA_XACDINH.png";
    } else if (stringStyle == "BE_CHUNHAT") {
      iconFile = "BE_CHUNHAT.png";
    } else if (stringStyle == "BE_CHU_T") {
      iconFile = "BE_CHU_T.png";
    } else if (stringStyle == "BE_CHU_L") {
      iconFile = "BE_CHU_L.png";
    } else if (stringStyle == "BE_GANG_TRON") {
      iconFile = "BE_GANG_TRON.png";
    } else if (stringStyle == "BE_HINH_VUONG") {
      iconFile = "BE_HINH_VUONG.png";
    } else if (stringStyle == "BE_SH") {
      iconFile = "BE_SH.png";
    } else if (stringStyle == "BE_GANIVO") {
      iconFile = "BE_GANIVO.png";
    } else if (stringStyle == "BE_HH") {
      iconFile = "BE_HH.png";
    } else if (stringStyle == "BE_HM") {
      iconFile = "BE_HM.png";
    } else if (stringStyle == "BE_KHAC_TUYEN") {
      iconFile = "BE_KHAC_TUYEN.png";
    } else {
      // default
    }
    node.shape = {
      type: "Image",
      source: "/static/icons/icon100x100/" + iconFile,
      scale: "None"
    };
    node.style = { fill: "none", strokeWidth: 0 };
    node.height = 48;
    node.width = 48;
    return node;
  },

  /**
   *
   * @param {*} stringStyle Giá trị style trên DB. Ex: "BTS"
   * @param {*} id Giá trị (chuỗi) id của NODE
   * @param {*} ports Danh sách port trên NODE
   * @param {*} annotations Đối tượng danh sách annotation của NODE. Ex: [{ content: text, margin: { left: 25 }},]
   * @returns
   */
  taoNodeTheoStyle_v2: function(stringStyle, id, ports, annotations) {
    let node = this.taoNode(id, null, ports, annotations);
    let iconFile = "CHUA_XAC_DINH.jpg";
    if (stringStyle == "ADD") {
      iconFile = "ADD.jpg";
    }
    // Trạm thiết bị
    else if (
      stringStyle == "BTS" ||
      stringStyle == "MSAN_RSU" ||
      stringStyle == "MSAN_RSU_BTS" ||
      stringStyle == "HOST" ||
      stringStyle == "TRAM"
    ) {
      if (stringStyle == "BTS") iconFile = "BTS.jpg";
      if (stringStyle == "MSAN_RSU") iconFile = "MSAN_RSU.jpg";
      if (stringStyle == "MSAN_RSU_BTS") iconFile = "MSAN_RSU_BTS.jpg";
      if (stringStyle == "HOST") iconFile = "HOST.jpg";
      if (stringStyle == "TRAM") iconFile = "TRAM_THIET_BI.jpg";
    }
    // Kết cuối
    else if (stringStyle == "NHA_CAP" || stringStyle == "1") {
      iconFile = "NHA_CAP.jpg";
    } else if (stringStyle == "TU_CAP" || stringStyle == "2") {
      iconFile = "TU_CAP.jpg";
    } else if (stringStyle == "HOP_CAP" || stringStyle == "3") {
      iconFile = "HOP_CAP.jpg";
    } else if (stringStyle == "MANG_XONG" || stringStyle == "4") {
      iconFile = "MANG_XONG.jpg";
    } else if (stringStyle == "SPLITTER" || stringStyle == "5") {
      iconFile = "SPLITTER.jpg";
    } else if (stringStyle == "TU_QUANG_SPLITTER" || stringStyle == "6") {
      iconFile = "TU_QUANG_SPLITTER.jpg";
    } else if (stringStyle == "KHAY_ODF" || stringStyle == "8") {
      iconFile = "KHAY_ODF.jpg";
    } else if (stringStyle == "OVAN") {
      // iconFile = "OVAN.jpg";//chua co
    } else if (stringStyle == "KETCUOI_KHAC_TUYEN") {
      iconFile = "KETCUOI_KHAC_TUYEN.jpg"; // chua co
    }
    // Cột
    else if (stringStyle == "COT_CHUA_XD") {
      // iconFile = "COT_CHUA_XD.jpg"; //chua co
    } else if (stringStyle == "COT_TRON_LYTAM") {
      // iconFile = "COT_TRON_LYTAM.jpg"; //chua co
    } else if (stringStyle == "COT_SAT_TRON") {
      // iconFile = "COT_SAT_TRON.jpg"; //chua co
    } else if (stringStyle == "COT_SAT_T") {
      // iconFile = "COT_SAT_T.jpg"; //chua co
    } else if (stringStyle == "COT_VUONG") {
      // iconFile = "COT_VUONG.jpg"; //chua co
    } else if (stringStyle == "COT_KHAC_TUYEN") {
      // iconFile = "COT_KHAC_TUYEN.jpg"; //chua co
    }
    // Bể cáp
    else if (stringStyle == "BE_CHUA_XACDINH") {
      iconFile = "BE_CHUA_XACDINH.png";
    } else if (stringStyle == "BE_CHUNHAT") {
      iconFile = "BE_CHUNHAT.png";
    } else if (stringStyle == "BE_CHU_T") {
      iconFile = "BE_CHU_T.png";
    } else if (stringStyle == "BE_CHU_L") {
      iconFile = "BE_CHU_L.png";
    } else if (stringStyle == "BE_GANG_TRON") {
      iconFile = "BE_GANG_TRON.png";
    } else if (stringStyle == "BE_HINH_VUONG") {
      iconFile = "BE_HINH_VUONG.png";
    } else if (stringStyle == "BE_SH") {
      iconFile = "BE_SH.png";
    } else if (stringStyle == "BE_GANIVO") {
      iconFile = "BE_GANIVO.png";
    } else if (stringStyle == "BE_HH") {
      iconFile = "BE_HH.png";
    } else if (stringStyle == "BE_HM") {
      iconFile = "BE_HM.png";
    } else if (stringStyle == "BE_KHAC_TUYEN") {
      iconFile = "BE_KHAC_TUYEN.png";
    } else {
      // default
    }
    node.shape = {
      type: "Native",
      content: this.getIconSVG(iconFile)
    };
    node.style = { fill: "none", strokeWidth: 0 };
    node.height = 48;
    node.width = 48;
    return node;
  },
  getIconSVG(iconFile) {
    console.log(
      "🚀 ~ file: DiagramLib.js ~ line 251 ~ getIconSVG ~ iconFile",
      iconFile
    );
    switch (iconFile) {
      case "BTS.jpg":
      case "MSAN_RSU.jpg":
      case "MSAN_RSU_BTS.jpg":
      case "HOST.jpg":
      case "TRAM.jpg":
        return '<svg><path transform="rotate(0,128,128) translate(59,61.2230899333954) scale(4.3125,4.3125)" fill="#FFC0CB" d="M3.674,24.876C3.674,24.876 3.65,25.48 4.24,25.48 4.974,25.48 11.051,25.472 11.051,25.472L11.061,19.891C11.061,19.891,10.965,18.971,11.858,18.971L14.684,18.971C15.74,18.971,15.675,19.891,15.675,19.891L15.663,25.454C15.663,25.454 21.425,25.454 22.33,25.454 23.079,25.454 23.045,24.702 23.045,24.702L23.045,14.413 13.649,6.055 3.674,14.413C3.674,14.413,3.674,24.876,3.674,24.876z M0,13.635C0,13.635,0.847,15.196,2.694,13.635L13.732,4.297 24.081,13.577C26.219,15.119,27.02,13.577,27.02,13.577L13.732,1.54 0,13.635z M23.83,4.275L23.83,4.275 21.168,4.275 21.179,7.503 23.83,9.752z"/></svg>';
        break;
      case "SPLITTER.jpg":
      case "5":
        return '<svg><path id="SPLITTER" fill="none" stroke="green" stroke-width="5" d="M 650 150 a 75 150 0 1 0 0.211 -1.168 M 773.59 97.283 L 652.746 148.832 L 720.351 348.266 z"/></svg>';
        break;
      default:
        return '<svg><path transform="rotate(0,128,128) translate(59,61.2230899333954) scale(4.3125,4.3125)" fill="#FFC0CB" d="M3.674,24.876C3.674,24.876 3.65,25.48 4.24,25.48 4.974,25.48 11.051,25.472 11.051,25.472L11.061,19.891C11.061,19.891,10.965,18.971,11.858,18.971L14.684,18.971C15.74,18.971,15.675,19.891,15.675,19.891L15.663,25.454C15.663,25.454 21.425,25.454 22.33,25.454 23.079,25.454 23.045,24.702 23.045,24.702L23.045,14.413 13.649,6.055 3.674,14.413C3.674,14.413,3.674,24.876,3.674,24.876z M0,13.635C0,13.635,0.847,15.196,2.694,13.635L13.732,4.297 24.081,13.577C26.219,15.119,27.02,13.577,27.02,13.577L13.732,1.54 0,13.635z M23.83,4.275L23.83,4.275 21.168,4.275 21.179,7.503 23.83,9.752z"/></svg>';
    }
  },
  /**
   *
   * @param {*} id Giá trị (chuỗi) id của cổng
   * @param {*} offset Điểm của cổng trên node. Tham khảo PORT_TREN, PORT_DUOI, PORT_TRAI, PORT_PHAI. Ex: { x: 0.5, y: 1 }
   * @returns
   */
  taoPort: function(id, offset) {
    let port = {
      id: id,
      visibility: PortVisibility.Hidden
    };
    if (!(typeof offset === "undefined" || offset == null)) {
      port.offset = offset;
    }
    return port;
  },

  /**
   *
   * @param {*} id Giá trị (chuỗi) id của kết nối
   * @param {*} sourceID Giá trị (chuỗi) id của node nguồn
   * @param {*} targetID Giá trị (chuỗi) id của node đích
   * @param {*} style Đối tượng định dạng cho kết nối. Ex: { strokeWidth: 1, strokeColor: "#FF0000", fill: "#FF0000" }
   * @param {*} sourcePortID Giá trị (chuỗi) id của port trong node nguồn
   * @param {*} targetPortID Giá trị (chuỗi) id của port trong node đích
   * @param {*} annotations Đối tượng danh sách annotation của kết nối. Ex: [{ content: text, margin: { left: 25 }},]
   * @returns
   */
  taoKetNoi: function(
    id,
    sourceID,
    targetID,
    style,
    sourcePortID,
    targetPortID,
    annotations
  ) {
    let ketNoi = {
      id: id,
      sourceID: sourceID,
      targetID: targetID,
      constraints:
        ConnectorConstraints.Default &
        ~ConnectorConstraints.Drag &
        ~ConnectorConstraints.AllowDrop &
        ~ConnectorConstraints.Delete &
        ~ConnectorConstraints.DragSegmentThumb
    };
    if (!(typeof style === "undefined" || style == null)) {
      ketNoi.style = style;
    }
    if (!(typeof sourcePortID === "undefined" || sourcePortID == null)) {
      ketNoi.sourcePortID = sourcePortID;
    }
    if (!(typeof targetPortID === "undefined" || targetPortID == null)) {
      ketNoi.targetPortID = targetPortID;
    }
    if (!(typeof annotations === "undefined" || annotations == null)) {
      ketNoi.annotations = annotations;
    }
    return ketNoi;
  },

  /**
   *
   * @param {*} stringStyle Giá trị style trên DB <kieucap_id>-<nhomlc_id>-<kieudc_id>. Ex: "0-0-0-1"
   * @param {*} id Giá trị (chuỗi) id của kết nối
   * @param {*} sourceID Giá trị (chuỗi) id của node nguồn
   * @param {*} targetID Giá trị (chuỗi) id của node đích
   * @param {*} sourcePortID Giá trị (chuỗi) id của port trong node nguồn
   * @param {*} targetPortID Giá trị (chuỗi) id của port trong node đích
   * @param {*} annotations Đối tượng danh sách annotation của kết nối. Ex: [{ content: text, margin: { left: 25 }},]
   * @returns
   */
  taoKetNoiTheoStyle: function(
    stringStyle,
    id,
    sourceID,
    targetID,
    sourcePortID,
    targetPortID,
    annotations
  ) {
    let style = {
      strokeWidth: 1,
      strokeColor: "#000000",
      fill: "#000000",
      strokeDashArray: "",
      opacity: 1
    };
    let ketNoi = this.taoKetNoi(
      id,
      sourceID,
      targetID,
      style,
      sourcePortID,
      targetPortID,
      annotations
    );
    if (!(typeof stringStyle === "undefined" || stringStyle == null)) {
      let sts = stringStyle.split("-"); // <kieucap_id>-<nhomlc_id>-<kieudc_id>
      // kieucap_id
      switch (sts[0]) {
        case "0": // Cáp thuê bao
          ketNoi.style.strokeWidth = 4;
          break;
        case "1": // Cáp truyền dẫn
          ketNoi.style.strokeWidth = 6;
          break;
        default:
          // Không xác định
          ketNoi.style.strokeWidth = 2;
          break;
      }
      // nhomlc_id
      switch (sts[1]) {
        case "0": // Cáp đồng
          ketNoi.style.strokeColor = "#A52A2A";
          ketNoi.style.fill = "#A52A2A";
          break;
        case "1": // Cáp quang
          ketNoi.style.strokeColor = "#0000FF";
          ketNoi.style.fill = "#0000FF";
          break;
        default:
          // Không xác định
          ketNoi.style.strokeColor = "#000000";
          ketNoi.style.fill = "#000000";
          break;
      }
      // kieudc_id
      switch (sts[2]) {
        case "2": // Kéo cống [▬▬  ▬▬  ▬▬  ▬▬  ▬▬  ▬]
          ketNoi.style.strokeDashArray = "17";
          break;
        case "3": // Kéo treo [▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬]
          ketNoi.style.strokeDashArray = "";
          break;
        case "4": // Kéo treo        [▬ ▬ ▬ ▬ ▬ ▬ ▬ ▬ ▬ ▬ ▬]
          ketNoi.style.strokeDashArray = "10";
          break;
        case "5": // Đề xuất kéo mới [▬▬▬ ▬ ▬▬▬ ▬ ▬▬▬ ▬ ▬▬▬]
          ketNoi.style.strokeDashArray = "25";
          break;
        default:
          // Không xác định   [• • • • • • • • • • •]
          ketNoi.style.strokeDashArray = "2";
          break;
      }
      // is_midspan
      if (sts[3] == "1") {
        ketNoi.style.strokeWidth = ketNoi.style.strokeWidth / 2;
        ketNoi.style.opacity = 0.5;
      }
    }
    return ketNoi;
  }
};
