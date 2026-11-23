INSERT INTO motif_tags (motif_id, tag_id)
SELECT 1, t.tag_id
FROM tags AS t
JOIN tag_categories AS c ON c.category_id = t.category_id
WHERE
    (c.category_code = 'scene' AND t.tag_name = '知识解惑')
    OR (c.category_code = 'domain' AND t.tag_name = '数学')
    OR (c.category_code = 'reference_scope' AND t.tag_name = '理解与分析（20–25页内容）')
    OR (c.category_code = 'general_document' AND t.tag_name = 'general_doc_v1')
    OR (c.category_code = 'format_document' AND t.tag_name = 'format_doc_v1')
    OR (c.category_code = 'process_constraint_document' AND t.tag_name = 'process_constraint_doc_v1');