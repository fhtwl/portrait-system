import { defineComponent, ref } from 'vue';
import './index.less';
import ContentItem, { Item } from './ContentItem';
import Pagination from '@/components/Pagination';

const typeOptions = [
  {
    label: '话题',
    value: 1,
  },
  {
    label: '活动',
    value: 2,
  },
  {
    label: '事件',
    value: 3,
  },
];

const dateList = [
  { value: null, label: '全部' },
  { value: 2022, label: '2022' },
  { value: 2021, label: '2021' },
  { value: 2020, label: '2020' },
  { value: 2019, label: '2019' },
];

export default defineComponent({
  setup() {
    const type = ref(1);
    const date = ref<number | null>(null);
    const handleTypeChange = (value: number) => {
      type.value = value;
    };
    const handleDateClick = (value: number | null) => {
      date.value = value;
    };
    const data = ref<Item[]>([
      {
        id: 1,
        title: '阿里云发布应用负载均衡ALB 加速企业应用交付',
        date: '2020-11-24 10:00:00',
        user: 'AxureUX',
        pic: 'https://static.fhtwl.cc/upload/u283.png',
        status: 1,
      },
      {
        id: 2,
        title: '阿里云发布应用负载均衡ALB 加速企业应用交付',
        date: '2020-11-24 10:00:00',
        user: 'AxureUX',
        pic: 'https://static.fhtwl.cc/upload/u283.png',
        status: 2,
      },
      {
        id: 3,
        title: '阿里云发布应用负载均衡ALB 加速企业应用交付',
        date: '2020-11-24 10:00:00',
        user: 'AxureUX',
        pic: 'https://static.fhtwl.cc/upload/u283.png',
      },
      {
        id: 4,
        title: '阿里云发布应用负载均衡ALB 加速企业应用交付',
        date: '2020-11-24 10:00:00',
        user: 'AxureUX',
        pic: 'https://static.fhtwl.cc/upload/u283.png',
      },
    ]);
    const current = ref(1);
    const total = ref(4);
    const pageSize = ref(20);
    const handlePageChange = (page: number, size: number) => {
      console.log(page, size);
      current.value = page;
      pageSize.value = size;
    };
    return {
      type,
      handleTypeChange,
      handleDateClick,
      data,
      current,
      total,
      pageSize,
      handlePageChange,
    };
  },
  render() {
    const {
      type,
      handleTypeChange,
      handleDateClick,
      data,
      current,
      total,
      pageSize,
      handlePageChange,
    } = this;
    return (
      <div class="focus-on-activities">
        <a-tabs activeKey={type} onChange={handleTypeChange} size="large">
          {typeOptions.map((item) => {
            return <a-tab-pane key={item.value} tab={item.label}></a-tab-pane>;
          })}
        </a-tabs>
        <div class="footer">
          <div class="date-box">
            {dateList.map((item) => {
              return (
                <div
                  onClick={() => handleDateClick(item.value)}
                  class="date-item"
                >
                  {item.label}
                </div>
              );
            })}
          </div>
          <div class="content">
            {data.map((item) => {
              return <ContentItem data={item} />;
            })}
            <Pagination
              current={current}
              pageSize={pageSize}
              total={total}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  },
});
