export default [
    [
        {
            title: 'Alphabet Soup',
            html: `<div>Suppose the alphabet is ordered like so: <code>LMNOPQRSTUVWXYZABCDEFGHIJK</code></div>
            <div>Sort the string <code>“STEVENSCOMPUTERSCIENCECLUB”</code> based on the new alphabetic order.</div>`,
            answer: ['LMNNOPRSSSTTUUVBCCCCEEEEEI', 'lmnnoprsssttuuvbcccceeeeei']
          },
          {
            title: 'Three-Seven-Eleven',
            html:
              'How many numbers in between 1 and 10,000 (inclusive) are divisible by 3, 7, or 11?',
            answer: ['4805']
          },
          {
            title: 'Long Series',
            html: `<div>The series, 1<sup>1</sup> + 2<sup>2</sup> + 3<sup>3</sup> + ... + 10<sup>10</sup> = 10405071317</div>
              <div>Find the last ten digits of the series: 1<sup>1</sup> + 2<sup>2</sup> + 3<sup>3</sup> + ... + 1000<sup>1000<sup></div>`,
            answer: ['9110846700']
          }
    ],
    [
      {
        title: "Un-muddle the Ducks!",
        html: "<p>You have 10 little rubber ducks. Attila says that if you can arrange the ducks in 5 straight line with each line having 4 ducks, they will pay your tuition in full :O How would you arrange the ducks?</p>",
        answer: ['star','Star'],
      },
      {
        title: "Steal from the Vault!",
        html: '<div><p>Dr. Akcam, in her quest to rob a bank, has finally entered the bank vault! To her dismay, this is no ordinary bank vault, this bank vault is completely tilted! The floor is angled and slippery enough in a way that she can only move herself down and to the right. Along the maze, there are gold coins of varying values. Based on the floor plan (with numbers in a cell representing the value of the gold coin in that spot), what is the maximum amount of money Dr. Akcam can rob from the bank vault by moving from her entrance point in the top left of the vault down to the exit in the bottom right?</p><img src="./coin_collecting.png" alt="coin_collection_problem"/></div>',
        answer: ['43'],
      },
      {
        title: "Space Donuts",
        html: `<div><p>In a pixelated galaxy far, far away, there are space donuts! Each space donut is represented by a binary sprinkle code. The Master Space Baker combined three types of donuts:</p><ol><li> Type A: 0b11001010 (in binary)</li><li> Type B:  0b10111011 (in binary)</li><li> Type C:  0b11100101 (in binary)</li></ol><p>The Baker's special formula: <br><ol><li> Take the sum of Type A and Type B. </li><li> Multiply the result by Type C. </li><li> Subtract the square of Type B. </li><li> Finally, find the remainder when divided by the Galactic Lucky Number 7. </li></ol><p>What is the cosmic residue of this intergalactic equation?</p></div>`,
        answer: ['5'],
      },
    ],
    [
      {
        title: "Alien Invasion!",
        html: '<div><p>Aliens have taken over Stevens and are leaving their messages everywhere! But something\'s weird… they use the English alphabet to make these messages. HASS has asked us CS kids to figure out what alphabet they\'re using! We were able to get a few words from the aliens that are guaranteed to be in lexicographic order (in their language of course). Can you figure out what order their alphabet is? Type the alphabet as one string with no spaces or commas.</p> <ul> <li> "gotepxu" </li> <li> "kotjamfqv" </li> <li> "ripfvn" </li> <li> "lwn" </li> <li> "oecdql" </li> <li> "ybzjvhswn" </li> <li> "goeyrpuzjmfvlwn" </li> <li> "gkotecbrip" </li> </ul> </div>',
        answer: ['gkotecybripxuzdjamfqvhlswn'],
      },
      {
        title: "TV on the Fritz!",
        html: `<div><p>You notice your TV has been acting very strange lately… It's only 16 different colors in the same order, over and over again. You jot down the different colors you see, you think there must be some reason to this order…</p><img src="./tv1.png" alt="color_palette See list below"/><br/><code>Or, in word-form: ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'lime', 'pink', 'cyan', 'peach', 'lilac', 'brown', 'gray', 'white', 'black']</code><p>You look at the TV again and suddenly this pattern appears…</p><img src="./tv2.png" alt="Large color_palette, see list below"/><br/><code>Or, in list form: ['indigo', 'violet', 'violet', 'indigo', 'violet', 'white', 'violet', 'blue', 'violet', 'cyan', 'violet', 'white', 'violet', 'lime', 'yellow', 'red', 'violet', 'gray', 'violet', 'orange', 'violet', 'green', 'violet', 'pink', 'violet', 'cyan', 'violet', 'white', 'violet', 'indigo', 'lime', 'green', 'yellow', 'red', 'lime', 'green', 'violet', 'green', 'violet', 'orange', 'lime', 'yellow', 'violet', 'indigo', 'yellow', 'red', 'violet', 'gray', 'violet', 'indigo', 'yellow', 'red', 'violet', 'orange', 'yellow', 'red', 'violet', 'brown', 'violet', 'black', 'lime', 'blue', 'yellow', 'orange']</code><p>Can you figure out the secret message?</p></div>`,
        answer: ['Vending machines scare me a lot!'],
      },
      {
        title: "Find the figure",
        html: '<div><p>Can you solve the following nonagram and determine what it is representing?</p><img src="./grid_blank.png" alt="blank_large_grid"/></div>',
        answer: ['bird', "Bird"],
      },
    ],
    [
      {
        title: "Squirrel Census?",
        html: '<p>In a forest, each squirrel has some color. Some subset of squirrels (possibly all of them) tell you how many other squirrels have the same color as them. Given this list of responses: <br><code>[3, 0, 4, 5, 0, 2, 4, 5, 3, 2, 4, 2, 3, 0, 2]</code><br>Return the minimum number of squirrels that could be in the forest.</p>',
        answer: ['24'],
      },
      {
        title: "Startup Troubles",
        html: `<div><p>You (friend A) and your 4 friends worked on a side project that ended up making $100 this year. Your team has a strict hierarchy of you at the top, followed by friend B, then friend C, then friend D, and finally at the bottom of the hierarchy is friend E. You decide on the following rules to distribute your earnings: <br><ol><li> The person at the top of the hierarchy decides on a distribution of the earnings </li><li> You all vote on the proposal (including the proposer) and it is approved if at least ½ are in favor </li><li> If the vote fails, the proposer is then removed from the group and receives no earnings, leaving the next highest person in the hierarchy to be the next to determine the earnings. </li></ol>The mindset of all involved is to maximize their individual profits from this distribution. What is the maximum amount that you, as the person at the top, can request given that everyone is acting logically to maximize their profit, and avoiding their own proposal failing. Express your answer as the distribution you would propose in the form A:B:C:D:E. For example, if you wanted to claim all earnings your answer would be “100:0:0:0:0” without the quotes.</p></div>`,
        answer: ['98:0:1:0:1'],
      },
      {
        title: "A worthy Sacrifice",
        html: `<div><p>There are 131071 jars, 131070 of which contain a part of a mechanical keyboard (a CS major’s favorite to type on), and 1 of which contains… GRASS. A CS major will pass out on the spot within an hour of touching the grass in the jar (they couldn’t handle the feeling of the outdoors). What is the minimum number of CS majors needed to determine which jar has grass? </p></div>`,
        answer: ['17'],
      },
    ]
]