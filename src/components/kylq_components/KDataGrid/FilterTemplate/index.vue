<template>
  <div class="grid-column-filter-item e-input-group e-filterdiv">
    <input
      type="text"
      ref="txtFilterText"
      @change="filter_Changed"
      @keyup="filter_Keyup"
      v-model.trim="filterText"
      class="e-input"
    />
    <button :class="buttonClearCss" @click="btnClear_Clicked" />
  </div>
</template>
<script>
export default {
  name: "FilterTemplate",
  props: {},
  data: function () {
    return {
      filterText: "",
      timeOut: null
    };
  },
  mounted: function () {
    this.filterText = this.dataGrid.getFilterConditionValue(
      this.data.column.field
    );
    let currentFilter = this.dataGrid.getCurrentFilter();
    if (currentFilter.fieldName == this.data.column.field) {
      setTimeout((x) => {
        this.$nextTick(() => this.$refs.txtFilterText.focus()); // this works great, just watch out with going to fast !!!
      }, 200);
    }
  },
  computed: {
    dataGrid: function () {
      return this.$parent.$parent;
    },
    buttonClearCss: function () {
      let result = "e-clear-icon";
      if (this.filterText == "" || this.filterText == null)
        result += " e-clear-icon-hide";
      return result;
    },
  },
  methods: {
    filter_Changed: function (args) {
      if (this.filterText == null || this.filterText == "") {
        this.dataGrid.clearFilterCondition(this.data.column.field);
      } else {
        this.dataGrid.setFilterCondition({
          fieldName: this.data.column.field,
          value: this.filterText,
        });
      }
    },
    filter_Keyup: function (args) {
      clearTimeout(this.timeOut);
      if (args.code == "Enter") {
        this.dataGrid.refresh();
      }else{
        this.timeOut=setTimeout(function(){
          this.dataGrid.refresh();
        }.bind(this), 1000);
      }
    },
    btnClear_Clicked: function (args) {
      this.filterText = null;
      this.dataGrid.clearFilterCondition(this.data.column.field);
    },
  },
};
</script>
