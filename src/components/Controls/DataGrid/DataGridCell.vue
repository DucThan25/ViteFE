<template>
  <td :class="this.cssClass">
    <template v-if="this.allowHtml">
      <span v-html="this.text"></span>
    </template>
    <template v-else>
      {{ this.text }}
    </template>
  </td>
</template>
<script>
export default {
  name: "DataGridCell",
  props: {
    cssClass: "",
    dataItem: {},
    column: {},
    cellCreatedEventEnabled: false,
  },
  computed: {
    fieldName: function () {
      if (!(this.column == null || this.column == undefined))
        return this.column.fieldName;
      return null;
    },
    text: function () {
      if (!(this.dataItem == null || this.dataItem == undefined))
        return this.dataItem[this.fieldName];
      return null;
    },
    allowHtml: function () {
      if (!(this.column == null || this.column == undefined))
        return this.column.allowHtml;
      return false;
    },
    EventArgs: function () {
      return {
        cellFieldName: this.fieldName,
        cellCssClass: this.cssClass,
        cellAllowHtml: ((this.allowHtml == null || this.allowHtml == undefined) ? false : this.allowHtml),
        cellText: this.text,
        cellElement: this.$el,
        cellColumn: this.column,
        cellDataItem: this.dataItem,
      };
    },
  },
  mounted() {
    if (this.cellCreatedEventEnabled) {
      this.$nextTick(function () {
        this.$emit("dataGridCellCreated", this.EventArgs);
      });
    }
  },
  updated() {
    if (this.cellCreatedEventEnabled) {
      this.$nextTick(function () {
        this.$emit("dataGridCellCreated", this.EventArgs);
      });
    }
  },
};
</script>
