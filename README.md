# ⚠️ This project has been archived ⚠️
# Host a Refugee

Host a refugee aims to be a small mobile friendly web app that allows people to sign up as either a host (hosts the refugee) or refugee (the hosted) and then matches these two entities based on specific parameters and regions. This information will then be shared with local immigration / refugee service agencies to aid in efficiently pairing potential hosts and refugees and begin the required background checks and immigration paperwork.

<br>

# Table of Contents

<p>
  <a href="#getting-started"><strong>Getting Started</strong></a>
  <br>
  <a href="#resources"><strong>Resources</strong></a>
  <br>
  <a href="#getting-help"><strong>Getting Help</strong></a>
  <br>
  <a href="#project-management"><strong>Project Management</strong></a>
</p>

<br>

# Getting Started

1. Clone this repo and install the dependencies

```bash
git clone https://github.com/Ukraine-Relief-Efforts/host-a-refugee.git
```

2. Install dependencies

```bash
cd host-a-refugee
npm install
```

3. Contact SethMcKilla on Discord (SethMcKilla#2242) for a set of the development environment variables (.env.local file) to be added to the root directory of the project.

4. Run the local developement environment

```bash
npm run dev
```

5. Open the browser and navigate to http://localhost:3000 and you should see the application running. NextJS utilizes Fast Refresh so whenever you save a file in your IDE the local application will automatically update.

<br>

# Resources

- [NextJS Documentation](https://nextjs.org/docs) - Fullstack React framework
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - A strict syntactical superset of JavaScript
- [Mantine Documentation](https://mantine.dev/pages/basics/) - A fully featured React components library

<br>

# Getting Help

If you run into any issues, the best place to get help is in the [Tech for Ukraine Discord](https://discord.gg/zMNBZwePnw) #Host-a-Refugee channel. This is our main communication hub and we're more than happy to help!

<br>

# Project Management

Refer to the [GitHub Project Board](https://github.com/orgs/Ukraine-Relief-Efforts/projects/1/views/5) for the current list of to-do items. All items prefixed with [MVP] are the most critical items to finish before launching the Minimum Viable Product, so please prioritize those.

We are utilizing the simple GitHub Flow for this project when implementing new features or fixes. All work is to be done on a separate branch prefixed with either "feature/" or "fix/".

![GitHub Flow Diagram](https://user-images.githubusercontent.com/6351798/48032310-63842400-e114-11e8-8db0-06dc0504dcb5.png)

Whenever you are done with your work, create a pull request (PR) and either request a review from others within the organization directly on GitHub and/or ping the Discord to make others aware of the PR. Along with a brief description of what the pull request is for, please make sure to explicitly include which issues are being resolved in the following format:

> Closes #30

GitHub will automatically link this PR to the issue within the project board and move it to the "done" column once it is accepted and merged with the main branch.

## We can't thank you enough for donating your precious time to this cause 💗 🙏
