# Wordle Clone
## Rules 
- Program selects a random word
- You enter your guess
- Program checks each entered character for a match with the selected word
- If it's a match, the character background becomes green
- If it's a mismatch
  - If the character exists somewhere else in the selected word, the character background turns yellow.
  - Else the character background turns grey.
- You get a total of 6 chances to guess the word

## Search Logic and Error Handling
#### There are a few error prone cases we need to handle if we use linear string searching:
- If the word is 'mouth' and user enters 'stool', both 'o' becomes yellow, indicating that two 'o's exists in some other position, which is incorrect.
- If the word is 'mouth' and user enters 'teeth', the first 't' becomes yellow but the last 't' becomes green. The first yellow 't' suggests that there is another 't' somwhere else, which is incorrect.
#### These can be resolved by:
- Initializing a map() which stores the frequency of every character in the selected word
- If there is a match, the character turns green and reduces the frequency of the matched character by one
- Now, if there is a second encounter of that character with a mismatch, it only turns yellow if its frequency is more than 0 (which indicates the character still exists somewhere else). The frequency is again decreased by one
- If there is a mismatch and the frequency of that character is 0, it turns grey
- To avoid the second error prone case, we first search for all green characters and then do a second pass which checks for yellow/grey as after the first pass the frequency has been coorectly updated.
