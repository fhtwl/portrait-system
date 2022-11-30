import { defineComponent } from 'vue';
import './index.less';

export default defineComponent({
  render() {
    return (
      <div class="border-horn-box">
        <div class="background"></div>
        <span class="left-top"></span>
        <span class="left-bottom"></span>
        <span class="right-up"></span>
        <span class="right-bottom"></span>
      </div>
    );
  },
});
