<template src="./index.template.html"></template>
<script>
import ClickOutside from "vue-click-outside";
const SEPARATOR = ",";
export default {
  name: "ComboboxGrid",
  props: {
    columns: {
      type: Array,
      default: [],
    },
    dataSource: {
      type: Array,
      default: [],
    },
    textField: {
      type: String,
      default: "",
    },
    valueField: {
      type: String,
      default: "",
    },
    showFilter: {
      type: Boolean,
      default: true,
    },
    gridPanelDataHeight: {
      type: String,
      default: "300px",
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    enabledSelectFirstRow: {
      type: Boolean,
      default: true,
    },
    placeHolder: {
      type: String,
      default: "",
    },
    showColumnCheckbox: {
      type: Boolean,
      default: false,
    },
    showDropArea: {
      type: Boolean,
      default: false,
    },
    defaultColumnCheckboxChecked: {
      type: Boolean,
      default: false,
    },
    allowPaging: {
      type: Boolean,
      default: false,
    },
    enablePagingServer: {
      type: Boolean,
      default: false,
    },
    value: null,
  },
  data: function () {
    return {
      selectedItems: [],
      selectedFromGridFlag: false,
      selectedFromManualFlag: false,
      expanded: false,
    };
  },
  watch: {
    dataSource: function (v) {
      if (v == undefined || v == null) {
        if (this.value != null) {
          this.selectedItems = [];
          if (this.showColumnCheckbox == true) {
            for (let i = 0; i < this.value.length; i++) {
              const item = this.value[i];
              this.selectedItems.push(
                v.find((x) => x[this.valueField] == item)
              );
            }
          } else {
            this.selectedItems.push(
              v.find((x) => x[this.valueField] == this.value)
            );
          }
        } else {
          this.selectedItems = null;
        }
      } else {
        this.$emit("input", null);
        this.selectedItems = [];
      }
    },
    value: function (v) {
      this.ValueChanged(v);
    },
    // value: function (v) {
    //   console.log(v)
    //   if (!(this.dataSource == undefined || this.dataSource == null)) {
    //     if (!this.selectedFromGridFlag) {
    //       this.selectedItems = [];
    //       if (this.showColumnCheckbox == true) {
    //         if (v != null) {
    //           if (!Array.isArray(v)) {
    //             v = [v];
    //           }
    //           for (let i = 0; i < v.length; i++) {
    //             const item = v[i];
    //             this.selectedItems.push(
    //               this.dataSource.find((x) => x[this.valueField] == item)
    //             );
    //           }
    //         }
    //         this.doSelectValues();
    //       } else {
    //         this.selectedItems.push(
    //           this.dataSource.find((x) => x[this.valueField] == v)
    //         );
    //         this.doSelectValue();
    //       }
    //     } else {
    //       this.selectedFromGridFlag = false;
    //     }
    //   } else {
    //     this.selectedItems = null;
    //   }
    // }
  },
  computed: {
    selectedItem: function () {
      if (
        !(
          this.selectedItems == null ||
          this.selectedItems == undefined ||
          this.selectedItems.length == 0
        )
      )
        return this.selectedItems[0];
      else return null;
    },
    gridColumns: function () {
      let rs = [];
      if (!(this.columns == undefined || this.columns == null)) {
        rs = this.columns;
        let ck = false;
        for (let i = 0; i < rs.length; i++) {
          let r = rs[i];
          let keys = Object.keys(r);
          keys.forEach((key) => {
            if (r[key] == this.valueField) {
              r.isPrimaryKey = true;
              ck = true;
            }
          });
          if (ck) break;
        }
        if (!ck) {
          rs.push({
            fieldName: this.valueField,
            isPrimaryKey: true,
            visible: false,
          });
        }
      }
      return rs;
    },
    valueSelected: function () {
      if (this.showColumnCheckbox == true) {
        let ids = null;
        if (this.selectedItems != null) {
          ids = [];
          for (let i = 0; i < this.selectedItems.length; i++) {
            const item = this.selectedItems[i];
            ids.push(item[this.valueField]);
          }
        }
        return ids;
      } else {
        return this.selectedItem != null
          ? this.selectedItem[this.valueField]
          : null;
      }
    },
    textSelected: function () {
      if (this.showColumnCheckbox == true) {
        let text = "";
        if (this.selectedItems != null) {
          for (let i = 0; i < this.selectedItems.length; i++) {
            const item = this.selectedItems[i];
            if (text != "") text += SEPARATOR + " ";
            text += item[this.textField];
          }
        }
        return text;
      } else {
        return this.selectedItem != null
          ? this.selectedItem[this.textField]
          : "";
      }
    },
  },
  mounted() {
    if(this.value) { //THANGDM1, bo sung de xu ly truong hop reload bang v-if gay mat select. 1 so truong hop reload du lieu khac tuong tu.
      this.ValueChanged(this.value);
      this.doSelectValue();
    }
  },
  methods: {
    ValueChanged(v) {
      if (!(this.dataSource == undefined || this.dataSource == null)) {
        if (!this.selectedFromGridFlag) {
          this.selectedItems = [];
          if (this.showColumnCheckbox == true) {
            if (v != null) {
              if (!Array.isArray(v)) {
                v = [v];
              }
              for (let i = 0; i < v.length; i++) {
                const item = v[i];
                this.selectedItems.push(
                  this.dataSource.find((x) => x[this.valueField] == item)
                );
              }
            }
            this.doSelectValues();
          } else {
            this.selectedItems.push(
              this.dataSource.find((x) => x[this.valueField] == v)
            );
            this.doSelectValue();
          }
        } else {
          this.selectedFromGridFlag = false;
        }
      } else {
        this.selectedItems = null;
      }
    },
    dataGrid_selectedRowChanged: function (args) {
      this.selectedFromGridFlag = true;
      this.selectedItems = args;
      if (this.showColumnCheckbox == true) this.doSelectValues();
      else this.doSelectValue();
    },
    doSelectValue: function () {
      if (this.selectedFromGridFlag) {
        this.$emit(
          "input",
          this.selectedItem != null ? this.selectedItem[this.valueField] : null
        );
        this.$emit("selectedChanged", this.selectedItem);
      } else {
        if(this.allowPaging){
          if(!(this.selectedItem == null || this.selectedItem == undefined)){
            let itemIndex = this.dataSource.findIndex(x => x[this.valueField] == this.selectedItem[this.valueField]);
            let pageIndex = Math.ceil((itemIndex + 1)/this.$refs.grid.pageSize);
            this.$refs.grid.$refs.pagination.gotoPage(pageIndex - 1);
          }
        }
        this.$refs.grid.selectRowByRowData(this.selectedItem);
      }
    },
    doSelectValues: function () {
      if (this.selectedFromGridFlag) {
        let v = [];
        this.selectedItems.forEach((item) => {
          v.push(item[this.valueField]);
        });
        this.$emit("input", v);
        this.$emit("selectedChanged", this.selectedItems);
      } else {
        this.$refs.grid.selectRowsByRowData(this.selectedItems);
      }
    },
    hide: function () {
      this.expanded = false;
    },
    dataGrid_rowClicked: function (args) {
      this.expanded = false;
    },
    input_Click: function (args) {
      if (this.enabled == true) this.expanded = !this.expanded;
      else this.expanded = false;
    },
    comboboxGrid_keyDown: function (args) {
      let comboboxGridKey = this.getPath(this.$refs.comboboxGrid);
      let comboboxGridInputKey = this.getPath(this.$refs.comboboxGridInput);
      let currentKey = this.getPath(args.target);
      //keyCode = SPACE
      if (args.keyCode == 32) {
        if (
          currentKey == comboboxGridKey ||
          currentKey == comboboxGridInputKey
        ) {
          if (!this.expanded) {
            this.expanded = true;
            this.$refs.grid.refreshSelected();
            args.preventDefault();
          }
        }
      }
    },
    getPath: function (args) {
      return $(args)
        .parents()
        .map(function () {
          return this.tagName;
        })
        .get()
        .join("<");
    },
  },
  directives: {
    ClickOutside,
  },
};
</script>
