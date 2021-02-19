# Git commands

Renomeando origin:

```none
git remote rename origin o
```

## lint-staged

Permite rodar scripts na staged area. Staged area são arquivos que vão entrar no commit.

package.json:

```
...
"lint-staged": {
  "*.js": ["standard"]
},
...
```

Vai rodar `npx standard` em todos os arquivos `.js`.
