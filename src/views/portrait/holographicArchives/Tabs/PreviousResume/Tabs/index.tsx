import { defineComponent, getCurrentInstance, PropType, ref } from 'vue';
import './index.less';

export type TabType = 'year' | 'month' | 'details';
interface Tab {
  value: TabType;
  label: string;
}

export default defineComponent({
  props: {
    activeKey: {
      type: String as PropType<TabType>,
      default: 'year',
    },
  },
  emits: ['change'],
  setup(props) {
    const instance = getCurrentInstance();
    const tabList = ref<Tab[]>([
      {
        value: 'year',
        label: '年',
      },
      {
        value: 'month',
        label: '月',
      },
      {
        value: 'details',
        label: '详细',
      },
    ]);
    const hanldeActiveChange = (key: TabType) => {
      if (key !== props.activeKey) {
        instance!.emit('change', key);
      }
    };
    return {
      tabList,
      hanldeActiveChange,
    };
  },

  render() {
    const { activeKey, tabList, hanldeActiveChange } = this;
    return (
      <div class="previous-resume-tabs">
        <div class="header">
          {tabList.map((item) => {
            return (
              <div
                onClick={() => hanldeActiveChange(item.value)}
                class={`pane ${activeKey === item.value ? 'active' : ''}`}
              >
                {item.label}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
});
