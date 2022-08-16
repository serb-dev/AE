Feature: Work with minusrus.com

    Scenario: Working with minusrus.com
        Given Open minusrus.com
        When Changing language
        When Choose a "<date>"

    Examples:
        | date |
        | 09.08.2022 |
        # | 06.08.2022 | 