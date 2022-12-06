import { defineComponent, ref } from 'vue';
import BasicInfo from './BasicInfo';
import EmotionalAnalysis from './EmotionalAnalysis';
import './index.less';
import PreviousResume from './PreviousResume';

type TabType = 'basicInfo' | 'previousResume' | 'emotionalAnalysis';
interface Tab {
  value: TabType;
  label: string;
}

export default defineComponent({
  setup() {
    const activeKey = ref<TabType>('basicInfo');
    const tabList = ref<Tab[]>([
      {
        value: 'basicInfo',
        label: '基本信息',
      },
      {
        value: 'previousResume',
        label: '过往履历',
      },
      {
        value: 'emotionalAnalysis',
        label: '情感分析',
      },
    ]);
    const hanldeActiveChange = (key: TabType) => {
      if (key !== activeKey.value) {
        activeKey.value = key;
      }
    };
    return {
      activeKey,
      tabList,
      hanldeActiveChange,
    };
  },
  methods: {
    renderContent() {
      switch (this.activeKey) {
        case 'basicInfo':
          return <BasicInfo />;
        case 'previousResume':
          return <PreviousResume />;
        case 'emotionalAnalysis':
          return <EmotionalAnalysis />;
        default:
          return null;
      }
    },
  },
  render() {
    const { activeKey, tabList, hanldeActiveChange, renderContent } = this;
    return (
      <div class="tabs">
        <div class="tab-header">
          {tabList.map((item) => {
            return (
              <div
                onClick={() => hanldeActiveChange(item.value)}
                class={`tab-pane ${activeKey === item.value ? 'active' : ''}`}
              >
                {item.label}
              </div>
            );
          })}
        </div>
        <div class="tab-content">{renderContent()}</div>
      </div>
    );
  },
});
