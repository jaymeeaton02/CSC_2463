# CSC 2463 Final Project Documentation																									
						CSC 2463 Integration Project Proposal:	
																
For my integration project I would like to do an updated and more advanced version of the bug squish game. 
I would change the original game by adding more characters into the game, and when the other characters are squished there would be points deducted from the player. 
I would also make it so that there are two players who will compete against each other, one after the other, and the final scores would be displayed on the final end screen. 
I would also add music to the background as well as noises for the squashed bugs. 
For the hardware part I would have a green LED light up when a correct bug is squished and a red LED light up when an incorrect character is pressed. 
There are going to be two screens but they will be the same. The only difference would be which player would be playing.


					Diagram of Project (from Project Proposal):
						
<img width="423" alt="Screen Shot 2023-05-09 at 12 16 10 PM" src="https://github.com/jaymeeaton02/jaymeeaton_CSC2463FinalProject.github.io/assets/77986526/19a36884-e953-4880-85a3-b75cffc81940">


					Initial Project Outline:

P5 

	-Game Screens 
		-Opening Screen 
		-Game Screens 1 and 2
			-Butterfly (correct bug to be squashed)
				-Points will be added for each squashed butterfly
			-Caterpillar, Ant, Ladybug (incorrect bugs) 
				-Points will be deducted for pressing these bugs
			-Timer 
				-Countdown from 30 seconds
			-Score
				-Increases from 0
					-Can decrease if above 0 but cannot become a negative number 
		-Transition Screen 
		-Final Screen 
				-Will include final points from game screen 1 and game screen 2

Sound

	-Sounds for clicking butterfly 
		-Will be more quiet and more calm 
		-A nicer sound to hear so the user knows they are doing good in the game
	-Sounds for clicking other bugs (caterpillar, ant, ladybug)
		-Will be louder and more annoying to hear
		-Make sure the user knows the wrong bug was pressed
	-Background music 
		-Runs while the user is playing the game
		
Arduino

	-Green LED 
		-Will light up when a butterfly is pressed 
	-Red LED 
		-Will light up when a bug other than the butterfly (caterpillar, ant, ladybug) is pressed 
	-Ultrasonic Sensor 
		-Will change the screen from white to darker shades of gray until black is reached, the closer the user gets to the screen 

Combine the three into one game



						Detailed Project Outline:

This integration project consisted of three different components: graphic (p5), sound (tone), and physical (arduino). For the graphic component of this project, I decided to make a game in which two users will compete, one after the other, to see who can squash the most butterflies in an allotted period of time, 30 seconds. A butterfly is squashed by the user by using the mouse/keypad to click on the butterfly. With each squashed butterfly a point would be added to their score and the user with the most points at the end of both rounds would win the game. I decided to add additional bugs (ladybugs, ants, and caterpillars) to the game in order to make the game more difficult. With each incorrect bug that is squashed, a point is deducted from the user’s final score. The graphic portion also consists of several different screens that the user sees throughout the game. Thes screens include: an opening screen for player 1 (in which the instructions are listed), a game screen for player 1 (in which they are able to squash bugs), a transition screen from player 1 to player 2 (in which the instructions are listed), a game screen for player 2, and a ending screen (in which the scores and an option to play again is listed). 

For the sound component  of the game there are two main parts, the background music and noises for when a bug is squished. I decided to have two different sounds for when a bug is squished to make sure the player knows which bug was squashed. When a butterfly is squashed a squishing noise is made and when another bug is squashed a noise that is a dissonant, wrong button sound is made. There is also background music playing on a loop during each round of the game. The music will start once the first bug is squashed and will end at the end of the round for that player. 

For the physical component of the game there are things that a player can do that will affect their game as well as things that will occur as a result of things happening in the game. When a butterfly is squashed a green LED will light up thus indicating that a point was scored. However, when an incorrect bug is squashed a red LED will light up and a point will be lost. Another factor controlled by the physical component is the use of an ultrasonic sensor. This uses ultrasonic sensors in order to determine distance. In this project it will be used to determine how close a person is to the sensor. When a person moves closer to the sensor, thus getting closer to the screen, the background color of the screen will slightly darken. The screen will darken in noticeable increments in order to get the user to remain a good distance from the screen. This is to add a new element of difficulty.


						Changes Made from Project Proposal:

One of the first changes that were made from the project proposal was that I made the game full screen. I decided that this was important as it would give the players more screen and thus more bugs to squish, which would increase the score that could be obtained. I decided to keep with the loss of a point if a wrong bug was squished. I debated having the points go into the negatives, in the case that both players did not hit any of the correct bugs. I decided against this so that the lowest score a player could get would be a score of 0. Another thing I changed when developing the game was how long each player should have. I originally went with 60 seconds, but felt that 60 seconds was too long for each player to have. I ultimately decided to go with 30 seconds as I felt that this was the right amount of time to allow players to get used to the game, without being able to hit all of the butterflies and have a lot of time left over. 

I kept the details for the sound and physical portions the same in that there is a sound for every correct bug squashed and a different more displeasing sound for incorrect bugs squashed and the LEDs light up and the screen changes based on the user. There is also background music that loops as the player continues the game. I debated speeding up the music as the player is playing the game, however I ultimately decided against this as there was already a lot of noise that occurs when any bug is squished.

						
							Future Plans:

One plan I thought about when it came to the future regarding the graphics portion was to add a feature in which if a player squishes all of the correct bugs before time was over to have it end their time, so they don’t have to wait until their turn is officially over. This could be helpful so that the game could be a longer amount of time without feeling too long. A downside to this would be that the player could no longer lose points before their opponent goes, or the game is over. To make up for this, I could add a feature that would take into account the amount of time in which a player takes to squish the amount of bugs that they did and factor that into the final score.

A plan for future development involving the sound portion of the project is to have the music speed up as the players squish more bugs. The reason this wasn’t added into the current project is because it felt overwhelming with everything going on in the project. If this was added in the future, it would be necessary to get different sounds for the squished bugs so that it would not feel overwhelming when the music starts to speed up. This could also be achieved by completely changing the background music to something that would sound less chaotic when sped up. 

A final future plan, regarding the physical component, would be to have the screen close in on the user the closer they get to screen, making the screen only visible through a peephole view. This would limit the amount of screen view the user has and would make sure the user could not come within a certain distance of the screen to get the full view. The addition of this would make the game slightly more difficult for the users and would hopefully add another competitive element.


							Images of Project:

Opening Screen: 


<img width="456" alt="Screen Shot 2023-05-09 at 12 35 28 PM" src="https://github.com/jaymeeaton02/jaymeeaton_CSC2463FinalProject.github.io/assets/77986526/f637c9ae-09f3-49ea-adfb-bdbf6fa7bbaa">


Transition Screen between players 1 and 2:


<img width="445" alt="Screen Shot 2023-05-09 at 12 35 55 PM" src="https://github.com/jaymeeaton02/jaymeeaton_CSC2463FinalProject.github.io/assets/77986526/add87d38-b13d-4468-85b9-8c0cbe2d93cc">


Game Screen:


<img width="469" alt="Screen Shot 2023-05-09 at 12 36 27 PM" src="https://github.com/jaymeeaton02/jaymeeaton_CSC2463FinalProject.github.io/assets/77986526/13fe4ddc-e53e-4751-8858-985eb3f74d11">


Game Screen with Squished Bugs:


<img width="457" alt="Screen Shot 2023-05-09 at 12 36 55 PM" src="https://github.com/jaymeeaton02/jaymeeaton_CSC2463FinalProject.github.io/assets/77986526/2b5d1c77-0aee-4fe3-917e-ec383c4981cc">


Final Game Screen:


<img width="344" alt="Screen Shot 2023-05-09 at 12 37 17 PM" src="https://github.com/jaymeeaton02/jaymeeaton_CSC2463FinalProject.github.io/assets/77986526/37e692f8-00e4-4a71-bc68-6f3cb3e51f39">


Arduino Setup:


<img width="384" alt="Screen Shot 2023-05-09 at 12 37 23 PM" src="https://github.com/jaymeeaton02/jaymeeaton_CSC2463FinalProject.github.io/assets/77986526/51841e19-2069-475c-846d-91317304c74f">



Images of bugs:


Butterfly:							


<img width="152" alt="Screen Shot 2023-05-09 at 12 37 28 PM" src="https://github.com/jaymeeaton02/jaymeeaton_CSC2463FinalProject.github.io/assets/77986526/a2d32809-12ac-4962-813b-c91b22d67a75">


Ladybug:
 	
	
<img width="142" alt="Screen Shot 2023-05-09 at 12 37 32 PM" src="https://github.com/jaymeeaton02/jaymeeaton_CSC2463FinalProject.github.io/assets/77986526/afc06cd2-1d71-42eb-8f32-767f471d1bb3">


Ant:  


<img width="84" alt="Screen Shot 2023-05-09 at 12 37 35 PM" src="https://github.com/jaymeeaton02/jaymeeaton_CSC2463FinalProject.github.io/assets/77986526/273f0b64-d33a-4b27-8913-abb0fcddf8bb">


Caterpillar:
		
		
<img width="97" alt="Screen Shot 2023-05-09 at 12 37 38 PM" src="https://github.com/jaymeeaton02/jaymeeaton_CSC2463FinalProject.github.io/assets/77986526/fb5f133f-a966-4e3b-890a-f54f25643e32">







							Youtube Links:


Link to Video of the Different Stages of the Project Being Developed:
https://youtu.be/4BpIVFpADNo 

Link to Video of the Completed Final Project Working: 
https://youtu.be/ScdflFivL5M 
