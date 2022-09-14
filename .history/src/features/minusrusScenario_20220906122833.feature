@minusrus
Feature: Work with minusrus.com

    Scenario: Working with minusrus.com
        Given Open minusrus.com
        When Choose "<language>" language 
        When Verify that selected language is "<language>"
        When Choose a "<date>"
        And Chose a "<another>" day
        Then Verify that intendent loss for "<entity>" entity calculated correctly

    Examples:
        | language | date       | another    | entity            |
        # | ENG      | 09.08.2022 | 12.08.2022 | Tanks             |
        # | UA       | 20.08.2022 | 28.08.2022 | Кораблі та катери |
        | RU       | 25.08.2022 | 30.08.2022 | Личный состав     |