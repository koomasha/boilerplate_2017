export default class Configuration {
public static host = 'localhost';
public static port = '8080';
public static protocol = 'http';
public static apiEndpoint = 'http://localhost:3000/api';
public static stateFBLogin = 'fbLogin';
public static fbLoginUrl = 'https://www.facebook.com/v2.11/dialog/oauth?scope=public_profile,email&client_id={{FB_APP_ID}}&redirect_uri=http://localhost:8080/&state=fbLogin';
public static googleLoginUrl = 'https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http%3A%2F%2Flocalhost%3A8080&client_id={{GOOGLE_APP_ID}}&response_type=code&scope=openid%20email&state=googleLogin';
public static stateGoogleLogin = 'googleLogin';
}
