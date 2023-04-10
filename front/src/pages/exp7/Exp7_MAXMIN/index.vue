<template>
      <h1 class="title" >实验1 基于COSMIC的小型软件项目规模度量实验
      
      <span>  <el-button  class="guidance" type="primary" text  @click="" ><el-icon size="25px"><Document /></el-icon>实验指导书下载</el-button></span> 
  </h1>
  <hr />
  <!-- <span> {{ test }}</span> -->
  <h2>一、实验目的  </h2>
  <p class="content">理解软件项目规模度量功能点法原理，通过实验操作掌握功能点法。 学生应以小组为单位，根据本小组“软件工程管理与经济”课程设计项目架构及组件等设计成果，以功能点方法测量该项目的规模(功能点数量)。 建议选用某一种功能点方法度量课程设计项目的功能点，并采用另外一种功能点方法或其他的软件规模度量方法对前一种方法的度量结果进行验证。 本实验为课内设计性实验项目，实验学时 1 学时，完成实验报告 1 学时。
  </p>
  <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">Add</a-button>

  
  <a-table bordered 
  :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
  :data-source="dataSource" :columns="columns" :pagination="false">
    <template #bodyCell="{ column, text, record }">
      <template v-if="['plan', 'cost1', 'cost2','cost3','cost4','cost5',].includes(column.dataIndex)">
        <div>
          <a-input
            v-if="editableData[record.key]"
            v-model:value="editableData[record.key][column.dataIndex]"
            style="margin: -5px 0"
          />
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
        <a-popconfirm
          v-if="dataSource.length"
          title="Sure to delete?"
          @confirm="onDelete(record.key)"
        >
          <a>Delete</a>
        </a-popconfirm>
      </template>
    </template>
  </a-table>

  <a-button class="insure" type="primary"  :disabled="!hasSelected" :loading="loading" @click="start">
    确认
  </a-button>

</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref , toRefs} from 'vue';
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
  plan: string;
  cost1: number;
  cost2: number;
  cost3: number;
  cost4: number;
  cost5: number;
}

export default defineComponent({
  components: {
    CheckOutlined,
    EditOutlined,
  },
  setup() {
    const state = reactive<{
      selectedRowKeys: Key[];
      loading: boolean;
    }>({
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
    });
    const hasSelected = computed(() => state.selectedRowKeys.length > 0);

    const start = () => {
      if(state.selectedRowKeys.length>1)
      {
        message.info('仅可选择一个');
      }
      else{

                    // ajax request after empty completing
          setTimeout(() => {
            let MAX_Key=Math.max(dataSource.value[state.selectedRowKeys[0]].cost1,
            dataSource.value[state.selectedRowKeys[0]].cost2,
            dataSource.value[state.selectedRowKeys[0]].cost3,
            dataSource.value[state.selectedRowKeys[0]].cost4,
            dataSource.value[state.selectedRowKeys[0]].cost5)
            // if(state.selectedRowKeys[0].cost1)
          let s_state=0
          dataSource.value.forEach(function (item) {
            if(MAX_Key<Math.max(item.cost1,item.cost2,item.cost3,item.cost4,item.cost5))
            {
              s_state=1
            }

          })
          if(s_state==0)
          {
            message.success('最大最大法所选方案正确');
          }
          else
          {
            message.error('选择错误');
          }

        }, 1000);
        

    }
    };
    const onSelectChange = (selectedRowKeys: Key[]) => {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      state.selectedRowKeys = selectedRowKeys;
    };




    const columns = [
      {
        title: '方案\\状态',
        dataIndex: 'plan',
        width: '10%',
      },
      {
        title: '01',
        dataIndex: 'cost1',
      },
      {
        title: '02',
        dataIndex: 'cost2',
      },
      {
        title: '03',
        dataIndex: 'cost3',
      },
      {
        title: '04',
        dataIndex: 'cost4',
      },
      {
        title: '05',
        dataIndex: 'cost5',
      },
      {
        title: 'operation',
        dataIndex: 'operation',
      },
    ];
    const dataSource: Ref<DataItem[]> = ref([
      {
        key: '0',
        plan: '方案A',
        cost1: -900,
        cost2: 300,
        cost3: -200,
        cost4: 1800,
        cost5: 700,

      },
      {
        key: '1',
        plan: '方案B',
        cost1: -550,
        cost2: 400,
        cost3: 50,
        cost4: 1500,
        cost5: 500,

      },
      {
        key: '2',
        plan: '方案C',
        cost1: -200,
        cost2: 250,
        cost3: 300,
        cost4: 1200,
        cost5: 1000,

      },
      {
        key: '3',
        plan: '方案D',
        cost1: -100,
        cost2: 200,
        cost3: 150,
        cost4: 900,
        cost5: 800,

      },

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
      dataSource.value = dataSource.value.filter(item => item.key !== key);
    };
    const handleAdd = () => {
      const newData = {
        key: `${count.value}`,
        plan:`方案`+String.fromCharCode(count.value + 64)  ,
        cost1: 0,
        cost2: 0,
        cost3: 0,
        cost4: 0,
        cost5: 0,
      };
      dataSource.value.push(newData);
    };

    return {
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
.title{
    text-align:center;
    font-family: sans-serif;
    font-size:30px;
}
.secondtitle{
    text-indent: 2em;
    font-weight: bold;
    margin-left: 30px;
    margin-right: 30px;
}
.content{
    text-indent: 2em;
    margin-left: 20px;
    margin-right: 20px;
}
.guidance{
    position:absolute;
    right:50px;
    font-weight: bold;
}
.insure{
    margin-top:20px;
    right:50px;
    margin-left: 50px;
    position:absolute;
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