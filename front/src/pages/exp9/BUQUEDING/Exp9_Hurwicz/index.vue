<template>
    <h1 class="title">实验7 基于赫维斯基法的软件项目/产品的不确定性实验

        <span> <el-button class="guidance" type="primary" text @click=""><el-icon size="25px">
                    <Document />
                </el-icon>实验指导书下载</el-button></span>
    </h1>
    <hr />
    <h2>一、实验目的</h2>
    <p class="recontent">
        本实验旨在使用赫维斯基法评估软件项目/产品开发中的不确定性，并探讨不同因素对于不确定性的影响。 本实验为课内设计性实验项目，实验学时 1 学时，完成实验报告 1 学时。
    </p>
    <h2>二、实验内容</h2>
    <p class="recontent">
      使用赫维斯基法，探究不同估计方法下的方法选择。具体实验步骤如下：
    </p>
    <p class="content">1.获取实验指导书</p>
    <li class="recontent">
      学生通过下载实验指导书选项获取指导书文件

    </li>
    <br />
    <p class="content">
      2. 阅读实验指导书
    </p>
    <li class="recontent">
      学生熟悉不确定性实验方法，并获取相应实验数据
    </li>
    <br />
    <p class="content">
      4. 填写实验数据
    </p>
    <li class="recontent">
      学生将所给实验数据填写在对应表格
    </li>
    <br />
    <p class="content">
      5. 根据对应的方法，选择你所认为的最佳方案
    </p>
    <li class="recontent">
      学生将选择的方案填写在对应位置
    </li>
    <br />
    <p class="content">
      6. 总结和讨论
    </p>
    <li class="recontent">
      实验结果总结：总结该种方法对不确定性方法选择的影响。
    </li>
    <br />
    <h2>三、实验原理</h2>
    <h3 class="subtitle-content">1.赫维斯基法</h3>
    <p class="content">
        赫维斯基法是对最大最小法和最大最大法两个方法进行折中的方法。决策者同时抱有乐观和悲观的态度，对每个方案的最好结果和最差结果进行加权平均计算，然后选取加权平均收益最大的方案作为最优行动方案。
采用该方法时，需要选取一个乐观系数入，该系数取值在0和1之间。如，风险厌恶型决策者会给与最好结果0.3的权重，而给予最差结果0.7的权重。
    </p>
    <h2>四、实验步骤</h2>
    <p class="content">
      1. 实验开始，调整乐观参数
    </p>
    <div>
    <p class="content">
      2. 填写实验数据
    </p>
    <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">Add</a-button>
    当前最好结果的权重：
        <a-input-number  class="input-number" id="inputNumber" v-model:value="factor" :min="0" :max="1" :step="0.1" />
        <a-button class="insure" type="primary"  :loading="loading" @click="start">
        运行
    </a-button>    
    </div>

    <a-table bordered :data-source="dataSource" :columns="columns" :pagination="false">
        <template #bodyCell="{ column, text, record }">
            <template v-if="['plan', 'cost1', 'cost2', 'cost3', 'cost4',].includes(column.dataIndex)">
                <div>
                    <a-input v-if="editableData[record.key]" v-model:value="editableData[record.key][column.dataIndex]"
                        style="margin: -5px 0" />
                    <template v-else>
                        {{ text }}
                    </template>
                </div>
            </template>
            <template v-else-if="column.dataIndex === 'operation'">
                <span v-if="editableData[record.key]">
                    <a-typography-link @click="save(record.key)">Save</a-typography-link>
                    <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.key)">
                        <a>&nbsp;&nbsp;&nbsp;Cancel</a>
                    </a-popconfirm>
                </span>
                <span v-else>
                    <a @click="edit(record.key)">Edit</a>
                </span>
                <span>
                    <a>&nbsp;&nbsp;&nbsp;</a>
                </span>
                <a-popconfirm v-if="dataSource.length" title="Sure to delete?" @confirm="onDelete(record.key)">
                    <a>Delete</a>
                </a-popconfirm>
            </template>
        </template>
    </a-table>
    <h2>五、实验结果</h2>
    1. 当前最好方案为
    <a-input v-model:value="bestplan" style="width: 200px" placeholder="方案xx" />
    <h2>六、实验思考</h2>
    <a-textarea v-model:value="reflection" placeholder="写下你的实验思考" :rows="4" />
  <br />
  <br />
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs } from 'vue';
import type { Ref, UnwrapRef } from 'vue';
import { CheckOutlined, EditOutlined } from '@ant-design/icons-vue';
import { cloneDeep, max } from 'lodash-es';
import { message, Modal } from 'ant-design-vue'


message.config({
    duration: 2, // 提示时常单位为s
    top: '425px', // 距离顶部的位置
    maxCount: 3 // 最多显示提示信息条数(后面的会替换前面的提示)
})
type Key = string | number;
interface DataItem {
    key: string;
    state: string;
    cost1: number;
    cost2: number;
    cost3: number;
    cost4: number;
}

export default defineComponent({
    components: {
        CheckOutlined,
        EditOutlined,
    },
    setup() {
        const bestplan = ref<string>('');
        const factor = ref<number>(0.3);
        const reflection = ref<string>('');
        const state = reactive<{
            selectedRowKeys: Key[];
            loading: boolean;
        }>({
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
        });
        const hasSelected = computed(() => state.selectedRowKeys.length > 0);

        const start = () => {

            onDelete("0")
            // ajax request after empty completing
            setTimeout(() => {
                let assign_num = []
                let row_temp=new Array([],[],[],[]);
                dataSource.value.forEach(function (item) {                       
                    row_temp[0].push(item.cost1)
                    row_temp[1].push(item.cost2)
                    row_temp[2].push(item.cost3)
                    row_temp[3].push(item.cost4)
                })
                for (let i =0;i<row_temp.length;i++)
                {
                    assign_num.push((1-factor.value)*(Math.min(...row_temp[i]))
                    +factor.value*(Math.max(...row_temp[i])  ))            
                    
                }
                onDelete("0")
                console.log(assign_num)
                    const newData = {
                    key: "0",
                    state: "加权后结果",
                    cost1: assign_num[0],
                    cost2: assign_num[1],
                    cost3: assign_num[2],
                    cost4: assign_num[3],
                };
                dataSource.value.push(newData);
                


            }, 1000);


            
        };
        const onSelectChange = (selectedRowKeys: Key[]) => {
            console.log('selectedRowKeys changed: ', selectedRowKeys);
            state.selectedRowKeys = selectedRowKeys;
        };




        const columns = [
            {
                title: '状态\\方案',
                dataIndex: 'state',
                width: '10%',
            },
            {
                title: '方案A',
                dataIndex: 'cost1',
            },
            {
                title: '方案B',
                dataIndex: 'cost2',
            },
            {
                title: '方案C',
                dataIndex: 'cost3',
            },
            {
                title: '方案D',
                dataIndex: 'cost4',
            },
            {
                title: 'operation',
                dataIndex: 'operation',
            },
        ];
        const dataSource: Ref<DataItem[]> = ref([
            {
                key: '1',
                state: '01',
                cost1: -900,
                cost2: -550,
                cost3: -200,
                cost4: -100,

            },
            {
                key: '2',
                state: '02',
                cost1: 300,
                cost2: 400,
                cost3: 250,
                cost4: 200,

            },
            {
                key: '3',
                state: '03',
                cost1: -200,
                cost2: 50,
                cost3: 300,
                cost4: 150,

            },
            {
                key: '4',
                state: '04',
                cost1: 1800,
                cost2: 1500,
                cost3: 1200,
                cost4: 900,

            },
            {
                key: '5',
                state: '05',
                cost1: 700,
                cost2: 500,
                cost3: 1000,
                cost4: 800,

            },
            // {
            //     key: '6',
            //     state: '加权后预期',
            //     cost1: 0,
            //     cost2: 0,
            //     cost3: 0,
            //     cost4: 0,

            // },

        ]);
        const count = computed(() => dataSource.value.length + 1);
        const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});

        const edit = (key: string) => {
            editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
        };
        const save = (key: string) => {
            Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
            delete editableData[key];
        };
        const cancel = (key: string) => {
            delete editableData[key];
        };
        const onDelete = (key: string) => {
            dataSource.value = dataSource.value.filter(item => item.key !== "0");
            dataSource.value = dataSource.value.filter(item => item.key !== key);
        };
        const handleAdd = () => {
            onDelete("0")
            const newData = {
                key: `${count.value}`+(new Date().getTime() / 1000+""),
                state: "0"+count.value.toString(),
                cost1: 0,
                cost2: 0,
                cost3: 0,
                cost4: 0,
            };
            dataSource.value.push(newData);

        };

        return {
            reflection,
            bestplan,
            columns,
            onDelete,
            handleAdd,
            dataSource,
            editableData,
            count,
            edit,
            save,
            cancel,
            hasSelected,
            ...toRefs(state),
            factor,

            // func
            start,
            onSelectChange,
        };
    },
});
</script>
<style lang="less">
.title {
    text-align: center;
    font-family: sans-serif;
    font-size: 30px;
}

.secondtitle {
    text-indent: 2em;
    font-weight: bold;
    margin-left: 30px;
    margin-right: 30px;
}

.content {
    text-indent: 2em;
    margin-left: 20px;
    margin-right: 20px;
}

.guidance {
    position: absolute;
    right: 50px;
    font-weight: bold;
}

.insure {
    margin-top: 20px;
    margin-left: 100px;
    font-weight: bold;
}
.input-number{
    font-weight: bold;
}
.editable-cell {
    position: relative;

    .editable-cell-input-wrapper,
    .editable-cell-text-wrapper {
        padding-right: 24px;
    }

    .editable-cell-text-wrapper {
        padding: 5px 24px 5px 5px;
    }

    .editable-cell-icon,
    .editable-cell-icon-check {
        position: absolute;
        right: 0;
        width: 20px;
        cursor: pointer;
    }

    .editable-cell-icon {
        margin-top: 4px;
        display: none;
    }

    .editable-cell-icon-check {
        line-height: 28px;
    }

    .editable-cell-icon:hover,
    .editable-cell-icon-check:hover {
        color: #108ee9;
    }

    .editable-add-btn {
        margin-bottom: 8px;
    }

}

.editable-cell:hover .editable-cell-icon {
    display: inline-block;
}
</style>