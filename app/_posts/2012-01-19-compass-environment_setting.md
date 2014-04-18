---
layout: post
title: Compassで本番用と開発用で設定を振り分けてみる。
categories:
- CSS
tags:
- Compass
status: publish
type: post
published: true
meta:
  dsq_thread_id: '547689143'
author:
  login: kohei
  email: contact@koheiyamamoto.me
  display_name: kymmt
  first_name: Kohei
  last_name: Yamamoto
---
何故か、去年の9月に書いた前回のCompassについての記事が最近になって、やたらはてブやらTweetやらされてて焦ってます。このタイミングでなんか書かないとと思ったので、この流れに乗って、Compassの設定について。

<section id="introduction" markdown="block">
今回は設定なので、導入方法なんかは、[前回の記事]({% post_url 2011-09-19-compass %})を参考にしてみてください。
</section>

<section id="setting" markdown="block">
設定を変更するには`config.rb`ファイルを編集します。  
今回振り分けるのはoutput_styleとline_commentsの2箇所で、下記の2行を追加するだけです。

~~~ ruby
#圧縮するかどうかの設定(:nested, :expanded, :compact, or :compressed)
output_style = (environment == :production) ? :compressed : :expanded

#SASS内の行番号の出力(true or false)
line_comments = (environment == :production) ? :false : :true
~~~

config.rbはrubyですので、environmentを三項演算子で条件分岐してます。  
コロンが連続して続くけど、全く意味が違うってのがなんか変な感じを受けてしまいます。

で、`config.rb`の設定、もしくはコマンドのオプションで切り替えます。

# config.rbの設定

~~~ ruby
#何も書かなければデフォルトは:development
environment = :development
~~~

# Compassのコマンドオプションで切り替え

~~~ bash
compass watch -e production
~~~

一つ注意しなければいけないのが、ファイルの変更が全くない状態で、productionとdevelopmentを切り替えても、ファイルが生成されません。

前回書いてなかったけど、`compass watch`の引数に監視するファイルパスを指定しなければ、sass_dirで設定したパスの中身のファイルを全部監視します。

1つのファイルだけ指定してても、そのファイルがインポートしてるファイルも監視してくれるので、そこら辺がSASSと違うところかな。
</section>
