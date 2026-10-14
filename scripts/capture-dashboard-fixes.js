const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function capture() {
  const screenshotDir = path.join(process.cwd(), 'screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
    headless: 'new',
  });

  const page = await browser.newPage();
  await page.setCookie({
    name: 'cuet_auth',
    value: '1',
    domain: 'localhost',
    path: '/'
  });
  await page.goto('http://localhost:3000/dashboard/sessions', { waitUntil: 'networkidle2' });
  await page.evaluate(() => {
    const attemptData = {
      state: {
        user: { id: 'guest', name: 'Aryan Negi', preferredStream: 'science', targetCollege: 'Hindu College', xpPoints: 580, dailyStreak: 4 },
        testAttempts: [
          {
            id: 'mock-phys-1',
            testId: 'mock-phys-1',
            testTitle: 'Physics Full Mock 1 (Official NTA CBT)',
            subject: 'Physics',
            totalQuestions: 50,
            attemptedCount: 45,
            unattemptedCount: 5,
            correctCount: 35,
            incorrectCount: 10,
            totalMarks: 165,
            maxMarks: 250,
            accuracyPercentage: 78,
            timeTakenSeconds: 2700,
            submittedAt: new Date(Date.now() - 3600000).toISOString(),
            date: '14 Oct 2026',
            questions: [],
          },
          {
            id: 'practice-env-1',
            testId: 'practice-env-1',
            testTitle: 'Environmental Studies Unit 1 Practice Drill',
            subject: 'Environmental Studies',
            totalQuestions: 20,
            attemptedCount: 18,
            unattemptedCount: 2,
            correctCount: 14,
            incorrectCount: 4,
            totalMarks: 66,
            maxMarks: 100,
            accuracyPercentage: 78,
            timeTakenSeconds: 900,
            submittedAt: new Date(Date.now() - 86400000).toISOString(),
            date: '13 Oct 2026',
            questions: [],
          },
          {
            id: 'past-paper-1',
            testId: 'past-paper-1',
            testTitle: 'Chemistry Official Past Paper (2025 15 May Shift 1)',
            subject: 'Chemistry',
            totalQuestions: 50,
            attemptedCount: 40,
            unattemptedCount: 10,
            correctCount: 25,
            incorrectCount: 15,
            totalMarks: 110,
            maxMarks: 250,
            accuracyPercentage: 63,
            timeTakenSeconds: 2400,
            submittedAt: new Date(Date.now() - 172800000).toISOString(),
            date: '12 Oct 2026',
            questions: [],
          },
          {
            id: 'neg-drill-1',
            testId: 'neg-drill-1',
            testTitle: 'Mathematics Speed Drill',
            subject: 'Mathematics',
            totalQuestions: 20,
            attemptedCount: 16,
            unattemptedCount: 4,
            correctCount: 2,
            incorrectCount: 14,
            totalMarks: -4,
            maxMarks: 100,
            accuracyPercentage: 13,
            timeTakenSeconds: 600,
            submittedAt: new Date(Date.now() - 259200000).toISOString(),
            date: '11 Oct 2026',
            questions: [],
          }
        ],
      },
      version: 0,
    };
    localStorage.setItem('cuet_active_uid', 'guest');
    localStorage.setItem('cuet_ai_prep_session_storage:guest', JSON.stringify(attemptData));
    localStorage.setItem('cuet_ai_prep_session_storage', JSON.stringify(attemptData));
  });

  const pagesToTest = [
    { url: 'http://localhost:3000/dashboard/sessions', name: 'sessions', selector: 'table' },
    { url: 'http://localhost:3000/dashboard/radar', name: 'radar', selector: 'h1' },
    { url: 'http://localhost:3000/dashboard/leaderboard', name: 'leaderboard', selector: 'table' },
    { url: 'http://localhost:3000/dashboard/profile', name: 'profile', selector: 'h1' }
  ];

  const widths = [1280, 1440, 1920];

  for (const pageInfo of pagesToTest) {
    console.log(`Navigating to ${pageInfo.name}...`);
    // Warm up the route in dev mode so compilation finishes
    await page.goto(pageInfo.url, { waitUntil: 'networkidle0', timeout: 60000 });
    if (pageInfo.selector) {
      try {
        await page.waitForSelector(pageInfo.selector, { timeout: 15000 });
      } catch (e) {
        console.log(`Selector ${pageInfo.selector} not found immediately on ${pageInfo.name}`);
      }
    }
    // Give time for Tailwind styles & layout hydration
    await new Promise(r => setTimeout(r, 3000));

    for (const width of widths) {
      await page.setViewport({ width, height: 1100, deviceScaleFactor: 1 });
      await new Promise(r => setTimeout(r, 1000));

      const screenshotPath = path.join(screenshotDir, `${pageInfo.name}-${width}px.png`);
      await page.screenshot({ path: screenshotPath, fullPage: false });
      console.log(`Saved screenshot: ${screenshotPath}`);
    }
  }

  await browser.close();
  console.log('All screenshots captured successfully!');
}

capture().catch((err) => {
  console.error('Error during capture:', err);
  process.exit(1);
});
