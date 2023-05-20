# Sessions NextJS Application
## How to start
```sh
npm i
node run dev
```
Navigate to localhost:3000
## Design Choices
- In api/sessions/route.js:18, I have to use URLSearchParams because req.query was always undefined. This might probably be a bug with NextJS.
- I decided to add a none option, so user can reset the data.
- Select was chosen to simplify the query, but it means user cannot query multiple value of short_title or status. This could be a potential improvement.
- I chose NextJS version 13 because this is also an opportunity for me to learn what's new in NextjS. Initially I wanted to use Express and React because of familiarity, but that means I'm not goning to learn anything new.
## Live demo
[Vercel deployment](https://sessions-3cef.vercel.app/)

