import { defineComponent, getCurrentInstance, onMounted, ref } from 'vue';
import './index.less';

import * as echarts from 'echarts/core';
import { ScatterChart } from 'echarts/charts';

import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  DataZoomComponent,
} from 'echarts/components';

import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import Tabs, { TabType } from './Tabs';

echarts.use([
  DataZoomComponent,
  ScatterChart,
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
    const activeKey = ref<TabType>('year');
    onMounted(() => {
      change();
      window.addEventListener('resize', function () {
        chart.resize();
      });
    });
    // const echarts = inject("echarts")
    const data = [
      {
        date: '2022.04.27',
        content: '参加某捐赠活动',
        type: '教育经历',
      },
      {
        date: '2021.09.27',
        content: '某社交平台发布某话题',
        type: '网络活动经历',
      },
      {
        date: '2021.09.27',
        content: '某社交平台发布某话题',
        type: '网络活动经历',
      },
      {
        date: '2021.03.27',
        content: 'B平台点赞某言论',
        type: '网络活动经历',
      },
      {
        date: '2020.09.27',
        content: '从某学校毕业',
        type: '教育经历',
      },
      {
        date: '2020.02.17',
        content: '某学院学习',
        type: '教育经历',
      },
      {
        date: '2020.02.17',
        content: '某社交平台发布某话题',
        type: '网络活动经历',
      },
      {
        date: '2019.09.27',
        content: 'C集团担任领导职务',
        type: '任职经历',
      },
      {
        date: '2019.09.07',
        content: 'B平台点赞某言论',
        type: '网络活动经历',
      },
      {
        date: '2019.05.07',
        content: '卸任D集团领导职务',
        type: '任职经历',
      },
      {
        date: '2019.05.01',
        content: '受优秀青年奖章',
        type: '其它经历',
      },
      {
        date: '2019.02.13',
        content: '与某某结婚',
        type: '其它经历',
      },
      {
        date: '2019.01.23',
        content: '参加某捐赠活动',
        type: '社会活动经历',
      },
      {
        date: '2019.01.23',
        content: '参加某捐赠活动',
        type: '社会活动经历',
      },
    ];

    const change = () => {
      const dom = instance!.refs.pieRef;
      console.log(dom);
      const xData = [
        ...new Set(
          data.map((item) => {
            return item.type;
          })
        ),
      ];
      const yData = [
        ...new Set(
          data.map((item) => {
            return item.date;
          })
        ),
      ];
      const seriesData = data.map((item) => {
        return {
          name: item.content,
          value: [item.type, item.date],
        };
      });
      console.log(xData, yData, seriesData);
      const lineStyle = {
        color: '#05CC69',
        opacity: 0.4,
      };
      chart = echarts.init(dom as HTMLElement);
      const options = {
        xAxis: {
          type: 'category',
          data: xData,
          axisPointer: {
            show: true,
            lineStyle,
          },
        },
        yAxis: {
          data: yData,
          boundaryGap: true,
          type: 'category',
          axisTick: {
            alignWithLabel: true,
          },
          axisPointer: {
            show: true,
            lineStyle,
          },
          axisLine: {
            symbol: ['none', 'arrow'],
          },
        },
        dataZoom: {
          type: 'inside',
          start: 0,
          end: 100,
          yAxisIndex: 0,
        },
        series: [
          {
            symbolSize: 0,
            label: {
              show: true,
              color: '#fff',
              position: 'inside',
              formatter: function (param: { name: string; value: string }) {
                const { name, value } = param;
                return `${value[1]} ${name}`;
              },
            },
            data: seriesData,
            type: 'scatter',
            emphasis: {
              symbolSize: 0,
            },
          },
        ],
      };
      chart.setOption(options);
      chart.resize();
    };
    const handleChange = (tab: TabType) => {
      activeKey.value = tab;
    };
    return {
      activeKey,
      handleChange,
    };
  },
  render() {
    const { activeKey, handleChange } = this;
    return (
      <div class="previous-resume">
        <Tabs activeKey={activeKey} onChange={handleChange} />
        <div ref="pieRef" class="chart" />
      </div>
    );
  },
});
