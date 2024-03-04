<template>
  <div>
    <div class="table-content" :style="{height:tableHeight}">
      <table class="table-result table-gachle" >
        <thead class="center">
          <tr>
            <th class="w20"></th>
            <th class="w20" v-if="allowCheckBox&&labelCheckColumn">Chọn</th>

            <th v-if="allowCheckBox&&!labelCheckColumn" class="w20">
              <div class="check-action">
                <input type="checkbox" class="check" v-model="allCheckbox" @change="allChangeCheckbox($event)"/>
                <span class="name"></span>
              </div>
            </th>

            <th class="k-column" v-for="item in columns" :key="item.field" :width="item.width" @click="columnButtonSort(item)">
              <div class="cell-header">
                <span class="header-title">
                  {{item.label}}
                </span>
                <span v-if="item.allowSorting!==undefined||item.allowSorting" class="btn-sort"  
                  :class="{'fa fa-sort':sortValues.field!=item.field, 'btn-sorted fa fa-caret-up':(sortValues.field==item.field&&sortValues.direction=='asc'), 'btn-sorted fa fa-caret-down':(sortValues.field==item.field&&sortValues.direction=='desc')}"></span>
              </div>
              
            </th>
          </tr>
          <tr v-if="allowFilter">
            <th class="w20"></th>

            <th v-if="allowCheckBox" class="w20">
              <div class="check-action">
                <input type="checkbox" v-if="!labelCheckColumn" :disabled="true" class="check" />
                <input type="checkbox" v-else v-model="allCheckbox" @change="allChangeCheckbox($event)" class="check" />
                <span class="name"></span>
              </div>
            </th>

            <th v-for="item in columns" :key="item.field">
              <div v-if="item.allowFilter" class="input-icon-right">
                <!-- @change input after enter search -->
                <input type="text" class="form-control" @keyup="filterChange" v-model="filterValues[item.field]" />
                <span class="icon nc-icon-outline ui-1_zoom"></span>
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, index) in pagerData"  :key="index" @click="onSelectedRow(fromIndexPage+index+1, item)" @dblclick="doubleClickRow(fromIndexPage+index+1, item)" :class="{highlight: rowSelected==fromIndexPage+index+1}">
            <td class="w20 center" :class="{highlight1: (rowSelected==fromIndexPage+index+1)}">
                <span class="fa fa-play text-main" v-if="rowSelected==fromIndexPage+index+1"></span>
            </td>
            <td v-if="allowCheckBox" class="w20 center" :class="{highlight1: (rowSelected==fromIndexPage+index+1)}">
              <div class="check-action">
                <input type="checkbox" class="check" v-model="item.checked" @change="onRowCheckChange($event, item)"/>
                <span class="name"></span>
              </div>
            </td>
            <!-- selected: (rowSelected==fromIndexPage+index+1),  -->
            <td v-for="(column, i) in columns" :key="i" :class="{highlight1: (rowSelected==fromIndexPage+index+1), w40: column.field.toLowerCase()=='stt', 'text-right': typeof item[column.field] === 'number'}">{{item[column.field]}}</td>
        
          </tr>
          <tr v-if="numberRecords==0" class="empty">
            <td :colspan="totalColumns" class="text-center">
              Không có bản ghi nào để hiển thị
            </td>
          </tr>

        </tbody>
      </table>
    </div>
    <KPagination :totalRecords="numberRecords" @pageChanged="onChangePage"/>
  </div>
</template>
<script>
// callback
// onSelectedRow return item
// onRowSelectedIndex return index row begin 1
// doubleClickRow return item
// dataCheckeds return data is checked
// column exam
// {
//     field: "TEN_TAIKHOAN",
//     label: "Tên tài khoản",
//     allowFilter: true,
//     allowSorting:false,
//     width:"30%"
// }
import KPagination from './KPagination.vue'
export default {
    name:'k-table',
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
        nowrap:{
          type:Boolean,
          default: false
        },
        //begin 1-> size row
        rowSelectedIndex:{
          type:Number,
          default:-1
        },

        labelCheckColumn:{
          type:Boolean,
          default:false
        }

    },
    data(){
        return{
            filterValues:{},
            sortValues:{
              field:'',
              direction:'none'
            },
            dataSourceFilters:this.dataSources,
            pagerData:[],
            fromIndexPage:0,
            rowSelected:this.rowSelectedIndex,
            allCheckbox:false,
            dataChecks:[],
            currentPage:1
        }
    },
    methods:{
        onChangePage(data){
            let to=data.pageIndex*data.pageSize+data.pageSize
            let from = data.pageIndex*data.pageSize
            this.fromIndexPage=from
            this.pagerData=this.dataSourceFilters.slice(from, to)
        },
        onSelectedRow(rowIndex, item){
          this.rowSelected=rowIndex
          this.$emit('onSelectedRow', item)
          this.$emit('onRowSelectedIndex', this.rowSelected)
        },
        doubleClickRow(rowIndex, item){
          this.$emit('doubleClickRow', item)
        },
        filterChange(){
          self=this;
          this.dataSourceFilters=this.dataSources.filter((item)=>{
            var result=true;
            self.columns.forEach((column)=>{
              if(column.allowFilter&&self.filterValues[column.field]){
                result=result&&((item[column.field]!=null?item[column.field].toString().trim().toLowerCase():"").indexOf(self.filterValues[column.field].toString().trim().toLowerCase())>-1)
              }
            })
            return result;
          })
        },
        allChangeCheckbox(event){
          if (event.target.checked) {
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
          //this.sortValues.field=
          
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
          // this.filterValues={}
          // //this.filterChange()
          // setTimeout(()=>{
          //   this.columnSort()
          // },100)
          
        },
        columnSort(){
          //this.dataSourcesDaGan=result.gan.sort((a, b)=>a.kieu_tt.localeCompare(b.kieu_tt))
          
          this.dataSourceFilters.sort((a, b)=>{
             if(this.sortValues.direction=='asc'){
               return a[this.sortValues.field].localeCompare(b[this.sortValues.field])
             }else{
               return b[this.sortValues.field].localeCompare(a[this.sortValues.field])
             }
          })
        }
    },
    watch: { 
      	dataSources: function(newVal, oldVal) { // watch it
           newVal.forEach((item)=>{
             item.checked=false
           })
           this.pagerData=[]

           this.dataSourceFilters=newVal 

           //reset filter
           this.filterValues={
             
           }
           this.dataChecks=[]
           this.rowSelected=this.rowSelectedIndex
           this.allCheckbox=false
           this.initSort()

        },
        rowSelectedIndex(val){
          this.rowSelected=val
        },
        columns(val){
          this.initSort()
        }
        
    },
    computed:{
      numberRecords(){
        return this.dataSourceFilters.length;
      },
      totalColumns(){
          var total=this.columns.length+1
          if(this.allowCheckBox)
            return total+1
          return total
      }
    },
    components:{
        KPagination
    },
}
</script>
<style scoped>
.k-column{
  cursor: pointer;
}
</style>
