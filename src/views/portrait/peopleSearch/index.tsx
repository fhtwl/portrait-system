import { defineComponent } from 'vue';
import Search from './Search';
import Initial from './Initial';
import PeopleList from './PeopleList';

export default defineComponent({
  setup() {
    return {};
  },
  render() {
    return (
      <div class="body-wrap">
        <Search />
        <Initial />
        <PeopleList />
      </div>
    );
  },
});
