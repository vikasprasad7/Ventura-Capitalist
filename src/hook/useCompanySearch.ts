import { useState, useCallback } from "react";
import { Company, SavedList, SavedSearch, SearchFilters, MOCK_COMPANIES } from "@/lib/mockData";

const DEFAULT_FILTERS: SearchFilters = {
  industry: "All Industries",
  stage: "All Stages",
  location: "All Locations",
  minScore: 0,
};

export function useCompanySearch() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>(DEFAULT_FILTERS);
  const [savedLists, setSavedLists] = useState<SavedList[]>(() => {
    const stored = localStorage.getItem("vc-saved-lists");
    return stored ? JSON.parse(stored) : [
      { id: "1", name: "Top Picks", companies: [] },
      { id: "2", name: "Watch List", companies: [] },
    ];
  });
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>(() => {
    const stored = localStorage.getItem("vc-saved-searches");
    return stored ? JSON.parse(stored) : [];
  });

  const persistLists = (lists: SavedList[]) => {
    setSavedLists(lists);
    localStorage.setItem("vc-saved-lists", JSON.stringify(lists));
  };

  const persistSearches = (searches: SavedSearch[]) => {
    setSavedSearches(searches);
    localStorage.setItem("vc-saved-searches", JSON.stringify(searches));
  };

  const filteredCompanies = MOCK_COMPANIES.filter((c) => {
    const matchesQuery = !query || 
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase()) ||
      c.tags.some(t => t.toLowerCase().includes(query.toLowerCase()));
    const matchesIndustry = filters.industry === "All Industries" || c.industry === filters.industry;
    const matchesStage = filters.stage === "All Stages" || c.stage === filters.stage;
    const matchesLocation = filters.location === "All Locations" || c.location === filters.location;
    const matchesScore = c.score >= filters.minScore;
    return matchesQuery && matchesIndustry && matchesStage && matchesLocation && matchesScore;
  });

  const addToList = useCallback((listId: string, companyId: string, notes: string = "") => {
    const updated = savedLists.map(list => {
      if (list.id !== listId) return list;
      if (list.companies.some(c => c.companyId === companyId)) return list;
      return {
        ...list,
        companies: [...list.companies, { companyId, notes, savedAt: new Date().toISOString() }],
      };
    });
    persistLists(updated);
  }, [savedLists]);

  const removeFromList = useCallback((listId: string, companyId: string) => {
    const updated = savedLists.map(list => {
      if (list.id !== listId) return list;
      return { ...list, companies: list.companies.filter(c => c.companyId !== companyId) };
    });
    persistLists(updated);
  }, [savedLists]);

  const updateNotes = useCallback((listId: string, companyId: string, notes: string) => {
    const updated = savedLists.map(list => {
      if (list.id !== listId) return list;
      return {
        ...list,
        companies: list.companies.map(c => c.companyId === companyId ? { ...c, notes } : c),
      };
    });
    persistLists(updated);
  }, [savedLists]);

  const createList = useCallback((name: string) => {
    const newList: SavedList = { id: Date.now().toString(), name, companies: [] };
    persistLists([...savedLists, newList]);
  }, [savedLists]);

  const deleteList = useCallback((listId: string) => {
    persistLists(savedLists.filter(l => l.id !== listId));
  }, [savedLists]);

  const saveSearch = useCallback((name: string) => {
    const newSearch: SavedSearch = {
      id: Date.now().toString(),
      name,
      query,
      filters,
      createdAt: new Date().toISOString(),
    };
    persistSearches([...savedSearches, newSearch]);
  }, [query, filters, savedSearches]);

  const loadSearch = useCallback((search: SavedSearch) => {
    setQuery(search.query);
    setFilters(search.filters);
  }, []);

  const deleteSavedSearch = useCallback((id: string) => {
    persistSearches(savedSearches.filter(s => s.id !== id));
  }, [savedSearches]);

  return {
    query, setQuery,
    filters, setFilters,
    filteredCompanies,
    savedLists, addToList, removeFromList, updateNotes, createList, deleteList,
    savedSearches, saveSearch, loadSearch, deleteSavedSearch,
  };
}
