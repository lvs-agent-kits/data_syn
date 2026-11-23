SET NAMES utf8mb4;
INSERT INTO tags (category_id, tag_name)
SELECT category_id, '知识解惑'
FROM tag_categories
WHERE category_code = 'scene'
UNION ALL
SELECT category_id, '建议生成'
FROM tag_categories
WHERE category_code = 'scene'
UNION ALL
SELECT category_id, '数学'
FROM tag_categories
WHERE category_code = 'domain'
UNION ALL
SELECT category_id, '金融'
FROM tag_categories
WHERE category_code = 'domain'
UNION ALL
SELECT category_id, '代码'
FROM tag_categories
WHERE category_code = 'domain'
UNION ALL
SELECT category_id, 'understanding analysis page20-25'
FROM tag_categories
WHERE category_code = 'reference_scope'
UNION ALL
SELECT category_id, 'general_doc_v1'
FROM tag_categories
WHERE category_code = 'general_document'
UNION ALL
SELECT category_id, 'format_doc_v1'
FROM tag_categories
WHERE category_code = 'format_document'
UNION ALL
SELECT category_id, 'process_constraint_doc_v1'
FROM tag_categories
WHERE category_code = 'process_constraint_document';