/**
* 作成時に MSAL インスタンスに渡される構成オブジェクト 
* MSAL.js設定パラメータの完全なリストについては:
* https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
*/
const msalConfig = {
    auth: {
        clientId: "%AADクライアントIDを記述%",
        authority: "https://login.microsoftonline.com/common",
        redirectUri: "http://localhost:8080/index.html",
    },
    cache: {
        cacheLocation: "sessionStorage", // キャッシュを保存する場所を構成
        storeAuthStateInCookie: false, // IE11 または Edge で問題が発生する場合は、この値を "true" に設定
    },
    system: {	
        loggerOptions: {	
            loggerCallback: (level, message, containsPii) => {	
                if (containsPii) {		
                    return;		
                }		
                switch (level) {		
                    case msal.LogLevel.Error:		
                        console.error(message);		
                        return;		
                    case msal.LogLevel.Info:		
                        console.info(message);		
                        return;		
                    case msal.LogLevel.Verbose:		
                        console.debug(message);		
                        return;		
                    case msal.LogLevel.Warning:		
                        console.warn(message);		
                        return;		
                }	
            }	
        }	
    }
};

// メインの myMSALObj インスタンスを生成
const myMSALObj = new msal.PublicClientApplication(msalConfig);
let username = "";

/**
* ここに追加したスコープは、サインイン時にユーザーの同意を求めます.
* 既定では MSAL.js は OIDC スコープ (openid, profile, email) をすべてのログインリクエストに追加します.
* OIDC スコープの詳細については、: 
* https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
*/
const loginRequest = {
    scopes: ["User.Read"]
};

/**
* MS Graph API のアクセス トークンを取得するときに要求するスコープをここに追加します。詳細については:
* https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
*/
const tokenRequest = {
    scopes: ["User.Read"],
    forceRefresh: false // キャッシュされたトークンをスキップし、サーバーに移動して新しいトークンを取得するには、これを "true" に設定します
};

function selectAccount() {
/**
* アカウント検索の詳細はこちらをご覧ください。: 
* https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
 */

    const currentAccounts = myMSALObj.getAllAccounts();
    if (currentAccounts.length === 0) {
        return;
    } else if (currentAccounts.length > 1) {
        // Add choose account code here
        console.warn("Multiple accounts detected.");
    } else if (currentAccounts.length === 1) {
        username = currentAccounts[0].username;
    }
}

function handleResponse(response) {
/**
 * レスポンスオブジェクトのプロパティの完全なリストは:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#response
 */
    if (response !== null) {
        let accoutInfo = response.account;
        username = accoutInfo.username;
        //ログイン済ユーザー情報を表示
        showPropertyName_and_Value(accoutInfo);
        //画面の表示を切り替える
        flip_flopDisplay(logOnButton, loginedArea);

        /* このコメントを演習 2-2 手順 3 のコードと置き換えます */  

    } else {
        selectAccount();
    }
}

function logon() {
/**
 * 以下にカスタムリクエストオブジェクトを渡すことができます。これにより、初期設定が上書きされます。詳細はこちらをご覧ください。:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
 */
    myMSALObj.loginPopup(loginRequest)
    .then(handleResponse)
    .catch(error => {
        console.error(error);
    });
}

function logoff() {
/**
 * 以下にカスタムリクエストオブジェクトを渡すことができます。これは初期設定を上書きします。詳細については、以下を参照してください:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
 */

    //ログアウトするアカウントを選択します。
    const logoutRequest = {
        account: myMSALObj.getAccountByUsername(username)
    };
    myMSALObj.logout(logoutRequest);
}