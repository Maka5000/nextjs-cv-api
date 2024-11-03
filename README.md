This project was created to make creation of my cv websites easier.

https://nextjs-cv-api.vercel.app

# Usage

### Users:
- `/api/users`- to get all user profiles with all info
    - `?userid`- *query to get user profile by user's id*
    - `?name`- *query to get user profile by user's name*


### Educations:
- `/api/educations`- to get all educations with all info
    - `?userid`- *query to get educations by user's id*
    - `?establishment` - *query to get educations by specified estanlishment*
    - `?program` -*query to get educations by specified program*
    - `?degree` - *query to get educations by specified degree*

### Skills:
- `/api/skills`- to get all skills with all info
    - `?userid`- query to get skills by user's id
    - `?name`- query to get skills by specified name
    - `?level`- query to get skills by specified level

### Projects:
- `/api/projects`- to get all projects with all info
    - `?userid`- query to get projects by user's id
    - `?name`- query to get projects by specified name

### Contacts:
- `/api/contacts`- to get all contacts with all info

    - `?userid`- query to get contacts by user's id
    - `?type`- query to get contacts by specified type
    - `?contact`- query to get contacts by specified contact

### Languages:
- `/api/languages`- to get all languages with all info
    - `?userid`- query to get languages by user's id
    - `?language`- query to get languages by specified language
    - `?level`- query to get lanugages by specified level

### Jobs:
- `/api/jobs`- to get all jobs with all info
    - `?userid`- query to get jobs by user's id
    - `?company`- query to get jobs by specified company
    - `?position`- query to get jobs by specified position
    - `?experience`- query to get jobs by specified experience