import { defineComponent, ref } from 'vue';
import Search from './Search';
import Initial from './Initial';
import PeopleList from './PeopleList';
import Pagination from '@/components/Pagination';
import { Item } from './PeopleList/PeopleItem';
import './index.less';

export default defineComponent({
  setup() {
    const list = ref<Item[]>([
      {
        pic: 'https://static.fhtwl.cc/upload/u283.png',
        name: '汪淼',
        attitude: 0,
        id: 0,
        tags: [],
      },
      {
        pic: 'https://static.fhtwl.cc/upload/u283.png',
        name: '汪淼',
        attitude: 0,
        id: 1,
        tags: [],
      },
      {
        pic: 'https://static.fhtwl.cc/upload/u283.png',
        name: '汪淼',
        attitude: 0,
        id: 2,
        tags: [],
      },
      {
        pic: 'https://static.fhtwl.cc/upload/u283.png',
        name: '汪淼',
        attitude: 0,
        id: 3,
        tags: [],
      },
      {
        pic: 'https://static.fhtwl.cc/upload/u283.png',
        name: '汪淼',
        attitude: 0,
        id: 4,
        tags: [],
      },
      {
        pic: 'https://static.fhtwl.cc/upload/u283.png',
        name: '汪淼',
        attitude: 0,
        id: 5,
        tags: [],
      },
      {
        pic: 'https://static.fhtwl.cc/upload/u283.png',
        name: '汪淼',
        attitude: 0,
        id: 6,
        tags: [],
      },
      {
        pic: 'https://static.fhtwl.cc/upload/u283.png',
        name: '汪淼',
        attitude: 0,
        id: 7,
        tags: [],
      },
    ]);
    const current = ref(1);
    const pageSize = ref(33);
    const total = ref(8);
    const handlePageChange = (page: number, size: number) => {
      console.log(page, size);
      current.value = page;
      pageSize.value = size;
    };
    return {
      current,
      pageSize,
      total,
      handlePageChange,
      list,
    };
  },
  render() {
    const { current, pageSize, total, handlePageChange, list } = this;
    return (
      <div class="body-wrap">
        <a-datePicker></a-datePicker>
        <Search />
        <Initial />
        <PeopleList list={list} />
        <div class="total">
          共<span>{total}</span>条数据
        </div>
        <Pagination
          current={current}
          pageSize={pageSize}
          total={total}
          showSizeChanger={false}
          showTotal={() => ''}
          onChange={handlePageChange}
        />
      </div>
    );
  },
});
