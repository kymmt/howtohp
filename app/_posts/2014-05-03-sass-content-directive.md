---
layout: post
title: (翻訳) Sassの@contentのユースケース 
tags:
- Sass 
published: false
---

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

## Context Specificity

これも[Burbon](http://bourbon.io/docs/#keyframes)で使用されています。

I just picked up a project from [Reda Lemeden](https://twitter.com/kaishin), who wrote a pair of clever mixins to modify components for a given context.

Instead of creating many .component--modifiers or chaining modifying classes, we can better separate our concerns by defining a style’s context specificity.

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

## Getting BEMy

Sass 3.3 adds the @at-root directive and improved &s. The former allows us to nest declarations in Sass, but compile them to the stylesheet’s root. The latter appends any following text directly to the parent’s selector.

These can be used with `@content` to simplify writing BEM syntax. Thanks to Scott Kellum for the original implementation.

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

`@content` is just one of many Sass directives that can empower us to remove duplication in our SCSS, and think more creatively about its organization and implementation. Learn more by reading the [Sass directives documentation](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#directives).

`@content`はSCSSの重複を減らすSassの機能の一つに過ぎません。


