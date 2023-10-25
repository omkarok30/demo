
export type Theme = 'dark' | 'light';

export type NavMode = 'inline' | 'horizontal';

export interface SettingsType {
  /**
   * Site name
   */
  siteTitle: string;

  /**
   * The key value of the Token stored locally on the site
   */
  siteTokenKey: string;

  /**
   * The Ajax request header sends the Key value of the Token
   */
  authHeaderTokenKey: string;

  /**
   * Ajax return value does not participate in the api address of unified verification
   */
  ajaxResponseNoVerifyUrl: string[];

  /**
   * Layout header is fixed open
   */
  headFixed: boolean;

  /**
   * Layout Template Theme
   */
  theme: Theme;

  /**
   * Layout left side is fixed open
   */
  leftSiderFixed: boolean;

  /**
   * StandardLayout tab menu opens
   */
  tabNavEnable: boolean;

  /**
   * StandardLayout tab menu home page locked path
   */
  tabNavHomePath: string;

  /**
   * StandardLayout menu navigation mode
   */
  navMode: NavMode;

  // Display Date Fromat
  displayDateFormat: string;

  // Display Date Time Fromat
  displayDateTimeFormat: string;
}
