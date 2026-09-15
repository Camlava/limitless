CREATE TABLE `users` (
                         `id` integer PRIMARY KEY AUTO_INCREMENT,
                         `created_by` integer,
                         `created_at` date,
                         `username` varchar(50) UNIQUE,
                         `password_hash` varchar(64),
                         `first_name` varchar(100),
                         `last_name` varchar(100),
                         `home_address` varchar(255),
                         `birth_date` date,
                         `email_address` varchar(255) UNIQUE,
                         `picture` varchar(255),
                         `status` ENUM ('PENDING', 'ACTIVATED', 'DEACTIVATED', 'SUSPENDED'),
                         `suspension_start` date,
                         `suspension_end` date,
                         `password_changed_at` date,
                         `password_expiry` date,
                         `password_attempts` integer,
                         `security_question1` varchar(255),
                         `security_question2` varchar(255),
                         `security_question3` varchar(255),
                         `security_answer1` varchar(255),
                         `security_answer2` varchar(255),
                         `security_answer3` varchar(255),
                         `role` ENUM ('ACCOUNTANT', 'MANAGER', 'ADMINISTRATOR')
);

CREATE TABLE `password_history` (
                                    `id` integer PRIMARY KEY,
                                    `user_id` integer NOT NULL,
                                    `password_hash` varchar(64),
                                    `created_at` date
);

CREATE TABLE `accounts` (
                            `id` integer PRIMARY KEY AUTO_INCREMENT,
                            `user_id` integer NOT NULL,
                            `name` varchar(255) UNIQUE,
                            `number` integer UNIQUE,
                            `description` varchar(255),
                            `side` ENUM ('LEFT', 'RIGHT'),
                            `category` varchar(255),
                            `subcategory` varchar(255),
                            `initial_balance` decimal(15,2),
                            `debit` decimal(15,2),
                            `credit` decimal(15,2),
                            `balance` decimal(15,2),
                            `added_at` date,
                            `account_order` integer,
                            `statement` varchar(255),
                            `comment` varchar(255),
                            `is_active` boolean DEFAULT true
);

CREATE TABLE `event_log` (
                             `id` integer PRIMARY KEY AUTO_INCREMENT,
                             `user_id` integer NOT NULL,
                             `table_name` varchar(50),
                             `before_image` text,
                             `after_image` text,
                             `record_id` integer,
                             `changed_at` datetime,
                             `action` ENUM ('ADD', 'MODIFY', 'DEACTIVATE')
);

-- NOTE: journal_staus was an undefined custom type in the dbdiagram export.
-- Replaced with an inline ENUM. Update the values below if you intended something different.
CREATE TABLE `journal_entries` (
                                   `id` integer PRIMARY KEY AUTO_INCREMENT,
                                   `created_by` integer NOT NULL,
                                   `entry_date` date,
                                   `entry_type` ENUM ('REGULAR', 'ADJUSTING'),
                                   `status` ENUM ('DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED'),
                                   `comment` varchar(255),
                                   `reviewed_by` integer NOT NULL,
                                   `reviewed_at` datetime,
                                   `created_at` datetime
);

-- NOTE: amoutn corrected to amount
CREATE TABLE `journal_entry_lines` (
                                       `id` integer PRIMARY KEY AUTO_INCREMENT,
                                       `journal_entry_id` integer NOT NULL,
                                       `account_id` integer NOT NULL,
                                       `side` ENUM ('DEBIT', 'CREDIT'),
                                       `amount` decimal(15,2)
);

CREATE TABLE `journal_attachments` (
                                       `id` integer PRIMARY KEY AUTO_INCREMENT,
                                       `journal_entry_id` integer NOT NULL,
                                       `file_path` varchar(255),
                                       `file_type` varchar(10),
                                       `uploaded_at` datetime
);

CREATE TABLE `error_messages` (
                                  `id` integer PRIMARY KEY AUTO_INCREMENT,
                                  `error_code` varchar(20) UNIQUE,
                                  `message` varchar(255)
);

-- NOTE: statement_type was an undefined custom type in the dbdiagram export.
-- Replaced with an inline ENUM. Update the values below if you intended something different.
CREATE TABLE `saved_statements` (
                                    `id` integer PRIMARY KEY AUTO_INCREMENT,
                                    `statement_type` ENUM ('BALANCE_SHEET', 'INCOME_STATEMENT', 'CASH_FLOW', 'TRIAL_BALANCE'),
                                    `period_start` date,
                                    `period_end` date,
                                    `generated_by` integer NOT NULL,
                                    `generated_at` datetime,
                                    `file_path` varchar(255)
);

ALTER TABLE `users` ADD FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

ALTER TABLE `password_history` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `accounts` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `event_log` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `journal_entries` ADD FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

ALTER TABLE `journal_entries` ADD FOREIGN KEY (`reviewed_by`) REFERENCES `users` (`id`);

ALTER TABLE `journal_entry_lines` ADD FOREIGN KEY (`journal_entry_id`) REFERENCES `journal_entries` (`id`);

ALTER TABLE `journal_entry_lines` ADD FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`);

ALTER TABLE `journal_attachments` ADD FOREIGN KEY (`journal_entry_id`) REFERENCES `journal_entries` (`id`);

ALTER TABLE `saved_statements` ADD FOREIGN KEY (`generated_by`) REFERENCES `users` (`id`);