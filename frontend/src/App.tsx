import { useEffect, useMemo, useState } from "react";

type MotifTag = {
  tag_id: number;
  category_code: string;
  display_name: string;
  concatenation_priority: number;
  tag_name: string;
  text_content: string | null;
};

type Motif = {
  motif_id: number;
  generated_at: string;
  tags: MotifTag[];
};

export default function App() {
  const [motifs, setMotifs] = useState<Motif[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadMotifs() {
      try {
        const response = await fetch("/api/motifs", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`请求失败：HTTP ${response.status}`);
        }

        const data = (await response.json()) as Motif[];
        setMotifs(data);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "读取母题失败");
      } finally {
        setLoading(false);
      }
    }

    void loadMotifs();
    return () => controller.abort();
  }, []);

  const filteredMotifs = useMemo(() => {
    const keyword = search.trim().toLocaleLowerCase();

    if (!keyword) return motifs;

    return motifs.filter((motif) => {
      const searchableText = [
        String(motif.motif_id),
        ...motif.tags.flatMap((tag) => [
          tag.category_code,
          tag.display_name,
          tag.tag_name,
        ]),
      ]
        .join(" ")
        .toLocaleLowerCase();

      return searchableText.includes(keyword);
    });
  }, [motifs, search]);

  const selectedMotif =
    filteredMotifs.find((motif) => motif.motif_id === selectedId) ??
    filteredMotifs[0] ??
    null;

  // API 已按 concatenation_priority 排序，因此按返回顺序拼接即可。
  const combinedText =
    selectedMotif?.tags
      .map((tag) => tag.text_content?.trim() ?? "")
      .filter((content) => content.length > 0)
      .join("\n\n") ?? "";

  return (
    <main>
      <h1>母题查询</h1>

      <label>
        搜索母题 ID、类别或标签：
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="例如：1、数学、知识解惑"
        />
      </label>

      {loading && <p>正在加载母题……</p>}
      {error && <p role="alert">加载失败：{error}</p>}

      {!loading && !error && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(240px, 1fr) 2fr",
            gap: "24px",
            marginTop: "24px",
          }}
        >
          <section>
            <h2>母题列表</h2>

            {filteredMotifs.length === 0 ? (
              <p>没有找到母题。</p>
            ) : (
              <ul>
                {filteredMotifs.map((motif) => (
                  <li key={motif.motif_id}>
                    <button
                      type="button"
                      aria-pressed={selectedMotif?.motif_id === motif.motif_id}
                      onClick={() => setSelectedId(motif.motif_id)}
                    >
                      母题 #{motif.motif_id}（{motif.tags.length} 个标签）
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            {selectedMotif ? (
              <>
                <h2>母题 #{selectedMotif.motif_id}</h2>
                <p>
                  生成时间：
                  {new Date(selectedMotif.generated_at).toLocaleString()}
                </p>

                <h3>关联标签</h3>
                <ul>
                  {selectedMotif.tags.map((tag) => (
                    <li key={tag.tag_id}>
                      {tag.display_name}：{tag.tag_name}
                    </li>
                  ))}
                </ul>

                <h3>拼接后的文本</h3>
                <pre style={{ whiteSpace: "pre-wrap" }}>
                  {combinedText || "关联标签还没有录入文本。"}
                </pre>
              </>
            ) : (
              <p>没有可显示的母题。</p>
            )}
          </section>
        </div>
      )}
    </main>
  );
}