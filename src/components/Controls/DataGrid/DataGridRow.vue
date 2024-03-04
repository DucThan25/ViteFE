<template src="./DataGridRow.template.html"></template>
<script>
import DataGridCell from "./DataGridCell.vue";
export default {
  name: "DataGridRow",
  components: {
    DataGridCell,
  },
  props: {
    Columns: [],
    isSelectedRow: false,
    GroupedValue: {
      type: Object,
      default: null,
    },
    dataKeyField: String,
    showColumnCheckbox: false,
    CommandColumn: {},
    Commands: [],
    rowIndex: 0,
    cssClass: "",
    dataItem: {},
    rowCreatedEventEnabled: false,
  },
  data: function () {
    return {
      rowChecked: false,
    };
  },
  computed: {
    rowCssClass: function () {
      let css = this.cssClass;
      if (this.isSelectedRow) css += " highlight1";
      if (css == null || css == undefined) return null;
      else return css.trim();
    },
    rowDataColumns: function () {
      if (this.Columns != null) {
        if (this.GroupedValue != null) {
          return this.Columns.filter((item) => {
            return item.fieldName != this.GroupedValue.field;
          });
        }
        else
          return this.Columns;
      }
      else
        return [];
    },
    EventArgs: function () {
      return {
        rowIndex: this.rowIndex,
        rowDataItem: this.dataItem,
      };
    },
  },
  mounted() {
    if (this.rowCreatedEventEnabled) {
      this.$nextTick(function () {
        this.$emit("dataGridRowCreated", this.EventArgs);
      });
    }
  },
  updated() {
    if (this.rowCreatedEventEnabled) {
      this.$nextTick(function () {
        this.$emit("dataGridRowCreated", this.EventArgs);
      });
    }
  },
  methods: {
    dataGridCellCreated: function (e) {
      this.$emit("dataGridCellCreated", e);
    },
    rowClick: function (rowIndex, dataItem) {
      this.$emit("rowClicked", rowIndex, dataItem);
    },
    rowDoubleClick: function (rowIndex, dataItem) {
      this.$emit("rowDoubleClicked", rowIndex, dataItem);
    },
    rowCheckedChanged: function () {
      let e = this.EventArgs;
      e.checked = this.rowChecked;
      this.$emit("rowCheckedChanged", e);
    },
    command_OnClick: function (name, dataItem) {
      this.$emit("commandClicked", name, dataItem);
    },
    getCssOfDataValueType: function (typeString) {
      let cssClass = "";
      if (!(typeString == null || typeString == undefined)) {
        typeString = typeString.toString().trim();
        if (typeString == "Date") cssClass = "text-right";
        else if (typeString == "Number") cssClass = "text-right";
        else if (typeString == "String") cssClass = "text-left";
        else cssClass = "text-left";
      }
      return cssClass;
    },
    getCellCssClass: function (column) {
      let cellCssClass = column.cellCssClass;
      let dataValueCssClass = this.getCssOfDataValueType(column.DataValueType);
      if (cellCssClass == null || cellCssClass == undefined) cellCssClass = "";
      return (dataValueCssClass + " " + cellCssClass).trim();
    },
  },
};
</script>
