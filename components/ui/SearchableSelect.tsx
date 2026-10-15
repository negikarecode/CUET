"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useId,
} from "react";
import {
  ChevronDown,
  Search,
  Check,
  X,
} from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
  sublabel?: string;
  icon?: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
  keywords?: string[];
  badge?: string;
}

export interface SelectGroup {
  heading: string;
  options: SelectOption[];
}

export type SearchableSelectOption = SelectOption | SelectGroup;

export function isGroup(item: SearchableSelectOption): item is SelectGroup {
  return "heading" in item && Array.isArray((item as SelectGroup).options);
}

interface SearchableSelectProps {
  options: SearchableSelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  ariaLabel?: string;
  className?: string;
  buttonClassName?: string;
  menuClassName?: string;
  leadingIcon?: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
  name?: string;
  id?: string;
}

/**
 * Normalizes text by stripping accents, punctuation, and extra whitespace
 * so "bsc hons physics" matches "B.Sc. (Hons.) Physics".
 */
function normalizeForSearch(str: string): string {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[()_.\-–—,/]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Renders text with the matching query highlighted
 */
function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const rawQ = query.trim();
  const escaped = rawQ.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark
            key={i}
            className="bg-amber-100 text-amber-950 rounded-xs font-semibold px-0.5"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export default function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  ariaLabel,
  className = "",
  buttonClassName = "",
  menuClassName = "",
  leadingIcon: LeadingIcon,
  disabled = false,
  name,
  id,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);

  const selectId = useId();
  const listboxId = `${selectId}-listbox`;

  // Flatten options for easy indexing & lookups
  const flatOptions = useMemo(() => {
    const list: SelectOption[] = [];
    for (const item of options) {
      if (isGroup(item)) {
        for (const opt of item.options) {
          list.push(opt);
        }
      } else {
        list.push(item);
      }
    }
    return list;
  }, [options]);

  // Selected option
  const selectedOption = useMemo(() => {
    return flatOptions.find((opt) => opt.value === value) || null;
  }, [flatOptions, value]);

  // Filter options based on searchQuery
  const filteredGroups = useMemo(() => {
    const q = searchQuery.trim();
    if (!q) {
      return options;
    }

    const normQ = normalizeForSearch(q);
    const result: SearchableSelectOption[] = [];

    const matchesOption = (opt: SelectOption): boolean => {
      if (normalizeForSearch(opt.label).includes(normQ)) return true;
      if (opt.sublabel && normalizeForSearch(opt.sublabel).includes(normQ)) return true;
      if (normalizeForSearch(opt.value).includes(normQ)) return true;
      if (opt.keywords) {
        for (const kw of opt.keywords) {
          if (normalizeForSearch(kw).includes(normQ)) return true;
        }
      }
      return false;
    };

    for (const item of options) {
      if (isGroup(item)) {
        const matchingSubs = item.options.filter(matchesOption);
        if (matchingSubs.length > 0) {
          result.push({
            heading: item.heading,
            options: matchingSubs,
          });
        }
      } else {
        if (matchesOption(item)) {
          result.push(item);
        }
      }
    }

    return result;
  }, [options, searchQuery]);

  // Flattened list of currently visible/filtered selectable options (capped at 100 for speed)
  const visibleSelectableOptions = useMemo(() => {
    const list: SelectOption[] = [];
    for (const item of filteredGroups) {
      if (isGroup(item)) {
        for (const opt of item.options) {
          list.push(opt);
          if (list.length >= 100) return list;
        }
      } else {
        list.push(item);
        if (list.length >= 100) return list;
      }
    }
    return list;
  }, [filteredGroups]);

  // Keep highlighted index within bounds
  useEffect(() => {
    setHighlightedIndex(0);
  }, [searchQuery]);

  // Focus search input automatically when open
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isOpen) {
      timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery("");
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isOpen]);

  // Close when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  const handleSelect = useCallback(
    (optVal: string) => {
      onChange(optVal);
      setIsOpen(false);
      triggerRef.current?.focus();
    },
    [onChange]
  );

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
      triggerRef.current?.focus();
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => {
        const next = prev + 1;
        return next < visibleSelectableOptions.length ? next : 0;
      });
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => {
        const next = prev - 1;
        return next >= 0 ? next : visibleSelectableOptions.length - 1;
      });
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const current = visibleSelectableOptions[highlightedIndex];
      if (current && !current.disabled) {
        handleSelect(current.value);
      }
      return;
    }

    if (e.key === "Home") {
      e.preventDefault();
      setHighlightedIndex(0);
      return;
    }

    if (e.key === "End") {
      e.preventDefault();
      setHighlightedIndex(Math.max(0, visibleSelectableOptions.length - 1));
      return;
    }
  };

  const SelectedIcon = selectedOption?.icon || LeadingIcon;

  return (
    <div
      ref={containerRef}
      className={`relative inline-block text-left ${className}`}
      onKeyDown={handleKeyDown}
    >
      {name && <input type="hidden" name={name} value={value} />}

      {/* Trigger Button */}
      <button
        ref={triggerRef}
        id={id}
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-label={ariaLabel || placeholder}
        className={`w-full bg-slate-50 hover:bg-slate-100/90 text-slate-800 font-semibold text-[13px] px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors flex items-center justify-between gap-2 text-left disabled:opacity-50 disabled:cursor-not-allowed ${buttonClassName}`}
      >
        <div className="flex items-center gap-2 min-w-0 truncate">
          {SelectedIcon && (
            <SelectedIcon className="w-4 h-4 text-slate-500 shrink-0" />
          )}
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          {selectedOption?.badge && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-200/80 text-slate-600 shrink-0">
              {selectedOption.badge}
            </span>
          )}
        </div>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-blue-600" : ""
          }`}
        />
      </button>

      {/* Menu / Dropdown Popover */}
      {isOpen && (
        <>
          {/* Mobile Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-2xs z-40 sm:hidden animate-fade-in"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <div
            id={listboxId}
            role="listbox"
            tabIndex={-1}
            aria-label={ariaLabel || placeholder}
            ref={listboxRef}
            className={`
              fixed bottom-0 left-0 right-0 sm:absolute sm:bottom-auto sm:top-full sm:left-0 sm:right-auto
              mt-0 sm:mt-1.5 w-full sm:w-auto sm:min-w-[260px] sm:max-w-md
              bg-white rounded-t-3xl sm:rounded-2xl border border-slate-200/90 shadow-2xl z-50
              p-2.5 sm:p-2 space-y-1.5 max-h-[85vh] sm:max-h-[360px] flex flex-col overflow-hidden
              ${menuClassName}
            `}
          >
            {/* Mobile Header handle & title */}
            <div className="sm:hidden flex items-center justify-between pb-2 px-1 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-800">
                {placeholder}
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Input Box */}
            <div className="relative shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    searchInputRef.current?.focus();
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5 rounded-md"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Options List Container */}
            <div className="overflow-y-auto overscroll-contain flex-1 space-y-0.5 pr-0.5 scrollbar-thin">
              {filteredGroups.length === 0 ? (
                <div className="py-6 px-3 text-center space-y-2">
                  <p className="text-xs text-slate-500 font-medium">
                    No results for &ldquo;{searchQuery}&rdquo;
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      searchInputRef.current?.focus();
                    }}
                    className="text-xs text-blue-600 font-semibold hover:underline"
                  >
                    Clear search
                  </button>
                </div>
              ) : (
                (() => {
                  let globalIndex = 0;
                  return filteredGroups.map((item, gIdx) => {
                    if (isGroup(item)) {
                      return (
                        <div key={`group-${gIdx}-${item.heading}`} className="pt-1.5 first:pt-0">
                          <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 select-none">
                            {item.heading}
                          </div>
                          <div className="space-y-0.5">
                            {item.options.map((opt) => {
                              const currIdx = globalIndex++;
                              const isSelected = opt.value === value;
                              const isHighlighted = currIdx === highlightedIndex;
                              const OptIcon = opt.icon;

                              return (
                                <button
                                  key={`opt-${opt.value}`}
                                  type="button"
                                  role="option"
                                  aria-selected={isSelected}
                                  disabled={opt.disabled}
                                  onClick={() => !opt.disabled && handleSelect(opt.value)}
                                  onMouseEnter={() => setHighlightedIndex(currIdx)}
                                  className={`w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl text-left text-xs transition-all cursor-pointer ${
                                    isSelected
                                      ? "bg-blue-50 text-blue-700 font-bold"
                                      : isHighlighted
                                      ? "bg-slate-100 text-slate-900 font-semibold"
                                      : "text-slate-700 hover:bg-slate-50 font-medium"
                                  } ${opt.disabled ? "opacity-40 cursor-not-allowed" : ""}`}
                                >
                                  <div className="flex items-center gap-2 min-w-0 flex-1">
                                    {OptIcon && (
                                      <OptIcon
                                        className={`w-4 h-4 shrink-0 ${
                                          isSelected ? "text-blue-600" : "text-slate-400"
                                        }`}
                                      />
                                    )}
                                    <div className="min-w-0 flex-1">
                                      <div className="truncate">
                                        <HighlightMatch text={opt.label} query={searchQuery} />
                                      </div>
                                      {opt.sublabel && (
                                        <div className="text-[11px] text-slate-400 font-normal truncate">
                                          <HighlightMatch text={opt.sublabel} query={searchQuery} />
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                    {opt.badge && (
                                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600">
                                        {opt.badge}
                                      </span>
                                    )}
                                    {isSelected && (
                                      <Check className="w-4 h-4 text-blue-600 shrink-0 stroke-[2.5]" />
                                    )}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }

                    const opt = item;
                    const currIdx = globalIndex++;
                    const isSelected = opt.value === value;
                    const isHighlighted = currIdx === highlightedIndex;
                    const OptIcon = opt.icon;

                    return (
                      <button
                        key={`opt-${opt.value}`}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        disabled={opt.disabled}
                        onClick={() => !opt.disabled && handleSelect(opt.value)}
                        onMouseEnter={() => setHighlightedIndex(currIdx)}
                        className={`w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl text-left text-xs transition-all cursor-pointer ${
                          isSelected
                            ? "bg-blue-50 text-blue-700 font-bold"
                            : isHighlighted
                            ? "bg-slate-100 text-slate-900 font-semibold"
                            : "text-slate-700 hover:bg-slate-50 font-medium"
                        } ${opt.disabled ? "opacity-40 cursor-not-allowed" : ""}`}
                      >
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          {OptIcon && (
                            <OptIcon
                              className={`w-4 h-4 shrink-0 ${
                                isSelected ? "text-blue-600" : "text-slate-400"
                              }`}
                            />
                          )}
                          <div className="min-w-0 flex-1">
                            <div className="truncate">
                              <HighlightMatch text={opt.label} query={searchQuery} />
                            </div>
                            {opt.sublabel && (
                              <div className="text-[11px] text-slate-400 font-normal truncate">
                                <HighlightMatch text={opt.sublabel} query={searchQuery} />
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                          {opt.badge && (
                            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600">
                              {opt.badge}
                            </span>
                          )}
                          {isSelected && (
                            <Check className="w-4 h-4 text-blue-600 shrink-0 stroke-[2.5]" />
                          )}
                        </div>
                      </button>
                    );
                  });
                })()
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
