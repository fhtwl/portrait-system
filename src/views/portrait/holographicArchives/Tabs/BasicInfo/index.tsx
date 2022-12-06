import { defineComponent } from 'vue';
import Title from '../../Title';
import Income from './Income';
import './index.less';

export default defineComponent({
  render() {
    const data = [
      { relationship: '父', age: 30, party: 'xx' },
      { relationship: '父', age: 30, party: 'xx' },
      { relationship: '父', age: 30, party: 'xx' },
    ];
    return (
      <div class="basic-info">
        <Title class="title" title="基础资料" />
        <table class="table">
          <tr class="th">
            <td>姓名</td>
            <td>年龄</td>
            <td>党派</td>
            <td>兴趣爱好</td>
          </tr>
          <tr>
            <td>张三丰</td>
            <td>36</td>
            <td>某某党</td>
            <td>高尔夫、游泳</td>
          </tr>
          <tr class="th">
            <td>毕业院校</td>
            <td>专业</td>
            <td>学位</td>
            <td></td>
          </tr>
          <tr>
            <td>张三丰</td>
            <td>36</td>
            <td>某某党</td>
            <td>高尔夫、游泳</td>
          </tr>
          <tr class="th">
            <td>所属机构</td>
            <td>任职职位</td>
            <td>党派</td>
            <td>小派别</td>
          </tr>
          <tr>
            <td>张三丰</td>
            <td>36</td>
            <td>某某党</td>
            <td>高尔夫、游泳</td>
          </tr>
          <tr class="th">
            <td>所属群体</td>
            <td>群体的社会结构</td>
            <td>在社会结构中的位置</td>
            <td></td>
          </tr>
          <tr>
            <td>张三丰</td>
            <td>36</td>
            <td>某某党</td>
            <td>高尔夫、游泳</td>
          </tr>
          <tr class="th">
            <td>选区</td>
            <td>选区的社会经济结构</td>
            <td>人口结构</td>
            <td></td>
          </tr>
          <tr>
            <td>/</td>
            <td>/</td>
            <td>/</td>
            <td></td>
          </tr>
        </table>
        <div class="bottom">
          <div class="family">
            <Title class="title" title="基础资料" />
            <table class="table">
              <tr class="th">
                <td>姓名</td>
                <td>年龄</td>
                <td>党派</td>
              </tr>
              {data.map((item) => {
                return (
                  <tr>
                    <td>{item.relationship}</td>
                    <td>{item.age}</td>
                    <td>{item.party}</td>
                  </tr>
                );
              })}
              <tr>
                <td>张三丰</td>
                <td>36</td>
                <td>某某党</td>
              </tr>

              <tr>
                <td>张三丰</td>
                <td>36</td>
                <td>某某党</td>
              </tr>

              <tr>
                <td>张三丰</td>
                <td>36</td>
                <td>某某党</td>
              </tr>
            </table>
          </div>
          <Income total={12000} />
        </div>
      </div>
    );
  },
});
