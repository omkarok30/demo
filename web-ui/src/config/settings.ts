import { SettingsType } from '@/@types/settings.d';

const settings: SettingsType = {
  siteTitle: 'BlueNode',

  siteTokenKey: 'bluenode_token',
  authHeaderTokenKey: 'Authorization',
  ajaxResponseNoVerifyUrl: [
    '/user/login', // User login
    '/user/info', // Get user information
  ],

  /* The following are for all Layout extension fields */
  headFixed: true,
  theme: 'light',
  leftSiderFixed: true,

  /* The following are extension fields for StandardLayout */
  tabNavEnable: true,
  tabNavHomePath: '/home/workplace',
  navMode: 'inline',
  displayDateFormat: 'DD-MM-YYYY',
  displayDateTimeFormat: 'DD-MM-YYYY h:mm:ss a',
};

export default settings;
