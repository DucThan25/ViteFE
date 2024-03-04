<template>
  <div class="select-custom">
    <select v-model="content" class="form-control">
      <option v-for="(item, index) in options" :key="index" :value="item[fieldValue]">{{item[fieldDisplay]}}</option>
    </select>
  </div>
</template>
<script>
export default {
    name:'k-select',
    props:{
        value: [Number, String],
        options:{
            type:Array,
            default: ()=>[],
            required: true
        },
        fieldValue:{
            type:String,
            default:'ID'
        },
        fieldDisplay:{
            type:String,
            default:'NAME'
        },

    },
    data(){
        return {
            content:this.value
        }
    },
    methods:{
        handleInput(value) {
            this.$emit('input', value)
            this.$emit('change', value)
        }
    },
    watch:{
        content(val){
            this.handleInput(val)
        },
        value(val){
            this.content=val
        }
    }
}
</script>