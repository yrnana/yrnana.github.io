---
title: '[LeetCode] 122. Best Time to Buy and Sell Stock II'
date: '2020-05-14T21:03:27+09:00'
tags: [Algorithm, LeetCode, Array, Greedy]
image: '/assets/posts/max-profit.png'
published: true
---

# Problem

> Say you have an array prices for which the ith element is the price of a given stock on day i.  
> Design an algorithm to find the maximum profit. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times).  
> **Note:** You may not engage in multiple transactions at the same time (i.e., you must sell the stock before you buy again).
>
> i번째 요소가 i일의 주식 가격인 배열을 가지고 있다고 가정해보자.  
> 최대 이윤을 찾기 위한 알고리즘을 설계해라.  
> **참고:** 동시에 여러 거래를 할 수 없다. (다시 사기 전에 팔아야 한다.)

```
Input: [7,1,5,3,6,4]
Output: 7
Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.
             Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.

Input: [1,2,3,4,5]
Output: 4
Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
             Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are
             engaging multiple transactions at the same time. You must sell before buying again.

Input: [7,6,4,3,1]
Output: 0
Explanation: In this case, no transaction is done, i.e. max profit = 0.
```

# Solution

![profit](/assets/posts/max-profit.png)

위 그래프와 같이, 큰 이윤을 가져오려면 모든 이윤 구간을 놓치지 않으면 된다. 따라서 현재값과 직전값을 비교해서 현재값이 더 큰 경우만 두 값의 차이를 더해주면 된다.

시간 복잡도 $O(N)$

```py
def max_profit(prices):
    if len(prices) <= 1:
        return 0
    profit = 0
    for i in range(1, len(prices)):
        if prices[i] > prices[i - 1]:
            profit += prices[i] - prices[i - 1]
    return profit


if __name__ == '__main__':
    print(max_profit([7, 1, 5, 3, 6, 4]))
    print(max_profit([1, 2, 3, 4, 5]))
    print(max_profit([7, 6, 4, 3, 1]))
```
