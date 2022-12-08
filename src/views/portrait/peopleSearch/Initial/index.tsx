import { defineComponent, ref } from 'vue';
import { attitudeOptions } from '../PeopleList/PeopleItem/const';
import './index.less';

export default defineComponent({
  setup() {
    const list = ref([
      {
        label: 'A-E',
        value: 'A-E',
      },
      {
        label: 'F-H',
        value: 'F-H',
      },
      {
        label: 'K-O',
        value: 'K-O',
      },
      {
        label: 'P-T',
        value: 'P-T',
      },
      {
        label: 'U-Z',
        value: 'U-Z',
      },
    ]);
    const activeKey = ref('A-E');
    const hanldeActiveChange = (key: string) => {
      if (key !== activeKey.value) {
        activeKey.value = key;
      }
    };

    return {
      list,
      hanldeActiveChange,
      activeKey,
    };
  },
  render() {
    const { list, hanldeActiveChange, activeKey } = this;

    return (
      <div class="initial tabs">
        <div class="tab-header">
          {list.map((item) => {
            return (
              <div
                onClick={() => hanldeActiveChange(item.value)}
                class={`tab-pane ${activeKey === item.value ? 'active' : ''}`}
              >
                {item.label}
              </div>
            );
          })}

          <div class="right">
            {attitudeOptions.map((item) => {
              return (
                <div class="attitude-item">
                  <div class="color" style={{ background: item.color }}></div>
                  <div class="label">{item.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  },
});
