import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GuardedComponent} from "./guarded/guarded.component";
import {MsalGuard} from "@azure/msal-angular";
import {HomeComponent} from "./home/home.component";
import {BrowserUtils} from "@azure/msal-browser";
import {ProfileComponent} from "./profile/profile.component";

/**
 * MSAL Angular can protect routes in your application
 * using MsalGuard. For more info, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/initialization.md#secure-the-routes-in-your-application
 */
const routes: Routes = [
  {path: 'guarded', component: GuardedComponent, canActivate: [MsalGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [MsalGuard]},
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // Don't perform initial navigation in iframes or popups
    initialNavigation: !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup() ? 'enabled' : 'disabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
