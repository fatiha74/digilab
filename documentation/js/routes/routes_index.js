var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"routes","filename":"src/app/app-routing.module.ts","module":"AppRoutingModule","children":[{"path":"","component":"LoginComponent"},{"path":"login","component":"LoginComponent"},{"path":"register","component":"RegisterComponent"},{"path":"finder","component":"FinderComponent","canActivate":["AuthGuard"]},{"path":"overview","component":"OverviewComponent","canActivate":["AuthGuard"],"children":[{"path":"directory","component":"DirectoryComponent","canActivate":["AuthGuard"]},{"path":"chat","component":"ChatComponent","canActivate":["AuthGuard"]},{"path":"profil","component":"ProfilComponent","canActivate":["AuthGuard"]}]}],"kind":"module"}]}