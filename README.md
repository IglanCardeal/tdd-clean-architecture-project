# Git

Renomeando origin:

```none
git remote rename origin o
```

## lint-staged

Permite rodar scripts na staged area. Staged area são arquivos que vão entrar no commit.

package.json:

```none
...
"lint-staged": {
  "*.js": ["standard"]
},
...
```

Força um correção dos arquivos e executa o `git add` para os arquivos corrigidos:

```none
...
"lint-staged": {
  "*.js": ["standard --fix", "git add"]
},
...
```

Vai rodar `npx standard` em todos os arquivos `.js` e verificar a qualidade e formatação dos arquivos.


## husky

Rodar scripts antes de um commit, através dos `hooks`:

```none
{
  "hooks": {
    "pre-commit": "lint-staged"
  }
}
```
