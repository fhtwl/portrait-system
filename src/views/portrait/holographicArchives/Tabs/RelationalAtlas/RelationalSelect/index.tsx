import { defineComponent, getCurrentInstance, PropType, ref } from 'vue';
import './index.less';

export type TabType = null | 1 | 2 | 3;
export interface Tab {
  value: TabType;
  label: string;
}

export default defineComponent({
  props: {
    activeKey: {
      type: Number as PropType<TabType>,
      default: null,
    },
  },
  emits: ['change'],
  setup(props) {
    const instance = getCurrentInstance();
    const tabList = ref<Tab[]>([
      {
        value: null,
        label: '全部关系',
      },
      {
        value: 1,
        label: '沟通渠道',
      },

      {
        value: 2,
        label: '现实关系',
      },
      {
        value: 3,
        label: '网络关系',
      },
    ]);
    const hanldeActiveChange = (key: TabType, node: Tab) => {
      if (key !== props.activeKey) {
        instance!.emit('change', key, node);
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
      <div class="relational-select">
        {tabList.map((item) => {
          return (
            <div
              onClick={() => hanldeActiveChange(item.value, item)}
              class={`relational-item ${
                activeKey === item.value ? 'active' : ''
              }`}
            >
              {item.label}
            </div>
          );
        })}
      </div>
    );
  },
});
