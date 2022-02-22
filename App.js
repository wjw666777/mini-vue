import reactive from './core/reactivity/index.js';
import {h} from './core/h.js';
export default {
  //template => 最终都会被编译成一个render函数
  render(context) {
    // view => 每次都需要重新地创建
    //需要计算出最小地更新点
    //js => 比对dom  diff算法
  // const div = document.createElement("div");
  // div.innerText = context.state.count;
  // div.append(`<p>好用的miniVue小程序</p>`);
// return div
//通过一个简单的渲染函数
return h("div",{
  id: "geeeeeerrrr" + context.state.count,
  class: "show great time"
},
[h("p",null,String(context.state.count)),h("p",null,"hahahh")]);
  },
  setup() {
    //a = 响应式数据
    const state = reactive({
      count: 6
    })
    //为了能够直接通过控制台去实现
    window.state = state;
    return {
      state
    }
  }
}


// App.render(App.setup());
