CREATE TABLE IF NOT EXISTS project (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    icon VARCHAR(255),
    description TEXT
);

CREATE TABLE IF NOT EXISTS persona (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age VARCHAR(255) NOT NULL,
    story TEXT NOT NULL,
    project_id INT
);

ALTER TABLE persona
ADD CONSTRAINT persona_project_id_fk
FOREIGN KEY (project_id)
REFERENCES project (id);
