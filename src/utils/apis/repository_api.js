import {post, get, del} from './services';

export const create_repository = async (body) => post('/repository', body);

export const get_repositories = async () => {
  return get('/repository');
};
 
export const delete_repository = async (repoId) => {
    return del(`/repository/${repoId}`);
  };
    