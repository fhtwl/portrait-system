import { defineComponent, PropType } from 'vue';
import { Tag } from '../../peopleSearch/PeopleList/PeopleItem';
import './index.less';

export default defineComponent({
  props: {
    tags: {
      type: Array as PropType<Tag[]>,
      default: () => [],
    },
  },

  render() {
    const { tags } = this;
    return (
      <div class="tags">
        {tags.map((item) => {
          return <div class="tag">{item}</div>;
        })}
      </div>
    );
  },
});
