---
layout: post
title: ブログをWordpressからJykellに、サーバーをさくらからgithubへ
tags:
- Jykell
- Grunt
- Github 
---

<section markdown="block">
# ブログをWordpressからJykellに
rcmdnk/vim-markdown
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

pygmentsはPythonのライブラリなのでPythonが動く必要がある。

またkramdownのマークダウンライブラリが残念ながらPygmentsに対応していなかったので、プラグインで対応。  
次のバージョンのJekyllはデフォルトでKramdownになるらしいがPygmentsの対応はどうなるんだろう。Pygmentsやめるのかな。

### Krampygsプラグインの導入 

こまかい導入方法はここの[Jekyll Plugins](http://jekyllrb.com/docs/plugins/)のページと、[krampygs](https://github.com/navarroj/krampygs)のプラグインのページを参考にするとして、krampygsがTypogrubyというGemに依存しているので、Gemfileに`gem 'typogruby'`とかいておく。

これでシンタックスハイライトの際に、そこだけLiquidタグで`{{ "{% highlight 言語名 " }}%}`とか書かなくても、`~~~`でくくればコードブロックとして変換してくれるようになる。

#### Vimのマークダウンプラグインを変更

こちらの、[VimでのMarkdown環境を整える](http://rcmdnk.github.io/blog/2013/11/17/computer-vim/)を参考に、[rcmdnk/vim-markdown](https://github.com/rcmdnk/vim-markdown)導入させてもらった。  
元々は、[tpope/vim-markdown](tpope/vim-markdown)を使ってたのだけど、最近のVimだと元々入ってるみたい。

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

~~~ bash 
gem install singularity
gem install jacket
~~~

## WordpressからJykellへデータ移行

Wordpressのデータを移行するのは、jekyll-importを使った。  

~~~ bash
ruby -rubygems -e 'require "jekyll-import";
JekyllImport::Importers::WordpressDotCom.run({
    "source" => "wordpress.xml"
})'
~~~

`"wordpress.xml"`の所をエクスポートしたファイル名にすればいい。  
Wordpressのアイキャッチ画像は上手く移行できなかったので、そこはレイアウトを変えたのでサイズ的にもバランスが悪くなったので、一旦やめた。

はてブとか、Feedlyとかそういうのでアイキャッチ画像出してくれるので、あった方がいいとは思っているがこれは後で考える。

## Jykellの関連記事(related_post)について

Jykellには`site.related_posts`というのが使えて、関連リンクを表示できるのかと思いきや、最新の記事が入っていただけだった。  
公式ドキュメントにはこうかかれている。

> If the page being processed is a Post, this contains a list of up to ten related Posts. 
> By default, these are low quality but fast to compute. 
> For high quality but slow to compute results, run the  jekyll command with the --lsi (latent semantic indexing) option.

low qualityじゃなくてちゃんと、最新の記事が10件入ってるって書いて欲しい所。

ちゃんとした関連記事を表示させるには、jekyllコマンドを実行する際に--lsiオプションを付けるか、`_config.yml`にlsi: trueとする必要がある。

ただ、単純に、このオプションを有効にしてビルドすると、激重になる。  
自分の場合10分たっても終わらなかった。

これを改善するには、GSL（GNU Scientific Library）とそれをrubyで使うためのrb-gslが必要です。

### HomebrewでGSLをインストール

~~~ bash
brew install gsl
~~~

インストールすると、gsl 1.16がインストールされた。

### Gemfileにrb-gslを追記

gemには単純にgslというのもあったんだけど、それだとGSLの1.16に対応してなかったっぽい。  
探したら、rb-gslという1.16に対応したフォーク版を使う。

~~~ ruby
gem 'rb-gsl', '~> 1.16.0'
~~~

## Gemをインストールしておく。

最終的には`Gemfile`はこんな感じ

~~~ ruby
source "http://rubygems.org"

gem 'jekyll', '~>1.4.0'

#markdown
gem 'kramdown'
gem 'typogruby'

#for related post
gem 'rb-gsl', '~> 1.16.0'
~~~

`bundle`のコマンドでインストール

~~~ bash
bundle install --path ./vendor/bundle
~~~

これで、`vendor/bundle`にインストールされ、.bundle/configにオプションの設定ファイルが作成される。

</section>

<section markdown="block">
# サーバーをさくらからgithubへ

これに関しては正直、最適な方法がわからない。

Githubページに移行するのはいいんだけど、Gruntfile.jsとか.editorconfigとかのドットファイルなんかもリモートリポジトリに入れときたかったんだ。

でも、Githubページのユーザーページはリポジトリのルートに置かなきゃいけないので、そこに出力したHTMLとかとGruntfile.jsを同居できない。

なので現在、Githubユーザーページ用のリポジトリと開発環境用のGruntfile.jsとかをおいているリポジトリを分けて対応。
これに関してはなんか気持ち悪い感が残ってる。

具体的な方法に関しては、長くなってきたので割愛するが、`git push`で開発環境の方をリポジトリにあげて、`grunt deploy`で生成したHTMLの方をGithubページの方にあげるようにしている。
</section>

