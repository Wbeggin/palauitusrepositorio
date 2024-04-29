const { test, expect, beforeEach, describe } = require('@playwright/test')
const exp = require('constants')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'tester2',
        username: 'tester2',
        password: 'password'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const usernameInput = await page.getByRole('textbox').first()
    const passwordInput = await page.getByRole('textbox').last()
    expect(await usernameInput.isVisible()).toBe(true)
    expect(await passwordInput.isVisible()).toBe(true)
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByRole('textbox').first().fill('tester2')
      await page.getByRole('textbox').last().fill('password')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('tester2 logged in')).toBeVisible()
    })

      test('fails with wrong credentials', async ({ page }) => {
        await page.getByRole('textbox').first().fill('tester')
        await page.getByRole('textbox').last().fill('password')
        await page.getByRole('button', { name: 'login' }).click()
        await expect(page.getByText('Wrong credentials')).toBeVisible()
      })
  }
)

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('textbox').first().fill('tester2')
      await page.getByRole('textbox').last().fill('password')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByRole('textbox').first().fill('test title')
      await page.getByRole('textbox').nth(1).fill('test author')
      await page.getByRole('textbox').last().fill('test url')
      await page.getByRole('button', { name: 'create' }).click()
      await expect(page.getByText('test title test author')).toBeVisible()
    }),

    test('a blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByRole('textbox').first().fill('test title')
      await page.getByRole('textbox').nth(1).fill('test author')
      await page.getByRole('textbox').last().fill('test url')
      await page.getByRole('button', { name: 'create' }).click()
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'Like' }).click()
      await expect(page.getByText('likes: 1')).toBeVisible()
    })

    test('a blog can be deleted', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByRole('textbox').first().fill('test title')
      await page.getByRole('textbox').nth(1).fill('test author')
      await page.getByRole('textbox').last().fill('test url')
      await page.getByRole('button', { name: 'create' }).click()
      await page.getByRole('button', { name: 'view' }).click()

      page.on('dialog', async dialog => {
        await dialog.accept()
      })
      
      await page.getByRole('button', { name: 'Delete' }).click()
      await page.waitForSelector(`text="test title test author"`, { state: 'detached' })

    })

  })

})