Feature: Homepage test

    Scenario: The home page loads
        When I go to '/'
        Then the page should include 'Welcome to your tasks' 