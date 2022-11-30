import { defineComponent, ref } from 'vue';
import BasicInfo from './BasicInfo';
import EmotionalAnalysis from './EmotionalAnalysis';
import './index.less';
import SimilarityAnalysis from './SimilarityAnalysis';

type TabType = 'basicInfo' | 'similarityAnalysis' | 'emotionalAnalysis';
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
        value: 'similarityAnalysis',
        label: '相似度分析',
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
        case 'similarityAnalysis':
          return <SimilarityAnalysis />;
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
