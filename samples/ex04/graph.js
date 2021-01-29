
//ログイン済ユーザーのプロファイル情報を取得
function getUserProfile(){
    //ログイン済ユーザーアカウントのプロファイル情報を取得する Graph API のエンドポイント
    const endpoint_GraphAPI = 'https://graph.microsoft.com/v1.0/me';
    //セッションストレージからアクセストークンを取得
    const accessToken =  sessionStorage.getItem('accessToken');
    callGraphAPI(endpoint_GraphAPI,accessToken,showPropertyName_and_Value);
}

//HTTP リクエストを送信
function callGraphAPI(endpoint, token, callback) {
    const headers = new Headers();
    //Authorization ヘッダーに Bearer + アクセス Token で API にアクセス
    const bearer = `Bearer ${token}`;

    headers.append('Authorization', bearer);

    const options = {
        method: 'GET',
        headers: headers
    };

    console.log('request made to Graph API at: ' + new Date().toString());

    fetch(endpoint, options)
        .then(response => response.json())
        .then(response => callback(response))
        .catch(error => console.log(error))
}

/*演習 4-4 ステップ 4 でここにコードを追加*/
function sendFile(uploadFile,token) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        //PUT が成功した場合の HTTP ステータスは 200　でなくて 201 Created を返します。
        if (xmlhttp.readyState == 4 && xmlhttp.status == 201) {
            showItem(xmlhttp.responseText);
        }
    };
    xmlhttp.open('PUT', uploadFile.endpoint, true);
    xmlhttp.setRequestHeader('Authorization', 'Bearer ' + token);
    xmlhttp.setRequestHeader('Content-Type', uploadFile.contentType);
    xmlhttp.send(uploadFile.file);
}