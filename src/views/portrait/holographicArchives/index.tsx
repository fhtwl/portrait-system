import { defineComponent, ref } from 'vue';
import PeopleItem, { Item } from '../peopleSearch/PeopleList/PeopleItem';
import Title from './Title';
import './index.less';
import TotalBox from './TotalBox';
import Tabs from './Tabs';

export default defineComponent({
  setup() {
    const info = ref<Item>({
      pic: 'https://static.fhtwl.cc/upload/u283.png',
      name: '汪淼',
      attitude: 0,
      id: 0,
    });
    return {
      info,
    };
  },
  render() {
    const { info } = this;
    return (
      <div class="body-wrap holographic-archives">
        <div class="top">
          <div class="box left">
            <PeopleItem value={info} />
            <div class="right">
              <Title title="综合评价" />
            </div>
          </div>
          <div class="right">
            <div class="box comprehensive-score">
              <Title title="综合分" />
            </div>
            <TotalBox class="box" />
          </div>
        </div>
        <Tabs />
      </div>
    );
  },
});
