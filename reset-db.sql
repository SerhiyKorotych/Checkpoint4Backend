DROP DATABASE IF EXISTS portfolio;

CREATE DATABASE portfolio; 


DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO
  `user` (firstname, lastname, email, phone)
VALUES
  ('Serhiy', 'Korotych', 'Serhiykorotych@hotmail.com',"962855140");


DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects` (
    `id` int NOT NULL AUTO_INCREMENT,
    `projectName` varchar(255) NOT NULL,
    `projectDescription` varchar(255) NOT NULL,
    `tools` varchar(255) UNIQUE NOT NULL,
    PRIMARY KEY (`id`)
  );
INSERT INTO `projects`
VALUES
  (
    'KinderBday',
    'Party planning mobile App ',
    'React, Bootstrap, CSS, MYSQL, Express'
  ),(
    
    'Breaking Bad Trivia',
    'Breaking Bad Trivia Game Quiz',
    'React, Bootstrap, CSS, MYSQL, Express'
  ),(
    'Radio Trip',
    'Browser Radio Station',
    'React, Bootstrap, CSS, MYSQL, Express'
  );