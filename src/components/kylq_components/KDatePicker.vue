<template>
  <date-picker
    :format="format"
    :value-type="format"
    :time-title-format="format"
    :disabled="disabled"
    :type="type"
    @change="onChange"
    v-model="content"
    >
    <template #icon-calendar>
      <span class="icon one-calendar"></span>
    </template>
  </date-picker>
</template>
<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/locale/vi.js'
import 'vue2-datepicker/index.css'
export default {
    name:'k-date-picker',
    components: { DatePicker },
    
    data(){
        return{
            content:this.value
        }
    },
    props: {
        value: String,
        format:{
            type:String,
            default:'DD/MM/YYYY' //DD/MM/YYYY HH:mm:ss
        }, 
        type: {
            type:String,
            default: 'date' //date|datetime|year|month|time|week 
        }, 
        disabled: {
            type: Boolean,
            default: false
        }
    },
    watch:{
        content(val){
            this.handleInput(val)
        },
        value(val){
            this.content=val
        }
    },
    methods: {
        handleInput(value) {
            this.$emit('input', value)
        },
        onChange(value){
            this.$emit('change', value)
        }
    }
}
</script>
<style>
.mx-datepicker {
  width: 100%;
}
.mx-icon-calendar {
  font-style: normal;
}
</style>