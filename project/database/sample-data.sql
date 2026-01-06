-- Sample data for placement-preparation-portal

INSERT INTO users (name, email, password_hash, role) VALUES
('Demo Student','student@example.com','$2b$10$examplehash','student');

INSERT INTO quizzes (title) VALUES
('Aptitude Basics'), ('Coding Warmup');
