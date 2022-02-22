//把vdom转化成一个真实的dom
export function mountElement(vnode,container) {
  const {tag,props,children} = vnode;
    //tag
  const el = (vnode.el =  document.createElement(tag));

  //props
  if (props) {
    for (const key in props) {
      if (Object.hasOwnProperty.call(props, key)) {
        const val = props[key];
        el.setAttribute(key,val);
      }
    }
  }
  //children
  //1.它可以接受一个字符串类型
  if (typeof children === 'string') {
    const textNode = document.createTextNode(children);
    el.append(textNode);
  } else if (Array.isArray(children)) {
    //它可以接受一个数组
    //做一个递归
    children.forEach((v) => {
      mountElement(v,el);
    })
  }
//2.它可以接受一个数组
  container.append(el);
}


//n1 oldVnode
//n2 newVnode







export function diff (n1,n2) {
  //1.tag
  //2.prop
  //3.children => (暴力的解法)


  if (n1?.tag !== n2?.tag) {
      //1.比对tag
    n1.el.replaceWith(document.createElement(n2.tag));
  }
  else {
    //因为要改到props所以要讲节点转交
    n2.el = n1.el;
    //2.props
    //new: {id:"foo",class: "bar",a}
    //old: {id: "foo",class: "bar111",b}
    const {props: newProps} = n2;
    const {props: oldProps} = n1;
    //props的第一种情况 当两个新旧props拥有属性，或者newProps新增这个属性的时候采用这个逻辑
    if (newProps && oldProps) {
      Object.keys(newProps).forEach((key) => {
        const newVal = newProps[key];
        const oldVal = oldProps[key];
        if (newVal !== oldVal) {
          n1.el.setAttribute(key,newVal);
        }
      })
    }

    //第二种情况就是新的props删除了一些属性
    if (oldProps) {
      Object.keys(oldProps).forEach((key) => {
        if (!newProps[key]) {
          n1.el.removeAttribute(key);
          
        }
      })
    }
    //3.children  => (暴力的解法)
    //1.newChildren => string(oldChildren => string oldChildren => Array)
    //2.newChildren => array (oldChildren => )
    const {children :newChildren} = n2;
    const {children : oldChildren} = n1;
    console.log(newChildren);
    if (typeof newChildren === "string") {
      if (typeof oldChildren === "string") {
        if (newChildren !== oldChildren) {
          n2.innerText = newChildren
        }
      }
    } else if (Array.isArray(oldChildren)) {
      // new{q,b,d,d,f,g,g,h}
      // old {a,b,dffdfdfd,d,e}
      //先判断长度
      const length = Math.min(newChildren,oldChildren);
      //处理公用的vnode
      for (let index = 0; index < length; index++) {
        const newVnode = newChildren[index];
        const oldVnode = oldChildren[index];
        diff(oldChildren,newChildren)
      }

      if (newChildren.length > length) {
        //创建节点
        for (let index = 0; index < newChildren.length; index++) {
         const newVnode = newChildren[index];
         mountElement(newVnode);
        }
      }
      if (oldChildren.length > length) {
        //删除节点
        for (let index = 0; index < oldChildren.length; index++) {
         const oldVnode = oldChildren[index];
          oldVnode.el.parent.removeChildren(oldVnode.el);
        }
      }
    }
  }
}