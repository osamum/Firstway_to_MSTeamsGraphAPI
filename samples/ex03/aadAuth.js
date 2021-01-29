const msalConfig = {
    auth: {
        clientId: "5b5a9f1c-071b-4510-b4c7-6193de642e73",
        authority: "https://login.microsoftonline.com/common",
        redirectUri: "http://localhost:8080/index.html",
    },
    cache: {
        cacheLocation: "sessionStorage", // キャッシュの保存先を設定
        storeAuthStateInCookie: false, // IE11またはEdgeで問題が発生する場合は、これを "true "に設定
    }
};

//MSAL の UserAgentApplication インスタンスを生成
const myMSALObj = new Msal.UserAgentApplication(msalConfig);

// MS Identity Platform エンドポイントで使用する id トークンのスコープの指定
const loginRequest = {
    scopes: ["openid", "profile", "User.Read"]
};

function logon() {
    //ログイン ポップアップを表示する
    myMSALObj.loginPopup(loginRequest)
        .then(loginResponse => {
            console.log(loginResponse);
            let accoutInfo = myMSALObj.getAccount();
            //ログインに成功していればアカウントの情報が返る
            if (accoutInfo) {
                showItem(accoutInfo.name);
                showItem(accoutInfo.userName);
                flip_flopDisplay(logOnButton, loginedArea);
                //アクセス Token を取得する
                getAccessToken(loginRequest)
                    .then(response => {
                        showItem(`Bearer ${response.accessToken}`);//←の記述はセキュリティを考慮し、演習が終わったら削除します
                        //取得したトークンをセッションストレージに保持
                        sessionStorage.setItem('accessToken', response.accessToken);
                    });
            }
        }).catch(error => {
            showItem('エラー : ' + error);
        });
}


function logoff() {
    myMSALObj.logout();
    flip_flopDisplay(logOnButton, loginedArea);
}


function getAccessToken(request) {
    return myMSALObj.acquireTokenSilent(request)
        .catch(error => {
            console.log(error);
            console.log("サイレントトークンの取得に失敗しました。 acquiring token using popup");

            // サイレントトークンの取得に失敗した場合のインタラクションへのフォールバック
            return myMSALObj.acquireTokenPopup(request)
                .then(tokenResponse => {
                    return tokenResponse;
                }).catch(error => {
                    console.log(error);
                });
        });
}
