select * from padel_location;

CREATE TABLE admin (
    admin_ID VARCHAR(90) NOT NULL PRIMARY KEY ,
    username VARCHAR(40) NOT NULL,
    name VARCHAR(20) NOT NULL ,
    password VARCHAR(100) NOT NULL,
    contact VARCHAR(14),
    ROLE VARCHAR(5) DEFAULT 'ADMIN'
);
SELECT * from admin;
DELETE FROM admin WHERE username='vipul.xtr@gmail.com';
DROP  TABLE admin CASCADE;
CREATE TABLE agent(
    agent_ID VARCHAR(40) NOT NULL PRIMARY KEY ,
    username VARCHAR(40) NOT NULL,
    password VARCHAR(40) NOT NULL ,
    name VARCHAR(10) NOT NULL ,
    admin_ID VARCHAR(40)  REFERENCES admin(admin_ID) ON DELETE CASCADE,
    createdAt VARCHAR(40) NOT NULL,
    ROLE VARCHAR(5) DEFAULT 'AGENT'
);
DROP TABLE location;
CREATE TABLE location (
    location_ID VARCHAR(40) NOT NULL PRIMARY KEY ,
    latitude VARCHAR(40) NOT NULL ,
    longitude VARCHAR(40) NOT NULL ,
    accuracy VARCHAR(40) NOT NULL ,
    createdAt VARCHAR(40) NOT NULL ,
    agent_ID VARCHAR(40) REFERENCES agent(agent_ID) ON DELETE CASCADE
);

DELETE FROM padel_location WHERE agent_id=1;

SELECT * from padel_location WHERE agent_id=1;
