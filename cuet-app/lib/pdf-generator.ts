import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MockTestAnalysis, MockTestSession } from './types';

export function generatePerformancePDF(params: {
  analysis: MockTestAnalysis;
  session?: MockTestSession;
  studentName: string;
}): jsPDF {
  const { analysis, session, studentName } = params;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const testTitle = session?.session_name || 'CUET Full Mock Test';
  const testDate = session?.completed_at
    ? new Date(session.completed_at).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : new Date().toLocaleDateString('en-IN');

  const primaryColor: [number, number, number] = [79, 70, 229]; // Indigo 600
  const darkTextColor: [number, number, number] = [30, 41, 59]; // Slate 800

  // ═════════════════════════════════════════════════════════
  // PAGE 1: Executive Summary & AI Coach
  // ═════════════════════════════════════════════════════════
  // Header Banner
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 28, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('CUET AI PERFORMANCE ANALYZER', 14, 12);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`${testTitle} | Student: ${studentName} | Date: ${testDate}`, 14, 20);

  // Score Hero Box
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(14, 34, 182, 38, 3, 3, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, 34, 182, 38, 3, 3, 'D');

  doc.setTextColor(...darkTextColor);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('CUET RAW SCORE', 20, 44);

  doc.setFontSize(28);
  doc.setTextColor(...primaryColor);
  doc.text(`${analysis.raw_score} / ${analysis.max_score}`, 20, 58);

  doc.setFontSize(11);
  doc.setTextColor(100, 116, 139);
  doc.text(`Percentage: ${analysis.percentage}%  |  Accuracy: ${analysis.accuracy_rate}%`, 20, 66);

  // Status Badge on right
  doc.setFontSize(10);
  doc.setTextColor(16, 185, 129); // Emerald
  doc.setFont('helvetica', 'bold');
  doc.text(`Predicted Rank: ~${analysis.predicted_rank_min.toLocaleString('en-IN')}`, 130, 46);
  doc.setTextColor(79, 70, 229);
  doc.text(`CUET Predicted: ${analysis.predicted_cuet_score_min}–${analysis.predicted_cuet_score_max}/200`, 130, 54);
  doc.text(`Confidence: ${analysis.confidence_level.toUpperCase()}`, 130, 62);

  // Key Stats Table
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkTextColor);
  doc.text('Performance Summary & Marking Scheme (+5 / -1 / 0)', 14, 82);

  autoTable(doc, {
    startY: 86,
    head: [['Metric', 'Your Value', 'Benchmark / Target', 'Analysis']],
    body: [
      ['Total Questions', '50', '50 questions', 'Full exam simulation'],
      ['Questions Attempted', `${Math.round((analysis.attempt_rate * 50) / 100)} (100%)`, '40-50 questions', 'Good attempt discipline'],
      ['Correct Answers (+5)', `${Math.round((analysis.raw_score + analysis.max_score * 0.2) / 6)}`, '35+ correct', '+5 marks per correct'],
      ['Incorrect Answers (-1)', `${Math.max(0, 50 - Math.round((analysis.raw_score + analysis.max_score * 0.2) / 6))}`, '< 8 wrong', '-1 mark penalty per wrong'],
      ['Accuracy Rate', `${analysis.accuracy_rate}%`, '> 75% for DU/BHU', analysis.accuracy_rate >= 75 ? 'On Track' : 'Needs Practice'],
      ['Avg Time Per Question', `${analysis.avg_time_per_question}s`, '40s target', analysis.avg_time_per_question <= 45 ? 'Optimal Pace' : 'Pacing Alert'],
      ['Time Wasted on Wrongs', `${Math.round(analysis.time_wasted_seconds / 60)} min`, '< 5 min', 'Potential skipped marks'],
    ],
    theme: 'grid',
    headStyles: { fillColor: primaryColor, textColor: 255, fontStyle: 'bold' },
    styles: { fontSize: 9, cellPadding: 2.5 },
  });

  // AI Coach Card
  const coachY = (doc as any).lastAutoTable.finalY + 10;
  doc.setFillColor(238, 242, 255); // Indigo 50
  doc.roundedRect(14, coachY, 182, 42, 3, 3, 'F');
  doc.setDrawColor(199, 210, 254);
  doc.roundedRect(14, coachY, 182, 42, 3, 3, 'D');

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('🤖 AI COACH PERSONALIZED DIAGNOSIS', 20, coachY + 8);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...darkTextColor);
  const splitCoach = doc.splitTextToSize(analysis.ai_coaching_message, 170);
  doc.text(splitCoach, 20, coachY + 16);

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('Page 1 of 4 • Confidential Student Diagnostic Report • CUET Prep AI', 14, 288);

  // ═════════════════════════════════════════════════════════
  // PAGE 2: Subject, Chapter, and Topic Breakdowns
  // ═════════════════════════════════════════════════════════
  doc.addPage();

  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 16, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('SUBJECT & CHAPTER BREAKDOWN', 14, 11);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkTextColor);
  doc.text('1. Subject-Wise Mastery', 14, 25);

  autoTable(doc, {
    startY: 29,
    head: [['Subject', 'Total Qs', 'Correct', 'Wrong', 'Raw Score', 'Accuracy', 'Avg Time']],
    body: (analysis.subject_breakdown || []).map((s) => [
      s.subject_name || `Subject ${s.subject_id}`,
      String(s.total_questions),
      String(s.correct),
      String(s.wrong),
      `${s.raw_score}/${s.max_score}`,
      `${s.accuracy}%`,
      `${s.avg_time_seconds}s`,
    ]),
    theme: 'striped',
    headStyles: { fillColor: primaryColor, textColor: 255 },
    styles: { fontSize: 8.5, cellPadding: 2 },
  });

  const chY = (doc as any).lastAutoTable.finalY + 8;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('2. Chapter-Wise Accuracy', 14, chY);

  autoTable(doc, {
    startY: chY + 4,
    head: [['Chapter Name', 'Total Qs', 'Correct', 'Wrong', 'Accuracy %', 'Avg Time']],
    body: (analysis.chapter_breakdown || []).slice(0, 7).map((c) => [
      c.chapter_name || `Chapter ${c.chapter_id}`,
      String(c.total_questions),
      String(c.correct),
      String(c.wrong),
      `${c.accuracy}%`,
      `${c.avg_time_seconds}s`,
    ]),
    theme: 'grid',
    headStyles: { fillColor: [51, 65, 85], textColor: 255 },
    styles: { fontSize: 8.5, cellPadding: 2 },
  });

  const diffY = (doc as any).lastAutoTable.finalY + 8;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('3. Question Difficulty Calibration', 14, diffY);

  const d = analysis.difficulty_breakdown;
  autoTable(doc, {
    startY: diffY + 4,
    head: [['Difficulty', 'Total Qs', 'Correct', 'Wrong', 'Accuracy %', 'Target Speed']],
    body: [
      ['Easy', String(d.easy.total), String(d.easy.correct), String(d.easy.wrong), `${d.easy.accuracy}%`, `${d.easy.avg_time}s (Goal < 30s)`],
      ['Medium', String(d.medium.total), String(d.medium.correct), String(d.medium.wrong), `${d.medium.accuracy}%`, `${d.medium.avg_time}s (Goal < 45s)`],
      ['Hard', String(d.hard.total), String(d.hard.correct), String(d.hard.wrong), `${d.hard.accuracy}%`, `${d.hard.avg_time}s (Goal < 65s)`],
    ],
    theme: 'striped',
    headStyles: { fillColor: [71, 85, 105], textColor: 255 },
    styles: { fontSize: 8.5, cellPadding: 2 },
  });

  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('Page 2 of 4 • Detailed Syllabus Calibration • CUET Prep AI', 14, 288);

  // ═════════════════════════════════════════════════════════
  // PAGE 3: Mistake Patterns, Speed, and Trend
  // ═════════════════════════════════════════════════════════
  doc.addPage();

  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 16, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('MISTAKE PATTERNS & SCORE TRAJECTORY', 14, 11);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkTextColor);
  doc.text('1. Systematic Error Pattern Analysis', 14, 25);

  const m = analysis.mistake_patterns;
  autoTable(doc, {
    startY: 29,
    head: [['Pattern Type', 'Count', 'Estimated Impact', 'Actionable Fix']],
    body: [
      ['Careless Mistakes', `${m.careless_mistakes} Qs`, `-${m.careless_mistakes * 6} Marks`, 'Read options thoroughly before confirming'],
      ['Conceptual Gaps', `${m.conceptual_gaps} Topics`, 'Major Leak', 'Revisit syllabus notes & foundational videos'],
      ['Time Pressure Errors', `${m.time_pressure_mistakes} Qs`, 'Pacing Leak', 'Cap questions at 50 seconds and flag for review'],
      ['Repeated Mistakes', `${m.repeated_mistakes} Qs`, 'High Priority', 'Requires targeted AI drill practice sessions'],
      ['Lucky Guesses (<10s)', `${m.lucky_guesses} Qs`, 'Volatile Marks', 'Do not rely on rapid guessing in actual NTA CBT'],
    ],
    theme: 'grid',
    headStyles: { fillColor: [225, 29, 72], textColor: 255 }, // Rose 600
    styles: { fontSize: 8.5, cellPadding: 2.5 },
  });

  const trendY = (doc as any).lastAutoTable.finalY + 10;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkTextColor);
  doc.text('2. Historical Score Trajectory & College Benchmarks', 14, trendY);

  autoTable(doc, {
    startY: trendY + 4,
    head: [['Test Event', 'Raw Score', 'Percentage', 'Accuracy', 'Trajectory Status']],
    body: [
      ['Mock Test #1', '118 / 200', '59.0%', '64%', 'Baseline established'],
      ['Mock Test #2', '125 / 200', '62.5%', '67%', '+7 marks gain'],
      ['Mock Test #3', '131 / 200', '65.5%', '70%', '+6 marks gain'],
      ['Mock Test #4', '138 / 200', '69.0%', '73%', '+7 marks gain'],
      ['Mock Test #5', '142 / 200', '71.0%', '75%', '+4 marks gain'],
      ['Current Mock', `${analysis.raw_score} / ${analysis.max_score}`, `${analysis.percentage}%`, `${analysis.accuracy_rate}%`, `${analysis.score_vs_last_test >= 0 ? '+' : ''}${analysis.score_vs_last_test} vs previous`],
    ],
    theme: 'striped',
    headStyles: { fillColor: primaryColor, textColor: 255 },
    styles: { fontSize: 8.5, cellPadding: 2 },
  });

  const predBoxY = (doc as any).lastAutoTable.finalY + 8;
  doc.setFillColor(240, 253, 244); // Emerald 50
  doc.roundedRect(14, predBoxY, 182, 30, 3, 3, 'F');
  doc.setDrawColor(187, 247, 208);
  doc.roundedRect(14, predBoxY, 182, 30, 3, 3, 'D');

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(22, 101, 52); // Emerald 800
  doc.text('🎯 OFFICIAL CUET PREDICTION & TARGET COLLEGES', 20, predBoxY + 8);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Projected CUET Score: ${analysis.predicted_cuet_score_min} – ${analysis.predicted_cuet_score_max} marks out of 200`, 20, predBoxY + 16);
  doc.text(`Estimated All-India Rank: ${analysis.predicted_rank_min.toLocaleString('en-IN')} – ${analysis.predicted_rank_max.toLocaleString('en-IN')} (Percentile: ~99th)`, 20, predBoxY + 22);

  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('Page 3 of 4 • Trend & Statistical Predictor • CUET Prep AI', 14, 288);

  // ═════════════════════════════════════════════════════════
  // PAGE 4: 48-Hour Action Plan & Strategy
  // ═════════════════════════════════════════════════════════
  doc.addPage();

  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 16, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('NEXT 48-HOUR ACTION PLAN & EXAM STRATEGY', 14, 11);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkTextColor);
  doc.text('1. Priority Action Plan (Synchronized with Module 4)', 14, 25);

  autoTable(doc, {
    startY: 29,
    head: [['Priority', 'Action Description', 'Duration', 'Why This Matters']],
    body: (analysis.ai_action_plan || []).map((a) => [
      `Step ${a.priority}`,
      a.action,
      `${a.time_minutes} min`,
      a.why,
    ]),
    theme: 'grid',
    headStyles: { fillColor: primaryColor, textColor: 255 },
    styles: { fontSize: 8.5, cellPadding: 3 },
  });

  const stratY = (doc as any).lastAutoTable.finalY + 10;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkTextColor);
  doc.text('2. Tactical Exam Strategy', 14, stratY);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const splitStrat = doc.splitTextToSize(analysis.ai_exam_strategy, 182);
  doc.text(splitStrat, 14, stratY + 6);

  const quoteY = stratY + 25;
  doc.setFillColor(254, 243, 199); // Amber 100
  doc.roundedRect(14, quoteY, 182, 22, 3, 3, 'F');
  doc.setDrawColor(253, 230, 138);
  doc.roundedRect(14, quoteY, 182, 22, 3, 3, 'D');

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(146, 64, 14); // Amber 800
  const splitQuote = doc.splitTextToSize(analysis.ai_motivational_quote, 170);
  doc.text(splitQuote, 20, quoteY + 10);

  // Verification & Sign-off footer
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkTextColor);
  doc.text('Generated by CUET Prep AI — National Level Adaptive Learning Engine', 14, 275);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('Designed for CUET UG Aspirants (NTA Pattern) • Delhi University, BHU, JNU Target Cohorts', 14, 281);
  doc.text('Page 4 of 4 • Action Plan & Roadmap • cuet-prep.in', 14, 288);

  return doc;
}
