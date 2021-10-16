---
title: 'Code Spell Checker'
date: '2021-03-21T12:13:07+09:00'
excerpt: 'Code Spell Checker는 맞춤법 검사기 for vscode다.'
tags: [vscode]
published: true
---

**Code Spell Checker**는 맞춤법 검사기 for vscode이다.

과제를 평가하다보면 가끔 코드에 오타가 보이곤 한다. 이런 오타들은 코드의 신뢰성을 떨어트리고, typescript를 사용하지 않는 경우 오타 때문에 헤메는 경우가 있다. 하지만 우리는 한국인이기 때문에 `전번화호`가 잘못 입력된건 쉽게 파악할 수 있지만 `phaneNomber`에서 오타를 찾기 어려울때가 있다.

vscode extension 중에 영문 스펠링 체크를 해주는 확장 프로그램이 있다.
https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker

![](https://raw.githubusercontent.com/streetsidesoftware/vscode-spell-checker/master/packages/client/images/example.gif)

**Code Spell Checker**는 스펠링이 잘못된 단어에 파란색 warning을 띄워주기 때문에 오타를 쉽게 발견할 수 있다. 오타 뿐만이 아니라 `noncompare` 같은 없는 단어도 알려주기 때문에 영알못에게 큰 도움이 된다.
