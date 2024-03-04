<template>
  <div>
    <div class="table-content" :style="{height:tableHeight}">
      <table class="table-result table-gachle">
        <thead v-if="isShowHeaders" class="center pin-header">
          <tr>
            <th class="w20"></th>
            <th class="w20" v-if="allowCheckBox&&labelCheckColumn">Chọn</th>

            <th v-if="allowCheckBox&&!labelCheckColumn" class="w20">
              <div class="check-action">
                <input type="checkbox" class="check" v-model="allCheckbox" @change="allChangeCheckbox()"/>
                <span class="name"></span>
              </div>
            </th>

            <th class="k-column" v-for="item in columns" :key="item.field" :style="item.cssHeaders" :width="item.width" @click="columnButtonSort(item)">
              <div class="cell-header">
                <span class="header-title">
                  {{item.label}}
                </span>
                <span v-if="item.allowSorting!==undefined&&item.allowSorting" class="btn-sort"  
                  :class="{'fa fa-sort':sortValues.field!=item.field, 'btn-sorted fa fa-caret-up':(sortValues.field==item.field&&sortValues.direction=='asc'), 'btn-sorted fa fa-caret-down':(sortValues.field==item.field&&sortValues.direction=='desc')}"></span>
              </div>
              
            </th>
          </tr>
          <tr v-if="allowFilter">
            <th class="w20"></th>

            <th v-if="allowCheckBox" class="w20">
              <div class="check-action">
                <input type="checkbox" v-if="!labelCheckColumn" :disabled="true" class="check" />
                <input type="checkbox" v-else v-model="allCheckbox" @change="allChangeCheckbox()" class="check" />
                <span class="name"></span>
              </div>
            </th>

            <th v-for="item in columns" :key="item.field">
              <div v-if="item.allowFilter" class="input-icon-right">
                <!-- @change input after enter search -->
                <!-- v-model="filterValues[item.field] -->
                <input type="text" class="form-control" autocomplete="off" @keyup="filterChange" v-model="filterValues[item.field]" />
                <span class="icon nc-icon-outline ui-1_zoom"></span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in pagerData"  :key="item[id]" @click="onSelectedRow(item)" @dblclick="doubleClickRow(item)" :class="{highlight: rowSelected==item[id]}">
            <td class="w20 center" :class="{highlight1: (rowSelected==item[id])}">
                <span class="fa fa-play text-main" v-if="rowSelected==item[id]"></span>
            </td>
            <td v-if="allowCheckBox" class="w20 center" :class="{highlight1: rowSelected==item[id]}">
              <div class="check-action">
                <input type="checkbox" class="check" v-model="item.checked" @change="onRowCheckChange($event, item)"/>
                <span class="name"></span>
              </div>
            </td>
            <!-- selected: (rowSelected==fromIndexPage+index+1),  -->
            <!-- :style="{color:'red', fontWeight: 'bold'}"  -->
            <td v-for="(column, i) in columns" :key="i" :style="column.cssRows" :class="{highlight1: (rowSelected==item[id]), 'text-right': typeof item[column.field] === 'number'}">{{item[column.field]}}</td>
        
          </tr>
          <tr v-if="numberRecords==0" class="empty">
            <td :colspan="totalColumns" class="text-center" style="color:gray;">
              Không có bản ghi nào để hiển thị
            </td>
          </tr>
          <!-- Row footer -->
          <slot name="footer"></slot>
        </tbody>
      </table>
    </div>
    <KPagination v-if="isShowPagination" :totalRecords="numberRecords" @pageChanged="onChangePage"/>
  </div>
</template>
<script>
// callback
// onSelectedRow return item
// doubleClickRow return item
// dataCheckeds return data is checked
// column exam
// {
//     field: "TEN_TAIKHOAN",
//     label: "Tên tài khoản",
//     allowFilter: true,
//     allowSorting:false,
//     width:"30%",
//     cssRows:{color:'red', fontWeight: 'bold'}
//     cssHeaders:{color:'red', fontWeight: 'bold'}
// }
// Prop bắt buộc: columns, id(key row)
//Thay row index bằng selected theo key id row
import KPagination from './KPagination.vue'
const collator=new Intl.Collator('en', { numeric: true, sensitivity: 'base' })
export default {
    name:'KTableV3',
    props:{
        dataSources:{
            type:Array,
            default: ()=>[],
            // required: true
        },
        columns:{
            type:Array,
            default: ()=>[],
            required: true
        },
        allowFilter:{
            type:Boolean,
            default:false
        },
        allowCheckBox:{
            type:Boolean,
            default:false
        },
        tableHeight:{
          //exm: 120px
          type:String,
          default:'auto'
        },
        //selected id row
        rowSelectedId:{
          type:[Number, String],
          default:-1
        },
        labelCheckColumn:{
          type:Boolean,
          default:false
        },
        //Key id row, default index gán key index tăng number khi dataSource thay đổi
        id:{
          type:String,
          //default:'id',
          default:'index',
          //required: true
        },
        isShowPagination:{
          type:Boolean,
          default:true
        },
        isShowHeaders:{
          type:Boolean,
          default:true
        }
    },
    components:{
        KPagination
    },
    computed:{
        dataSourceFilters(){
            return this.dataSources.filter(this.filterData).sort(this.sortData)
        },
        pagerData(){
          if(!this.isShowPagination){
            return this.dataSourceFilters
          }
          let to=this.pageIndex*this.pageSize+this.pageSize
          let from = this.pageIndex*this.pageSize
          return this.dataSourceFilters.slice(from, to)
        },
        numberRecords(){
            return this.dataSourceFilters.length
        },
        totalColumns(){
            var total=this.columns.length+1
            if(this.allowCheckBox)
                return total+1
            return total
        }
    },
    data(){
        return{
            filterValues:{},
            sortValues:{
              field:'',
              direction:'none'
            },
            rowSelected:this.rowSelectedId,
            allCheckbox:false,
            dataChecks:[],
            pageIndex:0,
            pageSize:10

        }
    },
    methods:{
        onChangePage(data){
            this.pageIndex=data.pageIndex
            this.pageSize=data.pageSize
        },
        onSelectedRow(item){
          this.rowSelected=item[this.id]
          this.$emit('onSelectedRow', item)
          //this.$emit('onRowSelectedIndex', this.rowSelected)
        },
        doubleClickRow(item){
          this.$emit('doubleClickRow', item)
        },
        filterChange(field){
            
        },
        // Filter
        filterData:function (item){
            var result=true;
            this.columns.forEach((column)=>{
              if(column.allowFilter&&this.filterValues[column.field]){
                result=result&&((item[column.field]!=null?item[column.field].toString().trim().toLowerCase():"").indexOf(this.filterValues[column.field].toString().trim().toLowerCase())>-1)
              }
            })
            return result;
        },

        allChangeCheckbox(){
          if (this.allCheckbox) {
            this.dataChecks=[]
            this.dataSources.forEach((item)=>{
              item.checked=true
              this.dataChecks.push(item)
            }) 
            this.$emit('dataCheckeds',this.dataChecks)
          }else{
            this.dataSources.forEach((item)=>{
              item.checked=false
            })
            this.dataChecks=[]
            this.$emit('dataCheckeds',this.dataChecks)
          }
        },
        onRowCheckChange(event, item){
           if (event.target.checked) {
             this.dataChecks.push(item)
           }else{
             const index = this.dataChecks.indexOf(item);
             if (index > -1) {
               this.dataChecks.splice(index, 1);
             }
           }
           this.allCheckbox=false
           this.$emit('dataCheckeds',this.dataChecks)
        },
        initSort(){
          //direction: none, asc, desc
          this.sortValues={
            field:'',
            direction:'none'
          }
        },
        columnButtonSort(column){
          if(column.allowSorting===undefined||!column.allowSorting){
            return
          }
          if(this.sortValues.field!=column.field){
            this.sortValues.field=column.field
            this.sortValues.direction='asc'
            //sắp xếp tăng dần
            
          }else{
            if(this.sortValues.direction=='asc'){
              this.sortValues.direction='desc'
              //sắp xếp giảm dần
            }else{
              this.sortValues.direction='asc'
              //sắp xếp tăng dần
            }
          }
          
        },
        sortData: function (a, b) {
            // if (this.sortValues.field != "") {
            //     let field = this.sortValues.field
            //     if (this.sortValues.direction == "asc")
            //         return a[field] < b[field] ? -1 : 1;
            //     else return a[field] < b[field] ? 1 : -1;
            // }
            // return 0
            if (this.sortValues.field != "") {
                let field = this.sortValues.field
                if (this.sortValues.direction == "asc"||this.sortValues.direction == "none")
                    return collator.compare(a[field]!=null?a[field]:'', b[field]!=null?b[field]:'')
                else return collator.compare(b[field]!=null?b[field]:'', a[field]!=null?a[field]:'')
            }
            return 0

        },
    },
    watch: { 
      	dataSources: function(newVal, oldVal) { // watch it
           newVal.forEach((item, index)=>{
             item.checked=false
             if(this.id=='index'){
               item.index=index
             }
           })
           //reset filter
           this.filterValues={}
           this.dataChecks=[]
           this.rowSelected=this.rowSelectedId
           this.allCheckbox=false
           this.initSort()

        },
        rowSelectedId(val){
          this.rowSelected=val
        },
    },
    mounted(){

    }
}
</script>
<style scoped>
.k-column{
  cursor: pointer;
}
.btn-sort {
    background-color: transparent !important;
    border: 0px !important;
    padding-right: 0px !important;
    color: #52a9ff !important;
}
.pin-header{
  top: 0 !important;
  position: sticky !important;
  z-index: 20 !important;
}
.table-result tr th{
  border: 0.5px solid white !important;
  outline: 0.5px solid white !important;
}
</style>