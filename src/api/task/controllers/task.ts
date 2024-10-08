/**
 * task controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::task.task',
  ({ strapi }) => ({
    async find(ctx) {
      const user = ctx.state.user;

      if (!user) {
        return ctx.unauthorized('Você deve estar logado para ver suas tarefas');
      }

      const tasks = await strapi.documents('api::task.task').findMany({
        filters: {
          user: {
            id: user.id,
          },
        },
      });

      return tasks;
    },

    async create(ctx) {
      const user = ctx.state.user;

      // Verifica se existe conta logada
      if (!user) {
        return ctx.unauthorized(
          'Você deve estar logado para editar suas tarefas',
        );
      }

      // Inicia a tarefa como não completada
      ctx.request.body.data.done = false;

      // Relaciona a tarefa ao usuário logado
      ctx.request.body.data.user = user.documentId;

      // Chama o método padrão de criação para salvar a tarefa
      const response = await super.create(ctx);
      return response;
    },

    async update(ctx) {
      const user = ctx.state.user;
      const { id } = ctx.params;

      const task = await strapi.documents('api::task.task').findOne({
        documentId: id,
        filters: {
          user: {
            id: user.id,
          },
        },
      });

      if (!user) {
        return ctx.unauthorized(
          'Você deve estar logado para atualizar suas tarefas',
        );
      }

      if (!task) {
        return ctx.notFound('Task not found');
      }

      // Chama o método padrão update para salvar as alterações
      const response = await super.update(ctx);
      return response;
    },

    async delete(ctx) {
      const user = ctx.state.user;

      // Aqui, o id se refere ao documentId
      const { id } = ctx.params;

      if (!user) {
        return ctx.unauthorized(
          'Você deve estar logado para deletar suas tarefas',
        );
      }

      const task = await strapi.documents('api::task.task').findOne({
        documentId: id,
        filters: {
          user: user.id,
        },
      });

      // Verifica se a tarefa existe
      if (!task) {
        return ctx.notFound('Tarefa não existe');
      }

      // Exclui a tarefa
      const response = await super.delete(ctx);
      return response;
    },
  }),
);
