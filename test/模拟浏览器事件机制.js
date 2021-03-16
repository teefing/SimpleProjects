let childDiv = {
  name: 'childDiv',
  children: [],
  events: [
    {
      fn: () => {
        console.log("childDiv click capture");
      },
      capture: true,
    },
    {
      fn: () => {
        console.log("childDiv click bubble");
      },
      capture: false,
    },
  ],
};

let childDiv2 = {
  name: 'childDiv2',
  children: [],
  events: [
    {
      fn: () => {
        console.log("childDiv2 click capture");
      },
      capture: true,
    },
    {
      fn: () => {
        console.log("childDiv2 click bubble");
      },
      capture: false,
    },
  ],
};

let parentDiv = {
  name: 'parentDiv',
  children: [childDiv, childDiv2],
  events: [
    {
      fn: () => {
        console.log("parentDiv click capture");
      },
      capture: true,
    },
    {
      fn: () => {
        console.log("parentDiv click bubble");
      },
      capture: false,
    },
  ],
};

let body = {
  name: 'body',
  children: [parentDiv],
  events: [
    {
      fn: () => {
        console.log("body click capture");
      },
      capture: true,
    },
    {
      fn: () => {
        console.log("body click bubble");
      },
      capture: false,
    },
  ],
};

let window = {
  name: 'window',
  children: [body],
};

let target;
function dfs(root, targetNode) {
  if (!root) return;
  for (let child of root.children) {
    child.parent = root
    if(child === targetNode) {
      target = targetNode
      break
    } else {
      dfs(child, targetNode)
    }
  }
}

dfs(window, parentDiv);
let path = []
let p = target
while(p) {
  path.unshift(p)
  p = p.parent
}
for(let node of path) {
  node.events && node.events.filter(e => e.capture).forEach(e => e.fn && e.fn())
}
path.reverse()
for(let node of path) {
  node.events && node.events.filter(e => !e.capture).forEach(e => e.fn && e.fn())
}