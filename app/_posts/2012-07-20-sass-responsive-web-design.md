---
layout: post
title: Sassを使ってレスポンシブウェブデザインにする時に覚えておいた方がいいこと4つ
tags:
- CSS
- SASS
meta:
  dsq_thread_id: '772710372'
author:
  email: info@howtohp.com 
  display_name: kymmt
---
このサイトをメディアクエリー使ってレスポンシブウェブデザインって奴にしてみたんですけど、Sassを使うにあたって、色々思った事や、引っかかった事があるので、まとめてみます。

大きく分けると以下の4つ


* [ブレイクポイントは変数に](#sass-breakpoint)
* [@mediaはネストできる](#media-nest)
* [ネストするとコンパイル後のソースが増える](#messy-code)
* [@extendを使えない](#not-allowed)

<section id="sass-breakpoint" markdown="block">
# ブレイクポイントは変数に

`@media`の後に書くブレイクポイントって長いですよね。Sassの3.1ではできないんですが、最新版の3.2では変数を使う事ができます。

まだalpha版なので、ご使用は自己責任でお願いします。インストールするには、バージョンを指定しないといけません。

~~~ bash
gem install sass -v 3.2.0.alpha.275
~~~

## Sample

### SCSS

~~~ scss
$small:  "only screen and (max-width:640px)";
$middle: "only screen and (min-width:641px) and (max-width:959px)";
$large:  "only screen and (min-width:960px)";

@media #{$small} {
    //640px以下
}

@media #{middle} {
    //641px〜959pxまで
}
@media #{large} {
    //960px以上
}
~~~

こんな感じで、やっとくとわかりやすいかなと。

</section>
<section id="media-nest" markdown="block">

# @mediaはネストできる

`@media`はSassを使うとネストして書けます。僕がSassを使い始めた頃やってみたら出来なかったので、最近のバージョンで出来るようになったっぽいです。3.1かな。

## Sample

### SCSS

~~~ scss
.sample {
    margin:10px;
    @media screen and (min-width: 960px) {
        width:300px;
    }
}
~~~

### CSS

~~~ css
.sample {
    margin: 10px;
}
@media screen and (min-width:960px) {
    .sample {
        width: 300px;
    }
}
~~~

こんな感じで、ネストした場合先祖のセレクターまでたどって出力してくれます。

</section>

<section id="messy-code" markdown="block">

# ネストするとコンパイル後のソースが増える

残念ながら`@media`をネストして記述すると、同じブレイクポイントを設定しても、コンパイル前が分散されているとコンパイル後も分散されたままになっちゃいます。

## Sample

### SCSS

~~~ scss
.sample {
    @media screen and (min-width:960px) {　/*同じブレイクポイント*/
        width:96%;
    }
}

.sample2 {
    @media screen and (min-width:960px) { /*同じブレイクポイント*/
        font-size:1.5em;
    }
}
~~~

### CSS

~~~ css
@media screen and (min-width:960px) {
  .sample {
    width: 96%;
  }
}

@media screen and (min-width:960px) {
  .sample2 {
    font-size: 1.5em;
  }
}
~~~


### こうなって欲しいけど、ならない

~~~ css
@media screen and (min-width:960px) {
  .sample {
    width: 96%;
  }
  .sample2 {
    font-size: 1.5em;
  }
}
~~~

</section>
<section id="not-allowed" markdown="block">

# @extendが使えない

`@media`でネストされたプロパティに対しては`@media`の外で定義したクラスを利用した`@extend`が使えません。これは残念。  `@media`内に`@extend`を使うと現時点でははWarningがでて、コンパイルは通りますが、将来的にSass 3.3では完全にエラーになるようです。

## Sample

### SCSS

~~~ scss 
.typo {
    font-size:1em;
    text-shadow: 2px 2px 1px #999;
}
@media screen and (min-width:320px) {
    .sample {
        width:100%;
        @extend .typo;
    }
}
~~~

</section>

### CSS

~~~ css
.typo {
    font-size: 2em;
    text-shadow: 2px 2px 1px #999999;
}

@media screen and (min-width:320px) {
    .sample {
        width: 96%;
        /* ここに@extendを記述したはずなのに無い */
    }
}
~~~

お分かり頂けるでしょうか。`@extend`で書いたとこは無視です。なかったことになってます。


`@media`の中で定義したクラスに対しては`@extend`は使えるのですが、`@extend`の旨みが激減ですね。

<section id="conclusion" markdown="block">

# まとめ

結局自分は、`@media`をネストして使うような書き方はしませんでした。  
ブレイクポイントは3箇所用意しているので、`@media`の記述はその3パターンを一回ずつ書くだけにした方がよさげ。

`@extend`は多用してたんですが、`@media`の中ではmixinにして`@include`を使った箇所が何箇所かありました。  
結論としては、メディアクエリーをSassで使う場合、シンプルにわかりやすくする記述法は用意されてるけど、出力されるCSSは微妙って事でした。

</section>
