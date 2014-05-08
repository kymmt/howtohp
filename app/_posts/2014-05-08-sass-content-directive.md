---
layout: post
title: (翻訳) Sassの@contentのユースケース 
tags:
- Sass 
published: true 
---

この記事は、2014/04/22に[Christian Reuter](https://twitter.com/jchreu)氏によって、書かれた記事です。  
本人の許可を頂いて翻訳しています。  
直訳が難しい所が結構あったので、意訳しています。

[[原文 - http://robots.thoughtbot.com/sasss-content-directive]](http://robots.thoughtbot.com/sasss-content-directive)

Sass 3.2からミックスインにContentブロックを渡せる`@content`が追加されています。

~~~ scss
@mixin apply-to-ie6-only {
  * html {
    @content
  }
}

@include apply-to-ie6-only {
  #logo {
    background-image: url(/logo.gif);
  }
}
~~~

生成後

~~~ css
* html #logo {
    background-image: url(/logo.gif);
}
~~~

外側のスコープのセレクターに対してどこにでも記述できます。  

# Media Queries

デバイス毎にファイルをわけてメンテナンスしなくても、メディアクエリーを書けますが、
何度も繰り返し記述するのもやっかいです。
Contentブロックをメディアクエリーに渡す事でシンプルに出来ます。

~~~ scss
@mixin media($width) {
  @media only screen and (max-width: $width) {
    @content;
  }
}

@include media(320px) {
  background: red;
}
~~~

生成後

~~~ css
@media only screen and (max-width: 320px) {
  background: red;
}
~~~

これは、Bourbonで使われている[HiDPI mixin](http://bourbon.io/docs/#hidpi-media-query)の様に長く細かく設定されたメディアクエリーに対して特に効果的です。  

詳しくは、私達の[Neat](https://github.com/thoughtbot/neat/blob/master/app/assets/stylesheets/grid/_media.scss)で使っているMixinでご覧頂けます。

# Keyframes

Keyframesは重複のよい例です。ベンダー毎に記述するかわりにMixinに出来ます。

~~~ scss
@mixin keyframes($name) {
  @-webkit-keyframes #{$name} {
    @content;
  }

  @-moz-keyframes #{$name} {
    @content;
  }

  @keyframes #{$name} {
    @content;
  }
}

@include keyframes(fadeIn) {
  from {
    opacity: 0%;
  }
  to {
    opacity: 100%;
  }
}
~~~

生成後

~~~ css
@-webkit-keyframes fadeIn {
  from {
    opacity: 0%;
  }
  to {
    opacity: 100%;
  }
}

@-moz-keyframes fadeIn {
  from {
    opacity: 0%;
  }
  to {
    opacity: 100%;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0%;
  }
  to {
    opacity: 100%;
  }
}
~~~

## コンテキストによる振り分け 

これも[Burbon](http://bourbon.io/docs/#keyframes)で使用されています。

親のクラスによって、スタイルを振り分けるための賢いMixinを[Reda Lemeden](https://twitter.com/kaishin)さんのプロジェクトから紹介します。

状態管理用の`.component--modifiers`やクラスを繋げていく変わりに、親のクラスを定義しておくことで分離する事ができます。

~~~ scss
@mixin create-context($classes...) {
  @each $class in $classes {
    .#{$class} & {
      @content;
  }
}

@mixin context--alternate-template {
  @include create-context(about, blog) {
    @content
  }
}

.header {
  height: 12em;
  background: red;

  @include context--alternate-template {
    background: green;
  }
}
~~~

生成後

~~~ css
.header {
    height: 12em;
    background: red;
}

.about .header {
    background: green;
}

.blog .header {
    background: green;
}
~~~

## BEMの簡略化

SASS 3.3から`@at-root`が追加され`&`が改善されています。  
`@at-root`はネストした記述をコンパイル時にCSSのルートに移動します。  
`&`はそれに文字列を続けて記述できるようになりました。

これらは`@content`を利用することによってBEM記法を簡略化出来ます。ありがとうScott Kellumさん

~~~ scss
@mixin element($name) {
  @at-root #{&}__#{$name} {
    @content;
  }
}

@mixin modifier($name) {
  @at-root #{&}--#{$name} {
    @content;
  }
}

.block {
  color: red;

  @include element(element) {
    color: green;

    @include modifier(modifier) {
      color: blue;
    }
  }
}
~~~

生成後

~~~ css
.block {
  color: red;
}

.block__element {
  color: green;
}

.block__element--modifier {
  color: blue;
}
~~~

# まとめ 

`@content`はSCSSの重複を減らすSassの機能の一つに過ぎません。もっとクリエイティブに構成と開発を考えてみましょう。
詳しくは[Sass directives documentation](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#directives)

