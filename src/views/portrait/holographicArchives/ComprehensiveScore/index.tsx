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
  PolarComponent,
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
  PolarComponent,
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
      const getmax = 100;
      const color = {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: 'rgba(39, 223, 152, 1)',
          },

          {
            offset: 1,
            color: 'rgba(0,138,255,1)',
          },
        ],
      };
      const options = {
        angleAxis: {
          show: false,

          max: (getmax * 360) / 180, //-45度到225度，二者偏移值是270度除360度

          type: 'value',

          startAngle: 180, //极坐标初始角度

          splitLine: {
            show: false,
          },
        },

        barMaxWidth: 5, //圆环宽度

        radiusAxis: {
          show: false,
          type: 'category',
        },

        //圆环位置和大小

        polar: {
          center: ['50%', '50%'],

          radius: '130%',
        },

        series: [
          // {
          //   type: 'bar',

          //   data: [
          //     {
          //       //上层圆环，显示数据

          //       value: 45,

          //       itemStyle: {
          //         color: {
          //           type: 'linear',
          //           x: 0,
          //           y: 0,
          //           x2: 0,
          //           y2: 1,
          //           colorStops: [
          //             {
          //               offset: 0,
          //               color: 'rgba(39, 223, 152, 1)',
          //             },

          //             {
          //               offset: 1,
          //               color: 'rgba(139, 255, 215, 1)',
          //             },
          //           ],
          //         },
          //       },
          //     },
          //   ],

          //   barGap: '-100%', //柱间距离,上下两层圆环重合

          //   coordinateSystem: 'polar',

          //   roundCap: true, //顶端圆角

          //   z: 3, //圆环层级，同zindex
          // },

          // {
          //   //下层圆环，显示最大值

          //   type: 'bar',

          //   data: [
          //     {
          //       value: getmax,

          //       itemStyle: {
          //         color: '#fff',

          //         opacity: 0.2,

          //         borderWidth: 0,
          //       },
          //     },
          //   ],

          //   barGap: '-100%',

          //   coordinateSystem: 'polar',

          //   roundCap: true,

          //   z: 1,
          // },

          //仪表盘
          {
            radius: '90%',
            type: 'gauge',
            startAngle: 210,
            endAngle: -30,
            min: 0,
            max: 100,
            splitNumber: 10,
            itemStyle: {
              color,
              shadowColor: 'rgba(0,138,255,0.45)',
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
            },
            progress: {
              show: true,
              roundCap: true,
              width: 5,
            },
            pointer: {
              show: false,
            },
            axisLine: {
              roundCap: false,
              lineStyle: {
                width: 3,
              },
            },
            axisTick: {
              show: false,
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
              show: false,
            },
            data: [
              {
                value: 100,
              },
            ],
          },
          {
            type: 'gauge',
            radius: '96%',
            startAngle: 210,
            endAngle: -30,
            axisLine: {
              show: false,
            },

            splitLine: {
              show: false,
            },

            axisTick: {
              show: true,
            },

            axisLabel: {
              show: false,
            },

            splitLabel: {
              show: false,
            },

            pointer: {
              icon: 'circle', // 箭头图标
              length: '15%',
              width: 20,
              height: 20,
              offsetCenter: [0, '-82%'], // 箭头位置
              itemStyle: {
                color: '#fff', // 箭头颜色
                shadowColor: '#fff',
                shadowBlur: 10,
              },
            },
            z: 10,
            detail: {
              // backgroundColor: '#fff',
              borderColor: 'transparent',
              borderWidth: 2,
              width: '60%',
              lineHeight: 40,
              height: 40,
              borderRadius: 8,
              offsetCenter: [4, '5%'],
              valueAnimation: true,
              formatter: function (value: number) {
                return '{value|' + value.toFixed(0) + '}{unit|分}';
              },
              rich: {
                value: {
                  fontSize: 58,
                  fontWeight: 'bolder',
                  color: '#fff',
                },
                unit: {
                  fontSize: 12,
                  color: '#999',
                  padding: [0, 0, -20, 0],
                },
              },
            },
            data: [
              {
                value: 45,
              },
            ],
          },
          {
            type: 'gauge',
            radius: '100.5%',

            startAngle: 204,
            endAngle: -23,
            min: 0,
            max: 100,
            splitNumber: 100,
            axisLine: {
              roundCap: true,
              lineStyle: {
                width: 0,
                // color: '#cccccc',
              },
            },
            progress: {
              show: true,
              roundCap: true,
              width: 1,
            },
            itemStyle: {
              color,
              shadowColor: color,
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
              length: 1,
              lineStyle: {
                // color: '#cccccc',
                width: 1,
              },
            },
            axisLabel: {
              show: false,
            },
            title: {
              show: false,
            },
            pointer: {
              show: false,
            },
            data: [
              {
                value: 100,
              },
            ],
            detail: {
              show: false,
            },
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
