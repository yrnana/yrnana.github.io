---
title: 'Minimum Spanning Tree'
date: '2020-05-12T18:15:41+09:00'
excerpt: '최소 신장 트리 (MST, Minimum Spanning Tree)'
tags: [Algorithm, MST, Greedy, Kruskal, Graph]
published: true
---

# Spanning Tree

- 그래프 내의 모든 정점을 포함하는 트리 (부분 그래프)
- 그래프의 최소 연결 부분 그래프
- [DFS](/post/depth-first-search), [BFS](/post/breadth-first-search)를 사용해서 찾을 수 있다.
- 사이클을 포함해서는 안된다.
- $V$개의 정점을 가지는 신장 트리는 $V-1$개의 간선을 가진다.

# Minimum Spanning Tree (MST)

## MST의 특징

- 간선의 가중치의 합이 최소여야 한다.
- $V$개의 정점을 가지는 그래프에 대해서 반드시 $V-1$개의 간선만을 사용해야 한다.
- 사이클을 포함해서는 안된다.

## 크루스칼 알고리즘 (Kruskal's algorithm)

- Greedy method를 이용하여 네트워크의 모든 정점을 최소 비용으로 연결하는 해답을 구하는 알고리즘
- 시간 복잡도 $O(E\log E)$

1. 간선들을 가중치의 오름차순으로 정렬한다.
2. 가중치가 가장 작은 간선을 고르고, 각 단계에서 사이클을 이루지 않는 최소 비용 간선을 선택한다.
3. $V-1$개의 간선이 포함될때까지 반복한다.

### 크루스칼 알고리즘 로직

이 그래프는 9개의 정점과 14개의 간선을 가지고 있다. 따라서 최소 신장 트리는 8개의 간선을 가지게 된다.

```
Weight   Src   Dest
1        7     6
2        8     2
2        6     5
4        0     1
4        2     5
6        8     6
7        2     3
7        7     8
8        0     7
8        1     2
9        3     4
10       5     4
11       1     7
14       3     5
```

1. 7-6 간선을 선택한다.
2. 8-2 간선을 선택한다.
3. 6-5 간선을 선택한다.
4. 0-1 간선을 선택한다.
5. 2-5 간선을 선택한다.
6. 8-6 간선을 선택하면 사이클이 형성되므로 버린다.
7. 2-3 간선을 선택한다.
8. 7-8 간선을 선택하면 사이클이 형성되므로 버린다.
9. 0-7 간선을 선택한다.
10. 1-2 간선을 선택하면 사이클이 형성되므로 버린다.
11. 3-4 간선을 선택한다.
12. $V-1$개의 간선이 선택되었으므로 알고리즘을 종료한다.

```python
# i가 속한 집합의 head 반환
def find(parent, i):
    if parent[i] == i:
        return i
    return find(parent, parent[i])


# x와 y가 속한 집합을 하나로 합친다 (깊이가 적은 트리를 깊은 트리의 루트 아래 추가)
def union(parent, rank, x, y):
    xroot = find(parent, x)
    yroot = find(parent, y)
    if rank[xroot] < rank[yroot]:
        parent[xroot] = yroot
    elif rank[xroot] > rank[yroot]:
        parent[yroot] = xroot
    else:
        parent[yroot] = xroot
        rank[xroot] += 1


def kruskal(v, e):
    result = []
    parent, rank = [], []

    # 간선을 가중치 순으로 정렬한다
    e.sort(key=lambda x: x[2])

    for node in range(v):
        parent.append(node)  # [0, 1, 2, 3, 4, 5, 6, 7, 8]
        rank.append(0)  # [0, 0, 0, 0, 0, 0, 0, 0, 0]

    for edge in e:
        src, dist, weight = edge
        x, y = find(parent, src), find(parent, dist)
        if x != y:  # head가 다름 (사이클이 형성되지 않음)
            result.append(edge)
            union(parent, rank, x, y)
            if len(result) == v - 1:
                break

    return result


if __name__ == '__main__':
    vertices = 9
    edges = [
        [7, 6, 1],
        [8, 2, 2],
        [6, 5, 2],
        [0, 1, 4],
        [2, 5, 4],
        [8, 6, 6],
        [2, 3, 7],
        [7, 8, 7],
        [0, 7, 8],
        [1, 2, 8],
        [3, 4, 9],
        [5, 4, 10],
        [1, 7, 11],
        [3, 5, 14],
    ]
    ans = kruskal(vertices, edges)
    print(ans)
```
