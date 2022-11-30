import { ReloadOutlined, SearchOutlined } from '@ant-design/icons-vue';
import { defineComponent, getCurrentInstance, ref } from 'vue';
import './index.less';

export default defineComponent({
  emits: ['ok', 'cancel'],
  setup() {
    const instance = getCurrentInstance();
    const loading = ref(false);
    const handleClick = () => {
      new Promise((resolve) => {
        loading.value = true;
        instance?.emit('search', resolve);
      }).then(() => {
        loading.value = false;
      });
    };
    const handleReset = () => {
      instance?.emit('reset');
    };
    return {
      loading,
      handleClick,
      handleReset,
    };
  },
  render() {
    const { loading, handleClick, handleReset } = this;

    return (
      <div class="search-buttons">
        <a-button
          loading={loading}
          icon={<SearchOutlined />}
          type="primary"
          class="button"
          click={handleClick}
        >
          查询
        </a-button>
        <a-button
          onClick={handleReset}
          class="button"
          icon={<ReloadOutlined />}
        >
          重置
        </a-button>
        <slot></slot>
      </div>
    );
  },
});
