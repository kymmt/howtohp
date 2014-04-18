---
layout: post
title: Compassでベンダープレフィックスなどのブラウザーサポートを制御する方法
categories:
- CSS
- Tools
tags:
- Compass
status: publish
type: post
published: true
meta:
  dsq_thread_id: '853706118'
  _edit_last: '2'
author:
  login: kohei
  email: contact@koheiyamamoto.me
  display_name: kymmt
  first_name: Kohei
  last_name: Yamamoto
---
このブログでCompassを紹介して、もう1年以上たちましたが、なかなか普及しないなぁっと思って、色々みていると、ドキュメントや、サンプルコードが乏しいという理由が多いようで、だったらということで、頑張って色々書いていこうと思う。

とりあえず、今回はいらないベンダープレフィックスとかを出力しない設定をする方法を紹介します。

<section markdown="block">
# Compassのクロスブラウザサポート設定

Compassでは元々ブラウザーサポートを制御する設定があり、設定ファイル(config.rb)ではなくコンフィグレーション変数で設定します。  
環境変数って言った方がいいのかな。

ブラウザーサポートの変数一覧

|変数                                   |初期値                 |
|---------------------------------------|-----------------------|
|$legacy-support-for-ie                 |true                   |
|$legacy-support-for-ie6                |$legacy-support-for-ie |
|$legacy-support-for-ie7                |$legacy-support-for-ie |
|$legacy-support-for-ie8                |$legacy-support-for-ie |
|$experimental-support-for-mozilla      |true                   |
|$experimental-support-for-webkit       |true                   |
|$support-for-original-webkit-gradients |true                   |
|$experimental-support-for-opera        |true                   |
|$experimental-support-for-microsoft    |true                   |
|$experimental-support-for-khtml        |false                  |
|$experimental-support-for-svg          |false                  |
|$legacy-support-for-mozilla            |true                   |

一つ一つどれに影響するかというのは長くなっちゃうので、省略させてもらいますが、変数名はわかりやすいので、大体の想像はつくかと思います。基本的にIE8以下はハックで、ベンダー名の物はCSS3でのベンダープレフィックスの設定という認識でいいかと思います。

例えばiOS4/5用のコーディングをする場合、`-moz-`や`-ms-`、`-o-`はいらないので、これらはデフォルトで出力される設定(true)をfalseに変更します。

自分の場合は、`_config.scss`のというインポート用にパーシャルのファイルを用意して、そこに記述しています。

### style.scss(サンプル)

こんな感じのSCSSをサンプルに説明します。

{% highlight scss %}
@import "compass";
@import "config";

.sample {
    @include background(
            linear-gradient(top left, rgba(#333,.8), rgba(#0c0,.5)),
            radial-gradient(#c00, #fff 100px)
        )
}
{% endhighlight %}

## iOS4/5用の設定

例えばiOS4/5向けの場合は、-webkit-系のプレフィックス以外はいらないので、色々falseにしていきます。

### _config.scss

{% highlight scss %}
$experimental-support-for-opera:false;
$experimental-support-for-microsoft:false;
$experimental-support-for-mozilla: false;
{% endhighlight %}

### style.css(出力されるCSS)

{% highlight css %}
.sample {
  background: -webkit-gradient(linear, 0% 0%, 100% 100%, color-stop(0%, rgba(51, 51, 51, 0.8)), color-stop(100%, rgba(0, 204, 0, 0.5))), -webkit-gradient(radial, 50% 50%, 0, 50% 50%, 100, color-stop(0%, #cccccc), color-stop(100%, #ffffff));
  background: -webkit-linear-gradient(top left, rgba(51, 51, 51, 0.8), rgba(0, 204, 0, 0.5)), -webkit-radial-gradient(#cccccc, #ffffff 100px);
  background: linear-gradient(top left, rgba(51, 51, 51, 0.8), rgba(0, 204, 0, 0.5)), radial-gradient(#cccccc, #ffffff 100px);
}
{% endhighlight %}

## iOS5のみの場合


iOS5のみの場合は、グラデーションの記法が変わってますので、古い記法を出力する必要はありません。  
その場合は、_config.scssに古い記法を出力しない設定に変更します。


### _config.scss

{% highlight scss %}
$experimental-support-for-opera:false;
$experimental-support-for-microsoft:false;
$experimental-support-for-mozilla: false;
$support-for-original-webkit-gradients: false   //これを追記
{% endhighlight %}

### style.css(出力されるCSS)

{% highlight css %}
.sample {
  background: -webkit-linear-gradient(top left, rgba(51, 51, 51, 0.8), rgba(0, 204, 0, 0.5)), -webkit-radial-gradient(#cccccc, #ffffff 100px);
  background: linear-gradient(top left, rgba(51, 51, 51, 0.8), rgba(0, 204, 0, 0.5)), radial-gradient(#cccccc, #ffffff 100px);
}
{% endhighlight %}

こんな感じで、簡単にプレフィックスの出力をコントロール出来ます。Mixinを作る際のヘルパーも用意されているので、自作でゴリゴリ書くよりは大分楽できるんじゃないでしょうか。


## OperaとIE9にグラデーションをSVGで対応

これはグラデーションをOperaとIE9に対応させるため、SVGをbase64エンコードしたものをCSSに書きこんでくれるというCompassの便利機能の一つ。  
ただ、ファイルサイズが肥大化してしまうので、要注意です。

### _config.scss

{% highlight scss %}
$experimental-support-for-svg: true;
{% endhighlight %}

### style.css(出力されるCSS)

{% highlight css %}
.sample {
  /* SVGの部分だけ抜粋 */
  background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0icmdiYSg1MSwgNTEsIDUxLCAwLjgpIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSJyZ2JhKDAsIDIwNCwgMCwgMC41KSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiIC8+PC9zdmc+IA=='), url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHJhZGlhbEdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY3g9IjUwJSIgY3k9IjUwJSIgcj0iMTAwIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjY2NjY2NjIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZmZmZmZmIi8+PC9yYWRpYWxHcmFkaWVudD48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmFkKSIgLz48L3N2Zz4g');
}
{% endhighlight %}

ちなみにこのサンプルのグラデーションはかなり汚い感じなので、ご注意を。


## 余談


記事を書くついでに、コード表示部分のカラーリングをMonokaiっぽくしてみました。あと、長い行は無理やり改行させるんじゃなく、横スクロールするように変更しました。自分的にはスクロールしたほうが見やすいんじゃないかなと思うんですが、normalize.css使うと、無理やり改行するように書かれてました。


※IE9は横スクロールバーがでると変な余白がでちゃったので、改行のままにしています。IE8以下は無視。JSでpreの中身をinnerHTMLとかで書き換えると改行が消えちゃうっぽいですが今のところ対応しない予定。暇があればやります。

</section>
