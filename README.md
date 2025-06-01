# Peared-Beta
Unassigned To-Do List that any of y'all can tackle if you have time and want to.
 - None of these are required for anybody, but Anushka and Andrew will assign them down the line
if nobody completes a significant portion of them.
 - Anybody can add to this list if they see an issue they want fixed (if it is urgent then ping in Discord).

Back-end:
 - CRITICAL:
   - Volunteers page
 - Front-end needs help with info.css to make a dynamic team layout that will be easier to control and use.
 - Allow the admins to approve/deny events 
 - On admin/volunteer pages: dynamic number pages, implementation of the "Next" button (yes i couldnt get it to work - Nathan)
 - Dynamic numbers (right now its only 1 - 2 - 3 but there could be more pages)
 - Allow users to sign up (auth prob needs to work tho) OR emails like signupgenius? (since we're trying to emulate that)
 - Make auth work (I tried cookies with express-session and it refused to work for me, maybe something persistant with mongoDB might work? - nathan)

Front-end:
 - Go through each page and see which are affected by the size of the window/screen and make them dependent on screen size (many pages break on mobile!).
 - About me add icons to show they are dropdown boxes
 - Animate dropdowns so they're NOT hover
 - Sign-up page 
 - Fill in the Info page with actual info
 - The raising of icons on hover is quite annoying, and should be removed from all pages (for buttons the transition should be replaced by a darkening/lightening effect)
   - or steal the effect from [codecademy](https://www.codecademy.com/search?query=python&fromPrevSearch=24324bbf-5977-495d-89f9-55dd15baed71)
 - Consistent style sheet needs to be made, and everything needs to be put to adhere to it
 - Webpage looks "dated," and a new style would be preferable
   - use sans-serif font instead of a serif one
   - reduce visual dead zones
   - update to smaller header
   - redesign of landing page
     - No more boxes, each section should have an entire screens width of horizontal space
     - Use the same header as all the other parts of the website (because the new page will now require scrolling to reach the buttons)
 - Change the headers to on the pages that aren't index to be the new prototype one (and fix it to work on mobile)
   - Andrew would recommend Find Opportunities's header because it has the most parts integrated from other headers.
   - Nathan recommends that the header should always be the same for UX reasons
