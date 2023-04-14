# watermark_art
黒のPNGイラストと、背面カメラの表示領域を重ねて透かし絵みたいな効果が楽しめるアプリです。

- ビルド: `yarn build`
- ローカル環境構築:
  - `yarn install`
  - `yarn serve`


# ローカル開発環境構築メモ
[ngrok](https://ngrok.com/)を使用し、localhostの環境をインターネット上で確認する方法を記します。

1. [ngrokをインストール](https://ngrok.com/download)
2. ngrokへログイン
3. ngrokのダッシュボード>`2. Connect your account`のコマンドを実行
4. 本ルートディレクトリ上で`yarn serve`
   - `http://localhost:5250`が立ち上がります
5. `ngrok http 5250 --basic-auth '[Basic認証ユーザー名]:[Basic認証パスワード名]'`
6. ↑で`Forwarding`に示されたURL + `/docs`のURLに、お手持ちのスマホでアクセス
   - 先で設定したBasic認証情報を求められるため、入力してアクセス