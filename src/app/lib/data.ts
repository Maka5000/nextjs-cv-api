import { sql } from "@vercel/postgres";
import {
  Contact,
  Education,
  Job,
  Language,
  Project,
  Skill,
  User,
} from "./definitions";
import { unstable_cache } from "next/cache";

export const fetchUsers = unstable_cache(
  async () => {
    try {
      const data = await sql<User>`SELECT id, name from users`;

      return data.rows;
    } catch (error) {
      console.error("Database Error: ", error);
      throw new Error("Failed to fetch users");
    }
  },
  [],
  { tags: ["users"] }
);

const ITEMS_PER_PAGE = 6;
export const fetchFilteredUsers = unstable_cache(
  async (query: string, currentPage: number) => {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    try {
      const data = await sql<User>`
      SELECT id, name 
      FROM users 
      WHERE 
        name LIKE ${`%${query}%`}
      ORDER BY id
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;

      return data.rows;
    } catch (error) {
      console.error("Database Error: ", error);
      throw new Error("Failed to fetch users");
    }
  },
  [],
  { tags: ["users"] }
);

export const fetchUserByID = unstable_cache(
  async (userid: string) => {
    try {
      const data = await sql<User>`SELECT * FROM users WHERE id = ${userid}`;
      return data.rows[0];
    } catch (error) {
      console.error("Database Error: ", error);
      throw new Error("Failed to fetch user by id");
    }
  },
  [],
  { tags: ["users"] }
);

export const fetchEducations = unstable_cache(
  async ({
    userid,
    establishment,
    program,
    degree,
  }: {
    userid?: string;
    establishment?: string;
    program?: string;
    degree?: string;
  } = {}) => {
    try {
      if (userid) {
        const data =
          await sql<Education>`SELECT * FROM educations WHERE user_id = ${userid}`;
        return data.rows;
      }

      if (establishment) {
        const data =
          await sql<Education>`SELECT * FROM educations WHERE establishment = ${establishment}`;
        return data.rows;
      }

      if (program) {
        const data =
          await sql<Education>`SELECT * FROM educations WHERE program = ${program}`;
        return data.rows;
      }

      if (degree) {
        const data =
          await sql<Education>`SELECT * FROM educations WHERE degree = ${degree}`;
        return data.rows;
      }

      const data = await sql<Education>`SELECT * FROM educations`;

      return data.rows;
    } catch (error) {
      console.error("Database Error: ", error);
      throw new Error("Failed to fetch educations");
    }
  },
  [],
  { tags: ["educations"] }
);

export const fetchSkills = unstable_cache(
  async ({
    userid,
    skillname,
    skillLevel,
  }: {
    userid?: string;
    skillname?: string;
    skillLevel?: string;
  } = {}) => {
    try {
      if (skillname) {
        const data =
          await sql<Skill>`SELECT * FROM skills WHERE name=${skillname}`;

        return data.rows;
      }

      if (skillLevel) {
        const data =
          await sql<Skill>`SELECT * FROM skills WHERE level=${skillLevel}`;

        return data.rows;
      }

      if (userid) {
        const data =
          await sql<Skill>`SELECT * FROM skills WHERE user_id = ${userid}`;
        return data.rows;
      }

      const data = await sql<Skill>`SELECT * FROM skills`;
      return data.rows;
    } catch (error) {
      console.error("Database Error: ", error);
      throw new Error("Failed to fetch skills");
    }
  },
  [],
  { tags: ["skills"] }
);

export const fetchProjects = unstable_cache(
  async ({
    userid,
    projectname,
  }: { userid?: string; projectname?: string } = {}) => {
    try {
      if (userid) {
        const data =
          await sql<Project>`SELECT * FROM projects WHERE user_id = ${userid}`;
        return data.rows;
      }

      if (projectname) {
        const data =
          await sql<Project>`SELECT * FROM projects WHERE name=${projectname}`;

        return data.rows;
      }

      const data = await sql<Project>`SELECT * FROM projects`;
      return data.rows;
    } catch (error) {
      console.error("Database Error: ", error);
      throw new Error("Failed to fetch projects");
    }
  },
  [],
  { tags: ["projects"] }
);

export const fetchContacts = unstable_cache(
  async (userid?: string) => {
    try {
      if (!userid) {
        const data = await sql<Contact>`SELECT * FROM contacts`;
        return data.rows;
      }

      const data =
        await sql<Contact>`SELECT * FROM contacts WHERE user_id = ${userid}`;
      return data.rows;
    } catch (error) {
      console.error("Database Error: ", error);
      throw new Error("Failed to fetch contacts");
    }
  },
  [],
  { tags: ["contacts"] }
);

export const fetchLanguages = unstable_cache(
  async ({
    userid,
    language,
    level,
  }: {
    userid?: string;
    language?: string;
    level?: string;
  } = {}) => {
    try {
      if (userid) {
        const data =
          await sql<Language>`SELECT * FROM languages WHERE user_id = ${userid}`;
        return data.rows;
      }

      if (language) {
        const data =
          await sql<Language>`SELECT * FROM languages WHERE language=${language}`;
        return data.rows;
      }

      if (level) {
        const data =
          await sql<Language>`SELECT * FROM languages WHERE level=${level}`;
        return data.rows;
      }

      const data = await sql<Language>`SELECT * FROM languages`;
      return data.rows;
    } catch (error) {
      console.error("Database Error: ", error);
      throw new Error("Failed to fetch contacts");
    }
  },
  [],
  { tags: ["languages"] }
);

export const fetchJobs = unstable_cache(
  async ({
    userid,
    company,
    position,
    experience,
  }: {
    userid?: string;
    company?: string;
    position?: string;
    experience?: string;
  } = {}) => {
    try {
      if (userid) {
        const data =
          await sql<Job>`SELECT * FROM jobs WHERE user_id = ${userid}`;
        return data.rows;
      }

      if (company) {
        const data =
          await sql<Job>`SELECT * FROM jobs WHERE company=${company}`;
        return data.rows;
      }

      if (position) {
        const data =
          await sql<Job>`SELECT * FROM jobs WHERE position=${position}`;
        return data.rows;
      }

      if (experience) {
        const data =
          await sql<Job>`SELECT * FROM jobs WHERE experience=${experience}`;
        return data.rows;
      }

      const data = await sql<Job>`SELECT * FROM jobs`;
      return data.rows;
    } catch (error) {
      console.error("Database Error: ", error);
      throw new Error("Failed to fetch jobs");
    }
  },
  [],
  { tags: ["jobs"] }
);

export const fetchCardData = unstable_cache(
  async () => {
    try {
      const usersCountPromise = sql`SELECT COUNT(*) FROM users`;
      const educationsCountPromise = sql`SELECT COUNT(*) FROM educations`;
      const skillsCountPromise = sql`SELECT COUNT(*) FROM skills`;
      const projectsCountPromise = sql`SELECT COUNT(*) FROM projects`;
      const contactsCountPromise = sql`SELECT COUNT(*) FROM contacts`;
      const jobsCountPromise = sql`SELECT COUNT(*) FROM jobs`;
      const langsCountPromise = sql`SELECT COUNT(*) FROM languages`;

      const data = await Promise.all([
        usersCountPromise,
        educationsCountPromise,
        skillsCountPromise,
        projectsCountPromise,
        contactsCountPromise,
        jobsCountPromise,
        langsCountPromise,
      ]);

      const numberOfUsers = Number(data[0].rows[0].count ?? "0");
      const numberOfEducations = Number(data[1].rows[0].count ?? "0");
      const numberOfSkills = Number(data[2].rows[0].count ?? "0");
      const numberOfProjects = Number(data[3].rows[0].count ?? "0");
      const numberOfContacts = Number(data[4].rows[0].count ?? "0");
      const numberOfJobs = Number(data[5].rows[0].count ?? "0");
      const numberOfLangs = Number(data[6].rows[0].count ?? "0");

      return [
        { name: "Users", count: numberOfUsers },
        { name: "Educations", count: numberOfEducations },
        { name: "Skills", count: numberOfSkills },
        { name: "Projects", count: numberOfProjects },
        { name: "Contacts", count: numberOfContacts },
        { name: "Jobs", count: numberOfJobs },
        { name: "Languages", count: numberOfLangs },
      ];
    } catch (error) {
      console.error(`Database Error: `, error);
      throw new Error("Failed to fetch table length");
    }
  },
  [],
  {
    tags: [
      "users",
      "educations",
      "skills",
      "projects",
      "contacts",
      "jobs",
      "languages",
    ],
  }
);

export const fetchApiUsers = unstable_cache(
  async ({ username, userid }: { username?: string; userid?: string } = {}) => {
    if (userid) {
      const users = await sql`
        SELECT u.*, 
          COALESCE(json_agg(DISTINCT e.*) FILTER(WHERE e.user_id IS NOT NULL), '[]') as educations,
          COALESCE(json_agg(DISTINCT s.*) FILTER(WHERE s.user_id IS NOT NULL), '[]') as skills,
          COALESCE(json_agg(DISTINCT p.*) FILTER(WHERE p.user_id IS NOT NULL), '[]') as projects,
          COALESCE(json_agg(DISTINCT c.*) FILTER(WHERE c.user_id IS NOT NULL), '[]') as contacts,
          COALESCE(json_agg(DISTINCT l.*) FILTER(WHERE l.user_id IS NOT NULL), '[]') as languages,
          COALESCE(json_agg(DISTINCT j.*) FILTER(WHERE j.user_id IS NOT NULL), '[]') as jobs
        FROM users AS u
          FULL JOIN educations AS e ON u.id=e.user_id
          FULL JOIN skills AS s ON u.id=s.user_id
          FULL JOIN projects AS p ON u.id=p.user_id
          FULL JOIN contacts AS c ON u.id=c.user_id
          FULL JOIN languages AS l ON u.id=l.user_id
          FULL JOIN jobs AS j ON u.id=j.user_id
        WHERE u.id=${userid}
        GROUP BY u.id`;

      return users.rows;
    }

    if (username) {
      const users = await sql`
        SELECT u.*, 
          COALESCE(json_agg(DISTINCT e.*) FILTER(WHERE e.user_id IS NOT NULL), '[]') as educations,
          COALESCE(json_agg(DISTINCT s.*) FILTER(WHERE s.user_id IS NOT NULL), '[]') as skills,
          COALESCE(json_agg(DISTINCT p.*) FILTER(WHERE p.user_id IS NOT NULL), '[]') as projects,
          COALESCE(json_agg(DISTINCT c.*) FILTER(WHERE c.user_id IS NOT NULL), '[]') as contacts,
          COALESCE(json_agg(DISTINCT l.*) FILTER(WHERE l.user_id IS NOT NULL), '[]') as languages,
          COALESCE(json_agg(DISTINCT j.*) FILTER(WHERE j.user_id IS NOT NULL), '[]') as jobs
        FROM users AS u
          FULL JOIN educations AS e ON u.id=e.user_id
          FULL JOIN skills AS s ON u.id=s.user_id
          FULL JOIN projects AS p ON u.id=p.user_id
          FULL JOIN contacts AS c ON u.id=c.user_id
          FULL JOIN languages AS l ON u.id=l.user_id
          FULL JOIN jobs AS j ON u.id=j.user_id
        WHERE u.name=${username}
        GROUP BY u.id`;

      return users.rows;
    }

    const users = await sql`
      SELECT u.*, 
        COALESCE(json_agg(DISTINCT e.*) FILTER(WHERE e.user_id IS NOT NULL), '[]') as educations,
        COALESCE(json_agg(DISTINCT s.*) FILTER(WHERE s.user_id IS NOT NULL), '[]') as skills,
        COALESCE(json_agg(DISTINCT p.*) FILTER(WHERE p.user_id IS NOT NULL), '[]') as projects,
        COALESCE(json_agg(DISTINCT c.*) FILTER(WHERE c.user_id IS NOT NULL), '[]') as contacts,
        COALESCE(json_agg(DISTINCT l.*) FILTER(WHERE l.user_id IS NOT NULL), '[]') as languages,
        COALESCE(json_agg(DISTINCT j.*) FILTER(WHERE j.user_id IS NOT NULL), '[]') as jobs
      FROM users AS u
        FULL JOIN educations AS e ON u.id=e.user_id
        FULL JOIN skills AS s ON u.id=s.user_id
        FULL JOIN projects AS p ON u.id=p.user_id
        FULL JOIN contacts AS c ON u.id=c.user_id
        FULL JOIN languages AS l ON u.id=l.user_id
        FULL JOIN jobs AS j ON u.id=j.user_id
      GROUP BY u.id`;

    return users.rows;
  },
  [],
  {
    tags: [
      "users",
      "educations",
      "skills",
      "projects",
      "contacts",
      "languages",
      "jobs",
    ],
  }
);
