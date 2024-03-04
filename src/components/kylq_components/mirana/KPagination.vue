<template>
  <div class="e-gridpager e-control e-pager e-lib">
    <div class="e-pagercontainer" role="navigation"><button
        class="e-first e-icons e-icon-first e-firstpage e-pager-default" title="Đi đến trang đầu"
        aria-label="Đi đến trang đầu" tabindex="-1" index="1" :disabled="!enabledFirstPage"
        @click="gotoFirstPage()"></button><button class="e-prev e-icons e-icon-prev e-prevpage e-pager-default"
        title="Đi đến trang trước" aria-label="Đi đến trang trước" tabindex="-1" index="2" :disabled="!enabledPrevPage"
        @click="gotoPrevPage()"></button><button class="e-link e-pp e-spacing e-numericitem e-pager-default"
        title="Đi đến danh sách trang trước" role="link" aria-label="Đi đến danh sách trang trước" tabindex="-1"
        :disabled="!enabledPrevPageList" @click="gotoPrevPageList()" index="3">...</button><button
        v-for="page in currentPageListItems" :key="page"
        :class="'e-link e-numericitem e-spacing ' + (page == pageIndexData ? 'e-currentitem e-active' : 'e-pager-default')"
        role="link" tabindex="-1" :aria-label="'Đi đến trang ' + (page + 1)" :title="'Đi đến trang ' + (page + 1)"
        :index="page" @click="gotoPage(page)">{{(page + 1).toLocaleString('vi-VN')}}</button><button
        class="e-link e-np e-spacing e-numericitem e-pager-default" title="Đi đến danh sách trang sau" role="link"
        aria-label="Đi đến danh sách trang sau" tabindex="-1" :disabled="!enabledNextPageList" index="4"
        @click="gotoNextPageList()">...</button><button class="e-next e-icons e-icon-next e-nextpage e-pager-default"
        title="Đi đến trang sau" aria-label="Đi đến trang sau" tabindex="-1" index="5" :disabled="!enabledNextPage"
        @click="gotoNextPage()"></button><button class="e-last e-icons e-icon-last e-lastpage e-pager-default"
        title="Đi đến trang cuối" aria-label="Đi đến trang cuối" tabindex="-1" index="6" :disabled="!enabledLastPage"
        @click="gotoLastPage()"></button>
    </div>
    <div class="e-pagesizes">
      <div class="e-pagerdropdown">
        <ejs-dropdownlist :dataSource="pageSizeList" v-model="pageSizeData" :enabled="totalRecords > 0">
        </ejs-dropdownlist>
      </div>
      <div class="e-pagerconstant"><span class="e-constant">bản ghi trên trang</span></div>
    </div>
    <button class="e-mfirst e-icons e-icon-first e-firstpage e-pager-default" title="Đi đến trang đầu" tabindex="-1"
      index="1" aria-label="Đi đến trang đầu" :disabled="!enabledFirstPage" @click="gotoFirstPage()"></button>
    <button
      class="e-mprev e-icons e-icon-prev e-prevpage e-pager-default" title="Đi đến trang trước" tabindex="-1" index="7"
      aria-label="Đi đến trang trước" :disabled="!enabledPrevPage" @click="gotoPrevPage()"></button>

    <button class="e-mnext e-icons e-icon-next e-nextpage e-pager-default" title="Đi đến trang sau" tabindex="-1"
      index="9" aria-label="Đi đến trang sau" :disabled="!enabledNextPage" @click="gotoNextPage()"></button>
    <button class="e-mlast e-icons e-icon-last e-lastpage e-pager-default" title="Đi đến trang cuối" tabindex="-1"
      index="70" aria-label="Đi đến trang cuối" :disabled="!enabledLastPage" @click="gotoLastPage()"></button>
    <div class="e-parentmsgbar">
      <div class="e-pagecountmsg"> Tổng cộng <span
        class="row-number row-total-number">{{totalRecords.toLocaleString('vi-VN')}}</span> bản ghi. Đang hiển thị bản ghi số <span class="row-number row-begin-number">{{currentBeginRecord.toLocaleString('vi-VN')}}</span> đến
        <span class="row-number row-end-number">{{currentEndRecord.toLocaleString('vi-VN')}}</span>.
      </div>
    </div>
    <!-- <div class="e-parentmsgbar">
      <div class="e-pagecountmsg">
        Bản ghi từ số <span class="row-number row-begin-number">{{currentBeginRecord.toLocaleString('vi-VN')}}</span> đến
        số <span class="row-number row-end-number">{{currentEndRecord.toLocaleString('vi-VN')}}</span> trong tổng số <span
          class="row-number row-total-number">{{totalRecords.toLocaleString('vi-VN')}}</span>
      </div>
    </div> -->
  </div>
</template>
<script>
//Copy from: auth: vanloc, folder: components/Controls/Pagination
const DEFAULT_PAGE_SIZE_LIST = [10, 20, 30, 50, 100, 200];
export default {
  name: "KPagination",
  props: {
    pageIndex: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    totalRecords: {
      type: Number,
      default: 0,
    },
  },
  data: function () {
    return {
      pageSizeData: this.pageSize,
      //pageIndexData: (this.pageIndex < this.lastPage ? this.pageIndex : this.lastPage),
      pageIndexData: this.pageIndex,
      pageSizeList: DEFAULT_PAGE_SIZE_LIST,
    };
  },
  watch: {
    pageSizeData: function () {
      this.$emit("pageChanged", this.getPageArgs());
      if (this.pageIndexData > this.lastPage)
        this.pageIndexData = this.lastPage;
      else this.$emit("pageChanged", this.getPageArgs());
    },
    pageIndexData: function () {
      this.$emit("pageChanged", this.getPageArgs());
    },
    totalRecords: function (value) {
      this.$emit("pageChanged", this.getPageArgs());
      if (this.pageIndexData > this.totalPages - 1)
      {
        this.pageIndexData = this.totalPages > 0 ? this.totalPages - 1 : 0;
      }
      else this.$emit("pageChanged", this.getPageArgs());
    },
  },
  computed: {
    totalPages: function () {
      return Math.ceil(this.totalRecords / this.pageSizeData);
    },
    lastPage: function () {
      let result = this.totalPages - 1;
      return result > 0 ? result : 0;
    },
    currentBeginRecord: function () {
      let begin = this.getBeginRecordOfPage(this.pageIndexData);
      return begin < this.totalRecords ? begin : this.totalRecords;
    },
    currentEndRecord: function () {
      let end = this.getEndRecordOfPage(this.pageIndexData);
      return end < this.totalRecords ? end : this.totalRecords;
    },
    currentPageListIndex: function () {
      return this.getPageListIndex(this.pageIndexData);
    },
    lastPageListIndex: function () {
      return this.getPageListIndex(this.lastPage);
    },
    currentPageListItems: function () {
      let begin = this.currentPageListIndex * 4;
      let result = [];
      for (let i = 0; i < 4; i++) {
        let p = begin + i;
        if (this.checkPageValid(p)) result.push(begin + i);
        else break;
      }
      return result;
    },
    enabledPrevPageList: function () {
      return this.currentPageListIndex > 0;
    },
    enabledNextPageList: function () {
      return this.currentPageListIndex < this.lastPageListIndex;
    },
    enabledNextPage: function () {
      return this.pageIndexData < this.lastPage;
    },
    enabledLastPage: function () {
      return this.pageIndexData < this.lastPage;
    },
    enabledPrevPage: function () {
      return this.pageIndexData > 0;
    },
    enabledFirstPage: function () {
      return this.pageIndexData > 0;
    },
  },
  methods: {
    getPageArgs: function () {
      return {
        pageIndex: this.pageIndexData,
        pageSize: this.pageSizeData,
      };
    },
    gotoPage: function (value) {
      if (this.pageIndexData != value) this.pageIndexData = value;
    },
    gotoNextPage: function () {
      this.gotoPage(this.pageIndexData + 1);
    },
    gotoPrevPage: function () {
      this.gotoPage(this.pageIndexData - 1);
    },
    gotoFirstPage: function () {
      this.gotoPage(0);
    },
    gotoLastPage: function () {
      this.gotoPage(this.lastPage);
    },
    getBeginRecordOfPage: function (page) {
      return page * this.pageSizeData + 1;
    },
    getEndRecordOfPage: function (page) {
      return this.getBeginRecordOfPage(page) + this.pageSizeData - 1;
    },
    checkPageValid: function (page) {
      return page >= 0 && page <= this.lastPage;
    },
    getPageListIndex: function (page) {
      return Math.ceil((page + 1) / 4) - 1;
    },
    gotoNextPageList: function () {
      let page = (this.currentPageListIndex + 1) * 4;
      this.gotoPage(page);
    },
    gotoPrevPageList: function () {
      let page = (this.currentPageListIndex - 1) * 4;
      this.gotoPage(page);
    },
  },
};
</script>
<style scoped>
/* .e-pager{
  border-style:none !important;
  padding: 0px !important;
}
.e-pager .e-pagercontainer{
  margin: 0 0 -2px;
}
.e-pager .e-icons{
  font-size: 9px !important;
}
.e-pager .e-spacing, .e-pager .e-numericitem:hover, .e-pager .e-currentitem{
  border: 1px !important;
  padding: 9px 11px 10px 11px !important;
}

.e-pager .e-pp, .e-pager .e-np, .e-pager .e-pp:hover, .e-pager .e-np:hover{
  font-size: 14px !important;
}
.e-pager .e-pagercontainer .e-firstpage, .e-pager .e-pagercontainer .e-prevpage, .e-pager .e-pagercontainer .e-firstpagedisabled, .e-pager .e-pagercontainer .e-prevpagedisabled, .e-pager .e-pagercontainer .e-nextpage, .e-pager .e-pagercontainer .e-lastpage, .e-pager .e-pagercontainer .e-nextpagedisabled, .e-pager .e-pagercontainer .e-lastpagedisabled{
  border: 1px !important;
  padding: 12px 10px 12px 10px !important;
}
.row-number{
  color: #007BFF !important;
  font-weight: bold !important;
}
.disabled-button{
  color: #666666 !important;
}
.e-pager div.e-parentmsgbar{
  padding-top: 11px !important;
} */
.e-pager{
  border-style:none !important;
  padding: 0px !important;
}
.e-pager .e-pagercontainer {
  border: 0px;
  margin: 0px 6px 6px 0px;
  border-radius: 0px;
  border-left: 1px solid #DDD;
  float: left;
}

.e-pager .e-pagercontainer button, .e-pager .e-next.e-icons.e-icon-next.e-nextpage.e-pager-default {
  float: left;
  margin-left: -1px;
  min-width: 32px;
  text-align: center;
  height: 32px;
  padding: 8px !important;
}

.e-pager .e-pagercontainer button, .e-pager .e-pagercontainer button:hover {
  border: 1px solid #DDD !important;
  border-radius: 0px !important;
}

.e-pager .e-pagercontainer button:disabled {
  color: #c0c0c0;
}

.e-pager .e-pagercontainer button:disabled:hover {
  background-color: transparent;
  cursor: unset;
}

.e-pager .e-pagercontainer button.e-pp, .e-pager .e-pagercontainer button.e-np {
  font-size: inherit;
}

.e-pager .e-pagesizes {
  float: left;
}

.e-pager .e-pagesizes .e-pagerconstant {
  margin: 6px 6px 6px 0;
  float: left;
}

.e-pager .e-pagerdropdown {
  height: 32px;
  margin: 0px 6px 0px 0px;
  width: 70px;
  float: left
}

.e-pager .e-pagerdropdown .e-input-group .e-input[readonly] {
  color: #007bff;
  text-align: right;
}

.e-pager .e-pagerdropdown .e-input-group {
  border-radius: 0px !important;
  border-color: #DDD !important;
  height: 32px;
}

.e-pager div.e-parentmsgbar {
  padding-bottom: 6px;
  padding-top: 6px;
}

.e-pager .row-number {
  color: #007bff;
}

.e-pager .row-number.row-total-number {
  font-weight: bold;
}

.e-pager .e-mspace {
  display: none;
}
@media (max-width: 769px) {
  .e-pager {
    border: 1px solid #DDD;
    display: flex;
    padding: 0px;
  }
  .e-pager .e-pagercontainer {
    display: none;
  }
  .e-pager .e-pagesizes {
    display: none;
  }
  .e-pager .e-mspace {
    flex-grow: 1;
    text-align: center;
    display: inline-block;
    align-self: center;
  }
  .e-pager div.e-parentmsgbar {
    display: none;
  }
  .e-pager button.e-mfirst, .e-pager button.e-mprev, .e-pager button.e-mnext, .e-pager button.e-mlast {
    padding: 12px 35px;
    text-align: center;
    width: auto;
    margin: 0px;
  }
}
</style>
