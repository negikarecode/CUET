"use client";

import React, { useState, useEffect } from "react";
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Database,
  Layers,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEED_SUBJECTS, SEED_CHAPTERS, SEED_TOPICS } from "@/lib/data-store";

export function ContentUploader() {
  const [selectedSubjectId, setSelectedSubjectId] = useState<number>(1);
  const [selectedChapterId, setSelectedChapterId] = useState<number>(10);
  const [selectedTopicId, setSelectedTopicId] = useState<number>(4);
  const [contentType, setContentType] = useState<string>("ncert");
  const [sourceDocument, setSourceDocument] = useState<string>("NCERT Class 12 Political Science");
  const [notesText, setNotesText] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Status & Progress state
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<string>("");
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [existingChunksCount, setExistingChunksCount] = useState<number>(0);

  // Filter chapters based on subject
  const availableChapters = SEED_CHAPTERS.filter(
    (c) => c.subject_id === selectedSubjectId
  );
  // Filter topics based on chapter
  const availableTopics = SEED_TOPICS.filter(
    (t) => t.chapter_id === selectedChapterId
  );

  useEffect(() => {
    // When subject changes, pick first available chapter
    if (availableChapters.length > 0 && !availableChapters.some((c) => c.id === selectedChapterId)) {
      setSelectedChapterId(availableChapters[0].id);
    }
  }, [selectedSubjectId, availableChapters, selectedChapterId]);

  useEffect(() => {
    // When chapter changes, pick first available topic
    if (availableTopics.length > 0 && !availableTopics.some((t) => t.id === selectedTopicId)) {
      setSelectedTopicId(availableTopics[0].id);
    }
  }, [selectedChapterId, availableTopics, selectedTopicId]);

  // Load existing chunks count for chosen topic
  useEffect(() => {
    async function loadChunkCount() {
      try {
        const res = await fetch(`/api/content/upload?topic_id=${selectedTopicId}`);
        if (res.ok) {
          const json = await res.json();
          setExistingChunksCount(json.count || 0);
        }
      } catch {}
    }
    if (selectedTopicId) loadChunkCount();
  }, [selectedTopicId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setSourceDocument(file.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const handleUploadAndEmbed = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notesText.trim() && !selectedFile) {
      setErrorMessage("Please enter text content or select a PDF file.");
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);
    setResultMessage(null);

    try {
      setCurrentStep("Splitting into chunks...");
      await new Promise((r) => setTimeout(r, 600));

      setCurrentStep("Generating embeddings via text-embedding-3-small...");
      await new Promise((r) => setTimeout(r, 600));

      setCurrentStep("Uploading vectors to Pinecone index 'cuet-content'...");

      const formData = new FormData();
      if (selectedFile) {
        formData.append("file", selectedFile);
      } else {
        formData.append("text", notesText);
      }
      formData.append("topic_id", selectedTopicId.toString());
      formData.append("chapter_id", selectedChapterId.toString());
      formData.append("subject_id", selectedSubjectId.toString());
      formData.append("content_type", contentType);
      formData.append("source_document", sourceDocument);

      const res = await fetch("/api/content/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to upload and embed content");
      }

      setCurrentStep("Content ready! AI can now generate questions.");
      setResultMessage(
        `Successfully embedded! ${data.result?.chunksCreated || 0} chunks created and indexed.`
      );
      setNotesText("");
      setSelectedFile(null);
      setExistingChunksCount(data.totalExistingChunksForTopic || 0);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown upload error";
      setErrorMessage(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 sm:p-8 bg-white border border-slate-200 rounded-3xl shadow-sm space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
            <Database className="w-4 h-4" />
            <span>Knowledge Base Pipeline</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 mt-1">
            Upload & Vectorize CUET Content
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Store verified NCERT & exam syllabus notes in Pinecone. The AI Question Generator references ONLY this material.
          </p>
        </div>

        <div className="flex items-center gap-2 p-3 bg-indigo-50 border border-indigo-100 rounded-2xl flex-shrink-0">
          <Layers className="w-5 h-5 text-indigo-600" />
          <div className="text-xs">
            <span className="font-bold text-slate-900 block">{existingChunksCount} Chunks</span>
            <span className="text-slate-500">Indexed for current topic</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleUploadAndEmbed} className="space-y-6">
        {/* Dropdowns Hierarchy */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              1. Subject
            </label>
            <select
              value={selectedSubjectId}
              onChange={(e) => setSelectedSubjectId(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              {SEED_SUBJECTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.icon} {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              2. Chapter
            </label>
            <select
              value={selectedChapterId}
              onChange={(e) => setSelectedChapterId(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              {availableChapters.map((c) => (
                <option key={c.id} value={c.id}>
                  Ch {c.chapter_number}: {c.chapter_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              3. Topic
            </label>
            <select
              value={selectedTopicId}
              onChange={(e) => setSelectedTopicId(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              {availableTopics.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.topic_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content Type & Source Document */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Content Category
            </label>
            <select
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="ncert">NCERT Text Content</option>
              <option value="notes">Teacher & Coaching Notes</option>
              <option value="pyq_explanation">PYQ Solution & Explanation</option>
              <option value="definition">Key Definition & Legal Clause</option>
              <option value="example">Conceptual Example & Case Study</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Source Document Name
            </label>
            <input
              type="text"
              value={sourceDocument}
              onChange={(e) => setSourceDocument(e.target.value)}
              placeholder="e.g. NCERT Political Science Chapter 4"
              className="w-full p-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        {/* File Upload / Drag & Drop */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            Upload PDF Document (Optional)
          </label>
          <div className="p-4 border-2 border-dashed border-slate-200 rounded-2xl hover:border-indigo-400 text-center transition-colors bg-slate-50/50">
            <input
              type="file"
              id="file-upload"
              accept=".pdf,.txt"
              onChange={handleFileChange}
              className="hidden"
            />
            <label htmlFor="file-upload" className="cursor-pointer space-y-2 block">
              <Upload className="w-7 h-7 text-indigo-500 mx-auto" />
              <div className="text-xs text-slate-600">
                {selectedFile ? (
                  <span className="font-bold text-indigo-700">{selectedFile.name}</span>
                ) : (
                  <span>
                    <strong className="text-indigo-600">Click to upload</strong> or drag & drop PDF notes
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400">PDF or plain text up to 10MB</p>
            </label>
          </div>
        </div>

        {/* Textarea for Direct Content */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            Or Paste Verified CUET Notes Directly
          </label>
          <textarea
            rows={7}
            value={notesText}
            onChange={(e) => setNotesText(e.target.value)}
            placeholder="Paste syllabus notes, constitutional articles, historical facts, or definitions here..."
            className="w-full p-4 rounded-2xl border border-slate-200 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Progress & Status */}
        {isProcessing && (
          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center gap-3 animate-pulse">
            <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
            <span className="text-xs sm:text-sm font-semibold text-indigo-900">
              {currentStep}
            </span>
          </div>
        )}

        {resultMessage && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-emerald-900">
              {resultMessage}
            </span>
          </div>
        )}

        {errorMessage && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-red-900">
              {errorMessage}
            </span>
          </div>
        )}

        {/* Action Button */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="submit"
            disabled={isProcessing}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 px-8 rounded-xl shadow-md gap-2"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing & Vectorizing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Upload & Embed to Pinecone →</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
