import os
from pathlib import Path

from sqlalchemy import URL, create_engine, text


TEXTS_DIR = Path("/data/tag_texts")


def main() -> None:
    if not TEXTS_DIR.is_dir():
        raise SystemExit(f"找不到文档目录：{TEXTS_DIR}")

    files = list(TEXTS_DIR.glob("*.md"))
    if not files:
        raise SystemExit(f"目录里没有 .md 文件：{TEXTS_DIR}")

    records = []
    seen_ids = set()

    for path in files:
        if not path.stem.isdecimal():
            raise SystemExit(f"文件名必须是 tag_id，例如 1.md：{path.name}")

        tag_id = int(path.stem)
        if tag_id in seen_ids:
            raise SystemExit(f"tag_id={tag_id} 对应了多个文件")
        seen_ids.add(tag_id)

        content = path.read_text(encoding="utf-8")
        if not content.strip():
            raise SystemExit(f"文件内容为空：{path.name}")

        records.append((tag_id, content, path.name))

    records.sort(key=lambda record: record[0])

    database_url = URL.create(
        "mysql+pymysql",
        username=os.environ["DB_USER"],
        password=os.environ["DB_PASSWORD"],
        host=os.environ.get("DB_HOST", "db"),
        port=int(os.environ.get("DB_PORT", "3306")),
        database=os.environ["DB_NAME"],
    )
    engine = create_engine(database_url, pool_pre_ping=True, connect_args={"charset": "utf8mb4"},)

    with engine.begin() as connection:
        for tag_id, content, filename in records:
            exists = connection.execute(
                text("SELECT 1 FROM tags WHERE tag_id = :tag_id"),
                {"tag_id": tag_id},
            ).first()

            if exists is None:
                raise SystemExit(
                    f"{filename} 对应的 tag_id={tag_id} 不存在；本次更新已回滚"
                )

            connection.execute(
                text("""
                    UPDATE tags
                    SET text_content = :content
                    WHERE tag_id = :tag_id
                """),
                {"tag_id": tag_id, "content": content},
            )

    engine.dispose()
    print(f"已更新 {len(records)} 个标签的文本。")


if __name__ == "__main__":
    main()