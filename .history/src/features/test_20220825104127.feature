@AE
Feature: Searching and purchasing of stuff

    Scenario: Searching and purchasing of stuff
        Given I open American Eagle
        When I choose a category 
        Given I am on some stuff page
        When I choose a stuff
        Given I am on single page of stuff
        When I select size
        When I change amount of stuff
        Then I add stuff to the basket
        Given I am on basket page
        When I click on checkout button
        Given I am on checkout page
        When I fill name, lastname, email in Shipping Info
        When I fill "<street>" and floor
        When I get DATA from API
        When I fill city and state
        When I fill "<zip code>"
        Then I click on Confirm button
        Then I get errors from Shipping card form

        Examples:
            | street | zip code |
        #     | 5201 Queens Stroll Pl Se | 20019  |
            | 5217 5th St NW | 20011  |