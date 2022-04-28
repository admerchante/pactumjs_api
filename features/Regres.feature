Feature: Simple Credit and Close operation

  In order to check the tridentApi
  As a tester
  I want to make sure that i can create a simple Credit and Close operation

  Scenario: Create A User
    Given I make a POST request to /mes-api/tridentApi/
      And I set body to
      """
        profile_id=94100010330600000001&profile_key=RwmeQKIxDfPGjvRrlNhHProWlYHkAoxi&transaction_type=Z&card_number=345607014110874&transaction_amount=10&card_exp_date=1223&currency_code=840&cvv2=123
      """
     When I receive a response
     Then I expect response should have a status 200