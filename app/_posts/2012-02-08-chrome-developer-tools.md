---
layout: post
title: Chrome使いなら覚えといた方がいい、デベロッパーツールのTips (CSS)
categories:
- Tools
tags:
- CSS
status: publish
type: post
published: true
meta:
  dsq_thread_id: '568731658'
author:
  email: info@howtohp.com 
  display_name: kymmt
---

まだまだ、開発環境はFirefox + Firebug最強だろ常識的に考えてって言う人も多いかと思いますが、自分は、Chrome出た頃からのユーザーなんですが、意外とChromeのDeveloper Toolsも使える事を知られてないようなので、ちょっと紹介します。

色んな機能がありすぎて、一度じゃ紹介しきれないので、今回はCSSに関する事に特化してご紹介。


## 目次


1. [フォントサイズを大きくする](#enlarge-font-size)
2. [CSSを編集する](#edit-css)
3. [編集したCSSのバージョン戻す](#revert-revision)
4. [ファイルを保存](#save-as)
5. [FirebugとDeveloper Toolsどっちを使うべき？](#compare-to-firebug)

<section id="enlarge-font-size" markdown="block">

## 1.フォントサイズを大きくする

デベロッパーツールのフォントサイズがちゃいちーで見えねーよって人は、ユーザースタイルシートで変更する事ができます。

ファイルの場所は以下で、ファイルを保存するとオンザフライで反映されます。

* Win: C:\Users\AppData\Local\Google\Chrome\User Data\Default\User StyleSheets
* Mac: ~/Library/Application Support/Google/Chrome/Default/User Stylesheets

上記の場所にCustom.cssというファイルを作成し、以下のCSSでフォントサイズなどを変更することができます。

~~~ css
body.platform-mac .monospace, body.platform-mac .source-code {
    font-family: Monaco, monospace;
}
body.platform-mac.platform-mac-snowleopard .monospace,
body.platform-mac.platform-mac-snowleopard .source-code {
    font-size: 14px !important;
    line-height: 1.2;
    font-family: Menlo, monospace;
}

body.platform-windows .monospace, body.platform-windows .source-code {
    font-size: 14px !important;
    line-height: 1.2;
    font-family: Consolas, Lucida Console, monospace;
}
~~~

見ての通り、プラットフォーム毎にセレクターが違いますので、環境に合わせて使ってください。

<figure class="bordered">
<img src="http://howtohp.com/wp/wp-content/uploads/2012/02/Screen-Shot-2012-02-07-at-1.48.25-AM.png" />
<figcaption>Chrome Developer Tools スクリーンショット</figcaption>
</figure>

フォントサイズをある程度大きくすると、こんな感じでコンソール部分のテキストの行間が詰まって重なってしまうので、注意してください。コンソール部分にはline-heightが効かないっぽいです。


デベロッパーツールから直接変更する方法もあると思うんですが、調べてもわからなかったので、知ってる人いたら教えてください。

</section>

**最新のバージョンでは、編集機能がResouceパネルからSourceパネルへ移動しています。  
下記の方法は使えなくなっています。**

<section id="edit-css" markdown="block">

## 2.CSSを編集する

<figure class="bordered">
<img src="http://howtohp.com/wp/wp-content/uploads/2012/02/Screen-Shot-2012-02-08-at-9.29.png" alt="" width="560" height="433" class="aligncenter size-large wp-image-568" />

<figcaption>Chrome - Edit CSS</figcaption>
</figure>

ここではふつーに編集できます。Firebugだとプロパティ毎の編集だったと思うんですが、Chromeでは普通のエディタみたいにスペースや、改行も自由です。


ここでも編集がリアルタイムに反映されるので、レイアウトとかいじってると書いてる途中は崩れちゃうので、要注意。<br />
慣れればリロードもいらないので、かなり便利。

</section>
<section id="revert-revision" markdown="block">

## 3.編集したCSSのバージョンを戻す

<figure class="bordered">
<img src="http://howtohp.com/wp/wp-content/uploads/2012/02/Screen-Shot-2012-02-08-at-10.38.png" width="560" height="384" class="aligncenter size-large wp-image-559" />

<figcaption>Chrome - Revert to selected revision</figcaption>
</figure>

ファイルを保存すると、そのたびに、バージョンファイルが作成されます。


特定のバージョンに戻したい場合は、選択して右クリックするとリビジョンを戻すメニューがでてくるので、クリックするだけ。

</section>
<section id="save-as" markdown="block">

## 4.ファイルとして保存する

<figure class="bordered">
<img src="http://howtohp.com/wp/wp-content/uploads/2012/02/chrome-save-as.png" width="560" height="523" class="aligncenter size-large wp-image-547" />

<figcaption>Chrome - Save As...</figcaption>
</figure>

編集したら、保存したいですよね。いちいちコピーしてペーストとかめんどいですし。右クリックするとファイルとして保存するメニューがでてきます。

</section>
<section id="compare-to-firebug" markdown="block">

## 5.FirebugとDeveloper Toolsどっちを使うべき？


どっちでもええがな

</section>
