import { defineComponent, PropType, ref } from 'vue';
import './index.less';
import PeopleItem, { Item } from './PeopleItem';

export default defineComponent({
  props: {
    list: {
      type: Array as PropType<Item[]>,
      default: () => [],
    },
  },
  setup() {},
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
