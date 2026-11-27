## CSS display 属性详解

### 1. **常用值**

#### `block`（块级元素）
- 独占一行，宽度默认占满父容器
- 可以设置 width、height、margin、padding

#### `inline`（行内元素）
- 不独占一行，与其他行内元素在同一行
- 不能设置 width、height（由内容决定）
- 只能设置左右 margin/padding，上下无效

#### `inline-block`（行内块级元素）
- 不独占一行，但可以设置 width、height
- 兼具 inline 和 block 的特点
- 常用于需要横向排列且可控制尺寸的元素
---

### 2. **布局相关值**

#### `flex`（弹性盒子）
- 创建弹性容器，子元素成为 flex item
- 支持灵活的布局和对齐方式
- 现代布局的首选方案之一

##### Case 
```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

##### 学习资源
[菜鸟-FLEX 详解](https://www.runoob.com/w3cnote/flex-grammar.html)

#### `grid`（网格布局）
- 创建二维网格布局系统
- 适合复杂的行列布局

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
```

#### `inline-flex` / `inline-grid`
- 分别是 flex 和 grid 的行内版本
- 容器本身表现为行内元素

---

### 3. **特殊值**

#### `none`
- 元素完全从文档流中移除
- 不占据空间，不可见
- 与 `visibility: hidden` 不同（后者仍占空间）

#### `contents`
- 元素本身不生成任何盒模型
- 但其子元素正常渲染
- 常用于需要"穿透"父元素的场景

---

### 4. **表格相关值**

| 值 | 对应 HTML 元素 | 说明 |
|---|---|---|
| `table` | `<table>` | 块级表格 |
| `inline-table` | - | 行内表格 |
| `table-row` | `<tr>` | 表格行 |
| `table-cell` | `<td>`, `<th>` | 表格单元格 |
| `table-header-group` | `<thead>` | 表头组 |
| `table-footer-group` | `<tfoot>` | 表脚组 |
| `table-row-group` | `<tbody>` | 表格主体 |

```css
.div-table {
  display: table;
}
.div-row {
  display: table-row;
}
.div-cell {
  display: table-cell;
}
```

---

### 5. **列表相关值**

#### `list-item`
- 使元素表现得像 `<li>`
- 可以显示列表标记（bullet/number）

```css
.item {
  display: list-item;
  list-style-type: disc;
  margin-left: 20px;
}
```

---

### 6. **其他值**

#### `inherit`
- 继承父元素的 display 值

#### `initial`
- 重置为默认值

#### `revert`
- 回退到用户代理样式或用户样式

---

### 对比总结表

| display 值 | 是否换行 | 可设宽高 | 典型用途 |
|-----------|---------|---------|---------|
| `block` | ✓ | ✓ | 常规块级布局 |
| `inline` | ✗ | ✗ | 文本内元素 |
| `inline-block` | ✗ | ✓ | 按钮、标签等 |
| `flex` | ✓ | ✓ | 一维灵活布局 |
| `grid` | ✓ | ✓ | 二维网格布局 |
| `none` | - | - | 隐藏元素 |

---

### 实际应用建议

1. **现代布局优先使用** `flex` 和 `grid`
2. **行内元素需要尺寸控制时用** `inline-block`
3. **隐藏元素用** `display: none`（彻底移除）或 `visibility: hidden`（保留空间）
4. **避免滥用** `table` 相关 display 值进行布局（语义化问题）
