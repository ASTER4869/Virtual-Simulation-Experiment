<template>
    <div id="pdf-content">
        <h1 class="title">实验9 基于最大最大法的软件项目/产品的不确定性实验

        </h1>
        <hr />
        <!-- <span> {{ test }}</span> -->
        <h2>一、实验目的</h2>
        <p class="recontent">
            本实验旨在使用最大最大法评估软件项目/产品开发中的不确定性，并探讨不同因素对于不确定性的影响。 本实验为课内设计性实验项目，实验学时 1 学时，完成实验报告 1 学时。
        </p>
        <h2>二、实验内容</h2>
        <p class="recontent">
            使用最大最大法，探究不同估计方法下的方法选择。具体实验步骤如下：
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
        <h3 class="subtitle-content">1.最大最大法</h3>
        <p class="content">
            最大最大法是决策者抱着最乐观的想法，从各方案最有利结果中选取最大值，该数值所对应的行动作为最优行动方案。

        </p>
        <h2>四、实验步骤</h2>
        <p class="content">
            1. 实验开始，填写实验数据
        </p>
        <div>

            <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">Add</a-button>
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
    </div>
    <a-button style="margin-bottom: 8px" @click="downloadPdf"> 导出</a-button>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs } from 'vue';
import type { Ref, UnwrapRef } from 'vue';
import { CheckOutlined, EditOutlined } from '@ant-design/icons-vue';
import { cloneDeep, max } from 'lodash-es';
import { message, Modal } from 'ant-design-vue'
import html2pdf from 'html2pdf.js';

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
    methods: {
        downloadPdf() {
            const element = document.getElementById('pdf-content');
            const opt = {
                // 转换后的pdf的外边距分别为：上: 10px、右: 20px、下: 10px、左:20px
                margin: [10, 20, 10, 20],
                filename: '最大最大法.pdf',
                image: { type: 'jpeg', quality: 1 },
                html2canvas: { scale: 5 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            // 调用html2pdf库的方法生成PDF文件并下载
            html2pdf().from(element).set(opt).save();
        }
    },
    setup() {
        const bestplan = ref<string>('');
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
                key: `${count.value}` + (new Date().getTime() / 1000 + ""),
                state: "0" + count.value.toString(),
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
    margin-left: 50px;
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