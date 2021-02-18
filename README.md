## Pitch video
[ID_Take-Off_pitch.mp4](https://drive.google.com/file/d/1pLc64Ccfh3FC_6BpYfzlYHs1P-Qa0-79/view?usp=sharing)

# Take-Off

Our website aims to provide a entertaining and interesting experience to the user regarding the topic of "Space". Our website is a kid friendly and in a sense a hub world for people to access new and exciting information regarding Space. We made this possible by intergarting NASA's API into our website, allowing for 1 click access to many interesting articles and news regarding space. So come on! The planetary soup is stirring, what will you discover?


## Design Process

This project is for those in the general public who have an interest in space but not to the point of understanding the technical jargon. The design is simplistic and takes the data that is the flashiest and most-likely to arouse interest. This way, non-space buffs can get a taste of space (information about incoming asteroids, space news) and those who already know about space can enjoy the daily media chosen by NASA or generate something cool about space.

The project's aim is achieved since it is an easily accessible website, with all the information on one page, and can be used across browsers.

- As a space-obsessed person who knows a lot about space, I want to have more exposure to cool things about space.
- As someone who does not know a lot about space but wants to know some exciting space information, I want to have some facts that serves as a conversation topic.

![Wireframe](https://user-images.githubusercontent.com/72980567/108166384-15518e00-712f-11eb-8e16-2a57b8299e02.png)

Low-fidelity wireframe made at the beginning of the project

## Features

1. **Media of the Day**
API used ~|•   [APOD](https://github.com/nasa/apod-api)
This feature is the top left tile that shows the daily photo/video based on the NASA's API, it updates daily so users can check back everyday to read a new and exciting article regarding the secrets of the cosmos.
The information included includes the actual photo/video, a title, the date that NASA has allocated it to, the copyright holders if applicable, and a description of the media.
The media is chosen by NASA so it would be visually appealing and exciting from the biggest space nerd to the common man.

2. **NEO Astroid feature**
API used ~|•   [NeoW](https://api.nasa.gov/neo/?api_key=DEMO_KEY)
This feature shows up to 4 of the current near earth objects each from the current and next day floating around the earth? The Name, diameter, velocity and distance from earth are all listed and taken directly from NASA's API, users interested in this field will be able to get live statistics updated daily regarding near earth objects. Clicking on each aesteroid's name would bring the user to the aesteroid's profile on the [Jet Propulsion Laboratory's website](https://www.jpl.nasa.gov/). This tile takes the desirable, updated information from NASA's API and displays it in a simple way.

3. **Something cool?**
API used ~|•   [NASA images and video API](https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf)
The user can interact with this tile by typing in the "Enter a keyword" input and clicking the dropdown menu and choosing a media type:
        1. Image for pictorial data
        2. Audio for audio data
        3. Surprise for any
Upon choosing a media type, a random piece of media is chosen and displayed. The information includes the media type, its title, the description of the media/the transcript of the podcast.
An error message/alert would show up if the user does not enter a keyword or if there is no media related to the keyword.

4. **Spacey News**
RSS used ~|•   [Space.com](https://www.space.com/feeds/all) with [Heroku proxy](https://www.heroku.com/)
News articles posted on Space.com will be shown here, allowing for articles to be constantly updated. Users interested in a certain article will be able to click and access the full article at its original source in Spade.com, the user will be able to easily navigate through the articles and pick ones that they enjoy the most. Each article would have a title, image, time published, and a short description/preview that will appear in a popup when the article is hovered over.

5. **Theming**
Users can change the background and accent colours of the website through a colour picker. The user's preferences are stored in localstorage.

6. **Rocket**
A rocket would appear occasionally and either stay at the top of the screen or exit through the top. Users who click the rocket would increase a counter. A number will flash and show then what is the current count. The count is stored in localstorage.

 
### Existing Features
- Media of the day - allows user to see something fresh and related to space every day
- Spacey News - users can see the latest news about space and check out the source
- NEO Astroid - An easy way for user intepret and internalise information about incoming aesteroids
- Something Cool - Gives users the ability fast entertainment about a chosen topic and in a preferred medium

### Features Left to Implement
- More tiles dedicated to each of NASA's [other APIS](https://api.nasa.gov/#browseAPI)
- Some kind of quiz or game tile
- The ability to change the time zone based on your country
- More theming/decor/customisation ideas
- reordering the tiles
- Implementation of APIs from other sources ([example](http://open-notify.org/Open-Notify-API/People-In-Space/))
- Support of different time zones

## Technologies Used

- [JQuery](https://jquery.com)
    - The project uses **JQuery** to simplify DOM manipulation
- [HTML](https://html.spec.whatwg.org/)
    - The project uses **HTML** to describe the structure and presentation of information
- [Bootstrap](https://getbootstrap.com/)
    - The project uses **Bootstrap** to design websites faster and easier
- [CSS](https://www.w3.org/TR/CSS/#css)
    - The project uses **CSS** to describe the presentation of a document
- [LottieFiles](https://lottiefiles.com/)
    - The project uses **LottieFiles** to display lightweight and scalable Lottie animations
- [Google Fonts](https://fonts.google.com/)
    - The project uses **Google Fonts** for the Montserrat and Source Sans Pro fonts


## Testing

1. Hyperlinked elements:
    1. User finds aesteroid/news article interesting
    2. User clicks on element and is redirected to appropriate page in a new tab

2. Something Cool?:
    1. User tries to generate something cool by selecting media type and leaving input blank triggering alert to let user to enter a keyword
    2. User enters something that has no entries/selects a media type that has no entries for that keyword, error message appears
    3. User enters appropriate keyword and selects media type, which yields results that are displayed in the tile

3. Website on different devices :
    1. The website looks similar on all browsers. The biggest difference is that the website shows tiles in 2 columns on larger screens and shows tiles in 1 column on mobile for visibility. Smaller changes such as font sizes, margins, and padding have also been done.
    2. Input types such as the text for the something cool tile and the colour picker would loook different based on the device/browser.

4. Interesting bugs:
    1. A lot of the issues had to do with how dynamically applied styling would not work on dynamically created elements (fadein, fadeout, popover, etc.). Most of the time adding the styling at the same time as creating the elements helped.
    2. Downloaded and locally stored JSONs didnt work for lottie after restarting my laptop and externakky linking to lottie files was the solution.
    3. There were many bugs that had to do with the appearing rocket, especially with how some rockets would suddenly accelerate/deccelerate despite the fixed intervals/distance. At the moment, it adds to the stylistic quality of the rocket.


## Credits

### Content
- All regex was done with the help of [regex101](https://regex101.com/)
- [This](https://stackoverflow.com/a/54569758) was the reference for any instance of:
```ruby
/*inverts hex (variable mainco)*/
Number(`0x1${mainco}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase() 
```

### API/RSS
- [APOD](https://github.com/nasa/apod-api) | Interesting media, updated daily
- [NeoW](https://api.nasa.gov/neo/?api_key=DEMO_KEY) | Nearby aesteroids for the current and next day
- [NASA images and video API](https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf) | A database of images, video, and audio from NASA
- [Space.com](https://www.space.com/feeds/all) with [Heroku proxy](https://www.heroku.com/) | RSS feed of space news and a proxy to bypass CORs

### Media
- The rocket, font, and colour scheme in the website logo is inspired by a [template](https://www.designevo.com/apps/logo/?name=red-tail-gas-and-black-rocket) and was recreated in photoshop and illustrator
- Something cool? [loading animation](https://lottiefiles.com/18360-space-travel)
- Something cool? [404 error animation](https://lottiefiles.com/4339-not-found)
- [Moving rocket](https://lottiefiles.com/5054-rocket), colours were modified
- [Shooting star](https://lottiefiles.com/5040-shooting-star), colours were modified
- Spacey news [error/loading animation](https://lottiefiles.com/36517-astronaut)
- NEOs [error/loading animation](https://lottiefiles.com/5040-shooting-star)

### Acknowledgements

- I received inspiration for this project from Reddit, space, and their grandeur and scale.
