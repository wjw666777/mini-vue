import { effectWatch } from './reactivity/index.js'
import { mountElement,diff } from './renderer/index.js';
export default function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      const context = rootComponent.setup();
      let isMounted = false;
      let preSubTree;
      effectWatch(() => {
        if (!isMounted) {
          isMounted = true;
          // init 初始化虚拟节点
          // rootContainer?.innerHTML = null;
          // console.log(context);
          const subTree = rootComponent.render(context);
          console.log(subTree);
          // console.log(subTree);
          console.log(rootContainer);
          window.c = rootContainer;
          // var rootC = rootContainer.getsubTreeById("app");
          // console.log(rootC);
          // rootContainer?.innerHTML = `<div>66666</div>`;
          c.innerHTML = ``;
          // c?.append(subTree);
          //diff
          //newVO
          mountElement(subTree, c);
          preSubTree = subTree;
        } else {
          const subTree = rootComponent.render(context);
          diff(preSubTree,subTree);
          preSubTree = subTree;
        }
      });
    }
  }
}
