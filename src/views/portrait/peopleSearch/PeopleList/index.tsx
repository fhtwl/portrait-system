import { defineComponent, ref } from 'vue';
import './index.less';
import { attitudeOptions, AttitudeType } from './PeopleItem/const';
import PeopleItem, { Item } from './PeopleItem';

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
    return {
      list,
    };
  },
  render() {
    const { list } = this;
    const handleClick = (value: Item) => {
      this.$router.push(`/portrait/holographicArchives?id=${value.id}`);
    };
    return (
      <div class="people-list">
        {list.map((item: Item) => {
          return (
            <PeopleItem onClick={(item) => handleClick(item)} value={item} />
          );
        })}
      </div>
    );
  },
});
