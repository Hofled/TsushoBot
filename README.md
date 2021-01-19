# TsushoBot
A Discord.js based Discord chat bot. 🤖

---

* [Setting up a Test Environment](#setting-up-a-test-environment)
* [Running/Debugging the project](#running-debugging-the-project)
* [Adding a new command](#adding-a-new-command)

---


## Setting Up A Test Environment
1. Create a Discord server which will serve as your test server
    * Click Add a Server at the very bottom of your Discord server list panel  
    ![Add a Server](https://i.imgur.com/s9qjR44.png)
    * Click on Create My Own  
    ![Create My Own](https://i.imgur.com/jhpu1mr.png)
    * Give it a name and press Create
2. Generate an Auth Token for your bot user
    * Go to the [Discord Developer Portal](https://discord.com/developers/applications/) and press New Application  
    ![New Application](https://i.imgur.com/2154sWK.png)
    * Give it a name and press Create
    * Go to the Bot tab in the Side Panel, press Add Bot and confirm by clicking on Yes, do it!  
    ![Add Bot](https://i.imgur.com/zqc2Gd1.png)
    * Navigate to the OAuth2 tab in the Side Panel and select bot in the Scopes section. Scroll down and select the desired permissions for the bot user - the example ones as shown on the picture attached below should suffice.  
    ![Scopes and Permissions](https://i.imgur.com/vd6DCzt.png)
    * Copy the generated link from the Scopes section and paste it in your browser of choice. Select your test server as the server you want to add the bot user to and press Continue.  
    ![Adding the bot to a server](https://i.imgur.com/vj2hqu9.png)
    * Go back to the Bot tab in the Side Panel and click Copy under the Token section - this is needed in the next step.  
    ![Copying the Token](https://i.imgur.com/veMUjWk.png)
3. Set up the project locally
    * Fork this repository on GitHub and clone it to somewhere on your computer
    * Navigate to the project's folder in the command line
    * Check out to a new branch
    * Install the required dependencies by running ```npm i```
    * This will automatically run the ```db:migrate``` task for you upon finishing the installation, or you can run it manually:
      * To setup a local sqlite3 database file, run ```npm run db:migrate```
    * Execute ```npm run cloneEnv``` - this will create a new ```.env``` file
    * If you wish to overwrite the existing ```.env``` (**not recommended**), execute ```npm run cloneEnv -- --force```
    * Check the contents of ```.env``` for more details on feature configuration
    * Inside of the ```.env``` file, update the ```TOKEN``` variable and set it to the Token you copied from your Bot page, e.g. ```TOKEN=YOURTOKENGOESHERE```
    * Run tests with ```npm test```
    * The project should be functional at this point. refer to [this steps](#running-debugging-the-project) in order to run\debug it - if you get any errors, you probably skipped a step.

---

## <a id="running-debugging-the-project"></a> Running/Debugging the project
In order to run the project, it requires getting compiled first from Typescript to Javascript.

Run `npm run build:src` in order to compile the src Typescript project.
To then run the project, you can run `npm start`.

In order to debug the project, in VS code go to Run (Default keyboard shortcut: Ctrl+Shift+D), then at the top choose "Launch Program" and click the green triangle (Start Debugging).
Not that you need to place your breakpoints in your source code (Typescript/Javascript) in the `src` folder, and **not** the `dist` folder.

---

## Adding A New Command

1. Create a new file under the `commands` directory:

```
/ commands
  |- your_command.js
```

2. Add a command template

```js
const embedService = require("../services/embedService");

const embedMessage = (msg, args, options) => {
  /*
  |--------------------------------------------------------------------------
  | Command logic
  |--------------------------------------------------------------------------
  | 
  | Use this template if your command embeds a message
  | 
  */

  // @see: https://leovoel.github.io/embed-visualizer/
  // You can change the color accent by passing:
  //  color: your_color_value_decimal
  // @see: https://convertingcolors.com/
  return embedService.embed(msg, args, {
    description:  "Embed description contents",
  });
};

module.exports = {
  name: "!your_command",
  description: "Your command description",
  execute(msg, args, options = {}) {
    // You can also pass constants only as options.constants
    embedMessage(msg, args, options);
  },
};

```