import React, { useMemo, useState } from "react";
import { FaSuitcase, FaCheckSquare } from "react-icons/fa";

const PackingList = ({ packing }) => {
  const [checkedItems, setCheckedItems] = useState({});
  const brand = "#880d1e";
  const brandLight = "rgba(136,13,30,0.28)";

  // Guard
  if (!packing) {
    return (
      <div className="p-6 rounded-xl border text-center bg-[#0f1116]/70" style={{ borderColor: brandLight }}>
        <p className="text-sm text-gray-400">No packing data available.</p>
        <p className="mt-1 font-medium" style={{ color: "#ffd8dd" }}>Generate itinerary first.</p>
      </div>
    );
  }

  // Normalize root shapes:
  // Possibilities seen in APIs:
  // { categories: [{ name, items:[...] }]}
  // { list: [{ title, list:[...] }]}
  // { items: [...] }
  // Array of strings directly
  // { clothing:[...], essentials:[...], electronics:[...] } (category-like keys)
  const isDirectArray = Array.isArray(packing) && packing.every(v => typeof v === "string");
  const categoryLikeKeys = !Array.isArray(packing) && typeof packing === "object"
    ? Object.keys(packing).filter(k => Array.isArray(packing[k]) && packing[k].every(v => typeof v === "string"))
    : [];

  let rawCategories =
    Array.isArray(packing.categories)
      ? packing.categories
      : Array.isArray(packing.list)
      ? packing.list
      : [];

  // If no formal categories but direct array
  if (rawCategories.length === 0 && isDirectArray) {
    rawCategories = [{ name: "Items", items: packing }];
  }

  // If no formal categories but category-like keys (essentials, clothing, etc.)
  if (rawCategories.length === 0 && categoryLikeKeys.length) {
    rawCategories = categoryLikeKeys.map((k) => ({ name: k.replace(/_/g, " "), items: packing[k] }));
  }

  // Fallback to packing.items
  if (rawCategories.length === 0 && Array.isArray(packing.items)) {
    rawCategories = [{ name: "Items", items: packing.items }];
  }

  // Final normalization
  const normalized = rawCategories.map((c, idx) => {
    const itemsCandidate =
      Array.isArray(c.items) ? c.items :
      Array.isArray(c.list) ? c.list :
      Array.isArray(c.contents) ? c.contents :
      [];

    // Flatten possible object items: [{ name }, { item }, "string"]
    const flatItems = itemsCandidate.map(it =>
      typeof it === "string"
        ? it
        : it?.name || it?.item || it?.title || ""
    ).filter(Boolean);

    return {
      name: c.name || c.category || c.title || `Category ${idx + 1}`,
      items: flatItems
    };
  }).filter(cat => cat.items.length > 0);

  const allItems = useMemo(() => normalized.flatMap(c => c.items), [normalized]);

  const toggleItem = (item) =>
    setCheckedItems(prev => ({ ...prev, [item]: !prev[item] }));

  const checkAll = () =>
    setCheckedItems(Object.fromEntries(allItems.map(i => [i, true])));

  const clearAll = () => setCheckedItems({});

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div className="rounded-2xl p-8 border bg-[#0f1116]/70 backdrop-blur" style={{ borderColor: brandLight }}>
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <FaSuitcase className="text-3xl" style={{ color: brand }} />
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-100">Packing List</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-sm text-gray-300 mr-2">
            {checkedCount}/{allItems.length} selected
          </span>
          <button
            type="button"
            onClick={checkAll}
            disabled={!allItems.length}
            className="px-3 py-2 text-sm rounded-lg border disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: `linear-gradient(90deg, ${brand}, #a3192c)`,
              borderColor: "rgba(136,13,30,0.5)",
              color: "#fff",
            }}
          >
            Select all
          </button>
          <button
            type="button"
            onClick={clearAll}
            disabled={!checkedCount}
            className="px-3 py-2 text-sm rounded-lg border text-gray-200 hover:bg-white/5 transition disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ borderColor: "rgba(255,255,255,0.12)" }}
          >
            Clear
          </button>
        </div>
      </div>

      {!allItems.length && (
        <div className="p-4 rounded-lg border bg-black/30 mb-4" style={{ borderColor: brandLight }}>
          <p className="text-xs text-gray-400">No items found. Check the structure of the packing prop.</p>
          <details className="mt-2 text-xs text-gray-500">
            <summary className="cursor-pointer text-gray-400">Debug view</summary>
            <pre className="mt-2 max-h-64 overflow-auto whitespace-pre-wrap text-[10px] text-gray-300">
{JSON.stringify(packing, null, 2)}
            </pre>
          </details>
        </div>
      )}

      <div className="space-y-6">
        {normalized.map((category, catIdx) => {
          const items = category.items;
            const catChecked = items.filter(i => checkedItems[i]).length;
            const pct = items.length ? Math.round((catChecked / items.length) * 100) : 0;

            return (
              <div
                key={catIdx}
                className="p-5 rounded-xl border bg-black/30"
                style={{ borderColor: brandLight }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-100">{category.name}</h3>
                  <span className="text-xs text-gray-400">{catChecked}/{items.length}</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded mb-4 overflow-hidden">
                  <div
                    className="h-full rounded"
                    style={{
                      width: `${pct}%`,
                      background: `linear-gradient(90deg, ${brand}, #a3192c)`,
                    }}
                  />
                </div>
                <div className="space-y-2">
                  {items.map((item, itemIdx) => (
                    <label
                      key={itemIdx}
                      className="flex items-center gap-3 cursor-pointer rounded-lg px-2 py-2 hover:bg-white/5 transition"
                    >
                      <input
                        type="checkbox"
                        checked={!!checkedItems[item]}
                        onChange={() => toggleItem(item)}
                        className="w-5 h-5 rounded"
                        style={{ accentColor: brand }}
                      />
                      <span
                        className={`text-sm ${
                          checkedItems[item] ? "line-through text-gray-500" : "text-gray-300"
                        }`}
                      >
                        {item}
                      </span>
                      {checkedItems[item] && (
                        <FaCheckSquare className="text-emerald-400 ml-auto" />
                      )}
                    </label>
                  ))}
                  {items.length === 0 && (
                    <p className="text-xs text-gray-400">No items in this category.</p>
                  )}
                </div>
              </div>
            );
        })}
      </div>
    </div>
  );
};

export default PackingList;