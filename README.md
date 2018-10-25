Project start for a:

-first-class PWA,

-webpack:

  -react,
  -bable,
  -fe devserv,
  -production build,
  -git,
  -bootstrapped,
  -jest testing

enabled set up


$ npm run fedevserv -> 'to get webpack mini server for dev'

$ npm run start -> 'to run node server for production client build'

$ npm run build -> 'to build the production client'



Development set up:(on dev branch)

-frontend development: $ npm run fedevserv

-backend development: $ npm run start, $ nodemon


Production set up:(on prod branch)

-merge in develop branch

-make sure "/build" is not in ".gitignore"

-$ npm run build

-double check build was updated and is tracked by git (colors in editor)

-add/commit with new "build" and "ready for deploy to heroku"

-$ git push heroku prod:master


Design notes:
-something water splooshing background, reacting to mobile device movement or mouse hover is really really really really important. find something that could likely work easily, but go for the gold. it's something really cool,
shows off your design skills, IMEDIATELY is an amazing thing. (optional slosh and dripping sounds???)
-check mobile simple UX/UI and workflow after ship selection

Development notes:
-serviceWorker needs to update app more regularly
