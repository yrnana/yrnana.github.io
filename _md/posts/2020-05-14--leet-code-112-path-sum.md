---
title: '[LeetCode] 112. Path Sum'
date: '2020-05-14T19:23:37+09:00'
tags: [Algorithm, LeetCode, Tree, DFS, Binary Tree]
published: true
---

# Problem

> Given a binary tree and a sum, determine if the tree has a root-to-leaf path such that adding up all the values along the path equals the given sum.
>
> 이진 트리와 합이 주어지면, 트리에 경로의 합이 주어진 값과 같은 root-to-leaf 경로가 있는지 판단해라.

```
Given the below binary tree and sum = 22,

      5
     / \
    4   8
   /   / \
  11  13  4
 /  \      \
7    2      1

return true, as there exist a root-to-leaf path 5->4->11->2 which sum is 22.
```

# Solution

재귀함수를 호출하면서 leaf노드(=자식 노드가 없는 노드)를 만나면 주어진 값과 path sum을 비교한다.

시간 복잡도 $O(N)$

```py
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def has_path_sum_util(node, curr, sum):
    curr += node.val
    if not node.left and not node.right:
        return curr == sum
    check1, check2 = False, False
    if node.left:
        check1 = has_path_sum_util(node.left, curr, sum)
    if node.right:
        check2 = has_path_sum_util(node.right, curr, sum)
    return check1 or check2


def has_path_sum(root, sum):
    return has_path_sum_util(root, 0, sum)


if __name__ == '__main__':
    tree = TreeNode(5)
    tree.left = TreeNode(4)
    tree.right = TreeNode(8)
    tree.left.left = TreeNode(11)
    tree.right.left = TreeNode(13)
    tree.right.right = TreeNode(4)
    tree.left.left.left = TreeNode(7)
    tree.left.left.right = TreeNode(2)
    tree.right.right.right = TreeNode(1)
    print(has_path_sum(tree, 22))
```
