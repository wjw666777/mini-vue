//先忽视大的细节，专注某个功能的实现
//响应式核心，收集依赖和触发依赖
//依赖
let currentEffect;
class Dep {
  constructor(val) {
    this.effects = new Set();
    this._val = val;
  }
  
  get value() {
    this.depend();
    return this._val;
  }
  
  set value(newVal) {
    this._val = newVal;
    this.notice();
  }
  //收集依赖
  depend() {
    if (currentEffect) {
      this.effects.add(currentEffect);
    }
  }

  //2，触发依赖
  notice() {
    //触发一下我们之前收集到的依赖
    this.effects.forEach((effect) => {
      effect();
    });
  }
}

// let b;
// let c = 0;
// const dep = new Dep(10);
// export default function effectWatch(effect) {
//   //收集依赖
//   currentEffect = effect;
//   effect();
//   currentEffect = null;
// }
//Todo maybe error
export const effectWatch = (effect) => {
  //收集依赖
  currentEffect = effect;
  effect();
  currentEffect = null;
}

// effectWatch(() => {
//   console.log("heihei");
//   c = c + 6;
//   b = dep.value + 30;
//   console.log(c);
//   console.log(b);
// });


//重点，定义一个currentEffect随时更新当前的effect（后期可以理解为视图）
// 在effectWatch当中执行传入的依赖（后期可以理解为视图）
// 1.currentEffect = effect;通过这样depend就可以实现收集的效果了
// 2.先执行一遍依赖
// 3.最后将currentEffect = null 准备接受下一个更改的不同的依赖
//4.dep.notice的时候将所有搜集的依赖触发一遍；

//reactivity的值就是分别是一个
//Object.defineProperty 是对象属性描述符所以例如Object.defineProerty()要一个个去给每个属性加依赖而new Proxy就可以了

const targetMap = new Map();

function getDep(target,key) {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target,depsMap);
  }

  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Dep();
    depsMap.set(key,dep);
  }
  return dep;
}

export default function reactive(raw) {
  return new Proxy(raw,{
    get(target,key) {
      console.log(target,key);
      //targetMap对应着的是每个对象以及他的对象依赖，通过key值去找到对应的object.key当中的依赖
    const dep = getDep(target,key);
    console.log(dep);
      dep.depend();
      return Reflect.get(target,key);
    },
    set(target,key,value) {
      //触发依赖
      //要获得
      const dep = getDep(target,key);
      const result = Reflect.set(target,key,value);
      dep.notice();
      return result;
    }
  })
}

var raw = {
  a: "3333",
  b: "777777",
  c: "grape",
  d: "aer"
}
const user = reactive(raw);
user.a;
console.log(user.a);


// const App = {
//   //template => 最终都会被编译成一个render函数
//   render(context) {
//     // view => 每次都需要重新地创建
//     //需要计算出最小地更新点
//     //js => 比对dom  diff算法
//    effectWatch(() => {
//      document.body.innerText = ``;
//     const div = document.createElement("div");
//     div.innerText = context.state.count;

//     //root
//     document.body.append(div);
//    })
//   },
//   setup() {
//     //a = 响应式数据
//     const state = reactive({
//       count: 0
//     })
//     window.state = state;
//     return {
//       state
//     }
//   }
// }


// App.render(App.setup());


//重写Dep
//做私有化value的劫持
class Dep {
  constructor(val) {
    
  }
  get value () {    
      this._val =val;
  }
  set value() {
    
  }
  //should make a interation to continue 
  depend()
}
