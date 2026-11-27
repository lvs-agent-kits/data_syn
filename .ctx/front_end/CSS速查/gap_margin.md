## CSS 间隔属性分类

### 1. **外边距 (Margin)**
控制元素与外部其他元素之间的距离

```css
/* 单边设置 */
margin-top: 20px;
margin-right: 15px;
margin-bottom: 20px;
margin-left: 15px;

/* 简写形式 */
margin: 20px 15px;           /* 上下 20px，左右 15px */
margin: 20px 15px 10px;      /* 上 20px，左右 15px，下 10px */
margin: 20px 15px 10px 5px;  /* 上右下左 */

/* 自动居中 */
margin: 0 auto;              /* 水平居中 */
```

### 2. **内边距 (Padding)**
控制元素内容与边框之间的距离

```css
/* 单边设置 */
padding-top: 10px;
padding-right: 15px;
padding-bottom: 10px;
padding-left: 15px;

/* 简写形式（同 margin）*/
padding: 10px 15px;
padding: 10px 15px 20px;
padding: 10px 15px 20px 25px;
```

### 3. **Flexbox 和 Grid 中的 gap**
专门用于布局中子元素之间的间距

```css
/* Flexbox */
.container {
  display: flex;
  gap: 20px;                 /* 行列统一间距 */
  row-gap: 15px;             /* 行间距 */
  column-gap: 20px;          /* 列间距 */
}

/* Grid */
.grid-container {
  display: grid;
  gap: 20px;
  row-gap: 15px;
  column-gap: 20px;
}
```

### 4. **字间距和行高**
控制文本内部的间隔

```css
/* 字母间距 */
letter-spacing: 2px;         /* 字符之间增加 2px 间距 */

/* 单词间距 */
word-spacing: 5px;           /* 单词之间增加 5px 间距 */

/* 行高（行间距）*/
line-height: 1.5;            /* 相对值，推荐 */
line-height: 24px;           /* 固定值 */
```

### 5. **表格单元格间距**

```css
table {
  border-collapse: separate; /* 默认，单元格有间距 */
  border-spacing: 10px;      /* 单元格之间的间距 */
}

/* 或者合并边框（无间距）*/
table {
  border-collapse: collapse;
}
```

### 6. **多列布局间距**

```css
.columns {
  column-count: 3;
  column-gap: 30px;          /* 列之间的间距 */
}
```

