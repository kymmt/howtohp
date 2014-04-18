---
layout: post
Title: MacにHomebrewでMySQLをインストールしてみた。
categories:
- Tools
tags:
- Homebrew
- Mac
- MySQL
status: publish
type: post
published: true
meta:
  _edit_last: '2'
  dsq_thread_id: '547706110'
author:
  login: kohei
  email: contact@koheiyamamoto.me
  display_name: kymmt
  first_name: Kohei
  last_name: Yamamoto
---

WordpressやMTなどのCMS使ったりするには必須なので、インストールしておきました。

[MAMP](http://www.mamp.info/en/index.html)とか使えば一緒に入ってるみたいですが、Macには最初っからApacheやPHPが入ってるし、とりあえず今のとこ必要なのはMySQLだけなので、MAMPは使いません。

<section id="install_mysql" markdown="block">
# Homebrewを使ってMySQLをインストール

まだインストールしてない方は、前回の[Macにパッケージ管理ソフトのhomebrewをインストール]({% post_url 2011-08-16-homebrew-install %})の記事を参考にインストールしてみてください。

MySQLのインストールはターミナルで下記のコマンドを実行

~~~ bash
brew install mysql
~~~

インストールは超簡単ですね。今日時点では、MySQL5.5.14がインストールされました。

インストール中に下記のメッセージが出ると思います。

~~~ bash
Set up databases to run AS YOUR USER ACCOUNT with:
    unset TMPDIR
    mysql_install_db --verbose --user=`whoami` --basedir="$(brew --prefix mysql)" --datadir=/usr/local/var/mysql --tmpdir=/tmp

To set up base tables in another folder, or use a different user to run
mysqld, view the help for mysqld_install_db:
    mysql_install_db --help

and view the MySQL documentation:
  * http://dev.mysql.com/doc/refman/5.5/en/mysql-install-db.html
  * http://dev.mysql.com/doc/refman/5.5/en/default-privileges.html

To run as, for instance, user "mysql", you may need to `sudo`:
    sudo mysql_install_db ...options...

Start mysqld manually with:
    mysql.server start

    Note: if this fails, you probably forgot to run the first two steps up above

A "/etc/my.cnf" from another install may interfere with a Homebrew-built
server starting up correctly.

To connect:
    mysql -uroot

To launch on startup:
* if this is your first install:
    mkdir -p ~/Library/LaunchAgents
    cp /usr/local/Cellar/mysql/5.5.14/com.mysql.mysqld.plist ~/Library/LaunchAgents/
    launchctl load -w ~/Library/LaunchAgents/com.mysql.mysqld.plist

* if this is an upgrade and you already have the com.mysql.mysqld.plist loaded:
    launchctl unload -w ~/Library/LaunchAgents/com.mysql.mysqld.plist
    cp /usr/local/Cellar/mysql/5.5.14/com.mysql.mysqld.plist ~/Library/LaunchAgents/
    launchctl load -w ~/Library/LaunchAgents/com.mysql.mysqld.plist

You may also need to edit the plist to use the correct "UserName".

Warning: m4 macros were installed to "share/aclocal".
Homebrew does not append "/usr/local/share/aclocal"
to "/usr/share/aclocal/dirlist". If an autoconf script you use
requires these m4 macros, you'll need to add this path manually.
==> Summary
/usr/local/Cellar/mysql/5.5.14
~~~

まぁ今からこれやれよってことなんですが、書いてある通り、コマンドを打ち込んでいきます。  `
Warningとか出ちゃってますが、とりあえずスルーしときます。

出てきた情報はbrew info mysqlとすればいつでも見直す事ができます。

## 今のユーザーアカウントでのデータベースのセットアップ

~~~ bash
unset TMPDIR
mysql_install_db --verbose --user=`whoami` --basedir="$(brew --prefix mysql)" --datadir=/usr/local/var/mysql --tmpdir=/tmp
~~~

## MySQLのデーモンを手動で起動

~~~ bash
mysql.server start
~~~ 

## 起動時に自動起動

~~~ bash
mkdir -p ~/Library/LaunchAgents
>cp /usr/local/Cellar/mysql/5.5.14/com.mysql.mysqld.plist ~/Library/LaunchAgents/
launchctl load -w ~/Library/LaunchAgents/com.mysql.mysqld.plist
~~~

## ルートユーザーでログインしてみる

~~~ bash
mysql -u root
~~~ 

これで、いよいよ使えるようになったはずです。5.5.14ではデフォルトの文字コードがUTF-8らしく、めんどくさい文字コード変更の設定はいりません。一応、以下のコマンドを実行して文字コードの設定を確認しておきます。

~~~ bash
mysql> show variables like 'character_set%';
+--------------------------+------------------------------------------------------+
| Variable_name            | Value                                                |
+--------------------------+------------------------------------------------------+
| character_set_client     | utf8                                                 |
| character_set_connection | utf8                                                 |
| character_set_database   | utf8                                                 |
| character_set_filesystem | binary                                               |
| character_set_results    | utf8                                                 |
| character_set_server     | utf8                                                 |
| character_set_system     | utf8                                                 |
| character_sets_dir       | /usr/local/Cellar/mysql/5.5.14/share/mysql/charsets/ |
+--------------------------+------------------------------------------------------+
8 rows in set (0.06 sec)
~~~

こんな感じで出力されれば、おｋですね。後は使い方を覚えるだけです。  
以上。
</section>
