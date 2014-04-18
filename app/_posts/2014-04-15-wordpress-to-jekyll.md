---
layout: post
title: ブログをWordpressからJykellに、サーバーをさくらからgithubへ
tags:
- Jykell
- Grunt
- Github 
---

# ブログをWordpressからJykellに

ブログをWordpressからJykellに変更した。  
主な理由は下記の通り。

* マークダウン記法で記事が書きたかった。
* 普段使ってるエディタ(Vim)で記事が書きたかった。
* 現状アクセス頂いているユーザーの動向から、直接記事にアクセスして直帰していく人がメインなので、メインユーザー向けに構成を合わせたかった。(Jykellあんま関係ない)
* サーバーをgithubに移行して、サーバー代を浮かせたかった。(ここ重要)

最初は[middleman](http://middlemanapp.com/)を使おうと思ってたんだけど、Compassのアルファ版が使えなかったのでやめた。  
middlemanにはCompassが組み込まれていて、色々読んでいるとアルファ版はサポートしないポリシーらしい。そらそうですよね。

Prefix周りに関しては、Gruntを使ってるので[grunt-autoprefixer](https://github.com/nDmitry/grunt-autoprefixer)に任せて、Compassの機能として画像のData URI化、スプライト化に関してのみなんとかできればCompassもういいかなと思いはじめてる。

## 用意するもの

* Ruby 1.9+
  * Bundler
  * jekyll-import
* node.js
  * yeoman
  * Grunt 
  * generator-jekyllrb


## YeomanのjykellrbジェネレーターでさくっとGruntの準備

jykell-importとgenerator-jekyllrb以外は元々入っていたので、足りない2つをインストール。

~~~ bash
gem install jekyll-import
sudo npm install -g generator-jekyllrb
~~~

必要なものが揃ったら、Yeomanのジェネレーターで初期ファイルの生成

~~~ bash
yo jekyllrb
~~~

生成したファイル内にBundler用の`Gemfile`があるので、そこに使いたいGemを書いておく。 
とりあえずマークダウンのGemがデフォルトでMarukuが使われているのでkramdownにした。

### Gemfileにkramdownを追記

~~~ ruby
gem 'kramdown'
~~~

### _config.ymlの設定

マークダウンライブラリの指定と、SyntaxHighlightも使いたいのでpygmentsもtrueに

~~~ yaml
markdown: kramdown
pygments: true
~~~

pygmentsはSyntaxHighlight用のライブラリなのでPythonが動く必要がある。

またkramdownのマークダウンライブラリが残念ながらPygmentsに対応していなかったので、プラグインで対応。  
次のバージョンのJekyllはデフォルトでKramdownになるらしいがPygmentsの対応はどうなるんだろう。Pygmentsやめるのかな。

### Gemをインストール

`Gemfile`で管理してるgemもnode_moduleと同じようにローカルにもっておきたかったので、オプションを指定してインストールしておく。

~~~ bash
bundle install --path ./vender/bundle/
~~~


### Compass 1.0.0.alphaを使うための設定

アルファ版を使う必要がなければここは変更する必要がない。
`Gemfile`にgem 'compass', '~> 1.0.0.alpha.19'と書くと`bundle install`した際にlistenのバージョンがJykellと違ってインストール出来ない。  
CompassはグローバルにインストールされているCompass 1.0.0.19を利用したかったので、`Gruntfile.js`のCompassの設定をちょい変更

~~~ js
compass: {
  options: {
    // If you're using global Sass gems, require them here.
    require: ['singularity', 'jacket'],  //コメントアウトをはずす
    //bundleExec: true,                  //コメントアウト
    sassDir: '<%= yeoman.app %>/_scss',
    cssDir: '.tmp/css',
    imagesDir: '<%= yeoman.app %>/img',
    javascriptsDir: '<%= yeoman.app %>/js',
    relativeAssets: false,
    httpImagesPath: '/img',
    httpGeneratedImagesPath: '/img/generated',
    outputStyle: 'expanded',
    raw: 'extensions_dir = "<%= yeoman.app %>/_bower_components"\n'
  },
  ...
~~~

コメントでsingularityとjacketが必要って書いてあるので、それらをインストールしておく。  
これらのgemはグローバルでインストールしておくので、`Gemfile`にはかかない。

~~~ js
gem install singularity
gem install jacket
~~~

## WordpressからJykellへデータ移行

Wordpressのデータを移行するのは、jekyll-importを使った。  

{% highlight bash %}
ruby -rubygems -e 'require "jekyll-import";
JekyllImport::Importers::WordpressDotCom.run({
    "source" => "wordpress.xml"
})'
{% endhighlight %}

`"wordpress.xml"`の所をエクスポートしたファイル名にすればいい。  
Wordpressのアイキャッチ画像は上手く移行できなかったので、そこはレイアウトを変えたのでサイズ的にもバランスが悪くなったので、やめた。





## Jykellのrelated_postについて

Jykellには`site.related_posts`というのが使えて、関連リンクを表示できるのかと思いきや、最新の記事が入っていただけだった。  
公式ドキュメントにはこうかかれている。

> If the page being processed is a Post, this contains a list of up to ten related Posts. 
> By default, these are low quality but fast to compute. 
> For high quality but slow to compute results, run the  jekyll command with the --lsi (latent semantic indexing) option.

low qualityじゃなくてちゃんと、最新の記事が10件入ってるって書いて欲しい所。

ちゃんとした関連記事を表示させるには、jekyllコマンドを実行する際に--lsiオプションを付けるか、`_config.yml`にlsi: trueとする必要がある。

# サーバーをさくらからgithubへ

