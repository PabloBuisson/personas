CREATE TABLE IF NOT EXISTS project (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    icon VARCHAR(255),
    description TEXT,
    created_at DATE,
    updated_at DATE
);

CREATE TABLE IF NOT EXISTS job_details (
    id SERIAL PRIMARY KEY,
    company VARCHAR(255),
    industry VARCHAR(255),
    salary VARCHAR(255),
    title VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS culture_favorites (
    id SERIAL PRIMARY KEY,
    movies TEXT,
    books TEXT,
    comics TEXT,
    tv TEXT,
    music TEXT,
    games TEXT
);

CREATE TABLE IF NOT EXISTS emotional_motivations (
    id SERIAL PRIMARY KEY,
    passions TEXT,
    goals TEXT,
    joys TEXT,
    fears TEXT,
    frustrations TEXT,
    habits TEXT
);

CREATE TABLE IF NOT EXISTS persona (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age VARCHAR(255) NOT NULL,
    story TEXT NOT NULL,
    avatar VARCHAR(255),
    color VARCHAR(255),
    location VARCHAR(255),
    family TEXT,
    personality TEXT,
    education TEXT,
    idols TEXT,
    brands TEXT,
    project_id INT,
    created_at DATE,
    updated_at DATE
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

-- JOIN TABLE JOB / PERSONA (@ONE-TO-ONE RELATIONSHIP)
CREATE TABLE IF NOT EXISTS persona_job (
     persona_id UUID NOT NULL,
     job_id INT NOT NULL
);

-- Drop existing constraints if they exist
ALTER TABLE persona_job DROP CONSTRAINT IF EXISTS persona_job_pk;
ALTER TABLE persona_job DROP CONSTRAINT IF EXISTS persona_job_id_fk;
ALTER TABLE persona_job DROP CONSTRAINT IF EXISTS job_persona_id_fk;

-- Add new constraints
ALTER TABLE persona_job ADD CONSTRAINT persona_job_pk PRIMARY KEY (persona_id, job_id);
ALTER TABLE persona_job ADD CONSTRAINT persona_job_id_fk FOREIGN KEY (persona_id) REFERENCES persona (id);
ALTER TABLE persona_job ADD CONSTRAINT job_persona_id_fk FOREIGN KEY (job_id) REFERENCES job_details (id);

-- JOIN TABLE CULTURE / PERSONA (@ONE-TO-ONE RELATIONSHIP)
CREATE TABLE IF NOT EXISTS persona_culture (
     persona_id UUID NOT NULL,
     culture_id INT NOT NULL
);

-- Drop existing constraints if they exist
ALTER TABLE persona_culture DROP CONSTRAINT IF EXISTS persona_culture_pk;
ALTER TABLE persona_culture DROP CONSTRAINT IF EXISTS persona_culture_id_fk;
ALTER TABLE persona_culture DROP CONSTRAINT IF EXISTS culture_persona_id_fk;

-- Add new constraints
ALTER TABLE persona_culture ADD CONSTRAINT persona_culture_pk PRIMARY KEY (persona_id, culture_id);
ALTER TABLE persona_culture ADD CONSTRAINT persona_culture_id_fk FOREIGN KEY (persona_id) REFERENCES persona (id);
ALTER TABLE persona_culture ADD CONSTRAINT culture_persona_id_fk FOREIGN KEY (culture_id) REFERENCES culture_favorites (id);

-- JOIN TABLE EMOTIONS / PERSONA (@ONE-TO-ONE RELATIONSHIP)
CREATE TABLE IF NOT EXISTS persona_emotions (
     persona_id UUID NOT NULL,
     emotions_id INT NOT NULL
);

-- Drop existing constraints if they exist
ALTER TABLE persona_emotions DROP CONSTRAINT IF EXISTS persona_emotions_pk;
ALTER TABLE persona_emotions DROP CONSTRAINT IF EXISTS persona_emotions_id_fk;
ALTER TABLE persona_emotions DROP CONSTRAINT IF EXISTS emotions_persona_id_fk;

-- Add new constraints
ALTER TABLE persona_emotions ADD CONSTRAINT persona_emotions_pk PRIMARY KEY (persona_id, emotions_id);
ALTER TABLE persona_emotions ADD CONSTRAINT persona_emotions_id_fk FOREIGN KEY (persona_id) REFERENCES persona (id);
ALTER TABLE persona_emotions ADD CONSTRAINT emotions_persona_id_fk FOREIGN KEY (emotions_id) REFERENCES emotional_motivations (id);