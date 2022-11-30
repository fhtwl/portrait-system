import { defineComponent, PropType, ref } from 'vue';
import './index.less';
import { attitudeOptions, AttitudeType } from './const';
import BorderHornBox from '@/components/BorderHornBox';

export interface Item {
  pic: string;
  name: string;
  attitude: AttitudeType;
  id: number | string;
}

export default defineComponent({
  props: {
    value: {
      type: Object as PropType<Item>,
      default: () => {},
    },
  },
  emits: ['click'],
  render() {
    const { value } = this;
    const handleClick = (value: Item) => {
      this.$emit('click', value);
    };
    const color = attitudeOptions.find(
      (option) => option.value === value.attitude
    )?.color;
    const bg = {
      background: `linear-gradient(${color}, #333)`,
    };
    const borderColor = {
      'border-color': color,
    };
    return (
      <div class="item" onClick={() => handleClick(value)} style={borderColor}>
        <BorderHornBox />
        <div class="pic">
          <img src={value.pic} alt="" />
        </div>
        <div class="name" style={bg}>
          {value.name}
        </div>
      </div>
    );
  },
});
