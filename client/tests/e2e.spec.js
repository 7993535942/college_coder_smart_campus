import { test, expect } from '@playwright/test';

test.describe('SmartCampus AI - Core Verification Flows', () => {
  test('Login flow with valid and invalid credentials', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // 1. Invalid credentials
    await page.fill('input[type="email"]', 'wrong@smartcampus.demo');
    await page.fill('input[type="password"]', 'WrongPass@123');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Invalid credentials')).toBeVisible();

    // 2. Valid demo credentials
    await page.fill('input[type="email"]', 'admin@smartcampus.demo');
    await page.fill('input[type="password"]', 'Demo@123');
    await page.click('button[type="submit"]');

    // 3. Confirm Dashboard loads
    await expect(page.locator('text=Executive Decision Intelligence Console')).toBeVisible();
    await expect(page.locator('text=Total Enrolled')).toBeVisible();
    await expect(page.locator('text=Rules vs ML Risk Fusion Matrix')).toBeVisible();
  });

  test('Navigate to Rahul Kumar and generate AI Copilot plan', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.fill('input[type="email"]', 'admin@smartcampus.demo');
    await page.fill('input[type="password"]', 'Demo@123');
    await page.click('button[type="submit"]');

    // Click Spotlight Demo: Rahul Kumar
    await page.click('text=Spotlight Demo: Rahul Kumar');
    await expect(page.locator('h1:has-text("Rahul Kumar")')).toBeVisible();
    await expect(page.locator('text=42/100')).toBeVisible();
    await expect(page.locator('text=HIGH RISK')).toBeVisible();

    // Generate AI Intervention Plan
    await page.click('button:has-text("AI Copilot Intervention")');
    await expect(page.locator('text=AI Intervention Copilot Plan')).toBeVisible();
    await expect(page.locator('text=Attendance recovery counseling')).toBeVisible();
  });

  test('What-If Scenario Simulator live calculation', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.fill('input[type="email"]', 'admin@smartcampus.demo');
    await page.fill('input[type="password"]', 'Demo@123');
    await page.click('button[type="submit"]');

    // Navigate to Scenario Simulator
    await page.click('text=Scenario Simulator');
    await expect(page.locator('text=Simulation Control Variables')).toBeVisible();
    await expect(page.locator('text=Simulated Outcome Comparison')).toBeVisible();
  });

  test('Model Insights card inspection', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.fill('input[type="email"]', 'admin@smartcampus.demo');
    await page.fill('input[type="password"]', 'Demo@123');
    await page.click('button[type="submit"]');

    // Navigate to Model Insights
    await page.click('text=Model Insights');
    await expect(page.locator('text=Model A: Academic Risk Predictor')).toBeVisible();
    await expect(page.locator('text=Model P: Campus Placement Likelihood')).toBeVisible();
    await expect(page.locator('text=0.862')).toBeVisible(); // ROC-AUC
  });

  test('FR-24 Agreement badge click opens protocol modal and filters students', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.fill('input[type="email"]', 'admin@smartcampus.demo');
    await page.fill('input[type="password"]', 'Demo@123');
    await page.click('button[type="submit"]');

    // Confirm FR-24 Agreement badge is on dashboard and click it
    await page.click('button:has-text("FR-24 Agreement")');
    await expect(page.locator('text=Rules vs ML Risk Fusion Matrix Protocol')).toBeVisible();
    await expect(page.locator('text=Two-Tiered Second Opinion')).toBeVisible();

    // Click on 24 Students under ML Early Warning
    await page.click('button:has-text("24 Students")');

    // Confirm navigation to student registry with active filter
    await expect(page.locator('text=At-Risk Student Registry')).toBeVisible();
    await expect(page.locator('select.input-field >> text=ML Early Warning')).toBeVisible();
  });
});
