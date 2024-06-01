-- ---------------------------------------------------------
-- DATA DEFINITION QUERIES & SAMPLE DATA INSERT STATEMENTS
-- ---------------------------------------------------------
-- Project Step 5 DDL
-- Group 77, Guy Cohen and Katherine Sandeen


-- ---------------------------------------------------------
-- DISABLE COMMITS AND FOREIGN KEY CHECKS
-- ---------------------------------------------------------
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;


-- ---------------------------------------------------------
-- CREATE TABLE STRUCTURES
-- ---------------------------------------------------------
-- Players Object Table
CREATE OR REPLACE TABLE Players (
    playerID int NOT NULL AUTO_INCREMENT,
    playerName varchar(50) NOT NULL,
    playerAlias varchar(45) NOT NULL,
    playerLevel int NOT NULL,
    playerAge int NOT NULL,
    playerJoin date NOT NULL,
    playerImage varchar(255),
    PRIMARY KEY (playerID),
    UNIQUE (playerID),
    UNIQUE (playerAlias),
    CONSTRAINT CHK_Level CHECK (playerLevel BETWEEN 1 AND 150)
);

-- Planets Object Table
CREATE OR REPLACE TABLE Planets (
    planetID int NOT NULL AUTO_INCREMENT,
    planetName varchar(45) NOT NULL,
    planetTerrain enum('Mountains','Ocean','Desert','Swamp','Forest','Icy') NOT NULL,
    PRIMARY KEY (planetID),
    UNIQUE (planetID),
    UNIQUE (planetName)
);

-- MissionTypes Category Table
CREATE OR REPLACE TABLE MissionTypes (
    missionID int NOT NULL AUTO_INCREMENT,
    missionName varchar(70) NOT NULL,
    missionDesc varchar(300) NOT NULL,
    missionDuration time NOT NULL,
    PRIMARY KEY (missionID),
    UNIQUE (missionID),
    UNIQUE (missionName),
    UNIQUE (missionDesc)
);

-- Teams Transaction Table
CREATE OR REPLACE TABLE Teams (
    teamID int NOT NULL AUTO_INCREMENT,
    teamTitle varchar(70) NOT NULL,
    teamMeet datetime NOT NULL,
    teamDifficulty int NOT NULL DEFAULT 1,
    team18Up tinyint(1) NOT NULL DEFAULT 0,
    teamChat tinyint(1) NOT NULL DEFAULT 0,
    teamCount int NOT NULL DEFAULT 0,
    teamImage varchar(255),
    missionID int NOT NULL,
    planetID int NOT NULL,
    langID char(4),
    PRIMARY KEY (teamID),
    FOREIGN KEY (missionID) REFERENCES MissionTypes(missionID)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (planetID) REFERENCES Planets(planetID)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (langID) REFERENCES Languages(langID)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
    UNIQUE (teamID),
    UNIQUE (teamTitle,teamMeet),
    CONSTRAINT CHK_Difficulty CHECK (teamDifficulty BETWEEN 1 AND 9),
    CONSTRAINT CHK_Count CHECK (teamCount BETWEEN 0 AND 4)
);

-- Languages Category Table
CREATE OR REPLACE TABLE Languages (
    langID char(4) NOT NULL,
    langName varchar(45) NOT NULL,
    PRIMARY KEY (langID),
    UNIQUE (langID),
    UNIQUE (langName)
);

-- TeamPlayers Intersection Table
CREATE OR REPLACE TABLE TeamPlayers (
    teamPlayerID int NOT NULL AUTO_INCREMENT,
    teamID int NOT NULL,
    playerID int NOT NULL,
    PRIMARY KEY (teamPlayerID),
    FOREIGN KEY (teamID) REFERENCES Teams(teamID)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (playerID) REFERENCES Players(playerID)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    UNIQUE (teamPlayerID),
    UNIQUE (teamID,playerID)
);


-- ---------------------------------------------------------
-- TRIGGERS FOR SPECIFIC BEHAVIORS
-- ---------------------------------------------------------
-- Update teamCount after TeamPlayers insertion
DELIMITER $$
CREATE TRIGGER teamCountIncInsert
    AFTER INSERT ON TeamPlayers FOR EACH ROW
BEGIN
    UPDATE Teams SET teamCount = teamCount + 1 WHERE teamID=NEW.teamID;
END; $$
DELIMITER ;

-- Update teamCount after TeamPlayers deletion
DELIMITER $$
CREATE TRIGGER teamCountDecDelete
    AFTER DELETE ON TeamPlayers FOR EACH ROW
BEGIN
    UPDATE Teams SET teamCount = teamCount - 1 WHERE teamID=OLD.teamID;
END; $$
DELIMITER ;

-- Update teamCount before Player deletion
DELIMITER $$
CREATE TRIGGER teamPlayerDecDelete
    BEFORE DELETE on Players FOR EACH ROW
BEGIN
    DELETE FROM TeamPlayers WHERE playerID=OLD.playerID;
END; $$
DELIMITER ;

-- Verify age before TeamPlayers insert
DELIMITER $$
CREATE TRIGGER verifyAgeInsert
    BEFORE INSERT ON TeamPlayers FOR EACH ROW
BEGIN
    DECLARE adultsOnly tinyint(1);
    DECLARE age int;

    SELECT team18Up INTO adultsOnly FROM Teams WHERE teamID=NEW.teamID;
    SELECT playerAge INTO age FROM Players WHERE playerID=NEW.playerID;

    IF (adultsOnly = 1) AND (age < 18) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Team players must be adults';
    END IF;
END; $$
DELIMITER ;

-- Restrict update to adults only if team already has minors
DELIMITER $$
CREATE TRIGGER restrict18UpFalseUpdate
    BEFORE UPDATE ON Teams FOR EACH ROW
BEGIN
    DECLARE teamMinors int;

    SELECT COUNT(TeamPlayers.playerID) INTO teamMinors FROM TeamPlayers 
        INNER JOIN Players ON TeamPlayers.playerID=Players.playerID
        WHERE TeamPlayers.teamID=NEW.teamID AND (Players.playerAge < 18);

    IF (NEW.team18Up = 1) AND (teamMinors > 0) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot set adults only with minor recruit(s)';
    END IF;
END; $$
DELIMITER ;

-- Restrict update to minor age if already registered to adult team(s)
DELIMITER $$
CREATE TRIGGER restrictAgeUpdate
    BEFORE UPDATE ON Players FOR EACH ROW
BEGIN
    DECLARE adultTeams int;

    SELECT COUNT(TeamPlayers.teamID) INTO adultTeams FROM TeamPlayers
        INNER JOIN Teams ON TeamPlayers.teamID=Teams.teamID
        WHERE Teams.team18Up=1 AND TeamPlayers.playerID=NEW.playerID;

    IF (adultTeams > 0) AND (NEW.playerAge < 18) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot set minor when registered to adult team(s)';
    END IF;
END; $$
DELIMITER ;

-- Auto-Set langID to NULL if teamChat is False
-- & teamChat to False if langID NULL
DELIMITER $$
CREATE TRIGGER langNullInsert
    BEFORE INSERT ON Teams FOR EACH ROW
BEGIN
    IF (NEW.teamChat = 0) THEN
        SET NEW.langID = NULL;
    ELSEIF (NEW.langID IS NULL) THEN
        SET NEW.teamChat = 0;
    END IF;
END; $$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER langNullUpdate
    BEFORE UPDATE ON Teams FOR EACH ROW
BEGIN
    IF (NEW.teamChat = 0) THEN
        SET NEW.langID = NULL;
    ELSEIF (NEW.langID IS NULL) THEN
        SET NEW.teamChat = 0;
    END IF; 
END; $$
DELIMITER ;

-- Auto-set teamChat to false if language is to be deleted
DELIMITER $$
CREATE TRIGGER setChatFalseDelete
    BEFORE DELETE ON Languages FOR EACH ROW
BEGIN
    UPDATE Teams SET teamChat = 0 WHERE langID=OLD.langID;
END; $$
DELIMITER ;

-- Prevent double-book of schedule for TeamPlayer
DELIMITER $$
CREATE TRIGGER schedulerInsert
    BEFORE INSERT ON TeamPlayers FOR EACH ROW
BEGIN
    DECLARE newStart datetime;
    DECLARE duration time;
    DECLARE newEnd datetime;
    DECLARE dBookings int;

    SELECT teamMeet INTO newStart FROM Teams WHERE teamID=NEW.teamID;
    SELECT MissionTypes.missionDuration INTO duration FROM MissionTypes
        INNER JOIN Teams ON MissionTypes.missionID = Teams.missionID
        WHERE Teams.teamID = NEW.teamID;
    SELECT ADDTIME(newStart, duration) INTO newEnd;

    SELECT COUNT(Spans.teamID) INTO dBookings FROM (
        SELECT Teams.teamID, Teams.teamMeet AS startTime, ADDTIME(Teams.teamMeet, MissionTypes.missionDuration) AS endTime
        FROM Teams INNER JOIN MissionTypes ON Teams.missionID=MissionTypes.missionID
        WHERE Teams.teamID IN (SELECT teamID from TeamPlayers WHERE playerID=NEW.playerID)
    ) AS Spans
        WHERE (newStart BETWEEN Spans.startTime AND Spans.endTime)
            OR (newEnd BETWEEN Spans.startTime AND Spans.endTime)
            OR (newStart < Spans.startTime AND newEnd > Spans.endTime);

    IF (dBookings > 0) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Time already booked for player';
    END IF;
END; $$
DELIMITER ;


-- ---------------------------------------------------------
-- INSERT SAMPLE DATA
-- ---------------------------------------------------------
-- Players Data
INSERT INTO Players (playerName, playerAlias, playerLevel, playerAge, playerJoin)
VALUES
('William Riker', 'numberOne', 60, 38, '2022-03-02'),
('John Snow', 'Lazarus', 87, 17, '2019-09-23'),
('Sevro Au Barca', 'Goblin', 108, 31, '2017-03-15'),
('Mahit Dzmare', 'thinkTwice', 21, 25, '2023-02-19'),
('Hoban Washburn', 'leafonthewind', 40, 29, '2019-07-12'),
('John Grey', 'Lord1745', 10, 37, '2024-04-07');

-- Planets Data
/* 
Source: Helldivers Wiki. (2024, April 22). Planets and Sectors (Helldivers 2). https://helldivers.fandom.com/wiki/Planets_and_Sectors_(Helldivers_2) 
*/
INSERT INTO Planets (planetName, planetTerrain)
VALUES
('Alathfar XI', 'Mountains'),
('Klen Dahth II', 'Ocean'),
('Marfark', 'Desert'),
('Electra Bay', 'Swamp'),
('Achernar Secundus', 'Forest'),
('Viridia Prime', 'Icy');

-- MissionTypes Data
/*
Source: Harper, Lauren et al. (2024, March 29). Mission Type Guide. IGN. https://www.ign.com/wikis/helldivers-2/Mission_Type_Guide
*/
INSERT INTO MissionTypes (missionName, missionDesc, missionDuration)
VALUES
(
    'Terminate Illegal Broadcast',
    'Destroy the illegal propaganda broadcast.',
    '00:40:00'
),
(
    'Pump Fuel to ICBM',
    'Reactivate the fueling station and launch ICBM.',
    '00:40:00'
),
(
    'Unload Escape Pod Data',
    'Extract valuable data from teh crashed escape pod.',
    '00:40:00'
),
(
    'Blitz: Search and Destroy',
    'Locate and seal bug holes or automaton fabricators.',
    '00:12:00'
),
(
    'Eradicate Terminid Swarm',
    'Kill terminids to thin their numbers.',
    '00:15:00'
);


-- Languages Data
INSERT INTO Languages (langID, langName)
VALUES
('ENGL', 'English'),
('ESPL', 'Espanol'),
('FRNC', 'Francais'),
('DEUT', 'Deutsch'),
('PRTG', 'Portugues');

-- Teams Data
INSERT INTO Teams
(
    teamTitle,
    teamMeet,
    teamDifficulty,
    team18Up,
    teamChat,
    missionID,
    planetID,
    langID
)
VALUES
(
    'Shield of Democracy',
    '2024-05-31 14:30:00',
    3,
    1,
    1,
    2,
    3,
    'ENGL'
),
(
    'Indominus Legion',
    '2024-06-01 11:15:00',
    5,
    0,
    0,
    5,
    2,
    NULL
),
(
    'FHC',
    '2024-06-08 13:00:00',
    5,
    0,
    1,
    5,
    1,
    'FRNC'
),
(
    'Holy Divers',
    '2024-06-08 15:30:00',
    2,
    0,
    1,
    3,
    2,
    'ENGL'
);

-- TeamPlayers Data
INSERT INTO TeamPlayers (teamID, playerID)
VALUES
(1, 4),
(1, 6),
(2, 5),
(2, 2),
(2, 4),
(3, 5);


-- ---------------------------------------------------------
-- TURN COMMITS AND FOREIGN KEY CHECKS BACK ON
-- ---------------------------------------------------------
SET FOREIGN_KEY_CHECKS=1;
COMMIT;