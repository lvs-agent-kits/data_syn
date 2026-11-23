import os

from fastapi import FastAPI, HTTPException
from sqlalchemy import create_engine, text
from sqlalchemy.engine import URL

app = FastAPI(title="Data Synth API")

engine = create_engine(
    URL.create(
        "mysql+pymysql",
        username=os.environ["DB_USER"],
        password=os.environ["DB_PASSWORD"],
        host=os.environ.get("DB_HOST", "db"),
        port=int(os.environ.get("DB_PORT", "3306")),
        database=os.environ["DB_NAME"],
    ),
    pool_pre_ping=True,
    connect_args={"charset": "utf8mb4"},
)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/health/db")
def database_health():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        return {"status": "ok", "database": "ok"}
    except Exception as exc:
        raise HTTPException(
            status_code=503,
            detail="MySQL connection failed",
        ) from exc

@app.get("/api/motifs")
def list_motifs():
    query = text("""
        SELECT
            m.motif_id,
            m.generated_at,
            t.tag_id,
            t.tag_name,
            t.text_content,
            c.category_code,
            c.display_name,
            c.concatenation_priority
        FROM motifs AS m
        LEFT JOIN motif_tags AS mt
            ON mt.motif_id = m.motif_id
        LEFT JOIN tags AS t
            ON t.tag_id = mt.tag_id
        LEFT JOIN tag_categories AS c
            ON c.category_id = t.category_id
        ORDER BY
            m.motif_id,
            c.concatenation_priority,
            t.tag_id
    """)

    with engine.connect() as connection:
        rows = connection.execute(query).mappings().all()

    motifs = {}

    for row in rows:
        motif_id = row["motif_id"]

        if motif_id not in motifs:
            motifs[motif_id] = {
                "motif_id": motif_id,
                "generated_at": row["generated_at"],
                "tags": [],
            }

        if row["tag_id"] is not None:
            motifs[motif_id]["tags"].append({
                "tag_id": row["tag_id"],
                "category_code": row["category_code"],
                "display_name": row["display_name"],
                "concatenation_priority": row["concatenation_priority"],
                "tag_name": row["tag_name"],
                "text_content": row["text_content"],
            })

    return list(motifs.values())