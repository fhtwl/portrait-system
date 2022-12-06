import { GraphData } from '@antv/g6';
import { defineComponent, getCurrentInstance, onMounted, ref } from 'vue';
import './index.less';
import Tabs, { Tab, TabType } from './Tabs';
import Chart from './Chart';
import RelationalSelect, {
  TabType as RelationalTabType,
} from './RelationalSelect';
import Minimap from './Minimap';

const data: GraphData = {
  nodes: [
    {
      id: '0',
      label: '张三',
      nodeType: 'user',
    },
    {
      id: '0-relationship-0',
      label: '亲属关系',
      nodeType: 'relationship',
    },
    {
      id: '0-relationship-1',
      label: '社群关系',
      nodeType: 'relationship',
    },
    {
      id: '0-relationship-2',
      label: '工作关系',
      nodeType: 'relationship',
    },
    {
      id: '0-relationship-3',
      label: '业务关系',
      nodeType: 'relationship',
    },
    {
      id: '0-relationship-4',
      label: '社会活动关系',
      nodeType: 'relationship',
    },
    {
      id: '0-relationship-5',
      label: '网络社交关系关系',
      nodeType: 'relationship',
    },
    {
      id: '0-relationship-6',
      label: '朋友',
      nodeType: 'relationship',
    },
    {
      id: '1',
      label: '李四',
      nodeType: 'user',
    },
    {
      id: '2',
      label: '王五',
      nodeType: 'user',
    },
    {
      id: '3',
      label: '马六',
      nodeType: 'user',
    },
    {
      id: '4',
      label: '张三1',
      nodeType: 'user',
    },
    {
      id: '5',
      label: '张三2',
      nodeType: 'user',
    },
    {
      id: '2-relationship-0',
      label: '亲属关系',
      nodeType: 'relationship',
    },
    {
      id: '6',
      label: '王五1',
      nodeType: 'user',
    },
  ],
  edges: [
    {
      source: '0',
      target: '0-relationship-0',
    },
    {
      source: '0',
      target: '0-relationship-1',
    },
    {
      source: '0',
      target: '0-relationship-2',
    },
    {
      source: '0',
      target: '0-relationship-3',
    },
    {
      source: '0',
      target: '0-relationship-4',
    },
    {
      source: '0',
      target: '0-relationship-5',
    },
    {
      source: '0',
      target: '0-relationship-6',
    },
    {
      source: '0-relationship-6',
      target: '1',
      label: '好朋友',
    },
    {
      source: '0-relationship-6',
      target: '2',
      label: '一般朋友',
    },
    {
      source: '0-relationship-0',
      target: '4',
      label: '儿子',
    },
    {
      source: '0-relationship-0',
      target: '5',
      label: '女儿',
    },
    {
      source: '0-relationship-5',
      target: '3',
      label: '网友',
    },
    {
      source: '2',
      target: '2-relationship-0',
    },
    {
      source: '2-relationship-0',
      target: '6',
      label: '儿子',
    },
  ],
  id: 'view',
};
export default defineComponent({
  setup() {
    const instance = getCurrentInstance();
    const activeKey = ref<TabType>('radial');
    const level = ref<number>(3);
    const relationalType = ref<RelationalTabType>(null);
    const isShow = ref(false);
    let chart: Chart;
    onMounted(() => {
      chart = new Chart(instance!.refs.view as HTMLElement, data);
      chart.updateMinimap(false);
    });
    const handleChange = (tabType: TabType, tab: Tab) => {
      activeKey.value = tabType;
      chart.updateLayout(tab.config);
    };
    const handleLevelChange = (num: number) => {
      level.value = num;
    };
    const handleRelationalTypeChange = (num: RelationalTabType) => {
      relationalType.value = num;
    };
    const handleMinimapChange = (value: boolean) => {
      console.log(value);
      isShow.value = value;
      chart.updateMinimap(value);
    };
    return {
      activeKey,
      handleChange,
      level,
      handleLevelChange,
      relationalType,
      handleRelationalTypeChange,
      isShow,
      handleMinimapChange,
    };
  },
  render() {
    const {
      activeKey,
      handleChange,
      level,
      handleLevelChange,
      relationalType,
      handleRelationalTypeChange,
      isShow,
      handleMinimapChange,
    } = this;
    return (
      <div class="relational-atlas">
        <Tabs
          activeKey={activeKey}
          level={level}
          onChange={handleChange}
          onLevelChange={handleLevelChange}
        />
        <RelationalSelect
          activeKey={relationalType}
          onChange={handleRelationalTypeChange}
        />
        <Minimap isShow={isShow} onChange={handleMinimapChange} />
        <div class="view" ref="view"></div>
      </div>
    );
  },
});
