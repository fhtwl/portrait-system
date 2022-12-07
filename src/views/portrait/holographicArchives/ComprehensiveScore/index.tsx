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
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption,
} from 'echarts/components';

import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

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
  setup() {
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
        series: [
          {
            type: 'gauge',
            startAngle: 210,
            endAngle: -30,
            min: 0,
            max: 100,
            splitNumber: 10,
            itemStyle: {
              color: '#58D9F9',
              shadowColor: 'rgba(0,138,255,0.45)',
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
            },
            progress: {
              show: true,
              roundCap: true,
              width: 3,
            },
            pointer: {
              // icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
              length: '70%',
              width: 2,
              offsetCenter: [0, '5%'],
              itemStyle: {
                color: '#fff',
                // borderColor: '#fff',
                // borderCap: 'round',
                // borderWidth: 10,
                shadowColor: '#fff',
                shadowBlur: 10,
              },
            },
            axisLine: {
              roundCap: true,
              lineStyle: {
                width: 3,
              },
            },
            axisTick: {
              splitNumber: 5,
              lineStyle: {
                width: 1,
                color: '#999',
              },
            },
            splitLine: {
              length: 12,
              lineStyle: {
                width: 0,
                color: '#999',
              },
            },
            axisLabel: {
              distance: 30,
              color: '#999',
              fontSize: 15,
              show: false,
            },
            title: {
              show: false,
            },
            detail: {
              // backgroundColor: '#fff',
              borderColor: 'transparent',
              borderWidth: 2,
              width: '60%',
              lineHeight: 40,
              height: 40,
              borderRadius: 8,
              offsetCenter: [10, '42%'],
              valueAnimation: true,
              formatter: function (value: number) {
                return '{value|' + value.toFixed(0) + '}{unit|分}';
              },
              rich: {
                value: {
                  fontSize: 40,
                  fontWeight: 'bolder',
                  color: '#fff',
                },
                unit: {
                  fontSize: 12,
                  color: '#999',
                  padding: [0, 0, -20, 10],
                },
              },
            },
            data: [
              {
                value: 45,
              },
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
      <div class="score">
        <div ref="pieRef" class="chart" />
      </div>
    );
  },
});
