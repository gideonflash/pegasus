import React from "react";

type Tree = {
  node: React.SVGProps<SVGCircleElement>;
  children?: Tree[];
};
export const TreeView = () => {
  const center = 500 / 2;

  const tree: Tree = {
    node: <circle cx="5" cy={center} r="10" fill="#FFFFFF" />,
    children: [
      {
        node: <circle cx="50" cy={center + 50} r="10" fill="#FFFFFF" />,
        children: [
          {
            node: (
              <circle cx="100" cy={center + 50 + 50} r="10" fill="#FFFFFF" />
            ),
          },
          { node: <circle cx="100" cy={center + 50} r="10" fill="#FFFFFF" /> },
          { node: <circle cx="100" cy={center} r="10" fill="#FFFFFF" /> },
        ],
      },
      {
        node: <circle cx="50" cy={center - 75} r="10" fill="#FFFFFF" />,
        children: [
          { node: <circle cx="100" cy={center - 50} r="10" fill="#FFFFFF" /> },
          {
            node: (
              <circle cx="100" cy={center - 50 - 50} r="10" fill="#FFFFFF" />
            ),
          },
        ],
      },
    ],
  };

  type Levels = number[];

  const renderTree = (
    tree: Tree,
    collection: React.SVGProps<SVGCircleElement>[],
    level = 0,
    levelsCount: Levels = []
  ) => {
    if (tree.node) {
      collection.push(tree.node);
    }

    if (levelsCount[level]) {
      levelsCount[level] += 1;
    } else {
      levelsCount[level] = 1;
    }

    if (tree.children) {
      level += 1;
      tree.children.forEach((child) => {
        renderTree(child, collection, level, levelsCount);
      });
    }

    return { collection, levelsCount };
  };

  const { collection } = renderTree(tree, []);

  return (
    <>
      <div>Tree view</div>
      <svg
        version="1.1"
        width="1000"
        height="500"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100%" height="100%" fill="#345FF2" />

        {collection}
      </svg>
    </>
  );
};
