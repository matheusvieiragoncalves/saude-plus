## Start Project

- expo init name-project

- cd name-project

- yarn start

### Trabalhando com fonts

- Docs: https://github.com/expo/google-fonts

- adicionar fonte:

expo install expo-font @expo-google-fonts/nome-da-fonte

### Trabalhando com botões e navegação

- Docs: https://reactnavigation.org/docs/getting-started/

- yarn add @react-navigation/native

- expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view

- yarn add @react-navigation/stack

### Trabahando com icones

O expo ja exporta todos os pacotes de icones, não é necessário baixar nenhuma biblioteca bastca usar:

import { Feather as Icon } from '@expo/vector-icons';

### Trabalhando com Mapa

- expo install react-native-maps

### Trabalhando com informações do sistema (ex.: Tamanho da status bar)

- expo install expo-constants

### Trabalhando com SVGs

- expo install react-native-svg

## Trabalhando com requisições a API

- yarn add axios

## Trabalhando com localização

- expo install expo-location

## Trabalhando com compos de select

- Docs: https://www.npmjs.com/package/react-native-picker-select
