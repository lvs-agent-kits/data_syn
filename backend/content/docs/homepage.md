---
title: 项目简介
slug: intro
order: 1
---

## 对本项目的简要概括
本项目是一个用于自动化数据合成的项目

首先，人工生成高质量的母题，由若干个 TAGS 组成。

然后，由 Harness 来通过 self-instruct 的方式来探索母体的拓张。

最后，母题送入 LLM 生成对应的文件，之后可以进行容器化，获得可用的题目。

## 技术实现
前端：React

后端：FastAPI 

数据库：mysql 

容器化：Docker

## 可量化的结果评估