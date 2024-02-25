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

ALTER TABLE persona DROP CONSTRAINT IF EXISTS persona_project_id_fk;
ALTER TABLE persona ADD CONSTRAINT persona_project_id_fk FOREIGN KEY (project_id) REFERENCES project (id);

CREATE TABLE IF NOT EXISTS tag (
    id SERIAL PRIMARY KEY,
    label VARCHAR(255) NOT NULL,
    color VARCHAR(255)
);

-- JOIN TABLE TAGS / PROJECTS (@MANY-TO-MANY RELATIONSHIP)
CREATE TABLE IF NOT EXISTS tag_project (
     tag_id INT NOT NULL,
     project_id INT NOT NULL
);

-- Drop existing constraints if they exist
ALTER TABLE tag_project DROP CONSTRAINT IF EXISTS tag_project_pk;
ALTER TABLE tag_project DROP CONSTRAINT IF EXISTS tag_project_id_fk;
ALTER TABLE tag_project DROP CONSTRAINT IF EXISTS project_tag_id_fk;

-- Add new constraints
ALTER TABLE tag_project ADD CONSTRAINT tag_project_pk PRIMARY KEY (tag_id, project_id);
ALTER TABLE tag_project ADD CONSTRAINT tag_project_id_fk FOREIGN KEY (tag_id) REFERENCES tag (id);
ALTER TABLE tag_project ADD CONSTRAINT project_tag_id_fk FOREIGN KEY (project_id) REFERENCES project (id);
