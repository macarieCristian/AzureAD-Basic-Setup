/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */
import {LogLevel, BrowserCacheLocation, Configuration} from "@azure/msal-browser";

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

export const msalConfig: Configuration = {
  auth: {
    clientId: '3131e057-40fc-4c4d-8ba7-b72a70c57120', // This is the ONLY mandatory field that you need to supply.
    authority: 'https://login.microsoftonline.com/044d79d1-306e-473b-888b-54fb76758585', // Defaults to "https://login.microsoftonline.com/common"
    redirectUri: '/', // Points to window.location.origin. You must register this URI on Azure portal/App Registration.
    postLogoutRedirectUri: '/', // Indicates the page to navigate after logout.
    navigateToLoginRequestUrl: true, // If "true", will navigate back to the original request location before processing the auth code response.
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage, // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    storeAuthStateInCookie: isIE, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback(logLevel: LogLevel, message: string) {
        console.log(message);
      },
      logLevel: LogLevel.Info,
      piiLoggingEnabled: false
    }
  }
}
