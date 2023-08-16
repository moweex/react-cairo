## Installation

- Assuming your terminal respond on `pwd` command by route ending in `/web`
- Run `yarn install`
- Create a `.env` file and fill the variables with the following
  - DATO CMS: use this template [clone our template](https://dashboard.datocms.com/clone?projectId=105198&name=React%20Cairo%20Template)
  - supabase DB: [supabase](https://supabase.com/docs)
    - use `schema.sql` from `web/lib/db-providers/supabase/schema.sql` to create tables
  - in table events, insert a new row and save the generated id
  - add security policies to allow reading/inserting/deleting in tables that needs it
  - [OPTIONAL] [Browserless](https://www.browserless.io/): to enable ticket image screenshot on async headers
  - [OPTIONAL] SMTP server of your own to send emails
- Fill the required env variables
- Run `yarn dev`, app should be now running on localhost:3000 if you filled CMS content correctly.