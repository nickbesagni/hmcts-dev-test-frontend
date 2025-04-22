/// <reference types='codeceptjs' />
/// <reference path="../functional/steps.d.ts" />

export const { I } = inject();

// --- Step Definitions ---

When('I go to {string}', (path: string) => {
  I.amOnPage(path);
});

When('I press {string}', (button: string) => {
  I.click(button);
});

When('I select {string} from {string}', (value: string, field: string) => {
  I.selectOption(field, value);
});

Given('I am on the add task form', () => {
  I.amOnPage('/add-task');
});

When('I click the {string} link', (linkText: string) => {
  I.click(linkText);
});

When('I fill in {string} with {string}', (field: string, value: string) => {
  I.fillField(field, value);
});

Then('the page should include {string}', (text: string) => {
  I.waitForText(text);
});

Then('the home page loads', () => {
  I.waitForText('Welcome'); 
});

Then('I should be redirected to the home page', () => {
  I.seeInCurrentUrl('/');
});

Then('I should see {string} in the task list', (taskTitle: string) => {
  I.see(taskTitle);
});
