Feature: Work with minusrus.com

    Scenario: Working with minusrus.com
        Given Open minusrus.com
        When Choose "<language>" language 
        When Verify that selected language is "<language>"
        When Choose a "<date>"
        # Then Verify that intendent loss for "<date>" entity calculated correctly

    Examples:
        | language | date       |
        | ENG      | 09.08.2022 |
        # | UA       | 06.08.2022 | 
        # | RU       | 15.08.2022 |