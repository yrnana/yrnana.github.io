---
title: '[LeetCode] 160. Intersection of Two Linked Lists'
date: '2020-05-14T21:44:02+09:00'
tags: [Algorithm, LeetCode, Linked List]
published: true
---

# Problem

> Write a program to find the node at which the intersection of two singly linked lists begins.
>
> 두개의 linked list의 교차 시작점을 구하는 프로그램을 작성해라.

```
Input: intersectVal = 8, listA = [4,1,8,4,5], listB = [5,0,1,8,4,5]
Output: Reference of the node with value = 8

Input: intersectVal = 2, listA = [0,9,1,2,4], listB = [3,2,4]
Output: Reference of the node with value = 2

Input: intersectVal = 0, listA = [2,6,4], listB = [1,5]
Output: null
```

# Solution

두 개의 traversor가 각각 리스트를 순회하고, 만일 두 개의 리스트의 길이가 다르면 두번째 round에서 시작점을 교환하면 리스트의 긴 쪽이 짧은 쪽을 따라잡을 것이다. 리스트의 길이가 같다면 첫 순회시에 nodeA와 nodeB가 같아지는 순간이 발생하고 그 점이 교차 시작점이다.

시간 복잡도 $O(N)$

```py
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

    def __str__(self):
        return 'ListNode(' + str(self.val) + ')'


def get_intersection_node(headA, headB):
    if not headA or not headB:
        return None
    nodeA = headA
    nodeB = headB
    while nodeA != nodeB:
        nodeA = nodeA.next if nodeA else headB
        nodeB = nodeB.next if nodeB else headA
    return nodeA


if __name__ == '__main__':
    x = ListNode(4)
    x.next = ListNode(1)
    x.next.next = ListNode(8)
    x.next.next.next = ListNode(4)
    x.next.next.next = ListNode(5)
    y = ListNode(5)
    y.next = ListNode(0)
    y.next.next = ListNode(1)
    y.next.next.next = x.next.next
    print(get_intersection_node(x, y))
```