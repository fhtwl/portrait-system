import { defineComponent, ref } from 'vue';
import PeopleItem, { Item } from '../peopleSearch/PeopleList/PeopleItem';
import Title from './Title';
import './index.less';
import TotalBox from './TotalBox';
import Tabs from './Tabs';
import Tags from './Tags';
import ComprehensiveScore from './ComprehensiveScore';

export default defineComponent({
  setup() {
    const info = ref<Item>({
      pic: 'https://static.fhtwl.cc/upload/u283.png',
      name: '汪淼',
      attitude: 0,
      id: 0,
      tags: [
        '年轻X派',
        '××精英出生',
        '××核心人员',
        '××机构人员',
        '××家庭',
        '家庭关系和睦',
        '×××组织背景',
      ],
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
            <div class="top-right">
              <Title title="综合评价" />
              <Tags tags={info.tags} />
            </div>
          </div>
          <div class="right">
            <div class="box comprehensive-score">
              <Title title="综合分" />
              <ComprehensiveScore />
            </div>
            <TotalBox class="box" />
          </div>
        </div>
        <Tabs />
      </div>
    );
  },
});
