CREATE TABLE IF NOT EXISTS motifs (
    motif_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    generated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (motif_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS tag_categories (
    category_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    category_code VARCHAR(64) NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    concatenation_priority SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (category_id),
    UNIQUE KEY uq_tag_categories_code (category_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS tags (
    tag_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    category_id SMALLINT UNSIGNED NOT NULL,
    tag_name VARCHAR(255) NOT NULL,
    text_content MEDIUMTEXT NULL,
    PRIMARY KEY (tag_id),
    UNIQUE KEY uq_tags_category_name (category_id, tag_name),
    CONSTRAINT fk_tags_category
        FOREIGN KEY (category_id)
        REFERENCES tag_categories (category_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS motif_tags (
    motif_id BIGINT UNSIGNED NOT NULL,
    tag_id BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (motif_id, tag_id),
    KEY idx_motif_tags_tag_id (tag_id, motif_id),
    CONSTRAINT fk_motif_tags_motif
        FOREIGN KEY (motif_id)
        REFERENCES motifs (motif_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_motif_tags_tag
        FOREIGN KEY (tag_id)
        REFERENCES tags (tag_id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS tag_texts (
    tag_text_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    tag_id BIGINT UNSIGNED NOT NULL,
    version_label VARCHAR(64) NULL,
    variant_label VARCHAR(128) NULL,
    sort_order SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    text_content MEDIUMTEXT NOT NULL,
    PRIMARY KEY (tag_text_id),
    KEY idx_tag_texts_tag_order (tag_id, sort_order),
    CONSTRAINT fk_tag_texts_tag
        FOREIGN KEY (tag_id)
        REFERENCES tags (tag_id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT IGNORE INTO tag_categories
    (category_code, display_name, concatenation_priority)
VALUES
    ('scene', 'Scene', 10),
    ('domain', 'Domain', 20),
    ('reference_scope', 'Reference Scope', 30),
    ('general_document', 'General Document', 40),
    ('format_document', 'Format Document', 50),
    ('process_constraint_document', 'Process Constraint Document', 60);