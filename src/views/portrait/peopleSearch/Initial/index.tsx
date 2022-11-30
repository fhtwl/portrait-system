import { defineComponent, ref } from 'vue';
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
    return <div class="initial"></div>;
  },
});
