---
layout: post
title: フロントエンドエンジニア向けのVim環境 
tags:
- Vim 
author:
  display_name: kymmt
published: false
---

Vimを使い始めて、もうすぐで３年目になる。  
そろそろ初心者脱却したかな。  その辺はわからないけど、GW中に.vimrcを色々見なおしたので、
今の状況をまとめておく。

同じような人の参考になったらいいかなと思う。

# プラグイン管理

これは、ド定番の[Neobundle](https://github.com/Shougo/neobundle.vim)を利用中。  

インストールや設定に関しては詳しく書いている記事がたくさんあるので割愛。

自分は、Neobundleで管理しているプラグインと、そのプラグインの設定ファイルを.vimrc.bundleという風に別ファイルに記述して.vimrcから.vimrc.bundleを読み込むようにしている。

~~~ vim
if filereadable(expand("~/.vimrc.bundles"))
  source ~/.vimrc.bundles
endif
~~~

これを.vimrcの冒頭にでも書いておけば.vimrc.bundleが読み込まれる。

# 文法チェック

これも定番の[syntastic](https://github.com/scrooloose/syntastic)を利用。

JavaScriptのチェックはJShint、HTMLはvalidator.nuを使っている。

JSHintはNodeのモジュールとして入っている必要があるので、入れておく。

~~~ bash
npm install -g jshint
~~~

validator.nuに関してはWebAPIなので、オフライン環境では使えない。  
どうしてもという人はローカルにインストールする事も可能らしいが、試していない。

設定はこんな感じ。

~~~ vim
let g:syntastic_auto_loc_list = 1
let g:syntastic_mode_map = { 'mode': 'active', 
            \ 'passive_filetypes': ['sass','scss'] }
let g:syntastic_javascript_checkers = ['jshint']
let g:syntastic_html_checkers = ['validator']
let g:syntastic_html_validator_api  = 'http://validator.nu/'
let g:syntastic_html_validator_parser = 'html5'
~~~

SASS,SCSSファイルに関しては文法チェックされるとめちゃめちゃ重かったので、この辺はコンパイラーも出力結果のCSSにもエラーは出してくれるので、Vimではチェックしないようにした。



# HTML用プラグイン

## emmet.vim






