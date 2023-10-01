# Funny Videos

Funny Videos is a simple Youtube video sharing app that is written as a test to apply to a developer.

## Features

- List all shared videos
- Allow to register new user account
- Logged in user can vote up or down on any videos
- Logged in user can share videos

## Tech

Funny Videos uses the following things:

- [ASP.NET Core 6] - Web APIs for backend!
- [ReactJS 18] - Create the client app.
- [Mobx 6](https://mobx.js.org/) - State managment framework.
- [MaterialUI 5](https://mui.com/material-ui/getting-started/) - a library of React UI components that implements Google's Material Design.
- [TypeScript] - a syntactic superset of JavaScript which adds static typing.

And of course Funny Videos itself is open source with a [public repository](https://github.com/vudh/video-sharing)
 on GitHub. You can clone it like this:
 ```sh
git clone https://github.com/vudh/video-sharing
```

## Installation

Funny Videos backend requires ASP.NET Core 6 to run. It is now storing data to Azure Table Storage so that you can update the `StorageConnectionString` of your own if you want.
If Visual Studio is available in your computer, you can start the backend before running the client app and it will be run at `https://localhost:7171`. If not, you can configure the `SERVER_URL` in the client app to use my deployed APIs here `https://videosharingapi.azurewebsites.net`.
You also can see available APIs at `https://videosharingapi.azurewebsites.net/swagger/index.html`.

Funny Videos client app requires [Node.js](https://nodejs.org/) v16+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd video-sharing/video-sharing-app
yarn
yarn start
```

Then it will be run in your default browser at `http://localhost:3000`.
By the way, I have published the docker image of the client app to Docker hub at `vudh/video-sharing-app:latest` so that you can pull to your local then run it as well.

## Usage

Funny Videos is now containing some videos that I have shared while testing. So, you will see them when starting the app at your local as the instructions above or you can start using it at `https://videosharingclient.azurewebsites.net/`.
You then should click `Register` button to register an account first then login with those information.
After that you can share some videos and vote up or down on any videos there.

## License

MIT

**Free Software, Hell Yeah!**
