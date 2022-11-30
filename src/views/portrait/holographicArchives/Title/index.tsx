import { defineComponent } from 'vue';
import './index.less';

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '',
    },
  },

  render() {
    return <div class="info-title">{this.title}</div>;
  },
});
