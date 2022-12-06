import { defineComponent, getCurrentInstance, ref } from 'vue';
import './index.less';
import open from '@/assets/images/u1503.svg';
import close from '@/assets/images/u1505.svg';

export type TabType = null | 1 | 2 | 3;
export interface Tab {
  value: TabType;
  label: string;
}

export default defineComponent({
  props: {
    isShow: {
      type: Boolean,
      default: null,
    },
  },
  emits: ['change', 'levelChange'],
  setup(props) {
    const instance = getCurrentInstance();

    const hanldeChange = (value: boolean) => {
      instance!.emit('change', value);
    };
    return {
      hanldeChange,
    };
  },

  render() {
    const { isShow, hanldeChange } = this;

    return (
      <div class="minimap-box">
        {
          <img
            onClick={() => hanldeChange(!isShow)}
            src={isShow ? close : open}
            alt=""
          />
        }
      </div>
    );
  },
});
