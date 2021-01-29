# Microsoft Graph API を使用するための簡易チュートリアル

## 概要
このチュートリアルは、開発者が初めて [Microsoft Graph API](https://docs.microsoft.com/ja-jp/graph/overview) を使用する際の学習期間の短縮を目的としています。

Microsoft Graph API は Office 365 のような Microsoft 365 に含まれるさまざまサービスを、アプリケーションのリソースとして利用するための仕組みを提供します。

しかしながら Microsoft Graph API はただ書式に従いコードを記述すれば動作するようなものではなく、多くの場合、それを利用するアプリケーションを [Azure Active Directory](https://docs.microsoft.com/ja-jp/azure/active-directory/fundamentals/active-directory-whatis) に登録し、認証処理を行い、そこで得られたアクセストークンを設定しなければ使用することができません。

また、Microsoft Graph API の処理対象となる Microsoft 365 リソースの構成の理解も必要です。

こうした初学者が躓きがちな点を、実際に開発作業をしながら解説を行います。

## このハンズオンで説明するもの

このハンズオンでは Microsoft Graph API を使用する以下の 2 の機能を持つ SPA (Single Page Application)を作成します。

- OneDrive へのファイル投稿
- Microsoft Teams のチャネルへのファイルの投稿

上記 2 つの機能の開発を通して以下を説明します。

1. AAD (Azure Active Directory) へのアプリケーションの登録
2. AAD を使用したログイン機能の実装とアクセストークンの取得
3. [Graph Explorer](https://developer.microsoft.com/ja-jp/graph/graph-explorer) を使用した API のテストと Microsoft 365 リソースの確認方法

## 要件
このチュートリアルを実施するには以下の環境が必要です。

* **Microsoft Office 365 Business Premium 以上の[ライセンス](https://products.office.com/ja-JP/compare-all-microsoft-office-products-b?tab=2)**

    ライセンスを持っていない開発者は [Office 365 開発者プログラム](https://developer.microsoft.com/ja-JP/office/dev-program
)に参加して開発者用の無料の Office 365 のサブスクリプションを入手することもできます。このサブスクリプションでは [Office 365 Enterprise E3 Developer](https://docs.microsoft.com/ja-jp/office/developer-program/office-365-developer-program-get-started) が 1 年間無償で使用することができます。

* **[Node.js](https://nodejs.org/ja/)**

    Node.js インストール後、ローカル環境で Web サーバーを動かすために以下のコマンドを使用して http-server をインストールしてください。

    ```
    npm install http-server -g
    ```

* **[Visual Studio Code](https://code.visualstudio.com/Download)**

## 目次
1. [AAD (Azure Active Directory) へのアプリケーションの登録](Ex01.md)
2. [MSAL.js を使用したログイン処理の実装](Ex02.md)
3. [Graph API を使用したログイン済ユーザーのプロファイル情報の取得](Ex03.md)
4. [Graph API を使用した OneDrive へのファイルの投稿](Ex04.md)
    - AAD へのアクセス権の追加
    - Postman を使用したテスト
    - OneDrive へのファイルの投稿機能の実装
5. [Microsoft Teams チャネルへのファイルの投稿](Ex05.md)
    - [Graph Explorer](https://developer.microsoft.com/ja-jp/graph/graph-explorer) を使用した投稿先情報の取得
    - AAD へのアクセス権の追加
    - Teams チャネルへのファイルの投稿機能の実装

## デスクトップアプリケーション/ネイティブアプリについて

このチュートリアルでは SPA (Single Page Application :　Web ブラウザー内で動作するアプリケーション) を使用しており、デスクトップアプリケーションやネイティブアプリについては説明しません。

ただし、①アプリケーションを AAD に登録し、②AAD にサインインし、③取得したアクセストークンを使用して Graph API と呼び出す、という大まかな手順は変わることはありません。

ただし、AAD へのアプリケーションの登録内容、コードの記述方法は異なりますので、このチュートリアルを終了後、目的のプラットプラットフォームに合わせ以下のドキュメントを参考にしてください。

- [Android](https://docs.microsoft.com/ja-jp/azure/active-directory/develop/tutorial-v2-android)
- [iOS と MacOS](https://docs.microsoft.com/ja-jp/azure/active-directory/develop/tutorial-v2-ios)
- [Windows プラットフォーム(UWP)](https://docs.microsoft.com/ja-jp/azure/active-directory/develop/tutorial-v2-windows-uwp)
- [Windows デスクトップ アプリ(.NET)](https://docs.microsoft.com/ja-jp/azure/active-directory/develop/tutorial-v2-windows-desktop)

## 参考資料
- [Microsoft ID プラットフォームのドキュメント](https://docs.microsoft.com/ja-jp/azure/active-directory/develop/)
- [Microsoft Graph のドキュメント](https://docs.microsoft.com/ja-JP/graph/)