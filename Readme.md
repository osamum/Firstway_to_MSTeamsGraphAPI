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

1. Azure Active Directory へのアプリケーションの登録
2. Azure Active Directory を使用したログイン機能の実装とアクセストークンの取得
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

* **[Postman](https://www.postman.com/downloads/)**

## 目次
1. [Azure Active Directory へのアプリケーションの登録](Ex01.md)
2. [MSAL.js を使用したログイン処理の実装](Ex02.md)
3. [Graph API を使用したログイン済ユーザーのプロファイル情報の取得](Ex03.md)
4. [Graph API を使用した OneDrive へのファイルの投稿](Ex04.md)
    - [Azure Active Directory へのアクセス許可の追加](https://github.com/osamum/Firstway_to_MSTeamsGraphAPI/blob/master/Ex04.md#%E3%82%BF%E3%82%B9%E3%82%AF-1-azure-active-airectory-%E3%81%A7%E3%81%AE%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%B8%E3%81%AE%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9%E8%A8%B1%E5%8F%AF%E3%81%AE%E8%BF%BD%E5%8A%A0)
    - [Postman を使用したテスト](https://github.com/osamum/Firstway_to_MSTeamsGraphAPI/blob/master/Ex04.md#%E3%82%BF%E3%82%B9%E3%82%AF-3--postman-%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%97%E3%81%9F-onedrive-%E3%81%B8%E3%81%AE%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E4%BD%9C%E6%88%90%E3%81%AE%E6%A4%9C%E8%A8%BC)
    - [OneDrive へのファイルの投稿機能の実装](https://github.com/osamum/Firstway_to_MSTeamsGraphAPI/blob/master/Ex04.md#%E3%82%BF%E3%82%B9%E3%82%AF-4--%E6%BC%94%E7%BF%92%E7%94%A8%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%B8%E3%81%AEonedrive-%E3%83%95%E3%82%A9%E3%83%AB%E3%83%80%E3%81%B8%E3%81%AE%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%A2%E3%83%83%E3%83%97%E3%83%AD%E3%83%BC%E3%83%89%E6%A9%9F%E8%83%BD%E3%81%AE%E5%AE%9F%E8%A3%85)
5. [Microsoft Teams チャネルへのファイルの投稿](Ex05.md)
    -[Teams 用 Graph API を使用するのに必要な ID の取得](https://github.com/osamum/Firstway_to_MSTeamsGraphAPI/blob/master/Ex05.md#%E3%82%BF%E3%82%B9%E3%82%AF-1--teams-%E7%94%A8-graph-api-%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%99%E3%82%8B%E3%81%AE%E3%81%AB%E5%BF%85%E8%A6%81%E3%81%AA-id-%E3%81%AE%E5%8F%96%E5%BE%97)
    - [Azure Active Directory へのアクセス許可の追加](https://github.com/osamum/Firstway_to_MSTeamsGraphAPI/blob/master/Ex05.md#%E3%82%BF%E3%82%B9%E3%82%AF-2--%E6%A4%9C%E8%A8%BC%E7%94%A8%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%B8%E3%81%AE%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9%E8%A8%B1%E5%8F%AF%E3%81%AE%E8%BF%BD%E5%8A%A0)
    - [演習用アプリケーションへの、SharePoint サイトへのファイルアップロード機能の実装](https://github.com/osamum/Firstway_to_MSTeamsGraphAPI/blob/master/Ex05.md#%E3%82%BF%E3%82%B9%E3%82%AF-3--%E6%BC%94%E7%BF%92%E7%94%A8%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%B8%E3%81%AEsharepoint-%E3%82%B5%E3%82%A4%E3%83%88%E3%81%B8%E3%81%AE%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%A2%E3%83%83%E3%83%97%E3%83%AD%E3%83%BC%E3%83%89%E6%A9%9F%E8%83%BD%E3%81%AE%E5%AE%9F%E8%A3%85)
    - [Teams チャネルへのメッセージの投稿](https://github.com/osamum/Firstway_to_MSTeamsGraphAPI/blob/master/Ex05.md#%E3%82%BF%E3%82%B9%E3%82%AF-4--teams-%E3%83%81%E3%83%A3%E3%83%8D%E3%83%AB%E3%81%B8%E3%81%AE%E3%83%A1%E3%83%83%E3%82%BB%E3%83%BC%E3%82%B8%E3%81%AE%E6%8A%95%E7%A8%BF)

## このハンズオンの進め方

このハンズオンは各演習で作成した成果物を次の演習で手を加えて使用します。

よって途中から演習を行うことはできませんのでかならず演習 1 から順番に行ってください。

## デスクトップアプリケーション/ネイティブアプリについて

このハンズオンでは SPA (Single Page Application :　Web ブラウザー内で動作するアプリケーション) を使用しており、デスクトップアプリケーションやネイティブアプリについては説明しません。

ただし、①アプリケーションを Azure Active Directory に登録し、②Azure Active Directory にサインインし、③取得したアクセストークンを使用して Graph API と呼び出す、という大まかな手順は変わることはありません。

ただし、Azure Active Directory へのアプリケーションの登録内容、コードの記述方法は異なりますので、このチュートリアルを終了後、目的のプラットプラットフォームに合わせ以下のドキュメントを参考にしてください。

- [Android](https://docs.microsoft.com/ja-jp/azure/active-directory/develop/tutorial-v2-android)
- [iOS と MacOS](https://docs.microsoft.com/ja-jp/azure/active-directory/develop/tutorial-v2-ios)
- [Windows プラットフォーム(UWP)](https://docs.microsoft.com/ja-jp/azure/active-directory/develop/tutorial-v2-windows-uwp)
- [Windows デスクトップ アプリ(.NET)](https://docs.microsoft.com/ja-jp/azure/active-directory/develop/tutorial-v2-windows-desktop)

## 参考資料
- [Microsoft ID プラットフォームのドキュメント](https://docs.microsoft.com/ja-jp/azure/active-directory/develop/)
- [Microsoft Graph のドキュメント](https://docs.microsoft.com/ja-JP/graph/)