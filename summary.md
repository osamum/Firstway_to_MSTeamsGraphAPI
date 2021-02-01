# まとめ

このハンズオンは Microsoft Graph API を使用して Microsoft Teams を操作を行う初学者向けの入門用チュートリアルとして作成しました。

基本となる Graph API の呼び出しから、Graph Explorer の使用方法、Teams の構造を把握していただく目的て、Teams のチームチャネルにファイルが添付されたメッセージを投稿するという機能の実装を題材としました。

この機能を実装するだけでも、以下のようなけっこう数の処理が必要になることがご理解いただけたと思います。

\[準備\]

- Azure Active Directory へのアプリケーションの登録
    - 必要なアクセス許可の設定
    - クライアント ID の取得

- Teams のチーム ID や、チャネル ID の取得
    - 入手した ID を使用したファイルアップロードパスの生成と、メッセージ送信用エンドポイントの生成

\[メッセージ投稿時のアプリケーションの処理\]

1. Azure Active Directory へのログイン 

2. アクセストークンの取得

3. Teams のチャネルに紐づいた SharePoint サイトへのファイルのアップロード

    - 生成しておいた Graph API のエンドポイントへ PUT

4. アップロード完了の際に返された情報よりダウンロードパスなどを取得

5. メッセージ用 JSON の attachments で使用する GUID の生成

6. アップロード済のファイルパスや GUID を使用してメッセージ用 JSON を生成

7. メッセージ用 JSON を送信

    - 生成しておいた Graph API のエンドポイントへ PUT


このハンズオンでは Single Page Application (SPA) を使用ましたが、他の開発言語でも、Azure Active Directory へのアプリケーションの登録の方法に若干の違いはあるものの、アクセストークンを入手した以降の処理は同じです。

他の開発言語で開発されている方は以下のリンク先のドキュメントの内容を参考に今回の内容を応用いただければと思います。

- [Android](https://docs.microsoft.com/ja-jp/azure/active-directory/develop/tutorial-v2-android)
- [iOS と MacOS](https://docs.microsoft.com/ja-jp/azure/active-directory/develop/tutorial-v2-ios)
- [Windows プラットフォーム(UWP)](https://docs.microsoft.com/ja-jp/azure/active-directory/develop/tutorial-v2-windows-uwp)
- [Windows デスクトップ アプリ(.NET)](https://docs.microsoft.com/ja-jp/azure/active-directory/develop/tutorial-v2-windows-desktop)


## さいごに

Microsoft Graph API の公式ドキュメントの内容はいささか断片的な部分があり、公開されている情報が充分でなく、すぐには使用できないことがあります。

とくに Microsoft Teams の API については、チャネルなどの ID 関連は説明がないので、初学者は使い始めるまでに非常に困難が伴うと思われます。

もし、このハンズオンをお使いいただき、無事に最後まで演習を動かすことができましたら、ぜひ他の方にもご紹介くたぜさいませ。

その他、Twitter で開発に役立つことをツイートしておりますので、ぜひ[アカウント](https://twitter.com/osamum_MS)もよろしくお願いいたします。