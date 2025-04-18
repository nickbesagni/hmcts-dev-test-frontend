Feature: Update Task Status

  Scenario: User can update task status to Completed
    Given I am on the task view page for task with id 1
    When I click the "Mark as complete" link
    Then I should be redirected to the task view page for task with id 1
    And the task status should be "Completed"

  Scenario: User can update task status to Not done
    Given I am on the task view page for task with id 1
    When I click the "Mark as not done" link
    Then I should be redirected to the task view page for task with id 1
    And the task status should be "Not done"
