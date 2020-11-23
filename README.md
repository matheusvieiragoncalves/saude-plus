## Saúde Plus

### Para usar o aplicativo

- Clonar reposiório

- Rodar o projeto front-end
  - Rodar o comando yarn start na parta raiz 'front-end'
- Após rodar o projeto fron-end end:

  - Pegar o IP disponibilizado pelo expo no navegador
  - Acessar o arquivo ItemsController.ts no back-end (localizado em: back-end/src/controllers/ItemsController.ts) e subistituir o IP localizado no arquivo pelo IP do expo
  - Acessar o arquivo api.ts no front-end (localizado em: front-end/src/services/api.ts) e subistituir o IP localizado no arquivo pelo IP do expo

- Em seguida rodar o projeto back-end

  - Rodar o comando yarn dev na parta raiz 'back-end'

- Após executar os passos acima basta acessar o aplicativo pelo celular. No navegador não funciona corretamente pois ele necessita do sistema de GPS do celular.
