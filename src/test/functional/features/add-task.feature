Feature: Add Task Functionality

  Scenario: User can access the add task form
    When I go to '/add-task'
    Then the page should include 'Add a new task'

  Scenario: User can submit the add task form
    Given I am on the add task form
    When I fill in "Title" with "Test Task"
    And I fill in "Description" with "Test Description"
    And I select "Pending" from "Status"
    And I fill in "Due Date and Time" with "2023-12-31T23:59"
    And I press "Save task"
    Then I should be redirected to the home page
    And I should see "Test Task" in the task list
