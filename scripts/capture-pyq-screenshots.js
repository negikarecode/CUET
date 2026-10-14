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

  // 1. Visit page first to set localStorage
  await page.goto('http://localhost:3000/dashboard/pyqs', { waitUntil: 'networkidle2' });

  // 2. Set attempt in localStorage using guest user scoped key
  await page.evaluate(() => {
    const attemptData = {
      state: {
        user: { id: 'guest', name: 'Aspirant' },
        testAttempts: [
          {
            id: 'physics-pyq-1',
            testId: 'physics-pyq-1',
            testTitle: 'Physics Official CBT Paper (13 May 2025 Shift 1)',
            subject: 'Physics',
            totalQuestions: 50,
            attemptedCount: 13,
            correctCount: 3,
            incorrectCount: 10,
            totalMarks: 5,
            maxMarks: 250,
            accuracyPercentage: 23,
            submittedAt: new Date().toISOString(),
          },
        ],
      },
      version: 0,
    };
    localStorage.setItem('cuet_active_uid', 'guest');
    localStorage.setItem('cuet_ai_prep_session_storage:guest', JSON.stringify(attemptData));
    localStorage.setItem('cuet_ai_prep_session_storage', JSON.stringify(attemptData));
  });

  // Reload with the attempted data
  await page.goto('http://localhost:3000/dashboard/pyqs', { waitUntil: 'networkidle2' });

  // Wait for the grid to appear
  await page.waitForSelector('.grid');

  const widths = [1280, 1440, 1920];

  for (const width of widths) {
    await page.setViewport({ width, height: 1000, deviceScaleFactor: 1 });
    await new Promise((r) => setTimeout(r, 600));

    // Full page screenshot of the grid section
    const fullPath = path.join(screenshotDir, `pyq_dashboard_${width}px.png`);
    await page.screenshot({ path: fullPath, fullPage: false });
    console.log(`Saved screenshot at ${width}px: ${fullPath}`);
  }

  // Also capture close-up of first 2 cards (attempted vs unattempted side-by-side)
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
  await new Promise((r) => setTimeout(r, 400));
  const cardElements = await page.$$('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3 > div');
  if (cardElements.length >= 2) {
    const attemptedCard = cardElements[0];
    const unattemptedCard = cardElements[1];
    await attemptedCard.screenshot({ path: path.join(screenshotDir, 'card_attempted_close_up.png') });
    await unattemptedCard.screenshot({ path: path.join(screenshotDir, 'card_unattempted_close_up.png') });
    console.log('Saved close-up card screenshots.');
  }

  await browser.close();
  console.log('Capture complete!');
}

capture().catch((err) => {
  console.error('Screenshot error:', err);
  process.exit(1);
});
