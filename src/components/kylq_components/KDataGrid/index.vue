<template src="./index.template.html"></template>
<script>
import Pagination from "../Pagination";
import FilterTemplate from "./FilterTemplate";
/**
 * @summary: Control dùng chung trên site, cá nhân vui lòng không update ở đây để tránh ảnh hưởng chung đến control.
 * @author: IT3.Web2
 */
import {
  Sort,
  Filter,
  Resize,
  Group,
  Freeze,
  CommandColumn,
  ExcelExport,
  Edit,
  Aggregate,
  ContextMenu,
  DetailRow,
} from "@syncfusion/ej2-vue-grids";
import { L10n } from "@syncfusion/ej2-base";
const GRID_CMDS_DEFAULT_PREFIX = "btn-grid-cmds-default-";
L10n.load({
  "vi-VN": {
    grid: {
      EmptyRecord: "Không có bản ghi nào để hiển thị",
      Item: "Bản ghi",
      Items: "Bản ghi",
      FilterbarTitle: "",
      GroupDropArea: "Kéo thả tên cột lên vùng này để nhóm dữ liệu",
    },
  },
});
export default {
  name: "KDataGrid",
  components: {
    Pagination,
  },
  provide: {
    grid: [
      Sort,
      Filter,
      Resize,
      Group,
      Freeze,
      CommandColumn,
      ExcelExport,
      Edit,
      Aggregate,
      ContextMenu,
      DetailRow,
    ],
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
      default: false,
    },
    columnCheckboxFreeze: {
      type: Boolean,
      default: false,
    },
    allowSorting: {
      type: Boolean,
      default: true,
    },
    totalRecords: {
      type: Number,
      default: 0,
    },
    allowPaging: {
      type: Boolean,
      default: false,
    },
    enablePagingServer: {
      type: Boolean,
      default: true,
    },
    pageIndex: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    panelDataHeight: {
      type: String,
      default: "auto",
    },
    dataKeyField: {
      type: String,
      default: "",
    },
    commandColumn: {
      type: Object,
      default: () => {},
    },
    commands: {
      type: Array,
      default: () => [],
    },
    defaultColumnCheckboxChecked: {
      type: Boolean,
      default: false,
    },
    allowExcelExport: {
      type: Boolean,
      default: false,
    },
    allowResizing: {
      type: Boolean,
      default: true,
    },
    width: {
      type: String,
      default: "auto",
    },
    allowTextWrap: {
      type: Boolean,
      default: false,
    },
    selectionSettings: {
      type: Object,
      default: () => {},
    },
    enabledSelectFirstRow: {
      type: Boolean,
      default: true,
    },
    childGrid: {
      type: Object,
      default: () => {},
    },
    editSettings: {
      type: Object,
      default: () => {},
    },
    aggregates: {
      type: Array,
      default: () => [],
    },
    visibleHeader: {
      type: Boolean,
      default: true,
    },
    contextMenuItems: {
      type: Array,
      default: null,
    },
    showDropArea: {
      type: Boolean,
      default: false,
    },
    paginationCommands: {
      type: Array,
      default: () => [],
    }
  },
  data: function () {
    return {
      pageSizeData: this.pageSize,
      pageIndexData: this.pageIndex,
      filteredRecords: -1,
      flagSelectedRowIndexes: [],
      flagBeginFilter: false,
      gridGroupSettings: {
        columns: [],
      },
      columnFilterTemplate: function (e) {
        return {
          template: FilterTemplate,
        };
      },
      filterConditions: [],
      currentFilter: {},
      currentRowSelected:null
    };
  },
  computed: {
    getColumnCheckboxFreeze: function () {
      return this.hasFreezeLeft || this.columnCheckboxFreeze ? "Left" : null;
    },
    filteredDataSource: function () {
      let result = this.dataSource;
      if (result != null) {
        if (
          !(this.filterConditions == null || this.filterConditions.length == 0)
        ) {
          this.filterConditions.forEach((filterCondition) => {
            result = result.filter((x) =>
              x[filterCondition.fieldName] == null ||
              x[filterCondition.fieldName] == undefined
                ? false
                : filterCondition.value == null ||
                  filterCondition.value == undefined
                ? true
                : x[filterCondition.fieldName]
                    .toString()
                    .toLowerCase()
                    .includes(filterCondition.value.toString().toLowerCase())
            );
          });
        }
      }
      return result;
    },
    getHeight: function () {
      let result = this.panelDataHeight;
      if (result == "auto") {
        if (this.allowPaging) {
          if (this.pageSize > 20) result = "500px";
        } else {
          if (this.dataItemsCount > 20) result = "500px";
        }
      }
      return result;
    },
    hasFreezeLeft: function () {
      let freeze = this.getGridFreeze();
      if (freeze != null) return freeze.toLowerCase() == "left";
      else return false;
    },
    hasFreeze: function () {
      let rs = false;
      let freeze = this.getGridFreeze();
      if (freeze != null) {
        rs = true;
      } else {
        rs = this.columnCheckboxFreeze;
        if (rs == false) {
          if (
            !(this.commandColumn == undefined || this.commandColumn == null)
          ) {
            rs = this.commandColumn.freeze == true;
          }
        }
      }
      return rs;
    },
    selectionOptions: function () {
      let result = this.selectionSettings;
      if (result == undefined || result == null) result = {};
      if (this.showColumnCheckbox) {
        result.type = "Multiple";
        result.enableToggle = false;
      } else {
        if (result.type == undefined) result.type = "Single";
        if (result.enableToggle == undefined) result.enableToggle = false;
      }
      return result;
    },
    isSelectionMultiple: function () {
      return this.selectionOptions.type == "Multiple";
    },
    dataItemsCount: function () {
      return this.dataItems.length;
    },
    dataItems: function () {
      let result = [];
      if (this.filteredDataSource != null) {
        if (this.allowPaging) {
          if (this.enablePagingServer) {
            result = this.filteredDataSource;
          } else {
            result = this.filteredDataSource.slice(
              this.pageIndexData * this.pageSizeData,
              this.pageIndexData * this.pageSizeData + this.pageSizeData
            );
          }
        } else result = this.filteredDataSource;
      }
      return result;
    },
    getTotalRecords: function () {
      let result = 0;
      if (this.allowPaging) {
        if (this.enablePagingServer) result = this.totalRecords;
        else
          result =
            this.filteredDataSource == null
              ? 0
              : this.filteredDataSource.length;
      }
      return result;
    },
    getColumns: function () {
      let allColumns = [];
      if (this.columns != null) {
        for (let i = 0; i < this.columns.length; i++) {
          let column = {
            fieldName: this.columns[i].fieldName,
            headerText: this.columns[i].headerText,
            width: this.columns[i].width,
            allowFiltering: this.columns[i].allowFiltering,
            textAlign: this.getColumnTextAlign(this.columns[i]),
            freeze: this.getColumnFreeze(this.columns[i]),
            commands: this.columns[i].commands,
            columnType: this.getGridColumnType(this.columns[i]),
            columnFormat: this.getGridColumnFormat(this.columns[i]),
            filterTemplate: this.getFilterTemplate(this.columns[i]),
            visible: this.getColumnVisible(this.columns[i]),
            disableHtmlEncode: this.getDisableHtmlEncode(this.columns[i]),
            clipMode: this.columns[i].clipMode,
            customAttributes: this.getColumnCustomAttributes(this.columns[i]),
            template: this.columns[i].template,
            isPrimaryKey: this.columns[i].isPrimaryKey,
            headerTemplate: this.columns[i].headerTemplate,
            columns:
              this.columns[i].columns == undefined
                ? null
                : this.columns[i].columns,
            minWidth: this.columns[i].minWidth,
            allowEditing: this.columns[i].allowEditing === true,
            validationRules: this.columns[i].validationRules === undefined ? null : this.columns[i].validationRules,
          };
          allColumns.push(column);
        }
      }
      if (!(this.commandColumn == undefined || this.commandColumn == null)) {
        if (this.commandColumn.show == true) {
          let cmds = this.getColumnCommands();
          if (cmds.length > 0) {
            let column = {
              //fieldName: '',
              headerText: this.commandColumn.headerText,
              allowFiltering: false,
              width: this.commandColumn.width,
              commands: cmds,
              columnType: null,
              textAlign: "Center",
              filterTemplate: "<span></span>",
              clipMode: "Ellipsis",
              customAttributes: { class: "column-cmd-ext" },
            };
            if (this.commandColumn.firstColumn == true) {
              if (this.commandColumn.freeze == true) column.freeze = "Left";
              allColumns.splice(0, 0, column);
            } else {
              if (this.commandColumn.freeze == true) column.freeze = "Right";
              allColumns.push(column);
            }
          }
        }
      }
      return allColumns;
    },
    getAggregateColumns: function () {
      let allColumns = [];
      if (this.useAggregates) {
        for (let i = 0; i < this.aggregates.length; i++) {
          let column = {
            field: this.aggregates[i].field,
            type: this.aggregates[i].type,
            format: this.aggregates[i].format,
            footerTemplate: this.aggregates[i].footerTemplate,
            customAggregateFn: this.aggregates[i].customAggregateFn,
          };
          allColumns.push(column);
        }
      }
      return allColumns;
    },
    allowGrouping: function () {
      if (this.showDropArea == true) {
        return true;
      } else {
        let groupedColumnFields = this.getGroupedColumnFields();
        if (groupedColumnFields != null) {
          return groupedColumnFields.length > 0;
        } else return false;
      }
    },
    groupSettings: function () {
      this.gridGroupSettings.showDropArea = this.showDropArea;
      if (this.gridGroupSettings.columns.length == 0) {
        this.gridGroupSettings.columns = this.getGroupedColumnFields();
        if (this.gridGroupSettings.columns.length > 0) {
          this.gridGroupSettings.captionTemplate =
            this.getGroupedCaptionTemplate();
        }
      }
      //captionTemplate: '${headerText}: ${key} (${count})'
      return this.gridGroupSettings;
    },
    gridCssClass: function () {
      let result = "grid-ext";
      if (!this.hasData) {
        result += " grid-ext-nodata";
      }
      if (this.hasFreeze) {
        result += " grid-ext-freeze";
      }
      if (this.allowGrouping) {
        result += " grid-ext-grouping";
      }
      return result;
    },
    hasData: function () {
      // if (this.filteredRecords == -1)
      //   return !(this.dataItems == null || this.dataItems.length == 0);
      // else {
      //   return this.filteredRecords > 0;
      // }
      return !(this.dataItems == null || this.dataItems.length == 0);
    },
    grid: function () {
      return this.$refs.grid;
    },
    useAggregates: function () {
      return !(
        this.aggregates == undefined ||
        this.aggregates == null ||
        this.aggregates.length == 0
      );
    },
    panelEmptyRecordsStyles: function () {
      let rs = "";
      if (this.panelDataHeight != "auto") {
        rs = "height: " + this.panelDataHeight;
        if (!rs.endsWith("px")) {
          rs += "px";
        }
        rs += ";";
      }
      return rs;
    },
  },
  methods: {
    reloadCurrentPage: function () {
      this.$refs.pagination.reloadCurrentPage();
    },
    getGridColumnFormat: function (column) {
      if (!this.checkIsNull(column.format)) return column.format;
      else return undefined;
    },
    getGridColumnType: function (column) {
      let result = "";
      if (this.checkIsNull(column.template)) {
        if (!this.checkIsNull(column.type)) {
          result = column.type;
        } else {
          result = "string";
        }
      }
      return result;
    },
    getFilterTemplate: function (column) {
      if (
        !(
          column.commands == null ||
          column.commands == undefined ||
          column.commands.length == 0
        ) ||
        column.allowFiltering === false
      ) {
        return "<span></span>";
      } else return this.columnFilterTemplate;
    },
    getDisableHtmlEncode: function (column) {
      let allowHtml = column.allowHtml;
      if (!(allowHtml == null || allowHtml == undefined)) {
        return allowHtml === false;
      } else return column.disableHtmlEncode === false ? false : true;
    },
    getColumnCustomAttributes: function (column) {
      let customAttributes = column.customAttributes;
      let css = column.cssClass;
      if (!(css == null || css == undefined || css == "")) {
        if (customAttributes == null || customAttributes == undefined)
          customAttributes = {};
        if (
          !(
            customAttributes.class == null ||
            customAttributes.class == undefined
          )
        )
          customAttributes.class = " " + css;
        else customAttributes.class = css;
      }
      return customAttributes;
    },
    getColumnVisible: function (column) {
      if (column.isGroupedColumn === true) {
        return false;
      } else return column.visible;
    },
    getColumnCommands: function () {
      let cmds = [];
      if (!(this.commands == null || this.commands.length == 0)) {
        for (let i = 0; i < this.commands.length; i++) {
          if (this.commands[i].visible != false) {
            let cssClass = GRID_CMDS_DEFAULT_PREFIX + this.commands[i].name;
            if (
              !(
                this.commands[i].cssClass == undefined ||
                this.commands[i].cssClass == ""
              )
            )
              cssClass += " " + this.commands[i].cssClass;
            let text = " ";
            if (
              !(
                this.commands[i].text == undefined ||
                this.commands[i].text == ""
              )
            )
              text = this.commands[i].text;
            let cmd = {
              title: this.commands[i].title,
              buttonOption: {
                content: text,
                cssClass: cssClass,
              },
            };
            cmds.push(cmd);
          }
        }
      }
      return cmds;
    },
    getGroupedCaptionTemplate: function () {
      let rs = null;
      let cs = this.getGroupedColumns();
      if (cs != null) {
        for (let i = 0; i < cs.length; i++) {
          const c = cs[i];
          if (
            this.checkIsNull(c.headerText) ||
            c.headerText.toString().trim() == ""
          ) {
            rs = "${key} - ${count} Bản ghi";
            break;
          } else {
            rs = c.captionTemplate;
          }
        }
      }
      return rs;
    },
    getGroupedColumns: function () {
      if (this.columns != null) {
        return this.columns.filter(function (column) {
          return column.isGroupedColumn === true;
        });
      }
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
        if (value.match(regExDate) || value.match(regExDateTime)) type = "Date";
        else if (
          value.match(regNumber) ||
          (typeof value === "number" && isFinite(value))
        )
          type = "Number";
        else type = "String";
      }
      return type;
    },
    getColumnType: function (column) {
      let columnType = "";
      if (this.dataItems != null) {
        for (let i = 0; i < this.dataItems.length; i++) {
          const row = this.dataItems[i];
          if (
            !(
              row[column.fieldName] == undefined ||
              row[column.fieldName] == null ||
              row[column.fieldName] === ""
            )
          ) {
            columnType = this.getDataValueType(row[column.fieldName]);
          }
          if (columnType == "String") break;
        }
      }
      return columnType;
    },
    getColumnTextAlign: function (column) {
      if (column.textAlign == undefined || column.textAlign == null) {
        let dataValueType = this.getColumnType(column);
        if (dataValueType == "Date" || dataValueType == "Number")
          return "right";
        return "";
      } else return column.textAlign;
    },
    getGridFreeze: function () {
      let result = null;
      if (this.columns != null) {
        for (let i = 0; i < this.columns.length; i++) {
          result = this.getColumnFreeze(this.columns[i]);
          if (result != null) {
            break;
          }
        }
      }
      return result;
    },
    getColumnFreeze: function (column) {
      let result = null;
      if (!(column.freeze == null || column.freeze == undefined)) {
        result = column.freeze.toLowerCase();
        return result[0].toUpperCase() + result.slice(1);
      }
      return result;
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
    getCellCreatedArgs: function (
      fieldName,
      cssClass,
      cellAllowHtml,
      text,
      cellElement,
      column,
      dataItem
    ) {
      return {
        cellFieldName: fieldName,
        cellCssClass: cssClass,
        cellAllowHtml: cellAllowHtml,
        cellText: text,
        cellElement: cellElement,
        cellColumn: column,
        cellDataItem: dataItem,
      };
    },
    excelExport: function (
      excelExportProperties,
      isMultipleExport,
      workbook,
      isBlob
    ) {
      this.grid.excelExport(
        excelExportProperties,
        isMultipleExport,
        workbook,
        isBlob
      );
    },
    setCurrentSelectedRow: function (value) {
      if (this.grid.getRows().length > 0) this.grid.selectRow(value);
      else {
        this.flagSelectedRowIndexes = [];
        this.flagSelectedRowIndexes.push(value);
      }
    },
    pagination_PageChanged: function (args) {
      this.pageSizeData = args.pageSize;
      this.pageIndexData = args.pageIndex;
      this.$emit("pageChanged", args);
    },
    grid_RecordClick: function (args) {
      this.$emit("rowClicked", args.rowIndex, args.rowData);
      this.$emit("recordClick", args);

      if(this.currentRowSelected&&args.rowData==this.currentRowSelected){
        this.currentRowSelected=args.rowData
        this.$emit("onRowSelected", this.currentRowSelected);
      }
    },
    grid_RecordDoubleClick: function (args) {
      this.$emit("rowDoubleClicked", args.rowIndex, args.rowData);
      this.$emit("recordDoubleClick", args);
    },
    grid_RowSelected: function (args) {
      let records = this.getSelectedRecords();
      this.$emit("selectedItemsChanged", this.getSelectedValues(records));
      this.$emit("selectedRowChanged", records.length > 0 ? records[0] : null);
      this.$emit("rowSelected", args);
      if(this.currentRowSelected==null||args.data!=this.currentRowSelected){
        this.currentRowSelected=args.data
        this.$emit("onRowSelected", this.currentRowSelected);
      }
    },
    grid_RowDeselected: function (args) {
      let records = this.getSelectedRecords();
      if (this.grid.selectionSettings.type == "Multiple") {
        this.$emit("selectedItemsChanged", this.getSelectedValues(records));
        //this.$emit("selectedRowChanged", records.length > 0 ? records[0] : null);
      }
      this.$emit("rowDeselected", args);
    },
    grid_ActionBegin: function (args) {
      //if (args.action == "filter" || args.action == "clearFilter") {
      // if(args.requestType == "filtering") {
      //   this.flagBeginFilter = true;
      // }
      this.$emit("actionBegin", args);
    },
    grid_ActionComplete: function (args) {
      if (args.action == "filter" || args.action == "clearFilter") {
        this.flagBeginFilter = false;
        if (args.action == "filter")
          this.filteredRecords = this.grid.getFilteredRecords().length;
        else this.filteredRecords = -1;
      } else {
        this.filteredRecords = -1;
      }
      this.$emit("actionComplete", args);
    },
    grid_DataBound: function (args) {
      if (this.grid.ej2Instances.focusModule) {
        this.grid.ej2Instances.focusModule.destroy();
      }
      if (!this.flagBeginFilter) {
        if (this.defaultColumnCheckboxChecked == true) {
          this.flagSelectedRowIndexes = [];
          let rows = this.grid.getRows();
          for (let i = 0; i < rows.length; i++) {
            const row = this.grid.getRowInfo(rows[i]);
            this.flagSelectedRowIndexes.push(row.rowIndex);
          }
        }
        if (this.flagSelectedRowIndexes.length > 0) {
          this.grid.selectRows(this.flagSelectedRowIndexes);
          this.flagSelectedRowIndexes = [];
        } else {
          if (this.enabledSelectFirstRow) {
            this.grid.selectRow(0);
          }
        }
      }
      let cols = this.columns.filter((x) => x.cellCreatedEventEnabled === true);
      if (!(cols == undefined || cols == null || cols.length == 0)) {
        let gridColumns = [];
        for (let i = 0; i < cols.length; i++) {
          const col = cols[i];
          gridColumns.push(this.grid.getColumnByField(col.fieldName));
        }
        if (gridColumns.length > 0) {
          let rows = this.grid.getRows();
          for (let i = 0; i < rows.length; i++) {
            const row = this.grid.getRowInfo(rows[i]);
            for (let j = 0; j < gridColumns.length; j++) {
              const gridColumn = gridColumns[j];
              if (
                !(
                  gridColumn.field == undefined ||
                  gridColumn.field == null ||
                  gridColumn.field == ""
                )
              ) {
                let cell = this.grid.getCellFromIndex(
                  row.rowIndex,
                  gridColumn.index
                );
                let cssClass = "";
                let text = "";
                let cellItem = $(cell);
                if (
                  !(
                    cellItem == undefined ||
                    cellItem == null ||
                    cellItem.length == 0
                  )
                ) {
                  cssClass = cellItem[0].className;
                  text = cellItem[0].outerText;
                }
                let arg = this.getCellCreatedArgs(
                  gridColumn.field,
                  cssClass,
                  gridColumn.disableHtmlEncode == false,
                  text,
                  cell,
                  gridColumn,
                  row.rowData
                );
                this.$emit("dataGridCellCreated", arg);
              }
            }
          }
        }
      }
      if (!this.visibleHeader) {
        $(this.grid.getHeaderContent())
          .find(".e-headercontent tr.e-columnheader")
          .addClass("e-hide");
      }
      this.$emit("dataBound", args);
    },
    grid_CommandClick: function (args) {
      if (args.target.classList.length > 0) {
        let cmdName = "";
        for (let i = 0; i < args.target.classList.length; i++) {
          const classItem = args.target.classList[i];
          if (classItem.startsWith(GRID_CMDS_DEFAULT_PREFIX)) {
            cmdName = classItem.replace(GRID_CMDS_DEFAULT_PREFIX, "");
            break;
          }
        }
        if (cmdName != "") {
          this.$emit("commandClicked", cmdName, args.rowData);
        }
      }
      this.$emit("commandClick", args);
    },
    grid_RowDataBound: function (args) {
      this.$emit("rowDataBound", args);
    },
    grid_QueryCellInfo: function (args) {
      this.$emit("queryCellInfo", args);
    },
    grid_created: function (args) {
      this.$emit("created", args);
    },
    grid_load: function (args) {
      this.$emit("load", args);
    },
    grid_cellSelected: function (args) {
      this.$emit("cellSelected", args);
    },
    grid_cellSaved: function (args) {
      this.$emit("cellSaved", args);
    },
    batchUpdate: function (changes) {
      this.grid.batchUpdate(changes);
    },
    getBatchChanges: function () {
      return this.grid.getBatchChanges();
    },
    checkIsNull: function (value) {
      return value == undefined || value == null;
    },
    getModuleName: function () {
      if (!(this.$route.matched == null || this.$route.matched.length == 0))
        return this.$route.matched[0].name;
      else return "ecms";
    },
    grid_contextMenuClick: function (args) {
      this.$emit("contextMenuClick", args);
    },
    grid_detailDataBound: function (args) {
      this.$emit("detailDataBound", args);
    },
    grid_rowDataBound: function (args) {
      this.$emit("rowDataBound", args);
    },
    refreshSelected: function () {
      let ids = this.grid.getSelectedRowIndexes();
      this.grid.clearRowSelection();
      if (this.isSelectionMultiple) this.grid.selectRows(ids);
      else {
        this.grid.selectRow(ids.length > 0 ? ids[0] : 0);
      }
    },
    refresh: function () {
      this.grid.refresh();
    },
    getRowIndexByRowData: function (value) {
      return this.grid.getRowIndexByPrimaryKey(value);
    },
    selectRow: function (index, isToggle) {
      this.grid.selectRow(index, isToggle);
    },
    selectRows: function (rowIndexes) {
      this.grid.selectRows(rowIndexes);
    },
    selectRowByRowData: function (value) {
      let i = this.getRowIndexByRowData(value);
      this.selectRow(i);
    },
    selectRowsByRowData: function (values) {
      if (!(values == null || values == undefined || values.length == 0)) {
        let ids = [];
        for (let i = 0; i < values.length; i++) {
          let j = this.getRowIndexByRowData(values[i]);
          ids.push(j);
        }
        this.selectRows(ids);
      }
    },
    setFilterCondition: function (args) {
      this.currentFilter = args;
      let condition = this.filterConditions.find(
        (x) => x.fieldName == args.fieldName
      );
      if (condition == null || condition == undefined) {
        this.filterConditions.push({
          fieldName: args.fieldName,
          value: args.value,
        });
      } else {
        condition.value = args.value;
      }
      this.$emit("filterChanged", {
        filters: this.filterConditions,
        current: this.currentFilter,
      });
    },
    clearFilterConditions: function () {
      this.filterConditions = [];
      this.currentFilter = {};
      this.$emit("filterChanged", {
        filters: this.filterConditions,
        current: this.currentFilter,
      });
    },
    clearFilterCondition: function (fieldName) {
      this.filterConditions = this.filterConditions.filter(
        (x) => x.fieldName != fieldName
      );
      this.currentFilter = {};
      this.$emit("filterChanged", {
        filters: this.filterConditions,
        current: this.currentFilter,
      });
    },
    getFilterConditionValue: function (fieldName) {
      let result = null;
      let condition = this.filterConditions.find(
        (x) => x.fieldName == fieldName
      );
      if (!(condition == null || condition == undefined)) {
        result = condition.value;
      }
      return result;
    },
    getCurrentFilter: function () {
      return this.currentFilter;
    },
    pagination_CommandClick: function (command, args) {
      this.$emit("paginationCommandClick", command, args);
    },
  },
  watch:{
    dataSource(val){
      this.currentRowSelected=null
    }
  }
};
</script>
