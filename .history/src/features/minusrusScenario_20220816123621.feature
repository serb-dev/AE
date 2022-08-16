Feature: Work with minusrus.com

    Scenario: Working with minusrus.com
        Given Open minusrus.com
        When Changing language
        When Choose a "<date>"
        Then Getting results

    Examples:
        | date |
        # | 09.08.2022 |
        # | 06.08.2022 | 
        | 20.09.2022 |