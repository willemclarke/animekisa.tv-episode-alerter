2:26 PM] Bass: i've already given you suggestions what to do, install request-promise, go to the url which hosts the resource you're interested in (e.g. your faviroute anime). Open up network connections in your browser, clear it, refresh the page, see the network requests that get made. Look at the responses in each request and see if any of them pertain to the data you're interested in (e.g. getting the 'list' of episodes' would be something i'd be looking for)

[2:27 PM] Bass: if you can latch onto something useful like that, then obviously the goal is to know when the 'next' episode comes out, so find the highest number in the list of episodes and add 1 to it. The URL you should then start polling probably would be the URL of the latest released episode + 1

[2:28 PM] Bass: somewhere that request is being made (i promise you), they're fetching the data from somewhere

1:38 PM] Bass: all u need to do is compare the equality of the two arrays

[1:38 PM] Bass: top to bottom your program should do something like this i imagine

[1:40 PM] Bass: 1. You start the program, it starts an interval that makes GET requests to that endpoint. Inside this interval function, you want to start off with an empty array. Anytime you get a response you check the difference between it and your currently stored array of episodes. In the beginning this will definitely be different (as you start with an empty array and the first response will have some episodes probably).

[1:40 PM] Bass: if they are DIFFERENT, then u do something (e.g. send a sms message) AND subsequently you update that array now with the latest state.

[3:17 PM] Bass: yes
[3:17 PM] Bass: but what ur doing anyway doesn't really make sense
[3:18 PM] Bass: just call it const state
[3:18 PM] Bass: first request comes in, u add the episodes to the state
[3:18 PM] Bass: either go let state and use concat, or just push them to state
[3:18 PM] Bass: the other big flaw in your code
[3:19 PM] Bass: is you need to check the state vs the incoming request - this needs to happen before u change the state
[3:19 PM] Bass: otherwise ur just going to compare it to the newly appended array which will always be the same as the incoming response
[3:23 PM] Bass: but other than that u have the right idea

separate state

- if array is empty, first time it runs - dont send notification
-
