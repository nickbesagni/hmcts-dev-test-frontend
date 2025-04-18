const { I } = inject();

Given('I am on the add task form', () => {
  I.amOnPage('/add-task');
});

When('I fill in {string} with {string}', (field, value) => {
  I.fillField(field, value);
});

When('I select {string} from {string}', (value, field) => {
  I.selectOption(field, value);
});

When('I fill in {string} with {string}', (field, value) => {
  I.fillField(field, value);
});

When('I press {string}', (button) => {
  I.click(button);
});

Then('I should be redirected to the home page', () => {
  I.seeInCurrentUrl('/');
});

Then('I should see {string} in the task list', (taskTitle) => {
  I.see(taskTitle);
});
