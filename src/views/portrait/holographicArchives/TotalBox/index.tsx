import { defineComponent, getCurrentInstance, onMounted } from 'vue';
import Title from '../Title';
import './index.less';

import * as echarts from 'echarts/core';
import { GaugeChart } from 'echarts/charts';
import 'echarts-liquidFill';

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
const charts: echarts.ECharts[] = [];

export default defineComponent({
  setup() {
    const instance = getCurrentInstance();
    onMounted(() => {
      chartChange();
      window.addEventListener('resize', function () {
        charts.forEach((chart) => {
          chart.resize();
        });
      });
    });
    const chartChange = () => {
      const dom1 = instance!.refs.chart1 as HTMLElement;
      const dom2 = instance!.refs.chart2 as HTMLElement;
      const dom3 = instance!.refs.chart3 as HTMLElement;
      const dom4 = instance!.refs.chart4 as HTMLElement;
      const dom5 = instance!.refs.chart5 as HTMLElement;
      const dom6 = instance!.refs.chart6 as HTMLElement;
      const dom7 = instance!.refs.chart7 as HTMLElement;
      const dom8 = instance!.refs.chart8 as HTMLElement;
      change(0.6, dom1);
      change(0.7, dom2);
      change(0.5, dom3);
      change(0.6, dom4);
      change(0.4, dom5);
      change(0.5, dom6);
      change(0.2, dom7);
      change(0.56, dom8);
    };
    // const echarts = inject("echarts")
    const change = (data: number, dom: HTMLElement) => {
      console.log(dom);
      const chart = echarts.init(dom);
      const options = {
        series: [
          {
            type: 'liquidFill',
            data: [data],
            radius: '90%',
            outline: {
              // 外轮廓
              borderDistance: -1,
              itemStyle: {
                borderColor: '#45B6F1',
                borderWidth: 4,
              },
            },
            label: {
              position: ['50%', '50%'],
              textStyle: {
                fontSize: 16,
                color: '#fff',
              },
              formatter: function (data: { value: number }) {
                return data.value;
              },
            },
            backgroundStyle: {
              color: 'transparent',
            },
            color: ['#45B6F1'],
          },
        ],
      };
      chart.setOption(options);
      chart.resize();
      charts.push(chart);
    };
  },
  render() {
    return (
      <div class="total-box">
        <div class="basic">
          <Title class="title" title="基本信息" />
          <div class="list">
            <div class="chart-box">
              <div class="chart" ref="chart1"></div>
              <div class="name">派系</div>
            </div>
            <div class="chart-box">
              <div class="chart" ref="chart2"></div>
              <div class="name">出身</div>
            </div>
            <div class="chart-box">
              <div class="chart" ref="chart3"></div>
              <div class="name">族裔</div>
            </div>
            <div class="chart-box">
              <div class="chart" ref="chart4"></div>
              <div class="name">组织地位</div>
            </div>
          </div>
        </div>
        <div class="society ">
          <Title class="title" title="社会关系" />
          <div class="list">
            <div class="chart-box">
              <div class="chart" ref="chart5"></div>
              <div class="name">职务</div>
            </div>
            <div class="chart-box">
              <div class="chart" ref="chart6"></div>
              <div class="name">家庭关系</div>
            </div>
            <div class="chart-box">
              <div class="chart" ref="chart7"></div>
              <div class="name">家族类型</div>
            </div>
            <div class="chart-box">
              <div class="chart" ref="chart8"></div>
              <div class="name">社会活动</div>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
