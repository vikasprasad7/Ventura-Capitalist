import { useState } from "react";
import { useCompanySearch } from "@/hooks/useCompanySearch";
import { SearchBar } from "@/components/SearchBar";
import { FilterPanel } from "@/components/FilterPanel";
import { CompanyCard } from "@/components/CompanyCard";
import { CompanyProfile } from "@/components/CompanyProfile";
import { SavedListsPanel } from "@/components/SavedListsPanel";
import { SavedSearchesPanel } from "@/components/SavedSearchesPanel";
import { MOCK_COMPANIES, Company } from "@/lib/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, List, Bookmark, Zap } from "lucide-react";

const Index = () => {
  const {
    query, setQuery, filters, setFilters, filteredCompanies,
    savedLists, addToList, removeFromList, updateNotes, createList, deleteList,
    savedSearches, saveSearch, loadSearch, deleteSavedSearch,
  } = useCompanySearch();

  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [saveSearchOpen, setSaveSearchOpen] = useState(false);
  const [saveSearchName, setSaveSearchName] = useState("");
  const [activeTab, setActiveTab] = useState("discover");

  const handleOpenProfile = (companyId: string) => {
    const company = MOCK_COMPANIES.find(c => c.id === companyId);
    if (company) {
      setSelectedCompany(company);
      setProfileOpen(true);
    }
  };

  const handleSaveSearch = () => {
    if (!saveSearchName.trim()) return;
    saveSearch(saveSearchName.trim());
    setSaveSearchName("");
    setSaveSearchOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-50 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">VentureLens</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono">Intelligent Deal Discovery</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span className="px-2 py-1 rounded bg-primary/10 text-primary">{MOCK_COMPANIES.length} companies</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-secondary border border-border mb-6">
            <TabsTrigger value="discover" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs font-mono">
              <Search className="h-3 w-3 mr-1.5" /> Discover
            </TabsTrigger>
            <TabsTrigger value="lists" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs font-mono">
              <List className="h-3 w-3 mr-1.5" /> My Lists
              <span className="ml-1.5 text-[10px] opacity-70">({savedLists.reduce((a, l) => a + l.companies.length, 0)})</span>
            </TabsTrigger>
            <TabsTrigger value="searches" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs font-mono">
              <Bookmark className="h-3 w-3 mr-1.5" /> Saved Searches
              <span className="ml-1.5 text-[10px] opacity-70">({savedSearches.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="space-y-4">
            <SearchBar
              query={query}
              onQueryChange={setQuery}
              onSaveSearch={() => setSaveSearchOpen(true)}
              resultCount={filteredCompanies.length}
            />
            <FilterPanel filters={filters} onFiltersChange={setFilters} />

            <div className="grid md:grid-cols-2 gap-4">
              {filteredCompanies.map(company => (
                <CompanyCard key={company.id} company={company} onClick={() => handleOpenProfile(company.id)} />
              ))}
            </div>

            {filteredCompanies.length === 0 && (
              <div className="text-center py-16">
                <Search className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">No companies match your criteria.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="lists">
            <SavedListsPanel
              lists={savedLists}
              onCreateList={createList}
              onDeleteList={deleteList}
              onRemoveFromList={removeFromList}
              onUpdateNotes={updateNotes}
              onViewCompany={handleOpenProfile}
            />
          </TabsContent>

          <TabsContent value="searches">
            <SavedSearchesPanel
              searches={savedSearches}
              onLoad={(s) => { loadSearch(s); setActiveTab("discover"); }}
              onDelete={deleteSavedSearch}
            />
          </TabsContent>
        </Tabs>
      </main>

      <CompanyProfile
        company={selectedCompany}
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        savedLists={savedLists}
        onAddToList={addToList}
      />

      {/* Save Search Dialog */}
      <Dialog open={saveSearchOpen} onOpenChange={setSaveSearchOpen}>
        <DialogContent className="bg-card border-border max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-base">Save Current Search</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              value={saveSearchName}
              onChange={(e) => setSaveSearchName(e.target.value)}
              placeholder="Search name..."
              className="bg-secondary border-border"
              onKeyDown={(e) => e.key === "Enter" && handleSaveSearch()}
            />
            <Button onClick={handleSaveSearch} disabled={!saveSearchName.trim()} className="w-full" size="sm">
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
