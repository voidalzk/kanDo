# KanDo - Aplicação Kanban Board

## 📋 Sobre

Acesse: https://kando-74fa1.web.app/home

KanDo é uma aplicação de gerenciamento de tarefas baseada no sistema Kanban, desenvolvida com Angular 17 e Firebase. A aplicação oferece uma interface intuitiva e moderna para organização de projetos e tarefas, com recursos de drag-and-drop, gerenciamento de múltiplos boards e notificações em tempo real.

## 🚀 Funcionalidades

| Funcionalidade            | Status          | Descrição                                          |
|--------------------------|-----------------|---------------------------------------------------|
| Sistema Login/Registro   | ✅ Implementado | Sistema completo de autenticação Firebase         |
| Múltiplos Boards        | ✅ Implementado | Criação e gerenciamento de diferentes boards      |
| Drag and Drop           | ✅ Implementado | Movimentação de tasks entre colunas               |
| Priorização de Tasks    | ✅ Implementado | Sistema de prioridades (Alta, Média, Baixa)      |
| Responsividade          | ✅ Implementado | Interface móvel com menu lateral                  |
| Tags em Tasks           | ✅ Implementado | Adição de tags para categorização                |
| Notificações            | ✅ Implementado | Notificações em tempo real de convites           |
| Colaboração em Tasks    | ✅ Implementado | Múltiplos usuários podem trabalhar em boards     |
| Integração Firebase     | ✅ Implementado | Sincronização em tempo real com Firestore        |
| Tema Escuro             | ⏳ Em backlog   | Alternância entre temas claro e escuro           |
| Filtros de Tasks        | ⏳ Em backlog   | Filtrar tasks por tags, prioridade ou responsável|
| Analytics de Board      | ⏳ Em backlog   | Analytics de tasks e produtividade               |
| CI/CD Pipeline          | ⏳ Em backlog   | Pipeline de deploy automático                    |

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Angular 17**
  - Standalone Components
  - Dependency Injection
  - Angular Animations
  - Reactive Forms
  - Angular CDK (Drag & Drop)

### Backend e Banco de Dados
- **Firebase**
  - Firestore Database
  - Firebase Authentication
  - Firebase Hosting
  - Regras de Segurança

### Estilização
- TailwindCSS
- Material Icons
- CSS Custom Properties

## 🔐 Recursos de Segurança
- Autenticação Firebase
- Regras de Segurança Firestore
- Rotas Protegidas com Guards
- Compartilhamento Seguro de Boards

## 📱 Design Responsivo
- **Desktop**: Layout completo com todas as funcionalidades
- **Tablet**: Layout adaptativo com scroll horizontal
- **Mobile**: 
  - Interface otimizada com gestos touch
  - Menu de navegação lateral
  - Painel de notificações responsivo

## 🔄 Funcionalidades em Tempo Real
- Notificações ao vivo para convites de board
- Atualizações de tasks em tempo real
- Edição colaborativa de boards
- Mudanças instantâneas de status

## 🔜 Próximas Funcionalidades
- Implementação do tema escuro
- Sistema de filtros avançados
- Dashboard de analytics
- Melhorias na experiência mobile
- Notificações de prazo de tasks
- Personalização de perfil de usuário

## 💻 Desenvolvimento Local

1. Clone o repositório:
```bash
git clone https://github.com/seuusuario/kando.git
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o Firebase:
   - Crie um projeto Firebase
   - Adicione sua configuração Firebase nos arquivos de ambiente
   - Habilite Authentication e Firestore

4. Execute o servidor de desenvolvimento:
```bash
npm start
```

## 🤝 Contribuindo

1. Faça o fork do projeto
2. Crie sua branch de feature:
```bash
git checkout -b feature/NovaFuncionalidade
```
3. Commit suas alterações:
```bash
git commit -m 'Adiciona nova funcionalidade'
```
4. Push para a branch:
```bash
git push origin feature/NovaFuncionalidade
```
5. Abra um Pull Request

## 👥 Contribuidores

- Gabriel Voidaleski - Desenvolvedor Principal
