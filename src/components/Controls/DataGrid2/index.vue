<template src="./index.template.html"></template>
<script>
import DataGridCell from './DataGridCell.vue'
export default {
  name: "DataGrid2",
  components: {
    DataGridCell
  },
  props: {
    columns: Array,
    dataSource: Array,
    dataKeyNames: Array,
    dataKeyField: String,
    showFilter: {
      type: Boolean,
      default: true,
    },
    showColumnCheckbox: {
      type: Boolean,
      default: false,
    },
    defaultColumnCheckboxChecked: {
      type: Boolean,
      default: false,
    },
    pageIndex: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    selectedRow: {
      type: Number,
      default: 0,
    },
    panelDataHeight: {
      type: Number,
      default: -1,
    },
    commandColumn: {
      type: Object,
      default: () => {},
    },
    commands: {
      type: Array,
      default: () => [],
    },
    allowPaging: {
      type: Boolean,
      default: true
    }
  },
  data: function () {
    return {
      currentPageSize: this.pageSize,
      currentPageIndex: this.pageIndex,
      currentSelectedRow: this.selectedRow,
      filterValues: [],
      selectedValues: [],
      selectAllItem: this.defaultColumnCheckboxChecked,
      sortingInfo: {
        fieldName: "",
        direction: "asc",
      },
    };
  },
  watch: {
    dataSource: function (newValue) {
      this.setCurrentSelectedRow(this.currentSelectedRow);
      this.selectedValues = [];
      if (this.defaultColumnCheckboxChecked) {
        if (!(this.dataSource == null || this.dataSource.length == 0)) {
          this.dataSource.forEach((dataItem) => {
            this.selectedValues.push(dataItem[this.dataKeyField]);
          });
        }
      }
    },
    selectedValues: function (newValue) {
      this.$emit("selectedItemsChanged", newValue);
    },
    selectAllItem: function (newValue) {
      this.selectedValues.splice(0);
      if (newValue) {
        this.dataItems.forEach((dataItem) => {
          this.selectedValues.push(dataItem[this.dataKeyField]);
        });
      }
    },
  },
  computed: {
    counteSelectedRows: function() {
      return this.selectedValues.length + '/' + this.dataSource.length
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
              column.DataValueType = this.getDataValueType(
                row[column.fieldName]
              );
              if (column.DataValueType == "String") break;
            }
          }
        }
      }
      return this.columns;
    },
    getCommands: function () {
      let cmds = [];
      if (!(this.commands == undefined || this.commands == null)) {
        this.commands.forEach((command) => {
          let vname = "";
          let vcssClass = "";
          let vwidth = 0;
          let vtext = "";
          if (!(command.name == undefined || command.name == null)) {
            vname = command.name;
          }
          if (!(command.cssClass == undefined || command.cssClass == null)) {
            vcssClass = "btn " + command.cssClass;
          }
          if (!(command.width == undefined || command.width == null)) {
            vwidth = command.width;
          }
          if (!(command.text == undefined || command.text == null)) {
            vtext = command.text;
          }
          cmds.push({
            name: vname,
            cssClass: vcssClass,
            width: vwidth,
            text: vtext,
          });
        });
      }
      return cmds;
    },
    getCommandColumn: function () {
      let vheaderText = "";
      let vwidth = 0;
      let vcellCssClass = "";
      let vfirstColumn = false;
      let vshow = false;
      if (!(this.commandColumn == undefined || this.commandColumn == null)) {
        if (
          !(
            this.commandColumn.headerText == undefined ||
            this.commandColumn.headerText == null
          )
        ) {
          vheaderText = this.commandColumn.headerText;
        }
        if (
          !(
            this.commandColumn.width == undefined ||
            this.commandColumn.width == null
          )
        ) {
          vwidth = this.commandColumn.width;
        }
        if (
          !(
            this.commandColumn.cellCssClass == undefined ||
            this.commandColumn.cellCssClass == null
          )
        ) {
          vcellCssClass = this.commandColumn.cellCssClass;
        }
        if (
          !(
            this.commandColumn.firstColumn == undefined ||
            this.commandColumn.firstColumn == null
          )
        ) {
          vfirstColumn = this.commandColumn.firstColumn;
        }
        if (
          !(
            this.commandColumn.show == undefined ||
            this.commandColumn.show == null
          )
        ) {
          vshow = this.commandColumn.show;
        }
      }
      return {
        headerText: vheaderText,
        width: vwidth,
        cellCssClass: vcellCssClass,
        firstColumn: vfirstColumn,
        show: vshow,
      };
    },
    panelDataStyle: function () {
      if (this.panelDataHeight > -1)
        return "height: " + this.panelDataHeight + "px";
      return null;
    },
    rowCount: function () {
      if (this.dataSourceFiltered != null)
        return this.dataSourceFiltered.length;
      return 0;
    },
    pageCount: function () {
      if (this.rowCount > 0)
        return Math.ceil(this.rowCount / this.currentPageSize);
      return 0;
    },
    pageRowCount: function () {
      if (this.dataItems != null) return this.dataItems.length;
      return 0;
    },
    dataItems: function () {
      if (this.dataSource != null)
        return this.dataSourceFiltered.slice(
          this.currentPageIndex * this.currentPageSize,
          this.currentPageIndex * this.currentPageSize + this.currentPageSize
        );
      return null;
    },
    dataSourceFiltered: function () {
      if (this.dataSource != null)
        return this.dataSource.filter(this.filterData).sort(this.sortData);
      return null;
    },
    getSelectedRow: function () {
      return this.currentSelectedRow > -1
        ? this.currentPageIndex * this.currentPageSize +
            this.currentSelectedRow +
            1
        : 0;
    },
    getGroupedColumns: function () {
      if (this.columns != null) {
        return this.columns.filter(function (column) {
          return column.isGroupedColumn;
        });
      }
      return null;
    },
    getColumnsCount: function () {
      var count = 1; //track index
      if (this.columns != null) count += this.columns.length;
      if (this.showColumnCheckbox) count += 1;
      if (this.getGroupedColumns != null)
        count = count - this.getGroupedColumns.length + 1;
      return count;
    },
    getGroupedValues: function () {
      var values = null;
      if (
        !(this.getGroupedColumns == null || this.getGroupedColumns.length == 0)
      ) {
        var values = new Array();
        this.getGroupedColumns.forEach((column) => {
          if (this.dataItems != null) {
            this.dataItems.forEach((dataItem) => {
              if (
                values.findIndex(
                  (item) =>
                    item.field == column.fieldName &&
                    item.value == dataItem[column.fieldName]
                ) < 0
              )
                values.push({
                  field: column.fieldName,
                  text: column.headerText,
                  value: dataItem[column.fieldName],
                });
            });
          }
        });
        return values;
      }
      return null;
    },
  },
  methods: {
    sortData: function (a, b) {
      if (this.sortingInfo.fieldName != "") {
        let field = this.sortingInfo.fieldName;
        // if (this.sortingInfo.direction == "asc")
        //   return a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0;
        // else return a[field] < b[field] ? 1 : a[field] > b[field] ? -1 : 0;
        if (this.sortingInfo.direction == "asc")
          return a[field] < b[field] ? -1 : 1;
        else return a[field] < b[field] ? 1 : -1;
      }
      return 0;
    },
    filterData: function (dataItem) {
      let result = true;
      this.columns.forEach((column) => {
        if (column.allowFiltering) {
          if (this.filterValues[column.fieldName] != null) {
            if (result) {
              if (dataItem[column.fieldName] != null)
                result = dataItem[column.fieldName]
                  .toString()
                  .toLowerCase()
                  .includes(this.filterValues[column.fieldName].trim().toLowerCase());
              else {
                if (this.filterValues[column.fieldName].toString().trim() == "")
                  result = true;
                else result = false;
              }
            }
          }

          // if(dataItem[column.fieldName] != null)
          //   {
          //       if(this.filterValues[column.fieldName] != null)
          //           if(result)
          //               result = dataItem[column.fieldName].toString().toLowerCase().includes(this.filterValues[column.fieldName].toLowerCase());
          //   }
        }
      });
      return result;
    },
    filterChange: function () {
      if (this.currentSelectedRow > -1) this.setCurrentSelectedRow(-1);

      if (this.currentPageIndex > this.pageCount - 1)
        this.currentPageIndex =
          this.pageCount - 1 >= 0 ? this.pageCount - 1 : 0;
    },
    rowClick: function (rowIndex, dataItem) {
      // this.numClicks++;
      // if (this.numClicks === 1) {
      //   // the first click in .2s
      //   var self = this;
      //   setTimeout(function () {
      //     if(self.numClicks == 1){
      //       self.$emit("rowClicked", rowIndex, dataItem);
      //     }
      //     else{
      //       self.$emit("rowDoubleClicked", rowIndex, dataItem);
      //     }
      //     self.numClicks = 0; // reset the first click
      //   }, 200); // wait 0.2s
      // }
      this.setCurrentSelectedRow(rowIndex);
      this.$emit("rowClicked", rowIndex, dataItem);
    },
    rowDoubleClick: function (rowIndex, dataItem) {
      this.$emit("rowDoubleClicked", rowIndex, dataItem);
    },
    doSelectNearby: function (next) {
      this.setCurrentSelectedRow(
        next ? this.currentSelectedRow + 1 : this.currentSelectedRow - 1
      );
    },
    getCurrentSelectedRow: function () {
      return this.currentSelectedRow;
    },
    setCurrentSelectedRow: function (value) {
      if (this.currentSelectedRow == value) {
        if (value > this.pageRowCount - 1) value = this.pageRowCount - 1;
      } else {
        if (value > this.pageRowCount - 1 || value < 0) {
          if (this.currentSelectedRow == -1) {
            if (value > this.currentSelectedRow) value = 0;
            else value = this.pageRowCount - 1;
          } else value = -1;
        }
      }
      this.currentSelectedRow = value;
      this.$emit(
        "selectedRowChanged",
        !(this.dataItems == null || this.dataItems.length == 0)
          ? this.currentSelectedRow > -1
            ? this.dataItems[this.currentSelectedRow]
            : null
          : null
      );
    },
    setPageSize: function (value) {
      this.currentPageSize = value;
      if (this.currentSelectedRow > -1)
        this.setCurrentSelectedRow(this.currentSelectedRow);
    },
    nextPage: function () {
      this.currentPageIndex += 1;
      if (this.currentSelectedRow > -1)
        this.setCurrentSelectedRow(this.currentSelectedRow);
    },
    lastPage: function () {
      this.currentPageIndex = this.pageCount - 1;
      if (this.currentSelectedRow > -1)
        this.setCurrentSelectedRow(this.currentSelectedRow);
    },
    previousPage: function () {
      this.currentPageIndex -= 1;
      if (this.currentSelectedRow > -1)
        this.setCurrentSelectedRow(this.currentSelectedRow);
    },
    firstPage: function () {
      this.currentPageIndex = 0;
      if (this.currentSelectedRow > -1)
        this.setCurrentSelectedRow(this.currentSelectedRow);
    },
    doSelectItem: function (dataItem) {
      this.selectedValues.push(dataItem[this.dataKeyField]);
    },
    showSelectColumn: function () {
      let rs = false;
      if (this.showColumnCheckbox) rs = true;
      else {
        if (
          !(this.getGroupedValues == null || this.getGroupedValues.length == 0)
        )
          rs = true;
      }
      return rs;
    },
    selectColumnColumnSpan: function () {
      let rs = 0;
      if (this.getCommandColumn.show) rs += 1;
      if (this.showColumnCheckbox) rs += 1;
      else {
        if (
          !(this.getGroupedValues == null || this.getGroupedValues.length == 0)
        )
          rs += 1;
      }
      return rs;
    },
    command_OnClick: function (name, dataItem) {
      this.$emit("commandClicked", name, dataItem);
    },
    columnButtonSort_Click: function (fieldName, event) {
      let button = $(event.target);
      button
        .parents("tr")
        .find("th div.cell-header .btn-sort")
        .attr("class", "btn-sort fa fa-sort");
      if (this.sortingInfo.fieldName == fieldName) {
        if (this.sortingInfo.direction == "asc")
          this.sortingInfo.direction = "desc";
        else this.sortingInfo.direction = "asc";
      } else {
        this.sortingInfo.fieldName = fieldName;
        this.sortingInfo.direction = "asc";
      }
      button.attr(
        "class",
        "btn-sort btn-sorted fa fa-caret-" +
          (this.sortingInfo.direction == "asc" ? "up" : "down")
      );
    },
    getDataValueType: function (value) {
      let type = "String";
      if (!(value == null || value == undefined)) {
        value = value.toString().trim();
        let regExDate = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
        let regExDateTime = /^\d{1,2}\/\d{1,2}\/\d{4}\s\d{1,2}:\d{1,2}$/;
        var regNumber = /^(?!0\d)\d*(\.\d+)?$/;
        if (value.toString().match(regExDate) || value.toString().match(regExDateTime)) type = "Date";
        else if (
          value.toString().match(regNumber) ||
          (typeof value === "number" && isFinite(value))
        )
          type = "Number";
        else type = "String";
      }
      return type;
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
    dataGridCellCreated: function(e){
      this.$emit("dataGridCellCreated", e);
      // $(e.cellElement).addClass("blue");
      // // console.log("dataGridCellCreated");
      //console.log(e);
    },
    sumField: function(field,total) {
      if (total) {
        return this.dataItems.length
      }
      return this.dataItems.reduce( function(a, b){
      const first = parseInt(a);
      const second = parseInt(b[field]);
        return first + second;
      //  return a + b[field];
    }, 0);
    }
  },
};
</script>
