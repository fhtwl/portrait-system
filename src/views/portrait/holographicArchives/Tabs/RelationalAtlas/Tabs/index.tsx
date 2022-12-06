import { defineComponent, getCurrentInstance, PropType, ref } from 'vue';
import './index.less';
import layoutRadial from '@/assets/images/layout-radial.png';
import layoutTop from '@/assets/images/layout-top.png';
import layoutLeft from '@/assets/images/layout-left.png';
import layoutRight from '@/assets/images/layout-right.png';
import layoutBottom from '@/assets/images/layout-bottom.png';

import layoutRadialActive from '@/assets/images/layout-radial_active.png';
import layoutTopActive from '@/assets/images/layout-top_active.png';
import layoutLeftActive from '@/assets/images/layout-left_active.png';
import layoutRightActive from '@/assets/images/layout-right_active.png';
import layoutBottomActive from '@/assets/images/layout-bottom_active.png';

export type TabType = 'dagre' | 'TB' | 'RL' | 'LR' | 'BT' | 'radial';
export interface Tab {
  value: TabType;
  label: string;
  icon?: string;
  activeIcon?: string;
  config: {
    [propName: string]: unknown;
  };
}

const levelOptions = [
  {
    value: 1,
    label: '一层',
  },
  {
    value: 2,
    label: '二层',
  },
  {
    value: 3,
    label: '三层',
  },
  {
    value: 4,
    label: '四层',
  },
  {
    value: 5,
    label: '五层',
  },
  {
    value: null,
    label: '其它',
  },
];

export default defineComponent({
  props: {
    activeKey: {
      type: String as PropType<TabType>,
      default: 'year',
    },
    level: {
      type: Number,
      default: null,
    },
  },
  emits: ['change', 'levelChange'],
  setup(props) {
    const instance = getCurrentInstance();
    const tabList = ref<Tab[]>([
      {
        value: 'radial',
        label: '随机',
        icon: layoutRadial,
        activeIcon: layoutRadialActive,
        config: {
          type: 'concentric',
        },
      },
      {
        value: 'TB',
        label: '从上往下', // 层次布局
        icon: layoutTop,
        activeIcon: layoutTopActive,
        config: {
          type: 'dagre',
          rankdir: 'TB',
        },
      },

      {
        value: 'RL',
        label: '从右往左',
        icon: layoutRight,
        activeIcon: layoutRightActive,
        config: {
          type: 'dagre',
          rankdir: 'RL',
        },
      },
      {
        value: 'LR',
        label: '从左往右',
        icon: layoutLeft,
        activeIcon: layoutLeftActive,
        config: {
          type: 'dagre',
          rankdir: 'LR',
        },
      },
      {
        value: 'BT',
        label: '从下往上', // 层次布局
        icon: layoutBottom,
        activeIcon: layoutBottomActive,
        config: {
          type: 'dagre',
          rankdir: 'BT',
        },
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
    const { activeKey, tabList, hanldeActiveChange, level } = this;

    return (
      <div class="previous-resume-tabs">
        <div class="header">
          {tabList.map((item) => {
            return (
              <div
                onClick={() => hanldeActiveChange(item.value, item)}
                class={`tab-item ${activeKey === item.value ? 'active' : ''}`}
              >
                <img
                  src={activeKey === item.value ? item.activeIcon : item.icon}
                  alt=""
                />
              </div>
            );
          })}
          <a-select
            value={level}
            options={levelOptions}
            size="large"
            onChange={(value: number) => this.$emit('levelChange', value)}
          ></a-select>
        </div>
      </div>
    );
  },
});
