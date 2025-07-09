# 📱 TaskFlow Frontend

Aplicação frontend para gerenciamento de tarefas desenvolvida com **Ionic/Angular** seguindo os princípios da **Clean Architecture**.

## 🏗️ Arquitetura

O projeto segue a **Clean Architecture** com separação clara de responsabilidades:

```
src/app/
├── domain/           # 🎯 Entidades e modelos de negócio
├── application/      # 🔄 Casos de uso e serviços de aplicação
├── infrastructure/   # 🌐 Implementações de API e dados
└── presentation/     # 🎨 Componentes de interface do usuário
```

### Estrutura Detalhada

#### **Domain** (`src/app/domain/`)
- **`task.model.ts`**: Modelo de dados da tarefa
- **`task-status.enum.ts`**: Enumeração dos status possíveis
- **`update-task-request.model.ts`**: Interface para requisições de atualização

#### **Application** (`src/app/application/`)
- **`task.service.ts`**: Serviço de aplicação com lógica de negócio
  - Gerenciamento de tarefas (CRUD)
  - Conversão de status para labels e cores
  - Orquestração entre UI e infraestrutura

#### **Infrastructure** (`src/app/infrastructure/`)
- **`task-api.service.ts`**: Implementação da comunicação com a API
  - Requisições HTTP para o backend
  - Tratamento de erros e respostas
  - Configuração de headers e CORS

#### **Presentation** (`src/app/presentation/`)
- **`task-list.component.ts`**: Componente principal da lista de tarefas
- **`task-form.component.ts`**: Modal para criação/edição de tarefas
- **`app.component.ts`**: Componente raiz da aplicação

## 🚀 Funcionalidades

### ✅ CRUD Completo de Tarefas
- **Criar**: Adicionar novas tarefas via modal
- **Ler**: Listar todas as tarefas com status visual
- **Atualizar**: Editar título, descrição e status
- **Deletar**: Remover tarefas com confirmação

### 🎨 Interface Moderna
- **Design Responsivo**: Adaptado para mobile e desktop
- **Status Visual**: Cores e badges para cada status
- **Loading States**: Feedback visual durante carregamento
- **Error Handling**: Tratamento elegante de erros
- **Empty State**: Mensagem quando não há tarefas

### 📱 UX Otimizada
- **FAB (Floating Action Button)**: Botão flutuante para adicionar tarefas
- **Modais**: Formulários em overlay para não perder contexto
- **Toast Notifications**: Feedback instantâneo de ações
- **Confirmações**: Diálogos para ações destrutivas

## 🛠️ Tecnologias

- **Ionic 7**: Framework para aplicações híbridas
- **Angular 17**: Framework frontend com standalone components
- **TypeScript**: Tipagem estática para maior confiabilidade
- **SCSS**: Pré-processador CSS para estilos avançados
- **Ionic Components**: UI components prontos para uso

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Ionic CLI: `npm install -g @ionic/cli`

### Instalação
```bash
# Clonar o repositório
git clone <repository-url>
cd taskflow-frontend

# Instalar dependências
npm install

# Executar em modo desenvolvimento
ionic serve
```

### Scripts Disponíveis
```bash
npm run start          # Iniciar servidor de desenvolvimento
npm run build          # Build para produção
npm run test           # Executar testes unitários
npm run lint           # Verificar código com ESLint
```

## 🔧 Configuração

### Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto:
```env
API_BASE_URL=http://localhost:8080/api
```

### Backend
Certifique-se de que o backend está rodando em `http://localhost:8080` com:
- CORS habilitado para `http://localhost:8100`
- Endpoints REST disponíveis em `/api/tasks`

## 📊 Status das Tarefas

O sistema suporta três status principais:

| Status | Label | Cor | Descrição |
|--------|-------|-----|-----------|
| `pending` | Pendente | Amarelo | Tarefa aguardando início |
| `in_progress` | Em Progresso | Azul | Tarefa sendo executada |
| `completed` | Concluída | Verde | Tarefa finalizada |

## 🎯 Casos de Uso

### 1. Visualizar Tarefas
- Acesse a aplicação
- Lista de tarefas é carregada automaticamente
- Status visual com cores e badges

### 2. Criar Nova Tarefa
- Clique no botão flutuante (+)
- Preencha título e descrição
- Clique em "Criar Tarefa"

### 3. Editar Tarefa
- Clique no botão "Editar" na tarefa
- Modifique título, descrição ou status
- Clique em "Salvar"

### 4. Alterar Status
- Clique no botão "Status" na tarefa
- Selecione novo status no modal
- Confirme a alteração

### 5. Excluir Tarefa
- Clique no botão "Excluir" na tarefa
- Confirme a exclusão no diálogo
- Tarefa é removida da lista

## 🔍 Debug e Troubleshooting

### Problemas Comuns

#### 1. CORS Errors
```bash
# Verificar se backend está rodando
curl http://localhost:8080/api/tasks

# Verificar CORS no backend
# Deve incluir: http://localhost:8100
```

#### 2. Status "Desconhecido"
- Verificar se backend retorna status válido
- Confirmar enum no banco de dados
- Testar via curl: `curl -X PUT -H "Content-Type: application/json" -d '{"status":"in_progress"}' http://localhost:8080/api/tasks/1`

#### 3. FAB não aparece
- Verificar CSS do componente
- Confirmar que não há erros de build
- Limpar cache do navegador

### Logs de Desenvolvimento
```bash
# Ver logs do Angular
ionic serve --verbose

# Ver logs do backend
docker-compose logs app
```

## 🧪 Testes

### Testes Unitários
```bash
npm run test
```

### Testes E2E (se implementados)
```bash
npm run e2e
```

## 📱 Build para Produção

### Android
```bash
ionic capacitor add android
ionic capacitor build android
```

### iOS
```bash
ionic capacitor add ios
ionic capacitor build ios
```

### Web
```bash
ionic build --prod
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Autores

- **Igor Brandão** - Desenvolvimento inicial

## 🙏 Agradecimentos

- Ionic Framework pela base sólida
- Angular Team pelo framework robusto
- Comunidade open source pelos componentes

---

**Desenvolvido com ❤️ usando Ionic + Angular**
