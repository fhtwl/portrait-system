import { defineComponent, PropType, ref } from 'vue';
import './index.less';
import Tag, { Type } from './Tag';

export interface Item {
  id: number;
  title: string;
  date: string;
  user: string;
  pic: string;
  status?: Type;
}

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<Item>,
      default: () => {},
    },
  },
  setup() {
    const type = ref(1);
    const date = ref<number | null>(null);
    const handleTypeChange = (value: number) => {
      type.value = value;
    };
    const handleDateClick = (value: number | null) => {
      date.value = value;
    };
    return {
      type,
      handleTypeChange,
      handleDateClick,
    };
  },
  render() {
    const { data } = this;
    return (
      <div class="focus-on-activities-item">
        <div class="pic">
          <img src={data.pic} alt="" />
        </div>
        <div class="text-content">
          <div class="title">
            <div class="text">{data.title}</div>
            <lock-outlined />
            <Tag type={data.status} style="margin-left: 10px" />
          </div>
          <div class="info">
            <div class="user">{data.user}</div>
            <div class="date">
              <clock-circle-outlined class="icon" />
              {data.date}
            </div>
          </div>
        </div>
      </div>
    );
  },
});
