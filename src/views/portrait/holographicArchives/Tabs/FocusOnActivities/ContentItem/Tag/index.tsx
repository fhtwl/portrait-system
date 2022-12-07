import { defineComponent, PropType, ref } from 'vue';
import './index.less';

export type Type = 1 | 2;

interface TypeOption {
  label: string;
  value: Type;
  color: string;
}

const typeOptions: TypeOption[] = [
  {
    label: '置顶',
    value: 1,
    color: '#0A89E1',
  },
  {
    label: '热门',
    value: 2,
    color: '#D67185',
  },
];

export default defineComponent({
  props: {
    type: {
      type: Number as PropType<Type>,
      default: null,
    },
  },
  render() {
    const { type } = this;
    const option = typeOptions.find((item) => item.value === type);
    console.log(type, option);
    if (!option) {
      return false;
    }
    return (
      <div class="info-tag" style={{ background: option?.color }}>
        {option?.label}
      </div>
    );
  },
});
