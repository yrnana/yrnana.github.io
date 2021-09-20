---
title: '[LeetCode] 110. Balanced Binary Tree'
date: '2020-05-14T13:52:58+09:00'
tags: [Algorithm, LeetCode, Tree, DFS, Binary Tree]
published: true
---

# Problem

> Given a binary tree, determine if it is height-balanced.  
> For this problem, a height-balanced binary tree is defined as:  
> a binary tree in which the left and right subtrees of every node differ in height by no more than 1.
>
> 주어진 이진 트리가 height-balanced인지 확인한다.  
> 이 문제에서 height-balanced binary tree는 모든 노드들의 하위 트리의 깊이가 1 이상 차이가 나지 않는 이진 트리로 정의한다.

```
[3,9,20,null,null,15,7]: true
    3
   / \
  9  20
    /  \
   15   7

[1,2,2,3,3,null,null,4,4]: false
       1
      / \
     2   2
    / \
   3   3
  / \
 4   4
```

# Solution

이진 트리가 height-balanced 이려면 모든 노드에서 다음을 만족해야 한다.

1. 왼쪽 하위 트리가 height-balanced 이다.
2. 오른쪽 하위 트리가 height-balnaced 이다.
3. 왼쪽 하위 트리와 오른쪽 하위 트리의 height 차이가 1이하이다.

시간 복잡도 $O(N)$

```py
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None


def is_balanced_util(node, height):
    lh = [0]
    rh = [0]
    if not node:
        return True
    l = is_balanced_util(node.left, lh)
    r = is_balanced_util(node.right, rh)
    height[0] = max(lh[0], rh[0]) + 1
    return abs(lh[0] - rh[0]) <= 1 and l and r


def is_balanced(root):
    h = [0]  # height
    return is_balanced_util(root, h)


if __name__ == '__main__':
    tree1 = TreeNode(3)
    tree1.left = TreeNode(9)
    tree1.right = TreeNode(20)
    tree1.right.left = TreeNode(15)
    tree1.right.right = TreeNode(7)
    print(is_balanced(tree1))

    tree2 = TreeNode(1)
    tree2.left = TreeNode(2)
    tree2.right = TreeNode(2)
    tree2.left.left = TreeNode(3)
    tree2.left.right = TreeNode(3)
    tree2.left.left.left = TreeNode(4)
    tree2.left.left.right = TreeNode(4)
    print(is_balanced(tree2))
```