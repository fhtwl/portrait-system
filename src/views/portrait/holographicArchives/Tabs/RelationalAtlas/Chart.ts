import G6, {
  Graph,
  GraphData,
  IGroup,
  LayoutConfig,
  ModelConfig,
  NodeConfig,
} from '@antv/g6';
import './index.less';
import UserIcon from '@/assets/images/u47.svg';
function hasUserNode(cfg: ModelConfig) {
  return cfg.nodeType === 'user';
}
type ViewNodeType = 'user' | 'relationship';

export interface ViewNode extends ModelConfig {
  id: string;
  label: string;
  nodeType: ViewNodeType;
  size?: number;
}

// 实例化 minimap 插件
const minimap = new G6.Minimap({
  size: [100, 100],
  className: 'minimap',
  type: 'default',
});

// export interface EdgeConfig {
//   source: string;
//   target: string;
//   label?: string;
// }
// interface Date {
//   nodes: ViewNode[];
//   edges: EdgeConfig[];
//   id: string
// }

/* 生成树上的 marker */
function createNodeMarker(
  group: IGroup,
  cfg: ModelConfig,
  x: number,
  y: number
) {
  group.addShape('circle', {
    attrs: {
      x,
      y,
      r: 13,
      fill: 'rgba(47, 84, 235, 0.05)',
      opacity: 0,
      zIndex: -2,
      cursor: 'pointer',
    },
    name: 'collapse-icon-bg',
  });
  group.addShape('marker', {
    attrs: {
      x,
      y,
      r: 7,
      symbol: cfg.collapsed ? G6.Marker.expand : G6.Marker.collapse,
      stroke: '#fff',
      lineWidth: 2,
      cursor: 'pointer',
    },
    name: 'collapse-icon',
  });
}

export default class Chart {
  data: GraphData = [];
  graph!: Graph;
  constructor(container: HTMLElement, data: GraphData) {
    this.registerNode();
    this.init(container, data);
  }
  private init(container: HTMLElement, data: GraphData) {
    this.data = data;
    data.nodes!.forEach((item, index) => {
      // item.type = Math.random() > 0.5 ? "rect" : "circle"

      item.size = this.hasRelationshipNode(item) ? 24 : 40;
    });
    const width = container.scrollWidth;
    const height = container.scrollHeight || 500;
    const graph = new G6.Graph({
      container,
      width,
      height,
      fitView: true,
      fitViewPadding: 20,
      minZoom: 0.00000001,
      // groupByTypes: false,
      layout: {
        type: 'concentric', // random, gForce, dagre, comboForce, comboCombined
        // preventComboOverlap: true,
        rankdir: 'BT', // dagre布局的排列方式, TB, BT, LR, RL
        preventOverlap: true,
        nodeSpacing: () => 150,

        gravity: 90,
        spacing: 200,
        linkDistance: 10, // 可选，边长
        center: [0, 0], // 可选，默认为图的中心
        nodeStrength: 160, // 可选, 节点作用力
        edgeStrength: 0.1, // 可选
        // nodeSize: 40,
      },

      defaultNode: {
        size: 40,
        img: 'https://static.fhtwl.cc/upload/1647938338226.jpg',

        type: 'cRect', // cRect
        labelCfg: {
          position: 'bottom',
          style: {
            fill: '#fff',
            shadowColor: 'blue',
            shadowBlur: 10,
            // fontSize: 20,
          },
        },
        // 裁剪图片配置
        clipCfg: {
          show: false,
          type: 'circle',
          r: 20,
        },
      },
      defaultEdge: {
        size: 1,
        color: '#6C7D90',
        style: {
          endArrow: true,
        },
        labelCfg: {
          style: {
            fill: '#aaa',
          },
        },
      },
      modes: {
        default: [
          // "drag-combo", "drag-node",
          'drag-canvas',
          'zoom-canvas',
          // {
          //   type: "tooltip", // 提示框
          //   formatText(model) {
          //     // 提示框文本内容
          //     const text = `id: ${model.id} <br/> label:  ${model.label}`
          //     return text
          //   },
          // },
          {
            type: 'click-select',
            trigger: 'alt',
          },
        ],
      },
      plugins: [minimap],
    });

    graph.data(data);
    graph.render();

    graph.on('node:click', (ev) => {
      const node = ev.item; // 被点击的节点元素
      const shape = ev.target; // 被点击的图形，可根据该信息作出不同响应，以达到局部响应效果

      // 获取图形名称
      const iconName = shape.cfg.name;
      // 当前节点id
      const id = node!._cfg!.id;
      console.log(ev, node, shape);

      // 如果点击的是展开收缩按钮
      if (iconName === 'collapse-icon') {
        const collapsed = !node!._cfg!.collapsed;
        node!._cfg!.collapsed = collapsed;
        graph.updateItem(id!, {
          collapsed: collapsed,
        });
        console.log(this.data);
        // 这里的数据, 是针对某个人的关系网, 所有的关系应该都起源于核心任务, 故不存在核心人物-其他人物-...-核心任务这种闭环
        // 对于核心任务, 其他人物和其他人物之间的关系是不关注的, 故其他人物之间也不存在闭环
        // 总而言之, 整个图里是没有闭环的
        this.hideData(collapsed, id!);
        // 更新数据
        this.changeData(graph, data, collapsed);
      }
    });
    const combosColors = [
      '#958EF2',
      '#9961DD',
      '#B1C248',
      '#A82234',
      '#7FC2FA',
      '#285DB1',
      '#327071',
      '#62C278',
      '#8CC5CF',
      '#DB8AAB',
      '#BA712A',
      '#2E378C',
      '#77A0D6',
    ];
    this.graph = graph;
    if (typeof window !== 'undefined')
      window.onresize = () => {
        if (!graph || graph.get('destroyed')) return;
        if (!container || !container.scrollWidth || !container.scrollHeight)
          return;
        graph.changeSize(container.scrollWidth, container.scrollHeight);
      };
  }
  private registerNode() {
    G6.registerNode(
      'cRect',
      {
        afterDraw: (cfg?: ModelConfig, group?: IGroup) => {
          if (!cfg || !group) {
            return;
          }
          const attrs = {
            text: cfg?.label,
          };
          let markerTop = 46;
          if (this.hasRelationshipNode(cfg)) {
            group.addShape('rect', {
              attrs: {
                ...attrs,
                x: -12,
                y: -12,
                width: 24,
                height: 24,

                fill: '#0A7AFD',
              },
              name: 'image-shape',
            });
            group.addShape('image', {
              attrs: {
                ...attrs,
                x: -12,
                y: -12,
                img: UserIcon,
                width: 24,
                height: 24,
              },
              name: 'image-shape',
            });
            markerTop = 38;
          } else {
            group.addShape('image', {
              attrs: {
                ...attrs,
                x: -20,
                y: -20,
                img: cfg.img,
                width: 40,
                height: 40,
              },
              name: 'image-shape',
            });
          }

          const hasChildren = this.data.edges!.find(
            (item) => item.source === cfg.id
          );
          if (hasChildren) {
            createNodeMarker(group, cfg, 0, markerTop);
          }
          return group;
        },
        update: (cfg, item) => {
          const group = item.getContainer();
          const icon = group.find((e) => e.get('name') === 'collapse-icon');
          icon?.attr(
            'symbol',
            cfg.collapsed ? G6.Marker.expand : G6.Marker.collapse
          );
        },
      },
      'rect'
    );
  }
  /**
   * 判断是否是关系节点
   * @param cfg
   * @returns
   */
  private hasRelationshipNode(cfg: ModelConfig) {
    return cfg.nodeType === 'relationship';
  }
  /**
   * 更换布局或布局参数
   * @param type
   */
  public updateLayout(type: LayoutConfig) {
    this.graph.updateLayout(type, 'center');
  }

  /**
   * 更新minimap
   * @param isShow
   */
  public updateMinimap(isShow: boolean) {
    // const conf = minimap.getDefaultCfgs();
    minimap._cfgs.size = isShow ? [100, 100] : [0, 0];
    // conf.size = isShow ? [100, 100] : [0, 0];
    minimap.updateCanvas();
  }

  /**
   * 更新数据
   * @param propsData
   */
  public updateData(propsData: GraphData) {
    this.graph.changeData(propsData);
  }

  getRandomColor() {
    let col = 'rgb(';
    for (let i = 0; i < 3; i++) {
      col += `${Math.floor(Math.random() * 256)},`;
    }
    let c = col.slice(0, -1);
    c += ')';
    return c;
  }
  /**
   * 更新数据
   * @param graph
   * @param data
   * @param collapsed
   */
  private changeData(graph: Graph, data: GraphData, collapsed: boolean) {
    const nodes = data.nodes!.filter((item) => !!item.isHide === !!collapsed);
    // const edges = data.edges!.filter((item) => !!item.isHide === !!collapsed);
    // changeData会更新数据导致视图重绘, 导致布局变化, 体验会很差
    // 故这里使用hide和show来隐藏显示
    // graph.changeData({
    //   ...data,
    //   nodes,
    //   edges,
    // })
    const update = (list: NodeConfig[]) => {
      if (collapsed) {
        list.forEach((item) => {
          graph.hideItem(item.id);
        });
      } else {
        list.forEach((item) => {
          graph.showItem(item.id);
        });
      }
    };
    console.log(data, nodes, collapsed);
    update(nodes);
  }

  /**
   * 隐藏节点和线
   * @param collapsed
   * @param id
   */
  private hideData(collapsed: boolean, id: string) {
    const { data } = this;
    const nodes: string[] = [];
    // 将线隐藏
    data
      .edges!.filter((item) => item.source === id)
      .forEach((item) => {
        item.isHide = collapsed;
        // 并保存线对应的节点
        nodes.push(item.target!);
      });
    // 将节点隐藏
    data.nodes!.forEach((item) => {
      if (nodes.includes(item.id)) {
        item.isHide = collapsed;
      }
    });
    // 遍历关系节点
    nodes.forEach((id) => {
      const bool = this.getNodeHasChildren(id);
      // 如果该节点还存在可见的关系
      if (bool) {
        // 那么继续往下删除
        this.hideData(collapsed, id);
      }
    });
  }

  /**
   * 判断该节点是否有子节点
   * @param id
   * @returns
   */
  private getNodeHasChildren(id: string) {
    const { data } = this;
    // 获取以此节点为source的线
    const list = data.edges!.filter((item) => item.source === id);
    // 如果有, 说明还要继续往下删除
    return list.length > 0;
  }
}
