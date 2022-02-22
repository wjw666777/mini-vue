 //template -> render
  //构建 view = b
  //view =>每次我都需要重新的构建
  //要计算出最小的更新点 =》 vdom
  //js => diff

  //reset
  //tag
  //props
  //children
  
  export function h(tag,props,children) {
    return {
      tag,
      props,
      children
    }
  }
