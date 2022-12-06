import {
  defineComponent,
  getCurrentInstance,
  inject,
  onMounted,
  PropType,
} from 'vue';
import './index.less';

import * as echarts from 'echarts/core';
import { GaugeChart } from 'echarts/charts';

import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
} from 'echarts/components';

import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import Title from '../../../Title';

echarts.use([
  GaugeChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);
let chart: echarts.ECharts;

export default defineComponent({
  props: {
    total: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const instance = getCurrentInstance();
    onMounted(() => {
      change();
      window.addEventListener('resize', function () {
        chart.resize();
      });
    });
    // const echarts = inject("echarts")
    const change = () => {
      const dom = instance!.refs.pieRef;
      console.log(dom);
      chart = echarts.init(dom as HTMLElement);
      const options = {
        color: ['#88DB52', '#4EC8EA', '#C2802A', '#E15F76'],
        title: {
          text: `人民币\n\r${props.total}元`,

          textStyle: {
            fontSize: 14,
            color: '#fff',
            fontWeight: 'normal',
            lineHeight: 20,
          },
          top: '50%',
          left: '49%',
          textAlign: 'center',
          textVerticalAlign: 'center',
        },
        series: [
          {
            name: '收入情况',
            type: 'pie',
            radius: ['35%', '60%'],
            center: ['50%', '50%'],
            roseType: 'radius',
            // itemStyle: {
            //   borderRadius: 8,
            // },
            label: {
              normal: {
                // show: true,
                // position: 'center',
                color: '#fff',
                formatter: `{name|{b}}\n\r{total|{d}%}`,
                rich: {
                  name: {
                    fontSize: 14,
                  },
                  total: {
                    fontSize: 14,
                  },
                },
              },
              emphasis: {
                show: true,
              },
            },
            data: [
              { value: 40, name: '工资' },
              { value: 30, name: '私活' },
              { value: 20, name: '咨询' },
              { value: 10, name: '其他' },
            ],
          },
        ],
      };
      chart.setOption(options);
      chart.resize();
    };
  },
  render() {
    return (
      <div class="income">
        <Title title="收入情况" />
        <div ref="pieRef" class="chart" />
      </div>
    );
  },
});
