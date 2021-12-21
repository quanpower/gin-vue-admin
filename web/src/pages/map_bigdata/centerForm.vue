<template>
    <div id="centerForm">
        <el-form :inline="true" :model="formInline" :rules="formInlineRules" ref="formInline"  size="mini">
            <el-form-item label="年度" prop="year">
                <el-select v-model="formInline.year" placeholder="年度">
                    <el-option
                            v-for="item in yearList"
                            :key="item.id"
                            :label="item.label"
                            :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="任务" prop="tdId">
                    <el-select v-model="formInline.tdId" placeholder="任务">
                        <el-option
                                v-for="item in tasksList"
                                :key="item.id"
                                :label="item.label"
                                :value="item.value"
                        ></el-option>
                    </el-select>
            </el-form-item>
            <el-form-item label="期数" prop="phase">
                <el-select v-model="formInline.phase" placeholder="期数">
                    <el-option
                            v-for="item in phaseList"
                            :key="item.id"
                            :label="item.label"
                            :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

    export default {
        name: "centerForm",
        data(){
            return{

                yearList:[{
                    id:1,
                    label:'2019',
                    value:'2019'
                },{
                    id:2,
                    label:'2020',
                    value:'2020'
                }],
                formInline: {
                    tdId: '',
                    phase: '',
                    year: 2020,
                },
                tasksList:[{
                    id:1,
                    label:'任务一',
                    value:'task1'
                },{
                    id:2,
                    label:'任务二',
                    value:'task2'
                }],
                phaseList:[{
                    id:1,
                    label:'期数一',
                    value:'phase1'
                },{
                    id:2,
                    label:'期数二',
                    value:'phase2'
                }],
                formInlineRules: {
                    year: [
                        {required: true, message: '请选择年度', trigger: 'change'}
                    ],
                    tdId: [
                        {required: true, message: '请选择任务', trigger: 'change'}
                    ],
                    phase: [
                        {required: true, message: '请选择期数', trigger: 'change'}
                    ],
                },
            }
        },

        methods: {

        }
    }
</script>

<style lang="scss" scoped>
    #centerForm{
        ::v-deep.el-form{
            padding: .3rem .5rem;
            .el-form-item{
                margin-bottom: 0;
                .el-form-item__label{
                    color:#fff;
                    padding-right: .1rem;
                }
            }
        }
    }
</style>
