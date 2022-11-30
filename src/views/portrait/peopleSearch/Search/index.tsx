import { defineComponent, ref } from 'vue';
import SearchButtons from '@/components/SearchButtons';
import './index.less';

export default defineComponent({
  setup() {
    const name = ref('');
    return {
      name,
    };
  },
  render() {
    const { name } = this;
    return (
      <div class="search">
        <a-input placeholder="请输入" value={name}></a-input>
        <SearchButtons />
      </div>
    );
  },
});
