let menu = [
  { Id: 1, ParentId: null, Sort: 0, Name: "菜单1" },
  { Id: 2, ParentId: 1, Sort: 0, Name: "菜单1-1" },
  { Id: 3, ParentId: 1, Sort: 1, Name: "菜单1-2" },
  { Id: 4, ParentId: 2, Sort: 2, Name: "菜单1-1-2" },
  { Id: 5, ParentId: 2, Sort: 1, Name: "菜单1-1-1" },
  { Id: 6, ParentId: null, Sort: 1, Name: "菜单2" },
  { Id: 7, ParentId: 6, Sort: 0, Name: "菜单2-1" },
  { Id: 8, ParentId: 6, Sort: 1, Name: "菜单2-2" },
  { Id: 9, ParentId: 8, Sort: 2, Name: "菜单2-2-2" },
  { Id: 10, ParentId: 8, Sort: 1, Name: "菜单2-2-1" },
  { Id: 11, ParentId: 10, Sort: 0, Name: "菜单2-2-1-1" },
];

const processData = (data) => {
  const build = (total, item) => {
    if (!total || total.length === 0) return;
    item.children = item.children || [];

    for (let obj of total) {
      obj.children = obj.children || [];
      if (obj.Id === item.ParentId) {
        obj.children.push(item);
        obj.children.sort((a, b) => a.Sort - b.Sort);
      } else {
        build(obj.children, item);
      }
    }
  };

  return data.reduce((total, item, index) => {
    if (item.ParentId) {
      build(total, item);
    } else {
      total.push(item);
    }
    return total;
  }, []);
};

const getHtml = (item) => {
  if (item.children === undefined) console.log(item);
  return `<ul><li><a>${item.Name}</a>${
    item.children.length
      ? item.children.map((_item) => getHtml(_item)).join("")
      : ""
  }</li></ul>`;
};

console.log(processData(menu).map(getHtml).join(""));

