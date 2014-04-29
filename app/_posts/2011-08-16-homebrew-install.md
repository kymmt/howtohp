---
layout: post
title: Macにパッケージ管理ソフトのhomebrewをインストール
tags:
- Homebrew
meta:
  dsq_thread_id: '547706290'
author:
  email: info@howtohp.com 
  display_name: kymmt
---
Mac OSXにバンドルし忘れているパッケージ管理ソフトをインストールしました。  
これがあれば、今後MySQL入れたり、node.js入れたりその他もろもろ色々楽になるはず。

<section id="required" markdown="block">
# インストールに必要な要件

* Intel CPU搭載
* 0.5 Leopardかそれ以降のOS
* X11含むXcode
* Java Developer Update

Xcodeがインストールされてない人はApp Storeからダウンロードしてインストールしておいてください。

</section>

<section id="install" markdown="block">
# インストール方法

インストールは簡単で以下のコマンドをターミナルで実行するだけです。

~~~ bash
ruby -e "$(curl -fsSL https://gist.github.com/raw/323731/install_homebrew.rb)"
~~~

途中パスワード求められます。

とりあえずは以上でインストールは完了です。

</section>

<section id="commands" markdown="block">
# brewの主要コマンド一覧

|-------------------------|--------------------------------------------------|
|Command                  |Description                                       |
|-------------------------|--------------------------------------------------|
|`brew home`              |ブラウザーでhomebrewの公式サイトを開きます。      |
|`brew home [formula]`    |ブラウザーで指定したformulaの公式サイトを開きます |
|`brew install [formula]` |指定したformulaをインストールします。             |
|`brew list `             |インストール済のformulaを表示                     |
|`brew outdated`          |アップデートが存在するformulaを表示               |
|`brew prune`             |homebrewのprefixからデッドシンボリックリンクを削除|
|`brew remove [formula]`  |指定したformulaのアンインストール                 |
|`brew search`            |利用可能なformulaを全て表示                       |
|`brew search [formula]`  |利用可能なformula を検索                          |
|`brew search /[formula]/`|利用可能なformulaを正規表現で検索                 |
|`brew update`            |homebrew自身のアップデートとformulaのリストの更新 |
|`brew upgrade`           |アップデートが利用可能なformulaをアップデート     |
|-------------------------|--------------------------------------------------|

全てのコマンド一覧は[githubのwikiへ](https://github.com/mxcl/homebrew/wiki/The-brew-command)

</section>

<section id="test" markdown="block">
# とりあえずwgetをインストールしてみる

なにかとwgetは便利なので下記のコマンドで入れときましょう。

~~~ bash
brew install wget
~~~

余裕でした。
</section>
