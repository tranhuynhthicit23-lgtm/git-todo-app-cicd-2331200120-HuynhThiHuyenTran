const { test, expect, _electron: electron } = require('@playwright/test');

test('End-to-end user workflow', async () => {
    // Launch the Electron app
    const electronApp = await electron.launch({ args: ['.'] });
    const window = await electronApp.firstWindow();

    const taskText = 'My new E2E test task';

    // --- TODO: Task 1: Add a new todo item ---
    // 1. Find the input field
    const input = window.locator('#todo-input');
    // 2. Type the task text
    await input.fill(taskText);
    // 3. Click the "Add" button
    const addButton = window.locator('button', { hasText: 'Add' });
    await addButton.click();


    // --- TODO: Task 2: Verify the todo item was added ---
    // 1. Locate the new todo item in the list
    const todoItem = window.locator('.todo-item', { hasText: taskText });
    // 2. Assert its text content
    await expect(todoItem).toContainText(taskText);
    

    // --- TODO: Task 3: Mark the todo item as complete ---
    // 1. Find the checkbox inside the todo item
    const checkbox = todoItem.locator('input[type="checkbox"]');
    // 2. Click the checkbox
    await checkbox.click();
    // 3. Assert the item has the 'completed' class
    await expect(todoItem).toHaveClass(/completed/);


    // --- TODO: Task 4: Delete the todo item ---
    // 1. Find the delete button
    const deleteButton = todoItem.locator('button', { hasText: 'Delete' });
    // 2. Click the delete button
    await deleteButton.click();
    // 3. Assert the item is no longer visible
    await expect(todoItem).toHaveCount(0);


    // Close the app
    await electronApp.close();
});
