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

      const tasks = await strapi.db.query('api::task.task').findMany({
        where: { users_permissions_user: user.id },
      });

      return tasks;
    },

    async create(ctx) {
      // Pega o usuário autenticado via JWT
      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized('You must be logged in to create a task');
      }

      // Adiciona o ID do usuário autenticado à nova tarefa
      ctx.request.body.data.users_permissions_user = user.id;

      // Chama o método padrão de criação para salvar a tarefa
      const response = await super.create(ctx);
      return response;
    },

    async update(ctx) {
      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized('You must be logged in to update a task');
      }

      // Verifica se a tarefa existe
      const { id } = ctx.params;
      const task = await strapi.service('api::task.task').findOne(id);

      if (!task) {
        return ctx.notFound('Task not found');
      }

      // Verifica se a tarefa pertence ao usuário
      if (task.users_permissions_user.id !== user.id) {
        return ctx.unauthorized(
          'You do not have permission to update this task',
        );
      }

      // Chama o método padrão update para salvar as alterações
      const response = await super.update(ctx);
      return response;
    },

    // Sobrescreve o método delete para permitir que o usuário delete suas próprias tarefas
    async delete(ctx) {
      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized('You must be logged in to delete a task');
      }

      // Verifica se a tarefa existe
      const { id } = ctx.params;
      const task = await strapi.service('api::task.task').findOne(id);

      if (!task) {
        return ctx.notFound('Task not found');
      }

      // Verifica se a tarefa pertence ao usuário
      if (task.users_permissions_user.id !== user.id) {
        return ctx.unauthorized(
          'You do not have permission to delete this task',
        );
      }

      // Chama o método padrão delete para remover a tarefa
      const response = await super.delete(ctx);
      return response;
    },
  }),
);
