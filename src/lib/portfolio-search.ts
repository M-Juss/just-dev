export type SearchableLine = {
  text: string;
  section: string;
};

export function normalizeSearchText(text: string): string {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase().replace(/\s+/g, " ").trim();
}

export function searchPortfolioLines<T extends SearchableLine>(lines: readonly T[], query: string): T[] {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return [];
  const terms = normalizedQuery.split(" ");
  return lines
    .map((line, order) => {
      const text = normalizeSearchText(line.text);
      const matches = terms.every((term) => text.includes(term));
      const rank = text === normalizedQuery ? 0 : text.startsWith(normalizedQuery) ? 1 : text.includes(normalizedQuery) ? 2 : 3;
      return { line, order, matches, rank };
    })
    .filter((result) => result.matches)
    .sort((a, b) => a.rank - b.rank || a.order - b.order)
    .map(({ line }) => line);
}
