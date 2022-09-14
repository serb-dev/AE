Feature: Work with minusrus.com

    Scenario: Working with minusrus.com
        Given Open minusrus.com
        When Choosing language "<language>"
        When Verify that selected language is "<language>"
        # When Choose a "<date>"
        # Then Getting results

    Examples:
        | language | date       |
        | US       | 09.08.2022 |
        # | UA       | 06.08.2022 | 
        # | RU       | 15.08.2022 |