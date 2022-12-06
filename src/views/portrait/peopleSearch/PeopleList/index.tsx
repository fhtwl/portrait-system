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
