const { I } = inject();

Given('I am on the task view page for task with id {int}', (taskId: number) => {
  I.amOnPage(`/task/${taskId}`);
});

When('I click the {string} link', (linkText: string) => {
  I.click(linkText);
});

Then('I should be redirected to the task view page for task with id {int}', (taskId: number) => {
  I.seeInCurrentUrl(`/task/${taskId}`);
});

Then('the task status should be {string}', (status: string) => {
  I.see(status, '.govuk-summary-list__value');
});
