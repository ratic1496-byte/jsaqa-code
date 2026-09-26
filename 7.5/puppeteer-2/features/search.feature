Feature: Booking movie tickets
  As a user
  I want to book movie tickets online in advance

  Scenario: Successful booking of 1 ticket
    Given user is on cinema home page "https://qamid.tmweb.ru/client/index.php"
    When user selects day 2 and seance time
    And user selects seat in row 1 and chair 3
    And user clicks book tickets button
    Then user sees ticket confirmation with text "Вы выбрали билеты:"

  Scenario: Should not allow booking of taken seat
    Given user is on cinema home page "https://qamid.tmweb.ru/client/index.php"
    When user selects day 2 and seance time
    And user clicks on taken seat
    Then booking button should be disabled
