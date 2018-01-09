// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  api_url: `http://localhost:8080/`,
};

export const outlookEnvironment = {
  authEndpoint: `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?`,
  redirectUri: `http://localhost:4200/`,
  appId: `b10936d8-f54e-45e2-86a1-9a1a41b23203`,
  scopes: `openid profile User.Read Mail.Read Mail.Send`,
  appSecret: `lqogiHFBREU232_qjC33*)|`
};
