---
title: 'Prefix, Infix, Postfix'
date: '2020-05-13T20:46:20+09:00'
excerpt: '수식 표기법 (Prefix, Infix, Postfix)'
tags: [Data Structures, Stack, Prefix, Infix, Postfix]
published: true
---

# 수식 표기법

## 1. 중위 표기법 (Infix)

- $X+Y$
- 연산자가 피연산자의 사이에 쓰여진다.
- 일반적인 수식의 표기법

## 2. 전위 표기법 (Prefix)

- $+XY$
- 연산자가 피연산자의 앞에 쓰여진다.

## 3. 후위 표기법 (Postfix)

- $XY+$
- 연산자가 피연산자의 뒤에 쓰여진다.

# 표기법간 변환

## 1. Infix → Prefix

```py
def infix_to_prefix(exp):
    exp = list(reversed(exp))
    i = 0
    while i < len(exp):
        if exp[i] == '(':
            exp[i] = ')'
            i += 1
        elif exp[i] == ')':
            exp[i] = '('
            i += 1
        i += 1

    op = {'+': 1, '-': 1, '*': 2, '/': 2, '^': 3}
    result, stack = [], []
    for c in exp:
        if c.isalpha():
            result.append(c)
        elif c == '(':
            stack.append(c)
        elif c == ')':
            while stack and stack[-1] != '(':
                result.append(stack.pop())
            if stack and stack[-1] != '(':
                return -1
            else:
                stack.pop()
        else:  # 부호
            while stack and stack[-1] in op and op[c] <= op[stack[-1]]:
                result.append(stack.pop())
            stack.append(c)
    while stack:
        result.append(stack.pop())

    return ''.join(reversed(result))


print(infix_to_prefix('(A+B)*(C-D)'))  # *+AB-CD
print(infix_to_prefix('(A-B/C)*(A/K-L)'))  # *-A/BC-/AKL
```

## 2. Infix → Postfix

```py
def infix_to_postfix(exp):
    op = {'+': 1, '-': 1, '*': 2, '/': 2, '^': 3}
    result, stack = [], []
    for c in exp:
        if c.isalpha():
            result.append(c)
        elif c == '(':
            stack.append(c)
        elif c == ')':
            while stack and stack[-1] != '(':
                result.append(stack.pop())
            if stack and stack[-1] != '(':
                return -1
            else:
                stack.pop()
        else:  # 부호
            while stack and stack[-1] in op and op[c] <= op[stack[-1]]:
                result.append(stack.pop())
            stack.append(c)
    while stack:
        result.append(stack.pop())
    return ''.join(result)


print(infix_to_postfix('a+(b-c)'))  # abc-+
print(infix_to_postfix('a+b*(c^d-e)^(f+g*h)-i'))  # abcd^e-fgh*+^*+i-
```

## 3. Prefix → Infix

```py
def prefix_to_infix(exp):
    stack = []
    for c in exp[::-1]:
        if c.isalpha():
            stack.append(c)
        else:
            op1 = stack.pop()
            op2 = stack.pop()
            stack.append('(' + op1 + c + op2 + ')')
    return stack[-1][1:-1]


print(prefix_to_infix('*+AB-CD'))  # (A+B)*(C-D)
print(prefix_to_infix('*-A/BC-/AKL'))  # (A-(B/C))*((A/K)-L)
```

## 4. Prefix → Postfix

```py
def prefix_to_postfix(exp):
    stack = []
    for c in exp[::-1]:
        if c.isalpha():
            stack.append(c)
        else:
            op1 = stack.pop()
            op2 = stack.pop()
            stack.append(op1 + op2 + c)
    return stack[-1]


print(prefix_to_postfix('*+AB-CD'))  # AB+CD-*
print(prefix_to_postfix('*-A/BC-/AKL'))  # ABC/-AK/L-*
```

## 5. Postfix → Infix

```py
def postfix_to_infix(exp):
    stack = []
    for c in exp:
        if c.isalpha():
            stack.insert(0, c)
        else:
            op1 = stack.pop(0)
            op2 = stack.pop(0)
            stack.insert(0, '(' + op2 + c + op1 + ')')
    return stack[0][1:-1]


print(postfix_to_infix('abc++'))  # (a + (b + c))
print(postfix_to_infix('abcd^e-fgh*+^*+i-'))  # a+b*(c^d-e)^(f+g*h)-i

```

## 6. Postfix → Prefix

```py
def postfix_to_prefix(exp):
    stack = []
    for c in exp:
        if c.isalpha():
            stack.append(c)
        else:
            op1 = stack.pop()
            op2 = stack.pop()
            stack.append(c + op2 + op1)
    return stack[-1]


print(postfix_to_prefix('AB+CD-*'))  # *+AB-CD
print(postfix_to_prefix('ABC/-AK/L-*'))  # *-A/BC-/AKL
```
