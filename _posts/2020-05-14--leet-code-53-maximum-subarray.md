---
title: '[LeetCode] 53. Maximum Subarray'
date: '2020-05-14T12:04:08+09:00'
tags: [Algorithm, LeetCode, Array, Divide and Conquer, Dynamic Programming]
published: true
---

# Problem

> Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.
>
> 정수 배열이 주어졌을때, 1개 이상의 숫자를 포함하는 연속적인 배열을 찾아서 배열의 합이 가장 클때의 합을 반환해라.

```
Input: [-2,1,-3,4,-1,2,1,-5,4],
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.
```

# Solution

앞에서부터 순서대로 값을 더해나간다고 하면, 직전까지의 합 `S`와 현재값 `N`이 있다고 가정한다. `N`와 `S + N`을 비교했을때 만일 `N`이 더 크다면 직전까지의 합을 더하지 않는 것이 최대합을 구할 수 있기 때문에 직전까지의 배열 합을 배제하고 `N`만 취한다. 반대로 `S + N`이 더 크다면 `S + N`을 현재 시점의 최대합으로 놓는다.

이렇게 루프를 한번 돌 때마다 해당 시점에서 계산한 최대합과 직전의 최대합을 비교해서 큰 값을 저장하면 된다.

시간 복잡도 $O(N)$

```py
def max_sub_array(nums):
    ans, tmp = nums[0], nums[0]
    for i in range(1, len(nums)):
        tmp = max(nums[i], tmp + nums[i])
        ans = max(ans, tmp)
    return ans


if __name__ == '__main__':
    print(max_sub_array([-2, 1, -3, 4, -1, 2, 1, -5, 4]))
```

# Follow up

> If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.

[maximum-subarray-sum-using-divide-and-conquer-algorithm](https://www.geeksforgeeks.org/maximum-subarray-sum-using-divide-and-conquer-algorithm/)

1. 배열을 반으로 나눈다.
2. 다음 3개 중 최대값을 반환한다.
   1. 왼쪽 배열의 최대합
   2. 오른쪽 배열의 최대합
   3. 중점을 지나는 배열의 최대합

시간 복잡도 $O(N\log N)$

```py
def max_cross_arr_sum(arr, l, m, r):
    sm, left_sum = 0, float('-inf')
    for i in range(m, l - 1, -1):
        sm += arr[i]
        left_sum = max(sm, left_sum)

    sm, right_sum = 0, float('-inf')
    for i in range(m + 1, r + 1):
        sm += arr[i]
        right_sum = max(sm, right_sum)

    return max(left_sum, right_sum, left_sum + right_sum)


def max_sub_arr_sum(arr, l, r):
    if l == r:
        return arr[l]
    m = (l + r) // 2
    return max(
        max_sub_arr_sum(arr, l, m),
        max_sub_arr_sum(arr, m + 1, r),
        max_cross_arr_sum(arr, l, m, r)
    )


def max_sub_array(nums):
    return max_sub_arr_sum(nums, 0, len(nums) - 1)


if __name__ == '__main__':
    print(max_sub_array([-2, 1, -3, 4, -1, 2, 1, -5, 4]))
```