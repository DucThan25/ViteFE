<template src="./index.template.html"></template>
<script>
import Pagination from "../Pagination";
import {
  Sort,
  Filter,
  Resize,
  Page,
  Group,
  Freeze,
} from "@syncfusion/ej2-vue-grids";
export default {
  name: "DataGridExt",
  components: {
    Pagination,
  },
  provide: {
    grid: [Sort, Filter, Resize, Page, Group, Freeze],
  },
  props: {
    columns: {
      type: Array,
      default: [],
    },
    dataSource: {
      type: Array,
      default: [],
    },
    showFilter: {
      type: Boolean,
      default: true,
    },
    showColumnCheckbox: {
      type: Boolean,
      default: true,
    },
    totalRecords: {
      type: Number,
      default: 1,
    },
    allowPaging: {
      type: Boolean,
      default: true,
    },
    enablePagingServer: {
      type: Boolean,
      default: true,
    },
    pageIndex: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    panelDataHeight: {
      type: String,
      default: "500px",
    },
    dataKeyField: {
      type: String,
      default: "",
    },
  },
  data: function () {
    return {
      pageSizeData: this.pageSize,
      pageIndexData: this.pageIndex,
    };
  },
  watch: {},
  created: function () {},
  computed: {
    hasFreezeLeft: function () {
      if (this.columns != null) {
        for (let i = 0; i < this.columns.length; i++) {
          let f = this.getColumnFreeze(this.columns[i]);
          if (f != null) {
            if (f.toLowerCase() == "left") return true;
          }
        }
      }
      return false;
    },
    selectionOptions: function () {
      return {
        type: this.showColumnCheckbox ? "Multiple" : "Single",
      };
    },
    dataItems: function () {
      let result = [];
      if (this.dataSource != null) {
        if (this.allowPaging) {
          if (this.enablePagingServer) {
            result = this.dataSource.slice(0, 999999);
          } else {
            result = this.dataSource.slice(
              this.pageIndexData * this.pageSizeData,
              this.pageIndexData * this.pageSizeData + this.pageSizeData
            );
          }
        } else result = this.dataSource;
      }
      return result;
    },
    getTotalRecords: function () {
      let result = 0;
      if (this.allowPaging) {
        if (this.enablePagingServer) result = this.totalRecords;
        else result = this.dataSource == null ? 0 : this.dataSource.length;
      }
      return result;
    },
    getColumns: function () {
      if (this.columns != null) {
        for (let i = 0; i < this.columns.length; i++) {
          const column = this.columns[i];
          column.DataValueType = "";
          let dataRows = this.dataItems;
          if (dataRows != null) {
            for (let j = 0; j < dataRows.length; j++) {
              const row = dataRows[j];
              if (
                !(
                  row[column.fieldName] == undefined ||
                  row[column.fieldName] == null ||
                  row[column.fieldName] == ""
                )
              ) {
                column.DataValueType = this.getDataValueType(
                  row[column.fieldName]
                );
              }
              if (column.DataValueType == "String") break;
            }
          }
        }
      }
      return this.columns;
    },
    allowGrouping: function () {
      let groupedColumnFields = this.getGroupedColumnFields();
      if (groupedColumnFields != null) {
        return groupedColumnFields.length > 0;
      } else return false;
    },
    groupSettings: function () {
      return {
        columns: this.getGroupedColumnFields(),
        showDropArea: false,
      };
    },
    gridCssClass: function () {
      let result = "grid-ext";
      if (!this.hasData) {
        result += " grid-ext-nodata";
      }
      return result;
    },
    hasData: function () {
      return !(this.dataItems == null || this.dataItems.length == 0);
    },
    grid: function () {
      return this.$refs.grid;
    },
  },
  methods: {
    getGroupedColumns: function () {
      if (this.columns != null) {
        return this.columns.filter(function (column) {
          return column.isGroupedColumn;
        });
      }
      return null;
    },
    getGroupedColumnFields: function () {
      let result = [];
      let groupedColumns = this.getGroupedColumns();
      if (!(groupedColumns == null || groupedColumns.length == 0)) {
        for (let i = 0; i < groupedColumns.length; i++) {
          const groupedColumn = groupedColumns[i];
          result.push(groupedColumn.fieldName);
        }
      }
      return result;
    },
    getDataValueType: function (value) {
      let type = "String";
      if (!(value == null || value == undefined)) {
        value = value.toString().trim();
        let regExDate = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
        let regExDateTime = /^\d{1,2}\/\d{1,2}\/\d{4}\s\d{1,2}:\d{1,2}$/;
        let regNumber = /^[-+]?(?!0\d)\d*(\.\d+)?$/;
        if (
          value.toString().match(regExDate) ||
          value.toString().match(regExDateTime)
        )
          type = "Date";
        else if (
          value.toString().match(regNumber) ||
          (typeof value === "number" && isFinite(value))
        )
          type = "Number";
        else type = "String";
      }
      return type;
    },
    getColumnTextAlign: function (column) {
      if (column.DataValueType == "Date" || column.DataValueType == "Number")
        return "right";
      return "";
    },
    getColumnFreeze: function (column) {
      if (!(column.freeze == null || column.freeze == undefined))
        return column.freeze;
      return null;
    },
    getSelectedValues: function (selectedRecords) {
      let result = [];
      if (selectedRecords != null) {
        for (let i = 0; i < selectedRecords.length; i++) {
          const item = selectedRecords[i];
          if (this.dataKeyField.trim() != "")
            result.push(item[this.dataKeyField.trim()]);
          else result.push(item);
        }
      }
      return result;
    },
    getSelectedRecords: function () {
      return this.grid.getSelectedRecords();
    },
    pagination_PageChanged: function (args) {
      this.pageSizeData = args.pageSize;
      this.pageIndexData = args.pageIndex;
      this.$emit("pageChanged", args);
    },
    grid_RowDeselecting: function (args) {
      if (this.grid.getSelectedRows().length == 1) args.cancel = true;
    },
    grid_RecordClick: function (args) {
      this.$emit("rowClicked", args.rowIndex, args.rowData);
    },
    grid_RecordDoubleClick: function (args) {
      this.$emit("rowDoubleClicked", args.rowIndex, args.rowData);
    },
    grid_RowSelected: function (args) {
      let records = this.getSelectedRecords();
      this.$emit("selectedItemsChanged", this.getSelectedValues(records));
      this.$emit("selectedRowChanged", records.length > 0 ? records[0] : null);
    },
  },
};
</script>
