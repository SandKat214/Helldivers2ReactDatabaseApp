# Planetary Liberators
Helldivers 2 is a popular video game, with over 8 million copies sold and an estimate of over 1,800,000 active players. Gameplay involves working with a squad to complete missions, in an effort to liberate planets. Despite the popularity of the game, there is no centralized hub where players can recruit team members for their missions and strategize, instead having to rely heavily on social media to accomplish these ends.
This database driven app will venture to create the first leg of such a hub, which focuses specifically on mission recruitments

## Home Page
The home page includes a high level overview for the purpose of our application, and provides an explicit interface for users to search for existing teams.

## Players Page
The Players page gives users access to the player registration tab. Users input their information and can upload a profile photo that is stored on Cloudinary as well.
### Players Relationships
- M:M relationship between Players and Teams, with playerID and teamID as FKs inside the TeamPlayers intersection table. A player can be a recruit for zero or more teams.

## Planets Page
The Planets page gives users access to what planets exist in the Helldivers ecosystem, Planet types are confined to a set of Enums.
### Planets Relationships 
- 1:M relationship between Planets and Teams, with planetID as a FK inside Teams. A planet can be linked to zero or more team recruitments.

## Teams Page
The Teams page shows users what teams are registered, users can create teams, upload team cover photos, and explore potential teams to join.
### Teams Relationships
- M:M relationship between Teams and Players, with teamID and playerID as FKs inside the TeamPlayers intersection table. A team starts with zero players and can recruit up to four.
- M:1 relationship between Teams and MissionTypes, with missionID as a FK inside of Teams. A team must have one and only one mission type associated with it.
- M:1 relationship between Teams and Planets, with planetID as a FK inside of Teams. A team must have one and only one planet associated with it.
- M:0 relationship between Teams and Languages, with languageID as a FK inside of Teams. A team will only have an associated language if a team chat will be active, otherwise languageID will be NULL.

## MissionTypes Page
Mission types shows users the what mission types exist in the game.
### MissionTypes Relationships
- 1:M relationship between MissionTypes and Teams, with missionID as a FK inside Teams. A mission type can be linked to zero or more team recruitments.

## Languages Page
Langauges page shows users what languages are used to communicate between teams. It is a nullable relationship for when teams don't want to communicate.
### Languages Relationships
- 0:M relationship between Languages and Teams, with languageID as a FK inside Teams. A language can be linked to zero or more team recruitments.

## TeamsPlayers Page
Teams players is an intersection table between players and teams.
### TeamPlayers Relationships
- M:1 relationship between TeamPlayers and Players, with playerID as a FK inside TeamPlayers. Each table entry must have one and only one player.
- M:1 relationship between TeamPlayers and Teams, with teamID as a FK inside TeamPlayers.
