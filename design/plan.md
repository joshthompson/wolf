# THE ROLES

## GOOD GUYS

### Village
- Regular player

### Seer
- Makes an accusation at night and sees their true form

### Apprentice Seer
- Once the seer dies, the apprentice seer takes over

### Cupid
- Chooses two lovers on the first night
- If either of these lovers dies, the other dies instantly

### Cleric
- Chooses a character to heal at night (can be self)
- If that player is targeted, they are not killed
- Can not chose same player two nights in a row

### The Fool
- Thinks they're the seer but gets random results back
- If they pick the real seer to identify, they are told they are the fool
- On death is announced as the fool so real seer knows they are not a fool at this point

### Hunter
- May choose to shoot someone at night / or not
- Whoever they kill will die instantly

### Harlot
- Can choose to visits other players at night
- If they visit the wolves target, they die with them
- If they are attacked during the night and they are visiting a player they remain safe

### Hitman
- Is given a random list of targets
- Must assure all targets are killed
- If all targets and werewolves are killed they win
- If all werewolves are killed before other targets they lose

### Assassin
- Only wins if alive at end and mayor is dead

### Mayor
- Doesn't know that they're the mayor (initially)
- In the event of ties, their vote is the casting vote
- Once dead they are a 'Ghost Mayor' and get a casting vote on ties
- In the event of them being attacked during day their role is revealed and they are safe for that vote
- Death triggers a by-election
	- ????

### Mayor (Alt)
- Special event can trigger election
	- Perhaps after X deaths
	- After X days
-

### The Martyr
- Can choose to protect a player at night (or players if harlot is with player)
- Will die in turn of that player

### Pacifist
- They can only vote on not to kill
- Can obstain

## BAD GUYS

### Werewolves
- Kill at night.

### Bad wolf
- When a bad wolf is involved in a kill there is a 25% chance that the kill is not immediatly lethal.
- This player will become wounded and die the following night

### Alpha wolf
- Only in large games
- After a wolf dies during day they can bite a player at night and they become a wolf

### The Devil
- Is on the side of the werewolves
- Knows who the wolf(s) are but they don't know the devils identity
- This means it is possible for the wolves to inadvertantly kill the devil

## OTHER ROLES

## Monster
- ?????
- If targetted by multiple wolves, one of the wolves will die
- Can be killed by villagers the accusing villager is killed
- Only wins if they are the last player

## Ghost
- May select a player to haunt at night and send a message
- Ghosts get a single collective vote to resolve ties

## Poltergeist
- There is a 1/10 chance that when a good guy dies they will be a zombie instead of a ghost
- They get once chance to kill any remaining player from beyond the grave
- Otherwise behave as a ghost

# SELECTING ROLES

Based off number of players we select bad roles
This generates a bad team score (scores to be determined)

The good team is then decided by adding together characters that create an equal score

Will require lots of testing and balancing

Can be modified by advanced settings
	- ????

# GAMEPLAY

## SETUP

Host presses 'Create Game'

Players Join and Select Avatar

Once X or more players have joined... start game appears for host

Host presses 'Start Game'
Countdown 3, 2, 1... - During countdown host can cancel
After countdown startGame event fires

## GAME PHASE

### NIGHT 1

- Discover your role
- Some roles get action phase

- The Cupid
	- Selects to members to turn into lovers
	- They are told this to screen

### DAY X

- Set 3 minute timer
- Text: 'Talk amongst each other'
- Client
	- has buttons to make accusations
	- once accusation is made others can not accuse same person
	- accusation is made public on the host
	- accusation may be withdrawn

- When 3 minute time is over
	- 30 second timer
	- If no accusations exist - go to night
	- If one accusation exists - vote to kill or not
	- If multiple accusations exist - vote on accusations
	- In the event of a tie
		- ??????
	- Loser of vote gets killed
		- When killed their true identity is revealed

### NIGHT X (WHEN: X > 1)

- Any night action consiquences are revealed

- 1 minute timer
- All users perform some action on their phone

- Villagers / Cupid
	- Random questions about the other players so they have something to click
	- Random other questions????

- Hitchhiker's Friend
	- Pick up a random player in your van
	- This will protect user against wolf attacks

- The Seer
	- Chose a player to identify the role of
	- After role is identified, icon appears next to their name
		- ????

- Werewolves
	- Have to select player to kill
	- If multiple werewolves they see each others votes on player names
	- All must unanimously vote to get kill
	- If kill can't be decided no kill is made

- Dead players
	- Choose to haunt a player as a ghost
	- Send a message to that players device

## END GAME

- After All werewolves are killed
	- Players win

- After there are less good guys than bad guys at start of night
	- Wolves win
	- Might need tweaking based off power of certain roles
		- For example pacifist shouldn't count
