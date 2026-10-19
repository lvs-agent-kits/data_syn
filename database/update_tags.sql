SET NAMES utf8mb4;

START TRANSACTION;

UPDATE tags
SET tag_name = CASE tag_id
    WHEN 1 THEN '知识解惑'
    WHEN 2 THEN '建议生成'
    WHEN 3 THEN '数学'
    WHEN 4 THEN '金融'
    WHEN 5 THEN '代码'
    WHEN 6 THEN '理解与分析（20–25页内容）'
    WHEN 7 THEN 'general_doc_v1'
    WHEN 8 THEN 'format_doc_v1'
    WHEN 9 THEN 'process_constraint_doc_v1'
    ELSE tag_name
END
WHERE tag_id BETWEEN 1 AND 9;

COMMIT;