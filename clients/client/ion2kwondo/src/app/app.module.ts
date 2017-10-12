import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, Nav,IonicErrorHandler,NavController } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { ChatPage } from '../pages/chat/chat';
import { ChatfotoPage } from '../pages/chatfoto/chatfoto';
import { HomePage } from '../pages/home/home';
import { TwitterPage } from '../pages/twitter/twitter';
import { PartnerworldPage } from '../pages/partnerworld/partnerworld';
import { LinkedinPage } from '../pages/linkedin/linkedin';
import { ContactsPage } from '../pages/contacts/contacts';
import { LoginPage } from '../pages/login/login';
import { BrowserPage } from '../pages/browser/browser';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';
import { AccountPage } from '../pages/account/account';
import { BpPage } from '../pages/bp/bp';
import { GarePage } from '../pages/gare/gare';
import { GaraPage } from '../pages/gara/gara';
import { EditgaraPage } from '../pages/editgara/editgara';
import { AtletiPage } from '../pages/atleti/atleti';
import { AtletaPage } from '../pages/atleta/atleta';
import { MatchconsolePage } from '../pages/matchconsole/matchconsole';
import { EventiPage } from '../pages/eventi/eventi';
import { SocietaPage } from '../pages/societa/societa';
import { StatsPage } from '../pages/stats/stats';
import { FiltersPage } from '../pages/filters/filters';
import { MatchesforatletaPage } from '../pages/matchesforatleta/matchesforatleta';
import { MedagliereglobalePage } from '../pages/medagliereglobale/medagliereglobale';
import { MapPage } from '../pages/map/map';

import { SocketService } from '../providers/socket-service/socket-service';
import { BackendProvider } from '../providers/backend/backend';
import { ScrollableTabs } from '../components/scrollable-tabs/scrollable-tabs';
import { UtilsProvider } from '../providers/utils/utils';
import { Badge } from '@ionic-native/badge';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { AppAvailability } from '@ionic-native/app-availability';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DeviceFeedback } from '@ionic-native/device-feedback';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { File, Entry } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { SocialSharing } from '@ionic-native/social-sharing';
import { IonicImageLoader } from 'ionic-image-loader';

import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { BackgroundMode } from '@ionic-native/background-mode';
import { FacebookProvider } from '../providers/facebook/facebook';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    PartnerworldPage,
    LinkedinPage,
    ContactsPage,
    ChatPage,
    ChatfotoPage,
    LoginPage,
    TabsPage,
    SettingsPage,
    AccountPage,
    TwitterPage,
    BrowserPage,
    BpPage,
    GarePage,
    AtletiPage,
    AtletaPage,
    EventiPage,
    GaraPage,
    EditgaraPage,
    SocietaPage,
    MatchesforatletaPage,
    MatchconsolePage,
    MapPage,
    StatsPage,
    FiltersPage,
    ScrollableTabs,
    MedagliereglobalePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    IonicImageLoader.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    ChatPage,
    ChatfotoPage,
    HomePage,
    PartnerworldPage,
    LinkedinPage,
    ContactsPage,
    LoginPage,
    TabsPage,
    AccountPage,
    SettingsPage,
    TwitterPage,
    BrowserPage,
    BpPage,
    GarePage,
    AtletiPage,
    AtletaPage,
    EventiPage,
    GaraPage,
    EditgaraPage,
    SocietaPage,
    StatsPage,
    FiltersPage,
    MatchesforatletaPage,
    MatchconsolePage,
    MapPage,
    MedagliereglobalePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
    SocketService,
    BackendProvider,
    UtilsProvider,
   /* Storage,*/
    SplashScreen,
    AppAvailability,
    DeviceFeedback,
    File,
    Camera,
    Transfer,
    SocialSharing,
    NativePageTransitions,
    LocalNotifications,
    BackgroundMode,
    TextToSpeech,


    
    
   

    Badge,
    FacebookProvider]
})
export class AppModule {}
