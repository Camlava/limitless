INSERT INTO error_messages (error_code, message) VALUES
                                                     ('AUTH_001', 'Invalid username or password.'),
                                                     ('AUTH_002', 'Your account is suspended.'),
                                                     ('AUTH_003', 'Your password has expired.'),
                                                     ('USER_001', 'Username already exists.'),
                                                     ('USER_002', 'Email address already exists.'),
                                                     ('ACCT_001', 'Account name or number already exists.'),
                                                     ('ACCT_002', 'Accounts with a nonzero balance cannot be deactivated.'),
                                                     ('JRNL_001', 'Debits and credits must balance.'),
                                                     ('JRNL_002', 'A journal entry must have at least one debit and one credit.');