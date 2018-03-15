export default class Templates {
 public static loginForm = `<form class="login-form">
    <input required type="email" placeholder="Email" class="user-email border" autocomplete="email" data-lpignore="true"/>
    <input required type="password" placeholder="Password" class="user-password border" autocomplete="current-password" data-lpignore="true"/>
    <button type="button" class="login-btn info-btn border">Login</button>
    <span class="link title signup-link clickable">Sign Up</span>
</form>`;
public static loginFrame = `<div class="login">
    <div class="container-wrapper">
        <div class="container">
            <div class="logo-img"><img src="/img/logo.png" /></div>
            <div class="form"></div>
            <div class="social"></div>
        </div>
    </div>
</div>`;
public static signupForm = `<form class="signup-form">
    <input required type="text" placeholder="First name" class="user-firstname border" autocomplete="name" data-lpignore="true"/>
    <input required type="text" placeholder="Last name" class="user-lastname border" autocomplete="last-name" data-lpignore="true"/>
    <input required type="email" placeholder="Email" class="user-email border" autocomplete="email" data-lpignore="true"/>
    <input required type="password" placeholder="Password" class="user-password border" autocomplete="current-password" data-lpignore="true"/>
    <button type="button" class="signup-btn save-btn border">Sign up</button>
    <span class="link title login-link clickable">Login</span>
</form>`;
public static socialLogin = `<div class="social-login">
    <a href="{{fbLoginUrl}}"><img class="icon clickable fb-login" title="Login with facebook account" src="/img/icons/facebook.svg" /></a>
    <a href={{googleLoginUrl}}><img class="icon clickable google-login" title="Login with google account" src="/img/icons/google.svg" /></a>
</div>`;
public static datePicker = `<div class="overlay">
    <div class="datepicker">
        <div class="container">
            <div class="header">
                <img class="prev-week icon  clickable" title="Previous week" src="/img/icons/prev.svg">
                <div>{{title}}</div>
                <img class="next-week icon  clickable" title="Next week" src="/img/icons/next.svg">
            </div>
            <div class="content">
                <div class="week-header">
                    <div>{{firstDay}}</div>
                    <div>{{secondDay}}</div>
                    <div>{{thirdDay}}</div>
                    <div>{{fourthDay}}</div>
                    <div>{{fifthDay}}</div>
                    <div>{{sixthDay}}</div>
                    <div>{{seventhDay}}</div>
                </div>
                <div class="dates">
                    <div class="clickable date"></div>
                    <div class="clickable date"></div>
                    <div class="clickable date"></div>
                    <div class="clickable date"></div>
                    <div class="clickable date"></div>
                    <div class="clickable date"></div>
                    <div class="clickable date"></div>
                    <div class="clickable date"></div>
                    <div class="clickable date"></div>
                    <div class="clickable date"></div>
                    <div class="clickable date"></div>
                    <div class="clickable date"></div>
                    <div class="clickable date"></div>
                    <div class="clickable date"></div>
                    <div class="clickable date"></div>
                    <div class="clickable date"></div>
                    <div class="clickable date"></div>
                    <div class="clickable date"></div>
                    <div class="clickable date"></div>
                    <div class="clickable date"></div>
                    <div class="clickable date"></div>
                    <div class="clickable date"></div>
                    <div class="clickable date"></div>
                    <div class="clickable date"></div>
                    <div class="clickable date"></div>
                    <div class="clickable date"></div>
                    <div class="clickable date"></div>
                    <div class="clickable date"></div>
                    <div class="clickable date"></div>
                    <div class="clickable date"></div>
                    <div class="clickable date"></div>
                    <div class="clickable date"></div>
                    <div class="clickable date"></div>
                    <div class="clickable date"></div>
                    <div class="clickable date"></div>
                </div>
            </div>
        </div>
    </div>
</div>`;
public static errorBox = `<div class="error-box">
    <img class="icon close  clickable" title="Close" src="/img/icons/close.svg">
    <div class="error-text"></div>
</div>`;
public static navigation = `<div class="navigation-container">
    <div class="navigation">
        <img class="icon clickable" title="Account" src="/img/icons/user.svg" />
        <div class="header"><span class="title">Hello {{firstName}}</span></div>
    </div>
    <div class="error-box-container"></div>
</div>`;
public static root = `<div class="root"></div>`;
public static getTemplate(template) {
		return this[template];
	}
}
