Feature: Work with minusrus.com

    Scenario: Working with minusrus.com
        Given Open minusrus.com
        When Choosing "<language>" language
        When Verify that selected "<language>" language
        # When Choose a "<date>"
        # Then Getting results

    Examples:
        | language | date       |
        | EN       | 09.08.2022 |
        | UA       | 06.08.2022 | 
        | RU       | 15.08.2022 |